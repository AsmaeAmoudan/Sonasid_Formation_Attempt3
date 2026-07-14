/* ============================================================================
   Sonasid Formation — Authentification simulée
   ----------------------------------------------------------------------------
   Version statique : aucune vraie authentification.
   - Stocke un jeton factice dans sessionStorage
   - Toute page protégée redirige vers login.html si absence de session
   - login.html valide email + mot de passe (champs requis, format email)
   - TODO FLASK : remplacer par appels POST /api/auth/login renvoyant un JWT
     puis stocker le token via httpOnly cookie ou Authorization header.
   ============================================================================ */

window.SonasidAuth = (function () {
  "use strict";

  const STORAGE_KEY = "sonasid_formation_session";
  const SESSION_TTL_MS = 1000 * 60 * 60 * 8; /* 8h */

  /* Comptes de démonstration — affichés sur la page login */
  const DEMO_ACCOUNTS = [
    { email: "n.cherkaoui@sonasid.ma",  password: "sonasid",      nom: "Nadia Cherkaoui",  role: "Responsable Formation" },
    { email: "h.elamrani@sonasid.ma",   password: "sonasid",      nom: "Hind El Amrani",   role: "Gestionnaire Formation" },
    { email: "demo@sonasid.ma",         password: "demo",         nom: "Utilisateur démo", role: "Lecteur" }
  ];

  /* --- Crée une session simulée --- */
  function login(email) {
    const session = {
      email: email,
      nom: "Nadia Cherkaoui",
      role: "Responsable Formation",
      departement: "Direction des Ressources Humaines",
      site: "Casablanca",
      issuedAt: Date.now(),
      expiresAt: Date.now() + SESSION_TTL_MS,
      token: "mock-jwt-" + Math.random().toString(36).slice(2, 12)
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) { /* sessionStorage indisponible — mode non persistant */ }
    return session;
  }

  /* --- Détruit la session et redirige vers login --- */
  function logout() {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
    window.location.href = "login.html";
  }

  /* --- Récupère la session courante ou null --- */
  function getSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (Date.now() > s.expiresAt) {
        sessionStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return s;
    } catch (e) {
      return null;
    }
  }

  /* --- Vérifie la session sur une page protégée ---
     À appeler depuis n'importe quelle page sauf login.html.
     Redirige vers login.html si pas de session valide. */
  function requireSession() {
    if (!getSession()) {
      window.location.replace("login.html");
      return false;
    }
    return true;
  }

  /* --- Validation basique du formulaire de login ---
     Retourne { valid: bool, errors: {field: msg} } */
  function validateLogin(email, password) {
    const errors = {};
    if (!email || !email.trim()) {
      errors.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Format d'email invalide.";
    }
    if (!password) {
      errors.password = "Le mot de passe est obligatoire.";
    } else if (password.length < 4) {
      errors.password = "Le mot de passe doit faire au moins 4 caractères.";
    }
    return { valid: Object.keys(errors).length === 0, errors };
  }

  /* --- Tente une connexion (mock) ---
     En version statique : accepte n'importe quel compte valide syntaxiquement,
     ou les comptes de démo. TODO FLASK : POST /api/auth/login. */
  function attemptLogin(email, password) {
    const v = validateLogin(email, password);
    if (!v.valid) return { success: false, errors: v.errors };

    /* Vérifie les comptes démo si l'email correspond */
    const demo = DEMO_ACCOUNTS.find(a => a.email === email.trim().toLowerCase());
    if (demo && demo.password !== password) {
      return { success: false, errors: { password: "Mot de passe incorrect pour ce compte démo." } };
    }
    /* Sinon : accepte n'importe quelle combinaison valide syntaxiquement
       (mode aperçu — pas de vraie sécurité) */
    const session = login(email.trim().toLowerCase());
    return { success: true, session };
  }

  return {
    login, logout, getSession, requireSession,
    validateLogin, attemptLogin, DEMO_ACCOUNTS
  };
})();

/* ============================================================================
   Initialisation du formulaire de login (si présent sur la page)
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  /* Si déjà connecté et qu'on est sur login.html → redirige vers index.html */
  if (document.body.dataset.page === "login" && SonasidAuth.getSession()) {
    window.location.replace("index.html");
    return;
  }

  const form = document.getElementById("login-form");
  if (!form) return;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("login-alert");
  const submitBtn = form.querySelector("[type=submit]");

  /* Champ : nettoie l'erreur à la saisie */
  function clearFieldError(input) {
    const field = input.closest(".form-field");
    if (field) field.classList.remove("is-invalid");
  }
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => clearFieldError(input));
  });

  /* Bouton "utiliser un compte démo" */
  document.querySelectorAll("[data-demo-account]").forEach(btn => {
    btn.addEventListener("click", () => {
      emailInput.value = btn.dataset.demoAccount;
      passwordInput.value = btn.dataset.demoPassword || "sonasid";
      clearFieldError(emailInput);
      clearFieldError(passwordInput);
      emailInput.focus();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const result = SonasidAuth.attemptLogin(email, password);

    if (!result.success) {
      /* Affiche les erreurs champ par champ */
      if (result.errors.email) {
        const f = emailInput.closest(".form-field");
        f.classList.add("is-invalid");
        f.querySelector(".form-field__error").textContent = result.errors.email;
      }
      if (result.errors.password) {
        const f = passwordInput.closest(".form-field");
        f.classList.add("is-invalid");
        f.querySelector(".form-field__error").textContent = result.errors.password;
      }
      alertBox.classList.add("is-visible");
      alertBox.querySelector(".login-form__alert-text").textContent =
        "Vérifiez vos identifiants et réessayez.";
      return;
    }

    /* Succès — bouton en état loading puis redirection */
    alertBox.classList.remove("is-visible");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Connexion…</span>';

    setTimeout(() => {
      window.location.href = "index.html";
    }, 700);
  });
});
