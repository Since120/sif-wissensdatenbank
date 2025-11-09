# 📚 SIF Wissensdatenbank

Produktionsreife Nextra-Wissensdatenbank mit Discord OAuth Authentication, Dark Mode und vollständiger Nextra-Integration.

## ✨ Features

- 🔐 **Discord OAuth Authentication**: Sichere Authentifizierung via Discord
- 🌓 **Dark Mode Default**: Modernes Design mit Dark/Light Mode Toggle
- 📖 **Nextra Integration**: Professionelle Dokumentation mit automatischer Navigation
- 🔍 **Eingebaute Suche**: Schnelle Inhaltssuche mit Strg+K oder ⌘+K
- 📱 **Vollständig Responsive**: Mobile-optimiert für alle Geräte
- 🚀 **Production-Ready**: Deployment-bereit für Vercel, Railway oder Docker
- 📝 **MDX Support**: Markdown mit React-Komponenten
- ⚡ **Next.js 14**: Moderne Features wie Image Optimization, ISR, und SSG
- 🛡️ **Sicherheit**: CSRF-Schutz, Session Management, Environment Variable Protection

## 📁 Verzeichnisstruktur

```
sif-wissensdatenbank/
├── pages/
│   ├── api/auth/
│   │   └── [...nextauth].ts          # NextAuth.js OAuth Handler
│   ├── docs/
│   │   ├── _meta.json               # Navigation Structure
│   │   ├── getting-started.mdx
│   │   ├── faq.mdx
│   │   ├── fundamentals/
│   │   │   ├── _meta.json
│   │   │   ├── best-practices.mdx
│   │   │   └── core-concepts.mdx
│   │   ├── technologie/
│   │   │   ├── _meta.json
│   │   │   ├── nextjs.mdx
│   │   │   ├── nextra.mdx
│   │   │   └── nextauth.mdx
│   │   └── tipps-und-tricks/
│   │       ├── _meta.json
│   │       ├── debugging.mdx
│   │       ├── deployment.mdx
│   │       └── optimization.mdx
│   ├── _app.tsx                     # Global App Wrapper mit SessionProvider
│   ├── index.mdx                    # Homepage
│   └── login.mdx                    # Login Page
├── components/                      # Custom React Components (optional)
├── public/                          # Static Assets
├── middleware.ts                    # Route Protection Middleware
├── theme.config.tsx                 # Nextra Theme Configuration
├── next.config.js                   # Next.js Configuration
├── tailwind.config.js              # Tailwind CSS Configuration
├── tsconfig.json                    # TypeScript Configuration
├── package.json                     # Dependencies & Scripts
├── .env.example                     # Environment Variables Template
├── .gitignore                       # Git Ignore Rules
└── README.md                        # This File

```

## 🚀 Quick Start

### 1. Voraussetzungen

- Node.js 18+ installiert
- npm oder yarn
- Ein Discord Server für OAuth Setup (oder später erstellen)

### 2. Installation

```bash
# Repository klonen oder neues Projekt erstellen
cd sif-wissensdatenbank

# Dependencies installieren
npm install

# oder mit Yarn
yarn install
```

### 3. Discord OAuth Setup

#### Schritt 1: Discord Developer Application erstellen

1. Gehe zu https://discord.com/developers/applications
2. Klicke "New Application"
3. Gib einen Namen ein (z.B. "Wissensdatenbank")
4. Klicke "Create"

#### Schritt 2: OAuth2 Credentials besorgen

1. Unter der App gehe zu "OAuth2" → "General"
2. Kopiere **Client ID**
3. Klicke "Reset Secret" und kopiere **Client Secret**

#### Schritt 3: Redirect URLs hinzufügen

1. Unter "OAuth2" → "Redirects" klicke "Add Redirect"
2. Für Development: `http://localhost:3000/api/auth/callback/discord`
3. Für Production: `https://yourdomain.com/api/auth/callback/discord`
4. Speichere

#### Schritt 4: .env.local erstellen

```bash
# Kopiere .env.example zu .env.local
cp .env.example .env.local
```

Fülle die Werte aus:

```env
# Von Discord Developer Portal
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret

# Generiere mit: openssl rand -base64 32
NEXTAUTH_SECRET=your_secret_here

# Development
NEXTAUTH_URL=http://localhost:3000
```

### 4. Development Server starten

```bash
npm run dev
```

Öffne http://localhost:3000 im Browser. Die App sollte jetzt laufen!

### 5. Login testen

1. Klicke auf "Login" oder versuche auf eine geschützte Seite zuzugreifen
2. Du wirst zu `/login` weitergeleitet
3. Klicke "Mit Discord anmelden"
4. Du wirst zu Discord weitergeleitet
5. Nach erfolgreicher Authentifizierung wirst du zurück weitergeleitet ✅

## 📚 Content Management

### Neue Seite hinzufügen

#### Single Page

```bash
# Neue Seite in docs/ erstellen
touch pages/docs/my-page.mdx
```

Inhalt (`pages/docs/my-page.mdx`):

```mdx
# Meine Seite

Das ist mein neuer Inhalt...
```

Zugänglich unter: `/docs/my-page`

#### Seite mit Kategorien

```bash
# Neue Kategorie erstellen
mkdir pages/docs/meine-kategorie

# _meta.json für Navigation (optional)
cat > pages/docs/meine-kategorie/_meta.json << 'EOF'
{
  "seite1": "Seite 1",
  "seite2": "Seite 2"
}
EOF

# Seiten hinzufügen
touch pages/docs/meine-kategorie/seite1.mdx
touch pages/docs/meine-kategorie/seite2.mdx
```

Zugänglich unter:
- `/docs/meine-kategorie/seite1`
- `/docs/meine-kategorie/seite2`

### Navigation anpassen

Bearbeite `pages/docs/_meta.json`:

```json
{
  "getting-started": "🚀 Erste Schritte",
  "fundamentals": "📖 Grundlagen",
  "technologie": "🔧 Technologie",
  "tipps-und-tricks": "💡 Tipps & Tricks",
  "faq": "❓ FAQ"
}
```

Die Reihenfolge hier ist die Sidebar-Reihenfolge!

## 🎨 Anpassung

### Logo & Branding

Bearbeite `theme.config.tsx`:

```typescript
const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 800 }}>
      📚 Meine Wissensdatenbank
    </span>
  ),
  // ...
}
```

### Farben

Bearbeite `tailwind.config.js`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        discord: '#5865F2', // Ändere Discord-Button-Farbe
        'my-color': '#123456',
      },
    },
  },
}
```

### Fonts

In `theme.config.tsx` oder `pages/_app.tsx`:

```typescript
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
})
```

## 🔐 Sicherheit

### .env.local schützen

**WICHTIG**: `.env.local` enthält Secrets und darf NIEMALS in Git committen!

```bash
# .gitignore bereits korrekt konfiguriert
# Aber prüfe nochmal:
cat .gitignore | grep env
```

### NEXTAUTH_SECRET

Generiere einen starken Secret:

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Random]::new().NextBytes(32))
```

### Production Sicherheit

Für Production **MUSS** HTTPS verwendet werden:

```env
# Production (!)
NEXTAUTH_URL=https://yourdomain.com  # Nicht http://!
```

## 🚀 Deployment

### Vercel (Empfohlen)

```bash
# 1. Pushe zu GitHub
git push origin main

# 2. Gehe zu https://vercel.com
# 3. Klicke "New Project"
# 4. Wähle dein Repo
# 5. Setze Environment Variables
# 6. Klicke "Deploy"
```

**Environment Variables in Vercel Dashboard setzen:**

```
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://yourdomain.com
```

### Railway

```bash
# 1. Installiere Railway CLI
npm i -g railway

# 2. Login
railway login

# 3. Initialisiere
railway init

# 4. Setze Variablen
railway variables set DISCORD_CLIENT_ID=xxx

# 5. Pushe
railway up
```

### Docker

```bash
# Build Image
docker build -t wissensdatenbank .

# Run Container
docker run -p 3000:3000 \
  -e DISCORD_CLIENT_ID=xxx \
  -e DISCORD_CLIENT_SECRET=xxx \
  -e NEXTAUTH_SECRET=xxx \
  -e NEXTAUTH_URL=http://localhost:3000 \
  wissensdatenbank
```

Siehe [Deployment Guide](/docs/tipps-und-tricks/deployment) für mehr Details.

## 📦 Build & Production

### Build

```bash
npm run build
```

Generiert eine optimierte Production Build im `.next/` Verzeichnis.

### Production starten

```bash
npm start
```

Startet den Production Server (schneller als dev).

### Linting

```bash
npm run lint
```

Prüft Code-Qualität mit ESLint.

## 🛠️ Scripts

| Script | Beschreibung |
|--------|------------|
| `npm run dev` | Start Development Server |
| `npm run build` | Build für Production |
| `npm start` | Start Production Server |
| `npm run lint` | ESLint Prüfung |

## 📖 Dokumentation

- **Next.js**: https://nextjs.org/docs
- **Nextra**: https://nextra.site/docs
- **NextAuth.js**: https://next-auth.js.org/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 🐛 Häufige Probleme

### "Cannot find module '@/...'"

Stelle sicher dass `tsconfig.json` korrekt ist:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### "Session is undefined"

Prüfe dass `SessionProvider` in `pages/_app.tsx` aktiviert ist.

### Discord OAuth funktioniert nicht

1. Prüfe Redirect URLs im Discord Developer Portal
2. Prüfe `.env.local` Variablen
3. Prüfe Browser Console auf Fehler (F12)

Siehe [FAQ](/docs/faq) für mehr Hilfe.

## 💡 Tipps

- Nutze **Strg+K** oder **⌘+K** für die Schnellsuche
- Dark Mode ist standard, aber Light Mode ist auch möglich
- Alle Seiten werden sofort nach `.mdx` erstellen zugänglich
- Siehe [Debugging Guide](/docs/tipps-und-tricks/debugging) für Debugging-Tipps

## 🤝 Beitragen

1. Fork das Repo
2. Erstelle einen Branch (`git checkout -b feature/amazing`)
3. Commit deine Changes (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing`)
5. Öffne ein Pull Request

## 📄 Lizenz

MIT License - siehe LICENSE Datei

## 📞 Support

Brauchst du Hilfe? Schau in unserem [FAQ](/docs/faq) vorbei oder erstelle ein GitHub Issue.

---

**Viel Spaß mit deiner Wissensdatenbank! 📚** 🚀
