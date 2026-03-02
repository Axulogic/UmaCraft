import type { RunnerClipId } from "@/lib/pixel-runner-motion";

export const PIXEL_RUNNER_BASE_PATH = "/assets/uma/pixel/Characters/agnestachyon";

export const PIXEL_RUNNER_ACTIONS = {
  idle: "agnes_tachyon_sprint_settle_a_agtc703",
  walk: "agnes_tachyon_run_pump_agtc700",
  run: "agnes_tachyon_sprint_dash_agtc701",
  climb: "agnes_tachyon_jump_hand_up_agtc161",
  climbHold: "agnes_tachyon_jump_hand_up_agtc161",
  hardLand: "agnes_tachyon_prone_recover_agtc300",
  jumpTakeoff: "agnes_tachyon_crouch_prep_agtc810",
  jump: "agnes_tachyon_roll_ball_cycle_agtc830",
  jumpLand: "agnes_tachyon_land_recover_agtc940",
  interactIntro: "agnes_tachyon_idle_wave_agtc540",
  interactLoop: "agnes_tachyon_idle_happy_agtc520",
  idleShift: "agnes_tachyon_idle_shift_agtc101",
  runStart: "agnes_tachyon_run_start_agtc160",
  dashStop: "agnes_tachyon_dash_stop_agtc163",
  sprintSettleA: "agnes_tachyon_sprint_settle_a_agtc703",
  sprintSettleB: "agnes_tachyon_sprint_settle_b_agtc704",
  turnBack: "agnes_tachyon_turn_back_agtc550",
} as const;

export const PIXEL_RUNNER_CLIP_TO_ACTION: Record<RunnerClipId, string> = {
  idle: PIXEL_RUNNER_ACTIONS.idle,
  walk: PIXEL_RUNNER_ACTIONS.walk,
  run: PIXEL_RUNNER_ACTIONS.run,
  climb: PIXEL_RUNNER_ACTIONS.climb,
  climb_hold: PIXEL_RUNNER_ACTIONS.climbHold,
  hard_land: PIXEL_RUNNER_ACTIONS.hardLand,
  jump_takeoff: PIXEL_RUNNER_ACTIONS.jumpTakeoff,
  jump: PIXEL_RUNNER_ACTIONS.jump,
  jump_land: PIXEL_RUNNER_ACTIONS.jumpLand,
  interact_intro: PIXEL_RUNNER_ACTIONS.interactIntro,
  interact_loop: PIXEL_RUNNER_ACTIONS.interactLoop,
  idle_shift: PIXEL_RUNNER_ACTIONS.idleShift,
  run_start: PIXEL_RUNNER_ACTIONS.runStart,
  dash_stop: PIXEL_RUNNER_ACTIONS.dashStop,
  sprint_settle_a: PIXEL_RUNNER_ACTIONS.sprintSettleA,
  sprint_settle_b: PIXEL_RUNNER_ACTIONS.sprintSettleB,
  turn_back: PIXEL_RUNNER_ACTIONS.turnBack,
};

export const PIXEL_RUNNER_CLIP_FRAME_COUNTS: Record<RunnerClipId, number> = {
  idle: 3,
  walk: 6,
  run: 8,
  climb: 4,
  climb_hold: 1,
  hard_land: 6,
  jump_takeoff: 1,
  jump: 3,
  jump_land: 4,
  interact_intro: 2,
  interact_loop: 3,
  idle_shift: 6,
  run_start: 4,
  dash_stop: 4,
  sprint_settle_a: 3,
  sprint_settle_b: 3,
  turn_back: 4,
};

export const PIXEL_RUNNER_CLIP_FRAME_MS: Record<RunnerClipId, number> = {
  idle: 132,
  walk: 82,
  run: 62,
  climb: 140,
  climb_hold: 120,
  hard_land: 120,
  jump_takeoff: 62,
  jump: 78,
  jump_land: 66,
  interact_intro: 110,
  interact_loop: 120,
  idle_shift: 80,
  run_start: 62,
  dash_stop: 70,
  sprint_settle_a: 95,
  sprint_settle_b: 86,
  turn_back: 68,
};

export const PIXEL_RUNNER_CRITICAL_CLIPS: RunnerClipId[] = [
  "idle",
  "walk",
  "run",
  "climb",
  "climb_hold",
  "hard_land",
  "jump_takeoff",
  "jump",
  "jump_land",
];

export const PIXEL_RUNNER_BACKGROUND_CLIPS: RunnerClipId[] = [
  "interact_intro",
  "interact_loop",
  "idle_shift",
  "run_start",
  "dash_stop",
  "sprint_settle_a",
  "sprint_settle_b",
  "turn_back",
];

export interface PixelRunnerClipRenderTuning {
  scale: number;
  offsetY: number;
  facingMode: "follow" | "invert" | "fixed_right" | "fixed_left";
}

export const PIXEL_RUNNER_CLIP_RENDER_TUNING: Record<
  RunnerClipId,
  PixelRunnerClipRenderTuning
> = {
  idle: { scale: 0.85, offsetY: 0, facingMode: "invert" },
  walk: { scale: 1, offsetY: 0, facingMode: "follow" },
  run: { scale: 1, offsetY: 0, facingMode: "follow" },
  climb: { scale: 1, offsetY: 1, facingMode: "invert" },
  climb_hold: { scale: 1, offsetY: 1, facingMode: "invert" },
  hard_land: { scale: 1, offsetY: 1, facingMode: "invert" },
  jump_takeoff: { scale: 1, offsetY: 1, facingMode: "invert" },
  jump: { scale: 1, offsetY: 1, facingMode: "invert" },
  jump_land: { scale: 1, offsetY: 1, facingMode: "invert" },
  interact_intro: { scale: 1, offsetY: 0, facingMode: "follow" },
  interact_loop: { scale: 1, offsetY: 0, facingMode: "follow" },
  idle_shift: { scale: 1, offsetY: 0, facingMode: "follow" },
  run_start: { scale: 1, offsetY: 0, facingMode: "follow" },
  dash_stop: { scale: 1, offsetY: 0, facingMode: "follow" },
  sprint_settle_a: { scale: 1, offsetY: 0, facingMode: "invert" },
  sprint_settle_b: { scale: 1, offsetY: 0, facingMode: "follow" },
  turn_back: { scale: 1, offsetY: 0, facingMode: "follow" },
};

export function buildFrameFileName(action: string, frame: number): string {
  return `${action}_f${String(frame).padStart(2, "0")}.png`;
}

export function buildFrameSource(action: string, frame: number): string {
  return `${PIXEL_RUNNER_BASE_PATH}/${buildFrameFileName(action, frame)}`;
}

export function buildClipSources(clipId: RunnerClipId): string[] {
  const action = PIXEL_RUNNER_CLIP_TO_ACTION[clipId];
  const frameCount = PIXEL_RUNNER_CLIP_FRAME_COUNTS[clipId];

  return Array.from({ length: frameCount }, (_, index) =>
    buildFrameSource(action, index),
  );
}

export function getClipSourcesById(): Record<RunnerClipId, string[]> {
  return {
    idle: buildClipSources("idle"),
    walk: buildClipSources("walk"),
    run: buildClipSources("run"),
    climb: buildClipSources("climb"),
    climb_hold: [buildFrameSource(PIXEL_RUNNER_ACTIONS.climbHold, 3)],
    hard_land: Array.from({ length: 6 }, (_, index) =>
      buildFrameSource(PIXEL_RUNNER_ACTIONS.hardLand, index + 2),
    ),
    jump_takeoff: buildClipSources("jump_takeoff"),
    jump: buildClipSources("jump"),
    jump_land: buildClipSources("jump_land"),
    interact_intro: buildClipSources("interact_intro"),
    interact_loop: buildClipSources("interact_loop"),
    idle_shift: buildClipSources("idle_shift"),
    run_start: buildClipSources("run_start"),
    dash_stop: buildClipSources("dash_stop"),
    sprint_settle_a: buildClipSources("sprint_settle_a"),
    sprint_settle_b: buildClipSources("sprint_settle_b"),
    turn_back: buildClipSources("turn_back"),
  };
}

export function getClipRenderTuning(clipId: RunnerClipId): PixelRunnerClipRenderTuning {
  return PIXEL_RUNNER_CLIP_RENDER_TUNING[clipId];
}
