import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

const repoName = 'Portfolio'
const isGHUserSite = false // set true if the repo is <username>.github.io
const base = isGHUserSite ? '/' : `/${repoName}/`

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const enablePWA = env.ENABLE_PWA === 'true' // off by default

  return {
    base: '/',
    plugins: [
      react(),
      ...(enablePWA
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              injectRegister: 'auto',
              workbox: {
                // Keep this minimal & valid
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

                // OPTIONAL: safe runtime caching examples (no custom hooks)
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'StaleWhileRevalidate',
                    options: {
                      cacheName: 'google-fonts-stylesheets',
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                      },
                    },
                  },
                  {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'google-fonts-webfonts',
                      cacheableResponse: { statuses: [0, 200] },
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                      },
                    },
                  },
                ],
              },
              includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'masked-icon.svg',
              ],
              manifest: {
                name: 'Portfolio Website',
                short_name: 'Portfolio',
                description:
                  'Personal portfolio website showcasing projects and experience',
                theme_color: '#000000',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait',
                scope: base,
                start_url: base,
                icons: [
                  {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                  },
                  {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                  },
                  {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                  },
                ],
              },
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/features': path.resolve(__dirname, './src/features'),
        '@/lib': path.resolve(__dirname, './src/lib'),
        '@/data': path.resolve(__dirname, './src/data'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/styles': path.resolve(__dirname, './src/styles'),
      },
    },
    server: { port: 3000, open: true },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
            three: ['three', '@react-three/fiber', '@react-three/drei'],
          },
        },
      },
    },
    define: {
      __ENABLE_3D__: JSON.stringify(env.ENABLE_3D === 'true'),
      __ENABLE_PWA__: JSON.stringify(enablePWA),
    },
  }
})
