/* ============================================================================
   Sonasid Formation — Application JS (shared)
   ----------------------------------------------------------------------------
   Rôles de ce fichier :
   1. Injecter la sidebar de façon cohérente sur toutes les pages
      (TODO FLASK : remplacer par {% include 'partials/sidebar.html' %})
   2. Gérer la sidebar mobile (hamburger, backdrop)
   3. Animer la jauge signature en "S" (stroke-dashoffset)
   4. Compter progressivement les valeurs KPI (count-up)
   5. Initialiser AOS (animations au scroll) si la lib est chargée
   6. Fournir des helpers de rendu (badges, cellules utilisateur, jauges)

   Toutes les fonctions lisent dans SonasidData / SonasidHelpers (data.js).
   ============================================================================ */

(function () {
  "use strict";

  /* =========================================================================
     1. Définition de la sidebar — injectée sur chaque page via [data-sidebar]
     Le marqueur data-active sur <body> indique la page courante.
     ========================================================================= */
  const NAV_ITEMS = [
    {
      section: "Pilotage",
      links: [
        { id: "dashboard",   href: "index.html",       label: "Tableau de bord", icon: "dashboard" },
        { id: "effectif",    href: "effectif.html",    label: "Effectif",        icon: "users" },
        { id: "formations",  href: "formations.html",  label: "Formations",      icon: "book" },
        { id: "sessions",    href: "sessions.html",    label: "Sessions",        icon: "calendar" },
        { id: "evaluations", href: "evaluations.html", label: "Évaluations",     icon: "star" },
        { id: "budget",      href: "budget.html",      label: "Budget",          icon: "wallet" }
      ]
    },
    {
      section: "Administration",
      links: [
        { id: "utilisateurs",href: "utilisateurs.html",label: "Utilisateurs",    icon: "shield" },
        { id: "profil",      href: "profil.html",      label: "Mon profil",      icon: "user" }
      ]
    }
  ];

  /* Icônes SVG — tracés fins, cohérents, jamais "flat startup-like" */
  const ICONS = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    users:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M18 7a4 4 0 0 1 0 7.75"/></svg>',
    book:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    calendar:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
    star:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4.5L6 22l1.5-8.5L2 9h7z"/></svg>',
    wallet:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M16 12h2"/><path d="M3 9h18"/></svg>',
    shield:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    user:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    logout:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
    search:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    bell:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    menu:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    plus:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    arrowUp:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    edit:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-11 11H6v-4z"/></svg>',
    trash:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
    eye:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    download:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    filter:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></svg>',
    check:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    clock:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    location:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    trend:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></svg>'
  };

  /* Logo "S" signature — courbe en mouvement */
  const SONASID_LOGO_MARK = `
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 9.5C24 5.5 20.5 3 16 3C11.5 3 8 5.5 8 9.5C8 13.5 11.5 14.5 16 16C20.5 17.5 24 18.5 24 22.5C24 26.5 20.5 29 16 29C11.5 29 8 26.5 8 22.5"
        stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`;

  /* Construit le HTML de la sidebar */
  function buildSidebarHTML(activeId) {
    let html = `
      <div class="sidebar__brand">
        <div class="sidebar__brand-mark" aria-hidden="true">${SONASID_LOGO_MARK}</div>
        <div class="sidebar__brand-text">
          <span class="sidebar__brand-name">SONASID</span>
          <span class="sidebar__brand-tag">Formation</span>
        </div>
      </div>
      <nav class="sidebar__nav" aria-label="Navigation principale">
    `;
    NAV_ITEMS.forEach(group => {
      html += `<div class="sidebar__section-label">${group.section}</div>`;
      html += `<div class="sidebar__links">`;
      group.links.forEach(item => {
        const isActive = item.id === activeId ? " is-active" : "";
        const icon = ICONS[item.icon] || "";
        html += `
          <a href="${item.href}" class="sidebar__link${isActive}" data-nav="${item.id}">
            <span class="sidebar__link-icon" aria-hidden="true">${icon}</span>
            <span>${item.label}</span>
          </a>
        `;
      });
      html += `</div>`;
    });

    /* Lien déconnexion */
    html += `
      <div class="sidebar__section-label">Session</div>
      <div class="sidebar__links">
        <a href="login.html" class="sidebar__link" id="logout-link">
          <span class="sidebar__link-icon" aria-hidden="true">${ICONS.logout}</span>
          <span>Déconnexion</span>
        </a>
      </div>
    `;

    /* Footer utilisateur */
    html += `
      </nav>
      <div class="sidebar__footer">
        <a href="profil.html" class="sidebar__user" aria-label="Mon profil">
          <div class="sidebar__user-avatar" aria-hidden="true">NC</div>
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">Nadia Cherkaoui</span>
            <span class="sidebar__user-role">Responsable Formation</span>
          </div>
        </a>
      </div>
    `;
    return html;
  }

  /* Construit le topbar (titre + breadcrumb + recherche + notif) */
  function buildTopbarHTML(opts) {
    const breadcrumb = opts.breadcrumb || "Sonasid Formation";
    const heading = opts.heading || "Page";
    return `
      <header class="topbar">
        <div class="topbar__left">
          <button class="topbar__hamburger" id="hamburger-btn" aria-label="Ouvrir le menu">
            ${ICONS.menu}
          </button>
          <div class="topbar__title">
            <span class="topbar__breadcrumb">${breadcrumb}</span>
            <h1 class="topbar__heading">${heading}</h1>
          </div>
        </div>
        <div class="topbar__right">
          <label class="topbar__search">
            <span aria-hidden="true">${ICONS.search}</span>
            <input type="search" placeholder="Rechercher un collaborateur, une session…" aria-label="Recherche globale">
          </label>
          <button class="topbar__icon-btn" aria-label="Notifications">
            ${ICONS.bell}
            <span class="dot" aria-hidden="true"></span>
          </button>
        </div>
      </header>
    `;
  }

  /* =========================================================================
     2. Initialisation au chargement du DOM
     ========================================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const activeNav = body.dataset.sidebar || "dashboard";

    /* Injecte la sidebar dans [data-sidebar-host] si présent */
    const host = document.querySelector("[data-sidebar-host]");
    if (host) {
      host.innerHTML = buildSidebar(activeNav);
    }

    /* Injecte le topbar dans [data-topbar-host] si présent */
    const topbarHost = document.querySelector("[data-topbar-host]");
    if (topbarHost) {
      topbarHost.innerHTML = buildTopbarHTML({
        breadcrumb: topbarHost.dataset.breadcrumb || "",
        heading: topbarHost.dataset.heading || ""
      });
    }

    /* Active le menu mobile (hamburger + backdrop) */
    initMobileSidebar();

    /* Lien déconnexion : nettoie sessionStorage avant retour login */
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        SonasidAuth.logout();
      });
    }

    /* Anime les jauges en S */
    animateSGauges();

    /* Count-up sur les éléments [data-count-up] */
    runCountUp();

    /* Initialise AOS si chargé */
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: "ease-out-cubic",
        once: true,
        offset: 40,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      });
    }

    /* Anime les barres de progression classiques */
    animateProgressBars();
  });

  /* Construit la sidebar — wrapper + contenu, avec backdrop mobile */
  function buildSidebar(activeNav) {
    return `
      <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
      <aside class="sidebar" id="sidebar" aria-label="Navigation latérale">
        ${buildSidebarHTML(activeNav)}
      </aside>
    `;
  }

  /* Gestion ouverture/fermeture sidebar sur mobile */
  function initMobileSidebar() {
    const btn = document.getElementById("hamburger-btn");
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (!btn || !sidebar) return;

    function toggle(open) {
      const isOpen = open ?? !sidebar.classList.contains("is-open");
      sidebar.classList.toggle("is-open", isOpen);
      backdrop?.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", isOpen);
    }
    btn.addEventListener("click", () => toggle());
    backdrop?.addEventListener("click", () => toggle(false));

    /* Ferme au clic sur un lien (mobile uniquement) */
    sidebar.querySelectorAll(".sidebar__link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 900px)").matches) toggle(false);
      });
    });

    /* Échappe pour fermer */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggle(false);
    });
  }

  /* =========================================================================
     3. Jauge signature en "S"
     La courbe en S est tracée en SVG. Au chargement, on calcule sa longueur
     (path.getTotalLength()), puis on anime stroke-dashoffset.
     La valeur cible est donnée par data-pct (0-100) sur l'élément .s-gauge.
     ========================================================================= */
  function animateSGauges() {
    const gauges = document.querySelectorAll(".s-gauge");
    if (!gauges.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gauges.forEach(g => {
      const fill = g.querySelector(".s-gauge__fill");
      const endpoint = g.querySelector(".s-gauge__endpoint");
      if (!fill) return;

      const pathLen = fill.getTotalLength ? fill.getTotalLength() : 280;
      fill.style.setProperty("--len", pathLen);

      const pct = Math.max(0, Math.min(100, parseFloat(g.dataset.pct || "0")));
      const offset = pathLen - (pathLen * pct / 100);

      if (reduced) {
        fill.style.strokeDashoffset = offset;
        g.classList.add("is-drawn");
        return;
      }

      /* Légère attente pour laisser l'animation d'entrée des cartes se stabiliser */
      const delay = parseInt(g.dataset.delay || "350", 10);
      setTimeout(() => {
        fill.style.strokeDashoffset = offset;
        g.classList.add("is-drawn");

        /* Déplace le point d'extrémité (endpoint) le long de la courbe.
           Approximation : position proportionnelle selon pct. */
        if (endpoint && fill.getPointAtLength) {
          try {
            const point = fill.getPointAtLength(pathLen * pct / 100);
            endpoint.setAttribute("cx", point.x);
            endpoint.setAttribute("cy", point.y);
          } catch (e) { /* silently ignore */ }
        }
      }, delay);
    });
  }

  /* Helper exposé pour construire le SVG de jauge depuis n'importe quelle page */
  window.SonasidGauge = function (pct, opts = {}) {
    const colorClass = opts.color ? ` s-gauge__fill--${opts.color}` : "";
    const delay = opts.delay ?? 350;
    return `
      <svg class="s-gauge" viewBox="0 0 200 56" preserveAspectRatio="none" data-pct="${pct}" data-delay="${delay}" role="img" aria-label="Progression ${pct}%">
        <path class="s-gauge__track"
              d="M 8 44 C 38 44, 60 8, 100 8 C 140 8, 162 44, 192 44" />
        <path class="s-gauge__fill${colorClass}"
              d="M 8 44 C 38 44, 60 8, 100 8 C 140 8, 162 44, 192 44" />
        <circle class="s-gauge__endpoint" cx="8" cy="44" r="4.5" />
      </svg>
    `;
  };

  /* =========================================================================
     4. Count-up des valeurs numériques
     Les éléments [data-count-up] voient leur texte passé de 0 à la valeur
     cible (data-target) en ~1s. Format respecté via data-format.
     ========================================================================= */
  function runCountUp() {
    const els = document.querySelectorAll("[data-count-up]");
    if (!els.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    els.forEach(el => {
      const target = parseFloat(el.dataset.target || "0");
      const format = el.dataset.format || "int"; // int | mad | pct | decimal
      const duration = reduced ? 0 : 1000;
      const start = performance.now();

      function formatValue(v) {
        switch (format) {
          case "mad":    return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(Math.round(v)) + " MAD";
          case "pct":    return Math.round(v) + "%";
          case "decimal":return v.toFixed(1).replace(".", ",");
          default:       return new Intl.NumberFormat("fr-FR").format(Math.round(v));
        }
      }

      if (reduced) {
        el.textContent = formatValue(target);
        return;
      }

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
        el.textContent = formatValue(target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatValue(target);
      }
      requestAnimationFrame(tick);
    });
  }

  /* =========================================================================
     5. Barres de progression classiques (animation largeur)
     ========================================================================= */
  function animateProgressBars() {
    document.querySelectorAll(".progress-bar__fill").forEach(bar => {
      const target = bar.dataset.value || "0";
      requestAnimationFrame(() => {
        setTimeout(() => { bar.style.width = target + "%"; }, 200);
      });
    });
  }

  /* =========================================================================
     6. Helpers de rendu partagés
     Accessibles via window.SonasidRender
     ========================================================================= */
  window.SonasidRender = {

    badge(statut) {
      const cls = SonasidHelpers.statutBadgeClass(statut);
      const label = SonasidHelpers.statutLabel(statut);
      return `<span class="badge badge--${cls}">${label}</span>`;
    },

    tag(text, variant = "") {
      const v = variant ? ` tag--${variant}` : "";
      return `<span class="tag${v}">${text}</span>`;
    },

    userCell(collab) {
      if (!collab) return `<span class="cell-muted">—</span>`;
      const ini = SonasidHelpers.initials(collab.prenom, collab.nom);
      const color = SonasidHelpers.avatarColor(collab.id);
      return `
        <div class="cell-user">
          <div class="cell-user__avatar cell-user__avatar--${color}" aria-hidden="true">${ini}</div>
          <div>
            <div class="cell-user__name">${collab.prenom} ${collab.nom}</div>
            <div class="cell-user__meta">${collab.matricule} · ${collab.poste}</div>
          </div>
        </div>
      `;
    },

    kpiCard(opts) {
      const { label, value, unit, format, target, delta, deltaDir, caption, icon, iconColor, pct, gaugeColor } = opts;
      const deltaCls = deltaDir === "up" ? "kpi-card__delta--up" : deltaDir === "down" ? "kpi-card__delta--down" : "kpi-card__delta--neutral";
      const deltaArrow = deltaDir === "up" ? ICONS.arrowUp : deltaDir === "down" ? ICONS.arrowDown : "";
      const iconCls = iconColor ? ` kpi-card__icon--${iconColor}` : "";
      const gaugeHTML = (pct != null) ? `
        <div class="kpi-card__gauge-row">
          ${window.SonasidGauge(pct, { color: gaugeColor })}
          <span class="kpi-card__pct" style="${gaugeColor === 'orange' ? 'color: var(--sonasid-orange);' : gaugeColor === 'steel' ? 'color: var(--sonasid-steel);' : ''}">${pct}%</span>
        </div>` : "";

      return `
        <div class="kpi-card">
          <div class="kpi-card__header">
            <div>
              <div class="kpi-card__label">${label}</div>
              ${delta != null ? `<div class="kpi-card__delta ${deltaCls}">${deltaArrow}${delta}</div>` : ""}
            </div>
            ${icon ? `<div class="kpi-card__icon${iconCls}" aria-hidden="true">${ICONS[icon] || ""}</div>` : ""}
          </div>
          <div class="kpi-card__value">
            <span data-count-up data-target="${target || value}" data-format="${format || 'int'}">0</span>
            ${unit ? `<span class="unit">${unit}</span>` : ""}
          </div>
          ${caption ? `<div class="kpi-card__caption">${caption}</div>` : ""}
          ${gaugeHTML}
        </div>
      `;
    },

    icon(name) {
      return ICONS[name] || "";
    }
  };

})();
