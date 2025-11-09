import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

/**
 * Globale App-Komponente mit NextAuth.js SessionProvider
 * Dies ermöglicht den Zugriff auf Session in allen Komponenten via useSession hook
 */

interface Props extends AppProps {
  session?: Session | null
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
