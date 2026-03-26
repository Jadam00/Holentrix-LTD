/**
 * HOLENTRIX LTD — main.js
 * Vanilla JavaScript — no dependencies.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------ */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------
     Active nav link highlight (home page anchor scroll)
     ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------
     Scroll-triggered fade-up for elements with data-fade attribute
     ------------------------------------------------------------------ */
  const fadeEls = document.querySelectorAll('[data-fade]');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Smooth scroll for in-page anchor links
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------------------------------------------------------------------
     Current year in footer copyright
     ------------------------------------------------------------------ */
  const yearEls = document.querySelectorAll('.js-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ------------------------------------------------------------------
     Quote form handling
     ------------------------------------------------------------------ */
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');

  if (quoteForm && formSuccess) {

    function getVal(id) {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    }

    function setError(groupId, errId, show) {
      const group = document.getElementById(groupId);
      const errEl = document.getElementById(errId);
      const input = group ? group.querySelector('input, select, textarea') : null;
      if (group) {
        group.classList.toggle('has-error', show);
      }
      if (input) {
        if (show) {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      }
      if (errEl) {
        errEl.style.display = show ? 'block' : 'none';
      }
    }

    function isValidEmail(email) {
      return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    function validateForm() {
      const name = getVal('fname');
      const email = getVal('femail');
      const desc = getVal('fdesc');
      let valid = true;

      if (!name) {
        setError('group-name', 'err-name', true);
        valid = false;
      } else {
        setError('group-name', 'err-name', false);
      }

      if (!email || !isValidEmail(email)) {
        setError('group-email', 'err-email', true);
        valid = false;
      } else {
        setError('group-email', 'err-email', false);
      }

      if (!desc) {
        setError('group-desc', 'err-desc', true);
        valid = false;
      } else {
        setError('group-desc', 'err-desc', false);
      }

      return valid;
    }

    function buildMailtoBody() {
      const name = getVal('fname');
      const email = getVal('femail');
      const company = getVal('fcompany');
      const service = getVal('fservice');
      const budget = getVal('fbudget');
      const timeline = getVal('ftimeline');
      const desc = getVal('fdesc');

      const body = 'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        (company ? 'Company: ' + company + '\n' : '') +
        (service ? 'Service Type: ' + service + '\n' : '') +
        (budget ? 'Budget: ' + budget + '\n' : '') +
        (timeline ? 'Timeline: ' + timeline + '\n' : '') +
        '\nProject Description:\n' + desc;

      return body;
    }

    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      const name = getVal('fname');
      const subject = 'Quote Request from ' + name;
      const body = buildMailtoBody();

      const mailtoLink = 'mailto:support@holentrix.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      // Show success message
      quoteForm.style.display = 'none';
      formSuccess.classList.add('visible');

      // Attempt to open mailto
      try {
        window.location.href = mailtoLink;
      } catch (err) {
        // silently fail if mailto is not available
      }
    });

    // Clear error state on input
    ['fname', 'femail', 'fdesc'].forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () {
        const groupMap = { fname: 'group-name', femail: 'group-email', fdesc: 'group-desc' };
        const errMap = { fname: 'err-name', femail: 'err-email', fdesc: 'err-desc' };
        setError(groupMap[id], errMap[id], false);
      });
    });
  }

})();
