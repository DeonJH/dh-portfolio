import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// @vitejs/plugin-react injects an inline refresh preamble in dev, which the
// strict production CSP in index.html would block — relax script-src in dev only.
const devCspRelax = {
  name: 'dev-csp-relax',
  apply: 'serve',
  transformIndexHtml(html) {
    return html.replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devCspRelax],
  base: '/',
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.js'],
  },
})
