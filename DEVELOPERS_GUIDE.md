# 👨‍💻 Entwickler-Guide

Für Entwickler die dieses Projekt erweitern oder modifizieren möchten.

## 🏗️ Projekt-Architektur

### Seiten-Struktur

```
pages/
├── index.mdx              # / - Landing Page
├── login.mdx              # /login - Auth Page
├── _app.tsx               # Global App Wrapper
├── api/
│   └── auth/
│       └── [...nextauth].ts  # Authentication Endpoints
└── docs/
    └── [Dynamic Routes]   # Documentation Routes
```

### File-based Routing

Next.js nutzt File-based Routing:

```
pages/docs/guide/setup.mdx  →  /docs/guide/setup
pages/api/hello.ts          →  /api/hello
pages/index.mdx             →  /
```

## 🛠️ Development Stack

| Tool | Version | Zweck |
|------|---------|-------|
| Next.js | 14.0+ | React Framework |
| Nextra | 2.11+ | Documentation Theme |
| React | 18.2+ | UI Framework |
| NextAuth.js | 4.24+ | Authentication |
| TypeScript | 5.3+ | Type Safety |
| Tailwind CSS | 3.3+ | Styling |

## 🔧 Konfiguration anpassen

### Logo & Branding

**File**: `theme.config.tsx`

```typescript
const config: DocsThemeConfig = {
  logo: (
    <span style={{ marginLeft: '.4em', fontWeight: 800, fontSize: '18px' }}>
      📚 Dein Logo hier
    </span>
  ),
  project: {
    link: 'https://github.com/your-repo',
  },
  // ...
}
```

### Farben & Design

**File**: `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#your-color',
        'secondary': '#your-color',
      },
    },
  },
}
```

Nutze dann in Komponenten:
```jsx
<div className="bg-primary text-secondary">Styled Content</div>
```

### Dark Mode

Dark Mode ist standardmäßig aktiviert. Um zu ändern:

**File**: `theme.config.tsx`

```typescript
// Ändere Primary Hue für beide Modes
primaryHue: {
  light: 201,   // HSL Wert für Light Mode
  dark: 201,    // HSL Wert für Dark Mode
}
```

## 📝 Content erstellen

### Neue Dokumentations-Seite

1. **MDX Datei erstellen**:
```bash
touch pages/docs/my-category/my-page.mdx
```

2. **Inhalt schreiben**:
```mdx
# Seiten-Titel

Das ist mein Inhalt.

## Abschnitt

- Punkt 1
- Punkt 2

\`\`\`typescript
const code = "wird syntax-highlighted"
\`\`\`
```

3. **Navigation aktualisieren** (optional):

**File**: `pages/docs/my-category/_meta.json`

```json
{
  "my-page": "📄 Meine Seite"
}
```

### Custom Components

1. **Komponente erstellen**:

**File**: `components/MyComponent.tsx`

```typescript
export function MyComponent({ title }: { title: string }) {
  return (
    <div className="p-4 border rounded-lg dark:border-gray-700">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  )
}
```

2. **In MDX nutzen**:

```mdx
import { MyComponent } from '@/components/MyComponent'

# Seite

<MyComponent title="Test" />
```

## 🔐 Authentication erweitern

### Session Daten nutzen

```typescript
import { useSession } from 'next-auth/react'

export function ProtectedComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not authenticated</p>

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
    </div>
  )
}
```

### Geschützte API Routes

```typescript
// pages/api/protected.ts
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  // Geschützter Code
  res.status(200).json({ data: 'secret' })
}
```

### Weitere OAuth Provider hinzufügen

**File**: `pages/api/auth/[...nextauth].ts`

```typescript
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    DiscordProvider({...}),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  // ...
}
```

Ergänze `.env.local`:
```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

## 🚀 API Routes erstellen

### GET Endpoint

```typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] })
  } else {
    res.status(405).end()
  }
}
```

### POST Endpoint mit Validierung

```typescript
// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { title, content } = req.body

  // Validierung
  if (!title || !content) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }

  // Erstelle Post
  res.status(201).json({ id: 1, title, content })
}
```

## 🎨 Styling

### Tailwind Classes

```jsx
// Dark Mode Support
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>

// Responsive
<div className="text-sm md:text-base lg:text-lg">
  Responsive Text
</div>

// Flexbox
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Global Styles

**File**: `styles/globals.css` (optional, erstelle falls nötig)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Styles */
body {
  @apply bg-white dark:bg-gray-900 transition-colors;
}
```

## 📊 Nextauth.js Sessions

### Custom JWT Fields hinzufügen

```typescript
// pages/api/auth/[...nextauth].ts
callbacks: {
  async jwt({ token, account, user }) {
    if (account) {
      token.id = account.providerAccountId
      token.role = 'user' // Custom field
    }
    return token
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id
      (session.user as any).role = token.role // Custom field
    }
    return session
  },
}
```

## 🔍 Debugging

### Console Logs

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', variable)
}
```

### Error Handling

```typescript
try {
  const data = await fetchData()
} catch (error) {
  console.error('Failed to fetch:', error)
  // Handle gracefully
}
```

### NextAuth Debug

```typescript
// Aktiviere Debug Mode
export const authOptions = {
  debug: true,
  // ...
}
```

## 🧪 Testing (Optional)

### Jest Setup

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**File**: `jest.config.js`

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
})
```

### Test Example

```typescript
// __tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## 📦 Deployment Konfiguration

### Vercel Deployment

```bash
# 1. Push zu GitHub
git push origin main

# 2. Vercel verbindet automatisch
# 3. Setze Environment Variables im Dashboard
# 4. Deploy!
```

### Railway Deployment

```bash
railway init
railway variables set DISCORD_CLIENT_ID=xxx
railway up
```

### Docker Deployment

**File**: `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t wissensdatenbank .
docker run -p 3000:3000 -e DISCORD_CLIENT_ID=xxx ... wissensdatenbank
```

## 🔗 Wichtige Dateien

| Datei | Für was | Wichtige Punkte |
|-------|---------|-----------------|
| `theme.config.tsx` | UI Configuration | Logo, Colors, Links |
| `next.config.js` | Next.js Config | i18n, Images, Webpack |
| `pages/_app.tsx` | Global Wrapper | SessionProvider, Layouts |
| `middleware.ts` | Route Protection | Protected Routes |
| `tailwind.config.js` | Styling | Colors, Responsive |

## 📚 Ressourcen für Entwickler

- **Next.js Docs**: https://nextjs.org/docs
- **Nextra Docs**: https://nextra.site/docs
- **NextAuth.js**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **React**: https://react.dev

## 🚀 Performance Tips

### Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/image.png"
  alt="Description"
  width={500}
  height={300}
  priority  // Für Above-the-fold
/>
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <p>Loading...</p> }
)
```

### Static Generation

```typescript
export async function getStaticProps() {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 3600, // ISR nach 1 Stunde
  }
}
```

## ✅ Checkliste vor Merge

- [ ] Code folgt TypeScript Best Practices
- [ ] Keine Console Errors/Warnings
- [ ] Dark Mode funktioniert
- [ ] Mobile responsive
- [ ] Keine Broken Links
- [ ] Build läuft erfolgreich (`npm run build`)
- [ ] Linting passt (`npm run lint`)
- [ ] Tests passen (falls vorhanden)

---

**Happy Coding! 🚀**
