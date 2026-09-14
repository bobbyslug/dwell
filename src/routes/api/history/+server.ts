import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { intention, text, paused } = await request.json();

  if (!text?.trim()) {
    return json({ message: "text is required", status: 400 });
  }

  db.prepare("INSERT INTO history (intention, text, paused, created_at) VALUES (?, ?, ?, ?)").run(
    intention,
    text,
    paused ? 1 : 0,
    Date.now(),
  );

  return json({ ok: true }, { status: 201 });
};
