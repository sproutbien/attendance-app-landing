// ── Everything you might want to edit lives here ──────────────

export const CONTACT = {
  email: 'sales@sproutbien.com',
  whatsapp: '919895657728',                 // digits only, with country code
  whatsappDisplay: '+91 98956 57728',
  whatsappText: 'Hi! I saw the Sproutbien Attendance Tracker and would like to know more.',
}

// Business details for the Terms, Privacy, Refund and Contact pages (/terms, /privacy,
// /refund-policy, /contact). Use exactly what's on your PAN / GST / bank account —
// the payment gateway checks that they match. Anything starting with "TODO" is
// shown highlighted on the page until it's filled in.
export const LEGAL = {
  legalName: 'Sproutbien LLP',
  tradeName: 'Sproutbien',                        // the brand people know
  businessType: 'limited liability partnership',
  address: 'TC 4, 2111, Pattom - Kowdiar Rd, opp. IOB Bank, Pattom, Thiruvananthapuram, Keralam 695004',
  city: 'Thiruvananthapuram, Kerala',             // also the place for any legal disputes
  gstin: '32ADWFS5825Q1Z3',                       // leave empty if not GST-registered
  email: CONTACT.email,
  phone: CONTACT.whatsappDisplay,
  hours: 'Monday to Saturday, 9:30 AM – 6:00 PM IST (except public holidays)',
  grievanceOfficer: 'Arun Sivaraj',
  grievancePhone: '+91 98956 57728',
  lastUpdated: '5 October 2026',
  // Refund rules (shown on /refund-policy)
  setupRefundDays: 7,                             // full set-up refund if cancelled within this many days of paying AND before set-up starts
  refundProcessingDays: '5–7 working days',
  setupDeliveryDays: '7 working days',            // from the kick-off call
}

export const DEMO_URL = (import.meta.env.VITE_DEMO_URL as string | undefined) || '#demo'

export const DEMO_LOGINS = [
  { role: 'admin',    label: 'Admin',    who: 'Anitha Menon, HR Manager',     email: 'admin@demo.sproutbien.com' },
  { role: 'employee', label: 'Employee', who: 'Arjun Nair, Software Engineer', email: 'employee@demo.sproutbien.com' },
] as const
export const DEMO_PASSWORD = 'Demo@2026'

export const GST_NOTE = 'Prices in INR. GST (18%) extra.'

export type Plan = {
  name: string
  tagline: string
  setup: string            // one-time
  monthly: string          // per month
  employees: string
  featured?: boolean
  features: string[]
  cta: string
}

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For small teams getting off spreadsheets',
    setup: '₹24,999',
    monthly: '₹1,499',
    employees: 'Up to 25 employees',
    features: [
      'Your logo, colours and app name',
      'Your own domain (e.g. attendance.yourcompany.in)',
      'Your own private database, set up and secured by us',
      'WhatsApp leave alerts set up on your number',
      'Leave policy, shifts and holidays configured for you',
      'Updates, backups and email support',
    ],
    cta: 'Get Starter',
  },
  {
    name: 'Growth',
    tagline: 'For growing companies with several teams',
    setup: '₹44,999',
    monthly: '₹2,999',
    employees: 'Up to 100 employees',
    featured: true,
    features: [
      'Everything in Starter',
      'Import of your existing employees and leave balances',
      'Two online training sessions for admins',
      'Priority support on WhatsApp',
      'Up to 2 hours a month of small changes',
    ],
    cta: 'Get Growth',
  },
  {
    name: 'Enterprise',
    tagline: 'For large teams and custom needs',
    setup: 'Custom',
    monthly: 'Custom',
    employees: '100+ employees or several companies',
    features: [
      'Everything in Growth',
      'Custom features built for your process',
      'Multiple companies or branches',
      'Agreed response times (SLA)',
    ],
    cta: 'Talk to us',
  },
]

export const PRICING_FOOTNOTES = [
  'Pay yearly and get 2 months of the monthly fee free.',
  'Hosting usually runs on free or low-cost plans of Supabase and Vercel. Any charges from them, or Meta’s WhatsApp message fees, are billed to you directly.',
]

// Screenshots live in public/screens/. A missing file shows a neat placeholder.
export type Shot = { file: string; title: string; caption: string }

export const SHOTS = {
  login:        { file: 'login.png',            title: 'Login',               caption: 'Branded sign-in with password reset by email.' },
  dashboard:    { file: 'dashboard.png',        title: 'Employee dashboard',  caption: 'Check in, pause for a break, check out — today’s time and this month at a glance.' },
  leave:        { file: 'leave.png',            title: 'Request leave',       caption: 'Live balances, half days, voice notes and sick-leave documents.' },
  stats:        { file: 'stats.png',            title: 'My Statistics',       caption: 'Punctuality, hours vs shift, leave and a 6-month trend — downloadable as PDF.' },
  attendance:   { file: 'admin-attendance.png', title: 'Daily attendance',    caption: 'Who’s in, late, on a break or on leave — right now.' },
  teamStats:    { file: 'team-stats.png',       title: 'Team Stats',          caption: 'Compare people and departments; “Worth a look” flags odd patterns.' },
  profile:      { file: 'employee-profile.png', title: 'Employee profile',    caption: 'Employee ID, status, manager, shift, emergency contact and HR notes.' },
  employees:    { file: 'employees.png',        title: 'Employees',           caption: 'Filters by department, status and location; deleted staff go to a bin.' },
  shifts:       { file: 'shifts.png',           title: 'Shifts',              caption: 'Each shift sets its own late, half-day and minimum-break rules.' },
  approvals:    { file: 'leave-approvals.png',  title: 'Leave approvals',     caption: 'Approve in one click — paid days and Loss of Pay are worked out for you.' },
  corrections:  { file: 'corrections.png',      title: 'Corrections',         caption: 'Employees ask to fix a time; admins approve, adjust or reject.' },
  payroll:      { file: 'payroll.png',          title: 'Payroll',             caption: 'Paid days → salary in INR, from attendance and paid leave.' },
  calendar:     { file: 'calendar.png',         title: 'Holidays & calendar', caption: 'Company holidays and everyone’s month on one calendar.' },
} satisfies Record<string, Shot>

export const PHONE_SHOTS: Shot[] = [
  { file: 'phone-dashboard.png',  title: 'Check in',   caption: 'One tap from the phone.' },
  { file: 'phone-leave.png',      title: 'Leave',      caption: 'Apply with a voice note.' },
  { file: 'phone-stats.png',      title: 'Statistics', caption: 'Their month, clearly.' },
  { file: 'phone-admin.png',      title: 'Admin',      caption: 'Who’s in, at a glance.' },
]
