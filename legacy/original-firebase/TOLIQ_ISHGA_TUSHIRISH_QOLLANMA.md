# UCHKO'PRIK TUMANI — TO'LIQ ISHGA TUSHIRISH QO'LLANMASI

Bu hujjat — loyihani nol nuqtadan (bo'sh kompyuterdan) to haqiqiy domenda
ishlayotgan, xavfsiz, avtomatik yangilanadigan saytgacha olib boradigan
**yagona, to'liq** qo'llanma. Har bir qadamni ketma-ket, tartib bilan bajaring.

> 🔴 Diqqat: matn ichida `uchkoprik.uz` — bu **misol domen**. Sizning haqiqiy
> domeningiz boshqacha bo'lsa, quyidagi fayllarda uni almashtirishingiz kerak
> bo'ladi (12-bo'limda aniq ro'yxat berilgan):
> `index.html`, `robots.txt`, `sitemap.xml`.

---

## 0-BOSQICH — Kerakli dasturlarni o'rnatish (bir martalik)

Kompyuteringizda (Windows/Mac/Linux, terminal orqali):

1. **Node.js** (v20 versiya) — https://nodejs.org dan yuklab oling, o'rnating.
   Tekshirish: `node -v` → `v20.x.x` chiqishi kerak.
2. **Git** — https://git-scm.com dan yuklab oling. Tekshirish: `git --version`
3. **Firebase CLI**:
   ```
   npm install -g firebase-tools
   firebase --version
   ```
4. **Firebase hisobi** — https://firebase.google.com da Google akkaunt bilan kiring.
5. **GitHub hisobi** — https://github.com da ro'yxatdan o'ting (agar yo'q bo'lsa).
6. **Telegram** — bot allaqachon @BotFather orqali yaratilgan bo'lishi kerak
   (token sizda bor: `boshqaruv-k9m2.html`dagi eski koddan olingan).

---

## 1-BOSQICH — Loyiha papkasini tayyorlash

Barcha fayllarni **bitta papkada**, quyidagi tuzilishda joylashtiring:

```
uchkoprik-loyiha/
│
├── firebase.json              ← D-blok
├── .firebaserc                ← D-blok
├── firestore.rules            ← C-blok
├── firestore.indexes.json     ← D-blok
│
├── functions/                 ← C-blok (backend)
│   ├── index.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── firebase-hosting-deploy.yml   ← D-blok
│
└── public/                    ← Firebase Hosting shu papkani nashr qiladi
    ├── index.html              (SEO teglari bilan yangilangan, D-blok)
    ├── boshqaruv-k9m2.html      (C-blok bilan yangilangan admin panel)
    ├── logo.svg
    ├── manifest.json           (agar mavjud bo'lsa — eski faylni shu yerga qo'ying)
    ├── og-image.png            (12.4-bandga qarang — o'zingiz qo'shasiz)
    ├── robots.txt               ← D-blok
    └── sitemap.xml               ← D-blok
```

**Muhim**: `index.html` va `boshqaruv-k9m2.html`ning eng oxirgi (C-blok va
D-blok bilan yangilangan) versiyalarini oling — men yuborgan fayllar aynan shular.

---

## 2-BOSQICH — Firebase loyihasini ulash va Blaze tarifga o'tish

```bash
cd uchkoprik-loyiha
firebase login
firebase use --add
```
So'ralganda mavjud `uchkoprik-mfy` loyihasini tanlang, alias sifatida `default` yozing.

**Blaze tarifga o'tish (MAJBURIY):**
Firebase Console → loyihangiz → pastdagi "⚡ Upgrade" tugmasi → Blaze
(pay-as-you-go). Sabab: Cloud Functions Telegram API'ga tashqi internet
so'rovi yuboradi, bu Spark (bepul) tarifda ishlamaydi. Kichik loyiha uchun
Blaze'da ham amalda oyiga ~0 so'm chiqadi (bepul chegara yetadi), lekin
karta bog'lash shart.

---

## 3-BOSQICH — Cloud Functions'ni deploy qilish (backend)

1. Bot tokenini xavfsiz saqlash:
   ```bash
   firebase functions:secrets:set TELEGRAM_BOT_TOKEN
   ```
   So'ralganda BotFather bergan tokenni kiriting (masalan `8782177883:AAHI...`).

2. Kutubxonalarni o'rnatish:
   ```bash
   cd functions
   npm install
   cd ..
   ```

3. Deploy:
   ```bash
   firebase deploy --only functions,firestore:rules
   ```
   Bir necha daqiqa kutasiz. Oxirida shunga o'xshash manzillar chiqadi:
   ```
   ✔ functions[requestCode(us-central1)]
   ✔ functions[verifyCode(us-central1)]
   ✔ functions[telegramWebhook(us-central1)]
   ✔ functions[addAdmin(us-central1)]
   ✔ functions[removeAdmin(us-central1)]
   ✔ functions[lookupTelegramStart(us-central1)]
   ```

4. Telegram webhook'ni bir marta o'rnatish (TOKEN'ni o'zingiznikiga almashtiring):
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://us-central1-uchkoprik-mfy.cloudfunctions.net/telegramWebhook"
   ```
   Javobda `"ok":true` chiqishi kerak.

---

## 4-BOSQICH — Birinchi superadminni qo'shish (bootstrap)

Tizimda hali birorta admin yo'q, shuning uchun birinchisini **qo'lda**
Firebase Console orqali qo'shamiz:

1. Telegram'da botingizga `/start` bosing → bot sizga Telegram ID'ingizni yuboradi.
2. Firebase Console → Firestore Database → **admins** kolleksiyasi yarating →
   yangi hujjat qo'shing:
   - **Hujjat ID**: sizning Telegram ID'ingiz (masalan `8456536366`)
   - Maydonlar:

     | Maydon | Tur | Qiymat |
     |---|---|---|
     | telegramUserId | number | 8456536366 |
     | telegramUsername | string | sizning_username (kichik harf, @ siz) |
     | fullName | string | Familiya Ism |
     | role | string | superadmin |
     | active | boolean | true |
     | addedBy | string | bootstrap |
     | addedAt | timestamp | hozirgi vaqt |

3. Shundan keyingi barcha adminlarni **panel ichidan** ("👥 Adminlar" tab)
   qo'shasiz — Firebase Console'ga qaytib borish shart emas.

---

## 5-BOSQICH — Lokal test (deploydan oldin)

```bash
firebase emulators:start --only functions,firestore,hosting
```
Brauzerda `http://localhost:5000` ochiladi. Login qismini sinab ko'ring
(emulator rejimida haqiqiy Telegram xabari yuborilmasligi mumkin — bu normal,
faqat interfeys va xatosizlikni tekshirasiz). `Ctrl+C` bilan to'xtatiladi.

---

## 6-BOSQICH — GitHub repozitoriy yaratish

1. https://github.com/new → repo nomi: `uchkoprik-tumani` → **Private**
   tanlang (kod ichida hech qanday sir yo'q, lekin ehtiyot chorasi sifatida) →
   "Create repository".

2. Lokal papkada:
   ```bash
   cd uchkoprik-loyiha
   git init
   git add .
   git commit -m "Boshlang'ich versiya: C-blok va D-blok"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/uchkoprik-tumani.git
   git push -u origin main
   ```

3. `.gitignore` fayl yarating (functions/node_modules va boshqa keraksiz
   fayllar Git'ga tushmasligi uchun):
   ```
   node_modules/
   .firebase/
   *.log
   .DS_Store
   ```

---

## 7-BOSQICH — GitHub Actions orqali avtomatik deploy (hosting)

Bu — 11-band ("GitHub repo + Actions"). Har safar `main` branchga push
qilganingizda, sayt (`public/` papka) avtomatik Firebase Hosting'ga
joylashtiriladi. Fayl allaqachon tayyor: `.github/workflows/firebase-hosting-deploy.yml`.

**Sozlash (bir martalik):**

1. Xizmat hisobi (service account) yaratish:
   ```bash
   firebase init hosting:github
   ```
   Bu buyruq GitHub bilan bog'lanadi, kerakli maxfiy kalitni (`FIREBASE_SERVICE_ACCOUNT`)
   **avtomatik** GitHub repo Secrets'iga qo'shadi. Savollarga:
   - "Set up a GitHub Action..." → **Yes**
   - Repository nomi → `<USERNAME>/uchkoprik-tumani`
   - "Set up the workflow to run a build script..." → **No** (chunki bizda
     tayyor statik fayllar, build kerak emas)
   - "Set up automatic deployment to your site's live channel..." → **Yes**,
     branch: `main`

2. Agar buni qo'lda qilmoqchi bo'lsangiz:
   - Firebase Console → Project settings → Service accounts →
     "Generate new private key" → JSON fayl yuklanadi.
   - GitHub repo → Settings → Secrets and variables → Actions →
     "New repository secret" → nomi `FIREBASE_SERVICE_ACCOUNT`,
     qiymati — yuklangan JSON faylning **butun matni**.

3. Tekshirish: `public/` papkada biror faylni ozgina o'zgartirib, push qiling:
   ```bash
   git add . && git commit -m "test deploy" && git push
   ```
   GitHub repo → "Actions" bo'limida ishlayotgan workflow ko'rinadi (yashil ✔
   bo'lsa — muvaffaqiyatli).

> Eslatma: Cloud Functions deploy'i (backend) **avtomatlashtirilmagan** —
> xavfsizlik uchun ataylab shunday (bot tokeni kabi maxfiy narsalar bilan
> ishlaganda qo'lda nazorat qilish afzal). Functions o'zgarsa, 3-bosqichdagi
> `firebase deploy --only functions` buyrug'ini qo'lda qayta ishga tushiring.

---

## 8-BOSQICH — Domen ulash (12-band)

1. **Domen sotib olish**: istalgan reestrator orqali (masalan `.uz` domen
   uchun BILLZ, REG.UZ yoki xalqaro Namecheap/GoDaddy `.com` uchun).

2. **Firebase Hosting'ga ulash**:
   Firebase Console → Hosting → "Add custom domain" → domeningizni kiriting
   (masalan `uchkoprik.uz`) → Firebase ikkita DNS yozuv beradi (odatda `A`
   yozuvlar, ba'zan `TXT` tasdiqlash uchun).

3. **DNS sozlash**: domen reestratoringizning boshqaruv panelida (DNS
   Management / Name Servers bo'limi) Firebase bergan yozuvlarni qo'shing:
   ```
   Turi: A      Nom: @      Qiymat: <Firebase bergan IP-1>
   Turi: A      Nom: @      Qiymat: <Firebase bergan IP-2>
   Turi: TXT    Nom: @      Qiymat: <Firebase bergan tasdiqlash kodi>
   ```
   `www` uchun ham xohlasangiz qo'shing (Firebase Console shu haqda ham yo'l ko'rsatadi).

4. **Kutish**: DNS tarqalishi 15 daqiqa – 48 soat orasida bo'lishi mumkin.
   SSL sertifikat (HTTPS) Firebase tomonidan **avtomatik va bepul** chiqariladi —
   sizdan hech narsa talab qilinmaydi, faqat kutish kerak.

5. Tekshirish: `https://uchkoprik.uz` brauzerda ochilishi, qulf belgisi
   (🔒 xavfsiz ulanish) ko'rinishi kerak.

---

## 9-BOSQICH — SEO yakunlash (13-band)

1. **Placeholder domenni almashtiring** — quyidagi fayllarda `uchkoprik.uz`
   yozuvini haqiqiy domeningizga o'zgartiring:
   - `public/index.html` — 6 ta joyda (`canonical`, `og:image`, `og:url`,
     `twitter:image` va h.k.)
   - `public/robots.txt` — `Sitemap:` qatorida
   - `public/sitemap.xml` — `<loc>` qatorida

2. **og-image.png yarating** — ijtimoiy tarmoqlarda (Telegram, Facebook)
   sayt havolasi ulashilganda ko'rinadigan rasm. Talab: 1200×630 piksel, PNG.
   Logo + tuman nomi bilan oddiy banner yetarli. Tayyor bo'lgach
   `public/og-image.png` deb saqlang.

3. **manifest.json** — agar loyihangizda ilgari mavjud bo'lgan bo'lsa, uni
   `public/` papkaga qo'shing (PWA ikonkalari uchun). Yo'q bo'lsa, hozircha
   o'tkazib yuborish mumkin — sayt baribir ishlaydi, faqat "ilova sifatida
   o'rnatish" funksiyasi bo'lmaydi.

4. **Google Search Console**:
   - https://search.google.com/search-console → domeningizni qo'shing →
     mulkchilikni tasdiqlang (odatda DNS TXT yozuvi orqali, xuddi 8-bosqichdagi
     kabi reestrator panelida).
   - Chap menyu → "Sitemaps" → `sitemap.xml` manzilini kiriting → Submit.
   - "URL Inspection" → bosh sahifa manzilini kiriting → "Request indexing".

5. Natija darhol chiqmaydi — Google saytni indekslashi bir necha kundan
   bir necha haftagacha vaqt olishi mumkin. Bu — normal holat.

---

## 10-BOSQICH — Yakuniy tekshirish (E-blok, checklist)

Domen ishga tushgach, quyidagilarni birma-bir sinab ko'ring:

- [ ] `https://sizning-domeningiz.uz` ochiladi, xarita yuklanadi
- [ ] `https://sizning-domeningiz.uz/boshqaruv-k9m2.html` ochiladi, login so'raydi
- [ ] Google'da saytingiz manzili "site:" operatori bilan qidirilganda
      (masalan `site:uchkoprik.uz`) — birinchi kunlarda hech narsa
      chiqmasligi mumkin, bu normal
- [ ] Telegram username bilan kod so'ralganda, kod haqiqatan Telegramga keladi
- [ ] Noto'g'ri kod kiritilganda xatolik chiqadi, 5 marta urinishdan keyin bloklanadi
- [ ] Ikkinchi (test) admin qo'shib, olib tashlab ko'ring — "👥 Adminlar" tabida
- [ ] Admin bo'lmagan holatda `boshqaruv-k9m2.html`dan Firestore'ga yozishga
      urinilganda rad etilishi kerak (Security Rules ishlayotganini tasdiqlaydi)
- [ ] MFY ma'lumotlarini tahrirlab, saqlab, sahifani yangilab — o'zgarish
      saqlanganini tekshiring
- [ ] Mobil telefonda saytni oching — dizayn buzilmasligi kerak
- [ ] `robots.txt` (`https://domen/robots.txt`) va `sitemap.xml`
      (`https://domen/sitemap.xml`) brauzerda to'g'ri ochilishini tekshiring

---

## 11-BOSQICH — Doimiy texnik xizmat (ishga tushgandan keyin)

- **Loglarni kuzatish**: Firebase Console → Functions → "Logs" — xatoliklar
  shu yerda ko'rinadi (masalan Telegram API vaqtincha ishlamay qolsa).
- **Xarajatlarni kuzatish**: Firebase Console → Usage and billing —
  Blaze tarifida oylik hisobotni tekshirib turing (odatda kichik loyiha
  uchun bepul chegaradan oshmaydi).
- **Bot tokeni oshkor bo'lib qolsa** (masalan tasodifan kimgadir yuborilsa):
  BotFather'da `/revoke` orqali eski tokenni bekor qiling, yangisini oling,
  `firebase functions:secrets:set TELEGRAM_BOT_TOKEN` bilan yangilang va
  qayta deploy qiling.
- **Yangi admin qo'shish/olib tashlash**: endi bu butunlay panel ichida,
  "👥 Adminlar" tabida — Firebase Console yoki kodga tegish shart emas.

---

## QISQACHA — Bosqichlar xulosasi

| # | Bosqich | Bir martalikmi? |
|---|---|---|
| 0 | Dasturlarni o'rnatish | Ha |
| 1 | Fayl tuzilishini joylashtirish | Ha |
| 2 | Firebase ulash + Blaze | Ha |
| 3 | Cloud Functions deploy | Har o'zgarishda qo'lda |
| 4 | Birinchi superadmin | Ha (faqat bir marta) |
| 5 | Lokal test | Xohishga ko'ra |
| 6 | GitHub repo | Ha |
| 7 | GitHub Actions (hosting auto-deploy) | Sozlash bir marta, keyin avtomatik |
| 8 | Domen ulash | Ha |
| 9 | SEO yakunlash | Ha (keyin vaqti-vaqti bilan tekshirish) |
| 10 | Yakuniy test | Ishga tushishda va har katta o'zgarishdan keyin |
| 11 | Texnik xizmat | Doimiy |

Loyiha shu qo'llanma bo'yicha to'liq ishga tushiriladi. Savol tug'ilsa yoki
biror bosqichda xatolik chiqsa — xatolik matnini menga yuboring, birga
hal qilamiz.
