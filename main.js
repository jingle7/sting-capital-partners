/* STING Capital Partners — shared interactions */
(function () {
  "use strict";

  /* ---- nav: solid background after scroll ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("solid", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- mark active nav link by filename (handles clean URLs on Pages) ---- */
  var here = location.pathname.split("/").pop() || "index.html";
  if (here === "") here = "index.html";
  if (!/\.html$/.test(here)) here += ".html";
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page") === here) a.setAttribute("aria-current", "page");
  });

  /* ---- scroll reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Web3Forms inquiry handler (preview-mode aware) ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    var statusEl = document.getElementById("formStatus");
    var keyInput = form.querySelector('input[name="access_key"]');
    var btn = form.querySelector('button[type="submit"]');

    var setStatus = function (msg, ok) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.classList.add("show");
      statusEl.classList.toggle("ok", !!ok);
      statusEl.classList.toggle("err", !ok);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = keyInput ? keyInput.value.trim() : "";

      // Preview mode: access key not yet set
      if (!key || key.indexOf("YOUR_WEB3FORMS") === 0) {
        setStatus(
          "Preview mode — this form isn't connected yet. Add a Web3Forms access key to start receiving inquiries.",
          false
        );
        return;
      }

      if (!form.checkValidity()) { form.reportValidity(); return; }

      var data = new FormData(form);
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            setStatus("Thank you — your inquiry is on its way. We'll be in touch shortly.", true);
            form.reset();
          } else {
            setStatus("Something went wrong: " + (json.message || "please try again."), false);
          }
        })
        .catch(function () {
          setStatus("Network error — please try again in a moment.", false);
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send inquiry"; }
        });
    });
  }

  /* ---- footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
