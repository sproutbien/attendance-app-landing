import { useState } from 'react'
import {
  ArrowRight, BadgeIndianRupee, Bell, Briefcase, Building2, Camera, CalendarCheck, CalendarDays, ChartColumn, Check,
  ClipboardCheck, Clock, Coffee, Database, FileCheck, Globe, KeyRound, LogIn, Mail, MapPin, Menu, MessageCircle,
  Palette, ScrollText, ShieldCheck, Smartphone, Sparkles, Timer, TrendingUp, UserCheck, UserCog, UserPlus, Users, X,
} from 'lucide-react'
import { CONTACT, DEMO_LOGINS, DEMO_PASSWORD, DEMO_URL, GST_NOTE, PHONE_SHOTS, PLANS, PRICING_FOOTNOTES, SHOTS } from './config'
import type { Shot } from './config'
import { BrowserShot, Lightbox, PhoneShot } from './components/Screenshot'
import ContactForm from './components/ContactForm'
import { LegalFooter } from './components/LegalPages'

const ALL_SHOTS = [...Object.values(SHOTS), ...PHONE_SHOTS]
const PHONE = (file: string) => PHONE_SHOTS.find(s => s.file === file)!

const WA_LINK = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`
const EXTERNAL_DEMO = DEMO_URL.startsWith('http')
const demoLink = (role: string) => (EXTERNAL_DEMO ? `${DEMO_URL}/login?as=${role}` : '#demo')
const demoTarget = EXTERNAL_DEMO ? { target: '_blank', rel: 'noreferrer' } : {}

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
        <ProofStrip />
        <WhySwitch />
        <Highlights />
        <Security />
        <Demo />
        <Features />
        <HrSuite />
        <Phones />
        <WhatsApp />
        <WhiteLabel />
        <CtaBand
          title="See it with your own shifts and leave policy"
          text="Book a free 30-minute walkthrough. We’ll set up the demo the way your company works and send you a quote."
        />
        <Pricing onPick={pickPlan} />
        <Faq />
        <Contact plan={plan} setPlan={setPlan} />
      </main>
      <LegalFooter />
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
  ['Security', '#security'],
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
          <a className="btn btn-outline btn-sm" href="#contact" onClick={() => setOpen(false)}>Book a walkthrough</a>
          <a className="btn btn-primary btn-sm" href={demoLink('admin')} {...demoTarget} onClick={() => setOpen(false)}>Try live demo</a>
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
    <section className="hero hero--v2" id="top">
      <div className="wrap hero-v2-grid">
        <div className="hero-v2-copy">
          <p className="eyebrow">White-label HR app · Made in Kerala for Indian teams</p>
          <h1>Attendance, leave and payroll — <span>under your brand.</span></h1>
          <p className="lead">
            Selfie and location-checked check-ins, Indian leave rules that run themselves, and salaries in rupees.
            Your logo, your web address, your own private database. We set it all up for you.
          </p>
          <ul className="hero-points">
            <li><Check size={16} /> Stops proxy attendance with a selfie and an office-area check</li>
            <li><Check size={16} /> Casual, Sick, Earned and Loss of Pay worked out automatically</li>
            <li><Check size={16} /> Hiring, onboarding and payroll in the same app</li>
          </ul>
          <div className="hero-cta">
            <a className="btn btn-primary btn-lg" href={demoLink('admin')} {...demoTarget}>
              <LogIn size={18} /> Try the live demo
            </a>
            <a className="btn btn-outline btn-lg" href={demoLink('employee')} {...demoTarget}>
              See the employee app
            </a>
          </div>
          <p className="hero-v2-note">
            No sign-up — opens a real demo company. Prefer a guided tour? <a href="#contact">Book a free walkthrough <ArrowRight size={14} /></a>
          </p>
        </div>
        <div className="hero-v2-visual">
          <BrowserShot shot={SHOTS.attendance} eager />
          <div className="hero-v2-phone"><PhoneShot shot={PHONE('phone-selfie.png')} /></div>
        </div>
      </div>
    </section>
  )
}

const PROOF = [
  { icon: Database,    text: 'Your own private database' },
  { icon: Palette,     text: 'Your logo and colours' },
  { icon: Smartphone,  text: 'Works on any phone — no install' },
  { icon: ShieldCheck, text: 'Selfies deleted after 15 days' },
  { icon: Clock,       text: 'Live in about a week' },
]

function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="At a glance">
      <div className="wrap proof-row">
        {PROOF.map(p => <span key={p.text}><p.icon size={18} /> {p.text}</span>)}
      </div>
    </section>
  )
}

// ── Why teams switch ────────────────────────────────────────

const WHY = [
  { icon: UserCheck,       title: 'No more proxy attendance', text: 'A selfie and an office-area check at check-in. Flags show up for admins straight away.' },
  { icon: CalendarCheck,   title: 'Leave rules that run themselves', text: 'Monthly credits, carry-forward, half days, holidays and Loss of Pay — no spreadsheet maths.' },
  { icon: BadgeIndianRupee, title: 'Payroll-ready every month', text: 'Paid days and salary in rupees come straight from attendance and approved leave.' },
  { icon: Building2,       title: 'It looks like your own app', text: 'Your name, logo, colours and web address — your team never sees ours.' },
]

function WhySwitch() {
  return (
    <section className="section section--tight-top">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Why teams switch</p>
          <h2>Less chasing, fewer disputes, payroll on time</h2>
        </div>
        <div className="why-grid">
          {WHY.map(w => (
            <div className="why-card" key={w.title}>
              <span className="icon-well"><w.icon size={22} /></span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Everything at a glance ──────────────────────────────────

const HIGHLIGHTS = [
  { icon: Clock,          title: 'Check in & breaks',     text: 'One-tap check-in, pause and resume breaks, confirm on check-out.' },
  { icon: Camera,         title: 'Selfie check-in',       text: 'A live photo at check-in, shown next to the profile photo.' },
  { icon: MapPin,         title: 'Location check',        text: 'Check-ins compared with each office’s area; remote staff skipped.' },
  { icon: Timer,          title: 'Shift rules',           text: 'Late, half-day and minimum-break rules set per shift.' },
  { icon: CalendarCheck,  title: 'Leave & balances',      text: 'Monthly accrual, Apr–Mar year, carry-forward, monthly limits.' },
  { icon: BadgeIndianRupee, title: 'Payroll in INR',      text: 'Paid days → salary, with paid leave and Loss of Pay.' },
  { icon: ClipboardCheck, title: 'Corrections',           text: 'Forgot to check out? Ask, and an admin approves.' },
  { icon: ChartColumn,    title: 'Statistics',            text: 'Personal and team stats, 6-month trends, PDF reports.' },
  { icon: UserPlus,       title: 'Hiring',                text: 'Candidates from applied to offer, then one-click hire.' },
  { icon: Briefcase,      title: 'Onboarding',            text: 'Checklists, document uploads and probation reminders.' },
  { icon: ScrollText,     title: 'Leave policy',          text: 'Always up to date; employees confirm they’ve read it.' },
  { icon: Users,          title: 'Employee records',      text: 'IDs, statuses, notice periods, managers, HR notes.' },
  { icon: KeyRound,       title: 'Secure logins',         text: 'Own password at first login; admins can reset any time.' },
  { icon: Bell,           title: 'WhatsApp alerts',       text: 'Admins hear about leave the moment it’s requested.' },
  { icon: CalendarDays,   title: 'Holidays',              text: 'Public and optional holidays (pick 1 of 2) per year.' },
  { icon: Palette,        title: 'White-label',           text: 'Your brand on every screen, PDF and the browser tab.' },
]

function Highlights() {
  return (
    <section className="section section--soft" id="features" aria-label="All features">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Everything included</p>
          <h2>One app for the whole employee day — and year</h2>
          <p className="section-sub">Every plan includes every feature. Plans differ only by team size and the help we give you.</p>
        </div>
        <div className="highlight-grid">
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
      </div>
    </section>
  )
}

// ── Security: selfie + location ─────────────────────────────

function FeatureRow({ shot, eyebrow, title, points, flip, extra }: {
  shot: Shot; eyebrow: React.ReactNode; title: string; points: string[]; flip?: boolean; extra?: React.ReactNode
}) {
  return (
    <article className={`feature-row ${flip ? 'feature-row--flip' : ''}`}>
      <div className="feature-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <ul className="checks">
          {points.map(p => <li key={p}><Check size={16} />{p}</li>)}
        </ul>
        {extra}
      </div>
      <div className="feature-shot"><BrowserShot shot={shot} /></div>
    </article>
  )
}

function Security() {
  return (
    <section className="section" id="security">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><ShieldCheck size={14} /> Check-in security</p>
          <h2>Stop proxy attendance — without making honest people suffer</h2>
          <p className="section-sub">
            Two checks your admins can switch on for everyone or for particular people. Genuine problems,
            like a broken camera, never stop anyone from checking in — they’re simply flagged for you.
          </p>
        </div>
        <div className="feature-rows">
          <FeatureRow
            shot={SHOTS.selfie}
            eyebrow={<><Camera size={14} /> Selfie check-in</>}
            title="A live selfie at every check-in"
            points={[
              'The camera opens when they tap Check In — no gallery uploads, no reusing old photos',
              'Each selfie sits next to the profile photo, one click from the attendance list',
              'Camera not working? They can still check in; you see “No selfie” and the reason',
              'Selfies are deleted automatically after 15 days',
            ]}
            extra={<div className="security-mini"><BrowserShot shot={SHOTS.selfieReview} /></div>}
          />
          <FeatureRow
            flip
            shot={SHOTS.attendance}
            eyebrow={<><MapPin size={14} /> Location check</>}
            title="Know they checked in from the office"
            points={[
              'Draw an area around each office — paste a Google Maps pin or tap “I’m here”',
              'Every check-in shows In office, how far away, or Location unclear',
              'Remote staff and locations without an area are simply not checked',
              'Optional Strict mode refuses check-ins from clearly outside the area',
              'Exact locations are deleted after 30 days; only the result is kept',
            ]}
            extra={<div className="security-mini"><BrowserShot shot={SHOTS.security} /></div>}
          />
        </div>
      </div>
    </section>
  )
}

// ── Live demo band ──────────────────────────────────────────

function Demo() {
  return (
    <section className="demo-band" id="demo">
      <div className="demo-glow" aria-hidden="true" />
      <div className="wrap demo-grid">
        <div className="demo-copy">
          <span className="live-badge"><span className="live-dot" aria-hidden="true" /> Live demo · no sign-up</span>
          <h2>Don’t take our word for it. <span>Click around a real company.</span></h2>
          <p>
            Sproutbien Technologies, Trivandrum — 13 people running on the app. During the day they check in, take
            breaks and check out on their own. Approve leave, run payroll, try the selfie check-in: it all resets every night.
          </p>
          <ul className="demo-facts">
            <li><strong>13</strong><span>employees</span></li>
            <li><strong>5</strong><span>months of data</span></li>
            <li><strong>1 click</strong><span>to log in</span></li>
          </ul>
          <div className="demo-buttons">
            {DEMO_LOGINS.map(d => (
              <a className={`demo-btn ${d.role === 'admin' ? 'demo-btn--primary' : ''}`} key={d.role}
                href={demoLink(d.role)} {...demoTarget}>
                <span className="demo-btn-icon">{d.role === 'admin' ? <UserCog size={22} /> : <Coffee size={22} />}</span>
                <span className="demo-btn-text">
                  <strong>Try as {d.label}</strong>
                  <span>{d.who}</span>
                </span>
                <ArrowRight size={22} className="demo-btn-arrow" />
              </a>
            ))}
          </div>
          <p className="demo-pass">
            Opens logged in automatically. Prefer to type it? <code>{DEMO_LOGINS[0].email}</code> or{' '}
            <code>{DEMO_LOGINS[1].email}</code>, password <code>{DEMO_PASSWORD}</code>
          </p>
        </div>
        <div className="demo-peek" aria-hidden="true">
          <img src={`/screens/${SHOTS.teamStats.file}`} alt="" loading="lazy" />
          <img src={`/screens/${PHONE_SHOTS[0].file}`} alt="" loading="lazy" className="demo-peek-phone" />
        </div>
      </div>
    </section>
  )
}

// ── Feature tours ───────────────────────────────────────────

const FEATURES = [
  {
    shot: SHOTS.dashboard,
    eyebrow: 'For employees',
    title: 'A check-in screen people actually like using',
    points: [
      'Check in, take a break, check out — the timer pauses during breaks',
      'Late after your grace time, automatic half day after a cut-off — set per shift',
      'A minimum break is counted on full days, so skipping the pause button gains nothing',
      'Their own month: hours, late days, leave and a log they can ask to correct',
    ],
  },
  {
    shot: SHOTS.leave,
    eyebrow: 'Leave, the Indian way',
    title: 'Casual, Sick, Earned and Loss of Pay — handled',
    points: [
      'Leave credits every month, from the joining month; leave year April to March',
      'Earned leave carries forward (capped); Casual and Sick lapse; optional monthly limits',
      'Sundays and holidays inside a leave aren’t counted; half days count as 0.5',
      'Not enough balance? Use what’s left and take the rest as Loss of Pay',
      'Record a voice note instead of typing; attach medical certificates to sick leave',
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
    <section className="section" id="tour">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">A closer look</p>
          <h2>Built around how Indian companies actually work</h2>
        </div>
        <div className="feature-rows">
          {FEATURES.map((f, i) => <FeatureRow key={f.title} flip={i % 2 === 1} {...f} />)}
        </div>
      </div>
    </section>
  )
}

// ── HR suite gallery ────────────────────────────────────────

const GALLERY = [
  SHOTS.hiring, SHOTS.profile, SHOTS.policy, SHOTS.approvals, SHOTS.corrections,
  SHOTS.employees, SHOTS.shifts, SHOTS.calendar, SHOTS.stats, SHOTS.login,
]

function HrSuite() {
  const [active, setActive] = useState(0)
  const shot = GALLERY[active]
  return (
    <section className="section section--soft" id="screens">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">From hire to payslip</p>
          <h2>The rest of HR, in the same place</h2>
          <p className="section-sub">Hiring, onboarding, policies, approvals and records — no second tool to buy. All screenshots are from the live demo.</p>
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
        <div className="phone-row phone-row--5">
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
  { icon: Palette,     title: 'Your logo and colours', text: 'Your name and logo on the login page, sidebar, PDFs and browser tab — every screen in your brand colour, light and dark.' },
  { icon: Globe,       title: 'Your web address',      text: 'Runs at an address like attendance.yourcompany.in, with HTTPS.' },
  { icon: Database,    title: 'Your own private database', text: 'Your data lives in a database used only by your company — never shared with other customers. Hosted, secured and backed up by us; export it any time.' },
  { icon: UserCog,     title: 'Configured for you',    text: 'Shifts, leave quotas, holidays, departments, office areas and your first admins — ready on day one.' },
  { icon: Sparkles,    title: 'Change it yourself',    text: 'Want a new logo next year? We can let your admins update the logo and colours themselves.' },
  { icon: ShieldCheck, title: 'Secure by design',      text: 'Employees only ever see their own records; admins see everyone. Everyone sets their own password.' },
]

function WhiteLabel() {
  return (
    <section className="section" id="white-label">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><Building2 size={14} /> White-label</p>
          <h2>Your app. Your brand. Your data.</h2>
          <p className="section-sub">This isn’t a shared portal with our logo on it. Here’s the same app set up for a sample company, “Acme Infotech”:</p>
        </div>
        <div className="wl-compare">
          <BrowserShot shot={SHOTS.rebrandLogin} />
          <BrowserShot shot={SHOTS.rebrandDashboard} />
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
            ['2', 'Set-up', 'We brand, configure and launch your copy — usually within a week.'],
            ['3', 'Go live', 'Your team logs in and sets their passwords; we train your admins.'],
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

// ── Call-to-action band ─────────────────────────────────────

function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band-row">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <a className="btn btn-white btn-lg" href={demoLink('admin')} {...demoTarget}><LogIn size={18} /> Try the live demo</a>
          <a className="btn btn-on-dark btn-lg" href="#contact">Book a free walkthrough</a>
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
          <h2>One-time set-up, small monthly fee — hosting included</h2>
          <p className="section-sub">{GST_NOTE} Every plan includes every feature, your branding, web address and a private database we host for you.</p>
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
        <p className="pricing-demo">Not sure yet? <a href={demoLink('admin')} {...demoTarget}>Try the live demo first <ArrowRight size={14} /></a></p>
      </div>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────

const FAQS = [
  ['Do employees need to install an app?',
   'No. It runs in any modern browser on a phone, tablet or computer. Employees can add it to their home screen like an app.'],
  ['Who owns the data?',
   'You do. It’s kept in a private database used only by your company — never shared with other customers. We host, secure and back it up, and you can ask for a full export at any time.'],
  ['Isn’t a selfie or location check intrusive?',
   'Both are optional and switched on by your admins, for everyone or for particular people. They happen only at check-in, employees are told what’s recorded, selfies are deleted after 15 days and exact locations after 30 days.'],
  ['Can someone still fake their attendance?',
   'The selfie and the location check together make buddy-punching hard, and every flag (no selfie, outside the area, unclear location) shows up for admins. A very determined person can fake GPS on some phones, so treat flags as a prompt to look, not as proof.'],
  ['What about people who work from home or on a laptop?',
   'Remote staff aren’t location-checked unless you choose to. Laptops often give a rough location; those check-ins show as “Location unclear” instead of being blocked.'],
  ['Can it follow our leave policy?',
   'Yes. Leave quotas, monthly limits, carry-forward, shifts, late and half-day times, minimum breaks and holidays are all set by your admins. We configure them for you at set-up, and the leave policy page builds itself from those settings.'],
  ['How long does set-up take?',
   'Usually about a week from our first call, depending on how quickly your web address and WhatsApp Business number are ready.'],
  ['What does the monthly fee cover?',
   'Hosting, daily backups, updates and new features, bug fixes and support. There are no separate hosting bills.'],
  ['Can we change the logo or colours later?',
   'Yes. Ask us any time, or we can let your admins change the logo and colours themselves from a Branding page.'],
  ['Can you add features we need?',
   'Yes. Small changes are included in Growth; larger ones are quoted separately or covered in Enterprise.'],
]

function Faq() {
  return (
    <section className="section" id="faq">
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

// ── Contact (final call to action) ──────────────────────────

function Contact({ plan, setPlan }: { plan: string; setPlan: (p: string) => void }) {
  return (
    <section className="section section--soft" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Get started</p>
          <h2>Book a free walkthrough</h2>
          <p className="section-sub">Tell us a little about your company. We’ll show you the app with your own shifts and leave policy, and send a quote — no obligation.</p>
          <div className="contact-ways">
            <a className="contact-way" href={demoLink('admin')} {...demoTarget}>
              <span className="icon-well"><LogIn size={20} /></span>
              <span><strong>Try it right now</strong><span>Open the live demo — no sign-up</span></span>
            </a>
            <a className="contact-way" href={WA_LINK} target="_blank" rel="noreferrer">
              <span className="icon-well icon-well--wa"><MessageCircle size={20} /></span>
              <span><strong>WhatsApp</strong><span>{CONTACT.whatsappDisplay}</span></span>
            </a>
            <a className="contact-way" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Sproutbien Attendance Tracker')}`}>
              <span className="icon-well"><Mail size={20} /></span>
              <span><strong>Email</strong><span>{CONTACT.email}</span></span>
            </a>
          </div>
          <ul className="trust">
            <li><CalendarDays size={16} /> Try the live demo before you decide</li>
            <li><FileCheck size={16} /> Your data stays in your own private database</li>
            <li><TrendingUp size={16} /> Grows with you — upgrade plans any time</li>
          </ul>
        </div>
        <div className="form-card" id="get-started">
          <ContactForm variant="full" plan={plan} onPlanChange={setPlan} />
        </div>
      </div>
    </section>
  )
}
