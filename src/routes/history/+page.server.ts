import { db } from "$lib/server/db";

export function load() {
  const avoidances = db
    .prepare(
      `SELECT text, paused FROM history WHERE intention = 'Distraction' ORDER BY created_at DESC`,
    )
    .all();
  return {
    success: avoidances.filter((a) => a.paused),
    fail: avoidances.filter((a) => !a.paused),
  };
}
