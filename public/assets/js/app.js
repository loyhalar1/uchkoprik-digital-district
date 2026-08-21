import { LANGUAGES, t, langMeta } from './i18n.js';


/* =========================================================
   ICONS
========================================================= */

const ICONS = {
  search:
    '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.7-3.7"></path>',

  presentation:
    '<rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path>',

  accessibility:
    '<circle cx="12" cy="4.5" r="2"></circle><path d="M5 8h14M12 7v6m0 0-4 8m4-8 4 8"></path>',

  chevronDown:
    '<path d="m7 10 5 5 5-5"></path>',

  x:
    '<path d="M6 6l12 12M18 6 6 18"></path>',

  chart:
    '<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"></path>',

  package:
    '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path><path d="m4 7.5 8 4.5 8-4.5M12 12v9"></path>',

  landmark:
    '<path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 21h20M12 3l9 4H3l9-4Z"></path>',

  briefcase:
    '<rect x="3" y="7" width="18" height="12" rx="2"></rect><path d="M9 7V5h6v2m-12 5h18"></path>',

  sparkles:
    '<path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM5 14l1 2.8L9 18l-3 1-1 3-1-3-3-1 3-1.2L5 14Z"></path>',

  shield:
    '<path d="M12 3 20 6v5c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3Z"></path><path d="m9 12 2 2 4-4"></path>',

  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',

  navigation:
    '<path d="m4 4 16 7-7 2-2 7-7-16Z"></path>',

  share:
    '<circle cx="18" cy="5" r="2"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="18" cy="19" r="2"></circle><path d="m8 11 8-5m-8 7 8 5"></path>',

  mic:
    '<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>',

  arrowUp:
    '<path d="m12 19 0-14m-6 6 6-6 6 6"></path>',

  compass:
    '<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"></path>',

  map:
    '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"></path><path d="M9 3v15m6-12v15"></path>',

  arrowRight:
    '<path d="M5 12h14m-5-5 5 5-5 5"></path>',

  arrowLeft:
    '<path d="M19 12H5m5-5-5 5 5 5"></path>',

  pause:
    '<path d="M9 5v14M15 5v14"></path>',

  play:
    '<path d="m8 5 11 7-11 7V5Z"></path>',

  school:
    '<path d="m3 10 9-5 9 5-9 5-9-5Z"></path><path d="M7 13v4c2.6 2 7.4 2 10 0v-4M21 10v6"></path>',

  health:
    '<path d="M12 21s-7-4.4-7-10.2C5 7.5 7.2 5 10 5c1.4 0 2.6.7 3 1.5C13.4 5.7 14.6 5 16 5c2.8 0 5 2.5 5 5.8C21 16.6 12 21 12 21Z"></path><path d="M8 12h8M12 8v8"></path>',

  service:
    '<path d="M4 7h16v12H4z"></path><path d="M8 7V4h8v3M8 12h8"></path>',

  home:
    '<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"></path>',

  marker:
    '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',

  globe:
    '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path>',

  info:
    '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path>',

  list:
    '<path d="M8 6h13M8 12h13M8 18h13"></path><circle cx="4" cy="6" r="1"></circle><circle cx="4" cy="12" r="1"></circle><circle cx="4" cy="18" r="1"></circle>',

  speaker:
    '<path d="M5 9v6h4l5 4V5L9 9H5Z"></path><path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10"></path>',

  volumeOff:
    '<path d="M5 9v6h4l5 4V5L9 9H5Z"></path><path d="m18 10 4 4m0-4-4 4"></path>'
};


const iconForCategory = {
  mahalla: 'home',
  business: 'briefcase',
  education: 'school',
  health: 'health',
  culture: 'landmark',
  service: 'service',
  investment: 'chart',
  government: 'landmark'
};


const SPEC_COLORS = {
  'Dehqonchilik': '#39e676',
  'Chorvachilik': '#ffad2f',
  'Kichik ishlab chiqarish': '#6b79ff',
  'Bog‘dorchilik': '#21c7e8',
  'Hunarmandchilik': '#ef59c7',
  'Savdo va xizmat ko‘rsatish': '#a96bff'
};


const FALLBACK_COLORS = [
  '#39e676',
  '#ffad2f',
  '#6b79ff',
  '#21c7e8',
  '#ef59c7',
  '#a96bff',
  '#63e6ff',
  '#ff7272'
];


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
  lang: 'uz',

  data: {
    mahallas: [],
    categories: [],
    places: [],
    businesses: [],
    products: [],
    economicZones: [],
    district: {},
    presentationSlides: [],
    presentationPlaylist: null
  },

  map: null,
  markers: [],
  selected: null,

  activeLayer: 'all',
  selectedSpecialization: null,
  selectedOrganizationType: null,

  activePanel: 'explore',

  detailCamera: null,
  passportCamera: null,
  connectorFrame: null,

  layerListOpen: false,
  layerListQuery: '',
  hoverPopup: null,

  presentation: {
    map: null,
    index: 0,
    timer: null,
    playing: true,
    markers: [],
    markerKey: '',
    currentSlide: null,
    playlist: null
  },

  voice: {
    recorder: null,
    stream: null,
    chunks: [],
    recording: false,
    audio: null,
    objectUrl: null
  },

  aiVoiceEnabled: true,

  idle: {
    timer: null,
    timeout: 10 * 60 * 1000,
    active: false,
    initialized: false,
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    points: null,
    frame: null,
    renderFrame: null,
    dragging: false,
    lastX: 0,
    lastY: 0,
    targetX: .12,
    targetY: 0,
    manualGraceUntil: 0
  }
};


const MOTION_PREF_VERSION = 2;


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


const esc = value =>
  String(value ?? '').replace(
    /[&<>'"]/g,
    char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[char])
  );


const normalize = value =>
  String(value || '')
    .toLowerCase()
    .replace(/[ʻ’'`]/g, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC');


const localeCode = () => ({
  uz: 'uz-UZ',
  en: 'en-US',
  ru: 'ru-RU',
  zh: 'zh-CN',
  ar: 'ar-SA',
  tr: 'tr-TR',
  ko: 'ko-KR',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES'
}[state.lang] || 'uz-UZ');


const fmt = value =>
  new Intl.NumberFormat(
    localeCode()
  ).format(Number(value) || 0);


const tr = key => {
  try {
    return t(
      state.lang,
      key
    );
  } catch {
    return key;
  }
};


const safeDate = value => {
  if (!value) {
    return null;
  }

  try {
    return new Date(
      value
    ).toLocaleDateString(
      localeCode()
    );
  } catch {
    return value;
  }
};


const toCoord = value => {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return null;
  }

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;
};


const validCoords = item =>
  item &&
  item.lng !== null &&
  item.lng !== undefined &&
  item.lng !== '' &&
  item.lat !== null &&
  item.lat !== undefined &&
  item.lat !== '' &&
  Number.isFinite(Number(item.lng)) &&
  Number.isFinite(Number(item.lat)) &&
  Math.abs(Number(item.lng)) <= 180 &&
  Math.abs(Number(item.lat)) <= 90;


function svg(name) {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      ${ICONS[name] || ICONS.info}
    </svg>
  `;
}


function bindIcons(root = document) {
  $$('[data-icon]', root).forEach(
    element => {
      element.innerHTML =
        svg(element.dataset.icon);
    }
  );
}


function setText(selector, value) {
  const element =
    $(selector);

  if (element) {
    element.textContent =
      value ?? '—';
  }
}


/* =========================================================
   MOTION SYSTEM
========================================================= */

function motionDisabled() {
  return document.documentElement
    .classList
    .contains('reduce-motion');
}


function easeOut() {
  return 'cubic-bezier(.16,1,.3,1)';
}


function cancelMotion(element) {
  if (!element?.getAnimations) {
    return;
  }

  element
    .getAnimations()
    .forEach(animation => {
      try {
        animation.cancel();
      } catch {}
    });
}


function showSmooth(
  target,
  options = {}
) {
  const element =
    typeof target === 'string'
      ? $(target)
      : target;

  if (!element) {
    return Promise.resolve();
  }

  cancelMotion(element);

  element.classList.remove(
    'hidden'
  );

  if (motionDisabled()) {
    return Promise.resolve();
  }

  const duration =
    options.duration ||
    360;

  const keyframes =
    options.keyframes || [
      {
        opacity: 0,
        transform:
          'translate3d(0,12px,0) scale(.985)'
      },
      {
        opacity: 1,
        transform:
          'translate3d(0,0,0) scale(1)'
      }
    ];

  const animation =
    element.animate(
      keyframes,
      {
        duration,
        easing:
          options.easing ||
          easeOut(),
        fill: 'both'
      }
    );

  return animation.finished
    .catch(() => {})
    .finally(() => {
      try {
        animation.cancel();
      } catch {}
    });
}


function hideSmooth(
  target,
  options = {}
) {
  const element =
    typeof target === 'string'
      ? $(target)
      : target;

  if (
    !element ||
    element.classList.contains('hidden')
  ) {
    return Promise.resolve();
  }

  cancelMotion(element);

  if (motionDisabled()) {
    element.classList.add(
      'hidden'
    );

    return Promise.resolve();
  }

  const duration =
    options.duration ||
    250;

  const keyframes =
    options.keyframes || [
      {
        opacity: 1,
        transform:
          'translate3d(0,0,0) scale(1)'
      },
      {
        opacity: 0,
        transform:
          'translate3d(0,8px,0) scale(.99)'
      }
    ];

  const animation =
    element.animate(
      keyframes,
      {
        duration,
        easing:
          options.easing ||
          'cubic-bezier(.4,0,.2,1)',
        fill: 'both'
      }
    );

  return animation.finished
    .catch(() => {})
    .finally(() => {
      element.classList.add(
        'hidden'
      );

      try {
        animation.cancel();
      } catch {}
    });
}


function animateChromeIn() {
  if (motionDisabled()) {
    return;
  }

  const rows = [
    [
      '.topbar',
      0,
      'translate3d(-50%,-12px,0)'
    ],

    [
      '#explorePanel',
      70,
      'translate3d(-14px,0,0)'
    ],

    [
      '.dock',
      120,
      'translate3d(-50%,16px,0)'
    ]
  ];

  rows.forEach(
    ([selector, delay, from]) => {
      const element =
        $(selector);

      if (!element) {
        return;
      }

      const to =
        selector === '.topbar' ||
        selector === '.dock'
          ? 'translate3d(-50%,0,0)'
          : 'translate3d(0,0,0)';

      element.animate(
        [
          {
            opacity: 0,
            transform: from
          },

          {
            opacity: 1,
            transform: to
          }
        ],
        {
          duration: 520,
          delay,
          easing: easeOut()
        }
      );
    }
  );
}


function liquidPress(element) {
  if (
    !element ||
    motionDisabled()
  ) {
    return;
  }

  element.animate(
    [
      {
        scale: 1
      },

      {
        scale: .94,
        offset: .42
      },

      {
        scale: 1
      }
    ],
    {
      duration: 260,
      easing: easeOut()
    }
  );
}


/* =========================================================
   LANGUAGE
========================================================= */

function detectLanguage() {
  const segment =
    location.pathname
      .split('/')
      .filter(Boolean)[0];

  state.lang =
    LANGUAGES.some(
      language =>
        language.code === segment
    )
      ? segment
      : (
          localStorage.getItem(
            'uchkoprik-lang'
          ) ||
          'uz'
        );
}


function applyLanguage() {
  const meta =
    langMeta(state.lang);

  document.documentElement.lang =
    meta.code;

  document.documentElement.dir =
    meta.dir;

  if ($('#langShort')) {
    $('#langShort').textContent =
      meta.short;
  }

  $$('[data-i18n]').forEach(
    element => {
      const value =
        tr(element.dataset.i18n);

      if (
        value &&
        value !== element.dataset.i18n
      ) {
        element.textContent =
          value;
      }
    }
  );

  $$('[data-i18n-placeholder]')
    .forEach(element => {
      element.placeholder =
        tr(
          element.dataset
            .i18nPlaceholder
        );
    });

  $$('[data-i18n-aria]')
    .forEach(element => {
      element.setAttribute(
        'aria-label',
        tr(
          element.dataset
            .i18nAria
        )
      );
    });

  localStorage.setItem(
    'uchkoprik-lang',
    state.lang
  );

  renderAllTextual();
}


function setLanguage(code) {
  if (
    !LANGUAGES.some(
      language =>
        language.code === code
    )
  ) {
    return;
  }

  state.lang =
    code;

  applyLanguage();
  renderLanguages();

  closeSheet(
    'languageSheet'
  );
}


/* =========================================================
   SUPABASE DATA
========================================================= */

async function loadData() {
  if (!window.sb) {
    throw new Error(
      'Supabase client topilmadi. /assets/js/supabase.js ni tekshiring.'
    );
  }

  const [
    mahallaResponse,
    categoryResponse,
    districtResponse,
    organizationResponse,
    economicResponse
  ] = await Promise.all([
    window.sb
      .from('mahallas')
      .select('*')
      .eq('status', 'active')
      .order(
        'legacy_id',
        {
          ascending: true
        }
      ),

    window.sb
      .from('categories')
      .select('*')
      .eq('active', true)
      .order(
        'sort_order',
        {
          ascending: true
        }
      ),

    window.sb
      .from('district')
      .select('*')
      .eq(
        'slug',
        'uchkoprik'
      )
      .single(),

    window.sb
      .from('organizations')
      .select(
        '*,category:categories(id,slug,name,icon,color)'
      )
      .eq(
        'status',
        'active'
      ),

    window.sb
      .from(
        'economic_zone_projects'
      )
      .select('*')
      .eq(
        'status',
        'active'
      )
      .order(
        'source_no',
        {
          ascending: true
        }
      )
  ]);


  if (mahallaResponse.error) {
    throw new Error(
      `MFY: ${mahallaResponse.error.message}`
    );
  }

  if (categoryResponse.error) {
    throw new Error(
      `Kategoriyalar: ${categoryResponse.error.message}`
    );
  }

  if (districtResponse.error) {
    throw new Error(
      `Tuman: ${districtResponse.error.message}`
    );
  }

  if (organizationResponse.error) {
    console.warn(
      'Tashkilotlar:',
      organizationResponse.error.message
    );
  }

  if (economicResponse.error) {
    console.warn(
      'Iqtisodiy zonalar:',
      economicResponse.error.message
    );
  }


  const mahallas =
    (
      mahallaResponse.data ||
      []
    ).map(mahalla => ({
      id:
        mahalla.legacy_id ??
        mahalla.id,

      uuid:
        mahalla.id,

      legacyId:
        mahalla.legacy_id,

      slug:
        mahalla.slug,

      name:
        mahalla.name ||
        mahalla.official_name ||
        'Noma’lum MFY',

      officialName:
        mahalla.official_name ||
        mahalla.name,

      head:
        mahalla.chairman ||
        null,

      phone:
        mahalla.phone ||
        null,

      specialization:
        mahalla.specialization ||
        'Belgilanmagan',

      population:
        Number(
          mahalla.population ||
          0
        ),

      households:
        Number(
          mahalla.households ||
          0
        ),

      families:
        Number(
          mahalla.families ||
          0
        ),

      schools:
        Number(
          mahalla.schools ||
          0
        ),

      kindergartens:
        Number(
          mahalla.kindergartens ||
          0
        ),

      clinics:
        Number(
          mahalla.clinics ||
          0
        ),

      mosques:
        Number(
          mahalla.mosques ||
          0
        ),

      shops:
        Number(
          mahalla.shops ||
          0
        ),

      lat:
        toCoord(
          mahalla.latitude
        ),

      lng:
        toCoord(
          mahalla.longitude
        ),

      imageUrl:
        mahalla.image_url ||
        null,

      verified:
        mahalla.verified !== false,

      source:
        mahalla.source ||
        null,

      updatedAt:
        safeDate(
          mahalla.updated_at
        ),

      type:
        'mahalla',

      category:
        'mahalla',

      _raw:
        mahalla
    }));


  let categories =
    (
      categoryResponse.data ||
      []
    ).map(category => ({
      id:
        category.slug === 'mahallas'
          ? 'mahalla'
          : category.slug,

      dbId:
        category.id,

      slug:
        category.slug,

      name:
        category.name,

      icon:
        category.icon ||
        'marker',

      color:
        category.color ||
        '#63e6ff',

      active:
        category.active !== false,

      sortOrder:
        Number(
          category.sort_order ||
          0
        )
    }));


  const businesses =
    (
      organizationResponse.data ||
      []
    ).map(organization => ({
      id:
        organization.id,

      slug:
        organization.slug,

      name:
        organization.name,

      inn:
        organization.inn ||
        null,

      organizationType:
        organization.organization_type ||
        'Tashkilot',

      sector:
        organization.sector ||
        null,

      industry:
        organization.activity ||
        null,

      description:
        organization.activity ||
        organization.sector ||
        '',

      mahallaId:
        organization.mahalla_id ||
        null,

      address:
        organization.address ||
        null,

      lat:
        toCoord(
          organization.latitude
        ),

      lng:
        toCoord(
          organization.longitude
        ),

      website:
        organization.website ||
        null,

      imageUrl:
        organization.image_url ||
        null,

      phone:
        organization.phone ||
        null,

      responsiblePerson:
        organization.responsible_person ||
        null,

      verified:
        organization.verified === true,

      source:
        organization.source ||
        null,

      updatedAt:
        safeDate(
          organization.updated_at
        ),

      type:
        'business',

      category:
        organization.category?.slug ||
        'business',

      categoryName:
        organization.category?.name ||
        'Tashkilot',

      categoryColor:
        organization.category?.color ||
        '#8b7cff',

      categoryIcon:
        organization.category?.icon ||
        'briefcase',

      _raw:
        organization
    }));


  const businessByInn =
    new Map(
      businesses
        .filter(
          business =>
            business.inn
        )
        .map(
          business => [
            String(
              business.inn
            ).replace(/\D/g, ''),
            business
          ]
        )
    );


  const economicZones =
    (
      economicResponse.data ||
      []
    ).map(zone => {
      const match =
        zone.inn
          ? businessByInn.get(
              String(
                zone.inn
              ).replace(/\D/g, '')
            )
          : null;

      return {
        id:
          zone.id,

        sourceNo:
          zone.source_no,

        slug:
          zone.slug,

        name:
          zone.company_name ||
          zone.zone_name ||
          'Iqtisodiy zona loyihasi',

        zoneName:
          zone.zone_name ||
          'Iqtisodiy zona',

        companyName:
          zone.company_name ||
          null,

        districtCity:
          zone.district_city ||
          null,

        inn:
          zone.inn ||
          null,

        occupiedAreaHa:
          zone.occupied_area_ha === null ||
          zone.occupied_area_ha === undefined
            ? null
            : Number(
                zone.occupied_area_ha
              ),

        activityType:
          zone.activity_type ||
          null,

        description:
          zone.description ||
          zone.activity_type ||
          null,

        founderCitizenship:
          zone.founder_citizenship ||
          null,

        executiveDirector:
          zone.executive_director ||
          null,

        phoneOriginal:
          zone.phone_original ||
          null,

        phoneDigits:
          zone.phone_digits ||
          null,

        sourceDate:
          safeDate(
            zone.source_date
          ),

        verified:
          zone.verified === true,

        status:
          zone.status ||
          'active',

        sourceFile:
          zone.source_file ||
          null,

        imageUrl:
          zone.image_url ||
          match?.imageUrl ||
          null,

        lat:
          toCoord(
            zone.latitude
          ) ??
          match?.lat ??
          null,

        lng:
          toCoord(
            zone.longitude
          ) ??
          match?.lng ??
          null,

        type:
          'economic-zone',

        category:
          'economic-zone',

        categoryName:
          'Iqtisodiy zonalar',

        categoryColor:
          '#5ed8ff',

        _raw:
          zone
      };
    });


  if (
    !categories.some(
      category =>
        category.id === 'mahalla'
    )
  ) {
    categories.unshift({
      id: 'mahalla',
      slug: 'mahallas',
      name: 'MFYlar',
      icon: 'home',
      color: '#63e6ff',
      active: true,
      sortOrder: 0
    });
  }


  if (
    businesses.length &&
    !categories.some(
      category =>
        category.id === 'business'
    )
  ) {
    categories.push({
      id: 'business',
      slug: 'business',
      name: 'Tashkilotlar',
      icon: 'briefcase',
      color: '#8b7cff',
      active: true,
      sortOrder: 90
    });
  }


  if (
    economicZones.length &&
    !categories.some(
      category =>
        category.id ===
        'economic-zone'
    )
  ) {
    categories.push({
      id: 'economic-zone',
      slug: 'economic-zone',
      name: 'Iqtisodiy zonalar',
      icon: 'chart',
      color: '#5ed8ff',
      active: true,
      sortOrder: 95
    });
  }


  const population =
    mahallas.reduce(
      (sum, item) =>
        sum + item.population,
      0
    );

  const households =
    mahallas.reduce(
      (sum, item) =>
        sum + item.households,
      0
    );

  const families =
    mahallas.reduce(
      (sum, item) =>
        sum + item.families,
      0
    );


  const districtRaw =
    districtResponse.data;


  const district = {
    ...districtRaw,

    mahallas:
      Number(
        districtRaw.mahalla_count
      ) ||
      mahallas.length,

    population:
      Number(
        districtRaw.population
      ) ||
      population,

    households,

    families,

    areaKm2:
      Number(
        districtRaw.area_km2 ||
        0
      ),

    governor:
      districtRaw.governor ||
      null,

    founded:
      districtRaw.founded ||
      null,

    industryVolume:
      districtRaw.industry_volume ||
      null,

    agricultureVolume:
      districtRaw.agriculture_volume ||
      null,

    servicesVolume:
      districtRaw.services_volume ||
      null,

    unemploymentRate:
      Number(
        districtRaw.unemployment_rate ||
        0
      ),

    povertyRate:
      Number(
        districtRaw.poverty_rate ||
        0
      ),

    borderLengthKm:
      Number(
        districtRaw.border_length_km ||
        0
      ),

    healthcareCount:
      Number(
        districtRaw.healthcare_count ||
        0
      ),

    updatedAt:
      safeDate(
        districtRaw.updated_at
      )
  };


  state.data = {
    mahallas,
    categories,
    businesses,
    places: [],
    products: [],
    economicZones,
    district,
    presentationSlides: [],
    presentationPlaylist: null
  };


  await loadPresentationData();


  console.log(
    `Supabase: ${mahallas.length} ta MFY yuklandi`
  );

  console.log(
    `Supabase: ${categories.length} ta kategoriya yuklandi`
  );

  console.log(
    `Supabase: ${businesses.length} ta tashkilot yuklandi`
  );

  console.log(
    `Supabase: ${economicZones.length} ta iqtisodiy zona loyihasi yuklandi`
  );

  console.log(
    `Supabase: ${state.data.presentationSlides.length} ta prezentatsiya slaydi yuklandi`
  );
}


/* =========================================================
   MAP
========================================================= */

const DEFAULT_MAP_PITCH =
  48;

const DEFAULT_MAP_BEARING =
  -8;


function getMapStyleUrl() {
  return document.documentElement
    .dataset.theme === 'light'
      ? 'https://tiles.openfreemap.org/styles/positron'
      : 'https://tiles.openfreemap.org/styles/dark';
}


function applyMapTheme() {
  if (!state.map) {
    return;
  }

  const camera =
    getCamera();

  state.map.setStyle(
    getMapStyleUrl()
  );

  state.map.once(
    'styledata',
    () => {
      if (camera) {
        restoreCamera(
          camera,
          0
        );
      }

      renderMarkers();
    }
  );
}


function initMap() {
  state.map =
    new maplibregl.Map({
      container:
        'map',

      style:
        getMapStyleUrl(),

      center:
        [71.045, 40.54],

      zoom:
        10.2,

      pitch:
        DEFAULT_MAP_PITCH,

      bearing:
        DEFAULT_MAP_BEARING,

      attributionControl:
        true,

      cooperativeGestures:
        false,

      fadeDuration:
        120
    });


  state.map.addControl(
    new maplibregl.NavigationControl({
      showCompass: true,
      visualizePitch: true
    }),
    'top-right'
  );


  state.map.on(
    'load',
    () => {
      renderMarkers();
      fitDistrict(false);
    }
  );


  state.map.on(
    'move',
    () => {
      if (state.selected) {
        scheduleConnectorUpdate();
      }
    }
  );

  state.map.on(
    'zoom',
    () => {
      if (state.selected) {
        scheduleConnectorUpdate();
      }
    }
  );

  state.map.on(
    'rotate',
    () => {
      if (state.selected) {
        scheduleConnectorUpdate();
      }
    }
  );

  state.map.on(
    'pitch',
    () => {
      if (state.selected) {
        scheduleConnectorUpdate();
      }
    }
  );

  state.map.on(
    'moveend',
    () => {
      if (state.selected) {
        updateConnector();
      }
    }
  );

  state.map.on(
    'resize',
    () => {
      if (state.selected) {
        updateConnector();
      }
    }
  );
}


function getCamera() {
  if (!state.map) {
    return null;
  }

  const center =
    state.map.getCenter();

  return {
    center: [
      center.lng,
      center.lat
    ],

    zoom:
      state.map.getZoom(),

    pitch:
      state.map.getPitch(),

    bearing:
      state.map.getBearing()
  };
}


function restoreCamera(
  camera,
  duration = 700
) {
  if (
    !state.map ||
    !camera
  ) {
    return;
  }

  state.map.stop();

  state.map.easeTo({
    ...camera,

    duration:
      motionDisabled()
        ? 0
        : duration,

    essential:
      true
  });
}


function districtBounds() {
  if (
    !state.data.mahallas.length
  ) {
    return null;
  }

  const bounds =
    new maplibregl
      .LngLatBounds();

  state.data.mahallas
    .forEach(mahalla => {
      if (
        validCoords(mahalla)
      ) {
        bounds.extend([
          mahalla.lng,
          mahalla.lat
        ]);
      }
    });

  return bounds;
}


function fitDistrict(
  animate = true
) {
  if (!state.map) {
    return;
  }

  const bounds =
    districtBounds();

  if (!bounds) {
    return;
  }

  const passport =
    document.body.classList
      .contains('passport-mode');


  state.map.stop();


  state.map.fitBounds(
    bounds,
    {
      padding:
        passport
          ? 38
          : {
              top: 92,
              bottom: 84,
              left: 72,
              right: 72
            },

      duration:
        animate &&
        !motionDisabled()
          ? 760
          : 0,

      maxZoom:
        passport
          ? 11.1
          : 11.4,

      pitch:
        passport
          ? 38
          : DEFAULT_MAP_PITCH,

      bearing:
        passport
          ? 0
          : DEFAULT_MAP_BEARING,

      essential:
        true
    }
  );
}


function flyToItem(item) {
  if (
    !state.map ||
    !validCoords(item)
  ) {
    return;
  }

  state.map.stop();

  state.map.flyTo({
    center: [
      Number(item.lng),
      Number(item.lat)
    ],

    zoom:
      13.25,

    pitch:
      54,

    bearing:
      DEFAULT_MAP_BEARING,

    duration:
      motionDisabled()
        ? 0
        : 900,

    curve:
      1.42,

    speed:
      .85,

    essential:
      true
  });
}


/* =========================================================
   CATEGORIES / FILTERS
========================================================= */

function getCategory(id) {
  return state.data.categories
    .find(
      category =>
        category.id === id ||
        category.slug === id
    );
}


function getCategoryColor(id) {
  return (
    getCategory(id)?.color ||
    '#63e6ff'
  );
}


function getCategoryIcon(id) {
  const category =
    getCategory(id);

  if (
    category?.icon &&
    ICONS[category.icon]
  ) {
    return category.icon;
  }

  return (
    iconForCategory[id] ||
    'marker'
  );
}


function categoryLabel(category) {
  if (!category) {
    return '';
  }

  if (
    category.id ===
    'economic-zone'
  ) {
    return 'Iqtisodiy zonalar';
  }

  const keys = {
    mahalla: 'mahallas',
    business: 'businesses',
    education: 'education',
    health: 'health',
    culture: 'culture',
    service: 'services',
    investment: 'investment'
  };

  if (
    keys[category.id]
  ) {
    const value =
      tr(
        keys[category.id]
      );

    if (
      value !==
      keys[category.id]
    ) {
      return value;
    }
  }

  return (
    category.name ||
    category.slug ||
    category.id
  );
}


function getSpecializationColor(name) {
  if (SPEC_COLORS[name]) {
    return SPEC_COLORS[name];
  }

  const unique = [
    ...new Set(
      state.data.mahallas
        .map(
          mahalla =>
            mahalla.specialization
        )
        .filter(Boolean)
    )
  ];

  const index =
    Math.max(
      0,
      unique.indexOf(name)
    );

  return FALLBACK_COLORS[
    index %
    FALLBACK_COLORS.length
  ];
}


function getSpecializationStats() {
  const map =
    new Map();

  state.data.mahallas
    .forEach(mahalla => {
      const specialization =
        mahalla.specialization ||
        'Belgilanmagan';

      map.set(
        specialization,
        (
          map.get(
            specialization
          ) || 0
        ) + 1
      );
    });


  return [
    ...map.entries()
  ]
    .map(
      ([name, count]) => ({
        name,
        count,
        color:
          getSpecializationColor(
            name
          )
      })
    )
    .sort(
      (a, b) =>
        b.count -
        a.count
    );
}


function getOrganizationTypes() {
  const map =
    new Map();

  state.data.businesses
    .forEach(business => {
      const name =
        business.organizationType ||
        business.categoryName ||
        'Tashkilot';

      map.set(
        name,
        (
          map.get(name) ||
          0
        ) + 1
      );
    });


  return [
    ...map.entries()
  ]
    .map(
      ([name, count]) => ({
        name,
        count
      })
    )
    .sort(
      (a, b) =>
        b.count -
        a.count
    );
}


function renderCategories() {
  const host =
    $('#categoryChips');

  if (!host) {
    return;
  }

  const rows = [
    {
      id: 'all',
      name: 'Barchasi',
      color: '#ffffff',
      icon: 'map'
    },

    ...state.data.categories
      .filter(
        category =>
          category.active !== false
      )
  ];


  host.innerHTML =
    rows
      .map(
        category => `
          <button
            class="category-chip ${state.activeLayer === category.id ? 'active' : ''}"
            type="button"
            data-category="${esc(category.id)}"
            style="--chip:${category.color || '#63e6ff'}"
          >
            <span
              class="dot"
              style="
                color:${category.color || '#63e6ff'};
                background:${category.color || '#63e6ff'};
              "
            ></span>

            <span>
              ${
                esc(
                  category.id === 'all'
                    ? 'Barchasi'
                    : categoryLabel(category)
                )
              }
            </span>
          </button>
        `
      )
      .join('');


  $$('.category-chip', host)
    .forEach(button => {
      button.addEventListener(
        'click',
        () => {
          state.activeLayer =
            button.dataset.category;

          state.selectedSpecialization =
            null;

          state.selectedOrganizationType =
            null;

          state.layerListQuery =
            '';

          renderCategories();
          renderMarkers();
        }
      );
    });


  renderSpecializationFilters();
  renderOrganizationFilters();
  renderEconomicZoneFilters();
  renderLayerList();
}


function renderSpecializationFilters() {
  const section =
    $('#specializationFilters');

  const host =
    $('#specializationList');


  if (
    !section ||
    !host
  ) {
    return;
  }


  if (
    state.activeLayer !==
    'mahalla'
  ) {
    section.classList.add(
      'hidden'
    );

    return;
  }


  const items =
    getSpecializationStats();


  section.classList.remove(
    'hidden'
  );


  host.innerHTML =
    items
      .map(
        item => `
          <button
            class="filter-specialization ${state.selectedSpecialization === item.name ? 'active' : ''}"
            type="button"
            data-specialization="${esc(item.name)}"
            style="--spec-color:${item.color}"
          >
            <span class="color"></span>
            <span class="name">${esc(item.name)}</span>
            <span class="count">${item.count}</span>
          </button>
        `
      )
      .join('');


  $$(
    '[data-specialization]',
    host
  ).forEach(button => {
    button.addEventListener(
      'click',
      () => {
        const value =
          button.dataset.specialization;

        state.selectedSpecialization =
          state.selectedSpecialization === value
            ? null
            : value;

        renderSpecializationFilters();
        applyMarkerFilters();
        renderLayerList();
      }
    );
  });
}


function renderOrganizationFilters() {
  const section =
    $('#organizationFilters');

  const host =
    $('#organizationFilterList');


  if (
    !section ||
    !host
  ) {
    return;
  }


  const organizationLayer =
    state.activeLayer === 'business' ||
    (
      state.activeLayer !== 'all' &&
      state.activeLayer !== 'mahalla' &&
      state.data.businesses.some(
        business =>
          business.category ===
          state.activeLayer
      )
    );


  if (
    !organizationLayer ||
    !state.data.businesses.length
  ) {
    section.classList.add(
      'hidden'
    );

    return;
  }


  section.classList.remove(
    'hidden'
  );


  const items =
    getOrganizationTypes();


  host.innerHTML =
    items
      .map(
        item => `
          <button
            class="filter-specialization ${state.selectedOrganizationType === item.name ? 'active' : ''}"
            type="button"
            data-organization-type="${esc(item.name)}"
            style="--spec-color:#8b7cff"
          >
            <span class="color"></span>
            <span class="name">${esc(item.name)}</span>
            <span class="count">${item.count}</span>
          </button>
        `
      )
      .join('');


  $$(
    '[data-organization-type]',
    host
  ).forEach(button => {
    button.addEventListener(
      'click',
      () => {
        const value =
          button.dataset
            .organizationType;

        state.selectedOrganizationType =
          state.selectedOrganizationType === value
            ? null
            : value;

        renderOrganizationFilters();
        applyMarkerFilters();
        renderLayerList();
      }
    );
  });
}


function renderEconomicZoneFilters() {
  const section =
    $('#economicZoneFilters');

  const host =
    $('#economicZoneList');

  const count =
    $('#economicZoneCount');


  if (
    !section ||
    !host
  ) {
    return;
  }


  if (
    state.activeLayer !==
    'economic-zone'
  ) {
    section.classList.add(
      'hidden'
    );

    return;
  }


  const zones =
    state.data.economicZones ||
    [];


  section.classList.remove(
    'hidden'
  );


  if (count) {
    count.textContent =
      fmt(zones.length);
  }


  host.innerHTML =
    zones
      .slice(0, 10)
      .map(
        zone => `
          <button
            class="economic-zone-item"
            type="button"
            data-economic-zone="${esc(zone.id)}"
          >
            <strong>
              ${esc(zone.companyName || zone.name)}
            </strong>

            <small>
              ${
                esc(
                  [
                    zone.zoneName,
                    zone.districtCity
                  ]
                    .filter(Boolean)
                    .join(' · ')
                )
              }
            </small>
          </button>
        `
      )
      .join('')
    +
    (
      zones.length > 10
        ? `
          <div class="economic-zone-more">
            + ${fmt(zones.length - 10)} ta loyiha qidiruv orqali mavjud
          </div>
        `
        : ''
    );


  $$(
    '[data-economic-zone]',
    host
  ).forEach(button => {
    button.addEventListener(
      'click',
      () => {
        const item =
          zones.find(
            zone =>
              String(zone.id) ===
              button.dataset.economicZone
          );

        if (item) {
          openDetail(
            item,
            'economic-zone'
          );
        }
      }
    );
  });
}


/* =========================================================
   LAYER LIST
========================================================= */

function activeLayerList() {
  if (
    state.activeLayer ===
    'mahalla'
  ) {
    const items =
      state.selectedSpecialization
        ? state.data.mahallas
            .filter(
              item =>
                item.specialization ===
                state.selectedSpecialization
            )
        : state.data.mahallas;

    return {
      title: 'MFYlar',
      kind: 'mahalla',
      items
    };
  }


  if (
    state.activeLayer ===
    'economic-zone'
  ) {
    return {
      title: 'Iqtisodiy zonalar',
      kind: 'economic-zone',
      items:
        state.data.economicZones
    };
  }


  if (
    state.activeLayer ===
    'business'
  ) {
    const items =
      state.selectedOrganizationType
        ? state.data.businesses
            .filter(
              item =>
                item.organizationType ===
                state.selectedOrganizationType
            )
        : state.data.businesses;

    return {
      title: 'Tashkilotlar',
      kind: 'business',
      items
    };
  }


  if (
    state.activeLayer ===
    'all'
  ) {
    return {
      title: 'Barcha qatlamlar',
      kind: 'all',
      items: []
    };
  }


  let organizations =
    state.data.businesses
      .filter(
        item =>
          item.category ===
          state.activeLayer
      );


  if (
    state.selectedOrganizationType
  ) {
    organizations =
      organizations.filter(
        item =>
          item.organizationType ===
          state.selectedOrganizationType
      );
  }


  if (
    organizations.length
  ) {
    return {
      title:
        categoryLabel(
          getCategory(
            state.activeLayer
          )
        ) ||
        'Tashkilotlar',

      kind:
        'business',

      items:
        organizations
    };
  }


  return {
    title: 'Ro‘yxat',
    kind: 'all',
    items: []
  };
}


function renderLayerList() {
  const host =
    $('#layerListItems');

  const title =
    $('#layerListTitle');

  const count =
    $('#layerListCount');

  const search =
    $('#layerListSearch');

  const toggleLabel =
    $('#layerListToggleLabel');


  if (!host) {
    return;
  }


  const data =
    activeLayerList();


  if (title) {
    title.textContent =
      data.title;
  }


  if (toggleLabel) {
    toggleLabel.textContent =
      state.activeLayer === 'all'
        ? 'Ro‘yxat'
        : `${data.title} ro‘yxati`;
  }


  if (
    search &&
    search.value !==
    state.layerListQuery
  ) {
    search.value =
      state.layerListQuery;
  }


  let items =
    [...data.items];


  const query =
    normalize(
      state.layerListQuery
    ).trim();


  if (query) {
    items =
      items.filter(item =>
        normalize(
          [
            item.name,
            item.officialName,
            item.specialization,
            item.organizationType,
            item.sector,
            item.address,
            item.zoneName,
            item.districtCity,
            item.inn,
            item.activityType,
            item.responsiblePerson,
            item.executiveDirector
          ]
            .filter(Boolean)
            .join(' ')
        ).includes(query)
      );
  }


  if (count) {
    count.textContent =
      fmt(items.length);
  }


  if (
    data.kind === 'all'
  ) {
    host.innerHTML = `
      <div class="layer-list-empty">
        <strong>
          Qatlamni tanlang
        </strong>

        <span>
          MFYlar, Tashkilotlar yoki Iqtisodiy zonalarni tanlasangiz shu yerda to‘liq ro‘yxat ochiladi.
        </span>
      </div>
    `;

    return;
  }


  if (!items.length) {
    host.innerHTML = `
      <div class="layer-list-empty">
        Natija topilmadi.
      </div>
    `;

    return;
  }


  const visible =
    items.slice(0, 180);


  host.innerHTML =
    visible
      .map(
        (item, index) => {
          const kind =
            data.kind;

          const subtitle =
            kind === 'mahalla'
              ? item.specialization
              : kind === 'business'
                ? (
                    item.organizationType ||
                    item.sector ||
                    item.address
                  )
                : [
                    item.zoneName,
                    item.districtCity
                  ]
                    .filter(Boolean)
                    .join(' · ');

          const hasCoordinates =
            validCoords(item);

          const color =
            kind === 'mahalla'
              ? getSpecializationColor(
                  item.specialization
                )
              : kind === 'economic-zone'
                ? '#5ed8ff'
                : (
                    item.categoryColor ||
                    '#8b7cff'
                  );

          return `
            <button
              class="layer-list-item ${hasCoordinates ? '' : 'no-location'}"
              type="button"
              data-layer-list-index="${index}"
            >
              <span
                class="layer-list-pin"
                style="--item-color:${color}"
              ></span>

              <span class="layer-list-copy">
                <strong>
                  ${esc(item.name || item.companyName || '—')}
                </strong>

                <small>
                  ${esc(subtitle || '')}
                </small>
              </span>

              <span class="layer-list-location">
                ${hasCoordinates ? 'Xarita' : 'Joylashuv yo‘q'}
              </span>
            </button>
          `;
        }
      )
      .join('')
    +
    (
      items.length >
      visible.length
        ? `
          <div class="layer-list-more">
            ${fmt(items.length - visible.length)} ta yozuv. Qidiruv orqali aniq yozuvni toping.
          </div>
        `
        : ''
    );


  $$(
    '[data-layer-list-index]',
    host
  ).forEach(button => {
    button.addEventListener(
      'click',
      () => {
        const item =
          visible[
            Number(
              button.dataset
                .layerListIndex
            )
          ];

        if (!item) {
          return;
        }

        closeLayerList();

        setTimeout(
          () => {
            openDetail(
              item,
              data.kind
            );
          },
          120
        );
      }
    );
  });
}


function openLayerList() {
  state.layerListOpen =
    true;

  document.body.classList.add(
    'layer-list-open'
  );

  $('#layerListToggle')
    ?.setAttribute(
      'aria-expanded',
      'true'
    );

  renderLayerList();

  setTimeout(
    () =>
      $('#layerListSearch')
        ?.focus(),
    180
  );
}


function closeLayerList() {
  state.layerListOpen =
    false;

  document.body.classList.remove(
    'layer-list-open'
  );

  $('#layerListToggle')
    ?.setAttribute(
      'aria-expanded',
      'false'
    );
}


function toggleLayerList() {
  if (state.layerListOpen) {
    closeLayerList();
  } else {
    openLayerList();
  }
}


/* =========================================================
   MAP MARKERS
========================================================= */

function clearMarkers() {
  hideMarkerHover();

  state.markers
    .forEach(
      item =>
        item.marker.remove()
    );

  state.markers =
    [];
}


function hideMarkerHover() {
  state.hoverPopup?.remove();

  state.hoverPopup =
    null;
}


function showMarkerHover(
  item,
  kind,
  color
) {
  if (
    !state.map ||
    !validCoords(item)
  ) {
    return;
  }

  hideMarkerHover();

  const type =
    kind === 'mahalla'
      ? 'MFY'
      : kind === 'economic-zone'
        ? 'Iqtisodiy zona'
        : kind === 'business'
          ? 'Tashkilot'
          : 'Joy';


  state.hoverPopup =
    new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -30],
      className:
        'marker-name-popup'
    })
      .setLngLat([
        Number(item.lng),
        Number(item.lat)
      ])
      .setHTML(`
        <div
          class="marker-popup-card"
          style="--marker:${color}"
        >
          <span>${esc(type)}</span>
          <strong>${esc(item.name || item.companyName || '—')}</strong>
        </div>
      `)
      .addTo(state.map);
}


function markerElement(
  item,
  kind,
  color
) {
  const element =
    document.createElement(
      'button'
    );

  element.type =
    'button';

  element.className =
    `map-data-marker ${
      kind === 'mahalla'
        ? 'mfy-marker'
        : 'place-marker'
    } marker-${kind}`;

  element.setAttribute(
    'aria-label',
    item.name ||
    ''
  );


  element.innerHTML = `
    <span
      class="map-pin-3d"
      style="--marker:${color}"
    >
      <span class="map-pin-face">
        <span class="map-pin-core
