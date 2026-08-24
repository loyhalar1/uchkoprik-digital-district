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
      'Uchko‘prik tumanining interaktiv xaritasi: 51 MFY, tashkilotlar, iqtisodiy zonalar, investitsiya ma’lumotlari va raqamli tuman platformasi.',
    locale: 'uz_UZ'
  },
  en: {
    title: 'Uchkoprik District — Digital District',
    description:
      'Interactive Uchkoprik District map with 51 mahallas, organizations, economic zones, verified district data and investment information.',
    locale: 'en_US'
  },
  ru: {
    title: 'Учкуприкский район — Цифровой район',
    description:
      'Интерактивная карта Учкуприкского района: махалли, организации, экономические зоны и проверенные данные района.',
    locale: 'ru_RU'
  },
  zh: {
    title: '乌奇库普里克区 — 数字地区',
    description:
      '乌奇库普里克区互动地图、社区、组织、经济区和经核实的地区数据。',
    locale: 'zh_CN'
  },
  ar: {
    title: 'منطقة أوتشكوبريك — المنطقة الرقمية',
    description:
      'خريطة تفاعلية لمنطقة أوتشكوبريك ومعلومات الأحياء والمؤسسات والمناطق الاقتصادية والاستثمار.',
    locale: 'ar_SA'
  },
  tr: {
    title: 'Uchko‘prik İlçesi — Dijital İlçe',
    description:
      'Uchko‘prik ilçesinin interaktif haritası, mahalleleri, kuruluşları, ekonomik bölgeleri ve doğrulanmış verileri.',
    locale: 'tr_TR'
  },
  ko: {
    title: '우치코프리크 지구 — 디지털 지구',
    description:
      '우치코프리크 지구의 인터랙티브 지도, 지역사회, 기관, 경제 구역 및 검증된 데이터.',
    locale: 'ko_KR'
  },
  de: {
    title: 'Bezirk Uchko‘prik — Digital District',
    description:
      'Interaktive Karte des Bezirks Uchko‘prik mit Mahallas, Organisationen, Wirtschaftszonen und verifizierten Daten.',
    locale: 'de_DE'
  },
  fr: {
    title: 'District d’Uchko‘prik — District numérique',
    description:
      'Carte interactive du district d’Uchko‘prik, mahallas, organisations, zones économiques et données vérifiées.',
    locale: 'fr_FR'
  },
  es: {
    title: 'Distrito de Uchko‘prik — Distrito Digital',
    description:
      'Mapa interactivo del distrito de Uchko‘prik con mahallas, organizaciones, zonas económicas y datos verificados.',
    locale: 'es_ES'
  }
};

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  express.json({
    limit: '2mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb'
  })
);

function baseUrlFromReq(req) {
  const configured = String(
    process.env.PUBLIC_BASE_URL || ''
  )
    .trim()
    .replace(/\/+$/, '');

  if (configured) {
    return configured;
  }

  const protocol =
    req.headers['x-forwarded-proto'] ||
    req.protocol ||
    'https';

  return `${protocol}://${req.get('host')}`;
}

function geminiApiKey() {
  const key = String(
    process.env.GEMINI_API_KEY || ''
  ).trim();

  if (!key) {
    throw new Error(
      'GEMINI_API_KEY sozlanmagan'
    );
  }

  return key;
}

function geminiTtsModel() {
  return (
    process.env.GEMINI_TTS_MODEL ||
    'gemini-3.1-flash-tts-preview'
  );
}

const AI_RATE = new Map();

function allowAI(req) {
  const ip = String(
    req.headers['x-forwarded-for'] ||
    req.ip ||
    'unknown'
  )
    .split(',')[0]
    .trim();

  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 40;

  let row = AI_RATE.get(ip);

  if (!row || now - row.start > windowMs) {
    row = {
      start: now,
      count: 0
    };
  }

  row.count += 1;
  AI_RATE.set(ip, row);

  return row.count <= maxRequests;
}

function pcmToWav(
  pcmBuffer,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
) {
  const byteRate =
    sampleRate *
    channels *
    bitsPerSample /
    8;

  const blockAlign =
    channels *
    bitsPerSample /
    8;

  const wav = Buffer.alloc(
    44 + pcmBuffer.length
  );

  wav.write('RIFF', 0);
  wav.writeUInt32LE(
    36 + pcmBuffer.length,
    4
  );
  wav.write('WAVE', 8);
  wav.write('fmt ', 12);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(channels, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(byteRate, 28);
  wav.writeUInt16LE(blockAlign, 32);
  wav.writeUInt16LE(bitsPerSample, 34);
  wav.write('data', 36);
  wav.writeUInt32LE(
    pcmBuffer.length,
    40
  );
  pcmBuffer.copy(wav, 44);

  return wav;
}

function audioSampleRate(mimeType) {
  const match = String(
    mimeType || ''
  ).match(/rate=(\d+)/i);

  return match
    ? Number(match[1])
    : 24000;
}

app.get('/index.html', (req, res) => {
  res.redirect(301, '/uz');
});

app.get('/admin.html', (req, res) => {
  res.redirect(301, '/admin');
});

app.use('/api', (req, res, next) => {
  res.set(
    'X-Robots-Tag',
    'noindex, nofollow, noarchive'
  );

  res.set(
    'Cache-Control',
    'no-store'
  );

  next();
});

app.get('/health', (req, res) => {
  res.set(
    'X-Robots-Tag',
    'noindex, nofollow, noarchive'
  );

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
    database: 'Supabase',
    readerOnly: true,
    aiSpeech: Boolean(
      process.env.GEMINI_API_KEY
    ),
    ttsModel: geminiTtsModel(),
    ttsVoice:
      process.env.GEMINI_TTS_VOICE ||
      'Kore'
  });
});

/*
  Reader-only mode.
  Public AI chat va mikrofon transkripsiyasi ataylab o‘chirilgan.
*/
app.all('/api/ai', (req, res) => {
  res.status(410).json({
    ok: false,
    error:
      'Uchko‘prik AI o‘qish rejimida ishlaydi'
  });
});

app.all('/api/aiTranscribe', (req, res) => {
  res.status(410).json({
    ok: false,
    error:
      'Ovozli savol funksiyasi o‘chirilgan'
  });
});

app.post(
  '/api/aiSpeech',
  async (req, res) => {
    if (!allowAI(req)) {
      return res
        .status(429)
        .json({
          ok: false,
          error:
            'Juda ko‘p ovozli so‘rov. Birozdan so‘ng qayta urinib ko‘ring.'
        });
    }

    try {
      const key = geminiApiKey();
      const model = geminiTtsModel();

      const lang =
        SUPPORTED_LANGS.includes(
          req.body?.lang
        )
          ? req.body.lang
          : 'uz';

      const text = String(
        req.body?.text || ''
      )
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3500);

      if (!text) {
        return res
          .status(400)
          .json({
            ok: false,
            error:
              'Ovozga aylantiriladigan matn bo‘sh'
          });
      }

      const languageInstruction = {
        uz:
          'Speak in natural, fluent Uzbek Latin pronunciation. Pronounce Uzbek names carefully and naturally.',
        en:
          'Speak in natural English.',
        ru:
          'Speak in natural Russian.',
        zh:
          'Speak in natural Mandarin Chinese.',
        ar:
          'Speak in natural Arabic.',
        tr:
          'Speak in natural Turkish.',
        ko:
          'Speak in natural Korean.',
        de:
          'Speak in natural German.',
        fr:
          'Speak in natural French.',
        es:
          'Speak in natural Spanish.'
      }[lang];

      const voice =
        process.env.GEMINI_TTS_VOICE ||
        'Kore';

      const prompt = `
${languageInstruction}

You are the voice reader of Uchko‘prik Digital District.

Speaking style:
- calm
- confident
- professional
- friendly
- clear
- natural
- medium pace
- do not add information
- do not remove information
- do not summarize
- do not explain
- do not say formatting marks aloud

Read exactly this verified district record:

${text}
`.trim();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            'x-goog-api-key':
              key
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              responseModalities: [
                'AUDIO'
              ],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: voice
                  }
                }
              }
            }
          }),
          signal:
            AbortSignal.timeout(45000)
        }
      );

      if (!response.ok) {
        throw new Error(
          `Gemini TTS ${response.status}: ${await response.text()}`
        );
      }

      const json =
        await response.json();

      const parts =
        json.candidates?.[0]
          ?.content
          ?.parts || [];

      const audioPart =
        parts.find(
          part =>
            part.inlineData?.data
        );

      if (
        !audioPart
          ?.inlineData
          ?.data
      ) {
        throw new Error(
          'Gemini TTS audio qaytarmadi'
        );
      }

      const rawAudio = Buffer.from(
        audioPart.inlineData.data,
        'base64'
      );

      const sourceMimeType =
        audioPart.inlineData.mimeType ||
        'audio/L16;codec=pcm;rate=24000';

      let finalAudio = rawAudio;
      let finalMimeType =
        sourceMimeType;

      if (
        /pcm|l16/i.test(
          sourceMimeType
        )
      ) {
        finalAudio = pcmToWav(
          rawAudio,
          audioSampleRate(
            sourceMimeType
          ),
          1,
          16
        );

        finalMimeType =
          'audio/wav';
      }

      return res.json({
        ok: true,
        audio:
          finalAudio.toString(
            'base64'
          ),
        mimeType:
          finalMimeType,
        provider: 'gemini',
        model,
        voice
      });

    } catch (error) {
      console.error(
        'AI SPEECH ERROR:',
        error.message
      );

      return res
        .status(503)
        .json({
          ok: false,
          error:
            'Ovozli o‘qish vaqtincha ishlamayapti'
        });
    }
  }
);

app.get(
  ['/admin', '/admin/'],
  (req, res) => {
    res.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive'
    );

    res.set(
      'Cache-Control',
      'no-store'
    );

    res.sendFile(
      path.join(
        PUBLIC_DIR,
        'admin.html'
      )
    );
  }
);

app.get('/robots.txt', (req, res) => {
  const base =
    baseUrlFromReq(req);

  res.set(
    'Cache-Control',
    'public, max-age=3600'
  );

  res
    .type('text/plain')
    .send(
`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin.html
Disallow: /api/
Disallow: /health

Sitemap: ${base}/sitemap.xml
`
    );
});

app.get('/sitemap.xml', (req, res) => {
  const base =
    baseUrlFromReq(req);

  const urls =
    SUPPORTED_LANGS
      .map(code => {
        const priority =
          code === 'uz'
            ? '1.0'
            : '0.8';

        return (
`  <url>
    <loc>${base}/${code}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
        );
      })
      .join('\n');

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  res.set(
    'Cache-Control',
    'public, max-age=3600'
  );

  res
    .type('application/xml')
    .send(xml);
});

app.use(
  express.static(
    PUBLIC_DIR,
    {
      index: false,
      maxAge:
        process.env.NODE_ENV ===
        'production'
          ? '30m'
          : 0
    }
  )
);

async function renderIndex(req, res) {
  try {
    const fs =
      await import('fs/promises');

    let html = await fs.readFile(
      path.join(
        PUBLIC_DIR,
        'index.html'
      ),
      'utf8'
    );

    const parts =
      req.path
        .split('/')
        .filter(Boolean);

    const lang =
      SUPPORTED_LANGS.includes(
        parts[0]
      )
        ? parts[0]
        : 'uz';

    const meta =
      META[lang] ||
      META.uz;

    const baseUrl =
      baseUrlFromReq(req);

    const canonical =
      `${baseUrl}/${lang}`;

    const dir =
      lang === 'ar'
        ? 'rtl'
        : 'ltr';

    const hreflang =
      SUPPORTED_LANGS
        .map(
          code =>
            `<link rel="alternate" hreflang="${code}" href="${baseUrl}/${code}">`
        )
        .join('\n')
      +
      `\n<link rel="alternate" hreflang="x-default" href="${baseUrl}/uz">`;

    const jsonLd = JSON.stringify({
      '@context':
        'https://schema.org',
      '@graph': [
        {
          '@type':
            'AdministrativeArea',
          '@id':
            `${baseUrl}/#district`,
          name:
            'Uchko‘prik tumani',
          alternateName:
            'Uchkoprik District',
          url:
            canonical,
          address: {
            '@type':
              'PostalAddress',
            addressLocality:
              'Uchko‘prik',
            addressRegion:
              'Farg‘ona viloyati',
            addressCountry:
              'UZ'
          }
        },
        {
          '@type':
            'WebSite',
          '@id':
            `${baseUrl}/#website`,
          name:
            'Uchko‘prik Digital District',
          alternateName: [
            'Uchko‘prik Raqamli Tumani',
            'Uchkoprik Digital District'
          ],
          url:
            baseUrl,
          inLanguage:
            SUPPORTED_LANGS,
          about: {
            '@id':
              `${baseUrl}/#district`
          }
        },
        {
          '@type':
            'WebApplication',
          '@id':
            `${baseUrl}/#application`,
          name:
            'Uchko‘prik Digital District',
          url:
            canonical,
          operatingSystem:
            'Web',
          inLanguage:
            lang,
          description:
            meta.description,
          isPartOf: {
            '@id':
              `${baseUrl}/#website`
          },
          about: {
            '@id':
              `${baseUrl}/#district`
          }
        }
      ]
    });

    html = html
      .replaceAll(
        '%%LANG%%',
        lang
      )
      .replaceAll(
        '%%DIR%%',
        dir
      )
      .replaceAll(
        '%%TITLE%%',
        meta.title
      )
      .replaceAll(
        '%%DESCRIPTION%%',
        meta.description
      )
      .replaceAll(
        '%%CANONICAL%%',
        canonical
      )
      .replaceAll(
        '%%HREFLANG%%',
        hreflang
      )
      .replaceAll(
        '%%OG_LOCALE%%',
        meta.locale
      )
      .replaceAll(
        '%%OG_IMAGE%%',
        `${baseUrl}/social-card.png`
      )
      .replaceAll(
        '%%JSONLD%%',
        jsonLd
      );

    res.set(
      'Content-Language',
      lang
    );

    res.set(
      'Cache-Control',
      'public, max-age=300'
    );

    return res
      .status(200)
      .type('html')
      .send(html);

  } catch (error) {
    console.error(
      'INDEX ERROR:',
      error
    );

    return res
      .status(500)
      .send(
        'Uchko‘prik Digital District server error'
      );
  }
}

app.get('/', (req, res) => {
  res.redirect(301, '/uz');
});

app.get(
  /^\/(uz|en|ru|zh|ar|tr|ko|de|fr|es)\/$/,
  (req, res) => {
    const cleanPath =
      req.path.replace(/\/+$/, '');

    const queryIndex =
      req.originalUrl.indexOf('?');

    const query =
      queryIndex >= 0
        ? req.originalUrl.slice(
            queryIndex
          )
        : '';

    res.redirect(
      301,
      `${cleanPath}${query}`
    );
  }
);

app.get(
  /^\/(uz|en|ru|zh|ar|tr|ko|de|fr|es)$/,
  renderIndex
);

app.use('/api', (req, res) => {
  res
    .status(404)
    .json({
      ok: false,
      error:
        'API endpoint not found'
    });
});

app.use((req, res) => {
  res.set(
    'X-Robots-Tag',
    'noindex, nofollow, noarchive'
  );

  res
    .status(404)
    .type('html')
    .send(
`<!doctype html>
<html lang="uz">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Sahifa topilmadi — Uchko‘prik Digital District</title>
  <style>
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#020407;color:#f8fbff;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{text-align:center;padding:32px}
    h1{margin:0;font-size:clamp(5rem,18vw,12rem);line-height:1}
    p{color:#9eabb5}
    a{display:inline-flex;margin-top:12px;padding:12px 18px;border-radius:14px;color:#020407;background:#8cefff;text-decoration:none;font-weight:700}
  </style>
</head>
<body>
  <main>
    <h1>404</h1>
    <p>Siz izlayotgan sahifa topilmadi.</p>
    <a href="/uz">Uchko‘prik Digital District’ga qaytish</a>
  </main>
</body>
</html>`
    );
});

app.listen(
  PORT,
  HOST,
  () => {
    console.log(
      `Uchko‘prik Digital District: ${HOST}:${PORT}`
    );
  }
);
