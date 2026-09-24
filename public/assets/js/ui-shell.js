document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('explorePanel');
  const sidebarToggle = document.getElementById('layerListToggle');
  const sidebarClose = document.getElementById('exploreCloseBtn');

  const searchDialog = document.getElementById('searchDialog');
  const searchOpen = document.getElementById('searchOpen');
  const searchClose = document.getElementById('searchCloseBtn');

  const aiPanel = document.getElementById('aiPanel');
  const aiOpen = document.getElementById('floatingAiBtn');
  const aiClose = document.getElementById('aiCloseBtn');

  const languageSheet = document.getElementById('languageSheet');
  const languageBtn = document.getElementById('languageBtn');
  const languageClose = document.getElementById('languageCloseBtn');

  const settingsSheet = document.getElementById('settingsSheet');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsClose = document.getElementById('settingsCloseBtn');

  sidebarToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('is-open');
  });

  sidebarClose?.addEventListener('click', () => {
    sidebar?.classList.remove('is-open');
  });

  searchOpen?.addEventListener('click', () => {
    searchDialog?.classList.remove('hidden');
  });

  searchClose?.addEventListener('click', () => {
    searchDialog?.classList.add('hidden');
  });

  aiOpen?.addEventListener('click', () => {
    aiPanel?.classList.toggle('hidden');
  });

  aiClose?.addEventListener('click', () => {
    aiPanel?.classList.add('hidden');
  });

  languageBtn?.addEventListener('click', () => {
    languageSheet?.classList.remove('hidden');
  });

  languageClose?.addEventListener('click', () => {
    languageSheet?.classList.add('hidden');
  });

  settingsBtn?.addEventListener('click', () => {
    settingsSheet?.classList.remove('hidden');
  });

  settingsClose?.addEventListener('click', () => {
    settingsSheet?.classList.add('hidden');
  });

  [languageSheet, settingsSheet].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });
});
