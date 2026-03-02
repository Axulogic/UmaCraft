import { clampTrackX } from "@/lib/pixel-runner-motion";

const TRACK_HEIGHT = 72;
const LINE_THICKNESS = 1;

export interface PixelRunnerWorldPlatformSchema {
  id: string;
  startRatio: number;
  endRatio: number;
  elevation: number;
}

export interface PixelRunnerWorldClimbPlatformSchema {
  id: string;
  xRatio: number;
  topElevation: number;
  bottomElevation: number;
}

export interface PixelRunnerWorldSchema {
  trackHeight: number;
  lineThickness: number;
  groundInset: number;
  hitboxSize: number;
  hitboxOffsetX: number;
  hitboxOffsetY: number;
  walkSpeed: number;
  runSpeed: number;
  acceleration: number;
  airAcceleration: number;
  deceleration: number;
  gravity: number;
  jumpVelocity: number;
  maxFallSpeed: number;
  runHoldMs: number;
  platforms: PixelRunnerWorldPlatformSchema[];
  climbPlatforms: PixelRunnerWorldClimbPlatformSchema[];
}

export interface PixelRunnerWorldLine {
  id: string;
  sourceIndex: number;
  startX: number;
  endX: number;
  y: number;
}

export interface PixelRunnerWorldEndpoint {
  platformId: string;
  x: number;
  y: number;
}

export interface PixelRunnerWorldClimbLine {
  id: string;
  sourceIndex: number;
  x: number;
  topY: number;
  bottomY: number;
}

export interface PixelRunnerWorld {
  width: number;
  minX: number;
  maxX: number;
  trackHeight: number;
  groundY: number;
  groundInset: number;
  lineThickness: number;
  hitboxSize: number;
  hitboxOffsetX: number;
  hitboxOffsetY: number;
  walkSpeed: number;
  runSpeed: number;
  acceleration: number;
  airAcceleration: number;
  deceleration: number;
  gravity: number;
  jumpVelocity: number;
  maxFallSpeed: number;
  runHoldMs: number;
  lines: PixelRunnerWorldLine[];
  endpoints: PixelRunnerWorldEndpoint[];
  climbLines: PixelRunnerWorldClimbLine[];
}

export const PIXEL_RUNNER_WORLD_SCHEMA: PixelRunnerWorldSchema = {
  trackHeight: TRACK_HEIGHT,
  lineThickness: LINE_THICKNESS,
  groundInset: 26,
  hitboxSize: 50,
  hitboxOffsetX: 5,
  hitboxOffsetY: 14,
  walkSpeed: 140,
  runSpeed: 260,
  acceleration: 980,
  airAcceleration: 620,
  deceleration: 1050,
  gravity: 1500,
  jumpVelocity: 470,
  maxFallSpeed: 840,
  runHoldMs: 260,
  platforms: [
    // Plataforma principal.
    { id: "ground", startRatio: 0, endRatio: 1, elevation: 0 },
    // Plataforma da esquerda inferior 1.
    { id: "left-upper", startRatio: 0.14, endRatio: 0.42, elevation: 53 },
    // Plataforma da direita inferior 1.
    { id: "right-upper", startRatio: 0.58, endRatio: 0.9, elevation: 53 },
    // Plataforma da esquerda superior 1.
    { id: "left-lower", startRatio: 0.123, endRatio: 0.250, elevation: 348 },
    // Plataforma do meio superior 1.
    { id: "left-lower", startRatio: 0.278, endRatio: 0.406, elevation: 348 },
    // Plataforma da direita superior 1.
    { id: "left-lower", startRatio: 0.433, endRatio: 0.561, elevation: 348 },
    // Plataforma da direita topo 1.
    { id: "left-lower", startRatio: 0.115, endRatio: 0.164, elevation: 417 },
    // Plataforma da direita topo 2.
    { id: "left-lower", startRatio: 0.192, endRatio: 0.212, elevation: 479 },
    // Plataforma do meio topo 1.
    { id: "left-lower", startRatio: 0.241, endRatio: 0.283, elevation: 490 },
    // Plataforma do meio topo 2.
    { id: "left-lower", startRatio: 0.345, endRatio: 0.365, elevation: 476 },
    // Plataforma da esquerda topo 1.
    { id: "left-lower", startRatio: 0.424, endRatio: 0.472, elevation: 493 },
    // Plataforma da esquerda topo 2.
    { id: "left-lower", startRatio: 0.488, endRatio: 0.569, elevation: 532 },
    // Plataforma da esquerda topo Final.
    { id: "left-lower", startRatio: 0.648, endRatio: 0.835, elevation: 542 },
  ],
  climbPlatforms: [
    // Escalada A: coluna direta 1.
    { id: "climb-a", xRatio: 0.628, topElevation: 255, bottomElevation: 110 },
    // Escalada B: coluna da esquerda 2.
    { id: "climb-b", xRatio: 0.569, topElevation: 340, bottomElevation: 172 },
    // Escalada C: coluna da direita superior 1.
    { id: "climb-c", xRatio: 0.628, topElevation: 387, bottomElevation: 310 },
  ],
};

export const PIXEL_RUNNER_TRACK_HEIGHT = PIXEL_RUNNER_WORLD_SCHEMA.trackHeight;
export const PIXEL_RUNNER_VISIBLE_TRACK_HEIGHT = Math.max(
  1,
  PIXEL_RUNNER_TRACK_HEIGHT - PIXEL_RUNNER_WORLD_SCHEMA.groundInset,
);

export function createPixelRunnerWorld(trackWidth: number): PixelRunnerWorld {
  const schema = PIXEL_RUNNER_WORLD_SCHEMA;
  const width = Math.max(64, Math.round(trackWidth));
  const maxInset = Math.max(0, schema.trackHeight - schema.lineThickness - 1);
  const groundInset = clampTrackX(schema.groundInset, 0, maxInset);
  const groundY = schema.trackHeight - schema.lineThickness - groundInset;

  const lines: PixelRunnerWorldLine[] = schema.platforms
    .map((platform, sourceIndex) => {
      const rawStartX = Math.round(platform.startRatio * width);
      const rawEndX = Math.round(platform.endRatio * width);
      const startX = clampTrackX(Math.min(rawStartX, rawEndX), 0, width);
      const endX = clampTrackX(Math.max(rawStartX, rawEndX), 0, width);
      return {
        id: platform.id,
        sourceIndex,
        startX,
        endX,
        y: groundY - platform.elevation,
      };
    })
    .filter((line) => line.endX - line.startX >= 1)
    .sort((left, right) => left.y - right.y);

  const endpoints: PixelRunnerWorldEndpoint[] = lines
    .filter((line) => line.id !== "ground")
    .flatMap((line) => [
      { platformId: line.id, x: line.startX, y: line.y },
      { platformId: line.id, x: line.endX, y: line.y },
    ]);

  const climbLines: PixelRunnerWorldClimbLine[] = schema.climbPlatforms
    .map((platform, sourceIndex) => {
      const x = clampTrackX(Math.round(platform.xRatio * width), 0, width);
      const rawTopY = groundY - platform.topElevation;
      const rawBottomY = groundY - platform.bottomElevation;
      const topY = Math.min(rawTopY, rawBottomY);
      const bottomY = Math.max(rawTopY, rawBottomY);

      return {
        id: platform.id,
        sourceIndex,
        x,
        topY,
        bottomY,
      };
    })
    .filter((line) => line.bottomY - line.topY >= 1);

  return {
    width,
    minX: 0,
    maxX: Math.max(0, width - schema.hitboxSize),
    trackHeight: schema.trackHeight,
    groundY,
    groundInset,
    lineThickness: schema.lineThickness,
    hitboxSize: schema.hitboxSize,
    hitboxOffsetX: schema.hitboxOffsetX,
    hitboxOffsetY: schema.hitboxOffsetY,
    walkSpeed: schema.walkSpeed,
    runSpeed: schema.runSpeed,
    acceleration: schema.acceleration,
    airAcceleration: schema.airAcceleration,
    deceleration: schema.deceleration,
    gravity: schema.gravity,
    jumpVelocity: schema.jumpVelocity,
    maxFallSpeed: schema.maxFallSpeed,
    runHoldMs: schema.runHoldMs,
    lines,
    endpoints,
    climbLines,
  };
}
