# Vendored SeerrNG theme validator

`interfaceThemePackage.ts` and `interfaceTheme.ts` are unmodified copies of
`server/utils/` from [snapetech-org/seerrng](https://github.com/snapetech-org/seerrng)
at commit `dffe45c77d841e078dce3f984f590662f10f08ed` (SeerrNG 3.72.40). They are
the validator SeerrNG runs when it installs and serves an interface theme, so
`npm run validate` checks this package against the same rules.

They are distributed under SeerrNG's MIT licence; see [`LICENSE`](LICENSE).

To update them, copy the two files from a newer SeerrNG commit and update the
commit above.
