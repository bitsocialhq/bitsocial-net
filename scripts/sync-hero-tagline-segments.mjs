#!/usr/bin/env node
/**
 * Populates hero.taglineSegments in each locale default.json by parsing the
 * tagged spans from hero.tagline. Run after editing hero.tagline so feature
 * card titles stay aligned with the hero Trans components.
 */
import fs from "fs/promises";
import path from "path";

const TAGS = ["openSource", "p2p", "socialApps", "noServers", "noBans", "crypto"];
const root = path.join(import.meta.dirname, "..", "public", "translations");

const langs = await fs.readdir(root);
let errors = 0;

for (const lang of langs) {
  const filePath = path.join(root, lang, "default.json");
  let raw;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    continue;
  }
  const j = JSON.parse(raw);
  const tl = j.hero?.tagline;
  if (typeof tl !== "string") {
    console.error(`skip (no hero.tagline): ${lang}`);
    continue;
  }
  const segments = {};
  let ok = true;
  for (const tag of TAGS) {
    const re = new RegExp(`<${tag}>([^<]*)</${tag}>`);
    const m = tl.match(re);
    if (!m) {
      console.error(`missing <${tag}> in ${lang}`);
      ok = false;
      break;
    }
    segments[tag] = m[1];
  }
  if (!ok) {
    errors++;
    continue;
  }
  j.hero.taglineSegments = segments;
  await fs.writeFile(filePath, `${JSON.stringify(j, null, 2)}\n`, "utf8");
  console.log(`synced ${lang}`);
}

if (errors) process.exit(1);
