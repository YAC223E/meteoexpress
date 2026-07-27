// ==========================================================================
// Mobile tab navigation (Aujourd'hui / 5 jours / Air+Soleil / IA)
// Only active at mobile widths (see main.css .mobile-tabbar media query).
// Desktop keeps the original single-scroll layout untouched — this module
// just adds/removes a body class and toggles which sections are visible;
// it never removes anything from the DOM, so map/chart/AI init elsewhere
// keeps working exactly as before.
// ==========================================================================
(function () {
  const TAB_GROUPS = {
    'mtab-today':    ['section-today'],
    'mtab-forecast': ['section-forecast', 'section-hourly'],
    'mtab-air':      ['section-sun-wind', 'section-air-quality', 'section-map'],
    'mtab-ai':       ['section-ai', 'section-planner']
  };

  const MOBILE_QUERY = window.matchMedia('(max-width: 640px)');

  function applyTab(tabId) {
    Object.entries(TAB_GROUPS).forEach(([id, sectionIds]) => {
      const isActive = id === tabId;
      sectionIds.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) el.classList.toggle('mtab-hidden', !isActive);
      });
    });
    document.querySelectorAll('.mobile-tabbar .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function initTabbar() {
    const bar = document.getElementById('mobileTabbar');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      applyTab(btn.dataset.tab);
    });
    // Default to the first tab on load
    applyTab('mtab-today');
  }

  function clearMobileState() {
    // When leaving mobile width (resize to desktop), un-hide everything so
    // the normal desktop scroll layout is intact.
    document.querySelectorAll('.mtab-hidden').forEach(el => el.classList.remove('mtab-hidden'));
  }

  function handleViewportChange() {
    if (MOBILE_QUERY.matches) {
      applyTab(document.querySelector('.mobile-tabbar .tab-btn.active')?.dataset.tab || 'mtab-today');
    } else {
      clearMobileState();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTabbar();
    MOBILE_QUERY.addEventListener('change', handleViewportChange);
  });

  // ---- Hourly horizontal strip, built from window.HOURLY ----
  // window.HOURLY items look like: { heure: "14:00", temp: 31, hum: 58, wind: 3.2 }
  // The backend doesn't return a per-hour condition/icon (only current-day
  // condition), so every hour reuses the current condition's Meteocon SVG
  // (injected once via window.CURRENT_ICON_SVG from the template) rather
  // than invent per-hour icon data that doesn't exist.
  function renderHourlyStrip() {
    const host = document.getElementById('hourlyStripScroll');
    if (!host || !Array.isArray(window.HOURLY) || window.HOURLY.length === 0) return;

    const iconSvg = window.CURRENT_ICON_SVG || '';

    host.innerHTML = window.HOURLY.map(function (h, i) {
      const isNow = i === 0;
      const label = isNow ? (window.CURRENT_LANG === 'en' ? 'Now' : 'Maint.') : h.heure;
      return (
        '<div class="hour-item' + (isNow ? ' now' : '') + '">' +
          '<div class="h-time">' + label + '</div>' +
          '<div class="h-icon">' + iconSvg + '</div>' +
          '<div class="h-temp">' + Math.round(h.temp) + '\u00b0</div>' +
        '</div>'
      );
    }).join('');
  }
  window.renderHourlyStrip = renderHourlyStrip;

  document.addEventListener('DOMContentLoaded', function () {
    // Slight delay in case init.js re-renders HOURLY-dependent blocks first.
    setTimeout(renderHourlyStrip, 0);
  });
})();
