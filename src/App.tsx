import { useState } from 'react'
import {
  ArrowRight, BadgeIndianRupee, Bell, Building2, CalendarCheck, CalendarDays, ChartColumn, Check,
  ClipboardCheck, Clock, Coffee, Database, FileCheck, Globe, LogIn, Mail, Menu, MessageCircle,
  Palette, ShieldCheck, Smartphone, Timer, TrendingUp, UserCog, Users, X,
} from 'lucide-react'
import { CONTACT, DEMO_LOGINS, DEMO_PASSWORD, DEMO_URL, GST_NOTE, PHONE_SHOTS, PLANS, PRICING_FOOTNOTES, SHOTS } from './config'
import { BrowserShot, Lightbox, PhoneShot } from './components/Screenshot'
import ContactForm from './components/ContactForm'

const ALL_SHOTS = [...Object.values(SHOTS), ...PHONE_SHOTS]

const WA_LINK = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`

const demoLink = (role: string) => (DEMO_URL.startsWith('http') ? `${DEMO_URL}/login?as=${role}` : '#demo')

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [plan, setPlan] = useState('')

  function pickPlan(name: string) {
    setPlan(name)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Gallery />
        <Phones />
        <WhatsApp />
        <WhiteLabel />
        <Pricing onPick={pickPlan} />
        <Demo />
        <Faq />
        <Contact plan={plan} setPlan={setPlan} />
      </main>
      <Footer />
      <Lightbox shots={ALL_SHOTS} />
      <a className="wa-float" href={WA_LINK} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={26} />
      </a>
    </>
  )
}

// ── Header ──────────────────────────────────────────────────

const NAV = [
  ['Features', '#features'],
  ['Screens', '#screens'],
  ['White-label', '#white-label'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const

function Header({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="" />
          <span className="brand-name">Sprout<b>Bien</b></span>
          <span className="brand-sub">Attendance Tracker</span>
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-primary btn-sm" href="#demo" onClick={() => setOpen(false)}>Try the demo</a>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

// ── Hero ────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">White-label · Made in Kerala for Indian teams</p>
          <h1>Attendance, leave and payroll — <span>under your brand.</span></h1>
          <p className="lead">
            Check-ins that follow your shifts, Casual / Sick / Earned leave that credits itself every month,
            Loss of Pay worked out on approval, and salaries in rupees. We set it up with your logo,
            on your domain and in your own database.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#demo"><LogIn size={18} /> Try the live demo</a>
            <a className="btn btn-ghost" href="#pricing">See pricing <ArrowRight size={18} /></a>
          </div>
          <ul className="hero-points">
            <li><Check size={16} /> IST shifts, Sundays &amp; Kerala holidays built in</li>
            <li><Check size={16} /> Works on any phone browser — nothing to install</li>
            <li><Check size={16} /> WhatsApp alerts for leave requests</li>
          </ul>
        </div>
        <div className="hero-shot">
          <BrowserShot shot={SHOTS.attendance} eager />
          <div className="hero-phone"><PhoneShot shot={PHONE_SHOTS[0]} /></div>
        </div>
      </div>
    </section>
  )
}

// ── Quick highlights ────────────────────────────────────────

const HIGHLIGHTS = [
  { icon: Clock,          title: 'Check in & breaks',   text: 'One-tap check-in, pause and resume breaks, confirm on check-out.' },
  { icon: Timer,          title: 'Shift rules',         text: 'Late, half-day and minimum-break rules set per shift.' },
  { icon: CalendarCheck,  title: 'Leave & balances',    text: 'Monthly accrual, Apr–Mar year, carry-forward, half days.' },
  { icon: BadgeIndianRupee, title: 'Payroll in INR',    text: 'Paid days → salary, with paid leave and Loss of Pay.' },
  { icon: ChartColumn,    title: 'Statistics',          text: 'Personal and team stats, 6-month trends, PDF reports.' },
  { icon: Users,          title: 'Employee records',    text: 'IDs, statuses, notice periods, managers, HR notes.' },
  { icon: ClipboardCheck, title: 'Corrections',         text: 'Forgot to check out? Ask, and an admin approves.' },
  { icon: Bell,           title: 'WhatsApp alerts',     text: 'Admins hear about leave the moment it’s requested.' },
]

function Highlights() {
  return (
    <section className="section section--tight" aria-label="Highlights">
      <div className="wrap highlight-grid">
        {HIGHLIGHTS.map(h => (
          <div className="highlight" key={h.title}>
            <span className="icon-well"><h.icon size={20} /></span>
            <div>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Feature rows ────────────────────────────────────────────

const FEATURES = [
  {
    shot: SHOTS.dashboard,
    eyebrow: 'For employees',
    title: 'A check-in screen people actually like using',
    points: [
      'Check in, take a break, check out — the timer pauses during breaks',
      'Late after your grace time, automatic half day after a cut-off — set per shift',
      'A minimum break is counted on full days, so skipping the pause button gains nothing',
      'Can’t check in on a leave day; cancel today’s leave instead',
    ],
  },
  {
    shot: SHOTS.leave,
    eyebrow: 'Leave, the Indian way',
    title: 'Casual, Sick, Earned and Loss of Pay — handled',
    points: [
      'Leave credits every month, from the joining month; leave year April to March',
      'Earned leave carries forward (capped); Casual and Sick lapse',
      'Sundays and holidays inside a leave aren’t counted; half days count as 0.5',
      'Not enough balance? Use what’s left and take the rest as Loss of Pay',
      'Record a voice note instead of typing; attach medical certificates to sick leave',
    ],
  },
  {
    shot: SHOTS.attendance,
    eyebrow: 'For admins',
    title: 'Know who’s working — right now',
    points: [
      'Live list of who has checked in, who’s late, on a break or on leave',
      'Flags days where a break was topped up to the minimum',
      'Approve leave and time corrections from one place',
    ],
  },
  {
    shot: SHOTS.teamStats,
    eyebrow: 'Insights',
    title: 'Team stats that point you to what matters',
    points: [
      'Attendance %, average hours and on-time rate per person and department',
      '“Worth a look” card for patterns like skipped breaks or very long days',
      'Six-month trends, sortable comparison table, one-click PDF',
    ],
  },
  {
    shot: SHOTS.payroll,
    eyebrow: 'Payroll',
    title: 'From attendance to salary in rupees',
    points: [
      'Paid days = days worked + paid leave; Loss of Pay is deducted',
      'Set the working days for each month; joining and last working days are respected',
      'A monthly payroll sheet for every employee, ready for your accountant',
    ],
  },
]

function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Features</p>
          <h2>Everything a growing Indian company needs — nothing it doesn’t</h2>
        </div>
        <div className="feature-rows">
          {FEATURES.map((f, i) => (
            <article className={`feature-row ${i % 2 ? 'feature-row--flip' : ''}`} key={f.title}>
              <div className="feature-copy">
                <p className="eyebrow">{f.eyebrow}</p>
                <h3>{f.title}</h3>
                <ul className="checks">
                  {f.points.map(p => <li key={p}><Check size={16} />{p}</li>)}
                </ul>
              </div>
              <div className="feature-shot"><BrowserShot shot={f.shot} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Screens gallery ─────────────────────────────────────────

const GALLERY = [
  SHOTS.login, SHOTS.stats, SHOTS.approvals, SHOTS.corrections,
  SHOTS.employees, SHOTS.profile, SHOTS.shifts, SHOTS.calendar,
]

function Gallery() {
  const [active, setActive] = useState(0)
  const shot = GALLERY[active]
  return (
    <section className="section section--soft" id="screens">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">More screens</p>
          <h2>Take a look around</h2>
          <p className="section-sub">All screenshots are from the live demo with sample data for a Trivandrum company.</p>
        </div>
        <div className="gallery">
          <div className="gallery-tabs" role="tablist" aria-label="Screens">
            {GALLERY.map((s, i) => (
              <button key={s.file} role="tab" aria-selected={i === active}
                className={`gallery-tab ${i === active ? 'is-active' : ''}`} onClick={() => setActive(i)}>
                <strong>{s.title}</strong>
                <span>{s.caption}</span>
              </button>
            ))}
          </div>
          <div className="gallery-view" role="tabpanel">
            <BrowserShot key={shot.file} shot={shot} />
            <p className="gallery-caption">{shot.caption}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Phones ──────────────────────────────────────────────────

function Phones() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><Smartphone size={14} /> Mobile</p>
          <h2>Made for the phone in their pocket</h2>
          <p className="section-sub">Every screen works on a phone browser, in light or dark mode. No app store, no installs.</p>
        </div>
        <div className="phone-row">
          {PHONE_SHOTS.map(s => <PhoneShot key={s.file} shot={s} />)}
        </div>
      </div>
    </section>
  )
}

// ── WhatsApp ────────────────────────────────────────────────

function WhatsApp() {
  return (
    <section className="section section--green">
      <div className="wrap wa-grid">
        <div>
          <p className="eyebrow eyebrow--light"><MessageCircle size={14} /> WhatsApp alerts</p>
          <h2>Leave requests reach admins on WhatsApp</h2>
          <ul className="checks checks--light">
            <li><Check size={16} />Admins get a message the moment someone applies</li>
            <li><Check size={16} />Employees hear back when it’s approved or rejected</li>
            <li><Check size={16} />Cancellations are flagged too, including after approval</li>
            <li><Check size={16} />Sent from your company’s WhatsApp Business number</li>
          </ul>
        </div>
        <div className="wa-chat" aria-label="Example WhatsApp messages">
          <div className="wa-head">
            <img src="/logo.jpg" alt="" />
            <div><strong>Sproutbien HR</strong><span>WhatsApp Business</span></div>
          </div>
          <div className="wa-msg">
            <b>New leave request</b><br />
            Arjun Nair · Earned Leave<br />
            Wed 14 – Fri 16 Oct (3 days)<br />
            “Family function at our native place in Kannur”<br />
            <span className="wa-link">Open in the app to approve</span>
            <time>10:42</time>
          </div>
          <div className="wa-msg">
            <b>Leave cancelled</b><br />
            Fathima Rasheed cancelled approved Casual Leave for Mon 5 Oct.
            <time>13:05</time>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── White-label ─────────────────────────────────────────────

const WHITE_LABEL = [
  { icon: Palette,     title: 'Your logo and colours', text: 'Your name on the login screen, header, PDFs and browser tab — in your brand colours.' },
  { icon: Globe,       title: 'Your domain',           text: 'Runs at an address like attendance.yourcompany.in, with HTTPS.' },
  { icon: Database,    title: 'Your own database',     text: 'A private Supabase (PostgreSQL) project that you own. We set it up, secure it and hand it over.' },
  { icon: MessageCircle, title: 'WhatsApp set up',     text: 'We connect your WhatsApp Business number and message templates.' },
  { icon: UserCog,     title: 'Configured for you',    text: 'Shifts, leave quotas, holidays, departments and your first admins — ready on day one.' },
  { icon: ShieldCheck, title: 'Secure by design',      text: 'Row-level security: employees only ever see their own records; admins see everyone.' },
]

function WhiteLabel() {
  return (
    <section className="section" id="white-label">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><Building2 size={14} /> White-label</p>
          <h2>Your app. Your brand. Your data.</h2>
          <p className="section-sub">This isn’t a shared portal with our logo on it. You get your own copy, set up end to end.</p>
        </div>
        <div className="card-grid">
          {WHITE_LABEL.map(w => (
            <div className="card" key={w.title}>
              <span className="icon-well"><w.icon size={20} /></span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
        <div className="steps">
          {[
            ['1', 'Call', 'We go over your shifts, leave policy and team.'],
            ['2', 'Set-up', 'We brand, configure and deploy your copy.'],
            ['3', 'Go live', 'Your team logs in; we train your admins.'],
          ].map(([n, t, d]) => (
            <div className="step" key={n}>
              <span className="step-n">{n}</span>
              <div><strong>{t}</strong><p>{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ─────────────────────────────────────────────────

function Pricing({ onPick }: { onPick: (name: string) => void }) {
  return (
    <section className="section section--soft" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><BadgeIndianRupee size={14} /> Pricing</p>
          <h2>One-time set-up, small monthly fee</h2>
          <p className="section-sub">{GST_NOTE} Every plan includes your branding, domain, database and WhatsApp set-up.</p>
        </div>
        <div className="plans">
          {PLANS.map(p => (
            <article className={`plan ${p.featured ? 'plan--featured' : ''}`} key={p.name}>
              {p.featured && <span className="plan-badge">Most popular</span>}
              <h3>{p.name}</h3>
              <p className="plan-tagline">{p.tagline}</p>
              <div className="plan-price">
                {p.setup === 'Custom' ? (
                  <span className="plan-amount">Let’s talk</span>
                ) : (
                  <>
                    <span className="plan-amount">{p.setup}</span>
                    <span className="plan-unit">one-time set-up</span>
                    <span className="plan-monthly"><b>{p.monthly}</b> / month</span>
                  </>
                )}
              </div>
              <p className="plan-employees"><Users size={16} /> {p.employees}</p>
              <ul className="checks">
                {p.features.map(f => <li key={f}><Check size={16} />{f}</li>)}
              </ul>
              <button className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`} onClick={() => onPick(p.name)}>
                {p.cta}
              </button>
            </article>
          ))}
        </div>
        <ul className="footnotes">
          {PRICING_FOOTNOTES.map(n => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </section>
  )
}

// ── Demo ────────────────────────────────────────────────────

function Demo() {
  return (
    <section className="section" id="demo">
      <div className="wrap demo-box">
        <div>
          <p className="eyebrow"><LogIn size={14} /> Live demo</p>
          <h2>Click around a real company</h2>
          <p className="section-sub">
            Sproutbien Technologies, Trivandrum — 13 people, five months of attendance, leave, corrections and payroll.
            During the day the team checks in and out on its own. Change anything you like: the demo resets every night.
          </p>
        </div>
        <div className="demo-logins">
          {DEMO_LOGINS.map(d => (
            <a className="demo-login" key={d.role} href={demoLink(d.role)} target={DEMO_URL.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="icon-well">{d.role === 'admin' ? <UserCog size={20} /> : <Coffee size={20} />}</span>
              <span className="demo-login-text">
                <strong>Try as {d.label}</strong>
                <span>{d.who}</span>
                <code>{d.email}</code>
              </span>
              <ArrowRight size={20} />
            </a>
          ))}
          <p className="demo-pass">Password for both: <code>{DEMO_PASSWORD}</code> — the buttons log you in automatically.</p>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────

const FAQS = [
  ['Do employees need to install an app?',
   'No. It runs in any modern browser on a phone, tablet or computer. Employees can add it to their home screen like an app.'],
  ['Who owns the data?',
   'You do. Everything is stored in your own Supabase (PostgreSQL) project, under your account. You can export it any time.'],
  ['Can it follow our leave policy?',
   'Yes. Leave quotas, carry-forward limits, shifts, late and half-day times, minimum breaks and holidays are all set by your admins. We configure them for you at set-up.'],
  ['Does it work for remote teams?',
   'Yes. Employees check in from wherever they work. Team Stats highlights unusual patterns, such as skipped breaks or very long days, so you know where to look.'],
  ['How long does set-up take?',
   'Usually about a week from our first call, depending on how quickly the domain and WhatsApp Business number are ready.'],
  ['What does the monthly fee cover?',
   'Updates and new features, bug fixes, keeping your copy running, backups and support.'],
  ['Can you add features we need?',
   'Yes. Small changes are included in Growth; larger ones are quoted separately or covered in Enterprise.'],
]

function Faq() {
  return (
    <section className="section section--soft" id="faq">
      <div className="wrap faq-wrap">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Questions people ask</h2>
        </div>
        <div className="faq">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────────

function Contact({ plan, setPlan }: { plan: string; setPlan: (p: string) => void }) {
  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s set it up for your team</h2>
          <p className="section-sub">Tell us a little about your company and we’ll get back to you with a walkthrough and a quote.</p>
          <div className="contact-ways">
            <a className="contact-way" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Sproutbien Attendance Tracker')}`}>
              <span className="icon-well"><Mail size={20} /></span>
              <span><strong>Email</strong><span>{CONTACT.email}</span></span>
            </a>
            <a className="contact-way" href={WA_LINK} target="_blank" rel="noreferrer">
              <span className="icon-well icon-well--wa"><MessageCircle size={20} /></span>
              <span><strong>WhatsApp</strong><span>{CONTACT.whatsappDisplay}</span></span>
            </a>
          </div>
          <ul className="trust">
            <li><CalendarDays size={16} /> Try the live demo before you decide</li>
            <li><FileCheck size={16} /> Your data stays in your own database</li>
            <li><TrendingUp size={16} /> Grows with you — upgrade plans any time</li>
          </ul>
        </div>
        <div className="form-card">
          <ContactForm plan={plan} onPlanChange={setPlan} />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="brand brand--footer">
          <img src="/logo.jpg" alt="" />
          <span className="brand-name">Sprout<b>Bien</b></span>
        </div>
        <p>© {new Date().getFullYear()} Sproutbien Technologies, Trivandrum, Kerala · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
      </div>
    </footer>
  )
}
