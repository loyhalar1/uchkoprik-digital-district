PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'marker',
  kind TEXT NOT NULL DEFAULT 'place',
  color TEXT NOT NULL DEFAULT '#65e5ff',
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS mahallas (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  official_name TEXT,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  population INTEGER,
  households INTEGER,
  families INTEGER,
  specialization TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK(verified IN (0,1)),
  source TEXT,
  updated_at TEXT,
  private_contact TEXT,
  private_phone TEXT,
  admin_notes TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'place',
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  lat REAL,
  lng REAL,
  description TEXT,
  address TEXT,
  website TEXT,
  opening_hours TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK(verified IN (0,1)),
  source TEXT,
  updated_at TEXT,
  private_contact TEXT,
  private_phone TEXT,
  admin_notes TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(category) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'business',
  category TEXT NOT NULL DEFAULT 'business',
  name TEXT NOT NULL,
  inn TEXT,
  mahalla_id INTEGER,
  address TEXT,
  lat REAL,
  lng REAL,
  industry TEXT,
  description TEXT,
  website TEXT,
  email_public TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK(verified IN (0,1)),
  source TEXT,
  updated_at TEXT,
  private_contact TEXT,
  private_phone TEXT,
  admin_notes TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(category) REFERENCES categories(id),
  FOREIGN KEY(mahalla_id) REFERENCES mahallas(id)
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  producer TEXT,
  producer_business_id TEXT,
  description TEXT,
  image_key TEXT,
  website TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK(verified IN (0,1)),
  source TEXT,
  updated_at TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(producer_business_id) REFERENCES businesses(id)
);

CREATE TABLE IF NOT EXISTS district_stats (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  unit TEXT,
  group_name TEXT,
  label TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK(verified IN (0,1)),
  source TEXT,
  updated_at TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1))
);

CREATE TABLE IF NOT EXISTS district_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL,
  metric_key TEXT NOT NULL,
  value REAL,
  unit TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  source TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(period, metric_key)
);

CREATE TABLE IF NOT EXISTS translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  lang TEXT NOT NULL CHECK(lang IN ('uz','en','ru','zh','ar','tr','ko','de','fr','es')),
  value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','reviewed','approved')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(entity_type, entity_id, field_name, lang)
);

CREATE TABLE IF NOT EXISTS translation_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  approved INTEGER NOT NULL DEFAULT 0,
  context TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(source_lang, target_lang, source_text)
);

CREATE TABLE IF NOT EXISTS presentation_scenes (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL,
  title_key TEXT NOT NULL,
  text_key TEXT NOT NULL,
  center_lng REAL,
  center_lat REAL,
  zoom REAL,
  pitch REAL,
  bearing REAL,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  entity_type TEXT,
  entity_id TEXT,
  alt_uz TEXT,
  alt_en TEXT,
  credit TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  url TEXT,
  contact TEXT,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  actor TEXT,
  details_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_mahallas_slug ON mahallas(slug);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category, active);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category, active);
CREATE INDEX IF NOT EXISTS idx_businesses_mahalla ON businesses(mahalla_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_translations_entity ON translations(entity_type, entity_id, lang);
CREATE INDEX IF NOT EXISTS idx_history_metric ON district_history(metric_key, period);
