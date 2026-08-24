(() => {
  'use strict';

  const COPY = {
    uz: {
      button: 'SYSONE haqida',
      kicker: 'TECHNOLOGY PARTNER',
      lead: 'Uchko‘prik Digital District platformasining dizayni, dasturiy arxitekturasi, AI tajribasi va raqamli taqdimot tizimlari SYSONE tomonidan ishlab chiqilgan.',
      projectLabel: 'Platforma',
      projectText: 'Interaktiv xarita, ma’lumotlar tizimi, ko‘p tillilik, AI assistent va premium foydalanuvchi tajribasi yagona raqamli mahsulotga birlashtirilgan.',
      technology: 'Technology',
      technologyText: 'Frontend, backend, ma’lumotlar oqimi, integratsiyalar va platforma arxitekturasi.',
      design: 'Design',
      designText: 'Premium UI/UX, Liquid Glass vizual tizimi, motion va interaktiv xarita tajribasi.',
      ai: 'AI Experience',
      aiText: 'Tasdiqlangan tuman ma’lumotlariga tayangan matnli va ovozli AI tajribasi.',
      support: 'Texnologik qo‘llab-quvvatlash',
      supportValue: 'SYSONE tomonidan',
      footer: 'Uchko‘prik Digital District uchun product design, engineering va AI tajribasi.',
      done: 'Yopish',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    en: {
      button: 'About SYSONE',
      kicker: 'TECHNOLOGY PARTNER',
      lead: 'The design, software architecture, AI experience and digital presentation systems of Uchko‘prik Digital District were created by SYSONE.',
      projectLabel: 'Platform',
      projectText: 'Interactive mapping, district data, multilingual access, AI assistance and a premium user experience are unified in one digital product.',
      technology: 'Technology',
      technologyText: 'Frontend, backend, data flows, integrations and platform architecture.',
      design: 'Design',
      designText: 'Premium UI/UX, Liquid Glass visual language, motion and interactive map experience.',
      ai: 'AI Experience',
      aiText: 'Text and voice AI experience grounded in verified district data.',
      support: 'Technology support',
      supportValue: 'Provided by SYSONE',
      footer: 'Product design, engineering and AI experience for Uchko‘prik Digital District.',
      done: 'Close',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    ru: {
      button: 'О SYSONE',
      kicker: 'ТЕХНОЛОГИЧЕСКИЙ ПАРТНЁР',
      lead: 'Дизайн, программная архитектура, AI-опыт и цифровая презентационная система Uchko‘prik Digital District разработаны SYSONE.',
      projectLabel: 'Платформа',
      projectText: 'Интерактивная карта, данные района, многоязычный доступ, AI-ассистент и премиальный пользовательский опыт объединены в одном цифровом продукте.',
      technology: 'Технологии',
      technologyText: 'Frontend, backend, потоки данных, интеграции и архитектура платформы.',
      design: 'Дизайн',
      designText: 'Премиальный UI/UX, визуальная система Liquid Glass, анимации и интерактивная карта.',
      ai: 'AI Experience',
      aiText: 'Текстовый и голосовой AI, опирающийся на проверенные данные района.',
      support: 'Технологическая поддержка',
      supportValue: 'Предоставляется SYSONE',
      footer: 'Product design, engineering и AI-опыт для Uchko‘prik Digital District.',
      done: 'Закрыть',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    zh: {
      button: '关于 SYSONE',
      kicker: '技术合作伙伴',
      lead: 'Uchko‘prik Digital District 的设计、软件架构、AI 体验和数字演示系统由 SYSONE 打造。',
      projectLabel: '平台',
      projectText: '交互式地图、区域数据、多语言访问、AI 助手和高品质用户体验被整合为一个数字产品。',
      technology: '技术',
      technologyText: '前端、后端、数据流、系统集成与平台架构。',
      design: '设计',
      designText: '高品质 UI/UX、Liquid Glass 视觉语言、动效与交互地图体验。',
      ai: 'AI 体验',
      aiText: '基于已验证区域数据的文本与语音 AI 体验。',
      support: '技术支持',
      supportValue: '由 SYSONE 提供',
      footer: '为 Uchko‘prik Digital District 提供产品设计、工程与 AI 体验。',
      done: '关闭',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    ar: {
      button: 'حول SYSONE',
      kicker: 'الشريك التقني',
      lead: 'تم تطوير التصميم والبنية البرمجية وتجربة الذكاء الاصطناعي ونظام العروض الرقمية لمنصة Uchko‘prik Digital District بواسطة SYSONE.',
      projectLabel: 'المنصة',
      projectText: 'تجمع المنصة الخريطة التفاعلية وبيانات المنطقة وتعدد اللغات ومساعد الذكاء الاصطناعي وتجربة استخدام متميزة في منتج رقمي واحد.',
      technology: 'التقنية',
      technologyText: 'الواجهة الأمامية والخلفية وتدفق البيانات والتكاملات وهندسة المنصة.',
      design: 'التصميم',
      designText: 'واجهة وتجربة استخدام متميزة، ونظام Liquid Glass، والحركة وتجربة الخريطة التفاعلية.',
      ai: 'تجربة الذكاء الاصطناعي',
      aiText: 'تجربة نصية وصوتية تعتمد على بيانات المنطقة الموثقة.',
      support: 'الدعم التقني',
      supportValue: 'مقدم من SYSONE',
      footer: 'تصميم المنتج والهندسة وتجربة الذكاء الاصطناعي لمنصة Uchko‘prik Digital District.',
      done: 'إغلاق',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    tr: {
      button: 'SYSONE hakkında',
      kicker: 'TEKNOLOJİ ORTAĞI',
      lead: 'Uchko‘prik Digital District platformasının tasarımı, yazılım mimarisi, AI deneyimi ve dijital sunum sistemleri SYSONE tarafından geliştirildi.',
      projectLabel: 'Platform',
      projectText: 'Etkileşimli harita, bölge verileri, çok dilli erişim, AI asistanı ve premium kullanıcı deneyimi tek bir dijital üründe birleştirildi.',
      technology: 'Teknoloji',
      technologyText: 'Frontend, backend, veri akışları, entegrasyonlar ve platform mimarisi.',
      design: 'Tasarım',
      designText: 'Premium UI/UX, Liquid Glass görsel dili, hareket ve etkileşimli harita deneyimi.',
      ai: 'AI Deneyimi',
      aiText: 'Doğrulanmış bölge verilerine dayalı metin ve ses AI deneyimi.',
      support: 'Teknoloji desteği',
      supportValue: 'SYSONE tarafından',
      footer: 'Uchko‘prik Digital District için ürün tasarımı, mühendislik ve AI deneyimi.',
      done: 'Kapat',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    ko: {
      button: 'SYSONE 소개',
      kicker: '기술 파트너',
      lead: 'Uchko‘prik Digital District의 디자인, 소프트웨어 아키텍처, AI 경험 및 디지털 프레젠테이션 시스템은 SYSONE이 개발했습니다.',
      projectLabel: '플랫폼',
      projectText: '인터랙티브 지도, 지역 데이터, 다국어 접근, AI 어시스턴트와 프리미엄 사용자 경험을 하나의 디지털 제품으로 통합했습니다.',
      technology: '기술',
      technologyText: '프론트엔드, 백엔드, 데이터 흐름, 통합 및 플랫폼 아키텍처.',
      design: '디자인',
      designText: '프리미엄 UI/UX, Liquid Glass 비주얼 시스템, 모션 및 인터랙티브 지도 경험.',
      ai: 'AI 경험',
      aiText: '검증된 지역 데이터를 기반으로 하는 텍스트 및 음성 AI 경험.',
      support: '기술 지원',
      supportValue: 'SYSONE 제공',
      footer: 'Uchko‘prik Digital District를 위한 제품 디자인, 엔지니어링 및 AI 경험.',
      done: '닫기',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    de: {
      button: 'Über SYSONE',
      kicker: 'TECHNOLOGIEPARTNER',
      lead: 'Design, Softwarearchitektur, AI-Erlebnis und digitale Präsentationssysteme von Uchko‘prik Digital District wurden von SYSONE entwickelt.',
      projectLabel: 'Plattform',
      projectText: 'Interaktive Karte, Bezirksdaten, Mehrsprachigkeit, AI-Assistent und Premium-Nutzererlebnis sind in einem digitalen Produkt vereint.',
      technology: 'Technologie',
      technologyText: 'Frontend, Backend, Datenflüsse, Integrationen und Plattformarchitektur.',
      design: 'Design',
      designText: 'Premium UI/UX, Liquid-Glass-Visuelsystem, Motion und interaktives Kartenerlebnis.',
      ai: 'AI Experience',
      aiText: 'Text- und Sprach-AI auf Basis verifizierter Bezirksdaten.',
      support: 'Technischer Support',
      supportValue: 'Bereitgestellt von SYSONE',
      footer: 'Product Design, Engineering und AI Experience für Uchko‘prik Digital District.',
      done: 'Schließen',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    fr: {
      button: 'À propos de SYSONE',
      kicker: 'PARTENAIRE TECHNOLOGIQUE',
      lead: 'Le design, l’architecture logicielle, l’expérience AI et les systèmes de présentation numérique de Uchko‘prik Digital District ont été développés par SYSONE.',
      projectLabel: 'Plateforme',
      projectText: 'Carte interactive, données du district, accès multilingue, assistant AI et expérience premium sont réunis dans un seul produit numérique.',
      technology: 'Technologie',
      technologyText: 'Frontend, backend, flux de données, intégrations et architecture de plateforme.',
      design: 'Design',
      designText: 'UI/UX premium, langage visuel Liquid Glass, motion et expérience de carte interactive.',
      ai: 'Expérience AI',
      aiText: 'Expérience AI texte et voix fondée sur des données vérifiées du district.',
      support: 'Support technologique',
      supportValue: 'Assuré par SYSONE',
      footer: 'Product design, engineering et expérience AI pour Uchko‘prik Digital District.',
      done: 'Fermer',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    },

    es: {
      button: 'Acerca de SYSONE',
      kicker: 'SOCIO TECNOLÓGICO',
      lead: 'El diseño, la arquitectura de software, la experiencia AI y los sistemas de presentación digital de Uchko‘prik Digital District fueron desarrollados por SYSONE.',
      projectLabel: 'Plataforma',
      projectText: 'Mapa interactivo, datos del distrito, acceso multilingüe, asistente AI y una experiencia premium se integran en un único producto digital.',
      technology: 'Tecnología',
      technologyText: 'Frontend, backend, flujos de datos, integraciones y arquitectura de plataforma.',
      design: 'Diseño',
      designText: 'UI/UX premium, lenguaje visual Liquid Glass, motion y experiencia de mapa interactivo.',
      ai: 'Experiencia AI',
      aiText: 'Experiencia AI de texto y voz basada en datos verificados del distrito.',
      support: 'Soporte tecnológico',
      supportValue: 'Proporcionado por SYSONE',
      footer: 'Product design, engineering y experiencia AI para Uchko‘prik Digital District.',
      done: 'Cerrar',
      watermark: 'Powered by',
      aiCredit: 'AI Experience by',
      presentationCredit: 'Technology by'
    }
  };

  const FALLBACK_LANG = 'en';

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const getLang = () => {
    const lang = String(
      document.documentElement.lang || 'uz'
    )
      .toLowerCase()
      .split('-')[0];

    return COPY[lang]
      ? lang
      : FALLBACK_LANG;
  };

  const text = key =>
    COPY[getLang()]?.[key] ??
    COPY[FALLBACK_LANG]?.[key] ??
    key;

  const closeIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18"></path>
    </svg>
  `;

  function createAboutButton() {
    if ($('#sysoneAboutBtn')) {
      return;
    }

    const right = $('.ux-top-right');

    if (!right) {
      return;
    }

    const button =
      document.createElement('button');

    button.id = 'sysoneAboutBtn';
    button.type = 'button';
    button.className =
      'icon-btn sysone-about-trigger';

    button.setAttribute(
      'aria-haspopup',
      'dialog'
    );

    button.setAttribute(
      'aria-controls',
      'sysoneAbout'
    );

    button.innerHTML = `
      <span
        aria-hidden="true"
        class="sysone-button-glyph"
      >
        S
      </span>
    `;

    const accessibility =
      $('#accessibilityBtn');

    if (
      accessibility &&
      accessibility.parentElement === right
    ) {
      right.insertBefore(
        button,
        accessibility
      );
    } else {
      right.appendChild(button);
    }

    button.addEventListener(
      'click',
      openAbout
    );
  }

  function createAboutPanel() {
    if ($('#sysoneAbout')) {
      return;
    }

    const section =
      document.createElement('section');

    section.id = 'sysoneAbout';
    section.className =
      'sysone-about-backdrop';

    section.setAttribute(
      'aria-hidden',
      'true'
    );

    section.innerHTML = `
      <article
        aria-labelledby="sysoneAboutTitle"
        aria-modal="true"
        class="sysone-about-panel"
        role="dialog"
        tabindex="-1"
      >
        <button
          aria-label="Close"
          class="sysone-about-close"
          id="sysoneAboutClose"
          type="button"
        >
          ${closeIcon}
        </button>

        <header class="sysone-about-hero">
          <span
            class="sysone-kicker sysone-reveal"
          >
            <i class="sysone-kicker-dot"></i>
            <span data-sysone-key="kicker"></span>
          </span>

          <h2
            class="sysone-wordmark sysone-reveal"
            id="sysoneAboutTitle"
          >
            SYSONE
          </h2>

          <p
            class="sysone-tagline sysone-reveal"
            data-sysone-key="lead"
          ></p>

          <div
            class="sysone-hero-meta sysone-reveal"
          >
            <span class="sysone-pill">
              Technology
            </span>

            <span class="sysone-pill">
              Design
            </span>

            <span class="sysone-pill">
              AI
            </span>
          </div>
        </header>

        <div class="sysone-about-body">

          <span
            class="sysone-section-label"
            data-sysone-key="projectLabel"
          ></span>

          <section
            class="sysone-project-card sysone-reveal"
          >
            <div class="sysone-project-copy">
              <strong>
                Uchko‘prik Digital District
              </strong>

              <p
                data-sysone-key="projectText"
              ></p>
            </div>

            <div
              aria-hidden="true"
              class="sysone-project-badge"
            >
              S
            </div>
          </section>

          <div class="sysone-capability-grid">

            <article
              class="sysone-capability sysone-reveal"
            >
              <span
                class="sysone-capability-index"
              >
                01
              </span>

              <strong
                data-sysone-key="technology"
              ></strong>

              <p
                data-sysone-key="technologyText"
              ></p>
            </article>

            <article
              class="sysone-capability sysone-reveal"
            >
              <span
                class="sysone-capability-index"
              >
                02
              </span>

              <strong
                data-sysone-key="design"
              ></strong>

              <p
                data-sysone-key="designText"
              ></p>
            </article>

            <article
              class="sysone-capability sysone-reveal"
            >
              <span
                class="sysone-capability-index"
              >
                03
              </span>

              <strong
                data-sysone-key="ai"
              ></strong>

              <p
                data-sysone-key="aiText"
              ></p>
            </article>
          </div>

          <section
            class="sysone-support sysone-reveal"
          >
            <div class="sysone-support-copy">
              <i
                aria-hidden="true"
                class="sysone-support-status"
              ></i>

              <div>
                <span
                  data-sysone-key="support"
                ></span>

                <strong
                  data-sysone-key="supportValue"
                ></strong>
              </div>
            </div>

            <span class="sysone-support-mark">
              SYSONE
            </span>
          </section>

          <footer class="sysone-about-footer">
            <small
              data-sysone-key="footer"
            ></small>

            <button
              class="sysone-about-done"
              id="sysoneAboutDone"
              type="button"
            >
            </button>
          </footer>
        </div>
      </article>
    `;

    document.body.appendChild(
      section
    );

    $('#sysoneAboutClose')
      ?.addEventListener(
        'click',
        closeAbout
      );

    $('#sysoneAboutDone')
      ?.addEventListener(
        'click',
        closeAbout
      );

    section.addEventListener(
      'click',
      event => {
        if (event.target === section) {
          closeAbout();
        }
      }
    );
  }

  function createWatermark() {
    if ($('#sysoneWatermark')) {
      return;
    }

    const button =
      document.createElement('button');

    button.id =
      'sysoneWatermark';

    button.type =
      'button';

    button.className =
      'sysone-watermark';

    button.innerHTML = `
      <i
        aria-hidden="true"
        class="sysone-watermark-dot"
      ></i>

      <span>
        <span data-sysone-key="watermark"></span>
        <strong> SYSONE</strong>
      </span>
    `;

    document.body.appendChild(
      button
    );

    button.addEventListener(
      'click',
      openAbout
    );
  }

  function createAICredit() {
    if ($('.sysone-ai-credit')) {
      return;
    }

    const foot =
      $('#aiPanel .ai-foot');

    if (!foot) {
      return;
    }

    const credit =
      document.createElement('span');

    credit.className =
      'sysone-ai-credit';

    credit.innerHTML = `
      <span data-sysone-key="aiCredit"></span>
      <strong> SYSONE</strong>
    `;

    foot.appendChild(
      credit
    );
  }

  function createPresentationCredit() {
    if ($('#sysonePresentationCredit')) {
      return;
    }

    const overlay =
      $('#presentationOverlay');

    if (!overlay) {
      return;
    }

    const credit =
      document.createElement('span');

    credit.id =
      'sysonePresentationCredit';

    credit.className =
      'sysone-presentation-credit';

    credit.innerHTML = `
      <span data-sysone-key="presentationCredit"></span>
      <strong>SYSONE</strong>
    `;

    overlay.appendChild(
      credit
    );
  }

  let previousFocus = null;

  function openAbout() {
    const section =
      $('#sysoneAbout');

    const panel =
      $('.sysone-about-panel', section);

    if (!section) {
      return;
    }

    previousFocus =
      document.activeElement;

    document.body.classList.add(
      'sysone-about-open'
    );

    section.setAttribute(
      'aria-hidden',
      'false'
    );

    requestAnimationFrame(() => {
      section.classList.add(
        'is-open'
      );

      setTimeout(
        () => panel?.focus(),
        80
      );
    });
  }

  function closeAbout() {
    const section =
      $('#sysoneAbout');

    if (
      !section ||
      !section.classList.contains(
        'is-open'
      )
    ) {
      return;
    }

    section.classList.remove(
      'is-open'
    );

    document.body.classList.remove(
      'sysone-about-open'
    );

    setTimeout(() => {
      section.setAttribute(
        'aria-hidden',
        'true'
      );

      try {
        previousFocus?.focus?.();
      } catch {}

      previousFocus =
        null;
    }, 310);
  }

  function updateCopy() {
    document
      .querySelectorAll(
        '[data-sysone-key]'
      )
      .forEach(element => {
        const key =
          element.dataset.sysoneKey;

        element.textContent =
          text(key);
      });

    const button =
      $('#sysoneAboutBtn');

    if (button) {
      const label =
        text('button');

      button.title =
        `${label} · SYSONE`;

      button.setAttribute(
        'aria-label',
        label
      );
    }

    const watermark =
      $('#sysoneWatermark');

    if (watermark) {
      watermark.setAttribute(
        'aria-label',
        `${text('button')} · SYSONE`
      );
    }

    const close =
      $('#sysoneAboutClose');

    if (close) {
      close.setAttribute(
        'aria-label',
        text('done')
      );

      close.title =
        text('done');
    }

    const done =
      $('#sysoneAboutDone');

    if (done) {
      done.textContent =
        text('done');
    }

    const panel =
      $('#sysoneAbout');

    if (panel) {
      panel.dir =
        document.documentElement.dir ||
        'ltr';
    }
  }

  function observeLanguage() {
    const observer =
      new MutationObserver(
        mutations => {
          const changed =
            mutations.some(
              mutation =>
                mutation.type ===
                'attributes'
            );

          if (changed) {
            updateCopy();
          }
        }
      );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          'lang',
          'dir'
        ]
      }
    );
  }

  function bindKeyboard() {
    document.addEventListener(
      'keydown',
      event => {
        if (
          event.key === 'Escape' &&
          $('#sysoneAbout')
            ?.classList
            .contains('is-open')
        ) {
          event.preventDefault();
          event.stopPropagation();
          closeAbout();
        }
      },
      true
    );
  }

  function boot() {
    createAboutButton();
    createAboutPanel();
    createWatermark();
    createAICredit();
    createPresentationCredit();
    updateCopy();
    observeLanguage();
    bindKeyboard();
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      boot,
      {
        once: true
      }
    );
  } else {
    boot();
  }
})();
