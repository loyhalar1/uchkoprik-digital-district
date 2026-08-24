/**
 * Uchko‘prik Digital District — Tavsiflar boshqaruvi
 * Mavjud admin.js ga tegmasdan description ustunlarini boshqaradi.
 */

(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);

  const config = {
    mahallas: {
      title: 'MFYlar',
      table: 'mahallas',
      id: 'id',
      name: row => row.name || row.official_name || 'Noma’lum MFY',
      leader: row => row.chairman || '',
      select: 'id,name,official_name,chairman,description'
    },

    organizations: {
      title: 'Tashkilotlar',
      table: 'organizations',
      id: 'id',
      name: row => row.name || 'Noma’lum tashkilot',
      leader: row => row.responsible_person || '',
      select: 'id,name,responsible_person,description,activity'
    },

    economicZones: {
      title: 'Iqtisodiy zonalar',
      table: 'economic_zone_projects',
      id: 'id',
      name: row => row.company_name || row.zone_name || 'Noma’lum loyiha',
      leader: row => row.executive_director || '',
      select: 'id,company_name,zone_name,executive_director,description,activity_type'
    }
  };

  const state = {
    kind: 'mahallas',
    rows: [],
    filtered: [],
    selected: null,
    loading: false
  };

  function esc(value) {
    return String(value ?? '')
      .replace(
        /[&<>'"]/g,
        c => ({
          '&':'&amp;',
          '<':'&lt;',
          '>':'&gt;',
          "'":'&#39;',
          '"':'&quot;'
        }[c])
      );
  }

  function toast(message, error = false) {
    const host = $('#toastHost');

    if (!host) {
      console.log(message);
      return;
    }

    const el = document.createElement('div');
    el.className = `toast ${error ? 'error' : 'ok'}`;
    el.textContent = message;
    host.appendChild(el);

    setTimeout(() => el.remove(), 3000);
  }

  function inject() {
    if ($('#descriptionManagerButton')) return;

    const button = document.createElement('button');
    button.id = 'descriptionManagerButton';
    button.type = 'button';
    button.className = 'description-manager-button';
    button.innerHTML = `
      <span class="description-manager-button-icon">✦</span>
      <span>Tavsiflar</span>
    `;
    document.body.appendChild(button);

    const overlay = document.createElement('section');
    overlay.id = 'descriptionManagerOverlay';
    overlay.className = 'description-manager-overlay hidden';
    overlay.innerHTML = `
      <div class="description-manager-window glass">
        <header class="description-manager-head">
          <div>
            <span class="description-manager-eyebrow">CONTENT MANAGER</span>
            <h2>Tavsiflar</h2>
            <p>Nuqta oynasi va ovozli o‘qish uchun matnlar.</p>
          </div>

          <button
            id="descriptionManagerClose"
            class="description-manager-close"
            type="button"
            aria-label="Yopish"
          >×</button>
        </header>

        <div class="description-manager-tabs">
          <button type="button" data-description-kind="mahallas" class="active">MFYlar</button>
          <button type="button" data-description-kind="organizations">Tashkilotlar</button>
          <button type="button" data-description-kind="economicZones">Iqtisodiy zonalar</button>
        </div>

        <div class="description-manager-grid">
          <aside class="description-manager-list-panel">
            <label class="description-manager-search">
              <span>Qidiruv</span>
              <input
                id="descriptionManagerSearch"
                type="search"
                placeholder="Nom yoki rahbar..."
              >
            </label>

            <div id="descriptionManagerCount" class="description-manager-count">0 ta</div>
            <div id="descriptionManagerList" class="description-manager-list"></div>
          </aside>

          <main class="description-manager-editor">
            <div id="descriptionManagerEmpty" class="description-manager-empty">
              <strong>Yozuvni tanlang</strong>
              <span>Chap tomondan MFY, tashkilot yoki iqtisodiy zona tanlang.</span>
            </div>

            <form id="descriptionManagerForm" class="hidden">
              <input id="descriptionManagerId" type="hidden">

              <div class="description-manager-selected">
                <span id="descriptionManagerType">—</span>
                <h3 id="descriptionManagerName">—</h3>
                <small id="descriptionManagerLeader">—</small>
              </div>

              <label class="description-manager-field">
                <span>Tavsif</span>
                <textarea
                  id="descriptionManagerDescription"
                  rows="12"
                  maxlength="3000"
                  placeholder="Foydalanuvchiga tushunarli, qisqa va aniq tavsif yozing..."
                ></textarea>
                <small>
                  AI aynan nomi, rahbari va shu tavsifni o‘qib beradi.
                </small>
              </label>

              <div class="description-manager-actions">
                <span id="descriptionManagerChars">0 / 3000</span>
                <button type="submit">Saqlash</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function configNow() {
    return config[state.kind];
  }

  async function loadRows() {
    if (!window.sb || state.loading) return;

    state.loading = true;
    state.selected = null;

    const list = $('#descriptionManagerList');
    if (list) {
      list.innerHTML = `
        <div class="description-manager-loading">
          Ma’lumotlar yuklanmoqda...
        </div>
      `;
    }

    try {
      const cfg = configNow();

      const { data, error } = await window.sb
        .from(cfg.table)
        .select(cfg.select)
        .order(
          state.kind === 'economicZones'
            ? 'company_name'
            : 'name',
          { ascending: true }
        );

      if (error) throw error;

      state.rows = data || [];
      filterRows();

    } catch (error) {
      console.error('Description manager:', error);

      const message = String(error?.message || error);

      $('#descriptionManagerList').innerHTML = `
        <div class="description-manager-error">
          <strong>Tavsif maydoni topilmadi.</strong>
          <span>
            Avval Supabase’da
            <code>sql/description_fields.sql</code>
            ni ishga tushiring.
          </span>
        </div>
      `;

      toast(
        message.includes('description')
          ? 'Supabase description ustuni hali yaratilmagan.'
          : 'Ma’lumotlarni yuklab bo‘lmadi.',
        true
      );

    } finally {
      state.loading = false;
      renderEditor();
    }
  }

  function filterRows() {
    const input = $('#descriptionManagerSearch');
    const query = String(input?.value || '').trim().toLowerCase();
    const cfg = configNow();

    state.filtered = state.rows.filter(row => {
      if (!query) return true;

      return [
        cfg.name(row),
        cfg.leader(row),
        row.description,
        row.activity,
        row.activity_type
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query);
    });

    renderList();
  }

  function renderList() {
    const host = $('#descriptionManagerList');
    const count = $('#descriptionManagerCount');
    const cfg = configNow();

    if (!host) return;

    if (count) {
      count.textContent = `${state.filtered.length} ta`;
    }

    if (!state.filtered.length) {
      host.innerHTML = `
        <div class="description-manager-empty-list">
          Natija topilmadi.
        </div>
      `;
      return;
    }

    host.innerHTML = state.filtered
      .map(row => {
        const id = row[cfg.id];
        const active =
          state.selected &&
          String(state.selected[cfg.id]) === String(id);

        const fallbackDescription =
          row.description ||
          row.activity ||
          row.activity_type ||
          '';

        return `
          <button
            type="button"
            class="description-manager-list-item ${active ? 'active' : ''}"
            data-description-id="${esc(id)}"
          >
            <span>
              <strong>${esc(cfg.name(row))}</strong>
              <small>${esc(cfg.leader(row) || 'Rahbar ko‘rsatilmagan')}</small>
            </span>

            <i class="${fallbackDescription ? 'ready' : ''}">
              ${fallbackDescription ? 'Tavsif bor' : 'Tavsif yo‘q'}
            </i>
          </button>
        `;
      })
      .join('');

    host.querySelectorAll('[data-description-id]')
      .forEach(button => {
        button.addEventListener('click', () => {
          const id = button.dataset.descriptionId;

          state.selected =
            state.rows.find(
              row =>
                String(row[cfg.id]) ===
                String(id)
            ) || null;

          renderList();
          renderEditor();
        });
      });
  }

  function renderEditor() {
    const empty = $('#descriptionManagerEmpty');
    const form = $('#descriptionManagerForm');
    const cfg = configNow();

    if (!state.selected) {
      empty?.classList.remove('hidden');
      form?.classList.add('hidden');
      return;
    }

    empty?.classList.add('hidden');
    form?.classList.remove('hidden');

    const description =
      state.selected.description ||
      state.selected.activity ||
      state.selected.activity_type ||
      '';

    $('#descriptionManagerId').value =
      state.selected[cfg.id];

    $('#descriptionManagerType').textContent =
      cfg.title;

    $('#descriptionManagerName').textContent =
      cfg.name(state.selected);

    $('#descriptionManagerLeader').textContent =
      cfg.leader(state.selected) ||
      'Rahbar ko‘rsatilmagan';

    $('#descriptionManagerDescription').value =
      description;

    updateChars();
  }

  function updateChars() {
    const textarea = $('#descriptionManagerDescription');
    const counter = $('#descriptionManagerChars');

    if (!textarea || !counter) return;

    counter.textContent =
      `${textarea.value.length} / 3000`;
  }

  async function saveDescription(event) {
    event.preventDefault();

    if (!state.selected) return;

    const cfg = configNow();
    const id = state.selected[cfg.id];

    const description =
      String(
        $('#descriptionManagerDescription')?.value ||
        ''
      ).trim();

    const submit =
      $('#descriptionManagerForm button[type="submit"]');

    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Saqlanmoqda...';
    }

    try {
      const { error } = await window.sb
        .from(cfg.table)
        .update({
          description:
            description || null
        })
        .eq(cfg.id, id);

      if (error) throw error;

      state.selected.description =
        description || null;

      const original =
        state.rows.find(
          row =>
            String(row[cfg.id]) ===
            String(id)
        );

      if (original) {
        original.description =
          description || null;
      }

      renderList();
      toast('Tavsif saqlandi.');

    } catch (error) {
      console.error('Description save:', error);
      toast(
        'Tavsifni saqlab bo‘lmadi.',
        true
      );

    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Saqlash';
      }
    }
  }

  function openManager() {
    const overlay = $('#descriptionManagerOverlay');
    overlay?.classList.remove('hidden');
    loadRows();
  }

  function closeManager() {
    $('#descriptionManagerOverlay')
      ?.classList.add('hidden');
  }

  function bind() {
    $('#descriptionManagerButton')
      ?.addEventListener(
        'click',
        openManager
      );

    $('#descriptionManagerClose')
      ?.addEventListener(
        'click',
        closeManager
      );

    $('#descriptionManagerOverlay')
      ?.addEventListener(
        'click',
        event => {
          if (
            event.target.id ===
            'descriptionManagerOverlay'
          ) {
            closeManager();
          }
        }
      );

    document
      .querySelectorAll('[data-description-kind]')
      .forEach(button => {
        button.addEventListener(
          'click',
          () => {
            state.kind =
              button.dataset.descriptionKind;

            state.selected = null;

            document
              .querySelectorAll('[data-description-kind]')
              .forEach(item =>
                item.classList.toggle(
                  'active',
                  item === button
                )
              );

            $('#descriptionManagerSearch').value = '';
            loadRows();
          }
        );
      });

    $('#descriptionManagerSearch')
      ?.addEventListener(
        'input',
        filterRows
      );

    $('#descriptionManagerDescription')
      ?.addEventListener(
        'input',
        updateChars
      );

    $('#descriptionManagerForm')
      ?.addEventListener(
        'submit',
        saveDescription
      );

    document.addEventListener(
      'keydown',
      event => {
        if (
          event.key === 'Escape' &&
          !$('#descriptionManagerOverlay')
            ?.classList.contains('hidden')
        ) {
          closeManager();
        }
      }
    );
  }

  function init() {
    inject();
    bind();
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
