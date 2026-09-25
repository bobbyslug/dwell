import type { Step } from "./types";

export const session = $state<{ step: Step }>({ step: "COUNTDOWN" });
