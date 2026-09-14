import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("dwell.db");

db.exec(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    intention TEXT NOT NULL,
    text TEXT,
    paused INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )
`);
