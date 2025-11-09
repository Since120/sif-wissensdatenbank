# ⚡ Quick Start - 5 Minuten bis zum Laufen

Wenn du nur die wichtigsten Schritte willst (ohne ausführliche Erklärungen).

## 1️⃣ Node.js prüfen (1 min)

```bash
node --version  # Sollte 18+ sein
npm --version   # Sollte 8+ sein
```

Nicht installiert? → https://nodejs.org (LTS) herunterladen

## 2️⃣ Dependencies installieren (2-3 min)

```bash
cd /mnt/c/Users/info/Documents/Software\ Entwicklung/sif-wissensdatenbank
npm install
```

## 3️⃣ Discord OAuth einrichten (1 min)

1. https://discord.com/developers/applications öffnen
2. "New Application" → Name eingeben → "Create"
3. "OAuth2" → "General" → **Client ID** und **Client Secret** kopieren
4. "OAuth2" → "Redirects" → `http://localhost:3000/api/auth/callback/discord` hinzufügen

## 4️⃣ .env.local erstellen (1 min)

```bash
cp .env.example .env.local
```

Öffne `.env.local` und fülle aus:

```env
DISCORD_CLIENT_ID=your_id_from_discord
DISCORD_CLIENT_SECRET=your_secret_from_discord
NEXTAUTH_SECRET=randomstring123456789
NEXTAUTH_URL=http://localhost:3000
```

## 5️⃣ Start! (Sofort)

```bash
npm run dev
```

Öffne http://localhost:3000 - **Fertig!** ✅

---

## 🆘 Nicht arbeitet?

**"Discord Login funktioniert nicht?"**
- Prüfe `.env.local` Variablen
- Prüfe Discord Redirect URL
- Starte Server neu: `Strg+C` + `npm run dev`

**"Node.js ist nicht installiert?"**
- https://nodejs.org → LTS Version → Installieren → Terminal Neustart

**"Mehr Hilfe?"**
- → Siehe [INSTALLATION.md](INSTALLATION.md) für detaillierte Anleitung
- → Siehe [README.md](README.md) für Features & Konfiguration

---

**Viel Spaß! 🚀**
