// Prints the installed plugin root, or nothing when the optional dependency is absent.
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const detector = 'skills/impeccable/scripts/detect.mjs';
const rubric = 'skills/impeccable/reference/craft-floor.md';
const valid = root => existsSync(join(root, detector)) && existsSync(join(root, rubric));

function candidates(root, depth = 0) {
  if (valid(root)) return [root];
  if (depth >= 5) return [];
  let entries;
  try { entries = readdirSync(root, { withFileTypes: true }); }
  catch (error) {
    if (['ENOENT', 'EACCES', 'EPERM'].includes(error.code)) return [];
    throw error;
  }
  return entries.filter(entry => entry.isDirectory()).flatMap(entry =>
    candidates(join(root, entry.name), depth + 1));
}

export function resolveImpeccable(env = process.env, home = homedir()) {
  if (env.IMPECCABLE_DIR) {
    const explicit = resolve(env.IMPECCABLE_DIR);
    if (!valid(explicit)) throw new Error(`IMPECCABLE_DIR lacks detector or craft rubric: ${explicit}`);
    return explicit;
  }
  const roots = [join(env.CODEX_HOME || join(home, '.codex'), 'plugins/cache'),
    join(home, '.claude/plugins/cache')];
  for (const root of roots) {
    const found = candidates(root).sort((a, b) => b.localeCompare(a, 'en', { numeric: true }));
    if (found.length) return found[0];
  }
  return '';
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = resolveImpeccable();
    if (root) process.stdout.write(`${root}\n`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
