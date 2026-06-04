# BankFlow — Plateforme de Supervision Bancaire

Plateforme intelligente de supervision des opérations bancaires, développée avec Laravel 12, React et Inertia.js. Conçue pour répondre aux besoins des institutions financières d'Afrique de l'Ouest (zone UEMOA/BCEAO).

---

## Demo en ligne

**URL :** https://bankflow-afji.onrender.com

**Identifiants de démonstration :**
| Champ | Valeur |
|-------|--------|
| Email | admin@bankflow.ci |
| Mot de passe | password123 |

> Le serveur peut mettre 30 à 50 secondes à démarrer lors de la première visite (plan gratuit Render). Patientez et actualisez la page.

---

## Aperçu

![Dashboard BankFlow](https://bankflow-afji.onrender.com)

BankFlow permet à une équipe bancaire de superviser en temps réel l'ensemble des opérations de ses agences, de détecter les anomalies, de gérer les alertes et d'obtenir des analyses intelligentes via un assistant IA intégré.

---

## Fonctionnalités

| Module | Description |
|--------|-------------|
| Dashboard | Graphiques temps réel — transactions, volumes, anomalies sur 7 jours |
| Opérations | Tableau filtrable avec pagination — statuts Validé / En attente / Anomalie |
| Alertes | Niveaux Critique / Avertissement / Info avec système d'acquittement |
| Rapports | Génération et export CSV par agence, par type et par période |
| Messagerie | Messagerie interne entre superviseurs et agences |
| Assistant IA | Chat bancaire intelligent — analyse, résumé journalier, détection de risques |
| Piste d'audit | Journal complet de toutes les actions utilisateurs |
| Paramètres | Gestion du profil et des accès |

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| Backend | Laravel 12, PHP 8.2 |
| Frontend | React 18, Inertia.js, TailwindCSS v4 |
| UI Components | shadcn/ui |
| Base de données | SQLite (MySQL en production) |
| Intelligence artificielle | Groq API — Llama 3.3 70B |
| Graphiques | Recharts |
| Déploiement | Docker, Render |
| Versioning | Git / GitHub |

---

## Architecture du projet
bankflow/
├── app/
│   ├── Http/Controllers/     # DashboardController, TransactionController...
│   ├── Models/               # Transaction, Alerte, Message, AuditLog
│   └── Services/             # GrokService (IA), AuditService (audit)
├── resources/
│   └── js/
│       ├── Pages/            # Dashboard, Operations, Alertes, Rapports...
│       ├── Components/       # Sidebar, Topbar
│       └── Layouts/          # AppLayout
├── database/
│   ├── migrations/           # Structure des tables
│   └── seeders/              # Données de démonstration
├── routes/
│   └── web.php               # Toutes les routes protégées
└── Dockerfile                # Configuration Docker pour le déploiement

---

## Installation locale

### Prérequis
- PHP 8.2+
- Composer
- Node.js 20+
- Git

### Étapes

```bash
# Cloner le projet
git clone https://github.com/Baliguini-dimi/bankflow.git
cd bankflow

# Installer les dépendances PHP
composer install

# Installer les dépendances JavaScript
npm install --legacy-peer-deps

# Configurer l'environnement
cp .env.example .env
php artisan key:generate

# Configurer la base de données
php artisan migrate --seed

# Lancer le serveur
php artisan serve
```

Dans un second terminal :
```bash
npm run dev
```

Accéder à **http://127.0.0.1:8000**

### Variables d'environnement requises

```env
APP_KEY=           # Généré automatiquement
DB_CONNECTION=sqlite
GROK_API_KEY=      # Clé API Groq (console.groq.com)
```

---

## Contexte et objectifs

Ce projet a été développé pour démontrer la faisabilité d'une plateforme de supervision bancaire moderne, adaptée aux réalités des institutions financières d'Afrique de l'Ouest :

- Montants en **FCFA**
- Agences nommées d'après des communes d'**Abidjan**
- Conformité au cadre réglementaire **BCEAO/UEMOA**
- Interface entièrement en **français**
- Assistant IA instruit sur le contexte bancaire ivoirien

---

## Auteur

**Dimitri Nelson BALIGUINI DEMBA**
Master Big Data & Intelligence Artificielle
Institut Universitaire d'Abidjan — Côte d'Ivoire

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dimitri_Nelson-blue)](https://www.linkedin.com/in/dimitri-nelson-baligini-demba-4b17b32ba)
[![GitHub](https://img.shields.io/badge/GitHub-Baliguini--dimi-black)](https://github.com/Baliguini-dimi)

---

## Licence

Projet open source — usage académique et démonstration professionnelle.
