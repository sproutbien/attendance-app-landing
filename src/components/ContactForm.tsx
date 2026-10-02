import { useState } from 'react'
import { ArrowRight, CheckCircle2, MessageCircle, Send } from 'lucide-react'
import { CONTACT, PLANS } from '../config'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const TEAM_SIZES = ['1–10', '11–25', '26–50', '51–100', '100+']
const WA_LINK = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`

type State = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Saves into the demo Supabase project's contact_messages table (insert-only for visitors).
 * "hero" is the short form at the top of the page; "full" is the contact section's form.
 */
export default function ContactForm({ variant = 'full', plan = '', onPlanChange }: {
  variant?: 'hero' | 'full'
  plan?: string
  onPlanChange?: (p: string) => void
}) {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')
  const hero = variant === 'hero'

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) { setState('sent'); return }   // bots fill the hidden field

    const message = String(f.get('message') ?? '').trim()
    const body = {
      name:      String(f.get('name') ?? '').trim(),
      email:     String(f.get('email') ?? '').trim(),
      phone:     String(f.get('phone') ?? '').trim() || null,
      company:   String(f.get('company') ?? '').trim() || null,
      team_size: String(f.get('team_size') ?? '') || null,
      plan:      plan || null,
      message:   message || 'Asked for a walkthrough and quote (form at the top of the page).',
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setState('error')
      setError(`The form isn't connected yet. Please email ${CONTACT.email} instead.`)
      return
    }

    setState('sending')
    setError('')
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(await res.text())
      setState('sent')
    } catch {
      setState('error')
      setError(`Sorry, that didn't go through. Please try again, or email ${CONTACT.email}.`)
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-done">
        <CheckCircle2 size={40} strokeWidth={1.75} />
        <h3>Thanks — we've got your details</h3>
        <p>We'll get in touch to set up your walkthrough. Want to talk now?</p>
        <a className="btn btn-wa" href={WA_LINK} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
      </div>
    )
  }

  return (
    <form className={`contact-form ${hero ? 'contact-form--hero' : ''}`} onSubmit={submit}>
      <div className="form-grid">
        <label>
          <span>Your name *</span>
          <input name="name" required maxLength={100} autoComplete="name" placeholder={hero ? 'e.g. Priya Menon' : undefined} />
        </label>
        <label>
          <span>Phone / WhatsApp {hero && '*'}</span>
          <input name="phone" type="tel" required={hero} maxLength={30} autoComplete="tel" placeholder={hero ? '+91 98xxx xxxxx' : undefined} />
        </label>
        <label className={hero ? 'form-wide' : undefined}>
          <span>Work email *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder={hero ? 'you@company.com' : undefined} />
        </label>
        <label>
          <span>Company</span>
          <input name="company" maxLength={150} autoComplete="organization" />
        </label>
        <label>
          <span>Team size</span>
          <select name="team_size" defaultValue="">
            <option value="">Choose…</option>
            {TEAM_SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
          </select>
        </label>
        {!hero && (
          <>
            <label>
              <span>Plan</span>
              <select value={plan} onChange={e => onPlanChange?.(e.target.value)}>
                <option value="">Not sure yet</option>
                {PLANS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </label>
            <label className="form-wide">
              <span>Message *</span>
              <textarea name="message" required maxLength={3000} rows={4}
                placeholder="Tell us about your team, shifts and leave policy — and anything you'd like changed." />
            </label>
          </>
        )}
        <label className="form-hp" aria-hidden="true">
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state === 'error' && <p className="form-error" role="alert">{error}</p>}
      <button className={`btn btn-primary ${hero ? 'btn-lg' : ''}`} type="submit" disabled={state === 'sending'}>
        {hero
          ? <>{state === 'sending' ? 'Sending…' : 'Get my free walkthrough'} <ArrowRight size={20} /></>
          : <><Send size={18} /> {state === 'sending' ? 'Sending…' : 'Send message'}</>}
      </button>
      {hero && (
        <p className="form-note">
          Free 1:1 walkthrough and a written quote · No spam · Or{' '}
          <a href={WA_LINK} target="_blank" rel="noreferrer">chat on WhatsApp</a>
        </p>
      )}
    </form>
  )
}
