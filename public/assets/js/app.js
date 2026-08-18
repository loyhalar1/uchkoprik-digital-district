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

  activeCategories: new Set(['mahalla']),

  activePanel: 'explore',

  presentation: {
    map: null,
    index: 0,
    timer: null,
    playing: true
  },

  voiceRecognition: null
};


/* =========================================================
   HELPERS
========================================================= */

const $ = (sel, root = document) =>
  root.querySelector(sel);

const $$ = (sel, root = document) =>
  [...root.querySelectorAll(sel)];


const fmt = (number) => {
  const localeMap = {
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

  return new Intl.NumberFormat(
    localeMap[state.lang] || 'uz-UZ'
  ).format(Number(number) || 0);
};


const esc = (value) =>
  String(value ?? '').replace(
    /[&<>'"]/g,
    (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    })[c]
  );


function svg(name) {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      ${ICONS[name] || ICONS.info}
    </svg>
  `;
}


function bindIcons(root = document) {
  $$('[data-icon]', root).forEach((el) => {
    el.innerHTML = svg(el.dataset.icon);
  });
}


function tr(key) {
  return t(state.lang, key);
}


function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[ʻ’'`]/g, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC');
}


function safeDate(value) {
  if (!value) return null;

  try {
    return new Date(value).toLocaleDateString(
      state.lang === 'uz' ? 'uz-UZ' : state.lang
    );
  } catch {
    return value;
  }
}


/* =========================================================
   LANGUAGE
========================================================= */

function detectLanguage() {
  const segment = location.pathname
    .split('/')
    .filter(Boolean)[0];

  if (LANGUAGES.some((l) => l.code === segment)) {
    state.lang = segment;
  } else {
    state.lang =
      localStorage.getItem('uchkoprik-lang') ||
      'uz';
  }
}


function applyLanguage() {
  const meta = langMeta(state.lang);

  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.dir;

  const langShort = $('#langShort');

  if (langShort) {
    langShort.textContent = meta.short;
  }

  $$('[data-i18n]').forEach((el) => {
    el.textContent = tr(el.dataset.i18n);
  });

  $$('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = tr(
      el.dataset.i18nPlaceholder
    );
  });

  $$('[data-i18n-aria]').forEach((el) => {
    el.setAttribute(
      'aria-label',
      tr(el.dataset.i18nAria)
    );
  });

  localStorage.setItem(
    'uchkoprik-lang',
    state.lang
  );

  renderAllTextual();
}


function setLanguage(code) {
  if (!LANGUAGES.some((l) => l.code === code)) {
    return;
  }

  state.lang = code;

  applyLanguage();

  closeSheet('languageSheet');

  renderLanguages();
}


/* =========================================================
   SUPABASE DATA
========================================================= */

async function loadData() {

  if (!window.sb) {
    throw new Error(
      'Supabase client topilmadi. supabase.js tekshirilsin.'
    );
  }


  /* -------------------------
     MFY
  ------------------------- */

  const {
    data: mahallasRaw,
    error: mahallasError
  } = await window.sb
    .from('mahallas')
    .select('*')
    .eq('status', 'active')
    .order('legacy_id', {
      ascending: true
    });


  if (mahallasError) {
    throw new Error(
      `MFY yuklash xatosi: ${mahallasError.message}`
    );
  }


  /* -------------------------
     CATEGORIES
  ------------------------- */

  const {
    data: categoriesRaw,
    error: categoriesError
  } = await window.sb
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', {
      ascending: true
    });


  if (categoriesError) {
    throw new Error(
      `Kategoriyalar xatosi: ${categoriesError.message}`
    );
  }


  /* -------------------------
     DISTRICT
  ------------------------- */

  const {
    data: districtRaw,
    error: districtError
  } = await window.sb
    .from('district')
    .select('*')
    .eq('slug', 'uchkoprik')
    .single();


  if (districtError) {
    throw new Error(
      `Tuman ma'lumotlari xatosi: ${districtError.message}`
    );
  }


  /* -------------------------
     ORGANIZATIONS
  ------------------------- */

  const {
    data: organizationsRaw,
    error: organizationsError
  } = await window.sb
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
      category:categories (
        id,
        slug,
        name,
        icon,
        color
      )
    `)
    .eq('status', 'active');


  if (organizationsError) {
    console.warn(
      'Organizations:',
      organizationsError.message
    );
  }


  /* =====================================================
     MFY FORMAT
  ===================================================== */

  const mahallas = (mahallasRaw || []).map(
    (m) => ({
      id: m.legacy_id ?? m.id,

      uuid: m.id,

      legacyId: m.legacy_id,

      slug: m.slug,

      name:
        m.name ||
        m.official_name ||
        'Noma’lum MFY',

      officialName:
        m.official_name ||
        m.name,

      head:
        m.chairman || null,

      phone:
        m.phone || null,

      specialization:
        m.specialization || null,

      population:
        Number(m.population || 0),

      households:
        Number(m.households || 0),

      families:
        Number(m.families || 0),

      schools:
        Number(m.schools || 0),

      kindergartens:
        Number(m.kindergartens || 0),

      clinics:
        Number(m.clinics || 0),

      mosques:
        Number(m.mosques || 0),

      shops:
        Number(m.shops || 0),

      lat:
        Number(m.latitude),

      lng:
        Number(m.longitude),

      imageUrl:
        m.image_url || null,

      color:
        m.color || null,

      verified:
        m.verified !== false,

      source:
        m.source || null,

      updatedAt:
        safeDate(m.updated_at),

      type:
        'mahalla',

      category:
        'mahalla'
    })
  );


  /* =====================================================
     CATEGORY FORMAT
  ===================================================== */

  const categories = (categoriesRaw || [])
    .map((c) => {

      let frontendId = c.slug;

      if (c.slug === 'mahallas') {
        frontendId = 'mahalla';
      }

      return {
        id: frontendId,

        dbId: c.id,

        slug: c.slug,

        name: c.name,

        icon: c.icon || 'marker',

        color:
          c.color ||
          '#65e5ff',

        markerShape:
          c.marker_shape ||
          'circle',

        geometryType:
          c.geometry_type ||
          'point',

        sourceType:
          c.source_type,

        sortOrder:
          Number(c.sort_order || 0),

        active:
          c.active !== false
      };
    });


  /* =====================================================
     ORGANIZATIONS FORMAT
  ===================================================== */

  const businesses = (
    organizationsRaw || []
  ).map((o) => {

    const categorySlug =
      o.category?.slug ||
      'business';

    const categoryId =
      categorySlug === 'mahallas'
        ? 'mahalla'
        : categorySlug;

    return {
      id:
        o.id,

      slug:
        o.slug,

      name:
        o.name,

      inn:
        o.inn || null,

      organizationType:
        o.organization_type || null,

      sector:
        o.sector || null,

      industry:
        o.activity || null,

      description:
        o.activity ||
        o.sector ||
        '',

      mahallaId:
        o.mahalla_id || null,

      address:
        o.address || null,

      lat:
        Number(o.latitude),

      lng:
        Number(o.longitude),

      website:
        o.website || null,

      imageUrl:
        o.image_url || null,

      verified:
        o.verified === true,

      source:
        o.source || null,

      updatedAt:
        safeDate(o.updated_at),

      type:
        'business',

      category:
        categoryId,

      categoryName:
        o.category?.name ||
        null,

      categoryColor:
        o.category?.color ||
        null,

      categoryIcon:
        o.category?.icon ||
        null
    };
  });


  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalPopulation =
    mahallas.reduce(
      (sum, item) =>
        sum +
        Number(item.population || 0),
      0
    );


  const totalHouseholds =
    mahallas.reduce(
      (sum, item) =>
        sum +
        Number(item.households || 0),
      0
    );


  const totalFamilies =
    mahallas.reduce(
      (sum, item) =>
        sum +
        Number(item.families || 0),
      0
    );


  /* =====================================================
     DISTRICT FORMAT
  ===================================================== */

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
      totalPopulation,

    households:
      totalHouseholds,

    families:
      totalFamilies,

    areaKm2:
      Number(
        districtRaw.area_km2 || 0
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
      districtRaw.unemployment_rate,

    povertyRate:
      districtRaw.poverty_rate,

    borderLengthKm:
      districtRaw.border_length_km,

    healthcareCount:
      districtRaw.healthcare_count,

    updatedAt:
      safeDate(
        districtRaw.updated_at
      )
  };


  /* =====================================================
     FINAL DATA
  ===================================================== */

  state.data = {

    mahallas,

    categories,

    businesses,

    places: [],

    products: [],

    district
  };


  console.log(
    `Supabase: ${mahallas.length} ta MFY yuklandi`
  );

  console.log(
    `Supabase: ${categories.length} ta kategoriya yuklandi`
  );

  console.log(
    `Supabase: ${businesses.length} ta tashkilot yuklandi`
  );
}


/* =========================================================
   MAP
========================================================= */

function initMap() {

  const reduced =
    document.documentElement.classList.contains(
      'reduce-motion'
    );


  state.map = new maplibregl.Map({

    container: 'map',

    style:
      'https://tiles.openfreemap.org/styles/liberty',

    center: [
      71.045,
      40.54
    ],

    zoom: 10.2,

    pitch:
      reduced ? 0 : 15,

    bearing: 0,

    attributionControl: true,

    cooperativeGestures: false
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
}


/* =========================================================
   MARKERS
========================================================= */

function clearMarkers() {

  state.markers.forEach(
    (item) =>
      item.marker.remove()
  );

  state.markers = [];
}


function getCategory(categoryId) {

  return state.data.categories.find(
    (c) =>
      c.id === categoryId ||
      c.slug === categoryId
  );
}


function getCategoryIcon(categoryId) {

  const category =
    getCategory(categoryId);

  const requestedIcon =
    category?.icon;

  if (
    requestedIcon &&
    ICONS[requestedIcon]
  ) {
    return requestedIcon;
  }

  return (
    iconForCategory[categoryId] ||
    'marker'
  );
}


function getCategoryColor(categoryId) {

  return (
    getCategory(categoryId)?.color ||
    '#65e5ff'
  );
}


function markerElement(
  item,
  color,
  kind
) {

  const el =
    document.createElement(
      'button'
    );

  el.type = 'button';

  el.className =
    kind === 'mahalla'
      ? 'mfy-marker'
      : 'place-marker';

  el.setAttribute(
    'aria-label',
    item.name || ''
  );


  if (kind === 'mahalla') {

    el.innerHTML = `
      <span
        class="mfy-dot"
        style="--marker:${color}"
      ></span>
    `;

  } else {

    const icon =
      getCategoryIcon(
        item.category
      );

    el.innerHTML = `
      <span
        class="place-pin"
        style="--marker:${color}"
      >
        <span class="icon">
          ${svg(icon)}
        </span>
      </span>
    `;
  }


  el.addEventListener(
    'click',
    (event) => {

      event.stopPropagation();

      openDetail(
        item,
        kind
      );
    }
  );


  return el;
}


function addMarker(
  item,
  kind,
  color
) {

  const lng =
    Number(item.lng);

  const lat =
    Number(item.lat);


  if (
    !Number.isFinite(lng) ||
    !Number.isFinite(lat)
  ) {
    return;
  }


  const el =
    markerElement(
      item,
      color,
      kind
    );


  const marker =
    new maplibregl.Marker({
      element: el,
      anchor: 'center'
    })
      .setLngLat([
        lng,
        lat
      ])
      .addTo(
        state.map
      );


  state.markers.push({
    item,
    kind,
    marker,
    el
  });
}


function renderMarkers() {

  if (!state.map) return;


  clearMarkers();


  /* MFY */

  if (
    state.activeCategories.has(
      'mahalla'
    )
  ) {

    (
      state.data.mahallas || []
    ).forEach(
      (m, index) => {

        const color =
          getCategoryColor(
            'mahalla'
          ) ||
          `hsl(${(index * 37) % 360} 75% 65%)`;


        addMarker(
          m,
          'mahalla',
          color
        );
      }
    );
  }


  /* Places */

  (
    state.data.places || []
  ).forEach(
    (place) => {

      if (
        state.activeCategories.has(
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
    }
  );


  /* Organizations */

  (
    state.data.businesses || []
  ).forEach(
    (business) => {

      const show =
        state.activeCategories.has(
          business.category
        ) ||
        state.activeCategories.has(
          'business'
        );


      if (!show) return;


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
}


function fitDistrict(
  animate = true
) {

  if (
    !state.map ||
    !state.data.mahallas?.length
  ) {
    return;
  }


  const bounds =
    new maplibregl.LngLatBounds();


  state.data.mahallas.forEach(
    (m) => {

      const lng =
        Number(m.lng);

      const lat =
        Number(m.lat);


      if (
        Number.isFinite(lng) &&
        Number.isFinite(lat)
      ) {
        bounds.extend([
          lng,
          lat
        ]);
      }
    }
  );


  state.map.fitBounds(
    bounds,
    {

      padding: {
        top: 110,
        bottom: 100,

        left:
          window.innerWidth > 760
            ? 390
            : 40,

        right: 40
      },

      duration:
        animate &&
        !document.documentElement.classList.contains(
          'reduce-motion'
        )
          ? 900
          : 0,

      maxZoom: 11.4
    }
  );
}


function flyTo(
  item,
  pitch = 25
) {

  if (!state.map) {
    return;
  }


  const lng =
    Number(item.lng);

  const lat =
    Number(item.lat);


  if (
    !Number.isFinite(lng) ||
    !Number.isFinite(lat)
  ) {
    return;
  }


  const reduced =
    document.documentElement.classList.contains(
      'reduce-motion'
    );


  state.map.flyTo({

    center: [
      lng,
      lat
    ],

    zoom: 13.2,

    pitch:
      reduced
        ? 0
        : pitch,

    duration:
      reduced
        ? 0
        : 850,

    essential: true
  });
}


/* =========================================================
   QUICK STATS
========================================================= */

function renderQuickStats() {

  const host =
    $('#quickStats');

  if (!host) return;


  const d =
    state.data.district || {};


  const items = [

    [
      d.mahallas ||
        state.data.mahallas.length,
      tr('mahallas')
    ],

    [
      d.population,
      tr('population')
    ],

    [
      d.households,
      tr('households')
    ],

    [
      d.families,
      tr('families')
    ]
  ];


  host.innerHTML =
    items
      .map(
        ([value, label]) => `
          <div class="stat-chip">
            <strong>
              ${fmt(value)}
            </strong>

            <span>
              ${esc(label)}
            </span>
          </div>
        `
      )
      .join('');
}


/* =========================================================
   CATEGORIES
========================================================= */

function categoryLabel(c) {

  if (!c) {
    return '';
  }


  const map = {

    mahalla: 'mahallas',

    business: 'businesses',

    education: 'education',

    health: 'health',

    culture: 'culture',

    service: 'services',

    investment: 'investment'
  };


  if (map[c.id]) {
    return tr(map[c.id]);
  }


  return (
    c.name ||
    c.slug ||
    ''
  );
}


function renderCategories() {

  const el =
    $('#categoryChips');

  if (!el) return;


  el.innerHTML =
    (
      state.data.categories || []
    )
      .filter(
        (c) =>
          c.active !== false &&
          c.active !== 0
      )
      .map(
        (c) => `
          <button
            class="category-chip ${
              state.activeCategories.has(
                c.id
              )
                ? 'active'
                : ''
            }"

            style="--chip:${
              c.color ||
              '#65e5ff'
            }"

            data-category="${esc(
              c.id
            )}"
          >

            <span
              class="dot"
              style="
                color:${
                  c.color ||
                  '#65e5ff'
                };
                background:${
                  c.color ||
                  '#65e5ff'
                };
              "
            ></span>

            <span>
              ${esc(
                categoryLabel(c)
              )}
            </span>

          </button>
        `
      )
      .join('');


  $$('.category-chip', el)
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () =>
            toggleCategory(
              button.dataset.category
            )
        );
      }
    );
}


function toggleCategory(
  id,
  force
) {

  const on =
    force === undefined
      ? !state.activeCategories.has(
          id
        )
      : force;


  if (on) {
    state.activeCategories.add(
      id
    );
  } else {
    state.activeCategories.delete(
      id
    );
  }


  renderCategories();

  renderMarkers();
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {

  const host =
    $('#productGrid');

  if (!host) return;


  const products =
    state.data.products || [];


  if (!products.length) {

    host.innerHTML = `
      <div class="search-empty">
        Hozircha mahsulotlar kiritilmagan.
      </div>
    `;

    return;
  }


  host.innerHTML =
    products
      .map(
        (p) => `
          <button
            class="product-card"
            data-product="${esc(
              p.id
            )}"
          >

            <div class="product-visual">

              <span class="icon">
                ${svg('package')}
              </span>

            </div>

            <div class="product-info">

              <small>
                ${esc(
                  p.category || ''
                )}
              </small>

              <strong>
                ${esc(p.name)}
              </strong>

              <p>
                ${esc(
                  p.description || ''
                )}
              </p>

            </div>

          </button>
        `
      )
      .join('');


  $$('.product-card').forEach(
    (item) => {

      item.addEventListener(
        'click',
        () => {

          const product =
            state.data.products.find(
              (p) =>
                String(p.id) ===
                item.dataset.product
            );


          openDetail(
            product,
            'product'
          );
        }
      );
    }
  );
}


/* =========================================================
   DISTRICT METRICS
========================================================= */

function renderDistrictMetrics() {

  const d =
    state.data.district || {};


  const districtHost =
    $('#districtMetrics');


  if (districtHost) {

    const items = [

      [
        d.mahallas || 0,
        tr('mahallas')
      ],

      [
        d.population || 0,
        tr('totalPopulation')
      ],

      [
        d.households || 0,
        tr('totalHouseholds')
      ],

      [
        d.families || 0,
        tr('totalFamilies')
      ]
    ];


    districtHost.innerHTML =
      items
        .map(
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
                  tr('sourceOfficial')
                )}
              </small>

            </div>
          `
        )
        .join('');
  }


  const updated =
    $('#districtUpdated');


  if (updated) {
    updated.textContent =
      d.updatedAt || '—';
  }


  const investorHost =
    $('#investorMetrics');


  if (investorHost) {

    const items = [

      [
        d.population || 0,
        tr('population')
      ],

      [
        state.data.businesses.length,
        tr('businesses')
      ],

      [
        d.mahallas || 0,
        tr('mahallas')
      ],

      [
        d.areaKm2 || 0,
        'km²'
      ]
    ];


    investorHost.innerHTML =
      items
        .map(
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
                  tr('sourceOfficial')
                )}
              </small>

            </div>
          `
        )
        .join('');
  }
}


/* =========================================================
   LANGUAGES
========================================================= */

function renderLanguages() {

  const host =
    $('#languageGrid');

  if (!host) return;


  host.innerHTML =
    LANGUAGES
      .map(
        (l) => `
          <button
            class="language-option ${
              l.code === state.lang
                ? 'active'
                : ''
            }"
            data-lang="${l.code}"
          >

            <span class="language-code">
              ${l.short}
            </span>

            <span>

              <strong>
                ${esc(l.native)}
              </strong>

              <small>
                ${esc(l.name)}
              </small>

            </span>

          </button>
        `
      )
      .join('');


  $$('.language-option')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          () =>
            setLanguage(
              item.dataset.lang
            )
        );
      }
    );
}


function renderAllTextual() {

  renderQuickStats();

  renderCategories();

  renderProducts();

  renderDistrictMetrics();

  renderAISuggestions();
}


/* =========================================================
   DETAIL
========================================================= */

function openDetail(
  item,
  kind
) {

  if (!item) return;


  state.selected = {
    item,
    kind
  };


  let kicker = '';


  if (kind === 'mahalla') {

    kicker =
      tr('mahallas');

  } else if (
    kind === 'business'
  ) {

    kicker =
      item.categoryName ||
      tr('businesses');

  } else if (
    kind === 'product'
  ) {

    kicker =
      tr('products');

  } else {

    kicker =
      categoryLabel(
        getCategory(
          item.category
        )
      ) ||
      tr('places');
  }


  $('#detailKicker').textContent =
    kicker;


  $('#detailTitle').textContent =
    item.name ||
    item.officialName ||
    '—';


  if (kind === 'mahalla') {

    $('#detailDescription').textContent =
      item.specialization
        ? `${tr('specialization')}: ${item.specialization}`
        : tr('unknown');

  } else {

    $('#detailDescription').textContent =
      item.description ||
      item.address ||
      tr('unknown');
  }


  $('#detailVerification').innerHTML = `
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
          ? esc(tr('verified'))
          : esc(tr('demo'))
      }

    </span>

    ${
      item.updatedAt
        ? `
          <span class="badge">
            ${esc(
              tr('lastUpdated')
            )}:
            ${esc(item.updatedAt)}
          </span>
        `
        : ''
    }
  `;


  const stats = [];


  if (kind === 'mahalla') {

    stats.push(
      [
        item.population,
        tr('population')
      ],

      [
        item.households,
        tr('households')
      ],

      [
        item.families,
        tr('families')
      ]
    );
  }


  if (
    kind === 'business'
  ) {

    if (item.sector) {

      stats.push([
        item.sector,
        tr('specialization')
      ]);
    }

    if (item.organizationType) {

      stats.push([
        item.organizationType,
        'Turi'
      ]);
    }
  }


  if (
    kind === 'product' &&
    item.producer
  ) {

    stats.push([
      item.producer,
      tr('businesses')
    ]);
  }


  $('#detailStats').innerHTML =
    stats
      .map(
        ([value, label]) => `
          <div class="detail-stat">

            <strong>
              ${
                typeof value === 'number'
                  ? fmt(value)
                  : esc(value)
              }
            </strong>

            <span>
              ${esc(label)}
            </span>

          </div>
        `
      )
      .join('');


  let detailIcon =
    'marker';


  if (kind === 'product') {

    detailIcon =
      'package';

  } else if (
    kind === 'business'
  ) {

    detailIcon =
      getCategoryIcon(
        item.category
      );

  } else if (
    kind === 'mahalla'
  ) {

    detailIcon =
      'home';

  } else {

    detailIcon =
      getCategoryIcon(
        item.category
      );
  }


  $('#detailSymbol').innerHTML = `
    <span class="icon">
      ${svg(detailIcon)}
    </span>
  `;


  $('#detailCard')
    .classList
    .remove('hidden');


  if (
    Number.isFinite(
      Number(item.lat)
    ) &&
    Number.isFinite(
      Number(item.lng)
    )
  ) {

    flyTo(item);
  }


  state.markers.forEach(
    (marker) => {

      marker.el.classList.toggle(
        'is-active',
        String(marker.item.id) ===
          String(item.id)
      );
    }
  );
}


function closeDetail() {

  $('#detailCard')
    .classList
    .add('hidden');


  state.selected = null;


  state.markers.forEach(
    (x) =>
      x.el.classList.remove(
        'is-active'
      )
  );
}


/* =========================================================
   PANELS
========================================================= */

function openPanel(name) {

  [
    'investorPanel',
    'productsPanel',
    'districtPanel'
  ].forEach(
    (id) =>
      $('#' + id)
        ?.classList
        .add('hidden')
  );


  if (name === 'explore') {

    $('#explorePanel')
      ?.classList
      .remove('hidden');

    state.activePanel =
      'explore';

  } else {

    $('#explorePanel')
      ?.classList
      .add('hidden');


    const id = {

      invest:
        'investorPanel',

      products:
        'productsPanel',

      district:
        'districtPanel'

    }[name];


    if (id) {

      $('#' + id)
        ?.classList
        .remove('hidden');
    }


    state.activePanel =
      name;
  }


  $$('.dock-item').forEach(
    (item) => {

      item.classList.toggle(
        'active',
        item.dataset.nav ===
          name
      );
    }
  );
}


/* =========================================================
   SHEETS
========================================================= */

function openSheet(id) {

  $('#' + id)
    ?.classList
    .remove('hidden');
}


function closeSheet(id) {

  $('#' + id)
    ?.classList
    .add('hidden');
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

  if (!host) return;


  const el =
    document.createElement(
      'div'
    );


  el.className =
    'toast';


  el.innerHTML = `
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


  host.appendChild(el);


  setTimeout(
    () => el.remove(),
    3200
  );
}


/* =========================================================
   SEARCH
========================================================= */

function allSearchItems() {

  return [

    ...(
      state.data.mahallas || []
    ).map(
      (x) => ({
        ...x,
        _kind: 'mahalla',
        _type: tr('mahallas')
      })
    ),

    ...(
      state.data.businesses || []
    ).map(
      (x) => ({
        ...x,
        _kind: 'business',
        _type:
          x.categoryName ||
          tr('businesses')
      })
    ),

    ...(
      state.data.places || []
    ).map(
      (x) => ({
        ...x,
        _kind: 'place',
        _type:
          categoryLabel(
            getCategory(
              x.category
            )
          )
      })
    ),

    ...(
      state.data.products || []
    ).map(
      (x) => ({
        ...x,
        _kind: 'product',
        _type: tr('products')
      })
    )
  ];
}


function searchLocal(query) {

  const q =
    normalize(query)
      .trim();


  if (!q) {

    return allSearchItems()
      .slice(0, 10);
  }


  const terms =
    q.split(/\s+/);


  return allSearchItems()
    .map(
      (item) => {

        const hay =
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
              item.producer,
              item._type
            ]
              .filter(Boolean)
              .join(' ')
          );


        const score =
          terms.reduce(
            (sum, term) =>
              sum +
              (
                hay.includes(term)
                  ? 1
                  : 0
              ),
            0
          ) +
          (
            hay.startsWith(q)
              ? 2
              : 0
          );


        return {
          item,
          score
        };
      }
    )
    .filter(
      (x) => x.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, 30)
    .map(
      (x) => x.item
    );
}


function renderSearchResults(
  query = ''
) {

  const rows =
    searchLocal(query);


  const host =
    $('#searchResults');


  if (!host) return;


  if (!rows.length) {

    host.innerHTML = `
      <div class="search-empty">
        ${esc(
          tr('noResults')
        )}
      </div>
    `;

    return;
  }


  host.innerHTML =
    rows
      .map(
        (item) => {

          let icon =
            'marker';


          if (
            item._kind ===
            'mahalla'
          ) {

            icon =
              'home';

          } else if (
            item._kind ===
            'business'
          ) {

            icon =
              getCategoryIcon(
                item.category
              );

          } else if (
            item._kind ===
            'product'
          ) {

            icon =
              'package';

          } else {

            icon =
              getCategoryIcon(
                item.category
              );
          }


          return `
            <button
              class="search-result"

              data-kind="${item._kind}"

              data-id="${esc(
                String(item.id)
              )}"
            >

              <span class="result-icon">

                <span class="icon">
                  ${svg(icon)}
                </span>

              </span>


              <span class="result-copy">

                <strong>
                  ${esc(item.name)}
                </strong>

                <small>
                  ${esc(
                    item.specialization ||
                    item.industry ||
                    item.sector ||
                    item.address ||
                    item.description ||
                    item.producer ||
                    ''
                  )}
                </small>

              </span>


              <span class="result-type">
                ${esc(item._type)}
              </span>

            </button>
          `;
        }
      )
      .join('');


  $$('.search-result', host)
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const item =
              allSearchItems()
                .find(
                  (x) =>
                    String(x.id) ===
                      button.dataset.id &&
                    x._kind ===
                      button.dataset.kind
                );


            $('#searchDialog')
              .classList
              .add('hidden');


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
   AI
========================================================= */

function renderAISuggestions() {

  const byLang = {

    uz: [
      'Eng ko‘p aholili MFY qaysi?',
      'Tumanda nechta MFY bor?',
      'Korxonalarni xaritada ko‘rsat',
      'Investor uchun umumiy ma’lumot'
    ],

    en: [
      'Which mahalla has the largest population?',
      'How many mahallas are there?',
      'Show businesses on the map',
      'Give me an investor overview'
    ],

    ru: [
      'Какая махалля самая населённая?',
      'Сколько махаллей в районе?',
      'Покажи предприятия',
      'Информация для инвестора'
    ],

    zh: [
      '哪个社区人口最多？',
      '该地区有多少个社区？',
      '在地图上显示企业',
      '给我投资者概览'
    ],

    ar: [
      'ما الحي الأكثر سكاناً؟',
      'كم عدد الأحياء في المنطقة؟',
      'اعرض الشركات على الخريطة',
      'أعطني نظرة عامة للمستثمر'
    ],

    tr: [
      'En kalabalık mahalle hangisi?',
      'İlçede kaç mahalle var?',
      'İşletmeleri haritada göster',
      'Yatırımcı özeti ver'
    ],

    ko: [
      '인구가 가장 많은 마할라는 어디인가요?',
      '지구에 마할라가 몇 개 있나요?',
      '지도에 기업을 표시해 주세요',
      '투자자 개요를 알려 주세요'
    ],

    de: [
      'Welche Mahalla hat die größte Bevölkerung?',
      'Wie viele Mahallas gibt es?',
      'Unternehmen auf der Karte anzeigen',
      'Gib mir einen Investorenüberblick'
    ],

    fr: [
      'Quelle mahalla a la plus grande population ?',
      'Combien de mahallas y a-t-il ?',
      'Afficher les entreprises sur la carte',
      'Donnez-moi un aperçu pour investisseur'
    ],

    es: [
      '¿Qué mahalla tiene más población?',
      '¿Cuántas mahallas hay?',
      'Mostrar empresas en el mapa',
      'Dame un resumen para inversores'
    ]
  };


  const suggestions =
    byLang[state.lang] ||
    byLang.en;


  const host =
    $('#aiSuggestions');


  if (!host) return;


  host.innerHTML =
    suggestions
      .map(
        (text) => `
          <button class="ai-suggestion">
            ${esc(text)}
          </button>
        `
      )
      .join('');


  $$('.ai-suggestion')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          () =>
            askAI(
              item.textContent
            )
        );
      }
    );
}


function ensureAIWelcome() {

  const host =
    $('#aiMessages');


  if (
    host &&
    !host.children.length
  ) {

    addMessage(
      'assistant',
      tr('aiWelcome')
    );
  }
}


function addMessage(
  role,
  text,
  sources = []
) {

  const host =
    $('#aiMessages');


  if (!host) return;


  const el =
    document.createElement(
      'div'
    );


  el.className =
    `message ${role}`;


  el.textContent =
    text;


  if (sources.length) {

    const row =
      document.createElement(
        'div'
      );


    row.className =
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


        row.appendChild(
          badge
        );
      }
    );


    el.appendChild(row);
  }


  host.appendChild(el);

  host.scrollTop =
    host.scrollHeight;
}


function localAI(question) {

  const q =
    normalize(question);


  const d =
    state.data.district || {};


  const mahallas =
    state.data.mahallas || [];


  const functions = {

    uz: {

      count: (n) =>
        `Uchko‘prik tumanidagi tasdiqlangan bazada ${n} ta MFY mavjud.`,

      population: (n) =>
        `Uchko‘prik tumani aholisi ${n} nafar.`,

      top: (name, n) =>
        `Tasdiqlangan ma’lumotlar bo‘yicha eng ko‘p aholi ${name} MFYda: ${n} nafar.`,

      business:
        'Xaritada tashkilot va korxonalar qatlamini yoqdim.',

      investor:
        'Investor rejimida Uchko‘prik tumani aholisi, hududi, mahallalari, tashkilotlari va iqtisodiy ko‘rsatkichlari jamlanadi.',

      found: (name) =>
        `${name} topildi. Uni xaritada ko‘rsatishim mumkin.`,

      unknown:
        'Bu ma’lumot tasdiqlangan bazada hozircha mavjud emas.'
    },


    en: {

      count: (n) =>
        `The verified Uchko‘prik dataset contains ${n} mahallas.`,

      population: (n) =>
        `The district population is ${n}.`,

      top: (name, n) =>
        `${name} has the largest population: ${n} people.`,

      business:
        'I enabled the organizations and businesses layer.',

      investor:
        'Investor Mode combines district population, territory, mahallas, organizations and economic indicators.',

      found: (name) =>
        `I found ${name}. I can show it on the map.`,

      unknown:
        'This information is not currently available in the verified dataset.'
    }
  };


  const f =
    functions[state.lang] ||
    functions.en;


  if (
    /nechta.*(mfy|mahalla)|how many.*mahalla/.test(
      q
    )
  ) {

    return {

      text:
        f.count(
          fmt(
            d.mahallas ||
            mahallas.length
          )
        ),

      sources: [
        tr('sourceOfficial')
      ]
    };
  }


  if (
    /eng.*(kop|ko‘p).*aholi|largest.*population|most populous/.test(
      q
    )
  ) {

    const top =
      [...mahallas]
        .sort(
          (a, b) =>
            Number(
              b.population || 0
            ) -
            Number(
              a.population || 0
            )
        )[0];


    if (top) {

      return {

        text:
          f.top(
            top.name,
            fmt(
              top.population
            )
          ),

        sources: [
          tr('sourceOfficial')
        ],

        focus:
          top
      };
    }
  }


  if (
    /aholi|population/.test(
      q
    )
  ) {

    return {

      text:
        f.population(
          fmt(
            d.population
          )
        ),

      sources: [
        tr('sourceOfficial')
      ]
    };
  }


  if (
    /korxona|tashkilot|business|enterprise|organization/.test(
      q
    )
  ) {

    return {

      text:
        f.business,

      action:
        'business',

      sources: [
        tr('sourceOfficial')
      ]
    };
  }


  if (
    /invest/.test(q)
  ) {

    return {

      text:
        f.investor,

      action:
        'invest',

      sources: [
        tr('sourceOfficial')
      ]
    };
  }


  const hit =
    searchLocal(question)[0];


  if (hit) {

    return {

      text:
        f.found(
          hit.name
        ),

      focus:
        hit,

      sources: [
        hit.verified
          ? tr('sourceOfficial')
          : tr('sourceDemo')
      ]
    };
  }


  return {

    text:
      f.unknown,

    sources: []
  };
}


async function askAI(question) {

  question =
    String(question || '')
      .trim();


  if (!question) return;


  openAI();


  addMessage(
    'user',
    question
  );


  $('#aiInput').value = '';


  addMessage(
    'system',
    state.lang === 'uz'
      ? 'Tahlil qilinmoqda…'
      : 'Analyzing…'
  );


  let answer = null;


  /*
    Render AI backend keyingi bosqichda
    shu yerga ulanadi.
  */

  try {

    const response =
      await fetch(
        '/api/ai',
        {

          method: 'POST',

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


    if (response.ok) {

      const json =
        await response.json();


      if (json?.ok) {

        answer =
          json;
      }
    }

  } catch {
    // Local AI ishlaydi
  }


  const systemMessage =
    $('#aiMessages .message.system:last-child');


  if (systemMessage) {
    systemMessage.remove();
  }


  if (!answer) {

    answer =
      localAI(
        question
      );
  }


  addMessage(
    'assistant',
    answer.text ||
      tr('unknown'),

    answer.sources || []
  );


  if (
    answer.action ===
    'business'
  ) {

    state.activeCategories.add(
      'business'
    );

    renderCategories();

    renderMarkers();

    openPanel('map');

    fitDistrict();
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

    const hit =
      allSearchItems()
        .find(
          (x) =>
            String(x.id) ===
            String(
              answer.focus.id
            )
        ) ||
      answer.focus;


    if (
      Number.isFinite(
        Number(hit.lat)
      ) &&
      Number.isFinite(
        Number(hit.lng)
      )
    ) {

      setTimeout(
        () =>
          openDetail(
            hit,
            hit._kind ||
              hit.type ||
              'mahalla'
          ),
        250
      );
    }
  }


  if (
    answer.speak &&
    'speechSynthesis' in window
  ) {

    speak(
      answer.text
    );
  }
}


function openAI() {

  $('#aiPanel')
    ?.classList
    .remove('hidden');

  ensureAIWelcome();
}


function speak(text) {

  speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(
      text
    );


  utterance.lang = {

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

  }[state.lang] || 'en-US';


  speechSynthesis.speak(
    utterance
  );
}


function setupVoice() {

  const SR =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SR) return;


  const recognition =
    new SR();


  recognition.interimResults =
    false;

  recognition.continuous =
    false;


  recognition.onstart =
    () => {

      $('#voiceBtn')
        ?.classList
        .add('listening');


      if ($('#aiInput')) {

        $('#aiInput').placeholder =
          tr('listening');
      }
    };


  recognition.onend =
    () => {

      $('#voiceBtn')
        ?.classList
        .remove('listening');


      if ($('#aiInput')) {

        $('#aiInput').placeholder =
          tr('askPlaceholder');
      }
    };


  recognition.onerror =
    () =>
      recognition.onend();


  recognition.onresult =
    (event) => {

      const question =
        event.results[0][0]
          .transcript;


      $('#aiInput').value =
        question;


      askAI(question);
    };


  state.voiceRecognition =
    recognition;
}


function startVoice() {

  if (
    !state.voiceRecognition
  ) {

    toast(
      tr('voiceUnsupported')
    );

    return;
  }


  state.voiceRecognition.lang = {

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

  }[state.lang] || 'en-US';


  state.voiceRecognition.start();
}


/* =========================================================
   INVESTOR
========================================================= */

function openInvestorMode() {

  openPanel('invest');


  state.activeCategories.add(
    'business'
  );


  renderCategories();

  renderMarkers();


  if (
    state.map &&
    !document.documentElement.classList.contains(
      'reduce-motion'
    )
  ) {

    state.map.easeTo({

      pitch: 48,

      bearing: -7,

      duration: 900
    });
  }
}


function closeInvestorMode() {

  openPanel('explore');


  if (state.map) {

    state.map.easeTo({

      pitch: 15,

      bearing: 0,

      duration: 600
    });
  }
}


/* =========================================================
   PRESENTATION
========================================================= */

const scenes = () => [

  {

    eyebrow:
      'DIGITAL DISTRICT',

    title:
      tr('presentationTitle'),

    text:
      tr('presentationIntro'),

    center:
      [71.045, 40.54],

    zoom:
      9.7,

    pitch:
      25,

    bearing:
      0
  },


  {

    eyebrow:
      tr('mahallas'),

    title:
      tr('presentationMahallas'),

    text:
      tr('presentationMahallasText'),

    center:
      [71.045, 40.54],

    zoom:
      10.4,

    pitch:
      42,

    bearing:
      -8
  },


  {

    eyebrow:
      tr('officialData'),

    title:
      tr('presentationPopulation'),

    text:
      tr('presentationPopulationText'),

    center:
      [71.03, 40.54],

    zoom:
      10.8,

    pitch:
      50,

    bearing:
      9
  },


  {

    eyebrow:
      tr('investorMode'),

    title:
      tr('presentationEconomy'),

    text:
      tr('presentationEconomyText'),

    center:
      [71.07, 40.53],

    zoom:
      11.2,

    pitch:
      55,

    bearing:
      -12
  },


  {

    eyebrow:
      tr('madeIn'),

    title:
      tr('presentationProducts'),

    text:
      tr('presentationProductsText'),

    center:
      [71.01, 40.50],

    zoom:
      11,

    pitch:
      48,

    bearing:
      13
  },


  {

    eyebrow:
      'AI · MAP · DATA',

    title:
      tr('presentationFuture'),

    text:
      tr('presentationFutureText'),

    center:
      [71.045, 40.54],

    zoom:
      9.9,

    pitch:
      58,

    bearing:
      0
  }
];


function openPresentation() {

  $('#presentationOverlay')
    ?.classList
    .remove('hidden');


  state.presentation.index =
    0;

  state.presentation.playing =
    true;


  $('#scenePlay').innerHTML = `
    <span class="icon">
      ${svg('pause')}
    </span>
  `;


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
          25,

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
    .add('hidden');


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


  $('#sceneEyebrow').textContent =
    scene.eyebrow;


  $('#sceneTitle').textContent =
    scene.title;


  $('#sceneText').textContent =
    scene.text;


  $('#sceneCounter').textContent =
    `${
      state.presentation.index +
      1
    } / ${all.length}`;


  if (
    state.presentation.map
  ) {

    state.presentation.map.flyTo({

      center:
        scene.center,

      zoom:
        scene.zoom,

      pitch:
        scene.pitch,

      bearing:
        scene.bearing,

      duration:
        document.documentElement.classList.contains(
          'reduce-motion'
        )
          ? 0
          : 1800,

      essential:
        true
    });
  }
}


function scheduleScene() {

  clearTimeout(
    state.presentation.timer
  );


  if (
    state.presentation.playing
  ) {

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


  $('#scenePlay').innerHTML = `
    <span class="icon">
      ${svg(
        state.presentation.playing
          ? 'pause'
          : 'play'
      )}
    </span>
  `;


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


  document.documentElement.classList.toggle(
    'reduce-motion',
    !!prefs.reduceMotion
  );


  document.documentElement.classList.toggle(
    'reduce-transparency',
    !!prefs.reduceTransparency
  );


  document.documentElement.classList.toggle(
    'high-contrast',
    !!prefs.highContrast
  );


  document.documentElement.style.setProperty(
    '--font-scale',
    prefs.fontScale || 1
  );


  if ($('#lightModeToggle')) {

    $('#lightModeToggle').checked =
      !!prefs.light;
  }


  if ($('#reduceMotionToggle')) {

    $('#reduceMotionToggle').checked =
      !!prefs.reduceMotion;
  }


  if ($('#reduceTransparencyToggle')) {

    $('#reduceTransparencyToggle').checked =
      !!prefs.reduceTransparency;
  }


  if ($('#highContrastToggle')) {

    $('#highContrastToggle').checked =
      !!prefs.highContrast;
  }
}


function savePrefs() {

  const prefs = {

    light:
      $('#lightModeToggle')
        ?.checked ||
      false,

    reduceMotion:
      $('#reduceMotionToggle')
        ?.checked ||
      false,

    reduceTransparency:
      $('#reduceTransparencyToggle')
        ?.checked ||
      false,

    highContrast:
      $('#highContrastToggle')
        ?.checked ||
      false,

    fontScale:
      Number(
        getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          '--font-scale'
        )
      ) || 1
  };


  localStorage.setItem(
    'uchkoprik-prefs',
    JSON.stringify(prefs)
  );


  loadPrefs();
}


function setFont(key) {

  const scale = {

    small: 0.92,

    normal: 1,

    large: 1.12

  }[key] || 1;


  document.documentElement.style.setProperty(
    '--font-scale',
    scale
  );


  $$('[data-font]')
    .forEach(
      (item) => {

        item.classList.toggle(
          'active',
          item.dataset.font ===
            key
        );
      }
    );


  savePrefs();
}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

  $('#languageBtn')
    ?.addEventListener(
      'click',
      () =>
        openSheet(
          'languageSheet'
        )
    );


  $('#accessibilityBtn')
    ?.addEventListener(
      'click',
      () =>
        openSheet(
          'accessibilitySheet'
        )
    );


  $$('[data-sheet-close]')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          () =>
            closeSheet(
              item.dataset.sheetClose
            )
        );
      }
    );


  $$('.sheet-backdrop')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          (event) => {

            if (
              event.target === item
            ) {

              item.classList.add(
                'hidden'
              );
            }
          }
        );
      }
    );


  $('#searchOpen')
    ?.addEventListener(
      'click',
      () => {

        $('#searchDialog')
          ?.classList
          .remove('hidden');


        renderSearchResults();


        setTimeout(
          () =>
            $('#globalSearch')
              ?.focus(),
          50
        );
      }
    );


  $('#searchClose')
    ?.addEventListener(
      'click',
      () =>
        $('#searchDialog')
          ?.classList
          .add('hidden')
    );


  $('#globalSearch')
    ?.addEventListener(
      'input',
      (event) =>
        renderSearchResults(
          event.target.value
        )
    );


  $('#fitDistrict')
    ?.addEventListener(
      'click',
      () =>
        fitDistrict()
    );


  $('#exploreClose')
    ?.addEventListener(
      'click',
      () =>
        $('#explorePanel')
          ?.classList
          .add('hidden')
    );


  $$('.highlight-card')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          () => {

            if (
              item.dataset.mode ===
              'invest'
            ) {

              openInvestorMode();

            } else {

              openPanel(
                item.dataset.mode
              );
            }
          }
        );
      }
    );


  $$('.dock-item')
    .forEach(
      (item) => {

        item.addEventListener(
          'click',
          () => {

            const nav =
              item.dataset.nav;


            if (nav === 'ai') {

              openAI();

            } else if (
              nav === 'invest'
            ) {

              openInvestorMode();

            } else if (
              nav === 'map'
            ) {

              openPanel(
                'explore'
              );


              $('#explorePanel')
                ?.classList
                .add('hidden');


              fitDistrict();

            } else {

              openPanel(nav);
            }
          }
        );
      }
    );


  $('#investorClose')
    ?.addEventListener(
      'click',
      closeInvestorMode
    );


  $('#productsClose')
    ?.addEventListener(
      'click',
      () =>
        openPanel(
          'explore'
        )
    );


  $('#districtClose')
    ?.addEventListener(
      'click',
      () =>
        openPanel(
          'explore'
        )
    );


  $('#showBusinesses')
    ?.addEventListener(
      'click',
      () => {

        state.activeCategories.add(
          'business'
        );


        renderCategories();

        renderMarkers();

        fitDistrict();
      }
    );


  $('#askInvestment')
    ?.addEventListener(
      'click',
      () =>
        askAI(
          state.lang === 'uz'
            ? 'Uchko‘prik investitsiya imkoniyatlari haqida umumiy ma’lumot ber'
            : 'Give me an investor overview of Uchko‘prik'
        )
    );


  $('#detailClose')
    ?.addEventListener(
      'click',
      closeDetail
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


  $('#detailDirections')
    ?.addEventListener(
      'click',
      () => {

        const item =
          state.selected?.item;


        if (
          Number.isFinite(
            Number(item?.lat)
          ) &&
          Number.isFinite(
            Number(item?.lng)
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


  $('#detailShare')
    ?.addEventListener(
      'click',
      async () => {

        const item =
          state.selected?.item;


        const url =
          location.href;


        try {

          if (
            navigator.share
          ) {

            await navigator.share({
              title:
                item?.name,
              url
            });

          } else {

            await navigator.clipboard.writeText(
              url
            );


            toast(
              tr('copied')
            );
          }

        } catch {
          // ignore
        }
      }
    );


  $('#aiOrb')
    ?.addEventListener(
      'click',
      openAI
    );


  $('#aiClose')
    ?.addEventListener(
      'click',
      () =>
        $('#aiPanel')
          ?.classList
          .add('hidden')
    );


  $('#aiForm')
    ?.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();


        askAI(
          $('#aiInput').value
        );
      }
    );


  $('#voiceBtn')
    ?.addEventListener(
      'click',
      startVoice
    );


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
      () =>
        sceneStep(-1)
    );


  $('#sceneNext')
    ?.addEventListener(
      'click',
      () =>
        sceneStep(1)
    );


  $('#scenePlay')
    ?.addEventListener(
      'click',
      togglePresentationPlay
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
      (item) => {

        item.addEventListener(
          'click',
          () =>
            setFont(
              item.dataset.font
            )
        );
      }
    );


  document.addEventListener(
    'keydown',
    (event) => {

      if (
        (
          event.metaKey ||
          event.ctrlKey
        ) &&
        event.key.toLowerCase() ===
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
          .add('hidden');


        $('#aiPanel')
          ?.classList
          .add('hidden');


        closeDetail();


        if (
          !$('#presentationOverlay')
            ?.classList
            .contains('hidden')
        ) {

          closePresentation();
        }
      }


      if (
        !$('#presentationOverlay')
          ?.classList
          .contains('hidden')
      ) {

        if (
          event.key ===
          'ArrowRight'
        ) {

          sceneStep(1);
        }


        if (
          event.key ===
          'ArrowLeft'
        ) {

          sceneStep(-1);
        }


        if (
          event.key === ' '
        ) {

          event.preventDefault();

          togglePresentationPlay();
        }
      }
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
    'Uchko‘prik Digital District ishga tushmoqda...'
  );


  await loadData();


  applyLanguage();

  renderLanguages();

  setupEvents();

  setupVoice();

  initMap();

  ensureAIWelcome();


  if (
    'serviceWorker' in navigator
  ) {

    navigator.serviceWorker
      .register('/sw.js')
      .catch(
        (error) =>
          console.warn(
            'Service Worker:',
            error
          )
      );
  }


  console.log(
    'Uchko‘prik Digital District tayyor.'
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
