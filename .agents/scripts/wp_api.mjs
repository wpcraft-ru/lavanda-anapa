#!/usr/bin/env node
/**
 * WordPress REST API client helper.
 * Reads WP_BASE_URL, WP_USER, WP_APP_PASSWORD from .env file or environment.
 *
 * Usage:
 *   node .agents/scripts/wp_api.mjs                                    # connection test
 *   node .agents/scripts/wp_api.mjs --path posts                       # list posts
 *   node .agents/scripts/wp_api.mjs --path posts/123 --raw             # get raw content
 *   node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --file content.json
 *   node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --raw --replace '[["old","new"]]'
 */

import { loadEnv } from "./functions.mjs";
import { readFileSync } from "fs";

// --- WP request helper ---

let _baseUrl, _authHeader;

function initWP() {
  const baseUrl = (process.env.WP_BASE_URL || "").replace(/\/$/, "");
  const user = process.env.WP_USER || "";
  const appPassword = (process.env.WP_APP_PASSWORD || "").replace(/\s+/g, "");

  if (!baseUrl) throw new Error("WP_BASE_URL not set");
  if (!user || !appPassword) throw new Error("WP_USER or WP_APP_PASSWORD not set");

  _baseUrl = baseUrl;
  _authHeader = "Basic " + Buffer.from(`${user}:${appPassword}`).toString("base64");
}

async function wpRequest(method, path, { body, params, headers: extraHeaders } = {}) {
  let url = `${_baseUrl}/wp-json/wp/v2/${path.replace(/^\//, "")}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
    ).toString();
    if (qs) url += "?" + qs;
  }

  const headers = {
    Authorization: _authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(extraHeaders || {}),
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.message || JSON.stringify(data);
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  return data;
}

// --- CLI dispatcher (run directly) ---

function parseArg(flag) {
  const idx = process.argv.indexOf(flag);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  loadEnv({ check: true });
  initWP();

  const path = parseArg('--path');
  const method = parseArg('--method');
  const dataRaw = parseArg('--data');
  const headerRaw = parseArg('--header');
  const rawFlag = process.argv.includes('--raw');
  const filePath = parseArg('--file');
  const replaceRaw = parseArg('--replace');

  if (!path) {
    // Default: connection test
    console.log(`Connecting to: ${_baseUrl}/wp-json/wp/v2/\n`);
    try {
      const posts = await wpRequest("GET", "posts", {
        params: { per_page: 5, _fields: "id,title,status,date" }
      });
      console.log(`Latest posts (${posts.length} returned):`);
      for (const p of posts) {
        const title = p.title?.rendered ?? p.title ?? "";
        console.log(`  [${p.id}] ${title} — ${p.status} — ${p.date?.slice(0, 10)}`);
      }

      const cats = await wpRequest("GET", "categories", {
        params: { per_page: 10, _fields: "id,name,count" }
      });
      console.log(`\nCategories (${cats.length} returned):`);
      for (const c of cats) {
        console.log(`  [${c.id}] ${c.name} — ${c.count ?? 0} posts`);
      }

      console.log("\n✓ Connection OK");
    } catch (err) {
      console.error(`\n✗ Connection failed: ${err.message}`);
      console.error("Make sure WP_BASE_URL, WP_USER, WP_APP_PASSWORD are set in .env");
      process.exit(1);
    }
  } else {
    const m = (method || 'GET').toUpperCase();
    let parsed = undefined;

    // --file: read body from file
    if (filePath) {
      try {
        const fileContent = readFileSync(filePath, 'utf8');
        parsed = JSON.parse(fileContent);
      } catch (err) {
        console.error(`✗ Failed to read --file: ${err.message}`);
        process.exit(1);
      }
    } else if (dataRaw) {
      try { parsed = JSON.parse(dataRaw); } catch { parsed = dataRaw; }
    }

    // Parse --header as JSON object, e.g. '{"X-Custom":"value"}'
    let extraHeaders = undefined;
    if (headerRaw) {
      try { extraHeaders = JSON.parse(headerRaw); } catch { extraHeaders = {}; }
    }

    // --raw: add context=edit to GET requests
    const reqPath = (rawFlag && m === 'GET' && !path.includes('context='))
      ? `${path}?context=edit`
      : path;

    const reqOpts = { headers: extraHeaders };
    if (m === 'GET') {
      reqOpts.params = typeof parsed === 'object' ? parsed : {};
    } else {
      reqOpts.body = parsed;
    }

    try {
      let result;

      // --replace: fetch raw, apply string replacements, then PUT
      if (replaceRaw && m === 'PUT') {
        let replacements;
        try {
          replacements = JSON.parse(replaceRaw);
        } catch {
          console.error('✗ --replace must be valid JSON array of [old, new] pairs');
          process.exit(1);
        }
        if (!Array.isArray(replacements)) {
          console.error('✗ --replace must be a JSON array');
          process.exit(1);
        }

        const post = await wpRequest("GET", `${path}?context=edit`);
        let raw = post.content.raw;
        for (const [old, neu] of replacements) {
          if (raw.includes(old)) {
            raw = raw.replace(old, neu);
            console.error(`  ✓ replaced: ${old.slice(0, 60)}...`);
          } else {
            console.error(`  ✗ NOT FOUND: ${old.slice(0, 60)}...`);
          }
        }
        result = await wpRequest("PUT", path, { content: raw });
      } else {
        result = await wpRequest(m, reqPath, reqOpts);
      }

      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(`✗ ${m} ${path} failed: ${err.message}`);
      process.exit(1);
    }
  }
}
