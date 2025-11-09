# 🚀 Lokaler Start - Schritt-für-Schritt

Dieser Guide führt dich **Schritt-für-Schritt** zum lokalen Start der Wissensdatenbank.

## ⏱️ Zeitaufwand: ~15 Minuten

---

## 📋 Schritt 1: Node.js prüfen (1 Minute)

Öffne dein Terminal/Command Prompt und gib ein:

```bash
node --version
npm --version
```

**Expected Output:**
```
v18.17.0  (oder höher, mind. v18)
9.8.1     (oder höher)
```

### Falls Node.js nicht installiert ist:

1. Gehe zu https://nodejs.org
2. Klicke **"Download LTS"** (Grüner Button)
3. Installiere die Datei
4. Terminal/Command Prompt **neustarten**
5. Erneut `node --version` testen

---

## 🔧 Schritt 2: Projekt vorbereiten (2 Minuten)

Navigiere zum Projektordner:

**Windows (PowerShell):**
```powershell
cd "C:\Users\info\Documents\Software Entwicklung\sif-wissensdatenbank"
```

**macOS/Linux:**
```bash
cd ~/Documents/Software\ Entwicklung/sif-wissensdatenbank
```

oder einfach im Explorer zum Ordner navigieren, **Shift+Rechtsklick** → "PowerShell hier öffnen"

Prüfe dass du im richtigen Ordner bist:
```bash
ls  # oder dir auf Windows
```

Du solltest diese Dateien sehen:
```
package.json
README.md
.env.example
theme.config.tsx
...
```

---

## 📦 Schritt 3: Dependencies installieren (3-5 Minuten)

Dies installiert alle erforderlichen Packages:

```bash
npm install
```

**Was passiert:**
```
npm notice
npm WARN deprecated ...
added 500+ packages, and audited 550 packages
```

Das ist normal! Warte bis es fertig ist (grüne Checkmarks am Ende).

**Wenn es lange dauert:** Das ist normal! Kann 5-10 Minuten dauern (abhängig von Internet).

### Falls Fehler auftreten:

**Versuch 1 - Cache löschen:**
```bash
npm cache clean --force
npm install
```

**Versuch 2 - Von vorne:**
```bash
rm -r node_modules
npm install
```

---

## 🔐 Schritt 4: Discord OAuth Setup (5 Minuten)

### 4.1: Discord Developer Portal öffnen

1. Öffne https://discord.com/developers/applications
2. Logge dich mit deinem Discord Account ein (oder erstelle einen)

### 4.2: Neue Application erstellen

1. Klicke **"New Application"** (oben rechts)
2. Gib einen Namen ein: **"Wissensdatenbank"** (oder was du möchtest)
3. Klicke **"Create"**

### 4.3: Client ID & Secret kopieren

1. Im linken Menü: Gehe zu **"OAuth2"** → **"General"**
2. Unter "CLIENT INFORMATION":
   - Kopiere die **CLIENT ID** (lange Zahlenkette)
   - Klicke **"Reset Secret"**
   - Kopiere das neue **CLIENT SECRET** (sehr lange String)

**Screenshot Hint:** Die Werte sollten so aussehen:
```
CLIENT ID:     123456789012345678
CLIENT SECRET: abcdefghijklmnopqrstuvwxyz.ABCDEFGHIJKLMNOP
```

⚠️ **Wichtig:** Gib diesen Secret **NIEMANDEM** und committet ihn **NICHT** zu Git!

### 4.4: Redirect URL hinzufügen

1. Im linken Menü: Gehe zu **"OAuth2"** → **"Redirects"**
2. Klicke **"Add Redirect"**
3. Gib ein: **`http://localhost:3000/api/auth/callback/discord`**
4. Klicke **"Save Changes"**

Das ist der Link, zu dem Discord dich nach dem Login zurücksendet.

---

## 🔑 Schritt 5: .env.local erstellen (2 Minuten)

Jetzt müssen wir die Discord Credentials speichern.

### Windows / macOS / Linux:

Öffne das Projekt-Verzeichnis im **Editor oder VS Code**:

1. Öffne `.env.example` (sehe die Datei im Ordner)
2. Klicke Rechts → **"Kopieren als"** (oder Copy)
3. Bennenne die Kopie um zu `.env.local`
4. Öffne `.env.local` mit einem Text-Editor (z.B. Notepad)

### Oder mit Terminal:

```bash
cp .env.example .env.local
```

### Ausfüllen:

Öffne `.env.local` und suche diese Zeilen:

```env
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Ersetze die Werte:

```env
DISCORD_CLIENT_ID=123456789012345678
DISCORD_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz.ABCDEFGHIJKLMNOP
NEXTAUTH_SECRET=randomstring12345678901234567890abcdef
NEXTAUTH_URL=http://localhost:3000
```

### NEXTAUTH_SECRET generieren:

Wenn du keinen Secret hast, generiere einen:

**macOS/Linux:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[System.Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Maximum 256)}))
```

Kopiere den Output (z.B. `aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789abcDEFGHIJ=`) als `NEXTAUTH_SECRET`.

**Speichern:** Strg+S (oder Cmd+S auf Mac)

---

## ✅ Schritt 6: Development Server starten (Sofort!)

Im Terminal gib ein:

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

Der Server läuft jetzt! ✅

---

## 🌐 Schritt 7: Im Browser öffnen

1. Öffne deinen Browser (Chrome, Firefox, Safari, etc.)
2. Gehe zu: **http://localhost:3000**
3. Du solltest die **Willkommensseite** sehen! 🎉

---

## 🧪 Schritt 8: Discord Login testen (Optional, aber wichtig!)

1. Klicke auf einen **"/docs" Link** (z.B. "Erste Schritte")
2. Du wirst zu `/login` weitergeleitet
3. Klicke **"Mit Discord anmelden"**
4. Discord öffnet sich
5. Wähle einen **Server** aus (falls mehrere)
6. Klicke **"Authorize"** um der App Zugriff zu erlauben
7. Du wirst zurück zur Wissensdatenbank geleitet ✅
8. Jetzt kannst du `/docs` sehen!

---

## 🎯 Das war's!

Dein lokales Setup läuft jetzt! 🚀

### Was du jetzt tun kannst:

- **Seiten anschauen:** http://localhost:3000/docs
- **Suche testen:** Drücke `Strg+K` oder `⌘+K`
- **Dark Mode:** Oben rechts Theme Toggle
- **Logout testen:** Oben rechts "Logout" Button

---

## 🛑 Probleme?

### Problem: "Cannot find module"

```
Error: Cannot find module 'next'
```

**Lösung:** `npm install` nochmal ausführen

```bash
npm install
```

---

### Problem: "Port 3000 is already in use"

```
Error: listen EADDRINUSE :::3000
```

**Lösung:** Anderer Port benutzen

```bash
npm run dev -- -p 3001
```

Dann öffne http://localhost:3001 statt 3000

---

### Problem: "Discord OAuth not configured"

```
Discord Client not configured
```

**Lösungen:**
1. Prüfe `.env.local` - sind alle Werte gesetzt?
2. Speichern nicht vergessen! (Strg+S)
3. Server neu starten: Drücke `Strg+C` im Terminal
4. Starte neu: `npm run dev`

---

### Problem: "Invalid redirect URL"

```
Invalid OAuth redirect URL
```

**Lösungen:**
1. Prüfe Discord Developer Portal
2. URL muss genau sein: `http://localhost:3000/api/auth/callback/discord`
3. Port muss `3000` sein (falls du 3001 nutzt, must auch dort die URL ändern)

---

### Problem: Sieht merkwürdig aus / Styles sind weg

**Lösung:** Hard refresh machen

```
Windows/Linux: Strg+Shift+R
Mac: Cmd+Shift+R
```

oder

```
F12 (DevTools) → Rechtsklick auf Reload Button → "Empty cache and hard refresh"
```

---

## 💡 Tipps

### Dark/Light Mode wechseln

Oben rechts klick auf die **Theme Toggle** (Mond/Sonne Icon)

### Suche benutzen

Drücke **`Strg+K`** oder **`⌘+K`** um Seiten zu durchsuchen

### Neue Seite hinzufügen

Erstelle eine neue `.mdx` Datei:

```bash
# Beispiel
touch pages/docs/mein-artikel.mdx
```

Füge Inhalt rein:

```mdx
# Mein Artikel

Das ist mein neuer Inhalt!
```

Sofort unter `http://localhost:3000/docs/mein-artikel` zugänglich!

### Terminal-Befehle

```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run lint     # Code Quality Check
```

---

## 🚀 Nächste Schritte

1. **Erkunde die Seiten** unter `/docs`
2. **Füge deine eigenen Seiten** hinzu
3. **Ändere Logo & Farben** in `theme.config.tsx`
4. **Deploye wenn fertig** (siehe Deployment Guide)

---

## ✅ Checkliste

- [ ] Node.js installiert & getestet
- [ ] Im Projekt-Ordner
- [ ] `npm install` erfolgreich
- [ ] Discord App erstellt
- [ ] Client ID & Secret kopiert
- [ ] `.env.local` erstellt & ausgefüllt
- [ ] `npm run dev` läuft
- [ ] http://localhost:3000 öffnet sich
- [ ] Discord Login funktioniert
- [ ] `/docs` sichtbar

Wenn alles ✅ ist, bist du fertig! 🎉

---

## 📞 Hilfe

Falls du noch Fragen hast:
- Schaue in `/docs/faq`
- Schau in `/docs/tipps-und-tricks/debugging`
- Schaue hier: [DEVELOPERS_GUIDE.md](DEVELOPERS_GUIDE.md)

**Viel Spaß! 🚀**
