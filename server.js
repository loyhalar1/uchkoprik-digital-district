import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT || 10000);
const HOST = '0.0.0.0';

const PUBLIC_DIR = path.join(__dirname, 'public');

const SUPPORTED_LANGS = [
  'uz',
  'en',
  'ru',
  'zh',
  'ar',
  'tr',
  'ko',
  'de',
  'fr',
  'es'
];

const META = {
  uz: {
    title: 'Uchko‘prik tumani — Raqamli tuman',
    description:
      'Uchko‘prik tumanining interaktiv xaritasi, mahallalar, tashkilotlar, investitsiya ma’lumotlari va raqamli xizmatlari.',
    locale: 'uz_UZ'
  },

  en: {
    title: 'Uchkoprik District — Digital District',
    description:
      'Explore Uchkoprik District through an interactive map, verified district data, organizations and investment information.',
    locale: 'en_US'
  },

  ru: {
    title: 'Учкуприкский район — Цифровой район',
    description:
      'Интерактивная карта Учкуприкского района, махалли, организации и инвестиционная информация.',
    locale: 'ru_RU'
  },

  zh: {
    title: '乌奇库普里克区 — 数字地区',
    description:
      '通过互动地图探索乌奇库普里克区的社区、组织和投资信息。',
    locale: 'zh_CN'
  },

  ar: {
    title: 'منطقة أوتشكوبريك — المنطقة الرقمية',
    description:
      'خريطة تفاعلية لمنطقة أوتشكوبريك ومعلومات الأحياء والمؤسسات والاستثمار.',
    locale: 'ar_SA'
  },

  tr: {
    title: 'Uchko‘prik İlçesi — Dijital İlçe',
    description:
      'Uchko‘prik ilçesinin interaktif haritası, mahalleleri, kuruluşları ve yatırım bilgileri.',
    locale: 'tr_TR'
  },

  ko: {
    title: '우치코프리크 지구 — 디지털 지구',
    description:
      '우치코프리크 지구의 인터랙티브 지도, 지역사회, 기관 및 투자 정보.',
    locale: 'ko_KR'
  },

  de: {
    title: 'Bezirk Uchko‘prik — Digital District',
    description:
      'Interaktive Karte des Bezirks Uchko‘prik mit Mahallas, Organisationen und Investitionsinformationen.',
    locale: 'de_DE'
  },

  fr: {
    title: 'District d’Uchko‘prik — District numérique',
    description:
      'Carte interactive du district d’Uchko‘prik, mahallas, organisations et informations pour les investisseurs.',
    locale: 'fr_FR'
  },

  es: {
    title: 'Distrito de Uchko‘prik — Distrito Digital',
    description:
      'Mapa interactivo del distrito de Uchko‘prik, mahallas, organizaciones e información para inversores.',
    locale: 'es_ES'
  }
};

app.disable('x-powered-by');

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   STATIC FILES
========================================================= */

app.use(
  express.static(PUBLIC_DIR, {
    index: false,
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0
  })
);

/* =========================================================
   HEALTH
========================================================= */

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'uchkoprik-digital-district',
    time: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    server: 'Render',
    database: 'Supabase'
  });
});

/* =========================================================
   AI
   Render AI keyingi bosqichda shu route'ga ulanadi.
========================================================= */

app.post('/api/ai', async (req, res) => {
  res.status(503).json({
    ok: false,
    error: 'AI backend is not configured yet'
  });
});

/* =========================================================
   INDEX TEMPLATE
========================================================= */

async function renderIndex(req, res) {
  try {
    const fs = await import('fs/promises');

    let html = await fs.readFile(
      path.join(PUBLIC_DIR, 'index.html'),
      'utf8'
    );

    const parts = req.path.split('/').filter(Boolean);

    const lang = SUPPORTED_LANGS.includes(parts[0])
      ? parts[0]
      : 'uz';

    const meta = META[lang] || META.uz;

    const protocol =
      req.headers['x-forwarded-proto'] ||
      req.protocol ||
      'https';

    const host = req.get('host');

    const baseUrl =
      process.env.PUBLIC_BASE_URL?.replace(/\/$/, '') ||
      `${protocol}://${host}`;

    const canonical =
      `${baseUrl}${req.originalUrl.split('?')[0]}`;

    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const hreflang = SUPPORTED_LANGS.map(
      code =>
        `<link rel="alternate" hreflang="${code}" href="${baseUrl}/${code}">`
    ).join('\n');

    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      name: 'Uchko‘prik tumani',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Farg‘ona viloyati',
        addressCountry: 'UZ'
      }
    });

    html = html
      .replaceAll('%%LANG%%', lang)
      .replaceAll('%%DIR%%', dir)
      .replaceAll('%%TITLE%%', meta.title)
      .replaceAll('%%DESCRIPTION%%', meta.description)
      .replaceAll('%%CANONICAL%%', canonical)
      .replaceAll('%%HREFLANG%%', hreflang)
      .replaceAll('%%OG_LOCALE%%', meta.locale)
      .replaceAll(
        '%%OG_IMAGE%%',
        `${baseUrl}/logo.svg`
      )
      .replaceAll('%%JSONLD%%', jsonLd);

    res
      .status(200)
      .type('html')
      .send(html);

  } catch (error) {
    console.error('INDEX ERROR:', error);

    res.status(500).send(
      'Uchko‘prik Digital District server error'
    );
  }
}

/* =========================================================
   ROUTES
========================================================= */

app.get('/', (req, res) => {
  res.redirect(302, '/uz');
});

app.get(
  /^\/(uz|en|ru|zh|ar|tr|ko|de|fr|es)(\/.*)?$/,
  renderIndex
);

/* Agar boshqa frontend route ochilsa */
app.get('/{*splat}', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  return renderIndex(req, res);
});

/* =========================================================
   API 404
========================================================= */

app.use('/api', (req, res) => {
  res.status(404).json({
    ok: false,
    error: 'API endpoint not found'
  });
});

/* =========================================================
   SERVER
========================================================= */

app.listen(PORT, HOST, () => {
  console.log('');
  console.log('========================================');
  console.log(' Uchko‘prik Digital District');
  console.log(` Server: http://${HOST}:${PORT}`);
  console.log(' Database: Supabase');
  console.log(' Runtime: Render / Node.js');
  console.log('========================================');
  console.log('');
});
