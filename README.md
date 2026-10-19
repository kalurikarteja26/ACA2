# 🛡️ ACA — Autonomous Compliance Assistant

**ACA (Autonomous Compliance Assistant)** is an AI-powered, multi-jurisdiction financial compliance and tax automation platform. Built for **Individuals (Clients)**, **Chartered Accountants (CAs)**, **Tax Agencies**, and **System Administrators**, ACA streamlines tax filing, maximizes eligible deductions, tracks multi-country compliance, and provides real-time AI guidance across **Canada (CRA)**, **USA (IRS)**, and **India (Income Tax Dept & GST)**.

---

## 🌟 Key Features

- **🌐 Multi-Country Jurisdiction Architecture**:
  - **Canada (CRA)**: T1 Income Tax calculations, GST/HST tracking, RRSP contribution room, TFSA status, and Federal/Provincial (Ontario) tax splits.
  - **United States (IRS)**: Form 1040/1120 filing assistance, 401(k)/IRA limit tracking, State vs. Federal tax breakdown, and Quarterly Estimated Taxes.
  - **India (Income Tax Dept & GST Council)**: ITR-1/ITR-4 filing automation, Section 80C deduction manager, Advance Tax schedules, and GST return deadlines.
- **👥 Role-Based Access Control (Client, CA, Agency, Admin)**:
  - **Client / User**: Personalized tax workspace, receipt/slip upload, deduction optimizer, and profile management.
  - **CA / Agent**: Advanced multi-jurisdiction switcher, client data analysis, AI calculation verifications, and compliance health scoring.
  - **Agency**: Project-side team workers managing client portfolios, project workflows, and bulk operations.
  - **Admin**: Dedicated Admin Console, live security telemetry, threat controls, real-time audit trail, and interactive security audit runner.
- **🔒 Enterprise Security Defense Architecture**:
  - **Environment & Secrets**: Strict `.gitignore` and startup environment integrity checking preventing credential leakage.
  - **Cryptographic Password Hashing**: Web Crypto API salted SHA-256 with constant-time `safeCompare` validation.
  - **Data at Rest Encryption**: AES-GCM 256-bit symmetric storage encryption for sensitive client data.
  - **Sliding-Window Rate Limiting**: Anti-brute-force rate limiters on auth (5/min), AI queries (15/min), and tax filing (3/min).
  - **Input Sanitization & Anti-XSS**: Recursive HTML-entity escaping and regex validation on all user forms.
  - **Safe Document Vault**: Extension whitelisting (`.pdf`, `.png`, `.jpg`, `.jpeg`, `.tiff`), path traversal sanitization, and 10MB limits.
  - **Hardened HTTP Headers**: Strict Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and Referrer-Policy.
  - **Session Inactivity Timeout**: Automatic 30-minute idle session guard with countdown alert and automatic token revocation.
- **🎨 4-Mode Display & Eye Comfort System**:
  - ☀️ **Light Mode**: Sleek porcelain white, iced cyan, and royal cobalt blue aesthetic.
  - 🌙 **Dark Mode**: Deep navy obsidian and electric sapphire glassmorphism.
  - 👁️ **Eye Comfort Mode**: Warm parchment & amber palette designed to prevent eye fatigue.
  - 🖥️ **System Default**: Automatically synchronizes with operating system preference.
- **🤖 Integrated AI Tax Co-Pilot**:
  - 24/7 autonomous assistant for tax advice, deduction matching, and filing status inquiries.

---

## 🏗️ Architecture & Module Structure

```
ACA2/
├── .env.example                # Environment configuration template
├── .gitignore                  # Security-hardened git ignore rules
├── index.html                  # HTML5 entry with security meta tags
├── package.json                # Project dependencies (0 vulnerabilities)
├── vite.config.js              # Vite config with HTTP security headers & dead code elimination
├── public/                     # Static assets & avatars
└── src/
    ├── App.jsx                 # Core routing, RBAC authorization guards, & idle timeout
    ├── index.css               # Design system tokens, CSS variables, & typography
    ├── main.jsx                # React entry point
    ├── components/             # UI Components & Modules
    │   ├── dashboards/         # Multi-jurisdiction dashboard views (Canada, USA, India)
    │   ├── AcaLogo.jsx         # Scalable vector logo component
    │   ├── AccessDeniedScreen.jsx # 403 Forbidden screen with role escalation prevention
    │   ├── AdminConsoleScreen.jsx # Telemetry, security toggles, & interactive audit suite
    │   ├── AppHeader.jsx       # Header bar with search, jurisdiction selector, & theme controls
    │   ├── AppSidebar.jsx      # Navigation bar with role badges & RBAC gated tabs
    │   ├── ComplianceHealthScreen.jsx # Real-time tax health scoring
    │   ├── DocumentVaultScreen.jsx    # Whitelisted, sanitized secure document storage
    │   ├── FilingReviewScreen.jsx     # Return verification & filing summary
    │   ├── LandingScreen.jsx          # Auth screen with rate limiting, password meter, & sanitization
    │   ├── PersonalizationScreen.jsx  # Multi-step onboarding questionnaire
    │   ├── ProfileScreen.jsx          # User profile & permanent residency settings
    │   ├── ReportsScreen.jsx          # Tax reports, exports, and analytics
    │   ├── SettingsScreen.jsx         # System preferences & display settings
    │   ├── ShortcutsGuideModal.jsx    # Keyboard navigation shortcuts
    │   ├── SplashScreen.jsx           # Application initialization splash
    │   ├── SubscriptionScreen.jsx     # Free, Pro & Enterprise tiers
    │   ├── TaxAiFloatingAssistant.jsx # Sanitized, rate-limited AI assistant widget
    │   ├── TaxFilingWizard.jsx        # Step-by-step multi-step filing engine
    │   └── ThemeSwitcher.jsx          # Theme mode selector
    ├── config/
    │   └── env.js              # Client environment validator & security integrity check
    ├── context/
    │   ├── LanguageContext.jsx # Multi-language localization provider
    │   ├── ThemeContext.jsx    # Theme state manager
    │   └── UserContext.jsx     # User authentication, profile, & role state
    └── utils/
        ├── auditLogger.js      # Immutable audit trail & security event logger
        ├── cryptoStorage.js    # AES-GCM 256-bit encrypted storage
        ├── rateLimiter.js      # Sliding-window rate limiters
        ├── rbac.js             # Role-based access control engine & permission maps
        └── security.js         # Salted SHA-256 hashing, safeCompare, & XSS sanitization
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Build Tool**: Vite 5
- **Styling**: Vanilla CSS Design Tokens, CSS Variables, Flexbox/Grid
- **Security & Cryptography**: Native Web Crypto API (SHA-256, AES-GCM)
- **Icons**: Lucide React
- **State Management**: React Context API (`UserContext`, `ThemeContext`, `LanguageContext`)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   cd "c:\Users\KALURI KARTEJA\OneDrive\Desktop\ACA2"
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5173`

---

## 🔐 Default Access Accounts (Development / Demo)

| Role | Email | Password | Allowed Access |
|---|---|---|---|
| **Admin** | `admin@aca-tax.com` | `Admin#2026` | Full platform + Admin Console + Security Telemetry |
| **CA / Agent** | `ca@aca-tax.com` | `SecurePass123!` | Multi-jurisdiction dashboards, Client filing, Reviews |
| **User / Client** | `user@aca-tax.com` | `SecurePass123!` | Personal filing workspace, Document vault, Reports |

---

## 📜 License

This project is developed for the **Autonomous Compliance Assistant (ACA)** platform. All rights reserved.
