# 🚀 Detaillierte Installations-Anleitung

Diese Anleitung führt dich Schritt-für-Schritt durch die Einrichtung der Wissensdatenbank.

## 📋 Voraussetzungen

- **Node.js**: Version 18 oder höher
  - Download: https://nodejs.org
  - Prüfe Installation: `node --version` und `npm --version`

- **Code Editor** (optional, empfohlen):
  - VS Code: https://code.visualstudio.com
  - WebStorm: https://www.jetbrains.com/webstorm

- **Git** (für Versionskontrolle):
  - Download: https://git-scm.com

## 🔧 Phase 1: Lokale Einrichtung

### Schritt 1: Node.js & npm installieren

```bash
# Prüfe ob Node.js installiert ist
node --version
npm --version

# Falls nicht installiert, lade herunter von https://nodejs.org
# Lade die LTS Version (empfohlen)
```

### Schritt 2: Projekt in richtiges Verzeichnis navigieren

```bash
# Navigiere zum Projektordner
cd /mnt/c/Users/info/Documents/Software\ Entwicklung/sif-wissensdatenbank

# Oder kurz (ohne Spaces escapen, wenn du `cd` in kurz-Verzeichnis machst)
cd sif-wissensdatenbank
```

### Schritt 3: Dependencies installieren

```bash
# Installiere alle erforderlichen Packages
npm install

# Dies erzeugt:
# - node_modules/ Ordner
# - package-lock.json Datei
```

Dies kann 2-5 Minuten dauern (abhängig von Internetgeschwindigkeit).

## 🔐 Phase 2: Discord OAuth Setup

Diese Phase ist ERFORDERLICH damit Login funktioniert.

### Schritt 1: Discord Developer Portal öffnen

1. Öffne https://discord.com/developers/applications
2. Falls nicht eingeloggt: Logge dich mit deinem Discord Account ein
3. Falls noch keinen Discord Account: Erstelle einen auf https://discord.com

### Schritt 2: Neue Application erstellen

1. Klicke auf "New Application" Button oben rechts
2. Gib einen Namen ein (z.B. "Wissensdatenbank" oder "Knowledge Base")
3. Klicke "Create"
4. Du wirst zu deiner neuen Application weitergeleitet

### Schritt 3: OAuth2 Credentials besorgen

1. In der linken Sidebar gehe zu "OAuth2"
2. Klicke auf "General"
3. Unter "CLIENT ID" und "CLIENT SECRET":
   - Kopiere die **Client ID** (lange Nummer)
   - Klicke "Reset Secret"
   - Kopiere das neue **Client Secret** (lange String)
   - ⚠️ Sicherheit: Gebe diesen Secret **niemandem** und committet ihn **nicht** in Git!

### Schritt 4: Redirect URLs hinzufügen

1. Unter "OAuth2" klicke auf "Redirects"
2. Klicke "Add Redirect"
3. Füge diese URLs ein (je nachdem wo du deployest):

**Für Development (lokal):**
```
http://localhost:3000/api/auth/callback/discord
```

**Für Production** (wenn du deployst):
```
https://yourdomain.com/api/auth/callback/discord
```

4. Klicke "Save Changes"

**Wichtig**: Die Redirect URL muss EXAKT mit deiner NEXTAUTH_URL übereinstimmen!

### Schritt 5: .env.local erstellen und füllen

```bash
# Kopiere .env.example zu .env.local
cp .env.example .env.local

# Öffne die Datei in deinem Editor und fülle aus:
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example -Destination .env.local
notepad .env.local  # Öffnet Datei zum Bearbeiten
```

**macOS/Linux:**
```bash
cp .env.example .env.local
nano .env.local  # Öffnet Datei zum Bearbeiten
```

**Inhalt von .env.local:**

```env
# Von Discord Developer Portal kopieren
DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Generiere einen Secret (siehe unten)
NEXTAUTH_SECRET=euer_generierter_secret_hier

# Für lokales Development
NEXTAUTH_URL=http://localhost:3000
```

### Schritt 6: NEXTAUTH_SECRET generieren

Du brauchst einen starken, zufälligen Secret String.

**Option A: Online Generator (schnell)**
```
https://www.epochconverter.com/ → Nutze einen Online Generator
Oder einfach einen zufälligen String: abc123def456ghi789jkl012mno345pqr678stu901
```

**Option B: Command Line (sicher)**

**macOS/Linux:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[System.Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Maximum 256)}))
```

Output Beispiel:
```
aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789abcDEFGHIJ=
```

Kopiere diesen Output und setze ihn als `NEXTAUTH_SECRET` in `.env.local`

## 🎯 Phase 3: Development Server starten

### Schritt 1: Development Server starten

```bash
npm run dev
```

**Expected Output:**
```
> sif-wissensdatenbank@1.0.0 dev
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.5s
```

### Schritt 2: Im Browser öffnen

1. Öffne http://localhost:3000 im Browser
2. Du solltest die Willkommensseite sehen
3. Klicke auf einen "docs" Link (z.B. "Erste Schritte")
4. Du wirst zu `/login` weitergeleitet
5. Klicke "Mit Discord anmelden"

### Schritt 3: Discord Login testen

1. Du wirst zu Discord weitergeleitet
2. Wähle den Server aus (falls mehrere)
3. Klicke "Authorize" um der Anwendung zu erlauben dich authentifizieren
4. Du wirst zurück zur Wissensdatenbank weitergeleitet ✅
5. Jetzt kannst du auf `/docs` zugreifen!

### Schritt 4: Troubleshooting

**Problem: "Invalid redirect URL"**
- Prüfe dass `NEXTAUTH_URL` und Discord Callback URL übereinstimmen
- Development sollte `http://localhost:3000` sein

**Problem: "Discord Client not configured"**
- Prüfe dass `DISCORD_CLIENT_ID` und `DISCORD_CLIENT_SECRET` in `.env.local` sind
- Server-Neustart: Strg+C und `npm run dev` erneut

**Problem: "Session is undefined"**
- Prüfe Browser Console (F12) für Fehler
- Sicherheit: Prüfe dass Cookies aktiviert sind

## 📚 Phase 4: Content hinzufügen

### Neue Seite erstellen

```bash
# Beispiel: Neue Seite in "docs/my-docs" Kategorie
mkdir -p pages/docs/my-docs

# Neue Datei erstellen
touch pages/docs/my-docs/my-page.mdx

# Bearbeite die Datei
```

**Inhalt (pages/docs/my-docs/my-page.mdx):**
```mdx
# Meine Seite

Das ist mein neuer Inhalt!

## Abschnitt

- Punkt 1
- Punkt 2
```

Die Seite ist sofort unter `http://localhost:3000/docs/my-docs/my-page` zugänglich!

### Navigation anpassen

Erstelle `pages/docs/my-docs/_meta.json`:

```json
{
  "my-page": "Meine Seite"
}
```

Die Reihenfolge hier wird in der Sidebar angezeigt.

## 🔨 Häufige Commands

```bash
# Development Server
npm run dev

# Production Build
npm run build

# Production Server starten
npm start

# Linting
npm run lint

# Build-Fehler debuggen
npm run build -- --debug
```

## ✅ Checkliste nach Installation

- [ ] Node.js 18+ installiert
- [ ] Dependencies mit `npm install` installiert
- [ ] Discord Application erstellt
- [ ] Discord Client ID & Secret kopiert
- [ ] .env.local erstellt mit allen Variablen
- [ ] NEXTAUTH_SECRET generiert
- [ ] Redirect URLs in Discord gesetzt
- [ ] Development Server läuft (`npm run dev`)
- [ ] http://localhost:3000 öffnet sich
- [ ] Discord Login funktioniert
- [ ] Auf `/docs` zugreifen möglich

## 🚀 Nächste Schritte

1. **Content erstellen**: Füge deine eigenen Seiten hinzu
2. **Branding**: Ändere Logo und Farben in `theme.config.tsx`
3. **Customization**: Passe `next.config.js` und `tailwind.config.js` an
4. **Deployment**: Siehe [Deployment Guide](DEPLOYMENT.md) oder `/docs/tipps-und-tricks/deployment`

## 📖 Weitere Ressourcen

- **Next.js Docs**: https://nextjs.org/docs
- **Nextra Docs**: https://nextra.site/docs
- **NextAuth.js**: https://next-auth.js.org/
- **Discord Developers**: https://discord.com/developers/

## 🆘 Hilfe

Falls du auf Probleme stößt:

1. Schaue in der [FAQ](/docs/faq) nach
2. Prüfe die [Debugging Anleitung](/docs/tipps-und-tricks/debugging)
3. Erstelle ein GitHub Issue
4. Frag in der Discord Community

---

**Herzlichen Glückwunsch! Deine Wissensdatenbank läuft jetzt! 🎉**
