/* ============================================================================
   Sonasid Formation — Données mockées
   ----------------------------------------------------------------------------
   Structure pensée pour matcher les futures réponses API Flask :
   - Chaque "table" est un tableau d'objets plats
   - Les IDs sont en format lisible (COL-001, FOR-001, SES-001, etc.)
   - Les champs référencent d'autres IDs par *_id
   - Les statuts sont des enums string (pas de codes numériques)

   TODO FLASK : remplacer chaque tableau par un fetch() vers l'endpoint
   correspondant. Exemple :
     fetch('/api/collaborateurs').then(r => r.json()).then(data => ...)
   L'UI ne devrait pas changer tant que la structure JSON est identique.
   ============================================================================ */

const SonasidData = {

  /* --------------------------------------------------------------------------
     Méta entreprise
     -------------------------------------------------------------------------- */
  meta: {
    entreprise: "Sonasid",
    departement: "Direction des Ressources Humaines — Pôle Formation",
    exercice: 2026,
    sites: ["Nador (siège de production)", "Casablanca (siège administratif)"],
    signature: "The Power of Steel, the Future of Green"
  },

  /* --------------------------------------------------------------------------
     Départements / fonctions de l'entreprise
     -------------------------------------------------------------------------- */
  departements: [
    { id: "DEP-PROD",   code: "PROD", libelle: "Production Acier",     site: "Nador" },
    { id: "DEP-MAINT",  code: "MAINT", libelle: "Maintenance",          site: "Nador" },
    { id: "DEP-QUAL",   code: "QUAL",  libelle: "Qualité",              site: "Nador" },
    { id: "DEP-HSE",    code: "HSE",   libelle: "HSE - Sécurité",       site: "Nador" },
    { id: "DEP-LOG",    code: "LOG",   libelle: "Logistique",           site: "Nador" },
    { id: "DEP-PROC",   code: "PROC",  libelle: "Procédés & Ingénierie", site: "Nador" },
    { id: "DEP-RH",     code: "RH",    libelle: "Ressources Humaines",  site: "Casablanca" },
    { id: "DEP-FIN",    code: "FIN",   libelle: "Finance & Contrôle",   site: "Casablanca" },
    { id: "DEP-ACH",    code: "ACH",   libelle: "Achats",               site: "Casablanca" },
    { id: "DEP-COM",    code: "COM",   libelle: "Commercial",           site: "Casablanca" },
    { id: "DEP-DIR",    code: "DIR",   libelle: "Direction Générale",   site: "Casablanca" }
  ],

  /* --------------------------------------------------------------------------
     Collaborateurs — échantillon réaliste
     -------------------------------------------------------------------------- */
  collaborateurs: [
    { id: "COL-0014", matricule: "SN-10245", prenom: "Karim",     nom: "El Idrissi",    departement: "DEP-PROD", poste: "Opérateur de coulée continue",        site: "Nador",      dateEmbauche: "2018-03-12", statut: "actif",   email: "k.elidrissi@sonasid.ma" },
    { id: "COL-0027", matricule: "SN-10438", prenom: "Fatima",    nom: "Benani",        departement: "DEP-QUAL", poste: "Technicienne contrôle qualité",        site: "Nador",      dateEmbauche: "2020-09-01", statut: "actif",   email: "f.benani@sonasid.ma" },
    { id: "COL-0031", matricule: "SN-10512", prenom: "Youssef",   nom: "Alaoui",        departement: "DEP-MAINT", poste: "Technicien maintenance électrique", site: "Nador", dateEmbauche: "2017-11-23", statut: "actif", email: "y.alaoui@sonasid.ma" },
    { id: "COL-0042", matricule: "SN-10671", prenom: "Nadia",     nom: "Cherkaoui",     departement: "DEP-RH",  poste: "Responsable Formation & Développement", site: "Casablanca", dateEmbauche: "2015-06-15", statut: "actif", email: "n.cherkaoui@sonasid.ma" },
    { id: "COL-0058", matricule: "SN-10842", prenom: "Hamid",     nom: "Berrada",       departement: "DEP-HSE", poste: "Ingénieur HSE",                          site: "Nador",      dateEmbauche: "2019-02-18", statut: "actif", email: "h.berrada@sonasid.ma" },
    { id: "COL-0063", matricule: "SN-10901", prenom: "Sara",      nom: "Tazi",          departement: "DEP-PROC",poste: "Ingénieure procédés sidérurgiques",      site: "Nador",      dateEmbauche: "2021-10-04", statut: "actif", email: "s.tazi@sonasid.ma" },
    { id: "COL-0072", matricule: "SN-11022", prenom: "Rachid",    nom: "Mansouri",      departement: "DEP-LOG", poste: "Chef de quai — expéditions",             site: "Nador",      dateEmbauche: "2016-04-20", statut: "actif", email: "r.mansouri@sonasid.ma" },
    { id: "COL-0088", matricule: "SN-11234", prenom: "Imane",     nom: "Sefiani",       departement: "DEP-FIN", poste: "Contrôleuse de gestion",                 site: "Casablanca", dateEmbauche: "2022-01-10", statut: "actif", email: "i.sefiani@sonasid.ma" },
    { id: "COL-0094", matricule: "SN-11312", prenom: "Tarik",     nom: "Bouchikhi",     departement: "DEP-MAINT",poste: "Responsable maintenance générale",       site: "Nador",      dateEmbauche: "2013-08-05", statut: "actif", email: "t.bouchikhi@sonasid.ma" },
    { id: "COL-0103", matricule: "SN-11455", prenom: "Leila",     nom: "Fassi",         departement: "DEP-ACH", poste: "Acheteuse stratégique",                  site: "Casablanca", dateEmbauche: "2020-05-19", statut: "actif", email: "l.fassi@sonasid.ma" },
    { id: "COL-0118", matricule: "SN-11608", prenom: "Omar",      nom: "Kabbaj",        departement: "DEP-PROD",poste: "Chef de poste coulée",                    site: "Nador",      dateEmbauche: "2014-02-11", statut: "actif", email: "o.kabbaj@sonasid.ma" },
    { id: "COL-0125", matricule: "SN-11733", prenom: "Salma",     nom: "Bennani",       departement: "DEP-COM", poste: "Chargeée clientèle sidérurgie",           site: "Casablanca", dateEmbauche: "2021-11-22", statut: "actif", email: "s.bennani@sonasid.ma" },
    { id: "COL-0131", matricule: "SN-11801", prenom: "Khalid",    nom: "Ouazzani",      departement: "DEP-PROC",poste: "Ingénieur laminage",                      site: "Nador",      dateEmbauche: "2018-07-30", statut: "actif", email: "k.ouazzani@sonasid.ma" },
    { id: "COL-0140", matricule: "SN-11945", prenom: "Hind",      nom: "El Amrani",     departement: "DEP-RH",  poste: "Gestionnaire carrières & mobilité",       site: "Casablanca", dateEmbauche: "2019-09-16", statut: "actif", email: "h.elamrani@sonasid.ma" },
    { id: "COL-0152", matricule: "SN-12088", prenom: "Brahim",    nom: "Saidi",         departement: "DEP-HSE", poste: "Animateur sécurité de site",              site: "Nador",      dateEmbauche: "2017-01-09", statut: "actif", email: "b.saidi@sonasid.ma" },
    { id: "COL-0163", matricule: "SN-12205", prenom: "Yasmine",   nom: "El Fassi",      departement: "DEP-QUAL",poste: "Responsable système de management QSE",   site: "Nador",      dateEmbauche: "2016-11-14", statut: "actif", email: "y.elfassi@sonasid.ma" },
    { id: "COL-0171", matricule: "SN-12310", prenom: "Anas",      nom: "Belaala",       departement: "DEP-LOG", poste: "Coordinateur transports",                 site: "Nador",      dateEmbauche: "2022-03-21", statut: "actif", email: "a.belaala@sonasid.ma" },
    { id: "COL-0188", matricule: "SN-12478", prenom: "Meryem",    nom: "Alaoui",        departement: "DEP-FIN", poste: "Comptable fournisseur",                   site: "Casablanca", dateEmbauche: "2020-02-03", statut: "conge", email: "m.alaoui@sonasid.ma" },
    { id: "COL-0192", matricule: "SN-12533", prenom: "Said",      nom: "Lahlou",        departement: "DEP-PROD",poste: "Opérateur haut fourneau",                 site: "Nador",      dateEmbauche: "2012-05-08", statut: "actif", email: "s.lahlou@sonasid.ma" },
    { id: "COL-0203", matricule: "SN-12687", prenom: "Ghita",     nom: "Benslimane",    departement: "DEP-PROC",poste: "Ingénieure R&D métallurgie",              site: "Nador",      dateEmbauche: "2023-02-13", statut: "actif", email: "g.benslimane@sonasid.ma" },
    { id: "COL-0210", matricule: "SN-12745", prenom: "Mehdi",     nom: "Tahiri",        departement: "DEP-MAINT",poste: "Technicien mécanique",                   site: "Nador",      dateEmbauche: "2018-10-22", statut: "actif", email: "m.tahiri@sonasid.ma" },
    { id: "COL-0221", matricule: "SN-12890", prenom: "Nawal",     nom: "El Khattabi",   departement: "DEP-ACH", poste: "Acheteuse production",                    site: "Casablanca", dateEmbauche: "2019-04-17", statut: "actif", email: "n.elkhattabi@sonasid.ma" },
    { id: "COL-0228", matricule: "SN-12944", prenom: "Abdelali",  nom: "Rachidi",       departement: "DEP-PROD",poste: "Superviseur équipe coulée",               site: "Nador",      dateEmbauche: "2010-08-23", statut: "actif", email: "a.rachidi@sonasid.ma" }
  ],

  /* --------------------------------------------------------------------------
     Catalogue de formations
     -------------------------------------------------------------------------- */
  catalogue: [
    { id: "FOR-001", code: "SEC-IND-01", intitule: "Sécurité industrielle — Habilitation B1V",        categorie: "Sécurité",     dureeH: 14, mode: "Présentiel",     prestataire: "Cofely Endel",         cout: 1800, recyclage: 24, valide: true },
    { id: "FOR-002", code: "SEC-IND-02", intitule: "Travail en hauteur — Catégories 1 à 3",          categorie: "Sécurité",     dureeH: 8,  mode: "Présentiel",     prestataire: "Apave Maroc",          cout: 950,  recyclage: 12, valide: true },
    { id: "FOR-003", code: "HAB-ELEC-01",intitule: "Habilitation électrique BR / B2V",                categorie: "Sécurité",     dureeH: 21, mode: "Présentiel",     prestataire: "Apave Maroc",          cout: 2400, recyclage: 24, valide: true },
    { id: "FOR-004", code: "PROC-LAM-01",intitule: "Optimisation du laminage à chaud",                categorie: "Technique",    dureeH: 18, mode: "Présentiel",     prestataire: "In-house Sonasid",     cout: 0,    recyclage: 36, valide: true },
    { id: "FOR-005", code: "PROC-COUL-01",intitule:"Maîtrise de la coulée continue",                  categorie: "Technique",    dureeH: 24, mode: "Présentiel",     prestataire: "In-house Sonasid",     cout: 0,    recyclage: 36, valide: true },
    { id: "FOR-006", code: "QUAL-ISO-01",intitule: "ISO 9001 — Sensibilisation système qualité",     categorie: "Qualité",      dureeH: 7,  mode: "Présentiel",     prestataire: "Bureau Veritas",       cout: 720,  recyclage: 24, valide: true },
    { id: "FOR-007", code: "QUAL-OUTIL-01",intitule:"Maîtrise statistique des procédés (MSP/SPC)",   categorie: "Qualité",      dureeH: 16, mode: "Mixte",          prestataire: "Cofrac Maroc",         cout: 1650, recyclage: 24, valide: true },
    { id: "FOR-008", code: "MGMT-LEAD-01",intitule:"Leadership pour chefs de poste",                 categorie: "Management",   dureeH: 28, mode: "Présentiel",     prestataire: "ESSEC Executive",      cout: 4200, recyclage: 0,  valide: true },
    { id: "FOR-009", code: "MGMT-PROJ-01",intitule:"Pilotage de projet transverse",                  categorie: "Management",   dureeH: 21, mode: "Mixte",          prestataire: "HEM Executive",        cout: 3100, recyclage: 0,  valide: true },
    { id: "FOR-010", code: "HSE-ENV-01", intitule: "Management environnemental — ISO 14001",         categorie: "HSE",          dureeH: 14, mode: "Présentiel",     prestataire: "Bureau Veritas",       cout: 1450, recyclage: 24, valide: true },
    { id: "FOR-011", code: "HSE-RISK-01",intitule: "Analyse de risques AMDEC procédé",                categorie: "HSE",          dureeH: 12, mode: "Présentiel",     prestataire: "In-house Sonasid",     cout: 0,    recyclage: 24, valide: true },
    { id: "FOR-012", code: "DIG-EXCEL-01",intitule:"Excel avancé — tableaux croisés & Power Query",  categorie: "Digital",      dureeH: 14, mode: "Distanciel",     prestataire: "Wallix Academy",       cout: 880,  recyclage: 0,  valide: true },
    { id: "FOR-013", code: "DIG-ERP-01", intitule: "ERP SAP — transactions RH & temps",              categorie: "Digital",      dureeH: 18, mode: "Mixte",          prestataire: "SAP France",           cout: 2800, recyclage: 0,  valide: true },
    { id: "FOR-014", code: "LANG-ANG-01",intitule: "Anglais technique sidérurgie — niveau B1",       categorie: "Langues",      dureeH: 40, mode: "Distanciel",     prestataire: "British Council",      cout: 3200, recyclage: 0,  valide: true },
    { id: "FOR-015", code: "OFPPT-DUAL-01",intitule:"Formation diplômante — Technicien supérieur",   categorie: "OFPPT",        dureeH: 480,mode: "Présentiel",     prestataire: "OFPPT Nador",          cout: 0,    recyclage: 0,  valide: true },
    { id: "FOR-016", code: "MGT-COACH-01",intitule:"Coaching individuel — managers de proximité",    categorie: "Management",   dureeH: 10, mode: "Présentiel",     prestataire: "Coach externe certifié",cout: 3500,recyclage: 0,  valide: true },
    { id: "FOR-017", code: "PROC-HF-01", intitule: "Conduite de haut fourneau — cas avancés",        categorie: "Technique",    dureeH: 20, mode: "Présentiel",     prestataire: "In-house Sonasid",     cout: 0,    recyclage: 36, valide: false },
    { id: "FOR-018", code: "ACH-NEG-01", intitule: "Négociation achats industriels",                 categorie: "Achats",       dureeH: 16, mode: "Présentiel",     prestataire: "ESI Business School",  cout: 2400, recyclage: 0,  valide: true }
  ],

  /* --------------------------------------------------------------------------
     Sessions de formation planifiées / réalisées
     -------------------------------------------------------------------------- */
  sessions: [
    { id: "SES-2026-001", formationId: "FOR-001", code: "SEC-IND-01", intitule: "Sécurité industrielle — Habilitation B1V", dateDebut: "2026-01-12", dateFin: "2026-01-13", formateur: "M. Réda Karimi (Cofely Endel)", lieu: "Salle HSE — Nador",     inscrits: 14, places: 16, statut: "termine",     heures: 14 },
    { id: "SES-2026-002", formationId: "FOR-004", code: "PROC-LAM-01",intitule: "Optimisation du laminage à chaud",         dateDebut: "2026-01-19", dateFin: "2026-01-21", formateur: "M. Khalid Ouazzani (Sonasid)", lieu: "Atelier laminage",       inscrits: 8,  places: 10, statut: "termine",     heures: 18 },
    { id: "SES-2026-003", formationId: "FOR-008", code: "MGMT-LEAD-01",intitule:"Leadership pour chefs de poste",           dateDebut: "2026-02-02", dateFin: "2026-02-05", formateur: "Mme. Claire Dumas (ESSEC)",   lieu: "Centre de formation C_ht", inscrits: 12, places: 12, statut: "termine",     heures: 28 },
    { id: "SES-2026-004", formationId: "FOR-003", code: "HAB-ELEC-01",intitule: "Habilitation électrique BR / B2V",         dateDebut: "2026-02-10", dateFin: "2026-02-12", formateur: "M. Pascal Brun (Apave)",      lieu: "Salle HSE — Nador",      inscrits: 10, places: 12, statut: "termine",     heures: 21 },
    { id: "SES-2026-005", formationId: "FOR-010", code: "HSE-ENV-01", intitule: "Management environnemental — ISO 14001",   dateDebut: "2026-03-03", dateFin: "2026-03-04", formateur: "Mme. Sophie Mercier (BV)",    lieu: "Salle conf. Casa",       inscrits: 18, places: 20, statut: "termine",     heures: 14 },
    { id: "SES-2026-006", formationId: "FOR-012", code: "DIG-EXCEL-01",intitule:"Excel avancé — tableaux croisés & PQ",     dateDebut: "2026-03-17", dateFin: "2026-03-18", formateur: "M. Ayoub Lahlou (Wallix)",    lieu: "Distanciel — Teams",     inscrits: 22, places: 22, statut: "termine",     heures: 14 },
    { id: "SES-2026-007", formationId: "FOR-007", code: "QUAL-OUTIL-01",intitule:"MSP / SPC",                              dateDebut: "2026-04-07", dateFin: "2026-04-09", formateur: "M. Rémi Faure (Cofrac)",      lieu: "Salle technique Nador", inscrits: 9,  places: 12, statut: "en_cours",    heures: 16 },
    { id: "SES-2026-008", formationId: "FOR-014", code: "LANG-ANG-01",intitule: "Anglais technique — B1",                   dateDebut: "2026-04-01", dateFin: "2026-06-30", formateur: "Mrs. Emily Hart (BC)",        lieu: "Distanciel — Zoom",      inscrits: 16, places: 16, statut: "en_cours",    heures: 40 },
    { id: "SES-2026-009", formationId: "FOR-011", code: "HSE-RISK-01",intitule: "AMDEC procédé",                            dateDebut: "2026-04-22", dateFin: "2026-04-23", formateur: "M. Hamid Berrada (Sonasid)",  lieu: "Salle HSE — Nador",      inscrits: 11, places: 14, statut: "planifie",    heures: 12 },
    { id: "SES-2026-010", formationId: "FOR-009", code: "MGMT-PROJ-01",intitule:"Pilotage de projet transverse",            dateDebut: "2026-05-05", dateFin: "2026-05-07", formateur: "M. Olivier Marchand (HEM)",   lieu: "Centre de formation",    inscrits: 14, places: 16, statut: "planifie",    heures: 21 },
    { id: "SES-2026-011", formationId: "FOR-002", code: "SEC-IND-02", intitule: "Travail en hauteur — Cat. 1 à 3",          dateDebut: "2026-05-12", dateFin: "2026-05-12", formateur: "M. Pascal Brun (Apave)",      lieu: "Site Nador — atelier",   inscrits: 12, places: 12, statut: "planifie",    heures: 8  },
    { id: "SES-2026-012", formationId: "FOR-006", code: "QUAL-ISO-01",intitule:"ISO 9001 — sensibilisation",                dateDebut: "2026-05-19", dateFin: "2026-05-19", formateur: "Mme. Sophie Mercier (BV)",    lieu: "Salle conf. Casa",       inscrits: 20, places: 25, statut: "planifie",    heures: 7  },
    { id: "SES-2026-013", formationId: "FOR-013", code: "DIG-ERP-01", intitule: "ERP SAP — RH & temps",                    dateDebut: "2026-06-02", dateFin: "2026-06-04", formateur: "M. Lucas Petit (SAP)",        lieu: "Mixte — Casa + Teams",   inscrits: 8,  places: 12, statut: "planifie",    heures: 18 },
    { id: "SES-2026-014", formationId: "FOR-015", code: "OFPPT-DUAL-01",intitule:"Technicien supérieur — OFPPT",            dateDebut: "2026-01-15", dateFin: "2026-12-15", formateur: "Équipe OFPPT Nador",           lieu: "OFPPT Nador",            inscrits: 24, places: 24, statut: "en_cours",    heures: 480},
    { id: "SES-2026-015", formationId: "FOR-016", code: "MGT-COACH-01",intitule:"Coaching managers de proximité",            dateDebut: "2026-06-10", dateFin: "2026-07-10", formateur: "Mme. Isabelle Renard",         lieu: "Individuel — sur site",  inscrits: 6,  places: 6,  statut: "planifie",    heures: 10 }
  ],

  /* --------------------------------------------------------------------------
     Réalisations — liens collaborateur × session
     -------------------------------------------------------------------------- */
  realisations: [
    { id: "REA-0001", collaborateurId: "COL-0014", sessionId: "SES-2026-001", statut: "realise",  dateCompletion: "2026-01-13", note: 16 },
    { id: "REA-0002", collaborateurId: "COL-0192", sessionId: "SES-2026-001", statut: "realise",  dateCompletion: "2026-01-13", note: 15 },
    { id: "REA-0003", collaborateurId: "COL-0228", sessionId: "SES-2026-001", statut: "realise",  dateCompletion: "2026-01-13", note: 17 },
    { id: "REA-0004", collaborateurId: "COL-0131", sessionId: "SES-2026-002", statut: "realise",  dateCompletion: "2026-01-21", note: 18 },
    { id: "REA-0005", collaborateurId: "COL-0118", sessionId: "SES-2026-002", statut: "realise",  dateCompletion: "2026-01-21", note: 14 },
    { id: "REA-0006", collaborateurId: "COL-0228", sessionId: "SES-2026-002", statut: "absent",   dateCompletion: null,         note: null },
    { id: "REA-0007", collaborateurId: "COL-0094", sessionId: "SES-2026-003", statut: "realise",  dateCompletion: "2026-02-05", note: 17 },
    { id: "REA-0008", collaborateurId: "COL-0118", sessionId: "SES-2026-003", statut: "realise",  dateCompletion: "2026-02-05", note: 16 },
    { id: "REA-0009", collaborateurId: "COL-0228", sessionId: "SES-2026-003", statut: "realise",  dateCompletion: "2026-02-05", note: 19 },
    { id: "REA-0010", collaborateurId: "COL-0031", sessionId: "SES-2026-004", statut: "realise",  dateCompletion: "2026-02-12", note: 18 },
    { id: "REA-0011", collaborateurId: "COL-0210", sessionId: "SES-2026-004", statut: "realise",  dateCompletion: "2026-02-12", note: 15 },
    { id: "REA-0012", collaborateurId: "COL-0058", sessionId: "SES-2026-005", statut: "realise",  dateCompletion: "2026-03-04", note: 17 },
    { id: "REA-0013", collaborateurId: "COL-0163", sessionId: "SES-2026-005", statut: "realise",  dateCompletion: "2026-03-04", note: 16 },
    { id: "REA-0014", collaborateurId: "COL-0088", sessionId: "SES-2026-006", statut: "realise",  dateCompletion: "2026-03-18", note: 19 },
    { id: "REA-0015", collaborateurId: "COL-0140", sessionId: "SES-2026-006", statut: "realise",  dateCompletion: "2026-03-18", note: 18 },
    { id: "REA-0016", collaborateurId: "COL-0027", sessionId: "SES-2026-007", statut: "en_cours", dateCompletion: null,         note: null },
    { id: "REA-0017", collaborateurId: "COL-0063", sessionId: "SES-2026-007", statut: "en_cours", dateCompletion: null,         note: null },
    { id: "REA-0018", collaborateurId: "COL-0203", sessionId: "SES-2026-008", statut: "en_cours", dateCompletion: null,         note: null },
    { id: "REA-0019", collaborateurId: "COL-0125", sessionId: "SES-2026-008", statut: "en_cours", dateCompletion: null,         note: null },
    { id: "REA-0020", collaborateurId: "COL-0103", sessionId: "SES-2026-008", statut: "abandon",  dateCompletion: null,         note: null }
  ],

  /* --------------------------------------------------------------------------
     Évaluations post-formation (feedback apprenants)
     -------------------------------------------------------------------------- */
  evaluations: [
    { id: "EVA-0001", collaborateurId: "COL-0014", sessionId: "SES-2026-001", formationId: "FOR-001", notePedagogie: 4.5, noteContenu: 4.0, noteLogistique: 4.5, noteGlobale: 4.3, commentaire: "Format très concret, démonstrations EPI pertinentes.", date: "2026-01-14" },
    { id: "EVA-0002", collaborateurId: "COL-0192", sessionId: "SES-2026-001", formationId: "FOR-001", notePedagogie: 4.0, noteContenu: 4.0, noteLogistique: 3.5, noteGlobale: 3.8, commentaire: "Salle un peu petite mais contenu solide.", date: "2026-01-14" },
    { id: "EVA-0003", collaborateurId: "COL-0228", sessionId: "SES-2026-001", formationId: "FOR-001", notePedagogie: 5.0, noteContenu: 4.5, noteLogistique: 4.5, noteGlobale: 4.7, commentaire: "Excellente animation, cas pratiques tirés du terrain.", date: "2026-01-14" },
    { id: "EVA-0004", collaborateurId: "COL-0131", sessionId: "SES-2026-002", formationId: "FOR-004", notePedagogie: 4.5, noteContenu: 5.0, noteLogistique: 4.0, noteGlobale: 4.5, commentaire: "Khalid maîtrise parfaitement le sujet, échanges riches.", date: "2026-01-22" },
    { id: "EVA-0005", collaborateurId: "COL-0118", sessionId: "SES-2026-002", formationId: "FOR-004", notePedagogie: 4.0, noteContenu: 4.5, noteLogistique: 4.0, noteGlobale: 4.2, commentaire: "Apports techniques utiles pour la conduite de ligne.", date: "2026-01-22" },
    { id: "EVA-0006", collaborateurId: "COL-0094", sessionId: "SES-2026-003", formationId: "FOR-008", notePedagogie: 4.5, noteContenu: 4.5, noteLogistique: 5.0, noteGlobale: 4.7, commentaire: "Excellente prestation ESSEC, outils réinvestis immédiatement.", date: "2026-02-06" },
    { id: "EVA-0007", collaborateurId: "COL-0118", sessionId: "SES-2026-003", formationId: "FOR-008", notePedagogie: 5.0, noteContenu: 4.5, noteLogistique: 5.0, noteGlobale: 4.8, commentaire: "Meilleure formation management suivie ces dernières années.", date: "2026-02-06" },
    { id: "EVA-0008", collaborateurId: "COL-0228", sessionId: "SES-2026-003", formationId: "FOR-008", notePedagogie: 4.5, noteContenu: 4.0, noteLogistique: 4.5, noteGlobale: 4.3, commentaire: "Quelques séquences trop théoriques mais globalement très bien.", date: "2026-02-06" },
    { id: "EVA-0009", collaborateurId: "COL-0031", sessionId: "SES-2026-004", formationId: "FOR-003", notePedagogie: 4.0, noteContenu: 4.5, noteLogistique: 4.0, noteGlobale: 4.2, commentaire: "Habilitation obtenue, pratique sur poste très utile.", date: "2026-02-13" },
    { id: "EVA-0010", collaborateurId: "COL-0210", sessionId: "SES-2026-004", formationId: "FOR-003", notePedagogie: 4.0, noteContenu: 4.0, noteLogistique: 3.5, noteGlobale: 3.8, commentaire: "Rythme soutenu, prévoir plus de temps de mise en pratique.", date: "2026-02-13" },
    { id: "EVA-0011", collaborateurId: "COL-0058", sessionId: "SES-2026-005", formationId: "FOR-010", notePedagogie: 4.5, noteContenu: 4.5, noteLogistique: 4.5, noteGlobale: 4.5, commentaire: "Bonne articulation ISO 14001 avec nos enjeux site.", date: "2026-03-05" },
    { id: "EVA-0012", collaborateurId: "COL-0163", sessionId: "SES-2026-005", formationId: "FOR-010", notePedagogie: 4.0, noteContenu: 4.5, noteLogistique: 4.0, noteGlobale: 4.2, commentaire: "Contenu dense, supports à consolider.", date: "2026-03-05" },
    { id: "EVA-0013", collaborateurId: "COL-0088", sessionId: "SES-2026-006", formationId: "FOR-012", notePedagogie: 5.0, noteContenu: 4.5, noteLogistique: 4.5, noteGlobale: 4.7, commentaire: "Très pragmatique, j'ai pu refaire mes tableaux le lendemain.", date: "2026-03-19" },
    { id: "EVA-0014", collaborateurId: "COL-0140", sessionId: "SES-2026-006", formationId: "FOR-012", notePedagogie: 4.5, noteContenu: 4.5, noteLogistique: 4.0, noteGlobale: 4.3, commentaire: "Distanciel bien mené, exercices progresses pertinents.", date: "2026-03-19" }
  ],

  /* --------------------------------------------------------------------------
     Budget formation — pilotage par catégorie
     -------------------------------------------------------------------------- */
  budget: {
    annee: 2026,
    enveloppeGlobale: 1850000,
    realiseCumul: 612400,
    categories: [
      { categorie: "Sécurité & Habilitations", prevu: 420000, realise: 168500, sessions: 6,  couleur: "danger" },
      { categorie: "Technique & Procédés",      prevu: 320000, realise: 92000,  sessions: 4,  couleur: "steel" },
      { categorie: "Management & Leadership",   prevu: 380000, realise: 168000, sessions: 5,  couleur: "green" },
      { categorie: "Qualité & HSE",             prevu: 240000, realise: 88400,  sessions: 5,  couleur: "orange" },
      { categorie: "Digital & ERP",             prevu: 220000, realise: 55500,  sessions: 3,  couleur: "steel" },
      { categorie: "Langues",                   prevu: 150000, realise: 40000,  sessions: 1,  couleur: "green" },
      { categorie: "OFPPT & alternance",        prevu: 120000, realise: 0,      sessions: 1,  couleur: "orange" }
    ],
    mois: [
      { mois: "Jan", prevu: 95000,  realise: 95000  },
      { mois: "Fév", prevu: 140000, realise: 138000 },
      { mois: "Mar", prevu: 85000,  realise: 82400  },
      { mois: "Avr", prevu: 120000, realise: 98000  },
      { mois: "Mai", prevu: 165000, realise: 0      },
      { mois: "Juin",prevu: 110000, realise: 0      },
      { mois: "Juil",prevu: 80000,  realise: 0      },
      { mois: "Août",prevu: 30000,  realise: 0      },
      { mois: "Sep", prevu: 145000, realise: 0      },
      { mois: "Oct", prevu: 180000, realise: 0      },
      { mois: "Nov", prevu: 120000, realise: 0      },
      { mois: "Déc", prevu: 110000, realise: 0      }
    ]
  },

  /* --------------------------------------------------------------------------
     Utilisateurs internes de l'application
     -------------------------------------------------------------------------- */
  utilisateurs: [
    { id: "USR-001", nom: "Nadia Cherkaoui",     email: "n.cherkaoui@sonasid.ma", role: "admin",     departement: "DEP-RH",   site: "Casablanca", dernierAcces: "2026-04-09 08:42", statut: "actif" },
    { id: "USR-002", nom: "Hind El Amrani",      email: "h.elamrani@sonasid.ma",  role: "gestionnaire",departement: "DEP-RH", site: "Casablanca", dernierAcces: "2026-04-08 17:11", statut: "actif" },
    { id: "USR-003", nom: "Hamid Berrada",       email: "h.berrada@sonasid.ma",   role: "manager",   departement: "DEP-HSE",  site: "Nador",      dernierAcces: "2026-04-09 07:55", statut: "actif" },
    { id: "USR-004", nom: "Tarik Bouchikhi",     email: "t.bouchikhi@sonasid.ma", role: "manager",   departement: "DEP-MAINT",site: "Nador",      dernierAcces: "2026-04-07 14:20", statut: "actif" },
    { id: "USR-005", nom: "Yasmine El Fassi",    email: "y.elfassi@sonasid.ma",   role: "manager",   departement: "DEP-QUAL", site: "Nador",      dernierAcces: "2026-04-06 11:08", statut: "actif" },
    { id: "USR-006", nom: "Imane Sefiani",       email: "i.sefiani@sonasid.ma",   role: "lecteur",   departement: "DEP-FIN",  site: "Casablanca", dernierAcces: "2026-04-05 09:30", statut: "actif" },
    { id: "USR-007", nom: "Sara Tazi",           email: "s.tazi@sonasid.ma",      role: "gestionnaire",departement: "DEP-PROC",site:"Nador",      dernierAcces: "2026-04-04 16:45", statut: "actif" },
    { id: "USR-008", nom: "Brahim Saidi",        email: "b.saidi@sonasid.ma",     role: "lecteur",   departement: "DEP-HSE",  site: "Nador",      dernierAcces: "2026-03-28 10:12", statut: "inactif" },
    { id: "USR-009", nom: "Leila Fassi",         email: "l.fassi@sonasid.ma",     role: "lecteur",   departement: "DEP-ACH",  site: "Casablanca", dernierAcces: "2026-04-02 13:50", statut: "actif" },
    { id: "USR-010", nom: "Anas Belaala",        email: "a.belaala@sonasid.ma",   role: "lecteur",   departement: "DEP-LOG",  site: "Nador",      dernierAcces: "2026-03-30 08:15", statut: "actif" }
  ],

  /* --------------------------------------------------------------------------
     Notifications système (mock)
     -------------------------------------------------------------------------- */
  notifications: [
    { id: "NOT-001", type: "warning", titre: "5 habilitations arrivent à échéance", description: "Habilitations électriques BR — à recycler avant le 12 mai 2026", timestamp: "Il y a 2h" },
    { id: "NOT-002", type: "info",    titre: "Session MSP/SPC en cours",            description: "SES-2026-007 — 9 inscrits présents sur 12",                       timestamp: "Il y a 4h" },
    { id: "NOT-003", type: "success", titre: "Budget avril validé",                 description: "Consommation à 53% de l'enveloppe annuelle",                       timestamp: "Hier" }
  ]
};

/* ---------------------------------------------------------------------------
   Helpers d'accès / formatage — centralisés pour faciliter la migration Flask
   Une fois l'API en place, ces helpers deviendront des appels fetch async.
   --------------------------------------------------------------------------- */
const SonasidHelpers = {

  /** Retourne un collaborateur par ID */
  getCollaborateur(id) {
    return SonasidData.collaborateurs.find(c => c.id === id);
  },

  /** Retourne une formation du catalogue par ID */
  getFormation(id) {
    return SonasidData.catalogue.find(f => f.id === id);
  },

  /** Retourne une session par ID */
  getSession(id) {
    return SonasidData.sessions.find(s => s.id === id);
  },

  /** Département par ID */
  getDepartement(id) {
    return SonasidData.departements.find(d => d.id === id);
  },

  /** Initiales d'un nom pour les avatars */
  initials(prenom, nom) {
    return ((prenom?.[0] || "") + (nom?.[0] || "")).toUpperCase();
  },

  /** Date ISO -> JJ/MM/AAAA */
  formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    const jj = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${jj}/${mm}/${d.getFullYear()}`;
  },

  /** Format monétaire MAD */
  formatMAD(n) {
    if (n == null || isNaN(n)) return "—";
    return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n) + " MAD";
  },

  /** Format nombre simple */
  formatNumber(n) {
    if (n == null || isNaN(n)) return "—";
    return new Intl.NumberFormat("fr-FR").format(n);
  },

  /** Couleur d'avatar déterministe basée sur l'ID */
  avatarColor(id) {
    const colors = ["green", "steel", "orange"];
    const idx = (id?.charCodeAt(id.length - 1) || 0) % colors.length;
    return colors[idx];
  },

  /** Statut -> classe badge */
  statutBadgeClass(statut) {
    const map = {
      "actif": "success", "realise": "success", "termine": "success", "valide": "success",
      "en_cours": "info", "planifie": "info", "abandon": "neutral", "conge": "warning",
      "absent": "danger", "retard": "danger", "inactif": "neutral", "annule": "danger"
    };
    return map[statut] || "neutral";
  },

  /** Statut -> libellé lisible */
  statutLabel(statut) {
    const map = {
      "actif": "Actif", "realise": "Réalisé", "termine": "Terminé", "valide": "Validé",
      "en_cours": "En cours", "planifie": "Planifié", "abandon": "Abandonné",
      "conge": "En congé", "absent": "Absent", "retard": "En retard",
      "inactif": "Inactif", "annule": "Annulé"
    };
    return map[statut] || statut;
  },

  /** Rôle -> libellé lisible */
  roleLabel(role) {
    const map = {
      "admin": "Administrateur", "gestionnaire": "Gestionnaire",
      "manager": "Manager", "lecteur": "Lecteur"
    };
    return map[role] || role;
  },

  /** Calcule le taux de complétion d'une session (inscrits / places) */
  tauxRemplissage(session) {
    if (!session || !session.places) return 0;
    return Math.round((session.inscrits / session.places) * 100);
  }
};

// Exposé globalement — accessible depuis toutes les pages
window.SonasidData = SonasidData;
window.SonasidHelpers = SonasidHelpers;
