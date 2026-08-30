/* =========================================================
   TAT Ristorante Di Famiglia — site behaviour
   Vanilla JS, no dependencies. Shared by every page.
   Each block checks for its own markup before running, so
   the same file is safe to include anywhere on the site.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------
     Header: solid background once you scroll past the fold
     ------------------------------------------------------ */
  (function () {
    var header = $('#siteHeader');
    if (!header) return;
    function onScroll() { header.classList.toggle('is-stuck', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------ */
  var setNav = null;
  (function () {
    var navToggle = $('#navToggle');
    var navMobile = $('#navMobile');
    if (!navToggle || !navMobile) return;

    setNav = function (open) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
      document.body.classList.toggle('nav-open', open);
      if (open) {
        navMobile.hidden = false;
        requestAnimationFrame(function () { navMobile.classList.add('is-open'); });
      } else {
        navMobile.classList.remove('is-open');
        setTimeout(function () { navMobile.hidden = true; }, 300);
      }
    };

    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', navMobile).forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') setNav(false);
    });
  })();

  /* ------------------------------------------------------
     Hero: rotating headlines + still images behind them.
     The video plays when it can; if it's blocked or fails,
     the stills become the backdrop instead.
     ------------------------------------------------------ */
  (function () {
    var hero = $('.hero');
    if (!hero) return;

    var video    = $('#heroVideo');
    var lines    = $$('.hero-line');
    var stills   = $$('.hero-still');
    var dots     = $$('.hero-slide-nav .dot');
    var pauseBtn = $('#slidePause');
    var idx = 0, timer = null;
    var SLIDE_MS = 6000;

    if (video) {
      video.addEventListener('playing', function () { hero.classList.add('has-video'); });
      video.addEventListener('error', function () { hero.classList.remove('has-video'); });
      var p = video.play();
      if (p && p.catch) { p.catch(function () { /* autoplay blocked — stills carry it */ }); }
    }

    function show(i) {
      idx = (i + lines.length) % lines.length;
      lines.forEach(function (el, n) { el.classList.toggle('is-active', n === idx); });
      stills.forEach(function (el, n) { el.classList.toggle('is-active', n === idx); });
      dots.forEach(function (el, n) {
        el.classList.toggle('is-active', n === idx);
        el.setAttribute('aria-selected', String(n === idx));
      });
    }
    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(function () { show(idx + 1); }, SLIDE_MS);
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', 'false');
        pauseBtn.querySelector('.sr-only').textContent = 'Pause slideshow';
      }
    }
    function stop() {
      clearInterval(timer); timer = null;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', 'true');
        pauseBtn.querySelector('.sr-only').textContent = 'Play slideshow';
      }
    }

    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () { show(n); start(); });
    });
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () { timer ? stop() : start(); });
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearInterval(timer); } else if (timer) { start(); }
    });

    reduceMotion ? stop() : start();
  })();

  /* ------------------------------------------------------
     Marquee: duplicate the strip so the loop is seamless
     ------------------------------------------------------ */
  (function () {
    var track = $('#marqueeTrack');
    if (!track || reduceMotion || !track.firstElementChild) return;
    track.appendChild(track.firstElementChild.cloneNode(true));
  })();

  /* ------------------------------------------------------
     Reviews carousel
     ------------------------------------------------------ */
  (function () {
    var track = $('#reviewTrack');
    var dotsWrap = $('#reviewDots');
    if (!track || !dotsWrap) return;

    var reviews = $$('.review', track);
    var idx = 0;

    reviews.forEach(function (_, n) {
      var b = document.createElement('button');
      b.innerHTML = '<span class="sr-only">Review ' + (n + 1) + '</span>';
      b.addEventListener('click', function () { go(n); });
      dotsWrap.appendChild(b);
    });

    function go(n) {
      idx = (n + reviews.length) % reviews.length;
      track.style.transform = 'translateX(' + (-100 * idx) + '%)';
      $$('button', dotsWrap).forEach(function (d, i) {
        d.classList.toggle('is-active', i === idx);
      });
    }

    var prev = $('#revPrev'), next = $('#revNext');
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    if (next) next.addEventListener('click', function () { go(idx + 1); });
    go(0);

    var vp = $('.review-viewport'), x0 = null;
    if (vp) {
      vp.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      vp.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 45) go(idx + (dx < 0 ? 1 : -1));
        x0 = null;
      });
    }
  })();

  /* ------------------------------------------------------
     Gallery lightbox
     ------------------------------------------------------ */
  (function () {
    var lb = $('#lightbox');
    var tiles = $$('.tile');
    if (!lb || !tiles.length) return;

    var lbImg = $('#lbImg'), lbCap = $('#lbCap');
    var idx = 0, lastFocus = null;

    function open(i) {
      idx = (i + tiles.length) % tiles.length;
      var img = tiles[idx].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = tiles[idx].dataset.caption || '';
      lastFocus = document.activeElement;
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add('is-open'); });
      document.body.classList.add('nav-open');
      $('#lbClose').focus();
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      setTimeout(function () { lb.hidden = true; }, 300);
      if (lastFocus) lastFocus.focus();
    }

    tiles.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function () { open(idx - 1); });
    $('#lbNext').addEventListener('click', function () { open(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(idx - 1);
      if (e.key === 'ArrowRight') open(idx + 1);
    });
  })();

  /* ------------------------------------------------------
     Open / closed status against posted hours
     Wed–Fri 11:00–20:00, Sat–Sun 15:00–20:00
     ------------------------------------------------------ */
  (function () {
    var status = $('#openStatus');
    if (!status) return;
    var HOURS = { 0: [15, 20], 3: [11, 20], 4: [11, 20], 5: [11, 20], 6: [15, 20] };
    var now = new Date();
    var today = HOURS[now.getDay()];
    var mins = now.getHours() * 60 + now.getMinutes();
    var isOpen = today && mins >= today[0] * 60 && mins < today[1] * 60;
    status.textContent = isOpen ? 'Open now — kitchen closes at 8:00 PM' : 'Closed right now';
    status.classList.toggle('is-open', !!isOpen);
  })();

  /* ------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------ */
  (function () {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();


  /* ------------------------------------------------------
     Menu page: renders everything from menu-data.js
     ------------------------------------------------------ */
  (function () {
    var tablist = $('#menuTablist');
    var wrap    = $('#menuSections');
    if (!tablist || !wrap || typeof window.TAT_MENU === 'undefined') return;

    var DATA   = window.TAT_MENU;
    var menus  = (DATA.menus || []).filter(function (m) { return !m.hidden; });
    if (!menus.length) return;

    var jump   = $('#menuJump');
    var blurb  = $('#menuBlurb');
    var legal  = $('#menuLegal');
    var filter = $('#menuFilter');
    var clear  = $('#menuFilterClear');
    var status = $('#menuFilterStatus');
    var active = 0;
    var spy    = null;

    function esc(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    }
    function slug(s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    // Wrap search matches in <mark>. Escapes first, so this is safe.
    function mark(text, q) {
      var out = esc(text);
      if (!q) return out;
      var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return out.replace(re, '<mark>$1</mark>');
    }
    function priceHTML(item) {
      if (item.prices && item.prices.length) {
        return item.prices.map(function (p) {
          return '<span><span class="price-label">' + esc(p.label) + '</span>$' + esc(p.amount) + '</span>';
        }).join('');
      }
      if (!item.price) return '';
      var v = /^[0-9.]+$/.test(item.price) ? '$' + item.price : esc(item.price);
      return '<span>' + v +
        (item.priceSuffix ? '<span class="menu-item-suffix">' + esc(item.priceSuffix) + '</span>' : '') +
        '</span>';
    }

    function itemMatches(item, q) {
      if (!q) return true;
      return (item.name + ' ' + (item.desc || '')).toLowerCase().indexOf(q) > -1;
    }

    function render(q) {
      var menu = menus[active];
      q = (q || '').trim().toLowerCase();

      blurb.textContent = menu.note || menu.blurb || '';
      legal.textContent = DATA.globalNote || '';

      var shown = 0, html = '', jumpHTML = '';

      menu.sections.forEach(function (sec) {
        var items = sec.items.filter(function (it) { return itemMatches(it, q); });
        if (!items.length) return;
        shown += items.length;

        var id = menu.id + '-' + slug(sec.title);
        jumpHTML += '<a href="#' + id + '">' + esc(sec.title) + '</a>';

        html += '<section class="menu-section" id="' + id + '">' +
                '<h2 class="menu-section-h">' + esc(sec.title) + '</h2>' +
                (sec.note && !q ? '<p class="menu-section-note">' + esc(sec.note) + '</p>' : '') +
                '<ul class="menu-items">';

        items.forEach(function (it) {
          var price = priceHTML(it);
          html += '<li class="menu-item"><div class="menu-item-line">' +
                  '<span class="menu-item-name">' + mark(it.name, q) + '</span>' +
                  (it.tag ? '<span class="menu-tag">' + esc(it.tag) + '</span>' : '') +
                  (price ? '<span class="menu-item-dots"></span><span class="menu-item-price">' + price + '</span>' : '') +
                  '</div>' +
                  (it.desc ? '<p class="menu-item-desc">' + mark(it.desc, q) + '</p>' : '') +
                  '</li>';
        });
        html += '</ul></section>';
      });

      if (!shown) {
        html = '<p class="menu-empty">Nothing on the ' + esc(menu.label.toLowerCase()) +
               ' menu matches that. Try another word, or call us on (614) 236-1392.</p>';
        jumpHTML = '';
      }

      wrap.innerHTML = html;
      if (jump) jump.innerHTML = jumpHTML;

      var noun = DATA.itemNoun || ['item', 'items'];
      status.textContent = q
        ? shown + ' ' + (shown === 1 ? noun[0] : noun[1]) + ' matching "' + q + '"'
        : '';
      if (clear) clear.hidden = !q;

      startSpy();
    }

    /* Highlight the jump link for whichever section is on screen. */
    function startSpy() {
      if (spy) { spy.disconnect(); spy = null; }
      if (!jump || !('IntersectionObserver' in window)) return;
      var links = $$('a', jump);
      if (!links.length) return;

      spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle('is-current', l.getAttribute('href') === '#' + e.target.id);
          });
        });
      }, { rootMargin: '-120px 0px -70% 0px' });

      $$('.menu-section', wrap).forEach(function (s) { spy.observe(s); });
    }

    function selectMenu(i, pushHash) {
      active = i;
      $$('.menu-tab', tablist).forEach(function (t, n) {
        t.setAttribute('aria-selected', String(n === i));
        t.tabIndex = n === i ? 0 : -1;
      });
      if (filter) filter.value = '';
      render('');
      if (pushHash) history.replaceState(null, '', '#' + menus[i].id);
    }

    /* Tabs */
    menus.forEach(function (m, i) {
      var b = document.createElement('button');
      b.className = 'menu-tab';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', 'false');
      b.textContent = m.label;
      b.addEventListener('click', function () {
        selectMenu(i, true);
        window.scrollTo({ top: $('.menu-tabs').offsetTop, behavior: 'smooth' });
      });
      tablist.appendChild(b);
    });

    /* Left/right arrows move between tabs, as expected of a tablist */
    tablist.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var n = (active + (e.key === 'ArrowRight' ? 1 : -1) + menus.length) % menus.length;
      selectMenu(n, true);
      $$('.menu-tab', tablist)[n].focus();
    });

    /* Search */
    if (filter) {
      var t = null;
      filter.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () { render(filter.value); }, 120);
      });
      filter.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { filter.value = ''; render(''); }
      });
    }
    if (clear) {
      clear.addEventListener('click', function () {
        filter.value = ''; render(''); filter.focus();
      });
    }

    /* Open on the menu named in the URL, e.g. menu.html#banquet */
    function indexFromHash() {
      var want = decodeURIComponent(location.hash.replace('#', ''));
      var idx = -1;
      menus.forEach(function (m, i) { if (m.id === want) idx = i; });
      return idx;
    }
    // Changing only the hash doesn't reload the page, so a link from
    // elsewhere on the site to menu.html#banquet has to be handled here.
    window.addEventListener('hashchange', function () {
      var i = indexFromHash();
      if (i > -1 && i !== active) selectMenu(i, false);
    });

    var start = indexFromHash();
    selectMenu(start > -1 ? start : 0, false);
  })();


  /* ------------------------------------------------------
     Photo placeholders
     Until a photo exists in assets/photos/, the browser draws
     a broken-image icon. Swap in a neutral tile instead, so an
     incomplete site still looks deliberate. Harmless once all
     the photos are in place — it never fires.
     ------------------------------------------------------ */
  (function () {
    var pending = $$('img[src^="assets/photos/"]');
    if (!pending.length) return;

    function placeholder(label) {
      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
        '<defs><pattern id="p" width="28" height="28" patternTransform="rotate(45)" ' +
        'patternUnits="userSpaceOnUse">' +
        '<rect width="28" height="28" fill="#14100E"/>' +
        '<rect width="14" height="28" fill="#191411"/></pattern></defs>' +
        '<rect width="800" height="600" fill="url(#p)"/>' +
        '<text x="400" y="304" text-anchor="middle" fill="#C8A24A" ' +
        'font-family="Jost, Helvetica, Arial, sans-serif" font-size="26" ' +
        'letter-spacing="6">' + label + '</text></svg>';
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    pending.forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.placeheld) return;   // don't loop if the swap itself fails
        img.dataset.placeheld = '1';
        img.src = placeholder('PHOTO COMING');
      });
      // Images that already failed before this script ran
      if (img.complete && img.naturalWidth === 0) {
        img.dispatchEvent(new Event('error'));
      }
    });
  })();

  /* ------------------------------------------------------
     Footer year
     ------------------------------------------------------ */
  (function () {
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  })();
})();
