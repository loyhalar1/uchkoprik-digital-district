# Uchko‘prik Digital District — Motion / Presentation Fix

This build is based on the currently deployed `uchkoprik-digital-district-main.zip` supplied by the user.

## Fixed

- Restored smooth UI transitions without animated blur/filter effects.
- Added one-time migration that clears stale legacy `reduceMotion` state while keeping the accessibility toggle functional afterwards.
- Fixed Search dialog animation so its centered `translateX(-50%)` transform is preserved during open/close.
- Prevented panel/detail/map camera animations from fighting each other.
- Main map camera now stops its previous transition before fit/fly/restore operations.
- Detail marker focus uses smooth MapLibre `flyTo` and panel opening in parallel.
- Passport open/close sequencing waits for panel motion and resizes the map after layout transition.
- Presentation Mode rebuilt around the original V1 behavior: every slide changes map center, zoom, pitch and bearing using `flyTo`.
- Presentation map waits for MapLibre style readiness before the first scene.
- Presentation Prev / Next / Play / Pause / Escape / Space controls updated.
- Presentation copy animates per scene.
- Service Worker cache changed to network-first for JS/CSS/HTML so old cached frontend files do not silently disable new animations.
- New Service Worker activation reloads the controlled page once so the new asset policy takes effect immediately.
- Random MFY star timings remain independent per marker.
- Added static verification script and expanded `npm run check`.
- Added `supabase_admin_setup.sql` for the current Supabase Auth admin panel and RLS setup.

## Verification

`npm run check` validates:

- `server.js`
- public `app.js`
- public `admin.js`
- `i18n.js`
- `supabase.js`
- Service Worker
- duplicate/missing required HTML IDs
- referenced local assets

