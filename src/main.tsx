import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import LegalPage, { LEGAL_PAGES } from './components/LegalPages'
import type { LegalPath } from './components/LegalPages'
import './styles.css'
import './sections.css'

// /terms, /privacy, /refund-policy and /contact are separate pages; everything else is the landing page
const path = window.location.pathname.replace(/\/+$/, '') as LegalPath
const legal = path in LEGAL_PAGES
if (legal) document.title = `${LEGAL_PAGES[path]} · Sproutbien Attendance Tracker`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {legal ? <LegalPage path={path} /> : <App />}
  </StrictMode>,
)
