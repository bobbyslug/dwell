import { db } from "$lib/server/db";
import type { Avoidance } from "$lib/types";

export function load() {
  const avoidances = db
    .prepare(
      `SELECT text, paused FROM history WHERE intention = 'Distraction' ORDER BY created_at DESC`,
    )
    .all() as Avoidance[];
  return {
    success: avoidances.filter((a) => a.paused),
    fail: avoidances.filter((a) => !a.paused),
  };
}
