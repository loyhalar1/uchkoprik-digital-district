/**
 * Uchko‘prik Digital District — Entity Reader
 * AI chatni tanlangan nuqta uchun "o‘qib berish" rejimiga aylantiradi.
 *
 * U faqat ekrandagi tasdiqlangan:
 *  - nom
 *  - rahbar
 *  - tavsif
 * matnini /api/aiSpeech orqali o‘qiydi.
 */

(() => {
  'use strict';

  let currentAudio = null;
  let currentUrl = null;
  let speaking = false;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function clean(value) {
    return String(value ?? '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stopAudio() {
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      } catch {}
    }

    currentAudio = null;

    if (currentUrl) {
      try {
        URL.revokeObjectURL(currentUrl);
      } catch {}
    }

    currentUrl = null;
    speaking = false;
    setReaderBusy(false);
  }

  function base64ToBlob(base64, mimeType = 'audio/wav') {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return new Blob([bytes], { type: mimeType });
  }

  function toast(title, body = '') {
    const host = $('#toastHost');

    if (!host) {
      console.log(title, body);
      return;
    }

    const el = document.createElement('div');
    el.className = 'toast entity-reader-toast';

    const strong = document.createElement('strong');
    strong.textContent = title;
    el.appendChild(strong);

    if (body) {
      const small = document.createElement('small');
      small.textContent = body;
      el.appendChild(small);
    }

    host.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  function detailRows() {
    return $$('.detail-data-row').map(row => {
      const label = clean(row.querySelector('span')?.textContent);
      const value = clean(row.querySelector('strong')?.textContent);
      return { row, label, value };
    });
  }

  function rowValue(matchers) {
    const rows = detailRows();

    for (const item of rows) {
      const label = item.label.toLowerCase();

      if (matchers.some(matcher => label.includes(matcher))) {
        return item.value;
      }
    }

    return '';
  }

  function currentDetailData() {
    const card = $('#detailCard');

    if (!card || card.classList.contains('hidden')) {
      return null;
    }

    const name = clean($('#detailTitle')?.textContent);

    const leader =
      rowValue([
        'mfy raisi',
        'rahbar / mas',
        'rahbar',
        'ijrochi direktor',
        'direktor'
      ]);

    const descriptionFromRow =
      rowValue([
        'tavsif',
        'description'
      ]);

    const visibleDescription =
      clean($('#detailDescription')?.textContent);

    // Agar "Ixtisoslashuv:" kabi avtomatik qisqa matn bo‘lsa,
    // real Tavsif mavjud bo‘lganda aynan Tavsif ishlatiladi.
    const description =
      descriptionFromRow ||
      (
        visibleDescription &&
        !/^ixtisoslashuv\s*:/i.test(visibleDescription)
          ? visibleDescription
          : ''
      );

    return {
      name,
      leader,
      description
    };
  }

  function buildSpeechText() {
    const data = currentDetailData();

    if (!data || !data.name) {
      return '';
    }

    const parts = [data.name];

    if (data.leader) {
      parts.push(`Rahbari: ${data.leader}`);
    }

    if (data.description) {
      parts.push(`Tavsif: ${data.description}`);
    }

    return parts.join('. ') + '.';
  }

  function setReaderBusy(value) {
    speaking = value;

    const detailButton = $('#detailAsk');
    const floating = $('#floatingAiBtn');

    [detailButton, floating].forEach(button => {
      if (!button) return;
      button.classList.toggle('reader-speaking', value);
      button.setAttribute('aria-busy', value ? 'true' : 'false');
    });
  }

  async function speakSelected() {
    if (speaking) {
      stopAudio();
      return;
    }

    const text = buildSpeechText();

    if (!text) {
      toast(
        'O‘qib berish',
        'Avval xaritadagi MFY, tashkilot yoki iqtisodiy zona nuqtasini tanlang.'
      );
      return;
    }

    stopAudio();
    setReaderBusy(true);

    try {
      const lang =
        document.documentElement.lang ||
        location.pathname.split('/').filter(Boolean)[0] ||
        'uz';

      const response = await fetch('/api/aiSpeech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          lang
        })
      });

      const json = await response.json().catch(() => null);

      if (!response.ok || !json?.ok || !json?.audio) {
        throw new Error(
          json?.error ||
          `TTS HTTP ${response.status}`
        );
      }

      const blob = base64ToBlob(
        json.audio,
        json.mimeType || 'audio/wav'
      );

      currentUrl = URL.createObjectURL(blob);
      currentAudio = new Audio(currentUrl);

      const cleanup = () => {
        const url = currentUrl;

        currentAudio = null;
        currentUrl = null;
        speaking = false;
        setReaderBusy(false);

        if (url) {
          try {
            URL.revokeObjectURL(url);
          } catch {}
        }
      };

      currentAudio.onended = cleanup;
      currentAudio.onerror = cleanup;

      await currentAudio.play();

    } catch (error) {
      console.warn('Entity reader:', error);
      stopAudio();

      toast(
        'Ovozli o‘qish',
        'Ovozli o‘qishni ishga tushirib bo‘lmadi.'
      );
    }
  }

  function speakerSvg() {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9v6h4l5 4V5L9 9H5Z"></path>
        <path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10"></path>
      </svg>
    `;
  }

  function updateReaderButtons() {
    const detailButton = $('#detailAsk');

    if (detailButton) {
      detailButton.classList.add('entity-reader-button');
      detailButton.title = 'Nom, rahbar va tavsifni o‘qib berish';
      detailButton.setAttribute(
        'aria-label',
        'Tanlangan ma’lumotni o‘qib berish'
      );

      detailButton.innerHTML = `
        <span class="icon">${speakerSvg()}</span>
        <span>O‘qib berish</span>
      `;
    }

    const floating = $('#floatingAiBtn');

    if (floating) {
      floating.classList.add('entity-reader-floating');
      floating.title = 'Tanlangan ma’lumotni o‘qib berish';
      floating.setAttribute(
        'aria-label',
        'Tanlangan ma’lumotni o‘qib berish'
      );

      floating.innerHTML = `
        <span class="icon">${speakerSvg()}</span>
        <span class="sphere-test-label">O‘qish</span>
      `;
    }
  }

  function promoteDescription() {
    const data = currentDetailData();
    const paragraph = $('#detailDescription');

    if (!data || !paragraph) {
      return;
    }

    const descriptionRow = detailRows().find(item => {
      const label = item.label.toLowerCase();
      return (
        label.includes('tavsif') ||
        label.includes('description')
      );
    });

    if (descriptionRow?.value) {
      paragraph.textContent = descriptionRow.value;
      paragraph.classList.add('entity-real-description');

      // Tavsif yuqorida ko‘ringani uchun pastdagi takroriy qatorni yashiramiz.
      descriptionRow.row.classList.add('entity-description-duplicate');
    } else {
      paragraph.classList.remove('entity-real-description');
    }
  }

  function disableChatSurface() {
    // Reader-only rejimda chat paneli foydalanuvchiga kerak emas.
    const aiPanel = $('#aiPanel');

    if (aiPanel) {
      aiPanel.classList.add('reader-ai-chat-disabled', 'hidden');
      aiPanel.setAttribute('aria-hidden', 'true');
    }

    // Eski AI dock tugmasi bo‘lsa yashiramiz.
    $$('[data-nav="ai"]').forEach(button => {
      button.classList.add('reader-ai-nav-disabled');
      button.hidden = true;
    });
  }

  function observeDetail() {
    const card = $('#detailCard');

    if (!card) {
      return;
    }

    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        promoteDescription();
        updateReaderButtons();
      });
    });

    observer.observe(card, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  function interceptClicks() {
    document.addEventListener(
      'click',
      event => {
        const detailButton =
          event.target.closest('#detailAsk');

        const floatingButton =
          event.target.closest('#floatingAiBtn');

        if (!detailButton && !floatingButton) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        speakSelected();
      },
      true
    );
  }

  function init() {
    updateReaderButtons();
    disableChatSurface();
    observeDetail();
    interceptClicks();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAudio();
      }
    });

    window.addEventListener('beforeunload', stopAudio);
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
