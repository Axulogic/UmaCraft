export type RunnerState = "idle" | "walk" | "run" | "interact";

export type RunnerLocomotion = "idle" | "walk" | "run";

export type RunnerProfile = "smooth";

export type RunnerFacing = 1 | -1;

export type RunnerClipId =
  | "idle"
  | "walk"
  | "run"
  | "climb"
  | "climb_hold"
  | "hard_land"
  | "jump_takeoff"
  | "jump"
  | "jump_land"
  | "interact_intro"
  | "interact_loop"
  | "idle_shift"
  | "run_start"
  | "dash_stop"
  | "sprint_settle_a"
  | "sprint_settle_b"
  | "turn_back";

const WALK_SPEED_THRESHOLD = 180;
const RUN_SPEED_THRESHOLD = 920;
const IDLE_HOLD_MS = 130;
const POINTER_STILLNESS_MS = 160;
const DEFAULT_TRACK_SPAN = 900;

export interface ResolveDesiredStateInput {
  interactive: boolean;
  distance: number;
  pointerSpeed: number;
  now: number;
  lastPointerMoveAt: number;
  trackSpan?: number;
  profile?: RunnerProfile;
}

export interface ShouldTurnAroundInput {
  currentState: RunnerState;
  facing: RunnerFacing;
  distance: number;
  deadZone?: number;
}

export function clampTrackX(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getLoopClipForState(state: RunnerState): RunnerClipId {
  if (state === "interact") {
    return "interact_loop";
  }

  return state;
}

export function getStateFromLoopClip(clipId: RunnerClipId): RunnerState | null {
  switch (clipId) {
    case "idle":
      return "idle";
    case "walk":
      return "walk";
    case "run":
      return "run";
    case "interact_loop":
      return "interact";
    default:
      return null;
  }
}

export function isLoopClip(clipId: RunnerClipId): boolean {
  return (
    clipId === "idle" ||
    clipId === "walk" ||
    clipId === "run" ||
    clipId === "climb" ||
    clipId === "climb_hold" ||
    clipId === "jump" ||
    clipId === "interact_loop"
  );
}

export function chooseLocomotion(params: {
  distance: number;
  pointerSpeed: number;
  now: number;
  lastPointerMoveAt: number;
  trackSpan?: number;
  profile?: RunnerProfile;
}): RunnerLocomotion {
  const profile = params.profile ?? "smooth";
  const absDistance = Math.abs(params.distance);
  const moveAge = params.now - params.lastPointerMoveAt;
  const trackSpan = Math.max(params.trackSpan ?? DEFAULT_TRACK_SPAN, 1);
  const idleDeadZone = Math.max(2, Math.min(5, Math.round(trackSpan * 0.004)));
  const walkDistance = Math.max(6, Math.min(14, Math.round(trackSpan * 0.012)));
  const runDistance = Math.max(72, Math.min(220, Math.round(trackSpan * 0.17)));
  const pointerIsRecent = moveAge <= POINTER_STILLNESS_MS;

  if (profile !== "smooth") {
    return "idle";
  }

  if (absDistance <= idleDeadZone && moveAge >= IDLE_HOLD_MS) {
    return "idle";
  }

  if (!pointerIsRecent && absDistance <= walkDistance) {
    return "idle";
  }

  const runByDistance = absDistance >= runDistance;
  const runBySpeed =
    params.pointerSpeed >= RUN_SPEED_THRESHOLD &&
    absDistance >= Math.round(walkDistance * 1.4);
  if (runByDistance || runBySpeed) {
    return "run";
  }

  if (absDistance > idleDeadZone || params.pointerSpeed >= WALK_SPEED_THRESHOLD) {
    return "walk";
  }

  return "idle";
}

export function resolveDesiredState(input: ResolveDesiredStateInput): RunnerState {
  if (input.interactive) {
    return "interact";
  }

  return chooseLocomotion({
    distance: input.distance,
    pointerSpeed: input.pointerSpeed,
    now: input.now,
    lastPointerMoveAt: input.lastPointerMoveAt,
    trackSpan: input.trackSpan,
    profile: input.profile,
  });
}

export function shouldTurnAround(input: ShouldTurnAroundInput): boolean {
  if (input.currentState !== "walk" && input.currentState !== "run") {
    return false;
  }

  const deadZone = input.deadZone ?? 4;
  if (Math.abs(input.distance) <= deadZone) {
    return false;
  }

  const desiredFacing: RunnerFacing = input.distance > 0 ? 1 : -1;
  return desiredFacing !== input.facing;
}

export function buildTransitionQueue(from: RunnerState, to: RunnerState): RunnerClipId[] {
  if (from === to) {
    return [getLoopClipForState(to)];
  }

  if (to === "interact") {
    return ["interact_intro", "interact_loop"];
  }

  if (from === "interact") {
    if (to === "run") {
      return ["idle_shift", "run_start", "run"];
    }

    if (to === "walk") {
      return ["idle_shift", "walk"];
    }

    return ["idle_shift", "idle"];
  }

  if (from === "idle" && to === "walk") {
    return ["idle_shift", "walk"];
  }

  if (from === "idle" && to === "run") {
    return ["run_start", "run"];
  }

  if (from === "walk" && to === "run") {
    return ["run_start", "run"];
  }

  if (from === "run" && to === "walk") {
    return ["dash_stop", "sprint_settle_b", "walk"];
  }

  if (from === "run" && to === "idle") {
    return ["dash_stop", "sprint_settle_b", "sprint_settle_a", "idle"];
  }

  if (from === "walk" && to === "idle") {
    return ["idle_shift", "idle"];
  }

  return [getLoopClipForState(to)];
}

function parseFrameNumberFromSource(source: string): number {
  const match = source.match(/_f(\d+)\.png$/i);
  if (!match) {
    return -1;
  }

  return Number.parseInt(match[1] ?? "-1", 10);
}

export function sortFrameSources(sources: readonly string[]): string[] {
  return [...sources].sort((left, right) => {
    const leftFrame = parseFrameNumberFromSource(left);
    const rightFrame = parseFrameNumberFromSource(right);

    if (leftFrame !== rightFrame) {
      return leftFrame - rightFrame;
    }

    return left.localeCompare(right);
  });
}
