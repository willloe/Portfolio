import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const enablePWA = env.ENABLE_PWA === 'true' // off by default

  return {
    base: '/', // user site (willloe.github.io) is served from root
    plugins: [
      react(),
      ...(enablePWA
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              injectRegister: 'auto',
              workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
              },
              includeAssets: [
                'favicon.svg',
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
                scope: '/',     // keep in sync with base
                start_url: '/', // keep in sync with base
                icons: [
                  { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                  { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                  { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
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
