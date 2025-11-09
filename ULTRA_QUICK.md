# ⚡ ULTRA QUICK - Copy & Paste (3 Minuten)

## Für Profis die einfach nur starten wollen

### 1. Terminal Commands (Copy & Paste)

```bash
npm install
cp .env.example .env.local
npm run dev
```

**Öffne dann:** http://localhost:3000

---

## 2. Discord Setup (2 Minuten)

Gehe zu: https://discord.com/developers/applications

1. "New Application" → Name → "Create"
2. "OAuth2" → "General" → Copy "CLIENT ID" & "CLIENT SECRET"
3. "OAuth2" → "Redirects" → Add: `http://localhost:3000/api/auth/callback/discord`

---

## 3. .env.local ausfüllen

Öffne `.env.local` und setze:

```env
DISCORD_CLIENT_ID=deine_id_von_discord
DISCORD_CLIENT_SECRET=dein_secret_von_discord
NEXTAUTH_SECRET=openssl_rand_-base64_32_output_hier
NEXTAUTH_URL=http://localhost:3000
```

**NEXTAUTH_SECRET generieren:**

```bash
# macOS/Linux
openssl rand -base64 32
```

---

## 4. Done! 🚀

Server läuft auf http://localhost:3000

Login testen: Klick "/docs" → "Mit Discord anmelden"

---

## Hilfe

- Detailliert: [LOCAL_STARTUP.md](LOCAL_STARTUP.md)
- Cheatsheet: [CHEATSHEET.md](CHEATSHEET.md)
- Alle Guides: [START_HERE.md](START_HERE.md)
