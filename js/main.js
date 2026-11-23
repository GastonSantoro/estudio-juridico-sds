/* ==========================================================================
   de Souza Abogados — Lógica del sitio
   Módulos: año del pie · menú móvil · encabezado al scrollear · aparición
            · áreas complementarias · mapa bajo demanda · WhatsApp flotante
            · formulario de consultas · ScrollSpy
   ========================================================================== */
(function () {
  'use strict';

  /* Datos usados por el formulario cuando no hay servicio de envío activo.
     Si cambian, actualizar también los enlaces de los HTML (ver README). */
  var CONTACT = {
    whatsappNumber: '5492202544238', // +54 9 2202 54 4238
    email: 'abogadosdesouza@gmail.com'
  };

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Año actualizado automáticamente en el pie */
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Menú móvil ---------- */
  (function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    var desktop = window.matchMedia('(min-width: 960px)');

    function setOpen(open, returnFocus) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      if (!open && returnFocus) toggle.focus();
    }
    // En móvil el panel oculto no debe ser alcanzable con teclado
    function syncInert() {
      var hidden = !desktop.matches && !nav.classList.contains('is-open');
      if (hidden) { nav.setAttribute('inert', ''); } else { nav.removeAttribute('inert'); }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      syncInert();
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setOpen(false); syncInert(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false, true); syncInert(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) { setOpen(false); syncInert(); }
    });
    (desktop.addEventListener ? desktop.addEventListener.bind(desktop, 'change') : desktop.addListener.bind(desktop))(function () {
      setOpen(false); syncInert();
    });
    setOpen(false);
    syncInert();
  })();

  /* ---------- Encabezado: transición suave al hacer scroll ---------- */
  (function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    // Páginas interiores: el encabezado queda siempre sólido
    if (header.hasAttribute('data-solid')) { header.classList.add('is-scrolled'); return; }
    var ticking = false;
    function check() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop;
      header.classList.toggle('is-scrolled', y > 20);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(check); ticking = true; }
    }, { passive: true });
    check();
  })();

  /* ---------- Aparición fluida al hacer scroll ---------- */
  (function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length || reducedMotion || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
    // Red de seguridad: nunca dejar contenido oculto
    window.setTimeout(function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    }, 3500);
  })();

  /* ---------- Áreas de práctica: desplegar las áreas complementarias ---------- */
  (function initAreas() {
    var btn = document.getElementById('areas-toggle');
    var extra = document.getElementById('areas-extra');
    if (!btn || !extra) return;

    function setOpen(open) {
      extra.classList.toggle('is-open', open);
      if (open) { extra.removeAttribute('inert'); } else { extra.setAttribute('inert', ''); }
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = btn.getAttribute(open ? 'data-label-close' : 'data-label-open');
    }
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    setOpen(false);
  })();

  /* ---------- Mapa bajo demanda (evita cargar Google al abrir la página) ---------- */
  (function initMap() {
    var frame = document.querySelector('[data-map-src]');
    var btn = document.querySelector('[data-map-load]');
    if (!frame || !btn) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = frame.getAttribute('data-map-src');
      iframe.title = 'Mapa con la ubicación del estudio: Almirante Guillermo Brown 1378, Morón';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      var placeholder = frame.querySelector('.map__placeholder');
      if (placeholder) placeholder.remove();
      frame.appendChild(iframe);
    });
  })();

  /* ---------- Botón flotante de WhatsApp: se oculta sobre el formulario ---------- */
  (function initWhatsAppFloat() {
    var wa = document.querySelector('.wa-float');
    var zones = document.querySelectorAll('[data-wa-hide]');
    if (!wa || !zones.length || !('IntersectionObserver' in window)) return;
    var active = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) active.add(e.target); else active.delete(e.target); });
      var hide = active.size > 0;
      wa.classList.toggle('is-hidden', hide);
      if (hide) wa.setAttribute('tabindex', '-1'); else wa.removeAttribute('tabindex');
      wa.setAttribute('aria-hidden', String(hide));
    }, { threshold: 0.01 });
    zones.forEach(function (z) { io.observe(z); });
  })();

  /* ---------- Formulario de consultas ---------- */
  (function initForm() {
    var form = document.getElementById('consulta-form');
    if (!form) return;

    function getEndpoint() { return (form.getAttribute('data-endpoint') || '').trim(); }
    var status = document.getElementById('form-status');
    var submit = form.querySelector('[type="submit"]');
    var submitLabel = submit.textContent;
    var openedAt = Date.now();
    var sending = false;

    // Preselecciona el área al llegar desde la URL o al pulsar "Consultar" en un área
    function preselectArea(val) {
      if (!val) return;
      var clean = String(val).replace(/[^a-z0-9-]/gi, '');
      var select = form.elements['topic'];
      if (select && select.querySelector('option[value="' + clean + '"]')) select.value = clean;
    }
    try { preselectArea(new URLSearchParams(window.location.search).get('area')); } catch (err) { /* sin parámetros */ }
    document.querySelectorAll('[data-select-area]').forEach(function (link) {
      link.addEventListener('click', function () { preselectArea(link.getAttribute('data-select-area')); });
    });

    var rules = {
      name: function (v) {
        return v.trim().length >= 2 ? '' : 'Ingrese su nombre.';
      },
      contact: function (v) {
        v = v.trim();
        if (!v) return 'Ingrese un correo electrónico o un teléfono para poder responderle.';
        if (v.indexOf('@') !== -1) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'El correo electrónico no parece válido. Revise que tenga el formato nombre@dominio.com.';
        }
        var digits = v.replace(/\D/g, '');
        return (/^[+\d\s().-]+$/.test(v) && digits.length >= 8 && digits.length <= 15)
          ? '' : 'Ingrese un teléfono con código de área (por ejemplo, 11 1234-5678) o un correo electrónico válido.';
      },
      message: function (v) {
        v = v.trim();
        if (v.length < 10) return 'Cuéntenos brevemente su consulta (al menos 10 caracteres).';
        if (v.length > 2000) return 'El mensaje es demasiado largo. Resúmalo en un máximo de 2000 caracteres.';
        return '';
      },
      privacy: function (v, el) {
        return el.checked ? '' : 'Para enviar la consulta debe confirmar que leyó el aviso de privacidad.';
      }
    };

    function errorBox(name) { return document.getElementById('error-' + name); }

    function setError(el, message) {
      var box = errorBox(el.name);
      if (message) {
        el.setAttribute('aria-invalid', 'true');
        if (box) { box.textContent = message; box.classList.add('is-visible'); }
      } else {
        el.removeAttribute('aria-invalid');
        if (box) { box.textContent = ''; box.classList.remove('is-visible'); }
      }
    }

    function validateField(el) {
      var rule = rules[el.name];
      if (!rule) return true;
      var message = rule(el.value || '', el);
      setError(el, message);
      return !message;
    }

    function validateAll() {
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var el = form.elements[name];
        if (el && !validateField(el) && !firstInvalid) firstInvalid = el;
      });
      return firstInvalid;
    }

    // Los errores se muestran al enviar y se revalidan en vivo solo en campos ya marcados.
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
    });
    form.addEventListener('change', function (e) {
      if (e.target.type === 'checkbox' && e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
    });

    function clearStatus() {
      status.className = 'form-status';
      status.textContent = '';
    }

    function showStatus(kind, title, text, extra) {
      status.className = 'form-status form-status--' + kind + ' is-visible';
      status.textContent = '';
      var strong = document.createElement('strong');
      strong.textContent = title;
      status.appendChild(strong);
      var p = document.createElement('span');
      p.textContent = text;
      status.appendChild(p);
      if (extra) status.appendChild(extra);
      status.setAttribute('tabindex', '-1');
      status.focus();
    }

    function fallbackActions(data) {
      var summary = 'Hola, soy ' + data.name + '. ' + data.message;
      if (summary.length > 1200) summary = summary.slice(0, 1200) + '…';
      var row = document.createElement('div');
      row.className = 'btn-row';

      var wa = document.createElement('a');
      wa.className = 'btn btn--primary';
      wa.href = 'https://wa.me/' + CONTACT.whatsappNumber + '?text=' + encodeURIComponent(summary);
      wa.target = '_blank'; wa.rel = 'noopener noreferrer';
      wa.textContent = 'Enviar por WhatsApp';

      var mail = document.createElement('a');
      mail.className = 'btn btn--secondary';
      var body = data.message + '\n\nNombre: ' + data.name + '\nContacto: ' + data.contact;
      mail.href = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Consulta desde el sitio web') + '&body=' + encodeURIComponent(body);
      mail.textContent = 'Enviar por correo';

      row.appendChild(wa); row.appendChild(mail);
      return row;
    }

    function setSending(on) {
      sending = on;
      submit.disabled = on;
      submit.setAttribute('aria-disabled', String(on));
      submit.textContent = on ? 'Enviando…' : submitLabel;
      form.setAttribute('aria-busy', String(on));
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      clearStatus();

      var invalid = validateAll();
      if (invalid) {
        showStatus('error', 'Revise el formulario.', 'Hay campos que necesitan corrección. Los detalles están indicados debajo de cada campo.');
        invalid.focus();
        return;
      }

      // Campo trampa y tiempo mínimo: protección básica contra envíos automatizados
      var trap = form.elements['_gotcha'];
      if ((trap && trap.value) || Date.now() - openedAt < 3000) {
        showStatus('error', 'No se pudo enviar.', 'Espere unos segundos e intente nuevamente.');
        return;
      }

      var data = {
        name: form.elements['name'].value.trim(),
        contact: form.elements['contact'].value.trim(),
        topic: form.elements['topic'].value,
        message: form.elements['message'].value.trim()
      };

      var endpoint = getEndpoint();
      // Sin servicio configurado NO se simula el envío (ver README → Formulario).
      if (!endpoint) {
        showStatus(
          'info',
          'El envío directo desde este formulario todavía no está habilitado.',
          'Su consulta no fue enviada. Para que llegue al estudio puede usar cualquiera de estas vías, con el texto ya preparado:',
          fallbackActions(data)
        );
        return;
      }

      setSending(true);
      var payload = Object.assign({}, data, { _subject: 'Consulta desde el sitio web — ' + data.name });
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        openedAt = Date.now();
        showStatus('success', 'Consulta enviada.', 'Recibimos su mensaje. Nos pondremos en contacto con usted a la brevedad.');
      }).catch(function () {
        showStatus(
          'error',
          'No pudimos enviar su consulta.',
          'Ocurrió un problema de conexión o del servicio. Sus datos no se perdieron en esta pantalla; puede intentar nuevamente o escribirnos por otra vía:',
          fallbackActions(data)
        );
      }).then(function () { setSending(false); });
    });
  })();

  /* ---------- Navegación One-Page: ScrollSpy (aria-current) ---------- */
  (function initScrollSpy() {
    var navLinks = document.querySelectorAll('#site-nav .site-nav__link[href^="#"]');
    if (!navLinks.length) return;

    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });
    if (!sections.length) return;

    var ticking = false;
    function updateActive() {
      ticking = false;
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var atBottom = (scrollY + window.innerHeight) >= (document.documentElement.scrollHeight - 60);
      var header = document.querySelector('.site-header');
      var offset = (header ? header.getBoundingClientRect().height : 72) + 80;

      // En la portada ninguna sección del menú está activa
      var currentId = null;
      if (atBottom) {
        currentId = sections[sections.length - 1].id;
      } else {
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].el.getBoundingClientRect().top <= offset) currentId = sections[i].id;
        }
      }

      sections.forEach(function (item) {
        if (item.id === currentId) item.link.setAttribute('aria-current', 'page');
        else item.link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateActive); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (!ticking) { window.requestAnimationFrame(updateActive); ticking = true; }
    }, { passive: true });
    updateActive();
  })();
})();
