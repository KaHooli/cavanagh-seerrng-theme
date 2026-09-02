import { access, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(path.join(root, 'theme.json'), 'utf8'));
const errors = [];
const hex = /^#[0-9a-f]{6}$/i;

if (manifest.schemaVersion !== 1) errors.push('schemaVersion must be 1');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.id ?? '')) {
  errors.push('id must be lowercase kebab-case');
}
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version ?? '')) {
  errors.push('version must be semantic');
}
if (!Array.isArray(manifest.swatches) || manifest.swatches.length < 2 ||
    manifest.swatches.length > 6 || manifest.swatches.some((color) => !hex.test(color))) {
  errors.push('swatches must contain 2-6 hex colours');
}
for (const scale of ['surface', 'primary', 'secondary']) {
  const colors = manifest.colors?.[scale];
  if (!Array.isArray(colors) || colors.length !== 11 || colors.some((color) => !hex.test(color))) {
    errors.push(`${scale} must contain exactly 11 hex colours`);
  }
}
for (const [name, relative] of Object.entries(manifest.assets ?? {})) {
  if (typeof relative !== 'string' || relative.includes('..') || path.isAbsolute(relative)) {
    errors.push(`${name} has an unsafe path`);
    continue;
  }
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(`${root}${path.sep}`)) {
    errors.push(`${name} escapes the theme directory`);
    continue;
  }
  try {
    await access(absolute);
    const assetStat = await stat(absolute);
    if (!assetStat.isFile() || assetStat.size > 16 * 1024 * 1024) {
      errors.push(`${name} is not a valid asset`);
    }
  } catch {
    errors.push(`${name} is missing: ${relative}`);
  }
}

if (errors.length) {
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Validated ${manifest.name} ${manifest.version}`);
}
