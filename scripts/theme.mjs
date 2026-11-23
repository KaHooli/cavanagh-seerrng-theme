// Validate and package the Cavanagh interface theme with SeerrNG's own
// validator (vendored in vendor/seerrng). The .seerrtheme bundle and its
// .sha256 file use the same format as `pnpm interface-theme:pack`.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createJiti } from 'jiti';

const root = path.resolve(import.meta.dirname, '..');
const themeDirectory = path.join(root, 'cavanagh');
const jiti = createJiti(import.meta.url);
const { validateInterfaceThemePackage } = await jiti.import(
  path.join(root, 'vendor/seerrng/interfaceThemePackage.ts')
);
const { INTERFACE_THEME_IDS } = await jiti.import(
  path.join(root, 'vendor/seerrng/interfaceTheme.ts')
);

const rejectBuiltIn = (theme) => {
  if (INTERFACE_THEME_IDS.includes(theme.manifest.id)) {
    throw new Error('Custom theme packages cannot replace built-in themes.');
  }
  return theme;
};

const readThemeDirectory = (directory) => {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(path.join(directory, 'manifest.json'), 'utf8'));
  } catch {
    throw new Error('manifest.json is missing or is not valid JSON.');
  }
  const css = readFileSync(path.join(directory, 'theme.css'), 'utf8');
  return rejectBuiltIn(validateInterfaceThemePackage(manifest, css));
};

const readThemeBundle = (filename) => {
  const bundle = JSON.parse(readFileSync(filename, 'utf8'));
  if (
    typeof bundle !== 'object' ||
    bundle === null ||
    Array.isArray(bundle) ||
    Object.keys(bundle).some((key) => !['formatVersion', 'manifest', 'css'].includes(key)) ||
    bundle.formatVersion !== 1
  ) {
    throw new Error('Unsupported .seerrtheme package format.');
  }
  return rejectBuiltIn(validateInterfaceThemePackage(bundle.manifest, bundle.css));
};

const serializeBundle = (theme) =>
  `${JSON.stringify({ formatVersion: 1, manifest: theme.manifest, css: theme.css }, null, 2)}\n`;

const [command, input] = process.argv.slice(2);
try {
  if (command === 'validate') {
    const target = path.resolve(input ?? themeDirectory);
    const theme = target.endsWith('.seerrtheme')
      ? readThemeBundle(target)
      : readThemeDirectory(target);
    console.log(`Valid: ${theme.manifest.name} (${theme.manifest.id}) v${theme.manifest.version}`);
  } else if (command === 'pack') {
    const theme = readThemeDirectory(path.resolve(input ?? themeDirectory));
    const outputDirectory = path.join(root, 'dist');
    mkdirSync(outputDirectory, { recursive: true });
    const filename = `${theme.manifest.id}-${theme.manifest.version}.seerrtheme`;
    const contents = serializeBundle(theme);
    const checksum = createHash('sha256').update(contents).digest('hex');
    writeFileSync(path.join(outputDirectory, filename), contents);
    writeFileSync(path.join(outputDirectory, `${filename}.sha256`), `${checksum}  ${filename}\n`);
    console.log(`Packed dist/${filename} (sha256 ${checksum})`);
  } else {
    console.error('Usage: node scripts/theme.mjs <validate [directory|file.seerrtheme] | pack [directory]>');
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
