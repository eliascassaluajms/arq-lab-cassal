import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-icon.svg'],
      manifest: {
        name: 'ARQ/LAB · Arquitectura de Computadores I',
        short_name: 'ARQ/LAB',
        description: 'Clases, prácticas de laboratorio y actividades autónomas de Arquitectura de Computadores I.',
        theme_color: '#f5f5ef',
        background_color: '#f5f5ef',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: '/pwa-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
      workbox: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          { urlPattern: /^https:\/\/images\.unsplash\.com\//, handler: 'CacheFirst', options: { cacheName: 'course-images', expiration: { maxEntries: 8, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [0, 200] } } },
          { urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//, handler: 'StaleWhileRevalidate', options: { cacheName: 'course-fonts', expiration: { maxEntries: 8, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [0, 200] } } },
        ],
      },
    }),
  ],
})
