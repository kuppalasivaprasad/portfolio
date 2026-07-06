/* ===================================================================
   Siva Prasad Kuppala — Portfolio Scripts
   Vanilla JS: terminal typewriter, scroll-reveal, nav state, back-to-top
=================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------- Footer year -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------- Navbar scrolled state -------------------- */
  var nav = document.getElementById('mainNav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------- Back to top -------------------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* -------------------- Scroll reveal -------------------- */
  var animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(function () {
              entry.target.classList.add('is-visible');
            }, parseInt(delay, 10));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver support or reduced motion: show immediately
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------- Terminal typewriter -------------------- */
  var terminalBody = document.getElementById('terminalBody');

  // Each line: { type: 'prompt'|'output'|'comment', text }
  var lines = [
    { type: 'prompt', text: 'whoami' },
    { type: 'output', text: 'siva-prasad-kuppala' },
    { type: 'comment', text: '# senior devops / cloudops / sre engineer' },
    { type: 'gap' },
    { type: 'prompt', text: 'kubectl get engineer -o wide' },
    { type: 'output', text: 'NAME   ROLE                     EXPERIENCE   STATUS' },
    { type: 'output', text: 'siva   Senior DevOps/CloudOps   10+ years    Running' },
    { type: 'gap' },
    { type: 'prompt', text: 'echo $CORE_STACK' },
    { type: 'output', text: 'Kubernetes · IaC · Multicloud Platforms · CI/CD · Automation · Configuration Management · Observability Stack' },
    { type: 'gap' },
    { type: 'prompt', text: 'cat clients.txt' },
    { type: 'output', text: 'AT&T · Dish Network · Bank of America · VISA' }
  ];

  function buildLineHTML(line, text) {
    if (line.type === 'prompt') {
      return '<span class="t-prompt">$ </span><span class="t-cmd">' + text + '</span>';
    }
    if (line.type === 'comment') {
      return '<span class="t-comment">' + text + '</span>';
    }
    return '<span class="t-out">' + text + '</span>';
  }

  function typeTerminal() {
    if (!terminalBody) return;

    if (prefersReducedMotion) {
      // Render everything instantly, no animation
      var html = '';
      lines.forEach(function (line) {
        if (line.type === 'gap') { html += '\n'; return; }
        html += buildLineHTML(line, line.text) + '\n';
      });
      terminalBody.innerHTML = html;
      return;
    }

    var lineIndex = 0;
    var charIndex = 0;
    var container = document.createElement('div');
    terminalBody.appendChild(container);

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        var cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        terminalBody.appendChild(cursor);
        return;
      }

      var line = lines[lineIndex];

      if (line.type === 'gap') {
        terminalBody.appendChild(document.createElement('br'));
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 120);
        return;
      }

      var lineEl = terminalBody.querySelector('[data-line="' + lineIndex + '"]');
      if (!lineEl) {
        lineEl = document.createElement('div');
        lineEl.setAttribute('data-line', lineIndex);
        terminalBody.appendChild(lineEl);
      }

      var fullText = line.text;
      var speed = line.type === 'prompt' ? 32 : 4;

      if (charIndex <= fullText.length) {
        var partial = fullText.substring(0, charIndex);
        lineEl.innerHTML = buildLineHTML(line, partial);
        charIndex++;
        setTimeout(typeNextChar, line.type === 'output' || line.type === 'comment' ? speed : speed);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, line.type === 'prompt' ? 180 : 90);
      }
    }

    typeNextChar();
  }

  if (terminalBody) {
    // Kick off shortly after load so the hero fade-in feels orchestrated
    setTimeout(typeTerminal, 400);
  }

})();
