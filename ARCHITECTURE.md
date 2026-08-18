# Uchko‘prik Digital District — Architecture

## Product pillars

1. Map — tumanning interaktiv fazoviy yuzi.
2. Data — tasdiqlangan tuman ma’lumotlari va tarixiy ko‘rsatkichlar.
3. AI — official-data-first assistant + voice interface.
4. Explore — mehmonlar uchun tumanni tez anglash.
5. Invest — investorlar uchun iqtisodiyot, korxonalar, mahsulotlar.
6. Admin — Data Health, translation, media, SEO va kontent boshqaruvi.

## Trust states

Every public record should be one of:

- `verified = 1`: official/verified data, with source and updated_at.
- `verified = 0`: draft/demo/unverified. UI must visibly label it.

AI must never collapse these states.

## Localization

Interface translations live in `public/assets/js/i18n.js`.
Entity translations live in D1 `translations`. Only `status='approved'` is applied to public API output.

## Privacy

Private phone/contact/admin notes stay in private D1 columns and are stripped from public responses by the Worker.

## Digital Twin readiness

Current map uses MapLibre vector basemap and supports camera pitch/bearing. Real Digital Twin layers must be based on verified GeoJSON/MVT/3D data. The project intentionally does not fabricate administrative boundaries or 3D buildings.
