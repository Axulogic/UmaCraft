"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

import {
  PIXEL_RUNNER_BACKGROUND_CLIPS,
  PIXEL_RUNNER_CLIP_FRAME_MS,
  PIXEL_RUNNER_CRITICAL_CLIPS,
  getClipRenderTuning,
  getClipSourcesById,
} from "@/lib/pixel-runner-config";
import {
  clampTrackX,
  getLoopClipForState,
  getStateFromLoopClip,
  isLoopClip,
  sortFrameSources,
  type RunnerClipId,
  type RunnerFacing,
  type RunnerState,
} from "@/lib/pixel-runner-motion";
import {
  createPixelRunnerWorld,
  PIXEL_RUNNER_VISIBLE_TRACK_HEIGHT,
  type PixelRunnerWorldClimbLine,
  type PixelRunnerWorld,
  type PixelRunnerWorldLine,
} from "@/lib/pixel-runner-world-schema";

const RUNNER_SIZE = 64;
const FRAME_LOAD_CONCURRENCY = 6;
const ARM_DELAY_MS = 1200;
const CROSSFADE_MS = 90;
const SUPPORT_SNAP_TOLERANCE = 3;
const LANDING_TOLERANCE = 1.25;
const OVERLAP_PADDING = 2;
const SIDE_COLLISION_VERTICAL_RATIO = 0.62;
const EDGE_SURFACE_TOLERANCE = SUPPORT_SNAP_TOLERANCE + LANDING_TOLERANCE;
const EDGE_ASCEND_IGNORE_VELOCITY = -30;
const EDGE_ASCEND_PASS_THROUGH_RATIO = 0.24;
const CLIMB_CONTACT_VERTICAL_PADDING = 3;
const CLIMB_CONTACT_VERTICAL_GRACE = 8;
const CLIMB_CONTACT_X_TOLERANCE = 4.2;
const CLIMB_ATTACH_BUFFER_MS = 140;
const CLIMB_ATTACH_MAX_ASCEND_SPEED = 240;
const CLIMB_JUMP_VERTICAL_SPEED = 430;
const CLIMB_JUMP_HORIZONTAL_SPEED = 220;
const CLIMB_SLIDE_RAMP_MS = 1200;
const CLIMB_SLIDE_GRAVITY_START_RATIO = 0.12;
const CLIMB_SLIDE_GRAVITY_END_RATIO = 0.62;
const CLIMB_MAX_SLIDE_SPEED = 180;
const CLIMB_ANIM_SWITCH_LOCK_MS = 90;
const JUMP_TAKEOFF_MS = 68;
const HARD_LAND_DROP_THRESHOLD = 52;
const HARD_LAND_FALL_SPEED_THRESHOLD = 320;
const HARD_LAND_RUN_SPEED_RATIO = 0.82;
const HARD_LAND_DURATION_MS = 760;
const GUIDE_ARROW_SIZE = 32;
const GUIDE_ARROW_OFFSET_Y = 26;
const GUIDE_ARROW_TARGET_DISTANCE = 180;
const GUIDE_ARROW_SWITCH_SMOOTH_FACTOR = 0.32;

type GuideStageTarget =
  | { kind: "platform"; sourceIndex: number }
  | { kind: "climb"; sourceIndex: number };

const GUIDE_STAGE_SEQUENCE: GuideStageTarget[] = [
  { kind: "platform", sourceIndex: 1 },
  { kind: "platform", sourceIndex: 2 },
  { kind: "climb", sourceIndex: 0 },
  { kind: "climb", sourceIndex: 1 },
  { kind: "platform", sourceIndex: 3 },
  { kind: "platform", sourceIndex: 4 },
  { kind: "platform", sourceIndex: 5 },
  { kind: "climb", sourceIndex: 2 },
  { kind: "platform", sourceIndex: 6 },
  { kind: "platform", sourceIndex: 7 },
  { kind: "platform", sourceIndex: 8 },
  { kind: "platform", sourceIndex: 9 },
  { kind: "platform", sourceIndex: 10 },
  { kind: "platform", sourceIndex: 11 },
  { kind: "platform", sourceIndex: 12 },
];

interface RunnerBlendState {
  clipId: RunnerClipId;
  frameIndex: number;
  facing: RunnerFacing;
  startedAt: number;
  durationMs: number;
}

interface RunnerControlState {
  left: boolean;
  right: boolean;
  down: boolean;
  lookUp: boolean;
  jumpQueued: boolean;
}

interface RunnerRuntimeState {
  world: PixelRunnerWorld | null;
  hitboxX: number;
  hitboxY: number;
  velocityX: number;
  velocityY: number;
  grounded: boolean;
  supportPlatformId: string | null;
  isClimbing: boolean;
  activeClimbLineId: string | null;
  climbSide: RunnerFacing | 0;
  climbSlideMs: number;
  climbAttachBufferMs: number;
  climbAttachLineId: string | null;
  climbAttachSide: RunnerFacing | 0;
  climbAnimMode: "hold" | "move";
  climbAnimLockMs: number;
  usedClimbJumpLineId: string | null;
  jumpTakeoffMs: number;
  jumpLandMs: number;
  hardLandMs: number;
  airborneStartY: number;
  peakFallSpeed: number;
  armedHardLanding: boolean;
  landingSettleMs: number;
  directionHoldMs: number;
  heldDirection: RunnerFacing | 0;
  controls: RunnerControlState;
  currentState: RunnerState;
  currentClip: RunnerClipId;
  frameIndex: number;
  idleFrameDirection: 1 | -1;
  frameElapsedMs: number;
  facing: RunnerFacing;
  blend: RunnerBlendState | null;
  lastTickAt: number | null;
}

function createInitialRuntime(): RunnerRuntimeState {
  return {
    world: null,
    hitboxX: 0,
    hitboxY: 0,
    velocityX: 0,
    velocityY: 0,
    grounded: true,
    supportPlatformId: "ground",
    isClimbing: false,
    activeClimbLineId: null,
    climbSide: 0,
    climbSlideMs: 0,
    climbAttachBufferMs: 0,
    climbAttachLineId: null,
    climbAttachSide: 0,
    climbAnimMode: "hold",
    climbAnimLockMs: 0,
    usedClimbJumpLineId: null,
    jumpTakeoffMs: 0,
    jumpLandMs: 0,
    hardLandMs: 0,
    airborneStartY: 0,
    peakFallSpeed: 0,
    armedHardLanding: false,
    landingSettleMs: 0,
    directionHoldMs: 0,
    heldDirection: 0,
    controls: {
      left: false,
      right: false,
      down: false,
      lookUp: false,
      jumpQueued: false,
    },
    currentState: "idle",
    currentClip: "idle",
    frameIndex: 0,
    idleFrameDirection: 1,
    frameElapsedMs: 0,
    facing: 1,
    blend: null,
    lastTickAt: null,
  };
}

function createImageLoader(cache: Map<string, HTMLImageElement>) {
  return (source: string) =>
    new Promise<void>((resolve) => {
      if (cache.has(source)) {
        resolve();
        return;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        cache.set(source, image);
        resolve();
      };
      image.onerror = () => {
        resolve();
      };
      image.src = source;
    });
}

async function preloadSources(
  sources: string[],
  cache: Map<string, HTMLImageElement>,
  concurrency: number,
): Promise<void> {
  const uniqueSources = Array.from(new Set(sources));
  const loadImage = createImageLoader(cache);
  let pointer = 0;

  const workers = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (pointer < uniqueSources.length) {
      const currentIndex = pointer;
      pointer += 1;
      const source = uniqueSources[currentIndex];
      if (!source) {
        continue;
      }

      await loadImage(source);
    }
  });

  await Promise.all(workers);
}

function drawFrameToCanvas(
  context: CanvasRenderingContext2D,
  frame: HTMLImageElement,
  facing: RunnerFacing,
  clipId: RunnerClipId,
  alpha = 1,
) {
  const renderTuning = getClipRenderTuning(clipId);
  const drawSize = RUNNER_SIZE * renderTuning.scale;
  const drawX = (RUNNER_SIZE - drawSize) * 0.5;
  const drawY = RUNNER_SIZE - drawSize + renderTuning.offsetY;
  let renderFacing: RunnerFacing = facing;
  if (renderTuning.facingMode === "invert") {
    renderFacing = facing === 1 ? -1 : 1;
  } else if (renderTuning.facingMode === "fixed_right") {
    renderFacing = 1;
  } else if (renderTuning.facingMode === "fixed_left") {
    renderFacing = -1;
  }

  context.save();
  context.globalAlpha = alpha;

  if (renderFacing === -1) {
    context.translate(RUNNER_SIZE, 0);
    context.scale(-1, 1);
  }

  context.drawImage(frame, drawX, drawY, drawSize, drawSize);
  context.restore();
}

function runWhenIdle(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  if (typeof window.requestIdleCallback === "function") {
    const idleId = window.requestIdleCallback(() => callback(), { timeout: 900 });
    return () => {
      window.cancelIdleCallback(idleId);
    };
  }

  const timeoutId = window.setTimeout(callback, 240);
  return () => window.clearTimeout(timeoutId);
}

function approach(current: number, target: number, maxDelta: number): number {
  if (current < target) {
    return Math.min(current + maxDelta, target);
  }

  return Math.max(current - maxDelta, target);
}

function lerpAngleDeg(current: number, target: number, factor: number): number {
  const shortestDelta = ((target - current + 540) % 360) - 180;
  return current + shortestDelta * factor;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function lineHasHorizontalOverlap(
  line: PixelRunnerWorldLine,
  x: number,
  hitboxSize: number,
): boolean {
  const clampedPadding = Math.max(
    0,
    Math.min(OVERLAP_PADDING, Math.floor((hitboxSize - 1) * 0.25)),
  );
  const left = x + clampedPadding;
  const right = x + hitboxSize - clampedPadding;
  return right >= line.startX && left <= line.endX;
}

function findSupportLine(
  world: PixelRunnerWorld,
  x: number,
  bottomY: number,
  preferredId: string | null,
): PixelRunnerWorldLine | null {
  if (preferredId) {
    const preferred = world.lines.find((line) => line.id === preferredId);
    if (
      preferred &&
      lineHasHorizontalOverlap(preferred, x, world.hitboxSize) &&
      Math.abs(preferred.y - bottomY) <= SUPPORT_SNAP_TOLERANCE
    ) {
      return preferred;
    }
  }

  let bestLine: PixelRunnerWorldLine | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const line of world.lines) {
    if (!lineHasHorizontalOverlap(line, x, world.hitboxSize)) {
      continue;
    }

    const distance = Math.abs(line.y - bottomY);
    if (distance > SUPPORT_SNAP_TOLERANCE) {
      continue;
    }

    if (distance < bestDistance) {
      bestDistance = distance;
      bestLine = line;
    }
  }

  return bestLine;
}

function resolveHorizontalEndpointCollision(
  world: PixelRunnerWorld,
  fromX: number,
  toX: number,
  hitboxY: number,
  velocityY: number,
  supportPlatformId: string | null,
): { x: number; collided: boolean } {
  if (Math.abs(toX - fromX) < 0.0001) {
    return { x: toX, collided: false };
  }

  let nextX = toX;
  let collided = false;
  const direction: RunnerFacing = toX > fromX ? 1 : -1;
  const top = hitboxY;
  const bottom = hitboxY + world.hitboxSize;
  const maxWallReach = world.hitboxSize * SIDE_COLLISION_VERTICAL_RATIO;

  for (const endpoint of world.endpoints) {
    if (supportPlatformId && endpoint.platformId === supportPlatformId) {
      continue;
    }

    const withinWallBand =
      top <= endpoint.y - 0.5 &&
      bottom >= endpoint.y - maxWallReach;
    if (!withinWallBand) {
      continue;
    }

    if (bottom <= endpoint.y + EDGE_SURFACE_TOLERANCE) {
      continue;
    }
    if (
      velocityY <= EDGE_ASCEND_IGNORE_VELOCITY &&
      bottom <= endpoint.y + world.hitboxSize * EDGE_ASCEND_PASS_THROUGH_RATIO
    ) {
      continue;
    }

    if (direction === 1) {
      const fromRight = fromX + world.hitboxSize;
      const toRight = nextX + world.hitboxSize;
      if (fromRight <= endpoint.x && toRight >= endpoint.x) {
        nextX = Math.min(nextX, endpoint.x - world.hitboxSize);
        collided = true;
      }
      continue;
    }

    const fromLeft = fromX;
    const toLeft = nextX;
    if (fromLeft >= endpoint.x && toLeft <= endpoint.x) {
      nextX = Math.max(nextX, endpoint.x);
      collided = true;
    }
  }

  return {
    x: clampTrackX(nextX, world.minX, world.maxX),
    collided,
  };
}

function resolveLandingLine(
  world: PixelRunnerWorld,
  x: number,
  oldBottom: number,
  newBottom: number,
): PixelRunnerWorldLine | null {
  let bestLine: PixelRunnerWorldLine | null = null;

  for (const line of world.lines) {
    if (!lineHasHorizontalOverlap(line, x, world.hitboxSize)) {
      continue;
    }

    if (
      oldBottom <= line.y + LANDING_TOLERANCE &&
      newBottom >= line.y - LANDING_TOLERANCE
    ) {
      if (!bestLine || line.y < bestLine.y) {
        bestLine = line;
      }
    }
  }

  return bestLine;
}

function resolveClimbLineCollision(
  world: PixelRunnerWorld,
  fromHitboxX: number,
  toHitboxX: number,
  hitboxY: number,
): {
  x: number;
  collidedLine: PixelRunnerWorldClimbLine | null;
  collidedSide: RunnerFacing | 0;
} {
  if (Math.abs(toHitboxX - fromHitboxX) < 0.0001) {
    return { x: toHitboxX, collidedLine: null, collidedSide: 0 };
  }

  let nextX = toHitboxX;
  let collidedLine: PixelRunnerWorldClimbLine | null = null;
  let collidedSide: RunnerFacing | 0 = 0;
  const direction: RunnerFacing = toHitboxX > fromHitboxX ? 1 : -1;
  const top = hitboxY + CLIMB_CONTACT_VERTICAL_PADDING;
  const bottom = hitboxY + world.hitboxSize - CLIMB_CONTACT_VERTICAL_PADDING;

  for (const line of world.climbLines) {
    if (
      bottom < line.topY - CLIMB_CONTACT_VERTICAL_GRACE ||
      top > line.bottomY + CLIMB_CONTACT_VERTICAL_GRACE
    ) {
      continue;
    }

    if (direction === 1) {
      const fromRight = fromHitboxX + world.hitboxSize;
      const toRight = nextX + world.hitboxSize;
      if (fromRight <= line.x && toRight >= line.x) {
        const candidateX = line.x - world.hitboxSize;
        if (candidateX <= nextX) {
          nextX = candidateX;
          collidedLine = line;
          collidedSide = 1;
        }
      }
      continue;
    }

    const fromLeft = fromHitboxX;
    const toLeft = nextX;
    if (fromLeft >= line.x && toLeft <= line.x) {
      const candidateX = line.x;
      if (candidateX >= nextX) {
        nextX = candidateX;
        collidedLine = line;
        collidedSide = -1;
      }
    }
  }

  return {
    x: clampTrackX(nextX, world.minX, world.maxX),
    collidedLine,
    collidedSide,
  };
}

function findTouchingClimbLine(
  world: PixelRunnerWorld,
  hitboxX: number,
  hitboxY: number,
): { line: PixelRunnerWorldClimbLine; side: RunnerFacing } | null {
  const left = hitboxX;
  const right = hitboxX + world.hitboxSize;
  const top = hitboxY + CLIMB_CONTACT_VERTICAL_PADDING;
  const bottom = hitboxY + world.hitboxSize - CLIMB_CONTACT_VERTICAL_PADDING;

  let best: { line: PixelRunnerWorldClimbLine; side: RunnerFacing; distance: number } | null =
    null;

  for (const line of world.climbLines) {
    if (
      bottom < line.topY - CLIMB_CONTACT_VERTICAL_GRACE ||
      top > line.bottomY + CLIMB_CONTACT_VERTICAL_GRACE
    ) {
      continue;
    }

    const distanceToLeft = Math.abs(line.x - left);
    if (distanceToLeft <= CLIMB_CONTACT_X_TOLERANCE) {
      if (!best || distanceToLeft < best.distance) {
        best = { line, side: -1, distance: distanceToLeft };
      }
    }

    const distanceToRight = Math.abs(line.x - right);
    if (distanceToRight <= CLIMB_CONTACT_X_TOLERANCE) {
      if (!best || distanceToRight < best.distance) {
        best = { line, side: 1, distance: distanceToRight };
      }
    }
  }

  if (!best) {
    return null;
  }

  return { line: best.line, side: best.side };
}

function getClimbAnchorX(world: PixelRunnerWorld, lineX: number, side: RunnerFacing): number {
  if (side === 1) {
    return clampTrackX(lineX - world.hitboxSize, world.minX, world.maxX);
  }

  return clampTrackX(lineX, world.minX, world.maxX);
}

interface HeroPixelRunnerProps {
  hostRef: RefObject<HTMLElement | null>;
  paused?: boolean;
  enabled?: boolean;
  guideEnabled?: boolean;
}

export function HeroPixelRunner({
  hostRef,
  paused = false,
  enabled = true,
  guideEnabled = true,
}: HeroPixelRunnerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const spriteRef = useRef<HTMLDivElement | null>(null);
  const guideArrowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const guideArrowAngleRef = useRef(0);
  const guideStageIndexRef = useRef(0);
  const guideTargetRef = useRef<{
    visible: boolean;
    x: number;
    y: number;
    distance: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    distance: Number.POSITIVE_INFINITY,
  });
  const runtimeRef = useRef<RunnerRuntimeState>(createInitialRuntime());
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const rafIdRef = useRef<number | null>(null);
  const pausedRef = useRef(paused);

  const [isEligible, setIsEligible] = useState(true);
  const [armed, setArmed] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);

  const clipsById = useMemo(() => getClipSourcesById(), []);
  const showAnimatedRunner = enabled && isEligible && armed && assetsReady;

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) {
      const runtime = runtimeRef.current;
      runtime.controls.left = false;
      runtime.controls.right = false;
      runtime.controls.down = false;
      runtime.controls.lookUp = false;
      runtime.controls.jumpQueued = false;
    }
  }, [paused]);

  useEffect(
    () => () => {
      imageCacheRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    if (enabled) {
      return;
    }

    guideTargetRef.current = {
      visible: false,
      x: 0,
      y: 0,
      distance: Number.POSITIVE_INFINITY,
    };
    guideArrowAngleRef.current = 0;
    guideStageIndexRef.current = 0;
    if (guideArrowRef.current) {
      guideArrowRef.current.style.opacity = "0";
    }
  }, [enabled]);

  useEffect(() => {
    if (guideEnabled) {
      return;
    }
    guideTargetRef.current = {
      visible: false,
      x: 0,
      y: 0,
      distance: Number.POSITIVE_INFINITY,
    };
    if (guideArrowRef.current) {
      guideArrowRef.current.style.opacity = "0";
    }
  }, [guideEnabled]);

  useEffect(() => {
    setIsEligible(true);
  }, []);

  useEffect(() => {
    if (!enabled || !isEligible) {
      return;
    }

    let alive = true;
    let delayedArmId: number | null = null;

    const armRunner = () => {
      delayedArmId = window.setTimeout(() => {
        if (!alive) {
          return;
        }

        setArmed(true);
      }, ARM_DELAY_MS);
    };

    if (document.readyState === "complete") {
      armRunner();
    } else {
      window.addEventListener("load", armRunner, { once: true });
    }

    return () => {
      alive = false;
      if (delayedArmId !== null) {
        window.clearTimeout(delayedArmId);
      }
      window.removeEventListener("load", armRunner);
    };
  }, [enabled, isEligible]);

  useEffect(() => {
    if (!enabled || !isEligible || !armed) {
      return;
    }

    let active = true;
    let cancelIdleBackgroundLoad = () => {};

    const criticalSources = PIXEL_RUNNER_CRITICAL_CLIPS.flatMap((clipId) =>
      clipsById[clipId],
    );
    const backgroundSources = PIXEL_RUNNER_BACKGROUND_CLIPS.flatMap((clipId) =>
      clipsById[clipId],
    );

    void preloadSources(
      criticalSources,
      imageCacheRef.current,
      FRAME_LOAD_CONCURRENCY,
    ).then(() => {
      if (!active) {
        return;
      }

      const hasCriticalClip = PIXEL_RUNNER_CRITICAL_CLIPS.some((clipId) =>
        clipsById[clipId].some((source) => imageCacheRef.current.has(source)),
      );
      setAssetsReady(hasCriticalClip);

      cancelIdleBackgroundLoad = runWhenIdle(() => {
        void preloadSources(
          backgroundSources,
          imageCacheRef.current,
          FRAME_LOAD_CONCURRENCY,
        );
      });
    });

    return () => {
      active = false;
      cancelIdleBackgroundLoad();
    };
  }, [armed, clipsById, enabled, isEligible]);

  useEffect(() => {
    if (!enabled || !isEligible || !armed || !assetsReady) {
      return;
    }

    const runtime = runtimeRef.current;
    const track = trackRef.current;
    const sprite = spriteRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!track || !sprite || !canvas || !context) {
      return;
    }

    runtime.world = null;
    runtime.hitboxX = 0;
    runtime.hitboxY = 0;
    runtime.velocityX = 0;
    runtime.velocityY = 0;
    runtime.grounded = true;
    runtime.supportPlatformId = "ground";
    runtime.isClimbing = false;
    runtime.activeClimbLineId = null;
    runtime.climbSide = 0;
    runtime.climbSlideMs = 0;
    runtime.climbAttachBufferMs = 0;
    runtime.climbAttachLineId = null;
    runtime.climbAttachSide = 0;
    runtime.climbAnimMode = "hold";
    runtime.climbAnimLockMs = 0;
    runtime.usedClimbJumpLineId = null;
    runtime.jumpTakeoffMs = 0;
    runtime.jumpLandMs = 0;
    runtime.hardLandMs = 0;
    runtime.airborneStartY = 0;
    runtime.peakFallSpeed = 0;
    runtime.armedHardLanding = false;
    runtime.landingSettleMs = 0;
    runtime.directionHoldMs = 0;
    runtime.heldDirection = 0;
    runtime.controls.left = false;
    runtime.controls.right = false;
    runtime.controls.down = false;
    runtime.controls.lookUp = false;
    runtime.controls.jumpQueued = false;
    runtime.currentState = "idle";
    runtime.currentClip = "idle";
    runtime.frameIndex = 0;
    runtime.idleFrameDirection = 1;
    runtime.frameElapsedMs = 0;
    runtime.facing = 1;
    runtime.blend = null;
    runtime.lastTickAt = null;
    guideStageIndexRef.current = 0;

    context.imageSmoothingEnabled = false;

    const resolveFrames = (clipId: RunnerClipId): HTMLImageElement[] => {
      const sortedSources = sortFrameSources(clipsById[clipId]);
      return sortedSources
        .map((source) => imageCacheRef.current.get(source))
        .filter((image): image is HTMLImageElement => Boolean(image));
    };

    const fallbackOrderByClip: Record<RunnerClipId, RunnerClipId[]> = {
      idle: ["idle", "walk", "run"],
      walk: ["walk", "run", "idle"],
      run: ["run", "walk", "idle"],
      climb_hold: ["climb_hold", "climb", "idle"],
      climb: ["climb", "climb_hold", "idle"],
      hard_land: ["hard_land", "run", "walk", "idle"],
      jump_takeoff: ["jump_takeoff", "jump", "run", "walk", "idle"],
      jump: ["jump", "run", "walk", "idle"],
      jump_land: ["jump_land", "sprint_settle_b", "walk", "idle"],
      interact_intro: ["interact_intro", "interact_loop", "idle"],
      interact_loop: ["interact_loop", "idle"],
      idle_shift: ["idle_shift", "idle"],
      run_start: ["run_start", "run", "walk"],
      dash_stop: ["dash_stop", "sprint_settle_b", "idle_shift", "walk"],
      sprint_settle_a: ["sprint_settle_a", "idle_shift", "idle"],
      sprint_settle_b: ["sprint_settle_b", "idle_shift", "walk"],
      turn_back: ["turn_back", "idle_shift", "walk"],
    };

    const resolveClip = (
      requestedClipId: RunnerClipId,
    ): { clipId: RunnerClipId; frames: HTMLImageElement[] } => {
      const fallback = fallbackOrderByClip[requestedClipId];
      for (const clipId of fallback) {
        const frames = resolveFrames(clipId);
        if (frames.length > 0) {
          return { clipId, frames };
        }
      }

      return { clipId: "idle", frames: [] };
    };

    const detectGuideTarget = () => {
      const world = runtime.world;
      if (!world) {
        guideTargetRef.current = {
          visible: false,
          x: 0,
          y: 0,
          distance: Number.POSITIVE_INFINITY,
        };
        return;
      }
      if (!guideEnabled) {
        guideTargetRef.current = {
          visible: false,
          x: 0,
          y: 0,
          distance: Number.POSITIVE_INFINITY,
        };
        return;
      }

      const centerX = runtime.hitboxX + world.hitboxSize * 0.5;
      const centerY = runtime.hitboxY + world.hitboxSize * 0.5;
      const feetY = runtime.hitboxY + world.hitboxSize;
      const touchingClimb = findTouchingClimbLine(world, runtime.hitboxX, runtime.hitboxY);

      const getPlatformBySource = (sourceIndex: number) =>
        world.lines.find((line) => line.sourceIndex === sourceIndex) ?? null;
      const getClimbBySource = (sourceIndex: number) =>
        world.climbLines.find((line) => line.sourceIndex === sourceIndex) ?? null;

      const isPlatformReached = (line: PixelRunnerWorldLine): boolean => {
        return (
          runtime.grounded &&
          lineHasHorizontalOverlap(line, runtime.hitboxX, world.hitboxSize) &&
          Math.abs(feetY - line.y) <= SUPPORT_SNAP_TOLERANCE + LANDING_TOLERANCE + 1
        );
      };

      const isClimbReached = (line: PixelRunnerWorldClimbLine): boolean => {
        if (runtime.isClimbing && runtime.activeClimbLineId === line.id) {
          return true;
        }
        return Boolean(
          touchingClimb &&
            touchingClimb.line.sourceIndex === line.sourceIndex,
        );
      };

      while (guideStageIndexRef.current < GUIDE_STAGE_SEQUENCE.length) {
        const stage = GUIDE_STAGE_SEQUENCE[guideStageIndexRef.current];
        if (!stage) {
          break;
        }

        if (stage.kind === "platform") {
          const stageLine = getPlatformBySource(stage.sourceIndex);
          if (!stageLine) {
            guideStageIndexRef.current += 1;
            continue;
          }
          if (isPlatformReached(stageLine)) {
            guideStageIndexRef.current += 1;
            continue;
          }
          break;
        }

        const stageClimb = getClimbBySource(stage.sourceIndex);
        if (!stageClimb) {
          guideStageIndexRef.current += 1;
          continue;
        }
        if (isClimbReached(stageClimb)) {
          guideStageIndexRef.current += 1;
          continue;
        }
        break;
      }

      const currentStage = GUIDE_STAGE_SEQUENCE[guideStageIndexRef.current];
      if (!currentStage) {
        guideTargetRef.current = {
          visible: false,
          x: 0,
          y: 0,
          distance: Number.POSITIVE_INFINITY,
        };
        return;
      }

      if (currentStage.kind === "platform") {
        const stageLine = getPlatformBySource(currentStage.sourceIndex);
        if (!stageLine) {
          guideTargetRef.current = {
            visible: false,
            x: 0,
            y: 0,
            distance: Number.POSITIVE_INFINITY,
          };
          return;
        }
        const targetX = (stageLine.startX + stageLine.endX) * 0.5;
        const targetY = stageLine.y;
        const distance = Math.hypot(targetX - centerX, targetY - centerY);

        guideTargetRef.current = {
          visible: true,
          x: targetX,
          y: targetY,
          distance,
        };
        return;
      }

      const stageClimb = getClimbBySource(currentStage.sourceIndex);
      if (!stageClimb) {
        guideTargetRef.current = {
          visible: false,
          x: 0,
          y: 0,
          distance: Number.POSITIVE_INFINITY,
        };
        return;
      }

      const targetX = stageClimb.x;
      const targetY = (stageClimb.topY + stageClimb.bottomY) * 0.5;
      const distance = Math.hypot(targetX - centerX, targetY - centerY);

      guideTargetRef.current = {
        visible: true,
        x: targetX,
        y: targetY,
        distance,
      };
    };

    const setSpritePositionFromHitbox = () => {
      const world = runtime.world;
      if (!world) {
        return;
      }

      const spriteX = Math.round(runtime.hitboxX - world.hitboxOffsetX);
      const spriteY = Math.round(runtime.hitboxY - world.hitboxOffsetY);
      sprite.style.transform = `translate3d(${spriteX}px, ${spriteY}px, 0)`;

      const guideArrow = guideArrowRef.current;
      if (!guideArrow) {
        return;
      }
      if (!guideEnabled) {
        guideArrow.style.opacity = "0";
        return;
      }

      const centerX = runtime.hitboxX + world.hitboxSize * 0.5;
      const arrowCenterY = runtime.hitboxY - GUIDE_ARROW_OFFSET_Y;
      const arrowX = Math.round(centerX - GUIDE_ARROW_SIZE * 0.5);
      const arrowY = Math.round(arrowCenterY - GUIDE_ARROW_SIZE * 0.5);
      const target = guideTargetRef.current;

      if (!target.visible) {
        guideArrow.style.opacity = "0";
        guideArrow.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(${guideArrowAngleRef.current}deg)`;
        return;
      }

      const dx = target.x - centerX;
      const dy = target.y - arrowCenterY;
      const desiredAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const nextAngle = lerpAngleDeg(
        guideArrowAngleRef.current,
        desiredAngle,
        GUIDE_ARROW_SWITCH_SMOOTH_FACTOR,
      );
      guideArrowAngleRef.current = nextAngle;

      const proximity = Math.max(
        0,
        Math.min(1, 1 - target.distance / GUIDE_ARROW_TARGET_DISTANCE),
      );
      const opacity = 0.55 + proximity * 0.45;
      const scale = 0.9 + proximity * 0.24;

      guideArrow.style.opacity = `${opacity}`;
      guideArrow.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(${nextAngle}deg) scale(${scale})`;
    };

    const setClip = (clipId: RunnerClipId, now: number) => {
      const resolvedCurrent = resolveClip(runtime.currentClip);
      const previousFrameIndex = runtime.frameIndex;
      const previousFrame =
        resolvedCurrent.frames[
          runtime.frameIndex % Math.max(resolvedCurrent.frames.length, 1)
        ];

      const previousFacing = runtime.facing;
      runtime.currentClip = clipId;
      runtime.frameIndex = 0;
      runtime.idleFrameDirection = 1;
      runtime.frameElapsedMs = 0;

      const nextState = getStateFromLoopClip(clipId);
      if (nextState) {
        runtime.currentState = nextState;
      }

      if (previousFrame) {
        runtime.blend = {
          clipId: resolvedCurrent.clipId,
          frameIndex: previousFrameIndex,
          facing: previousFacing,
          startedAt: now,
          durationMs: CROSSFADE_MS,
        };
      }
    };

    const draw = (timestamp: number) => {
      context.clearRect(0, 0, RUNNER_SIZE, RUNNER_SIZE);

      const resolvedCurrent = resolveClip(runtime.currentClip);
      const currentFrames = resolvedCurrent.frames;
      if (currentFrames.length === 0) {
        return;
      }

      const activeFrame =
        currentFrames[runtime.frameIndex % Math.max(currentFrames.length, 1)];
      if (!activeFrame) {
        return;
      }

      if (runtime.blend) {
        const blendAge = timestamp - runtime.blend.startedAt;
        const blendProgress = Math.min(1, blendAge / runtime.blend.durationMs);
        const fromResolved = resolveClip(runtime.blend.clipId);
        const fromFrames = fromResolved.frames;
        const fromFrame =
          fromFrames[runtime.blend.frameIndex % Math.max(fromFrames.length, 1)];
        if (fromFrame) {
          drawFrameToCanvas(
            context,
            fromFrame,
            runtime.blend.facing,
            fromResolved.clipId,
            1 - blendProgress,
          );
        }

        drawFrameToCanvas(
          context,
          activeFrame,
          runtime.facing,
          resolvedCurrent.clipId,
          blendProgress,
        );

        if (blendProgress >= 1) {
          runtime.blend = null;
        }
        return;
      }

      drawFrameToCanvas(
        context,
        activeFrame,
        runtime.facing,
        resolvedCurrent.clipId,
      );
    };

    const advanceAnimationClip = (deltaMs: number) => {
      const resolvedClip = resolveClip(runtime.currentClip);
      const clipFrames = resolvedClip.frames;
      const frameCount = clipFrames.length;
      if (frameCount === 0) {
        return;
      }

      const frameMs = PIXEL_RUNNER_CLIP_FRAME_MS[resolvedClip.clipId];
      runtime.frameElapsedMs += deltaMs;
      if (runtime.frameElapsedMs < frameMs) {
        return;
      }

      const steps = Math.floor(runtime.frameElapsedMs / frameMs);
      runtime.frameElapsedMs -= steps * frameMs;

      if (resolvedClip.clipId === "idle") {
        if (frameCount <= 1) {
          runtime.frameIndex = 0;
          return;
        }

        for (let step = 0; step < steps; step += 1) {
          const nextFrame = runtime.frameIndex + runtime.idleFrameDirection;
          if (nextFrame >= frameCount) {
            runtime.idleFrameDirection = -1;
            runtime.frameIndex = Math.max(0, frameCount - 2);
            continue;
          }

          if (nextFrame < 0) {
            runtime.idleFrameDirection = 1;
            runtime.frameIndex = Math.min(frameCount - 1, 1);
            continue;
          }

          runtime.frameIndex = nextFrame;
        }
        return;
      }

      if (isLoopClip(resolvedClip.clipId)) {
        runtime.frameIndex = (runtime.frameIndex + steps) % frameCount;
        return;
      }

      runtime.frameIndex = Math.min(runtime.frameIndex + steps, frameCount - 1);
    };

    const updateWorld = () => {
      const previousWorld = runtime.world;
      const nextWorld = createPixelRunnerWorld(track.clientWidth);
      runtime.world = nextWorld;

      if (!previousWorld) {
        runtime.hitboxX = clampTrackX(nextWorld.maxX * 0.5, nextWorld.minX, nextWorld.maxX);
        runtime.hitboxY = nextWorld.groundY - nextWorld.hitboxSize;
        runtime.grounded = true;
        runtime.supportPlatformId = "ground";
        runtime.isClimbing = false;
        runtime.activeClimbLineId = null;
        runtime.climbSide = 0;
        runtime.climbSlideMs = 0;
        runtime.climbAttachBufferMs = 0;
        runtime.climbAttachLineId = null;
        runtime.climbAttachSide = 0;
        runtime.climbAnimMode = "hold";
        runtime.climbAnimLockMs = 0;
        runtime.hardLandMs = 0;
        runtime.airborneStartY = runtime.hitboxY;
        runtime.peakFallSpeed = 0;
        runtime.armedHardLanding = false;
        return;
      }

      const ratio = previousWorld.width > 0 ? runtime.hitboxX / previousWorld.width : 0.5;
      runtime.hitboxX = clampTrackX(ratio * nextWorld.width, nextWorld.minX, nextWorld.maxX);
      runtime.hitboxY = Math.min(runtime.hitboxY, nextWorld.groundY - nextWorld.hitboxSize);

      const currentBottom = runtime.hitboxY + nextWorld.hitboxSize;
      const supportLine = findSupportLine(
        nextWorld,
        runtime.hitboxX,
        currentBottom,
        runtime.supportPlatformId,
      );

      if (supportLine) {
        runtime.grounded = true;
        runtime.hitboxY = supportLine.y - nextWorld.hitboxSize;
        runtime.supportPlatformId = supportLine.id;
        runtime.isClimbing = false;
        runtime.activeClimbLineId = null;
        runtime.climbSide = 0;
        runtime.climbSlideMs = 0;
        runtime.climbAttachBufferMs = 0;
        runtime.climbAttachLineId = null;
        runtime.climbAttachSide = 0;
        runtime.climbAnimMode = "hold";
        runtime.climbAnimLockMs = 0;
        runtime.peakFallSpeed = 0;
        runtime.armedHardLanding = false;
      } else if (runtime.hitboxY >= nextWorld.groundY - nextWorld.hitboxSize) {
        runtime.grounded = true;
        runtime.hitboxY = nextWorld.groundY - nextWorld.hitboxSize;
        runtime.supportPlatformId = "ground";
        runtime.isClimbing = false;
        runtime.activeClimbLineId = null;
        runtime.climbSide = 0;
        runtime.climbSlideMs = 0;
        runtime.climbAttachBufferMs = 0;
        runtime.climbAttachLineId = null;
        runtime.climbAttachSide = 0;
        runtime.climbAnimMode = "hold";
        runtime.climbAnimLockMs = 0;
        runtime.peakFallSpeed = 0;
        runtime.armedHardLanding = false;
      }
    };

    const isHostVisible = () => {
      const host = hostRef.current;
      if (!host) {
        return true;
      }

      const bounds = host.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };

    const applyMovement = (deltaMs: number, timestamp: number) => {
      const world = runtime.world;
      if (!world) {
        return;
      }

      const wasGrounded = runtime.grounded;
      const deltaSeconds = deltaMs / 1000;
      const direction =
        (runtime.controls.right ? 1 : 0) - (runtime.controls.left ? 1 : 0);
      const moveDirection: RunnerFacing | 0 = direction === 0 ? 0 : direction > 0 ? 1 : -1;
      let contactedClimbLine: PixelRunnerWorldClimbLine | null = null;
      let contactedClimbSide: RunnerFacing | 0 = 0;
      let collidedClimbLine: PixelRunnerWorldClimbLine | null = null;
      let collidedClimbSide: RunnerFacing | 0 = 0;
      runtime.climbAttachBufferMs = Math.max(0, runtime.climbAttachBufferMs - deltaMs);
      if (runtime.climbAttachBufferMs === 0) {
        runtime.climbAttachLineId = null;
        runtime.climbAttachSide = 0;
      }

      const clearClimbState = () => {
        runtime.isClimbing = false;
        runtime.activeClimbLineId = null;
        runtime.climbSide = 0;
        runtime.climbSlideMs = 0;
        runtime.climbAttachBufferMs = 0;
        runtime.climbAttachLineId = null;
        runtime.climbAttachSide = 0;
        runtime.climbAnimMode = "hold";
        runtime.climbAnimLockMs = 0;
      };

      const movingAwayFromClimb =
        runtime.isClimbing &&
        moveDirection !== 0 &&
        ((runtime.climbSide === 1 && moveDirection === -1) ||
          (runtime.climbSide === -1 && moveDirection === 1));

      if (movingAwayFromClimb) {
        clearClimbState();
      }

      if (direction === 0) {
        runtime.directionHoldMs = 0;
        runtime.heldDirection = 0;
      } else {
        const heldMoveDirection: RunnerFacing = direction > 0 ? 1 : -1;
        if (runtime.heldDirection === heldMoveDirection) {
          runtime.directionHoldMs += deltaMs;
        } else {
          runtime.directionHoldMs = 0;
          runtime.heldDirection = heldMoveDirection;
        }

        if (!runtime.isClimbing) {
          runtime.facing = heldMoveDirection;
        }
      }
      const runningIntent =
        runtime.controls.down || runtime.directionHoldMs >= world.runHoldMs;
      const targetSpeed =
        runtime.isClimbing || direction === 0
          ? 0
          : direction * (runningIntent ? world.runSpeed : world.walkSpeed);
      const acceleration =
        direction === 0
          ? world.deceleration
          : runtime.grounded
            ? world.acceleration
            : world.airAcceleration;

      runtime.velocityX = approach(
        runtime.velocityX,
        targetSpeed,
        acceleration * deltaSeconds,
      );

      if (Math.abs(runtime.velocityX) < 0.5 && direction === 0) {
        runtime.velocityX = 0;
      }

      const tentativeX = clampTrackX(
        runtime.hitboxX + runtime.velocityX * deltaSeconds,
        world.minX,
        world.maxX,
      );
      const endpointCollision = resolveHorizontalEndpointCollision(
        world,
        runtime.hitboxX,
        tentativeX,
        runtime.hitboxY,
        runtime.velocityY,
        runtime.supportPlatformId,
      );
      const climbCollision = resolveClimbLineCollision(
        world,
        runtime.hitboxX,
        endpointCollision.x,
        runtime.hitboxY,
      );
      runtime.hitboxX = climbCollision.x;
      if (climbCollision.collidedLine) {
        collidedClimbLine = climbCollision.collidedLine;
        collidedClimbSide = climbCollision.collidedSide;
        contactedClimbLine = climbCollision.collidedLine;
        contactedClimbSide = climbCollision.collidedSide;
      }
      if (endpointCollision.collided || climbCollision.collidedLine) {
        runtime.velocityX = 0;
      }

      if (runtime.grounded) {
        const supportLine = findSupportLine(
          world,
          runtime.hitboxX,
          runtime.hitboxY + world.hitboxSize,
          runtime.supportPlatformId,
        );

        if (supportLine) {
          runtime.hitboxY = supportLine.y - world.hitboxSize;
          runtime.supportPlatformId = supportLine.id;
        } else {
          runtime.grounded = false;
          runtime.supportPlatformId = null;
          runtime.airborneStartY = runtime.hitboxY;
          runtime.peakFallSpeed = Math.max(0, runtime.velocityY);
          runtime.armedHardLanding = false;
        }
      }

      if (!runtime.grounded && !contactedClimbLine) {
        const touching = findTouchingClimbLine(world, runtime.hitboxX, runtime.hitboxY);
        if (touching) {
          contactedClimbLine = touching.line;
          contactedClimbSide = touching.side;
        }
      }

      if (!runtime.grounded && contactedClimbLine && contactedClimbSide !== 0) {
        runtime.climbAttachBufferMs = CLIMB_ATTACH_BUFFER_MS;
        runtime.climbAttachLineId = contactedClimbLine.id;
        runtime.climbAttachSide = contactedClimbSide;
      }

      if (runtime.grounded && runtime.isClimbing) {
        clearClimbState();
      }

      if (!runtime.grounded && !runtime.isClimbing) {
        let attachLine: PixelRunnerWorldClimbLine | null = null;
        let attachSide: RunnerFacing | 0 = 0;

        if (collidedClimbLine && collidedClimbSide !== 0) {
          attachLine = collidedClimbLine;
          attachSide = collidedClimbSide;
        } else if (
          runtime.climbAttachBufferMs > 0 &&
          runtime.climbAttachLineId &&
          runtime.climbAttachSide !== 0
        ) {
          attachLine =
            world.climbLines.find((line) => line.id === runtime.climbAttachLineId) ?? null;
          attachSide = runtime.climbAttachSide;
        }

        if (attachLine && attachSide !== 0) {
          const movingAwayNow =
            moveDirection !== 0 &&
            ((attachSide === 1 && moveDirection === -1) ||
              (attachSide === -1 && moveDirection === 1));
          const canAttachByVelocity = runtime.velocityY <= CLIMB_ATTACH_MAX_ASCEND_SPEED;
          const canAttach = !movingAwayNow && canAttachByVelocity;

          if (canAttach) {
            runtime.isClimbing = true;
            runtime.activeClimbLineId = attachLine.id;
            runtime.climbSide = attachSide;
            runtime.climbSlideMs = 0;
            runtime.climbAnimMode = "hold";
            runtime.climbAnimLockMs = CLIMB_ANIM_SWITCH_LOCK_MS;
            runtime.climbAttachBufferMs = 0;
            runtime.climbAttachLineId = null;
            runtime.climbAttachSide = 0;
            runtime.velocityX = 0;
            runtime.velocityY = Math.max(0, runtime.velocityY * 0.25);
          }
        }
      }

      if (runtime.isClimbing && runtime.activeClimbLineId) {
        const activeClimbLine = world.climbLines.find(
          (line) => line.id === runtime.activeClimbLineId,
        );

        if (!activeClimbLine || runtime.climbSide === 0) {
          clearClimbState();
        } else {
          const touchingActive = findTouchingClimbLine(world, runtime.hitboxX, runtime.hitboxY);
          const hasBufferedActiveTouch =
            runtime.climbAttachBufferMs > 0 &&
            runtime.climbAttachLineId === activeClimbLine.id &&
            runtime.climbAttachSide === runtime.climbSide;
          if (
            (!touchingActive ||
              touchingActive.line.id !== activeClimbLine.id ||
              touchingActive.side !== runtime.climbSide) &&
            !hasBufferedActiveTouch
          ) {
            clearClimbState();
          } else {
            runtime.hitboxX = getClimbAnchorX(world, activeClimbLine.x, runtime.climbSide);
            runtime.velocityX = 0;
            runtime.facing = runtime.climbSide;
            contactedClimbLine = activeClimbLine;
            contactedClimbSide = runtime.climbSide;
          }
        }
      }

      if (runtime.controls.jumpQueued) {
        runtime.controls.jumpQueued = false;
        if (runtime.grounded) {
          const runSpeedAtJump = Math.abs(runtime.velocityX);
          const runFastAtJump =
            runningIntent && runSpeedAtJump >= world.runSpeed * HARD_LAND_RUN_SPEED_RATIO;
          runtime.grounded = false;
          runtime.supportPlatformId = null;
          clearClimbState();
          runtime.jumpTakeoffMs = JUMP_TAKEOFF_MS;
          runtime.jumpLandMs = 0;
          runtime.hardLandMs = 0;
          runtime.armedHardLanding = runFastAtJump;
          runtime.airborneStartY = runtime.hitboxY;
          runtime.peakFallSpeed = 0;
          runtime.landingSettleMs = 0;
          runtime.velocityY = -world.jumpVelocity;
        } else if (
          contactedClimbLine &&
          contactedClimbSide !== 0 &&
          runtime.usedClimbJumpLineId !== contactedClimbLine.id
        ) {
          const awayDirection: RunnerFacing = contactedClimbSide === 1 ? -1 : 1;
          runtime.jumpTakeoffMs = 0;
          runtime.jumpLandMs = 0;
          runtime.hardLandMs = 0;
          runtime.armedHardLanding = false;
          runtime.airborneStartY = runtime.hitboxY;
          runtime.peakFallSpeed = 0;
          runtime.landingSettleMs = 0;
          clearClimbState();
          runtime.velocityY = -CLIMB_JUMP_VERTICAL_SPEED;
          runtime.velocityX = awayDirection * CLIMB_JUMP_HORIZONTAL_SPEED;
          runtime.facing = awayDirection;
          runtime.usedClimbJumpLineId = contactedClimbLine.id;
        }
      }

      if (!runtime.grounded) {
        const oldBottom = runtime.hitboxY + world.hitboxSize;
        if (runtime.isClimbing) {
          runtime.climbSlideMs += deltaMs;
          const climbGravityRamp = Math.min(1, runtime.climbSlideMs / CLIMB_SLIDE_RAMP_MS);
          const climbGravityRatio =
            CLIMB_SLIDE_GRAVITY_START_RATIO +
            (CLIMB_SLIDE_GRAVITY_END_RATIO - CLIMB_SLIDE_GRAVITY_START_RATIO) *
              climbGravityRamp;
          runtime.velocityY = Math.min(
            CLIMB_MAX_SLIDE_SPEED,
            Math.max(0, runtime.velocityY + world.gravity * deltaSeconds * climbGravityRatio),
          );
        } else {
          const gravityScale = runtime.controls.down && runtime.velocityY > 0 ? 1.22 : 1;
          runtime.velocityY = Math.min(
            world.maxFallSpeed,
            runtime.velocityY + world.gravity * deltaSeconds * gravityScale,
          );
        }
        runtime.peakFallSpeed = Math.max(runtime.peakFallSpeed, runtime.velocityY);

        const tentativeY = runtime.hitboxY + runtime.velocityY * deltaSeconds;

        if (runtime.velocityY >= 0) {
          const landingLine = resolveLandingLine(
            world,
            runtime.hitboxX,
            oldBottom,
            tentativeY + world.hitboxSize,
          );

          if (landingLine) {
            runtime.hitboxY = landingLine.y - world.hitboxSize;
            runtime.velocityY = 0;
            runtime.grounded = true;
            runtime.supportPlatformId = landingLine.id;
            clearClimbState();
          } else {
            runtime.hitboxY = tentativeY;
          }
        } else {
          runtime.hitboxY = tentativeY;
        }
      }

      if (runtime.hitboxY > world.groundY - world.hitboxSize) {
        runtime.hitboxY = world.groundY - world.hitboxSize;
        runtime.velocityY = 0;
        runtime.grounded = true;
        runtime.supportPlatformId = "ground";
        clearClimbState();
      }

      if (direction === 0 && Math.abs(runtime.velocityX) > 2) {
        runtime.facing = runtime.velocityX > 0 ? 1 : -1;
      }

      if (runtime.grounded) {
        runtime.usedClimbJumpLineId = null;
      }

      const horizontalSpeed = Math.abs(runtime.velocityX);
      const runBoundary = (world.walkSpeed + world.runSpeed) * 0.5;
      const moveIntent = direction !== 0 || horizontalSpeed >= 6;
      const justLanded = runtime.grounded && !wasGrounded;
      if (justLanded) {
        const dropDistance = runtime.hitboxY - runtime.airborneStartY;
        const triggerHardLanding =
          runtime.armedHardLanding &&
          dropDistance >= HARD_LAND_DROP_THRESHOLD &&
          runtime.peakFallSpeed >= HARD_LAND_FALL_SPEED_THRESHOLD;
        runtime.jumpTakeoffMs = 0;
        runtime.jumpLandMs = 0;
        runtime.hardLandMs = triggerHardLanding ? HARD_LAND_DURATION_MS : 0;
        runtime.landingSettleMs = 0;
        runtime.armedHardLanding = false;
        runtime.peakFallSpeed = 0;
        runtime.airborneStartY = runtime.hitboxY;
      }

      if (runtime.grounded && moveIntent) {
        runtime.jumpLandMs = 0;
        runtime.landingSettleMs = 0;
      }

      if (!runtime.grounded && runtime.jumpTakeoffMs > 0) {
        runtime.jumpTakeoffMs = Math.max(0, runtime.jumpTakeoffMs - deltaMs);
      }

      if (runtime.grounded && runtime.jumpLandMs > 0) {
        runtime.jumpLandMs = Math.max(0, runtime.jumpLandMs - deltaMs);
      }

      if (runtime.grounded && runtime.hardLandMs > 0) {
        runtime.hardLandMs = Math.max(0, runtime.hardLandMs - deltaMs);
      }

      if (runtime.grounded) {
        if (runtime.landingSettleMs > 0) {
          runtime.landingSettleMs = Math.max(0, runtime.landingSettleMs - deltaMs);
        }
      }

      if (runtime.isClimbing && !runtime.grounded) {
        const climbIntent = runtime.controls.lookUp || runtime.controls.down;
        runtime.climbAnimLockMs = Math.max(0, runtime.climbAnimLockMs - deltaMs);

        const targetClimbAnimMode = climbIntent ? "move" : "hold";

        if (
          targetClimbAnimMode !== runtime.climbAnimMode &&
          runtime.climbAnimLockMs <= 0
        ) {
          runtime.climbAnimMode = targetClimbAnimMode;
          runtime.climbAnimLockMs = CLIMB_ANIM_SWITCH_LOCK_MS;
        }
      } else {
        runtime.climbAnimMode = "hold";
        runtime.climbAnimLockMs = 0;
      }

      const canLookUp =
        runtime.controls.lookUp &&
        runtime.grounded &&
        direction === 0 &&
        horizontalSpeed < 6;
      const nextState: RunnerState = runtime.grounded
        ? direction !== 0
          ? horizontalSpeed >= runBoundary
            ? "run"
            : "walk"
          : horizontalSpeed < 6
            ? "idle"
            : horizontalSpeed >= runBoundary
              ? "run"
              : "walk"
        : horizontalSpeed >= runBoundary
          ? "run"
          : "walk";

      let nextClip: RunnerClipId;
      if (runtime.isClimbing && !runtime.grounded) {
        nextClip = runtime.climbAnimMode === "hold" ? "climb_hold" : "climb";
      } else if (!runtime.grounded) {
        nextClip = runtime.jumpTakeoffMs > 0 ? "jump_takeoff" : "jump";
      } else if (runtime.hardLandMs > 0) {
        nextClip = "hard_land";
      } else if (runtime.jumpLandMs > 0) {
        nextClip = "jump_land";
      } else if (runtime.landingSettleMs > 0) {
        nextClip = "sprint_settle_a";
      } else if (canLookUp) {
        nextClip = "interact_loop";
      } else {
        nextClip = getLoopClipForState(nextState);
      }

      if (runtime.currentClip !== nextClip) {
        setClip(nextClip, timestamp);
      }

      advanceAnimationClip(deltaMs);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (pausedRef.current || !isHostVisible() || isEditableTarget(event.target)) {
        return;
      }

      let handled = false;
      const key = event.key;
      const code = event.code;

      if (key === "ArrowLeft" || key === "a" || key === "A" || code === "KeyA") {
        runtime.controls.left = true;
        handled = true;
      }

      if (key === "ArrowRight" || key === "d" || key === "D" || code === "KeyD") {
        runtime.controls.right = true;
        handled = true;
      }

      if (key === "ArrowDown" || key === "s" || key === "S" || code === "KeyS") {
        runtime.controls.down = true;
        handled = true;
      }

      if (
        key === "ArrowUp" ||
        key === "w" ||
        key === "W" ||
        code === "KeyW"
      ) {
        runtime.controls.lookUp = true;
        handled = true;
      }

      if (key === " " || code === "Space") {
        if (!event.repeat) {
          runtime.controls.jumpQueued = true;
        }
        handled = true;
      }

      if (handled) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let handled = false;
      const key = event.key;
      const code = event.code;

      if (key === "ArrowLeft" || key === "a" || key === "A" || code === "KeyA") {
        runtime.controls.left = false;
        handled = true;
      }

      if (key === "ArrowRight" || key === "d" || key === "D" || code === "KeyD") {
        runtime.controls.right = false;
        handled = true;
      }

      if (key === "ArrowDown" || key === "s" || key === "S" || code === "KeyS") {
        runtime.controls.down = false;
        handled = true;
      }

      if (
        key === "ArrowUp" ||
        key === "w" ||
        key === "W" ||
        code === "KeyW"
      ) {
        runtime.controls.lookUp = false;
        handled = true;
      }

      if (key === " " || code === "Space") {
        handled = true;
      }

      if (handled) {
        event.preventDefault();
      }
    };

    const resetControls = () => {
      runtime.controls.left = false;
      runtime.controls.right = false;
      runtime.controls.down = false;
      runtime.controls.lookUp = false;
      runtime.controls.jumpQueued = false;
      runtime.directionHoldMs = 0;
      runtime.heldDirection = 0;
    };

    const onVisibilityChange = () => {
      runtime.lastTickAt = null;
      if (document.visibilityState !== "visible") {
        resetControls();
      }
    };

    const onWindowBlur = () => {
      resetControls();
    };

    updateWorld();
    detectGuideTarget();
    setSpritePositionFromHitbox();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      updateWorld();
      setSpritePositionFromHitbox();
    });
    resizeObserver.observe(track);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const tick = (timestamp: number) => {
      if (document.visibilityState !== "visible") {
        runtime.lastTickAt = timestamp;
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      if (runtime.lastTickAt === null) {
        runtime.lastTickAt = timestamp;
        draw(timestamp);
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const deltaMs = Math.min(48, Math.max(0, timestamp - runtime.lastTickAt));
      runtime.lastTickAt = timestamp;

      updateWorld();

      if (!pausedRef.current) {
        applyMovement(deltaMs, timestamp);
      }

      detectGuideTarget();
      setSpritePositionFromHitbox();
      draw(timestamp);
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [armed, assetsReady, clipsById, enabled, guideEnabled, hostRef, isEligible]);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-10">
      <div
        ref={trackRef}
        className="relative overflow-visible"
        style={{ height: `${PIXEL_RUNNER_VISIBLE_TRACK_HEIGHT}px` }}
        aria-hidden
      >
        {showAnimatedRunner ? (
          <div
            ref={spriteRef}
            className="pointer-events-none absolute left-0 top-0 h-16 w-16 will-change-transform"
          >
            <canvas
              ref={canvasRef}
              width={RUNNER_SIZE}
              height={RUNNER_SIZE}
              className="h-16 w-16 [image-rendering:pixelated]"
            />
          </div>
        ) : null}
        <div
          ref={guideArrowRef}
          className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 opacity-0 will-change-transform"
        >
          <div className="absolute inset-0 rounded-full border border-[var(--line)] bg-[var(--paper)]/86 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.55)] backdrop-blur-[1px]" />
          <div className="absolute left-1/2 top-[24%] h-0 w-0 -translate-x-1/2 border-l-[5px] border-r-[5px] border-b-[9px] border-l-transparent border-r-transparent border-b-[var(--brand)] drop-shadow-[0_0_2px_rgba(241,80,37,0.45)]" />
          <div className="absolute left-1/2 top-[48%] h-2.5 w-[2px] -translate-x-1/2 rounded-full bg-[var(--brand)]" />
        </div>
      </div>
    </div>
  );
}
