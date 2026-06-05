/* Hayuna redesign C — interaksi + dark mode toggle. MOCKUP ONLY. */
(function () {
  // apply saved theme asap (head script also does this; keep as fallback)
  try { var t = localStorage.getItem('hy-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  document.addEventListener('click', function (e) {
    // theme toggle
    if (e.target.closest('.js-theme')) {
      var r = document.documentElement;
      var next = r.dataset.theme === 'dark' ? '' : 'dark';
      r.dataset.theme = next;
      try { localStorage.setItem('hy-theme', next); } catch (e) {}
      return;
    }

    // portal account menu (.js-menu / .menu)
    var pm = document.querySelector('.menu');
    if (e.target.closest('.js-menu')) { if (pm) pm.toggleAttribute('hidden'); return; }
    if (pm && !e.target.closest('.menu')) pm.setAttribute('hidden', '');

    // dashboard owner menu (.owner-trigger / .owner-dropdown)
    var dd = document.querySelector('.owner-dropdown');
    if (e.target.closest('.owner-trigger')) { if (dd) dd.toggleAttribute('hidden'); return; }
    if (dd && !e.target.closest('.owner-dropdown')) dd.setAttribute('hidden', '');

    // sidebar view switch (single-page dashboards)
    var nav = e.target.closest('[data-view]');
    if (nav) {
      e.preventDefault();
      var target = nav.getAttribute('data-view');
      document.querySelectorAll('[data-view]').forEach(function (n) { n.classList.toggle('active', n.getAttribute('data-view') === target); });
      document.querySelectorAll('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + target); });
      var titleEl = document.getElementById('page-title');
      if (titleEl && nav.dataset.title) titleEl.firstChild.textContent = nav.dataset.title;
      closeSidebar();
      return;
    }

    // tab toggle (portal / filters)
    var tab = e.target.closest('.tab');
    if (tab) { var sibs = tab.parentNode.querySelectorAll('.tab'); sibs.forEach(function (x) { x.classList.remove('active'); }); tab.classList.add('active'); }

    // mobile sidebar
    if (e.target.closest('.hamburger')) { var sb = document.querySelector('.sidebar'); var bd = document.querySelector('.sidebar-backdrop'); if (sb) sb.classList.add('open'); if (bd) bd.classList.add('open'); }
    if (e.target.closest('.sidebar-backdrop')) closeSidebar();

    // stub actions
    var stub = e.target.closest('[data-stub]');
    if (stub) { e.preventDefault(); alert('Mockup — "' + stub.dataset.stub + '" belum diwire ke backend.'); }
  });

  function closeSidebar() {
    var sb = document.querySelector('.sidebar'); var bd = document.querySelector('.sidebar-backdrop');
    if (sb) sb.classList.remove('open'); if (bd) bd.classList.remove('open');
  }
})();
