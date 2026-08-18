# Uchko‘prik Digital District v1.0

Uchko‘prik tumanining xalqaro raqamli yuzi: interaktiv xarita, 10 tilli interfeys, rasmiy ma’lumotlar, Investor Mode, Made in Uchko‘prik, Data Health, Delegation/Presentation Mode va AI-ready assistant.

## Hozir ishlaydigan qismlar

- MapLibre GL + OpenFreeMap asosidagi premium map-first UI.
- 51 ta MFYning mavjud loyiha ma’lumotlari: koordinata, aholi, xonadon, oila, ixtisoslashuv.
- Public API mavjud bo‘lmasa ham JSON fallback bilan ishlaydigan offline-friendly frontend.
- 10 til: `uz`, `en`, `ru`, `zh`, `ar`, `tr`, `ko`, `de`, `fr`, `es`.
- Arab tili uchun RTL layout.
- Dinamik kategoriyalar va qatlamlar.
- Universal detail card, smart local search.
- AI Assistant UI + voice input + browser TTS.
- Official-data-first AI: D1 ma’lumotlariga asoslanadi, ma’lumot topilmasa taxmin qilmaydi.
- Workers AI binding tayyor, lekin xarajat nazorati uchun default holatda `ENABLE_WORKERS_AI=false`.
- Investor Mode.
- Made in Uchko‘prik mahsulot vitrinasi.
- District Passport / Uchko‘prik in Numbers.
- Accessibility: text size, high contrast, reduce motion, reduce transparency, light/dark.
- Cinematic Delegation/Presentation Mode.
- Premium Liquid Glass UI va responsive mobile dock.
- Cloudflare D1 sxemasi, migrations va seed.
- Cloudflare R2 media binding tayyor.
- Admin panel: Data Health + CRUD (MFY, korxona, joy, mahsulot, kategoriya, tuman statistikasi).
- Translation Memory va 10 tilli entity translation uchun D1 jadvallari.
- Dynamic sitemap, hreflang, canonical, localized metadata, JSON-LD, robots.
- PWA manifest va service worker.
- GitHub Actions deploy workflow.
- Eski Firebase loyihasi `legacy/original-firebase/` ichida backup sifatida saqlangan.

## Muhim: demo ma’lumotlar

Eski loyihadan faqat mavjud 51 ta MFY ma’lumotlari rasmiy dataset sifatida ko‘chirildi. `public/data/demo.json` ichidagi korxona, ta’lim, tibbiyot va mahsulot yozuvlari **demo** va UI’da tasdiqlanmagan deb ko‘rsatiladi. Real ma’lumotni admin panel orqali kiritmaguncha ular rasmiy fakt sifatida ishlatilmaydi.

MFY raislari va telefonlar public fallback’ga ko‘chirilmagan. D1 sxemasida private kontakt maydonlari alohida mavjud, public API esa ularni qaytarmaydi.

---

## 1. Lokal ishga tushirish

Talab: Node.js 20+.

```bash
npm install
cp .dev.vars.example .dev.vars
npm run d1:migrate:local
npm run d1:seed:local
npm run dev
```

Brauzer:

```text
http://localhost:8787/uz/
http://localhost:8787/admin
```

`.dev.vars` ichida kuchli admin token yozing:

```env
ADMIN_TOKEN=kamida-32-belgili-tasodifiy-maxfiy-token
ENABLE_WORKERS_AI=false
PUBLIC_BASE_URL=http://localhost:8787
```

## 2. Cloudflare hisobiga kirish

```bash
npm run cf:login
```

## 3. D1 bazani yaratish

```bash
npm run d1:create
```

Natijada Cloudflare `database_id` beradi. `wrangler.jsonc` ichidagi:

```json
"database_id": "00000000-0000-0000-0000-000000000000"
```

qiymatini haqiqiy D1 UUID bilan almashtiring.

So‘ng:

```bash
npm run d1:migrate
npm run d1:seed
```

## 4. R2 media bucket

```bash
npm run r2:create
```

`wrangler.jsonc` ichida bucket nomi allaqachon:

```text
uchkoprik-media
```

## 5. Admin tokenni secret qilish

```bash
npx wrangler secret put ADMIN_TOKEN
```

Terminal token qiymatini so‘raydi. Uni GitHub yoki kod ichiga yozmang.

## 6. Public URL

`wrangler.jsonc` ichidagi `PUBLIC_BASE_URL` ni final domen yoki `workers.dev` URL bilan to‘ldiring. Misol:

```json
"PUBLIC_BASE_URL": "https://uchkoprik.example.uz"
```

Local dev uchun `.dev.vars` ustun keladi.

## 7. Workers AI ni yoqish

Default rejimda assistant AI model chaqirmasdan rasmiy data qoidalari va smart search orqali ishlaydi. Workers AI kerak bo‘lsa:

```json
"ENABLE_WORKERS_AI": "true"
```

qiling. Worker `env.AI` native binding orqali modelni chaqiradi. AI prompt rasmiy ma’lumotdan tashqarida fakt to‘qimaslikka majbur qiladi. Cloudflare hisobingizdagi amaldagi AI quota/usage holatini yoqishdan oldin tekshiring.

## 8. Deploy

```bash
npm run check
npm run deploy
```

Wrangler `*.workers.dev` manzilini beradi.

## 9. GitHub orqali avtomatik deploy

Repo Secrets ichiga:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

qo‘shing. `.github/workflows/deploy.yml` main branchga push bo‘lganda `npm install`, syntax check va deploy bajaradi.

## 10. SEO

Worker quyidagilarni avtomatik beradi:

- `/uz/`, `/en/`, `/ru/`, `/zh/`, `/ar/`, `/tr/`, `/ko/`, `/de/`, `/fr/`, `/es/`
- `canonical`
- 10 til `hreflang` + `x-default`
- localized `<title>` va description
- JSON-LD
- `/sitemap.xml`
- `/robots.txt`
- D1 obyektlari uchun `/uz/mahalla/<slug>`, `/en/business/<slug>` kabi SEO URLlar

Deploydan keyin domenni Google Search Console va Bing Webmaster Tools’ga qo‘shing va `/sitemap.xml` yuboring.

## 11. Admin panel

`/admin` qidiruv tizimlari uchun `noindex,nofollow`.

Admin panelda:

- Data Health score
- verified/demo/outdated/missing yozuvlar
- MFY CRUD
- Korxonalar CRUD
- Joylar CRUD
- Mahsulotlar CRUD
- Kategoriyalar CRUD
- Tuman ko‘rsatkichlari CRUD
- translation system status
- presentation mode status

mavjud.

Hozirgi v1 admin autentifikatsiyasi server-side `ADMIN_TOKEN` bilan ishlaydi. Eski Firebase Telegram OTP kodi `legacy/original-firebase/functions/` ichida saqlangan; keyingi security bosqichida Telegram OTP’ni Cloudflare Worker + D1 sessiya modeliga ko‘chirish mumkin.

## 12. Translation model

`translations` jadvali:

```text
entity_type
entity_id
field_name
lang
value
status: draft | reviewed | approved
```

`translation_memory` rasmiy terminlarni bir xil tarjimada saqlash uchun mo‘ljallangan.

Public API faqat approved tarjimalarni entity ma’lumotlariga qo‘llaydi.

## 13. Data Freshness

Admin `/api/admin/health` endpoint orqali:

- jami yozuv
- tasdiqlangan
- demo
- 180 kundan eski
- majburiy maydoni yetishmaydigan
- umumiy Data Health score

ni hisoblaydi.

## 14. Media

R2 object GET:

```text
/media/<key>
```

Admin upload endpoint:

```text
PUT /api/admin/media?key=places/example.webp
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: image/webp
```

## 15. Arxitektura

```text
Browser / PWA
      │
      ├── MapLibre GL + OpenFreeMap
      │
      ├── 10-language UI
      │
      └── Cloudflare Worker
             │
             ├── D1 official data
             ├── R2 media
             ├── Workers AI (optional)
             ├── SEO renderer
             ├── Admin API
             └── Static Assets
```

## 16. Keyingi professional bosqichlar

- Haqiqiy korxona, maktab, tibbiyot, turizm va investitsiya datasetlarini kiritish.
- MFY real GeoJSON boundary poligonlarini qo‘shish.
- Digital Twin uchun real bino/obyekt geometriyasi va 3D layerlar.
- Telegram OTP admin loginini Worker’ga ko‘chirish.
- Translation approval UI va bulk import.
- AI Search/RAG yoki vector search faqat real bilim bazasi yetarlicha boyigandan keyin.
- Delegation Mode sahnalarini admin paneldan drag-and-drop boshqarish.

## Xavfsizlik

- `ADMIN_TOKEN` hech qachon frontend source yoki git repo ichiga yozilmaydi.
- Public API private contact maydonlarini qaytarmaydi.
- Admin sahifa `noindex`.
- CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` qo‘llanadi.
- AI tasdiqlanmagan ma’lumotni rasmiy fakt sifatida ko‘rsatmasligi kerak.
