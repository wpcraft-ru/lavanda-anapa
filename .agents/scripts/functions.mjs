/**
 * Shared helper functions for scripts.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

/**
 * Load .env from the project root (CWD). Skips variables already in process.env.
 * Returns the loaded file path, or null if .env is missing.
 *
 * If check:true, prints a message and exits when .env is missing.
 */
export function loadEnv(opts = {}) {
  const file = join(process.cwd(), ".env");

  if (!existsSync(file)) {
    if (opts.check) {
      console.error("✗ .env file not found in project root. Create one with the required variables.");
      process.exit(1);
    }
    return null;
  }

  const lines = readFileSync(file, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const idx = trimmed.indexOf("=");
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
  return file;
}
