#!/usr/bin/env node
/**
 * prebuild.cjs — mirror the repo-root data directory into public/ so Astro
 * includes it in dist/. Keeps the canonical data at repo root for
 * jsDelivr URL stability (https://cdn.jsdelivr.net/gh/oriz-org/dynasties-api@main/dynasties/<SLUG>.json).
 *
 * Hardlinks where possible (faster, atomic), falls back to copyFile.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');

const ENTRIES = ['dynasties', 'all.json', 'index.json', 'timeline.json', 'eras.json'];

function mirror(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      mirror(path.join(src, name), path.join(dst, name));
    }
    return;
  }
  try { fs.unlinkSync(dst); } catch {}
  try {
    fs.linkSync(src, dst);
  } catch {
    fs.copyFileSync(src, dst);
  }
}

fs.mkdirSync(PUB, { recursive: true });

for (const entry of ENTRIES) {
  const src = path.join(ROOT, entry);
  const dst = path.join(PUB, entry);
  if (!fs.existsSync(src)) {
    console.warn(`[prebuild] missing: ${src} — skipping`);
    continue;
  }
  if (fs.existsSync(dst) && fs.statSync(dst).isDirectory()) {
    fs.rmSync(dst, { recursive: true, force: true });
  }
  mirror(src, dst);
  console.log(`[prebuild] mirrored ${entry} -> public/${entry}`);
}

console.log('[prebuild] done');
