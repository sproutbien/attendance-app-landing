import { ArrowLeft, Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react'
import { CONTACT, LEGAL, PLANS } from '../config'

export const LEGAL_PAGES = {
  '/terms': 'Terms and Conditions',
  '/privacy': 'Privacy Policy',
  '/refund-policy': 'Refund and Cancellation Policy',
  '/contact': 'Contact Us',
} as const
export type LegalPath = keyof typeof LEGAL_PAGES

const WA_LINK = `https://wa.me/${CONTACT.whatsapp}`

/** Shows a value, or a yellow marker if it still says TODO. */
function V({ children }: { children: string }) {
  return children.startsWith('TODO') ? <mark className="legal-todo">{children}</mark> : <>{children}</>
}

const Business = () => (
  <><V>{LEGAL.legalName}</V> (“{LEGAL.tradeName}”, “we”, “us”), a <V>{LEGAL.businessType}</V> based in {LEGAL.city}, India</>
)

export default function LegalPage({ path }: { path: LegalPath }) {
  const title = LEGAL_PAGES[path]
  return (
    <>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href="/">
            <img src="/logo.jpg" alt="" />
            <span className="brand-name">Sprout<b>Bien</b></span>
            <span className="brand-sub">Attendance Tracker</span>
          </a>
          <a className="btn btn-ghost btn-sm legal-back" href="/"><ArrowLeft size={16} /> Back to the website</a>
        </div>
      </header>
      <main className="legal">
        <div className="wrap legal-wrap">
          <h1>{title}</h1>
          {path !== '/contact' && <p className="legal-updated">Last updated: {LEGAL.lastUpdated}</p>}
          {path === '/terms' && <Terms />}
          {path === '/privacy' && <Privacy />}
          {path === '/refund-policy' && <Refund />}
          {path === '/contact' && <Contact />}
        </div>
      </main>
      <LegalFooter />
    </>
  )
}

export function LegalFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="brand brand--footer">
          <img src="/logo.jpg" alt="" />
          <span className="brand-name">Sprout<b>Bien</b></span>
        </div>
        <nav className="footer-links" aria-label="Policies">
          {(Object.keys(LEGAL_PAGES) as LegalPath[]).map(p => <a key={p} href={p}>{LEGAL_PAGES[p]}</a>)}
        </nav>
        <p>© {new Date().getFullYear()} {LEGAL.legalName} · {LEGAL.city}{LEGAL.gstin && <> · GSTIN {LEGAL.gstin}</>} · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
      </div>
    </footer>
  )
}

// ── Terms and Conditions ────────────────────────────────────

function Terms() {
  return (
    <>
      <p>
        These terms are an agreement between <Business /> and the company or person that buys our attendance
        software (“you”, “the customer”). By paying for a plan or using the service, you agree to them.
      </p>

      <h2>1. What we provide</h2>
      <p>
        The Sproutbien Attendance Tracker: a web app for attendance, leave, shifts, employee records and payroll
        figures. We set up your own copy of the app with your branding and run it for you as an online service
        (“the service”). The features in each plan are listed on our <a href="/#pricing">pricing section</a>.
      </p>

      <h2>2. Your account and your users</h2>
      <ul>
        <li>You decide who in your company gets access, and you are responsible for what your admins and employees do in the app.</li>
        <li>Keep passwords private. Tell us at once if you think an account has been misused.</li>
        <li>You are responsible for the information you put in the app, and for telling your employees that their attendance data (including check-in selfies, if you switch them on) is recorded and why.</li>
      </ul>

      <h2>3. Fees and payment</h2>
      <ul>
        <li>Each plan has a <b>one-time set-up fee</b> and a <b>monthly fee</b> (or a yearly fee, if you choose yearly billing). Current prices are on our pricing section. All prices are in Indian rupees; GST is added where it applies.</li>
        <li>The set-up fee is paid before we start setting up your copy. Monthly and yearly fees are paid in advance, at the start of each billing period.</li>
        <li>Payments are collected securely by our payment partner. If you choose automatic payments, you authorise them to charge your chosen payment method on each renewal date. We never see or store your full card or bank details.</li>
        <li>If a payment fails, we’ll let you know and try again. If it is still unpaid <b>15 days</b> after the due date, we may pause access to the app until it is paid. Your data is not deleted while paused.</li>
        <li>We may change prices for future billing periods with at least <b>30 days’</b> notice by email.</li>
        <li>Charges from third-party services used by your copy of the app — such as hosting providers or WhatsApp message fees from Meta — are billed as described on our pricing section.</li>
      </ul>

      <h2>4. Set-up and delivery</h2>
      <p>
        After you pay the set-up fee, we hold a kick-off call to collect your details (shifts, leave rules, branding,
        first admins). Your copy is usually ready within <b>{LEGAL.setupDeliveryDays}</b> of that call; we send the
        login link and details by email. Using your own web address or WhatsApp number can take longer if those
        aren’t ready on your side. Nothing is shipped physically.
      </p>

      <h2>5. Your data</h2>
      <ul>
        <li>The data you and your employees put in the app belongs to you. We use it only to provide the service to you, as described in our <a href="/privacy">Privacy Policy</a>.</li>
        <li>You can ask for an export of your data at any time.</li>
        <li>When your subscription ends, we keep your data for <b>30 days</b> so you can ask for an export, and then delete it.</li>
      </ul>

      <h2>6. Acceptable use</h2>
      <p>
        Don’t use the service for anything unlawful, don’t try to access other customers’ data or break the
        security of the service, and don’t copy, resell or reverse-engineer the software.
      </p>

      <h2>7. Our software</h2>
      <p>
        The software remains ours. While your subscription is active, you get the right to use your copy for your
        own company. Your logo, name and content remain yours.
      </p>

      <h2>8. Availability and support</h2>
      <p>
        We work to keep the service running and to fix problems quickly, and we include updates and support as
        described in your plan. Like any online service it may occasionally be unavailable, for example during
        maintenance or an outage at a hosting provider. Unless your plan includes an agreed service level, we don’t
        promise uninterrupted availability.
      </p>

      <h2>9. Cancellation</h2>
      <p>
        You can cancel at any time; see our <a href="/refund-policy">Refund and Cancellation Policy</a>. We may end
        the service if these terms are seriously broken, after telling you and giving you a reasonable chance to
        fix the problem where possible.
      </p>

      <h2>10. Liability</h2>
      <p>
        The app helps you track attendance and work out payroll figures, but you remain responsible for checking
        them before paying salaries or making decisions. To the extent the law allows, we are not liable for
        indirect losses (such as lost profits), and our total liability for any claim is limited to the fees you
        paid us in the <b>three months</b> before the claim.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>We may update these terms. If a change matters to you, we’ll email you before it takes effect.</p>

      <h2>12. Law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will be handled by the courts of {LEGAL.city}.
      </p>

      <h2>13. Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> · {LEGAL.phone}. See also our <a href="/contact">Contact page</a>.</p>
    </>
  )
}

// ── Privacy Policy ──────────────────────────────────────────

function Privacy() {
  return (
    <>
      <p>
        This policy explains what personal data <Business /> collects, why, and what we do with it. It covers this
        website and the attendance app we run for our customers.
      </p>

      <h2>1. On this website</h2>
      <ul>
        <li><b>Contact and enquiry forms:</b> your name, email, phone number, company name, team size and message. We use them only to reply to you and to send you the walkthrough or quote you asked for.</li>
        <li><b>Payments:</b> handled by our payment partner. We receive confirmation of payment and the details on the invoice (name, email, phone, company, GSTIN if given), but never your full card or bank details.</li>
        <li><b>No tracking:</b> this website doesn’t use advertising or analytics cookies.</li>
        <li>The live demo contains only made-up sample data.</li>
      </ul>

      <h2>2. In the attendance app</h2>
      <p>
        When a company uses our app, it decides what is recorded about its employees and why. Under India’s
        Digital Personal Data Protection Act, 2023, that company is the <b>data fiduciary</b>, and we process the
        data on its behalf, only to provide the service. Depending on the features the company uses, this can
        include:
      </p>
      <ul>
        <li>name, work email, phone number, employee ID, job details and profile photo;</li>
        <li>check-in and check-out times, breaks, leave requests (including voice notes and medical documents for sick leave) and corrections;</li>
        <li>salary figures for payroll, if the company enters them;</li>
        <li>check-in selfies, if the company switches them on — these are deleted automatically after 15 days.</li>
      </ul>
      <p>Employees with questions about their data should first contact their employer, who controls it.</p>

      <h2>3. How we protect it</h2>
      <ul>
        <li>Each customer has its own separate database. Employees can see only their own records; only the company’s admins see everyone’s.</li>
        <li>Data is sent over encrypted connections (HTTPS) and stored with our hosting providers, Supabase (database and files) and Vercel (website).</li>
        <li>Only people who need it to run the service can access customer data.</li>
      </ul>

      <h2>4. Who we share it with</h2>
      <p>
        We don’t sell personal data or share it for advertising. We share it only with the service providers that
        help us run the service — hosting (Supabase, Vercel), payments (our payment partner), and WhatsApp
        messages (Meta) if a customer switches those on — or when the law requires it.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>Enquiries: for as long as needed to respond and follow up, and no longer than 2 years after our last contact.</li>
        <li>Customer data: for as long as the customer’s subscription is active, then 30 days for a final export before deletion.</li>
        <li>Invoices and payment records: for as long as tax law requires.</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>
        You can ask us for a copy of your personal data, to correct it, or to delete it, and you can withdraw
        consent you gave us. Contact our grievance officer, <V>{LEGAL.grievanceOfficer}</V>,
        at <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> or {LEGAL.grievancePhone}. We reply within 30 days.
      </p>

      <h2>7. Changes</h2>
      <p>We’ll update the date at the top when this policy changes, and email customers about important changes.</p>
    </>
  )
}

// ── Refund and Cancellation Policy ──────────────────────────

function Refund() {
  const paidPlans = PLANS.filter(p => p.setup !== 'Custom')
  return (
    <>
      <p>
        This policy applies to all payments made to <Business /> for the Sproutbien Attendance Tracker
        ({paidPlans.map(p => p.name).join(', ')} and custom plans).
      </p>

      <h2>1. One-time set-up fee</h2>
      <ul>
        <li><b>Full refund</b> if you cancel within <b>{LEGAL.setupRefundDays} days</b> of paying <i>and</i> before we have started setting up your copy (the kick-off call).</li>
        <li>Once set-up has started, the set-up fee is <b>not refundable</b>, because the work is done specifically for your company.</li>
      </ul>

      <h2>2. Monthly plans</h2>
      <ul>
        <li>You can cancel any time. Cancelling stops all future payments.</li>
        <li>Your app keeps working until the end of the month you’ve already paid for. We don’t refund partly used months.</li>
      </ul>

      <h2>3. Yearly plans</h2>
      <ul>
        <li>You can cancel any time; your app keeps working until the end of the paid year and it won’t renew.</li>
        <li>Unused months of a yearly plan aren’t refunded, except where required by law.</li>
      </ul>

      <h2>4. Charged by mistake?</h2>
      <p>
        If you were charged twice, charged after cancelling, or charged the wrong amount, tell us and we’ll refund
        the extra amount in full.
      </p>

      <h2>5. How to cancel or ask for a refund</h2>
      <p>
        Email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> from your registered email address, or message
        us on WhatsApp at {LEGAL.phone}, with your company name and payment details. If you pay automatically,
        you can also cancel the auto-payment from your UPI app or card statement, but please tell us too.
      </p>
      <p>
        Approved refunds go back to the original payment method within <b>{LEGAL.refundProcessingDays}</b>.
        Your bank may take a few more days to show it.
      </p>

      <h2>6. After cancellation</h2>
      <p>
        We keep your data for 30 days after your subscription ends so you can ask for an export, and then delete
        it permanently.
      </p>

      <h2>7. Delivery</h2>
      <p>
        This is an online service; nothing is shipped. Your app is usually ready within {LEGAL.setupDeliveryDays} of
        the kick-off call, and the login details are sent by email.
      </p>
    </>
  )
}

// ── Contact Us ──────────────────────────────────────────────

function Contact() {
  return (
    <>
      <p>We’re happy to help with questions about the app, a demo, a quote, billing or your data.</p>
      <div className="legal-contact">
        <div><MapPin size={20} /><span><b><V>{LEGAL.legalName}</V></b><br /><V>{LEGAL.address}</V>, India{LEGAL.gstin && <><br />GSTIN: {LEGAL.gstin}</>}</span></div>
        <div><Mail size={20} /><span><b>Email</b><br /><a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></span></div>
        <div><Phone size={20} /><span><b>Phone</b><br /><a href={`tel:+${CONTACT.whatsapp}`}>{LEGAL.phone}</a></span></div>
        <div><MessageCircle size={20} /><span><b>WhatsApp</b><br /><a href={WA_LINK} target="_blank" rel="noreferrer">{CONTACT.whatsappDisplay}</a></span></div>
        <div><Clock size={20} /><span><b>Hours</b><br />{LEGAL.hours}</span></div>
      </div>
      <p>We usually reply within one working day. For privacy requests, contact our grievance officer, <V>{LEGAL.grievanceOfficer}</V>, at the email above or {LEGAL.grievancePhone}.</p>
      <p><a className="btn btn-primary" href="/#contact">Send us a message</a></p>
    </>
  )
}
