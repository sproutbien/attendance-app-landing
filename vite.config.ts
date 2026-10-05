import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The policy pages are rendered by the same app (see src/main.tsx). Give each one its own
// HTML file so /terms etc. are real pages on the host (vercel.json cleanUrls drops ".html").
const POLICY_PAGES = ['terms', 'privacy', 'refund-policy', 'contact']

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'policy-pages',
      apply: 'build',
      closeBundle() {
        const dist = resolve(__dirname, 'dist')
        for (const page of POLICY_PAGES) copyFileSync(resolve(dist, 'index.html'), resolve(dist, `${page}.html`))
      },
    },
  ],
})
