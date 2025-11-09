import NextAuth, { type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

/**
 * NextAuth.js Konfiguration mit Discord OAuth
 *
 * Erforderliche Umgebungsvariablen:
 * - DISCORD_CLIENT_ID: Discord App Client ID
 * - DISCORD_CLIENT_SECRET: Discord App Client Secret
 * - NEXTAUTH_SECRET: Secret für Session-Verschlüsselung (generieren mit: openssl rand -base64 32)
 * - NEXTAUTH_URL: Die URL der Anwendung (z.B. http://localhost:3000 oder https://yourdomain.com)
 */

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Callback functions for more control
  callbacks: {
    async jwt({ token, account }) {
      // Persist Discord ID and username to the token
      if (account) {
        token.id = account.providerAccountId
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      // Add custom data to session
      if (session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    },
  },

  // Optional: Configure pages
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },

  // Optional: Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
