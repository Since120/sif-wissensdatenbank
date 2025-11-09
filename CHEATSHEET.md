# ⚡ CHEATSHEET - Schnelle Referenz

## 🚀 Schnellstart (Copy & Paste)

```bash
# 1. Dependencies installieren
npm install

# 2. .env.local erstellen
cp .env.example .env.local

# 3. Discord Credentials in .env.local eintragen:
# DISCORD_CLIENT_ID=xxx
# DISCORD_CLIENT_SECRET=xxx
# NEXTAUTH_SECRET=xxx
# NEXTAUTH_URL=http://localhost:3000

# 4. Server starten
npm run dev

# 5. Öffne http://localhost:3000
```

---

## 📋 Discord Setup (Copy & Paste)

1. **Portal öffnen**: https://discord.com/developers/applications
2. **Neue App**: "New Application" → Name → "Create"
3. **Zu OAuth2**: Linkes Menü → "OAuth2" → "General"
4. **Credentials kopieren**:
   - `CLIENT ID` → `.env.local` → `DISCORD_CLIENT_ID`
   - Klick "Reset Secret" → `CLIENT SECRET` → `.env.local` → `DISCORD_CLIENT_SECRET`

5. **Redirects**: "OAuth2" → "Redirects" → "Add Redirect"
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
   → "Save Changes"

---

## 💻 Terminal Commands

| Command | Was es macht |
|---------|------------|
| `npm install` | Dependencies installieren |
| `npm run dev` | Development Server (http://localhost:3000) |
| `npm run build` | Production Build |
| `npm start` | Production Server |
| `npm run lint` | Code Quality Check |
| `npm cache clean --force` | Cache löschen |

---

## 🔐 Environment Variables

Setze in `.env.local`:

```env
DISCORD_CLIENT_ID=123456789...        # Von Discord App
DISCORD_CLIENT_SECRET=xxxxxxxxxxxx... # Von Discord App
NEXTAUTH_SECRET=randomstring...       # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000    # Lokal
```

---

## 📁 Neue Seite hinzufügen

```bash
# Einfache Seite
touch pages/docs/my-page.mdx
```

Inhalt:
```mdx
# Meine Seite

Text hier...
```

Zugänglich unter: `http://localhost:3000/docs/my-page`

---

## 🎨 Customization schnell

### Logo ändern
**File**: `theme.config.tsx`

```typescript
logo: (
  <span>📚 Mein Logo</span>
)
```

### Farben ändern
**File**: `tailwind.config.js`

```javascript
colors: {
  primary: '#your-color',
}
```

### Dark Mode Default
**File**: `theme.config.tsx`

```typescript
// Bereits konfiguriert als Standard!
```

---

## 🐛 Probleme & Schnelllösungen

| Problem | Lösung |
|---------|--------|
| "Cannot find module" | `npm install` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| .env.local ignoriert | Server neu: Strg+C + `npm run dev` |
| Styles weg | Hard Refresh: Strg+Shift+R |
| Discord Auth broken | Prüfe `.env.local` + Redirect URLs |

---

## 🔍 File Structure Quick Reference

```
pages/
├── index.mdx              # Homepage
├── login.mdx              # Login Page
├── _app.tsx               # Global Wrapper
├── api/auth/[...nextauth].ts  # Auth Handler
└── docs/                  # Dokumentation
    ├── getting-started.mdx
    └── fundamentals/
        ├── best-practices.mdx
        └── core-concepts.mdx

theme.config.tsx           # Design & Layout
next.config.js             # Next.js Config
.env.local                 # Secrets (lokal)
package.json               # Dependencies
```

---

## 📖 Wichtige Links

| Link | Für was |
|------|---------|
| http://localhost:3000 | App Root |
| http://localhost:3000/docs | Dokumentation |
| http://localhost:3000/login | Login |
| https://discord.com/developers/applications | Discord Apps |
| https://nextjs.org/docs | Next.js Docs |
| https://nextra.site | Nextra Docs |

---

## 🚀 Deployment Quick Links

- **Vercel**: https://vercel.com → New Project → Select Repo → Deploy
- **Railway**: `railway init` → `railway variables set` → `railway up`
- **Docker**: `docker build -t app .` → `docker run -p 3000:3000 app`

---

## 🔑 NEXTAUTH_SECRET generieren

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Maximum 256)}))
```

Copy den Output → `.env.local` → `NEXTAUTH_SECRET`

---

## 📝 MDX Syntax Quick Guide

```mdx
# H1 Titel
## H2 Untertitel
### H3 Subheading

**Bold** text
*Italic* text
`code`

- Bullet point
1. Numbered

[Link](https://example.com)

\`\`\`typescript
const code = "highlighted"
\`\`\`

| Spalte 1 | Spalte 2 |
|----------|----------|
| Wert 1   | Wert 2   |
```

---

## 🔐 Git Setup (First Time)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main
```

---

## 🆘 Emergency Commands

```bash
# Alles neu installieren
rm -rf node_modules
npm cache clean --force
npm install

# Server neu starten
# Drücke: Strg+C im Terminal
npm run dev

# Type Check
npx tsc --noEmit

# Format Code
npx prettier --write .
```

---

## 📱 Responsive Breakpoints (Tailwind)

```
sm   640px
md   768px
lg   1024px
xl   1280px
2xl  1536px
```

Beispiel:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive Text
</div>
```

---

## 🔗 NextAuth.js Session Hook

```typescript
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()

// status: 'loading' | 'authenticated' | 'unauthenticated'
```

---

## 💾 Datei speichern & auto-reload

Wenn du eine Datei speicherst (Strg+S):
- **Frontend** (`.tsx`, `.mdx`): Auto-refresh im Browser
- **Config** (`.env.local`, `.config.js`): Server neustarten nötig

Server neustarten:
```
Strg+C im Terminal → npm run dev
```

---

## 📚 Weitere Guides

- 📖 **Detailliert**: [LOCAL_STARTUP.md](LOCAL_STARTUP.md)
- 🔍 **Debugging**: [DEVELOPERS_GUIDE.md](DEVELOPERS_GUIDE.md)
- 🚀 **Deployment**: `/docs/tipps-und-tricks/deployment`

---

**Viel Spaß! 🚀**
