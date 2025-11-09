import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'

const config: DocsThemeConfig = {
  // Logo and branding
  logo: (
    <span style={{ marginLeft: '.4em', fontWeight: 800, fontSize: '18px' }}>
      📚 Wissensdatenbank
    </span>
  ),

  // Project title
  project: {
    link: 'https://github.com/yourusername/sif-wissensdatenbank',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },

  // Chat icon (optional, for Discord/community link)
  chat: {
    link: 'https://discord.gg/yourserver',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.446 2H3.554C2.697 2 2 2.697 2 3.554v16.892C2 21.303 2.697 22 3.554 22h16.892c.857 0 1.554-.697 1.554-1.554V3.554C22 2.697 21.303 2 20.446 2zm-4.6 13.686c-1.639-1.298-3.234-1.271-4.667-2.375-.726-.563-1.254-1.098-1.254-1.098s.528.094 1.607.094c.98 0 1.502-.096 2.313-.19 1.407-.163 2.786-.325 3.894-1.502.363-.377.568-.734.731-1.098h2.03c0 4.505-2.632 7.675-6.654 8.295v1.203c0 .271-.221.492-.492.492h-1.465c-.271 0-.492-.221-.492-.492v-1.06c-1.365-.309-2.556-1.049-3.482-2.03v-1.464c0-.271.221-.492.492-.492h4.338c.271 0 .492-.221.492-.492v-1.191c0-.271-.221-.492-.492-.492h-3.715v-1.098h2.627c.271 0 .492-.221.492-.492v-1.191c0-.271-.221-.492-.492-.492h-2.627v-1.191h2.627c.271 0 .492-.221.492-.492v-1.191c0-.271-.221-.492-.492-.492h-4.338c-.271 0-.492.221-.492.492v1.464c.926.981 2.117 1.721 3.482 2.03v1.06c0 .271.221.492.492.492h1.465c.271 0 .492-.221.492-.492v-1.203c.978-.326 1.901-.868 2.652-1.614v2.133z" />
      </svg>
    ),
  },

  // Docsearch configuration (optional)
  docsRepositoryBase: 'https://github.com/yourusername/sif-wissensdatenbank/tree/main',

  // Footer
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            href="https://yourwebsite.com"
          >
            <span>Powered by Nextra</span>
          </a>
        </div>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} SIF Wissensdatenbank. All rights reserved.
        </p>
      </div>
    ),
  },

  // Navigation configuration
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    toggleButton: true,
  },

  // Navbar (optional: add user profile)
  navbar: {
    extraContent: <UserMenu />,
  },

  // Dark mode configuration
  primaryHue: {
    light: 201,
    dark: 201,
  },

  primarySaturation: {
    light: 100,
    dark: 100,
  },

  // Use system theme as default, but prefer dark
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      }
    },
  },

  // Optional settings
  toc: {
    float: true,
    backToTop: true,
  },

  // Search configuration
  search: {
    placeholder: 'Suchen...',
  },

  // Optional: Gitpod configuration
  gitpod: {
    enable: false,
  },

  // Optional: Layout configuration
  banner: {
    key: 'learn-banner',
    text: (
      <a
        href="https://github.com/yourusername/sif-wissensdatenbank"
        target="_blank"
        rel="noreferrer"
      >
        🎉 Neue Inhalte verfügbar! Klicke hier zum Ansehen →
      </a>
    ),
  },
}

/**
 * User-Menü-Komponente für NextAuth.js Integration
 */
function UserMenu() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {session.user?.name || 'User'}
          </span>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 dark:hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="rounded-lg bg-discord px-3 py-1.5 text-sm font-medium text-white hover:bg-discord-hover"
        >
          Login
        </button>
      )}
    </div>
  )
}

export default config
