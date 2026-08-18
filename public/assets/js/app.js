import { LANGUAGES, t, langMeta } from './i18n.js';

/* =========================================================
   UCHKO‘PRIK DIGITAL DISTRICT
   APP.JS — UX V2
========================================================= */


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

  filter:
    '<path d="M4 6h16M7 12h10M10 18h4"></path>',

  users:
    '<circle cx="9" cy="8" r="3"></circle><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6"></path><path d="M16 5c2 .2 3 1.4 3 3s-1 2.8-3 3M17 14c2.6.5 4 2.4 4 6"></path>',

  building:
    '<path d="M5 21V4h10v17M15 9h4v12M8 8h4M8 12h4M8 16h4M3 21h18"></path>',

  info:
    '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7h.01"></path>'
};


/* =========================================================
   CATEGORY ICONS
========================================================= */

const iconForCategory = {
  mahalla: 'home',
  mahallas: 'home',

  business: 'briefcase',
  businesses: 'briefcase',

  education: 'school',
  school: 'school',
  schools: 'school',

  health: 'health',
  healthcare: 'health',
  clinic: 'health',

  culture: 'landmark',

  service: 'service',
  services: 'service',

  investment: 'chart',

  government: 'landmark'
};


/* =========================================================
   SPECIALIZATION COLORS

   Keyinchalik Supabase/admin orqali olinadigan qilamiz.
========================================================= */

const SPECIALIZATION_COLORS = {
  'Dehqonchilik': '#37e675',
  'Chorvachilik': '#ffae2b',
  'Kichik ishlab chiqarish': '#6f7cff',
  'Bog‘dorchilik': '#20c7e8',
  'Hunarmandchilik': '#f05ac9',
  'Savdo va xizmat ko‘rsatish': '#a96cff'
};


const SPECIALIZATION_FALLBACK = [
  '#36e878',
  '#ffad24',
  '#6578ff',
  '#20c8e9',
  '#ee5ac8',
  '#a965ff',
  '#62e6ff',
  '#f77979'
];


/* =========================================================
   STATE
========================================================= */

const state = {

  lang: 'uz',

  data: {
    mahallas: [],
    categories: [],
    places: [],
    businesses: [],
    products: [],
    district: {}
  },

  map: null,

  markers: [],

  selected: null,

  activeCategories:
    new Set(['mahalla']),

  selectedSpecialization: null,

  selectedOrganizationType: null,

  activePanel: 'explore',

  savedCamera: null,

  detailCamera: null,

  passportCamera: null,

  connectorFrame: null,

  presentation: {
    map: null,
    index: 0,
    timer: null,
    playing: true
  },

  voiceRecognition: null,

  idle: {
    timer: null,
    timeout: 10 * 60 * 1000,
    active: false,
    initialized: false,
    three: null,
    animationFrame: null,
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    points: null,
    pointer: {
      x: 0,
      y: 0
    },
    targetRotation: {
      x: 0,
      y: 0
    },
    rotation: {
      x: 0,
      y: 0
    },
    dragging: false,
    lastX: 0,
    lastY: 0
  }
};


/* =========================================================
   HELPERS
========================================================= */

const $ = (
  selector,
  root = document
) => root.querySelector(selector);


const $$ = (
  selector,
  root = document
) => [
  ...root.querySelectorAll(selector)
];


function svg(name) {

  return `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      ${ICONS[name] || ICONS.info}
    </svg>
  `;
}


function bindIcons(
  root = document
) {

  $$('[data-icon]', root)
    .forEach((element) => {

      element.innerHTML =
        svg(element.dataset.icon);
    });
}


function tr(key) {

  try {

    return t(
      state.lang,
      key
    );

  } catch {

    return key;
  }
}


function localeCode() {

  const map = {
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
  };

  return map[state.lang] ||
    'uz-UZ';
}


function fmt(value) {

  return new Intl.NumberFormat(
    localeCode()
  ).format(
    Number(value) || 0
  );
}


function esc(value) {

  return String(
    value ?? ''
  ).replace(
    /[&<>'"]/g,
    (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    })[char]
  );
}


function normalize(value) {

  return String(
    value || ''
  )
    .toLowerCase()
    .replace(/[ʻ’'`]/g, '')
    .normalize('NFKD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .normalize('NFC');
}


function safeDate(value) {

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
}


function validCoordinates(item) {

  return (
    Number.isFinite(
      Number(item?.lng)
    ) &&
    Number.isFinite(
      Number(item?.lat)
    )
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

  state.map.easeTo({
    center:
      camera.center,
    zoom:
      camera.zoom,
    pitch:
      camera.pitch,
    bearing:
      camera.bearing,
    duration:
      document.documentElement
        .classList
        .contains(
          'reduce-motion'
        )
        ? 0
        : duration
  });
}


/* =========================================================
   LANGUAGE
========================================================= */

function detectLanguage() {

  const segment =
    location.pathname
      .split('/')
      .filter(Boolean)[0];

  if (
    LANGUAGES.some(
      (language) =>
        language.code === segment
    )
  ) {

    state.lang =
      segment;

    return;
  }

  state.lang =
    localStorage.getItem(
      'uchkoprik-lang'
    ) ||
    'uz';
}


function applyLanguage() {

  const meta =
    langMeta(
      state.lang
    );

  document.documentElement.lang =
    meta.code;

  document.documentElement.dir =
    meta.dir;

  if ($('#langShort')) {

    $('#langShort').textContent =
      meta.short;
  }


  $$('[data-i18n]')
    .forEach((element) => {

      const value =
        tr(
          element.dataset.i18n
        );

      if (
        value &&
        value !==
          element.dataset.i18n
      ) {

        element.textContent =
          value;
      }
    });


  $$('[data-i18n-placeholder]')
    .forEach((element) => {

      const value =
        tr(
          element.dataset
            .i18nPlaceholder
        );

      if (value) {

        element.placeholder =
          value;
      }
    });


  $$('[data-i18n-aria]')
    .forEach((element) => {

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
      (language) =>
        language.code === code
    )
  ) {
    return;
  }

  state.lang = code;

  applyLanguage();

  renderLanguages();

  closeSheet(
    'languageSheet'
  );
}


/* =========================================================
   SUPABASE
========================================================= */

async function loadData() {

  if (!window.sb) {

    throw new Error(
      'Supabase client topilmadi'
    );
  }


  const [
    mahallasResult,
    categoriesResult,
    districtResult,
    organizationsResult
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
      .select(`
        id,
        slug,
        name,
        inn,
        organization_type,
        sector,
        activity,
        mahalla_id,
        address,
        latitude,
        longitude,
        website,
        image_url,
        status,
        verified,
        category_id,
        source,
        created_at,
        updated_at,
        category:categories(
          id,
          slug,
          name,
          icon,
          color
        )
      `)
      .eq(
        'status',
        'active'
      )
  ]);


  if (
    mahallasResult.error
  ) {

    throw new Error(
      `MFY: ${mahallasResult.error.message}`
    );
  }


  if (
    categoriesResult.error
  ) {

    throw new Error(
      `Categories: ${categoriesResult.error.message}`
    );
  }


  if (
    districtResult.error
  ) {

    throw new Error(
      `District: ${districtResult.error.message}`
    );
  }


  if (
    organizationsResult.error
  ) {

    console.warn(
      'Organizations:',
      organizationsResult
        .error
        .message
    );
  }


  const mahallas =
    (
      mahallasResult.data ||
      []
    ).map((row) => ({

      id:
        row.legacy_id ??
        row.id,

      uuid:
        row.id,

      legacyId:
        row.legacy_id,

      slug:
        row.slug,

      name:
        row.name ||
        row.official_name ||
        'Noma’lum MFY',

      officialName:
        row.official_name ||
        row.name,

      head:
        row.chairman ||
        null,

      phone:
        row.phone ||
        null,

      specialization:
        row.specialization ||
        'Belgilanmagan',

      population:
        Number(
          row.population ||
          0
        ),

      households:
        Number(
          row.households ||
          0
        ),

      families:
        Number(
          row.families ||
          0
        ),

      schools:
        Number(
          row.schools ||
          0
        ),

      kindergartens:
        Number(
          row.kindergartens ||
          0
        ),

      clinics:
        Number(
          row.clinics ||
          0
        ),

      mosques:
        Number(
          row.mosques ||
          0
        ),

      shops:
        Number(
          row.shops ||
          0
        ),

      lat:
        Number(
          row.latitude
        ),

      lng:
        Number(
          row.longitude
        ),

      imageUrl:
        row.image_url ||
        null,

      verified:
        row.verified !==
        false,

      source:
        row.source ||
        null,

      updatedAt:
        safeDate(
          row.updated_at
        ),

      type:
        'mahalla',

      category:
        'mahalla'
    }));


  let categories =
    (
      categoriesResult.data ||
      []
    ).map((row) => ({

      id:
        row.slug ===
        'mahallas'
          ? 'mahalla'
          : row.slug,

      dbId:
        row.id,

      slug:
        row.slug,

      name:
        row.name,

      icon:
        row.icon ||
        'marker',

      color:
        row.color ||
        '#62e6ff',

      markerShape:
        row.marker_shape ||
        'circle',

      geometryType:
        row.geometry_type ||
        'point',

      sourceType:
        row.source_type,

      sortOrder:
        Number(
          row.sort_order ||
          0
        ),

      active:
        row.active !==
        false
    }));


  const businesses =
    (
      organizationsResult.data ||
      []
    ).map((row) => {

      const categorySlug =
        row.category?.slug ||
        'business';

      return {

        id:
          row.id,

        slug:
          row.slug,

        name:
          row.name,

        inn:
          row.inn ||
          null,

        organizationType:
          row.organization_type ||
          'Tashkilot',

        sector:
          row.sector ||
          null,

        industry:
          row.activity ||
          null,

        description:
          row.activity ||
          row.sector ||
          '',

        mahallaId:
          row.mahalla_id ||
          null,

        address:
          row.address ||
          null,

        lat:
          Number(
            row.latitude
          ),

        lng:
          Number(
            row.longitude
          ),

        website:
          row.website ||
          null,

        imageUrl:
          row.image_url ||
          null,

        verified:
          row.verified ===
          true,

        source:
          row.source ||
          null,

        updatedAt:
          safeDate(
            row.updated_at
          ),

        type:
          'business',

        category:
          categorySlug ===
          'mahallas'
            ? 'business'
            : categorySlug,

        categoryName:
          row.category?.name ||
          'Tashkilot',

        categoryColor:
          row.category?.color ||
          '#8b7cff',

        categoryIcon:
          row.category?.icon ||
          'briefcase'
      };
    });


  /*
    Organizations mavjud bo‘lsa,
    frontendda generic business
    filter ham bo‘ladi.
  */

  if (
    businesses.length &&
    !categories.some(
      (category) =>
        category.id ===
        'business'
    )
  ) {

    categories.push({
      id: 'business',
      slug: 'business',
      name: 'Tashkilotlar',
      icon: 'briefcase',
      color: '#8b7cff',
      active: true,
      sortOrder: 20
    });
  }


  const totalPopulation =
    mahallas.reduce(
      (sum, item) =>
        sum +
        item.population,
      0
    );


  const totalHouseholds =
    mahallas.reduce(
      (sum, item) =>
        sum +
        item.households,
      0
    );


  const totalFamilies =
    mahallas.reduce(
      (sum, item) =>
        sum +
        item.families,
      0
    );


  const row =
    districtResult.data;


  const district = {

    ...row,

    mahallas:
      Number(
        row.mahalla_count
      ) ||
      mahallas.length,

    population:
      Number(
        row.population
      ) ||
      totalPopulation,

    households:
      totalHouseholds,

    families:
      totalFamilies,

    areaKm2:
      Number(
        row.area_km2 ||
        0
      ),

    governor:
      row.governor ||
      null,

    founded:
      row.founded ||
      null,

    industryVolume:
      row.industry_volume ||
      null,

    agricultureVolume:
      row.agriculture_volume ||
      null,

    servicesVolume:
      row.services_volume ||
      null,

    unemploymentRate:
      Number(
        row.unemployment_rate ||
        0
      ),

    povertyRate:
      Number(
        row.poverty_rate ||
        0
      ),

    borderLengthKm:
      Number(
        row.border_length_km ||
        0
      ),

    healthcareCount:
      Number(
        row.healthcare_count ||
        0
      ),

    updatedAt:
      safeDate(
        row.updated_at
      )
  };


  state.data = {
    mahallas,
    categories,
    businesses,
    places: [],
    products: [],
    district
  };


  console.log(
    `Supabase: ${mahallas.length} ta MFY`
  );

  console.log(
    `Supabase: ${categories.length} ta kategoriya`
  );

  console.log(
    `Supabase: ${businesses.length} ta tashkilot`
  );
}


/* =========================================================
   SPECIALIZATIONS
========================================================= */

function getSpecializationColor(
  specialization
) {

  if (
    SPECIALIZATION_COLORS[
      specialization
    ]
  ) {

    return SPECIALIZATION_COLORS[
      specialization
    ];
  }


  const unique =
    [
      ...new Set(
        state.data.mahallas
          .map(
            (item) =>
              item.specialization
          )
          .filter(Boolean)
      )
    ];


  const index =
    Math.max(
      0,
      unique.indexOf(
        specialization
      )
    );


  return SPECIALIZATION_FALLBACK[
    index %
    SPECIALIZATION_FALLBACK.length
  ];
}


function getSpecializationStats() {

  const map =
    new Map();


  state.data.mahallas
    .forEach((item) => {

      const name =
        item.specialization ||
        'Belgilanmagan';


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
    !state.activeCategories
      .has('mahalla')
  ) {

    section.classList.add(
      'hidden'
    );

    return;
  }


  const items =
    getSpecializationStats();


  if (!items.length) {

    section.classList.add(
      'hidden'
    );

    return;
  }


  section.classList.remove(
    'hidden'
  );


  host.innerHTML =
    items.map(
      (item) => `

        <button
          class="filter-specialization ${
            state.selectedSpecialization ===
            item.name
              ? 'active'
              : ''
          }"
          type="button"
          data-specialization="${esc(item.name)}"
          style="--spec-color:${item.color}"
        >

          <span
            class="color"
          ></span>

          <span
            class="name"
          >
            ${esc(item.name)}
          </span>

          <span
            class="count"
          >
            ${item.count}
          </span>

        </button>

      `
    ).join('');


  $$('.filter-specialization', host)
    .forEach((button) => {

      button.addEventListener(
        'click',
        () => {

          const value =
            button.dataset
              .specialization;


          state.selectedSpecialization =
            state.selectedSpecialization ===
            value
              ? null
              : value;


          renderSpecializationFilters();

          applyMarkerFilters();
        }
      );
    });
}


function getOrganizationTypes() {

  const map =
    new Map();


  state.data.businesses
    .forEach((business) => {

      const type =
        business.organizationType ||
        business.categoryName ||
        'Tashkilot';


      map.set(
        type,
        (
          map.get(type) ||
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


  const businessLayerActive =
    state.activeCategories
      .has('business') ||
    state.data.categories
      .some(
        (category) =>
          category.id !==
            'mahalla' &&
          state.activeCategories
            .has(
              category.id
            )
      );


  if (
    !businessLayerActive ||
    !state.data.businesses.length
  ) {

    section.classList.add(
      'hidden'
    );

    return;
  }


  const items =
    getOrganizationTypes();


  section.classList.remove(
    'hidden'
  );


  host.innerHTML =
    items.map(
      (item) => `

        <button
          type="button"
          class="filter-specialization ${
            state.selectedOrganizationType ===
            item.name
              ? 'active'
              : ''
          }"
          data-organization-type="${esc(item.name)}"
          style="--spec-color:#8b7cff"
        >

          <span class="color"></span>

          <span class="name">
            ${esc(item.name)}
          </span>

          <span class="count">
            ${item.count}
          </span>

        </button>

      `
    ).join('');


  $$(
    '[data-organization-type]',
    host
  ).forEach(
    (button) => {

      button.addEventListener(
        'click',
        () => {

          const value =
            button.dataset
              .organizationType;


          state.selectedOrganizationType =
            state.selectedOrganizationType ===
            value
              ? null
              : value;


          renderOrganizationFilters();

          applyMarkerFilters();
        }
      );
    }
  );
}


/* =========================================================
   MAP
========================================================= */

function initMap() {

  const reduced =
    document.documentElement
      .classList
      .contains(
        'reduce-motion'
      );


  state.map =
    new maplibregl.Map({

      container:
        'map',

      style:
        'https://tiles.openfreemap.org/styles/liberty',

      center:
        [
          71.045,
          40.54
        ],

      zoom:
        10.2,

      pitch:
        reduced
          ? 0
          : 10,

      bearing:
        0,

      attributionControl:
        true,

      cooperativeGestures:
        false
    });


  state.map.addControl(

    new maplibregl
      .NavigationControl({
        showCompass: true,
        visualizePitch: true
      }),

    'top-right'
  );


  state.map.on(
    'load',
    () => {

      renderMarkers();

      fitDistrict(
        false
      );
    }
  );


  state.map.on(
    'move',
    scheduleConnectorUpdate
  );


  state.map.on(
    'zoom',
    scheduleConnectorUpdate
  );


  state.map.on(
    'resize',
    scheduleConnectorUpdate
  );


  state.map.on(
    'click',
    (event) => {

      if (
        event.originalEvent
          ?.target
          ?.closest?.(
            '.mfy-marker,.place-marker'
          )
      ) {
        return;
      }

      if (state.selected) {

        closeDetail();
      }
    }
  );
}


/* =========================================================
   CATEGORIES
========================================================= */

function getCategory(
  categoryId
) {

  return state.data.categories
    .find(
      (category) =>
        category.id ===
          categoryId ||
        category.slug ===
          categoryId
    );
}


function getCategoryColor(
  categoryId
) {

  return (
    getCategory(
      categoryId
    )?.color ||
    '#62e6ff'
  );
}


function getCategoryIcon(
  categoryId
) {

  const category =
    getCategory(
      categoryId
    );


  if (
    category?.icon &&
    ICONS[
      category.icon
    ]
  ) {

    return category.icon;
  }


  return (
    iconForCategory[
      categoryId
    ] ||
    'marker'
  );
}


function categoryLabel(
  category
) {

  if (!category) {
    return '';
  }


  const labels = {
    mahalla: 'mahallas',
    business: 'businesses',
    education: 'education',
    health: 'health',
    culture: 'culture',
    service: 'services',
    investment: 'investment'
  };


  if (
    labels[
      category.id
    ]
  ) {

    const translated =
      tr(
        labels[
          category.id
        ]
      );

    if (
      translated !==
      labels[
        category.id
      ]
    ) {

      return translated;
    }
  }


  return (
    category.name ||
    category.slug ||
    category.id
  );
}


function renderCategories() {

  const host =
    $('#categoryChips');


  if (!host) {
    return;
  }


  host.innerHTML =
    state.data.categories
      .filter(
        (category) =>
          category.active !==
          false
      )
      .map(
        (category) => `

          <button
            class="category-chip ${
              state.activeCategories
                .has(
                  category.id
                )
                ? 'active'
                : ''
            }"
            type="button"
            data-category="${esc(category.id)}"
            style="--chip:${category.color}"
          >

            <span
              class="dot"
              style="
                color:${category.color};
                background:${category.color};
              "
            ></span>

            <span>
              ${esc(
                categoryLabel(
                  category
                )
              )}
            </span>

          </button>

        `
      ).join('');


  $$('.category-chip', host)
    .forEach((button) => {

      button.addEventListener(
        'click',
        () => {

          toggleCategory(
            button.dataset
              .category
          );
        }
      );
    });


  renderSpecializationFilters();

  renderOrganizationFilters();
}


function toggleCategory(
  id,
  force
) {

  const active =
    force === undefined
      ? !state.activeCategories
          .has(id)
      : force;


  if (active) {

    state.activeCategories
      .add(id);

  } else {

    state.activeCategories
      .delete(id);


    if (
      id === 'mahalla'
    ) {

      state.selectedSpecialization =
        null;
    }


    if (
      id === 'business'
    ) {

      state.selectedOrganizationType =
        null;
    }
  }


  renderCategories();

  renderMarkers();
}


/* =========================================================
   MARKERS
========================================================= */

function clearMarkers() {

  state.markers
    .forEach(
      ({ marker }) =>
        marker.remove()
    );


  state.markers = [];
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
    kind === 'mahalla'
      ? 'mfy-marker'
      : 'place-marker';


  element.setAttribute(
    'aria-label',
    item.name ||
    ''
  );


  if (
    kind === 'mahalla'
  ) {

    element.innerHTML = `

      <span
        class="mfy-dot"
        style="--marker:${color}"
      ></span>

    `;

  } else {

    element.innerHTML = `

      <span
        class="place-pin"
        style="--marker:${color}"
      >

        <span class="icon">
          ${svg(
            getCategoryIcon(
              item.category
            )
          )}
        </span>

      </span>

    `;
  }


  element.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

      openDetail(
        item,
        kind
      );
    }
  );


  return element;
}


function addMarker(
  item,
  kind,
  color
) {

  if (
    !validCoordinates(
      item
    )
  ) {
    return;
  }


  const element =
    markerElement(
      item,
      kind,
      color
    );


  const marker =
    new maplibregl.Marker({
      element,
      anchor: 'center'
    })
      .setLngLat([
        Number(item.lng),
        Number(item.lat)
      ])
      .addTo(
        state.map
      );


  state.markers.push({
    item,
    kind,
    marker,
    el:
      element
  });
}


function renderMarkers() {

  if (!state.map) {
    return;
  }


  clearMarkers();


  if (
    state.activeCategories
      .has('mahalla')
  ) {

    state.data.mahallas
      .forEach(
        (mahalla) => {

          addMarker(
            mahalla,
            'mahalla',
            getSpecializationColor(
              mahalla.specialization
            )
          );
        }
      );
  }


  state.data.places
    .forEach((place) => {

      if (
        state.activeCategories
          .has(
            place.category
          )
      ) {

        addMarker(
          place,
          'place',
          getCategoryColor(
            place.category
          )
        );
      }
    });


  state.data.businesses
    .forEach(
      (business) => {

        const visible =
          state.activeCategories
            .has('business') ||
          state.activeCategories
            .has(
              business.category
            );


        if (!visible) {
          return;
        }


        addMarker(
          business,
          'business',
          business.categoryColor ||
          getCategoryColor(
            business.category
          )
        );
      }
    );


  applyMarkerFilters();
}


function applyMarkerFilters() {

  state.markers
    .forEach(
      (marker) => {

        let dim = false;


        if (
          marker.kind ===
            'mahalla' &&
          state.selectedSpecialization
        ) {

          dim =
            marker.item
              .specialization !==
            state.selectedSpecialization;
        }


        if (
          marker.kind ===
            'business' &&
          state.selectedOrganizationType
        ) {

          dim =
            marker.item
              .organizationType !==
            state.selectedOrganizationType;
        }


        marker.el
          .classList
          .toggle(
            'is-dim',
            dim
          );
      }
    );
}


/* =========================================================
   MAP CAMERA
========================================================= */

function fitDistrict(
  animate = true
) {

  if (
    !state.map ||
    !state.data.mahallas.length
  ) {
    return;
  }


  const bounds =
    new maplibregl
      .LngLatBounds();


  state.data.mahallas
    .forEach(
      (mahalla) => {

        if (
          validCoordinates(
            mahalla
          )
        ) {

          bounds.extend([
            mahalla.lng,
            mahalla.lat
          ]);
        }
      }
    );


  const filterClosed =
    document.body
      .classList
      .contains(
        'filter-closed'
      );


  state.map.fitBounds(
    bounds,
    {
      padding: {
        top: 100,
        bottom: 92,

        left:
          window.innerWidth >
            760 &&
          !filterClosed
            ? 350
            : 70,

        right: 70
      },

      duration:
        animate &&
        !document.documentElement
          .classList
          .contains(
            'reduce-motion'
          )
          ? 900
          : 0,

      maxZoom:
        11.4
    }
  );
}


function flyToItem(item) {

  if (
    !state.map ||
    !validCoordinates(
      item
    )
  ) {
    return;
  }


  const desktop =
    window.innerWidth >
    760;


  state.map.easeTo({

    center:
      desktop
        ? [
            Number(item.lng) -
              0.012,
            Number(item.lat)
          ]
        : [
            Number(item.lng),
            Number(item.lat)
          ],

    zoom:
      13.15,

    pitch:
      15,

    bearing:
      0,

    duration:
      document.documentElement
        .classList
        .contains(
          'reduce-motion'
        )
        ? 0
        : 850
  });
}


/* =========================================================
   DISTRICT METRICS
========================================================= */

function renderDistrictMetrics() {

  const district =
    state.data.district;


  const host =
    $('#districtMetrics');


  if (host) {

    const values = [
      [
        district.population,
        'Umumiy aholi'
      ],
      [
        district.households,
        'Umumiy xonadon'
      ],
      [
        district.families,
        'Umumiy oila'
      ],
      [
        district.mahallas,
        'MFY soni'
      ]
    ];


    host.innerHTML =
      values.map(
        ([value, label]) => `

          <div class="metric-card">

            <strong>
              ${fmt(value)}
            </strong>

            <span>
              ${esc(label)}
            </span>

            <small>
              ${esc(
                tr(
                  'sourceOfficial'
                )
              )}
            </small>

          </div>

        `
      ).join('');
  }


  if (
    $('#districtUpdated')
  ) {

    $('#districtUpdated')
      .textContent =
      district.updatedAt ||
      '—';
  }


  renderPassportAnalytics();

  renderInvestorMetrics();
}


function renderInvestorMetrics() {

  const host =
    $('#investorMetrics');


  if (!host) {
    return;
  }


  const district =
    state.data.district;


  const values = [
    [
      district.population,
      'Aholi'
    ],
    [
      district.areaKm2,
      'km²'
    ],
    [
      district.mahallas,
      'MFY'
    ],
    [
      state.data.businesses.length,
      'Tashkilot'
    ]
  ];


  host.innerHTML =
    values.map(
      ([value, label]) => `

        <div class="metric-card">

          <strong>
            ${fmt(value)}
          </strong>

          <span>
            ${esc(label)}
          </span>

          <small>
            Tasdiqlangan ma’lumot
          </small>

        </div>

      `
    ).join('');
}


/* =========================================================
   PASSPORT ANALYTICS
========================================================= */

function renderPassportAnalytics() {

  const district =
    state.data.district;


  setText(
    '#passportIndustry',
    district.industryVolume ||
      '—'
  );


  setText(
    '#passportAgriculture',
    district.agricultureVolume ||
      '—'
  );


  setText(
    '#passportServices',
    district.servicesVolume ||
      '—'
  );


  setText(
    '#passportUnemployment',
    district.unemploymentRate
      ? `${district.unemploymentRate} %`
      : '—'
  );


  setText(
    '#passportPoverty',
    district.povertyRate
      ? `${district.povertyRate} %`
      : '—'
  );


  setText(
    '#passportHealthcare',
    district.healthcareCount
      ? `${fmt(
          district.healthcareCount
        )} ta muassasa`
      : '—'
  );


  setText(
    '#passportFounded',
    district.founded ||
      '—'
  );


  setText(
    '#passportArea',
    district.areaKm2
      ? `${fmt(
          district.areaKm2
        )} km²`
      : '—'
  );


  setText(
    '#passportBorder',
    district.borderLengthKm
      ? `${district.borderLengthKm} km`
      : '—'
  );


  renderDistrictSpecializationStats();

  renderDistrictTopMahallas();
}


function setText(
  selector,
  value
) {

  const element =
    $(selector);


  if (element) {

    element.textContent =
      value;
  }
}


function renderDistrictSpecializationStats() {

  const host =
    $('#districtSpecializationStats');


  if (!host) {
    return;
  }


  const stats =
    getSpecializationStats();


  const maximum =
    Math.max(
      1,
      ...stats.map(
        (item) =>
          item.count
      )
    );


  host.innerHTML =
    stats.map(
      (item) => `

        <div
          class="passport-bar-row"
        >

          <span
            class="label"
            title="${esc(item.name)}"
          >
            ${esc(item.name)}
          </span>

          <span
            class="passport-bar"
          >

            <i
              style="
                width:${
                  (
                    item.count /
                    maximum
                  ) * 100
                }%;
                --bar-color:${item.color};
              "
            ></i>

          </span>

          <b>
            ${item.count}
          </b>

        </div>

      `
    ).join('');
}


function renderDistrictTopMahallas() {

  const host =
    $('#districtTopMahallas');


  if (!host) {
    return;
  }


  const top =
    [
      ...state.data.mahallas
    ]
      .sort(
        (a, b) =>
          b.population -
          a.population
      )
      .slice(
        0,
        5
      );


  host.innerHTML =
    top.map(
      (
        mahalla,
        index
      ) => `

        <button
          type="button"
          class="search-result"
          data-top-mahalla="${mahalla.id}"
        >

          <span
            class="result-icon"
          >
            ${index + 1}
          </span>

          <span
            class="result-copy"
          >

            <strong>
              ${esc(
                mahalla.name
              )}
            </strong>

            <small>
              ${esc(
                mahalla.specialization
              )}
            </small>

          </span>

          <span
            class="result-type"
          >
            ${fmt(
              mahalla.population
            )}
          </span>

        </button>

      `
    ).join('');


  $$(
    '[data-top-mahalla]',
    host
  ).forEach(
    (button) => {

      button.addEventListener(
        'click',
        () => {

          const item =
            state.data.mahallas
              .find(
                (mahalla) =>
                  String(
                    mahalla.id
                  ) ===
                  button.dataset
                    .topMahalla
              );


          closePassportMode(
            false
          );


          setTimeout(
            () => {

              openDetail(
                item,
                'mahalla'
              );

            },
            550
          );
        }
      );
    }
  );
}


/* =========================================================
   PASSPORT MODE
========================================================= */

function openPassportMode() {

  closeDetail(
    false
  );

  closeMajorPanels();


  if (
    !document.body
      .classList
      .contains(
        'passport-mode'
      )
  ) {

    state.passportCamera =
      getCamera();
  }


  document.body
    .classList
    .add(
      'passport-mode'
    );


  $('#districtPanel')
    ?.classList
    .remove(
      'hidden'
    );


  state.activePanel =
    'district';


  setTimeout(
    () => {

      state.map
        ?.resize();

      fitDistrict(
        true
      );

    },
    480
  );
}


function closePassportMode(
  restore = true
) {

  if (
    !document.body
      .classList
      .contains(
        'passport-mode'
      )
  ) {
    return;
  }


  document.body
    .classList
    .remove(
      'passport-mode'
    );


  $('#districtPanel')
    ?.classList
    .add(
      'hidden'
    );


  state.activePanel =
    'explore';


  setTimeout(
    () => {

      state.map
        ?.resize();


      if (
        restore &&
        state.passportCamera
      ) {

        restoreCamera(
          state.passportCamera,
          850
        );

      } else {

        fitDistrict(
          true
        );
      }


      state.passportCamera =
        null;

    },
    430
  );
}


/* =========================================================
   DETAIL CARD
========================================================= */

function openDetail(
  item,
  kind
) {

  if (!item) {
    return;
  }


  if (
    document.body
      .classList
      .contains(
        'passport-mode'
      )
  ) {

    closePassportMode(
      false
    );
  }


  closeMajorPanels();


  if (
    !state.selected
  ) {

    state.detailCamera =
      getCamera();
  }


  state.selected = {
    item,
    kind
  };


  document.body
    .classList
    .add(
      'detail-focus'
    );


  let kicker;


  if (
    kind ===
    'mahalla'
  ) {

    kicker =
      'Mahalla fuqarolar yig‘ini';

  } else if (
    kind ===
    'business'
  ) {

    kicker =
      item.categoryName ||
      'Tashkilot';

  } else if (
    kind ===
    'product'
  ) {

    kicker =
      'Mahsulot';

  } else {

    kicker =
      categoryLabel(
        getCategory(
          item.category
        )
      );
  }


  setText(
    '#detailKicker',
    kicker
  );


  setText(
    '#detailTitle',
    item.name ||
      item.officialName ||
      '—'
  );


  if (
    $('#detailDescription')
  ) {

    $('#detailDescription')
      .textContent =
      kind === 'mahalla'
        ? (
            item.specialization
              ? `Ixtisoslashuv: ${item.specialization}`
              : 'Ma’lumot mavjud emas'
          )
        : (
            item.description ||
            item.address ||
            'Ma’lumot mavjud emas'
          );
  }


  const verification =
    $('#detailVerification');


  if (verification) {

    verification.innerHTML = `

      <span
        class="badge ${
          item.verified
            ? 'verified'
            : 'demo'
        }"
      >

        <span class="icon">
          ${svg(
            item.verified
              ? 'shield'
              : 'info'
          )}
        </span>

        ${
          item.verified
            ? 'Tasdiqlangan'
            : 'Tasdiqlanmagan'
        }

      </span>

      ${
        item.updatedAt
          ? `
            <span class="badge">
              ${esc(item.updatedAt)}
            </span>
          `
          : ''
      }

    `;
  }


  const stats = [];


  if (
    kind ===
    'mahalla'
  ) {

    stats.push(
      [
        item.population,
        'Aholi'
      ],
      [
        item.households,
        'Xonadon'
      ],
      [
        item.families,
        'Oila'
      ]
    );
  }


  if (
    kind ===
    'business'
  ) {

    if (
      item.organizationType
    ) {

      stats.push([
        item.organizationType,
        'Tashkilot turi'
      ]);
    }


    if (
      item.sector
    ) {

      stats.push([
        item.sector,
        'Sektor'
      ]);
    }
  }


  const detailStats =
    $('#detailStats');


  if (detailStats) {

    detailStats.innerHTML =
      stats.map(
        ([value, label]) => `

          <div class="detail-stat">

            <strong>
              ${
                typeof value ===
                  'number'
                  ? fmt(value)
                  : esc(value)
              }
            </strong>

            <span>
              ${esc(label)}
            </span>

          </div>

        `
      ).join('');
  }


  renderDetailExtra(
    item,
    kind
  );


  let icon =
    'marker';


  if (
    kind ===
    'mahalla'
  ) {

    icon = 'home';

  } else if (
    kind ===
    'business'
  ) {

    icon =
      getCategoryIcon(
        item.category
      );

  } else if (
    kind ===
    'product'
  ) {

    icon =
      'package';
  }


  if (
    $('#detailSymbol')
  ) {

    $('#detailSymbol')
      .innerHTML = `

        <span class="icon">
          ${svg(icon)}
        </span>

      `;
  }


  $('#detailCard')
    ?.classList
    .remove(
      'hidden'
    );


  state.markers
    .forEach(
      (marker) => {

        marker.el
          .classList
          .toggle(
            'is-active',
            String(
              marker.item.id
            ) ===
            String(
              item.id
            )
          );
      }
    );


  flyToItem(
    item
  );


  setTimeout(
    () => {

      showConnector();

    },
    480
  );
}


function renderDetailExtra(
  item,
  kind
) {

  const host =
    $('#detailExtra');


  if (!host) {
    return;
  }


  const rows = [];


  if (
    kind ===
    'mahalla'
  ) {

    if (
      item.schools
    ) {

      rows.push([
        'Maktablar',
        item.schools
      ]);
    }


    if (
      item.kindergartens
    ) {

      rows.push([
        'Bog‘chalar',
        item.kindergartens
      ]);
    }


    if (
      item.clinics
    ) {

      rows.push([
        'Tibbiyot',
        item.clinics
      ]);
    }


    if (
      item.mosques
    ) {

      rows.push([
        'Masjidlar',
        item.mosques
      ]);
    }


    if (
      item.shops
    ) {

      rows.push([
        'Savdo nuqtalari',
        item.shops
      ]);
    }


    if (
      item.head
    ) {

      rows.push([
        'MFY raisi',
        item.head
      ]);
    }
  }


  if (
    kind ===
    'business'
  ) {

    if (
      item.address
    ) {

      rows.push([
        'Manzil',
        item.address
      ]);
    }


    if (
      item.website
    ) {

      rows.push([
        'Veb-sayt',
        item.website
      ]);
    }
  }


  if (
    !rows.length
  ) {

    host.innerHTML =
      '';

    return;
  }


  host.innerHTML = `

    <div
      style="
        display:grid;
        gap:7px;
        margin-top:14px;
      "
    >

      ${rows.map(
        ([label, value]) => `

          <div
            class="passport-row"
          >

            <span>
              ${esc(label)}
            </span>

            <strong>
              ${
                typeof value ===
                'number'
                ? fmt(value)
                : esc(value)
              }
            </strong>

          </div>

        `
      ).join('')}

    </div>

  `;
}


function closeDetail(
  restore = true
) {

  const hadSelection =
    !!state.selected;


  $('#detailCard')
    ?.classList
    .add(
      'hidden'
    );


  document.body
    .classList
    .remove(
      'detail-focus'
    );


  hideConnector();


  state.markers
    .forEach(
      (marker) => {

        marker.el
          .classList
          .remove(
            'is-active'
          );
      }
    );


  state.selected =
    null;


  if (
    restore &&
    hadSelection &&
    state.detailCamera
  ) {

    restoreCamera(
      state.detailCamera,
      760
    );
  }


  state.detailCamera =
    null;
}


/* =========================================================
   CONNECTOR
========================================================= */

function showConnector() {

  if (
    !state.selected ||
    window.innerWidth <=
      760
  ) {

    hideConnector();

    return;
  }


  const connector =
    $('#uxConnector');


  if (!connector) {
    return;
  }


  connector.classList
    .remove(
      'hidden'
    );


  updateConnector();
}


function hideConnector() {

  const connector =
    $('#uxConnector');


  if (connector) {

    connector.classList
      .add(
        'hidden'
      );
  }


  if (
    state.connectorFrame
  ) {

    cancelAnimationFrame(
      state.connectorFrame
    );

    state.connectorFrame =
      null;
  }
}


function scheduleConnectorUpdate() {

  if (
    !state.selected
  ) {
    return;
  }


  if (
    state.connectorFrame
  ) {
    return;
  }


  state.connectorFrame =
    requestAnimationFrame(
      () => {

        state.connectorFrame =
          null;

        updateConnector();
      }
    );
}


function updateConnector() {

  if (
    !state.selected ||
    !state.map ||
    window.innerWidth <=
      760
  ) {
    return;
  }


  const marker =
    state.markers.find(
      (entry) =>
        String(
          entry.item.id
        ) ===
        String(
          state.selected.item.id
        )
    );


  const card =
    $('#detailCard');


  const svgElement =
    $('#uxConnector');


  if (
    !marker ||
    !card ||
    !svgElement ||
    card.classList
      .contains(
        'hidden'
      )
  ) {
    return;
  }


  const markerRect =
    marker.el
      .getBoundingClientRect();


  const cardRect =
    card
      .getBoundingClientRect();


  const width =
    window.innerWidth;

  const height =
    window.innerHeight;


  svgElement.setAttribute(
    'viewBox',
    `0 0 ${width} ${height}`
  );


  const x1 =
    markerRect.left +
    markerRect.width /
      2;

  const y1 =
    markerRect.top +
    markerRect.height /
      2;


  const x2 =
    cardRect.left;

  const y2 =
    cardRect.top +
    Math.min(
      cardRect.height *
        .42,
      190
    );


  const distance =
    Math.max(
      90,
      Math.abs(
        x2 -
        x1
      ) * .43
    );


  const c1x =
    x1 +
    distance;

  const c1y =
    y1;


  const c2x =
    x2 -
    distance *
      .65;

  const c2y =
    y2;


  const path =
    `M ${x1} ${y1}
     C ${c1x} ${c1y},
       ${c2x} ${c2y},
       ${x2} ${y2}`;


  $$(
    'path',
    svgElement
  ).forEach(
    (element) => {

      element.setAttribute(
        'd',
        path
      );
    }
  );
}


/* =========================================================
   FILTER PANEL
========================================================= */

function openFilterPanel() {

  closeMajorPanels();


  document.body
    .classList
    .remove(
      'filter-closed'
    );


  $('#explorePanel')
    ?.classList
    .remove(
      'hidden'
    );


  state.activePanel =
    'explore';


  setDockActive(
    'explore'
  );


  setTimeout(
    () => {

      state.map
        ?.resize();

    },
    250
  );
}


function closeFilterPanel() {

  document.body
    .classList
    .add(
      'filter-closed'
    );


  state.activePanel =
    'map';


  setDockActive(
    'map'
  );


  setTimeout(
    () => {

      state.map
        ?.resize();

    },
    250
  );
}


/* =========================================================
   PANEL MANAGER
========================================================= */

function closeMajorPanels(
  except = null
) {

  const panels = [
    'investorPanel',
    'productsPanel'
  ];


  panels.forEach(
    (id) => {

      if (
        id !== except
      ) {

        $('#' + id)
          ?.classList
          .add(
            'hidden'
          );
      }
    }
  );


  $('#searchDialog')
    ?.classList
    .add(
      'hidden'
    );


  $('#aiPanel')
    ?.classList
    .add(
      'hidden'
    );
}


function setDockActive(name) {

  $$('.dock-item')
    .forEach(
      (item) => {

        item.classList
          .toggle(
            'active',
            item.dataset.nav ===
              name
          );
      }
    );
}


function openPanel(name) {

  if (
    name ===
    'explore'
  ) {

    openFilterPanel();

    return;
  }


  closeDetail();


  if (
    document.body
      .classList
      .contains(
        'passport-mode'
      )
  ) {

    closePassportMode();
  }


  closeMajorPanels();


  document.body
    .classList
    .add(
      'filter-closed'
    );


  if (
    name ===
    'invest'
  ) {

    $('#investorPanel')
      ?.classList
      .remove(
        'hidden'
      );

  } else if (
    name ===
    'products'
  ) {

    $('#productsPanel')
      ?.classList
      .remove(
        'hidden'
      );
  }


  state.activePanel =
    name;


  setDockActive(
    name
  );
}


/* =========================================================
   SEARCH
========================================================= */

function allSearchItems() {

  return [

    ...state.data.mahallas
      .map(
        (item) => ({
          ...item,
          _kind:
            'mahalla',
          _type:
            'MFY'
        })
      ),

    ...state.data.businesses
      .map(
        (item) => ({
          ...item,
          _kind:
            'business',
          _type:
            item.categoryName ||
            'Tashkilot'
        })
      ),

    ...state.data.places
      .map(
        (item) => ({
          ...item,
          _kind:
            'place',
          _type:
            categoryLabel(
              getCategory(
                item.category
              )
            )
        })
      ),

    ...state.data.products
      .map(
        (item) => ({
          ...item,
          _kind:
            'product',
          _type:
            'Mahsulot'
        })
      )
  ];
}


function searchLocal(query) {

  const value =
    normalize(
      query
    ).trim();


  const all =
    allSearchItems();


  if (!value) {

    return all.slice(
      0,
      12
    );
  }


  const terms =
    value.split(
      /\s+/
    );


  return all
    .map((item) => {

      const haystack =
        normalize(
          [
            item.name,
            item.officialName,
            item.specialization,
            item.description,
            item.industry,
            item.sector,
            item.address,
            item.categoryName,
            item.organizationType,
            item._type
          ]
            .filter(Boolean)
            .join(' ')
        );


      let score = 0;


      terms.forEach(
        (term) => {

          if (
            haystack.includes(
              term
            )
          ) {

            score += 2;
          }
        }
      );


      if (
        haystack.startsWith(
          value
        )
      ) {

        score += 4;
      }


      return {
        item,
        score
      };
    })
    .filter(
      ({ score }) =>
        score > 0
    )
    .sort(
      (a, b) =>
        b.score -
        a.score
    )
    .slice(
      0,
      30
    )
    .map(
      ({ item }) =>
        item
    );
}


function renderSearchResults(
  query = ''
) {

  const host =
    $('#searchResults');


  if (!host) {
    return;
  }


  const rows =
    searchLocal(
      query
    );


  if (!rows.length) {

    host.innerHTML = `

      <div
        class="search-empty"
      >
        Natija topilmadi
      </div>

    `;

    return;
  }


  host.innerHTML =
    rows.map(
      (item) => `

        <button
          type="button"
          class="search-result"
          data-search-id="${esc(item.id)}"
          data-search-kind="${esc(item._kind)}"
        >

          <span
            class="result-icon"
          >
            <span class="icon">
              ${svg(
                item._kind ===
                  'mahalla'
                  ? 'home'
                  : item._kind ===
                    'business'
                    ? 'briefcase'
                    : 'marker'
              )}
            </span>
          </span>

          <span
            class="result-copy"
          >

            <strong>
              ${esc(item.name)}
            </strong>

            <small>
              ${esc(
                item.specialization ||
                item.organizationType ||
                item.address ||
                item.description ||
                ''
              )}
            </small>

          </span>

          <span
            class="result-type"
          >
            ${esc(item._type)}
          </span>

        </button>

      `
    ).join('');


  $$(
    '[data-search-id]',
    host
  ).forEach(
    (button) => {

      button.addEventListener(
        'click',
        () => {

          const item =
            allSearchItems()
              .find(
                (entry) =>
                  String(
                    entry.id
                  ) ===
                    button.dataset
                      .searchId &&
                  entry._kind ===
                    button.dataset
                      .searchKind
              );


          $('#searchDialog')
            ?.classList
            .add(
              'hidden'
            );


          openDetail(
            item,
            item._kind
          );
        }
      );
    }
  );
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {

  const host =
    $('#productGrid');


  if (!host) {
    return;
  }


  if (
    !state.data.products.length
  ) {

    host.innerHTML = `

      <div class="search-empty">
        Hozircha mahsulotlar kiritilmagan.
      </div>

    `;

    return;
  }


  host.innerHTML =
    state.data.products
      .map(
        (product) => `

          <button
            class="product-card"
            type="button"
            data-product="${esc(product.id)}"
          >

            <div
              class="product-visual"
            >

              <span class="icon">
                ${svg('package')}
              </span>

            </div>

            <div
              class="product-info"
            >

              <small>
                ${esc(
                  product.category ||
                  ''
                )}
              </small>

              <strong>
                ${esc(
                  product.name
                )}
              </strong>

              <p>
                ${esc(
                  product.description ||
                  ''
                )}
              </p>

            </div>

          </button>

        `
      ).join('');
}


/* =========================================================
   LANGUAGES
========================================================= */

function renderLanguages() {

  const host =
    $('#languageGrid');


  if (!host) {
    return;
  }


  host.innerHTML =
    LANGUAGES.map(
      (language) => `

        <button
          type="button"
          class="language-option ${
            language.code ===
            state.lang
              ? 'active'
              : ''
          }"
          data-lang="${language.code}"
        >

          <span
            class="language-code"
          >
            ${esc(language.short)}
          </span>

          <span>

            <strong>
              ${esc(language.native)}
            </strong>

            <small>
              ${esc(language.name)}
            </small>

          </span>

        </button>

      `
    ).join('');


  $$('.language-option', host)
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            setLanguage(
              button.dataset.lang
            );
          }
        );
      }
    );
}


/* =========================================================
   AI
========================================================= */

function renderAISuggestions() {

  const host =
    $('#aiSuggestions');


  if (!host) {
    return;
  }


  const suggestions = {

    uz: [
      'Eng ko‘p aholili MFY qaysi?',
      'Tumanda nechta MFY bor?',
      'Dehqonchilikka ixtisoslashgan MFYlarni ko‘rsat',
      'Investor uchun umumiy ma’lumot'
    ],

    en: [
      'Which mahalla has the largest population?',
      'How many mahallas are there?',
      'Show agricultural mahallas',
      'Give me an investor overview'
    ]

  }[state.lang] || [

    'Which mahalla has the largest population?',
    'How many mahallas are there?',
    'Show businesses',
    'Give me an investor overview'
  ];


  host.innerHTML =
    suggestions.map(
      (text) => `

        <button
          type="button"
          class="ai-suggestion"
        >
          ${esc(text)}
        </button>

      `
    ).join('');


  $$('.ai-suggestion', host)
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            askAI(
              button.textContent
            );
          }
        );
      }
    );
}


function ensureAIWelcome() {

  const host =
    $('#aiMessages');


  if (
    !host ||
    host.children.length
  ) {
    return;
  }


  addMessage(
    'assistant',
    'Uchko‘prik tumani bo‘yicha tasdiqlangan ma’lumotlardan foydalanib yordam beraman.'
  );
}


function addMessage(
  role,
  text,
  sources = []
) {

  const host =
    $('#aiMessages');


  if (!host) {
    return;
  }


  const message =
    document.createElement(
      'div'
    );


  message.className =
    `message ${role}`;


  message.textContent =
    text;


  if (
    sources.length
  ) {

    const sourceRow =
      document.createElement(
        'div'
      );


    sourceRow.className =
      'source-row';


    sources.forEach(
      (source) => {

        const badge =
          document.createElement(
            'span'
          );


        badge.className =
          'badge verified';


        badge.textContent =
          source;


        sourceRow.appendChild(
          badge
        );
      }
    );


    message.appendChild(
      sourceRow
    );
  }


  host.appendChild(
    message
  );


  host.scrollTop =
    host.scrollHeight;
}


function localAI(question) {

  const q =
    normalize(
      question
    );


  const district =
    state.data.district;


  const mahallas =
    state.data.mahallas;


  if (
    /nechta.*(mfy|mahalla)|how many.*mahalla/.test(
      q
    )
  ) {

    return {
      text:
        `Uchko‘prik tumanida ${fmt(
          district.mahallas
        )} ta MFY mavjud.`,
      sources: [
        'Tasdiqlangan tuman ma’lumoti'
      ]
    };
  }


  if (
    /eng.*kop.*aholi|largest.*population|most populous/.test(
      q
    )
  ) {

    const top =
      [
        ...mahallas
      ].sort(
        (a, b) =>
          b.population -
          a.population
      )[0];


    return {
      text:
        `${top.name} eng ko‘p aholili MFYlardan biri: ${fmt(
          top.population
        )} nafar.`,
      sources: [
        'Tasdiqlangan MFY ma’lumoti'
      ],
      focus: top
    };
  }


  const specialization =
    getSpecializationStats()
      .find(
        (entry) =>
          q.includes(
            normalize(
              entry.name
            )
          )
      );


  if (
    specialization
  ) {

    return {
      text:
        `${specialization.name} bo‘yicha ${specialization.count} ta MFY topildi.`,
      action:
        'specialization',
      specialization:
        specialization.name,
      sources: [
        'Tasdiqlangan MFY ma’lumoti'
      ]
    };
  }


  if (
    /invest/.test(q)
  ) {

    return {
      text:
        `Uchko‘prik tumani aholisi ${fmt(
          district.population
        )} nafar, maydoni ${fmt(
          district.areaKm2
        )} km². Investor rejimida iqtisodiy va hududiy ko‘rsatkichlarni ko‘rishingiz mumkin.`,
      action:
        'invest'
    };
  }


  const hit =
    searchLocal(
      question
    )[0];


  if (hit) {

    return {
      text:
        `${hit.name} topildi.`,
      focus:
        hit
    };
  }


  return {
    text:
      'Bu ma’lumot hozircha tasdiqlangan bazada mavjud emas.'
  };
}


async function askAI(question) {

  question =
    String(
      question ||
      ''
    ).trim();


  if (!question) {
    return;
  }


  openAI();


  addMessage(
    'user',
    question
  );


  if (
    $('#aiInput')
  ) {

    $('#aiInput').value =
      '';
  }


  addMessage(
    'system',
    'Tahlil qilinmoqda…'
  );


  let answer =
    null;


  try {

    const response =
      await fetch(
        '/api/ai',
        {
          method:
            'POST',

          headers: {
            'content-type':
              'application/json'
          },

          body:
            JSON.stringify({
              message:
                question,
              lang:
                state.lang
            })
        }
      );


    if (
      response.ok
    ) {

      const json =
        await response.json();


      if (
        json?.ok
      ) {

        answer =
          json;
      }
    }

  } catch {
    // Local fallback
  }


  $('#aiMessages .message.system:last-child')
    ?.remove();


  if (!answer) {

    answer =
      localAI(
        question
      );
  }


  addMessage(
    'assistant',
    answer.text ||
      '—',
    answer.sources ||
      []
  );


  if (
    answer.action ===
    'specialization'
  ) {

    state.activeCategories
      .add(
        'mahalla'
      );


    state.selectedSpecialization =
      answer.specialization;


    renderCategories();

    renderMarkers();

    openFilterPanel();
  }


  if (
    answer.action ===
    'invest'
  ) {

    openInvestorMode();
  }


  if (
    answer.focus
  ) {

    setTimeout(
      () => {

        openDetail(
          answer.focus,
          answer.focus._kind ||
          answer.focus.type ||
          'mahalla'
        );

      },
      250
    );
  }
}


function openAI() {

  closeMajorPanels(
    'aiPanel'
  );


  $('#aiPanel')
    ?.classList
    .remove(
      'hidden'
    );


  ensureAIWelcome();


  setDockActive(
    'ai'
  );
}


/* =========================================================
   VOICE
========================================================= */

function setupVoice() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (
    !SpeechRecognition
  ) {
    return;
  }


  const recognition =
    new SpeechRecognition();


  recognition.interimResults =
    false;

  recognition.continuous =
    false;


  recognition.onstart =
    () => {

      $('#voiceBtn')
        ?.classList
        .add(
          'listening'
        );
    };


  recognition.onend =
    () => {

      $('#voiceBtn')
        ?.classList
        .remove(
          'listening'
        );
    };


  recognition.onresult =
    (event) => {

      const text =
        event.results[0][0]
          .transcript;


      if (
        $('#aiInput')
      ) {

        $('#aiInput').value =
          text;
      }


      askAI(
        text
      );
    };


  state.voiceRecognition =
    recognition;
}


function startVoice() {

  if (
    !state.voiceRecognition
  ) {

    toast(
      'Ovozli qidiruv',
      'Brauzer qo‘llab-quvvatlamaydi'
    );

    return;
  }


  state.voiceRecognition.lang =
    localeCode();


  state.voiceRecognition.start();
}


/* =========================================================
   INVESTOR MODE
========================================================= */

function openInvestorMode() {

  openPanel(
    'invest'
  );


  state.activeCategories
    .add(
      'business'
    );


  renderCategories();

  renderMarkers();


  if (
    state.map
  ) {

    state.map.easeTo({
      pitch: 38,
      bearing: -6,
      duration: 850
    });
  }
}


function closeInvestorMode() {

  $('#investorPanel')
    ?.classList
    .add(
      'hidden'
    );


  openFilterPanel();


  if (
    state.map
  ) {

    state.map.easeTo({
      pitch: 10,
      bearing: 0,
      duration: 650
    });
  }
}


/* =========================================================
   SHEETS
========================================================= */

function openSheet(id) {

  $('#' + id)
    ?.classList
    .remove(
      'hidden'
    );
}


function closeSheet(id) {

  $('#' + id)
    ?.classList
    .add(
      'hidden'
    );
}


/* =========================================================
   PRESENTATION
========================================================= */

const scenes = () => [

  {
    eyebrow:
      'DIGITAL DISTRICT',
    title:
      'Uchko‘prik tumani',
    text:
      'Raqamli hudud, xarita va tasdiqlangan ma’lumotlar.',
    center:
      [71.045, 40.54],
    zoom:
      9.7,
    pitch:
      20,
    bearing:
      0
  },

  {
    eyebrow:
      '51 MFY',
    title:
      'Mahallalar',
    text:
      '51 ta mahalla yagona interaktiv xaritada.',
    center:
      [71.045, 40.54],
    zoom:
      10.4,
    pitch:
      38,
    bearing:
      -7
  },

  {
    eyebrow:
      'AHOLI',
    title:
      fmt(
        state.data.district.population
      ),
    text:
      'Tasdiqlangan tuman statistikasi.',
    center:
      [71.03, 40.54],
    zoom:
      10.7,
    pitch:
      44,
    bearing:
      8
  },

  {
    eyebrow:
      'IQTISODIYOT',
    title:
      'Investor Mode',
    text:
      'Sanoat, qishloq xo‘jaligi va xizmatlar.',
    center:
      [71.07, 40.53],
    zoom:
      11,
    pitch:
      50,
    bearing:
      -10
  },

  {
    eyebrow:
      'MADE IN UCHKO‘PRIK',
    title:
      'Mahalliy mahsulotlar',
    text:
      'Mahalliy ishlab chiqaruvchilar va mahsulotlar.',
    center:
      [71.01, 40.50],
    zoom:
      10.8,
    pitch:
      42,
    bearing:
      10
  },

  {
    eyebrow:
      'AI · MAP · DATA',
    title:
      'Digital District',
    text:
      'Raqamli boshqaruv va zamonaviy hududiy ma’lumotlar.',
    center:
      [71.045, 40.54],
    zoom:
      9.8,
    pitch:
      50,
    bearing:
      0
  }
];


function openPresentation() {

  $('#presentationOverlay')
    ?.classList
    .remove(
      'hidden'
    );


  state.presentation.index =
    0;


  state.presentation.playing =
    true;


  if (
    !state.presentation.map
  ) {

    state.presentation.map =
      new maplibregl.Map({

        container:
          'presentationMap',

        style:
          'https://tiles.openfreemap.org/styles/liberty',

        center:
          [71.045, 40.54],

        zoom:
          9.7,

        pitch:
          20,

        interactive:
          false,

        attributionControl:
          true
      });
  }


  renderScene();

  scheduleScene();
}


function closePresentation() {

  $('#presentationOverlay')
    ?.classList
    .add(
      'hidden'
    );


  clearTimeout(
    state.presentation.timer
  );
}


function renderScene() {

  const all =
    scenes();


  const scene =
    all[
      state.presentation.index
    ];


  setText(
    '#sceneEyebrow',
    scene.eyebrow
  );

  setText(
    '#sceneTitle',
    scene.title
  );

  setText(
    '#sceneText',
    scene.text
  );

  setText(
    '#sceneCounter',
    `${state.presentation.index + 1} / ${all.length}`
  );


  $('#scenePlay')
    .innerHTML = `

      <span class="icon">
        ${svg(
          state.presentation.playing
            ? 'pause'
            : 'play'
        )}
      </span>

    `;


  state.presentation.map
    ?.flyTo({

      center:
        scene.center,

      zoom:
        scene.zoom,

      pitch:
        scene.pitch,

      bearing:
        scene.bearing,

      duration:
        document.documentElement
          .classList
          .contains(
            'reduce-motion'
          )
          ? 0
          : 1700
    });
}


function scheduleScene() {

  clearTimeout(
    state.presentation.timer
  );


  if (
    !state.presentation.playing
  ) {
    return;
  }


  state.presentation.timer =
    setTimeout(
      () => {

        state.presentation.index =
          (
            state.presentation.index +
            1
          ) %
          scenes().length;


        renderScene();

        scheduleScene();

      },
      6500
    );
}


function sceneStep(delta) {

  const count =
    scenes().length;


  state.presentation.index =
    (
      state.presentation.index +
      delta +
      count
    ) %
    count;


  renderScene();

  scheduleScene();
}


function togglePresentationPlay() {

  state.presentation.playing =
    !state.presentation.playing;


  renderScene();

  scheduleScene();
}


/* =========================================================
   ACCESSIBILITY
========================================================= */

function loadPrefs() {

  let prefs = {};


  try {

    prefs =
      JSON.parse(
        localStorage.getItem(
          'uchkoprik-prefs'
        ) ||
        '{}'
      );

  } catch {
    prefs = {};
  }


  document.documentElement.dataset.theme =
    prefs.light
      ? 'light'
      : 'dark';


  document.documentElement
    .classList
    .toggle(
      'reduce-motion',
      !!prefs.reduceMotion
    );


  document.documentElement
    .classList
    .toggle(
      'reduce-transparency',
      !!prefs.reduceTransparency
    );


  document.documentElement
    .classList
    .toggle(
      'high-contrast',
      !!prefs.highContrast
    );


  document.documentElement
    .style
    .setProperty(
      '--font-scale',
      prefs.fontScale ||
      1
    );


  if (
    $('#lightModeToggle')
  ) {

    $('#lightModeToggle')
      .checked =
      !!prefs.light;
  }


  if (
    $('#reduceMotionToggle')
  ) {

    $('#reduceMotionToggle')
      .checked =
      !!prefs.reduceMotion;
  }


  if (
    $('#reduceTransparencyToggle')
  ) {

    $('#reduceTransparencyToggle')
      .checked =
      !!prefs.reduceTransparency;
  }


  if (
    $('#highContrastToggle')
  ) {

    $('#highContrastToggle')
      .checked =
      !!prefs.highContrast;
  }
}


function savePrefs() {

  const prefs = {

    light:
      !!$('#lightModeToggle')
        ?.checked,

    reduceMotion:
      !!$('#reduceMotionToggle')
        ?.checked,

    reduceTransparency:
      !!$('#reduceTransparencyToggle')
        ?.checked,

    highContrast:
      !!$('#highContrastToggle')
        ?.checked,

    fontScale:
      Number(
        getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          '--font-scale'
        )
      ) ||
      1
  };


  localStorage.setItem(
    'uchkoprik-prefs',
    JSON.stringify(
      prefs
    )
  );


  loadPrefs();

  updateIdleSphereTheme();
}


function setFont(key) {

  const scale = {
    small:
      .92,
    normal:
      1,
    large:
      1.12
  }[key] || 1;


  document.documentElement
    .style
    .setProperty(
      '--font-scale',
      scale
    );


  $$('[data-font]')
    .forEach(
      (button) => {

        button.classList
          .toggle(
            'active',
            button.dataset.font ===
              key
          );
      }
    );


  savePrefs();
}


/* =========================================================
   IDLE PARTICLE EARTH
========================================================= */

async function initIdleSphere() {

  if (
    state.idle.initialized
  ) {
    return;
  }


  const container =
    $('#idleSphereCanvas');


  if (!container) {
    return;
  }


  try {

    const THREE =
      await import(
        'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js'
      );


    state.idle.three =
      THREE;


    const scene =
      new THREE.Scene();


    const camera =
      new THREE.PerspectiveCamera(
        48,
        1,
        .1,
        100
      );


    camera.position.z =
      3.25;


    const renderer =
      new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );


    renderer.setClearColor(
      0x000000,
      0
    );


    container.innerHTML =
      '';


    container.appendChild(
      renderer.domElement
    );


    const group =
      new THREE.Group();


    scene.add(
      group
    );


    const count =
      window.innerWidth <
        760
        ? 5000
        : 8500;


    const positions =
      new Float32Array(
        count * 3
      );


    const goldenAngle =
      Math.PI *
      (
        3 -
        Math.sqrt(5)
      );


    for (
      let index = 0;
      index < count;
      index++
    ) {

      const y =
        1 -
        (
          index /
          (
            count -
            1
          )
        ) *
        2;


      const radius =
        Math.sqrt(
          Math.max(
            0,
            1 -
            y * y
          )
        );


      const theta =
        goldenAngle *
        index;


      const x =
        Math.cos(theta) *
        radius;


      const z =
        Math.sin(theta) *
        radius;


      positions[
        index * 3
      ] =
        x;


      positions[
        index * 3 + 1
      ] =
        y;


      positions[
        index * 3 + 2
      ] =
        z;
    }


    const geometry =
      new THREE.BufferGeometry();


    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        positions,
        3
      )
    );


    const lightTheme =
      document.documentElement
        .dataset.theme ===
      'light';


    const material =
      new THREE.PointsMaterial({

        size:
          window.innerWidth <
            760
            ? .013
            : .0105,

        color:
          lightTheme
            ? 0x0b202c
            : 0xffffff,

        transparent:
          true,

        opacity:
          .92,

        depthWrite:
          false,

        blending:
          THREE.AdditiveBlending
      });


    const points =
      new THREE.Points(
        geometry,
        material
      );


    group.add(
      points
    );


    /*
      Yumshoq ichki ikkinchi sfera.
    */

    const secondary =
      new THREE.Points(
        geometry.clone(),
        material.clone()
      );


    secondary.scale
      .setScalar(
        .985
      );


    secondary.material.opacity =
      .17;


    secondary.material.size =
      material.size *
      .64;


    group.add(
      secondary
    );


    state.idle.scene =
      scene;

    state.idle.camera =
      camera;

    state.idle.renderer =
      renderer;

    state.idle.group =
      group;

    state.idle.points =
      points;


    function resize() {

      const width =
        Math.max(
          1,
          container.clientWidth
        );


      const height =
        Math.max(
          1,
          container.clientHeight
        );


      renderer.setSize(
        width,
        height,
        false
      );


      camera.aspect =
        width /
        height;


      camera.updateProjectionMatrix();
    }


    const resizeObserver =
      new ResizeObserver(
        resize
      );


    resizeObserver.observe(
      container
    );


    resize();


    /*
      Drag xuddi yuborilgan
      Originkit g‘oyasi kabi.
    */

    renderer.domElement
      .addEventListener(
        'pointerdown',
        (event) => {

          state.idle.dragging =
            true;

          state.idle.lastX =
            event.clientX;

          state.idle.lastY =
            event.clientY;


          renderer.domElement
            .setPointerCapture?.(
              event.pointerId
            );
        }
      );


    renderer.domElement
      .addEventListener(
        'pointermove',
        (event) => {

          const rect =
            renderer.domElement
              .getBoundingClientRect();


          state.idle.pointer.x =
            (
              (
                event.clientX -
                rect.left
              ) /
              rect.width
            ) *
            2 -
            1;


          state.idle.pointer.y =
            -(
              (
                event.clientY -
                rect.top
              ) /
              rect.height
            ) *
            2 +
            1;


          if (
            !state.idle.dragging
          ) {
            return;
          }


          const dx =
            event.clientX -
            state.idle.lastX;


          const dy =
            event.clientY -
            state.idle.lastY;


          state.idle.targetRotation.y +=
            dx *
            .005;


          state.idle.targetRotation.x +=
            dy *
            .004;


          state.idle.targetRotation.x =
            Math.max(
              -.8,
              Math.min(
                .8,
                state.idle
                  .targetRotation
                  .x
              )
            );


          state.idle.lastX =
            event.clientX;

          state.idle.lastY =
            event.clientY;
        }
      );


    window.addEventListener(
      'pointerup',
      () => {

        state.idle.dragging =
          false;
      }
    );


    state.idle.initialized =
      true;


    function animate() {

      state.idle.animationFrame =
        requestAnimationFrame(
          animate
        );


      if (
        !state.idle.active
      ) {
        return;
      }


      if (
        !state.idle.dragging
      ) {

        state.idle.targetRotation.y +=
          .0015;
      }


      /*
        Cursor maydoniga qarab
        sfera ozgina egiladi.
        Bu Originkit cursor
        interaction hissini beradi.
      */

      state.idle.targetRotation.y +=
        state.idle.pointer.x *
        .00008;


      state.idle.targetRotation.x +=
        state.idle.pointer.y *
        .000045;


      state.idle.rotation.x +=
        (
          state.idle.targetRotation.x -
          state.idle.rotation.x
        ) *
        .055;


      state.idle.rotation.y +=
        (
          state.idle.targetRotation.y -
          state.idle.rotation.y
        ) *
        .055;


      group.rotation.x =
        state.idle.rotation.x;


      group.rotation.y =
        state.idle.rotation.y;


      /*
        Nafas olayotgandek
        juda kichik scale.
      */

      const pulse =
        1 +
        Math.sin(
          performance.now() *
          .00065
        ) *
        .008;


      group.scale
        .setScalar(
          pulse
        );


      renderer.render(
        scene,
        camera
      );
    }


    animate();

  } catch (error) {

    console.warn(
      'Idle sphere:',
      error
    );
  }
}


function updateIdleSphereTheme() {

  if (
    !state.idle.points
  ) {
    return;
  }


  const light =
    document.documentElement
      .dataset.theme ===
    'light';


  state.idle.points
    .material
    .color
    .setHex(
      light
        ? 0x0b202c
        : 0xffffff
    );
}


function resetIdleTimer() {

  clearTimeout(
    state.idle.timer
  );


  if (
    state.idle.active
  ) {

    exitIdleMode();
  }


  state.idle.timer =
    setTimeout(
      () => {

        enterIdleMode();

      },
      state.idle.timeout
    );
}


async function enterIdleMode() {

  if (
    state.idle.active
  ) {
    return;
  }


  if (
    !state.idle.initialized
  ) {

    await initIdleSphere();
  }


  if (
    !state.idle.initialized
  ) {
    return;
  }


  closeDetail(
    false
  );


  closeMajorPanels();


  if (
    document.body
      .classList
      .contains(
        'passport-mode'
      )
  ) {

    closePassportMode(
      false
    );
  }


  state.idle.active =
    true;


  document.body
    .classList
    .add(
      'idle-mode'
    );


  $('#idleSphereOverlay')
    ?.setAttribute(
      'aria-hidden',
      'false'
    );
}


function exitIdleMode() {

  if (
    !state.idle.active
  ) {
    return;
  }


  state.idle.active =
    false;


  document.body
    .classList
    .remove(
      'idle-mode'
    );


  $('#idleSphereOverlay')
    ?.setAttribute(
      'aria-hidden',
      'true'
    );


  /*
    Sphere → xarita qaytish
    CSS zoom transition orqali.
  */

  setTimeout(
    () => {

      state.map
        ?.resize();

    },
    650
  );
}


function setupIdleDetection() {

  const events = [
    'pointerdown',
    'pointermove',
    'keydown',
    'wheel',
    'touchstart'
  ];


  let lastReset =
    0;


  events.forEach(
    (eventName) => {

      window.addEventListener(
        eventName,
        () => {

          const now =
            Date.now();


          /*
            pointermove har millisekund
            timer yaratib yubormasin.
          */

          if (
            eventName ===
              'pointermove' &&
            now -
              lastReset <
              500
          ) {
            return;
          }


          lastReset =
            now;


          resetIdleTimer();

        },
        {
          passive: true
        }
      );
    }
  );


  resetIdleTimer();
}


/* =========================================================
   TOAST
========================================================= */

function toast(
  title,
  body = ''
) {

  const host =
    $('#toastHost');


  if (!host) {
    return;
  }


  const element =
    document.createElement(
      'div'
    );


  element.className =
    'toast';


  element.innerHTML = `

    <strong>
      ${esc(title)}
    </strong>

    ${
      body
        ? `
          <small>
            ${esc(body)}
          </small>
        `
        : ''
    }

  `;


  host.appendChild(
    element
  );


  setTimeout(
    () => {

      element.remove();

    },
    3200
  );
}


/* =========================================================
   TEXT RENDER
========================================================= */

function renderAllTextual() {

  renderCategories();

  renderSpecializationFilters();

  renderOrganizationFilters();

  renderProducts();

  renderDistrictMetrics();

  renderAISuggestions();
}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

  /* FILTER */

  $('#exploreClose')
    ?.addEventListener(
      'click',
      closeFilterPanel
    );


  $('#filterToggle')
    ?.addEventListener(
      'click',
      openFilterPanel
    );


  $('#fitDistrict')
    ?.addEventListener(
      'click',
      () => {

        state.selectedSpecialization =
          null;

        state.selectedOrganizationType =
          null;

        renderSpecializationFilters();

        renderOrganizationFilters();

        applyMarkerFilters();

        fitDistrict();
      }
    );


  $('#specializationReset')
    ?.addEventListener(
      'click',
      () => {

        state.selectedSpecialization =
          null;

        renderSpecializationFilters();

        applyMarkerFilters();
      }
    );


  $('#organizationFilterReset')
    ?.addEventListener(
      'click',
      () => {

        state.selectedOrganizationType =
          null;

        renderOrganizationFilters();

        applyMarkerFilters();
      }
    );


  /* PASSPORT */

  $('#districtPassportBtn')
    ?.addEventListener(
      'click',
      openPassportMode
    );


  $('#districtClose')
    ?.addEventListener(
      'click',
      () => {

        closePassportMode();
      }
    );


  /* SEARCH */

  $('#searchOpen')
    ?.addEventListener(
      'click',
      () => {

        closeMajorPanels();

        $('#searchDialog')
          ?.classList
          .remove(
            'hidden'
          );

        renderSearchResults();

        setTimeout(
          () => {

            $('#globalSearch')
              ?.focus();

          },
          50
        );
      }
    );


  $('#searchClose')
    ?.addEventListener(
      'click',
      () => {

        $('#searchDialog')
          ?.classList
          .add(
            'hidden'
          );
      }
    );


  $('#globalSearch')
    ?.addEventListener(
      'input',
      (event) => {

        renderSearchResults(
          event.target.value
        );
      }
    );


  /* DOCK */

  $$('.dock-item')
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const nav =
              button.dataset.nav;


            if (
              nav ===
              'explore'
            ) {

              openFilterPanel();

              return;
            }


            if (
              nav ===
              'map'
            ) {

              closeMajorPanels();

              closeDetail();

              if (
                document.body
                  .classList
                  .contains(
                    'passport-mode'
                  )
              ) {

                closePassportMode();
              }


              closeFilterPanel();

              fitDistrict();

              return;
            }


            if (
              nav ===
              'ai'
            ) {

              openAI();

              return;
            }


            if (
              nav ===
              'invest'
            ) {

              openInvestorMode();

              return;
            }


            if (
              nav ===
              'products'
            ) {

              openPanel(
                'products'
              );
            }
          }
        );
      }
    );


  /* INVESTOR */

  $('#investorClose')
    ?.addEventListener(
      'click',
      closeInvestorMode
    );


  $('#showBusinesses')
    ?.addEventListener(
      'click',
      () => {

        state.activeCategories
          .add(
            'business'
          );

        renderCategories();

        renderMarkers();

        closeInvestorMode();
      }
    );


  $('#askInvestment')
    ?.addEventListener(
      'click',
      () => {

        askAI(
          'Uchko‘prik investitsiya imkoniyatlari haqida umumiy ma’lumot ber'
        );
      }
    );


  /* PRODUCTS */

  $('#productsClose')
    ?.addEventListener(
      'click',
      openFilterPanel
    );


  /* DETAIL */

  $('#detailClose')
    ?.addEventListener(
      'click',
      () => {

        closeDetail();
      }
    );


  $('#detailDirections')
    ?.addEventListener(
      'click',
      () => {

        const item =
          state.selected?.item;


        if (
          validCoordinates(
            item
          )
        ) {

          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${item.lat},${item.lng}`
            )}`,
            '_blank',
            'noopener'
          );
        }
      }
    );


  $('#detailAsk')
    ?.addEventListener(
      'click',
      () => {

        if (
          state.selected
        ) {

          askAI(
            `${state.selected.item.name} haqida ma’lumot ber`
          );
        }
      }
    );


  $('#detailShare')
    ?.addEventListener(
      'click',
      async () => {

        const item =
          state.selected?.item;


        try {

          if (
            navigator.share
          ) {

            await navigator.share({
              title:
                item?.name ||
                'Uchko‘prik',
              url:
                location.href
            });

          } else {

            await navigator
              .clipboard
              .writeText(
                location.href
              );

            toast(
              'Havola nusxalandi'
            );
          }

        } catch {
          // ignore
        }
      }
    );


  /* AI */

  $('#aiClose')
    ?.addEventListener(
      'click',
      () => {

        $('#aiPanel')
          ?.classList
          .add(
            'hidden'
          );

        setDockActive(
          state.activePanel ===
            'explore'
            ? 'explore'
            : 'map'
        );
      }
    );


  $('#aiForm')
    ?.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();

        askAI(
          $('#aiInput')
            ?.value
        );
      }
    );


  $('#voiceBtn')
    ?.addEventListener(
      'click',
      startVoice
    );


  /* LANGUAGE */

  $('#languageBtn')
    ?.addEventListener(
      'click',
      () => {

        openSheet(
          'languageSheet'
        );
      }
    );


  /* ACCESSIBILITY */

  $('#accessibilityBtn')
    ?.addEventListener(
      'click',
      () => {

        openSheet(
          'accessibilitySheet'
        );
      }
    );


  $$('[data-sheet-close]')
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            closeSheet(
              button.dataset
                .sheetClose
            );
          }
        );
      }
    );


  $$('.sheet-backdrop')
    .forEach(
      (sheet) => {

        sheet.addEventListener(
          'click',
          (event) => {

            if (
              event.target ===
              sheet
            ) {

              sheet.classList
                .add(
                  'hidden'
                );
            }
          }
        );
      }
    );


  [
    'lightModeToggle',
    'reduceMotionToggle',
    'reduceTransparencyToggle',
    'highContrastToggle'
  ].forEach(
    (id) => {

      $('#' + id)
        ?.addEventListener(
          'change',
          savePrefs
        );
    }
  );


  $$('[data-font]')
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            setFont(
              button.dataset.font
            );
          }
        );
      }
    );


  /* PRESENTATION */

  $('#presentationBtn')
    ?.addEventListener(
      'click',
      openPresentation
    );


  $('#presentationExit')
    ?.addEventListener(
      'click',
      closePresentation
    );


  $('#scenePrev')
    ?.addEventListener(
      'click',
      () => {

        sceneStep(
          -1
        );
      }
    );


  $('#sceneNext')
    ?.addEventListener(
      'click',
      () => {

        sceneStep(
          1
        );
      }
    );


  $('#scenePlay')
    ?.addEventListener(
      'click',
      togglePresentationPlay
    );


  /* GLOBAL KEYBOARD */

  document.addEventListener(
    'keydown',
    (event) => {

      if (
        (
          event.metaKey ||
          event.ctrlKey
        ) &&
        event.key
          .toLowerCase() ===
          'k'
      ) {

        event.preventDefault();

        $('#searchOpen')
          ?.click();
      }


      if (
        event.key ===
        'Escape'
      ) {

        $('#searchDialog')
          ?.classList
          .add(
            'hidden'
          );


        $('#aiPanel')
          ?.classList
          .add(
            'hidden'
          );


        if (
          state.selected
        ) {

          closeDetail();

          return;
        }


        if (
          document.body
            .classList
            .contains(
              'passport-mode'
            )
        ) {

          closePassportMode();

          return;
        }


        if (
          !$('#presentationOverlay')
            ?.classList
            .contains(
              'hidden'
            )
        ) {

          closePresentation();
        }
      }


      if (
        !$('#presentationOverlay')
          ?.classList
          .contains(
            'hidden'
          )
      ) {

        if (
          event.key ===
          'ArrowRight'
        ) {

          sceneStep(
            1
          );
        }


        if (
          event.key ===
          'ArrowLeft'
        ) {

          sceneStep(
            -1
          );
        }
      }
    }
  );


  window.addEventListener(
    'resize',
    () => {

      scheduleConnectorUpdate();

      state.map
        ?.resize();
    }
  );
}


/* =========================================================
   BOOT
========================================================= */

async function boot() {

  detectLanguage();

  bindIcons();

  loadPrefs();


  console.log(
    'Uchko‘prik Digital District UX V2 ishga tushmoqda...'
  );


  await loadData();


  applyLanguage();

  renderLanguages();

  setupEvents();

  setupVoice();

  initMap();

  ensureAIWelcome();

  setupIdleDetection();


  if (
    'serviceWorker'
    in navigator
  ) {

    navigator.serviceWorker
      .register(
        '/sw.js'
      )
      .catch(
        (error) => {

          console.warn(
            'Service Worker:',
            error
          );
        }
      );
  }


  console.log(
    'Uchko‘prik Digital District UX V2 tayyor.'
  );
}


boot().catch(
  (error) => {

    console.error(
      'Application error:',
      error
    );


    toast(
      'Application error',
      error.message
    );
  }
);
