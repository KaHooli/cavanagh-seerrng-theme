# Cavanagh theme for SeerrNG

A SeerrNG interface theme in the Cavanagh Family colours, for dark and light
mode. It uses SeerrNG's PersiusNG layout (cinematic discovery, captions under
posters, compact requests) and changes only the colours.

| Package ID | Layout    | Built and validated against              |
| ---------- | --------- | ---------------------------------------- |
| `cavanagh` | `persius` | SeerrNG 3.72.40 (`snapetech-org/seerrng`) |

SeerrNG interface themes are CSS only: they cannot ship images, fonts or
icons. Version 2.0.0 therefore drops the crest icons, favicons and login
backgrounds that the 1.x packages carried. SeerrNG releases from before
interface themes were introduced cannot install this package; use a 1.x
release with those.

## Install

Download `cavanagh-<version>.seerrtheme` and its `.sha256` file from the
[latest release](https://github.com/KaHooli/cavanagh-seerrng-theme/releases/latest)
and check the download:

```sh
sha256sum --check cavanagh-2.0.0.seerrtheme.sha256
```

### Docker (`ghcr.io/snapetech-org/seerrng`)

Put the file in the folder mapped to `/app/config` (on Unraid usually
`/mnt/user/appdata/seerrng`), then install it with the CLI inside the
container. Replace `seerrng` with your container's name:

```sh
docker exec seerrng node dist/commands/interfaceTheme.js validate /app/config/cavanagh-2.0.0.seerrtheme
docker exec seerrng node dist/commands/interfaceTheme.js install /app/config/cavanagh-2.0.0.seerrtheme
docker restart seerrng
```

The installer copies the theme into `/app/config/interface-themes/cavanagh`,
so the downloaded file can be deleted afterwards.

### From a SeerrNG checkout

Run the commands as the application user, with the same `CONFIG_DIRECTORY`:

```sh
pnpm interface-theme:validate ./cavanagh-2.0.0.seerrtheme
pnpm interface-theme:install ./cavanagh-2.0.0.seerrtheme
```

Then restart SeerrNG.

### Choose the theme

Interface themes apply to full SeerrNG, not to Lumen. If SeerrNG opens in
Lumen, use full SeerrNG at `/seerrng`, or set **Settings → General → Default
Interface** to full SeerrNG.

After the restart, open the theme picker:

- On a screen at least 1024 pixels wide with a Persius-layout design, it is
  the ‹ button on the small panel at the right edge of the page.
- On narrower screens, and with the SeerrOrig or SeerrNGJ designs, it is the
  paintbrush button at the top right, next to your profile picture.

Choose **Cavanagh** under **Interface design**. The choice is saved per account.
To update to a newer release, install it with `--replace` added and restart
again.

## Lumen

Lumen, the simpler front end bundled with SeerrNG, does not use interface
themes. To brand it with the Cavanagh crest instead, see [`lumen/`](lumen/README.md).

## Palette

| Role                  | Dark mode                 | Light mode                 |
| --------------------- | ------------------------- | -------------------------- |
| Page                  | Near Black `#0C0C0D`      | Warm Ivory `#F5EFE3`       |
| Panels                | Charcoal `#151515`        | `#FFFDF8`                  |
| Text                  | Warm Ivory `#F5EFE3`      | Charcoal `#151515`         |
| Buttons and focus     | Antique Gold `#D2AB4B`    | Cavanagh Red `#8F171B`     |
| Links                 | Gold `#E1C26F`            | Cavanagh Red `#8F171B`     |
| Selected navigation   | Deep Oxblood `#4A0C10`    | `#FDE2E2`                  |

Text, button and focus colours meet WCAG AA contrast against their
backgrounds. Success, warning and error colours are PersiusNG's own and are
unchanged. If a user picks a non-default colour palette in SeerrNG, that
palette recolours the theme, as it does for PersiusNG.

## Development

The theme source is [`cavanagh/manifest.json`](cavanagh/manifest.json) and
[`cavanagh/theme.css`](cavanagh/theme.css). The stylesheet is PersiusNG 1.0.0's
with its ID changed to `cavanagh` and its colour values replaced; every
selector stays scoped to `cavanagh`.

```sh
npm ci
npm run validate   # checks cavanagh/ with SeerrNG's own validator
npm run pack       # writes dist/cavanagh-<version>.seerrtheme and .sha256
```

The validator is vendored from SeerrNG in [`vendor/seerrng`](vendor/seerrng).
To release, raise `version` in `cavanagh/manifest.json` and push a matching tag
such as `v2.0.0`; the release workflow validates, packs and publishes both files.

## Licence

MIT. The stylesheet is derived from SeerrNG's PersiusNG theme, which is also
MIT licensed; see [`vendor/seerrng/LICENSE`](vendor/seerrng/LICENSE).
