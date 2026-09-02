# Cavanagh theme for SeerrNG

A light and dark SeerrNG theme package using the Cavanagh Family visual identity.

## Install from SeerrNG

In **Settings → General → Appearance**, install:

```text
https://github.com/KaHooli/cavanagh-seerrng-theme
```

SeerrNG downloads the latest release, validates it, and installs it under
`/app/config/themes/cavanagh`.

## Manual installation

Download the release archive and extract the `cavanagh` directory into the
SeerrNG application data theme directory:

```text
/app/config/themes/cavanagh/theme.json
```

On Unraid this normally corresponds to:

```text
/mnt/user/appdata/seerrng/themes/cavanagh/theme.json
```

Use **Reload Themes** in SeerrNG after copying or updating the package.

## Palette

- Cavanagh Red: `#8F171B`
- Deep Oxblood: `#4A0C10`
- Antique Gold: `#C69A45`
- Warm Ivory: `#F5EFE3`
- Charcoal: `#151515`
- Near Black: `#0C0C0D`

## Development

Run `node scripts/validate-theme.mjs` before creating a release. Release tags
must match the `version` in `theme.json` and use the form `v1.0.0`.
