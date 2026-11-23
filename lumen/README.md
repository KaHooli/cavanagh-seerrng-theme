# Cavanagh branding for Lumen

Lumen, the simpler front end bundled with SeerrNG, does not use interface
themes, so the Cavanagh theme does not change its colours. It can show the
Cavanagh crest instead.

| File                      | Use                                   | Details                                   |
| ------------------------- | ------------------------------------- | ----------------------------------------- |
| `cavanagh-lumen-logo.png` | Logo, replacing Lumen's play mark     | 512×512 PNG, crest on a transparent background |
| `cavanagh-lumen-icon.png` | Browser-tab and iOS home-screen icon  | 512×512 PNG, crest on a square Charcoal `#151515` background |

The square icon has no rounded corners or transparency because iOS rounds home-screen
icons itself and fills transparent areas with black.

## Install

1. Sign in to Lumen as an administrator and open **You → Lumen settings for
   everyone**.
2. Use **Upload** for the logo and choose `cavanagh-lumen-logo.png`.
3. Use **Upload** for the tab icon and choose `cavanagh-lumen-icon.png`.
4. Under **Logo shape**, choose **As uploaded** so the round crest keeps its
   transparent edges instead of being cropped into a rounded square. **Circle**
   also works.
5. Press **Save for everyone**.

With a `lumen-config.json` file instead, put both files in the branding folder
and use the following (`"raw"` is the file's name for **As uploaded**):

```json
"branding": {
  "logo": "/branding/cavanagh-lumen-logo.png",
  "icon": "/branding/cavanagh-lumen-icon.png",
  "logoShape": "raw"
}
```

Phones that already saved Lumen to the home screen keep the old icon until it
is removed and added again.
