import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

/**
 * Middleware für Route-Schutz
 *
 * Alle Seiten außer / und /login erfordern Authentication
 */

export const middleware = withAuth(
  function middleware(req: NextRequest) {
    // Custom middleware logic here if needed
    return undefined
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

// Apply middleware to all routes except public ones
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - (root index page)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|^/$).*)',
  ],
}
