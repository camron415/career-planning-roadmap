import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { syncJobEvaluations } from "../lib/scoring/service";
import { createSchema, seedPreviewData, type DatabaseLike } from "./schema";

type DatabaseConstructor = new (path: string) => DatabaseLike;

const require = createRequire(import.meta.url);
const Database = require("better-sqlite3") as DatabaseConstructor;

declare global {
  var __careerDashboardDb: DatabaseLike | undefined;
}

const dataDirectory = join(process.cwd(), "data");

export const databaseFilePath = join(dataDirectory, "career-dashboard.sqlite");

function initializeDatabase() {
  mkdirSync(dataDirectory, { recursive: true });

  const database = new Database(databaseFilePath);

  database.exec("PRAGMA foreign_keys = ON;");
  createSchema(database);
  seedPreviewData(database);
  syncJobEvaluations(database);

  return database;
}

export const db = globalThis.__careerDashboardDb ?? initializeDatabase();

if (!globalThis.__careerDashboardDb) {
  globalThis.__careerDashboardDb = db;
}