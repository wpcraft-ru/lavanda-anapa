#!/usr/bin/env node
/**
 * WooCommerce REST API client helper.
 * Reads WOO_BASE_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET from .env file or environment.
 *
 * Usage:
 *   node .agents/scripts/woo_api.mjs                                    # connection test
 *   node .agents/scripts/woo_api.mjs --path products                    # list products
 *   node .agents/scripts/woo_api.mjs --method POST --path products --data '{"name":"...","status":"draft"}'
 *   node .agents/scripts/woo_api.mjs --path products --data '{"per_page":5,"_fields":"id,name,price"}'
 */

import { loadEnv } from "./functions.mjs";

// --- WOO request helper ---

let _baseUrl, _authHeader;

function initWoo() {
  const baseUrl = (process.env.WOO_BASE_URL || "").replace(/\/$/, "");
  const ck = process.env.WOO_CONSUMER_KEY || "";
  const cs = process.env.WOO_CONSUMER_SECRET || "";

  if (!baseUrl) throw new Error("WOO_BASE_URL not set");
  if (!ck || !cs) throw new Error("WOO_CONSUMER_KEY or WOO_CONSUMER_SECRET not set");

  _baseUrl = baseUrl;
  _authHeader = "Basic " + Buffer.from(`${ck}:${cs}`).toString("base64");
}

async function wooRequest(method, path, { body, params, headers: extraHeaders } = {}) {
  let url = `${_baseUrl}/wp-json/wc/v3/${path.replace(/^\//, "")}`;
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
  initWoo();

  const path = parseArg('--path');
  const method = parseArg('--method');
  const dataRaw = parseArg('--data');
  const headerRaw = parseArg('--header');

  if (!path) {
    // Default: connection test
    console.log(`Connecting to: ${_baseUrl}/wp-json/wc/v3/\n`);
    try {
      const products = await wooRequest("GET", "products", {
        params: { per_page: 5, _fields: "id,name,status,price,stock_quantity" }
      });
      console.log(`Latest products (${products.length} returned):`);
      for (const p of products) {
        const stock = p.stock_quantity ?? "?";
        console.log(`  [${p.id}] ${p.name} — ${p.status} — ${p.price} ₽ (stock: ${stock})`);
      }

      const cats = await wooRequest("GET", "products/categories", {
        params: { per_page: 10, _fields: "id,name,count" }
      });
      console.log(`\nCategories (${cats.length} returned):`);
      for (const c of cats) {
        console.log(`  [${c.id}] ${c.name} — ${c.count ?? 0} products`);
      }

      console.log("\n✓ Connection OK");
    } catch (err) {
      console.error(`\n✗ Connection failed: ${err.message}`);
      console.error("Make sure WOO_BASE_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET are set in .env");
      process.exit(1);
    }
  } else {
    const m = (method || 'GET').toUpperCase();
    let parsed = undefined;
    if (dataRaw) {
      try { parsed = JSON.parse(dataRaw); } catch { parsed = dataRaw; }
    }

    // Parse --header as JSON object, e.g. '{"X-Custom":"value"}'
    let extraHeaders = undefined;
    if (headerRaw) {
      try { extraHeaders = JSON.parse(headerRaw); } catch { extraHeaders = {}; }
    }

    const reqOpts = { headers: extraHeaders };
    if (m === 'GET') {
      reqOpts.params = typeof parsed === 'object' ? parsed : {};
    } else {
      reqOpts.body = parsed;
    }

    try {
      const result = await wooRequest(m, path, reqOpts);
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(`✗ ${m} ${path} failed: ${err.message}`);
      process.exit(1);
    }
  }
}
