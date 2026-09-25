import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async () => {
  const { changes } = db.prepare("DELETE FROM history").run();
  return json({ rowsDeleted: changes });
};
