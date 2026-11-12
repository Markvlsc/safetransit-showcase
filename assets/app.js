/* SafeTransit showcase — interactions
   No dependencies. Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Theme
     ---------------------------------------------------------- */
  var themeBtn = document.querySelector(".theme-toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#11130f" : "#f5f1e6");
    }
  }

  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("safetransit-theme", next);
      } catch (e) {}
    });
  }

  /* ----------------------------------------------------------
     Header, mobile navigation, progress
     ---------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("siteNav");
  var menuBtn = document.querySelector(".menu-btn");
  var progress = document.getElementById("progressBar");
  var ticking = false;

  function setScrolled() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function setProgress() {
    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    progress.style.width = pct + "%";
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      setScrolled();
      setProgress();
      updateToc();
      ticking = false;
    });
  }

  setScrolled();
  setProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  function closeNav() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open && window.innerWidth <= 900 ? "hidden" : "";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ----------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .flow-step, .principle, .hardware-card, .config-card, .why-card, .cta, .doc-section, .quality, .scope-card, .statement"
  );

  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    revealTargets.forEach(function (el, index) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(index % 4, 3) * 45 + "ms";
      io.observe(el);
    });
  }

  /* ----------------------------------------------------------
     Documentation table of contents
     ---------------------------------------------------------- */
  var toc = document.getElementById("toc");
  var tocLinks = toc ? Array.prototype.slice.call(toc.querySelectorAll("a")) : [];
  var tocSections = tocLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function updateToc() {
    if (!tocSections.length) return;
    var current = tocSections[0];

    tocSections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 140) current = section;
    });

    tocLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current.id);
      if (link.classList.contains("active")) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (tocSections.length) updateToc();

  /* ----------------------------------------------------------
     Statement filter
     ---------------------------------------------------------- */
  var search = document.getElementById("statementSearch");
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var statements = Array.prototype.slice.call(document.querySelectorAll(".statement"));
  var qualities = Array.prototype.slice.call(document.querySelectorAll("[data-quality]"));
  var countEl = document.getElementById("resultCount");
  var emptyEl = document.getElementById("emptyState");
  var activeStatus = "all";
  var query = "";

  function applyFilter() {
    var visible = 0;
    var q = query.trim().toLowerCase();

    statements.forEach(function (statement) {
      var statusMatch = activeStatus === "all" || statement.dataset.status === activeStatus;
      var textMatch = !q || statement.textContent.toLowerCase().indexOf(q) !== -1;
      var show = statusMatch && textMatch;
      statement.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    qualities.forEach(function (quality) {
      var any = quality.querySelector(".statement:not(.is-hidden)");
      quality.classList.toggle("is-hidden", !any);
    });

    if (countEl) {
      countEl.textContent = visible + (visible === 1 ? " statement" : " statements");
    }
    if (emptyEl) {
      emptyEl.classList.toggle("visible", visible === 0 && statements.length > 0);
    }

    updateToc();
  }

  if (search && statements.length) {
    var debounce;
    search.addEventListener("input", function () {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(function () {
        query = search.value;
        applyFilter();
      }, 120);
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeStatus = chip.dataset.filter;
        chips.forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });
        applyFilter();
      });
    });

    applyFilter();
  }

  /* ----------------------------------------------------------
     Media lightbox (people cards and media library)
     ---------------------------------------------------------- */
  var mediaTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-media]"));

  if (mediaTriggers.length) {
    var dialog = document.createElement("dialog");
    dialog.className = "media-dialog";
    dialog.innerHTML =
      '<div class="media-dialog-inner">' +
      '<div class="media-dialog-head"><h2 id="mediaDialogTitle"></h2>' +
      '<button class="media-dialog-close" type="button" aria-label="Close media">' +
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      "</button></div>" +
      '<div class="media-dialog-body" id="mediaDialogBody"></div>' +
      '<p class="media-dialog-caption" id="mediaDialogCaption"></p>' +
      "</div>";
    document.body.appendChild(dialog);

    var dialogTitle = dialog.querySelector("#mediaDialogTitle");
    var dialogBody = dialog.querySelector("#mediaDialogBody");
    var dialogCaption = dialog.querySelector("#mediaDialogCaption");
    var closeButton = dialog.querySelector(".media-dialog-close");
    var activeVideo = null;

    function cleanupMedia() {
      if (activeVideo) {
        activeVideo.pause();
        activeVideo.removeAttribute("src");
        activeVideo.load();
        activeVideo = null;
      }
      dialogBody.innerHTML = "";
      document.body.classList.remove("modal-open");
    }

    function closeMedia() {
      if (dialog.open) dialog.close();
      else cleanupMedia();
    }

    function openMedia(trigger) {
      var type = trigger.getAttribute("data-type") || "video";
      var src = trigger.getAttribute("data-src");
      var title = trigger.getAttribute("data-title") || "SafeTransit media";
      var caption = trigger.getAttribute("data-caption") || "";
      var poster = trigger.querySelector("img");

      if (!src) return;
      if (typeof dialog.showModal !== "function") {
        window.open(src, "_blank", "noopener");
        return;
      }

      cleanupMedia();
      dialogTitle.textContent = title;
      dialogCaption.textContent = caption;

      if (type === "image") {
        var img = document.createElement("img");
        img.src = src;
        img.alt = title;
        dialogBody.appendChild(img);
      } else {
        var video = document.createElement("video");
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        if (poster) video.poster = poster.src;
        video.src = src;
        dialogBody.appendChild(video);
        activeVideo = video;
        var playPromise = video.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
      }

      document.body.classList.add("modal-open");
      dialog.showModal();
    }

    mediaTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        openMedia(trigger);
      });
    });

    closeButton.addEventListener("click", closeMedia);
    dialog.addEventListener("close", cleanupMedia);
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeMedia();
    });
  }

  /* ----------------------------------------------------------
     Page carousels (module videos and email proof)
     ---------------------------------------------------------- */
  function initSlideCarousel(root) {
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-dot]"));
    var count = root.querySelector("[data-count]");
    var index = 0;

    function show(nextIndex) {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
      root.querySelectorAll("video").forEach(function (video) {
        if (!slides[index].contains(video)) video.pause();
      });
      if (count) {
        count.textContent =
          String(index + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      }
    }

    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        show(parseInt(dot.getAttribute("data-dot"), 10) || 0);
      });
    });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });

    show(0);
  }

  Array.prototype.slice
    .call(
      document.querySelectorAll(
        "[data-proof-carousel], [data-module-carousel], [data-access-carousel], [data-people-carousel], [data-hardware-carousel], [data-sysflow-carousel], [data-trigger-carousel]"
      )
    )
    .forEach(initSlideCarousel);

  /* ----------------------------------------------------------
     Print
     ---------------------------------------------------------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-print]")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  /* ----------------------------------------------------------
     Footer year
     ---------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
