import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from 'lucide-react'
import type { Shot } from '../config'

// Clicking any screenshot opens it in the lightbox (mounted once in App)
const OPEN_EVENT = 'open-shot'
const openShot = (shot: Shot) => window.dispatchEvent(new CustomEvent<Shot>(OPEN_EVENT, { detail: shot }))

/** A screenshot in a browser frame; a missing file shows a placeholder instead of a broken image. */
export function BrowserShot({ shot, eager }: { shot: Shot; eager?: boolean }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
      </div>
      {missing ? (
        <Placeholder title={shot.title} />
      ) : (
        <button type="button" className="shot-open" onClick={() => openShot(shot)} aria-label={`Enlarge: ${shot.title}`}>
          <img
            src={`/screens/${shot.file}`}
            alt={`${shot.title} — ${shot.caption}`}
            loading={eager ? 'eager' : 'lazy'}
            onError={() => setMissing(true)}
          />
          <span className="shot-zoom" aria-hidden="true"><Maximize2 size={16} /> Click to enlarge</span>
        </button>
      )}
    </figure>
  )
}

export function PhoneShot({ shot }: { shot: Shot }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className="phone">
      <div className="phone-screen">
        {missing ? (
          <Placeholder title={shot.title} />
        ) : (
          <button type="button" className="shot-open" onClick={() => openShot(shot)} aria-label={`Enlarge: ${shot.title} on a phone`}>
            <img src={`/screens/${shot.file}`} alt={`${shot.title} on a phone`} loading="lazy" onError={() => setMissing(true)} />
          </button>
        )}
      </div>
      <figcaption>
        <strong>{shot.title}</strong>
        <span>{shot.caption}</span>
      </figcaption>
    </figure>
  )
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="shot-placeholder">
      <ImageIcon size={28} strokeWidth={1.5} />
      <span>{title}</span>
    </div>
  )
}

/** Full-size viewer with previous / next across all screenshots. Esc or a click outside closes it. */
export function Lightbox({ shots }: { shots: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const onOpen = (e: Event) => {
      const file = (e as CustomEvent<Shot>).detail.file
      const i = shots.findIndex(s => s.file === file)
      setIndex(i >= 0 ? i : null)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [shots])

  const open = index !== null
  useEffect(() => setZoomed(false), [index])
  const step = (d: number) => setIndex(i => (i === null ? i : (i + d + shots.length) % shots.length))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [open])  // eslint-disable-line react-hooks/exhaustive-deps

  if (index === null) return null
  const shot = shots[index]
  const isPhone = shot.file.startsWith('phone-')

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.title} onClick={() => setIndex(null)}>
      <div className="lightbox-top" onClick={e => e.stopPropagation()}>
        <div className="lightbox-title">
          <strong>{shot.title}</strong>
          <span>{shot.caption}</span>
        </div>
        <span className="lightbox-count">{index + 1} / {shots.length}</span>
        <button type="button" className="lightbox-btn" onClick={() => setIndex(null)} aria-label="Close"><X size={22} /></button>
      </div>
      <div className={`lightbox-stage${zoomed ? ' is-zoomed' : ''}`}>
        <img
          key={shot.file}
          className={isPhone ? 'lightbox-img lightbox-img--phone' : 'lightbox-img lightbox-img--desk'}
          src={`/screens/${shot.file}`}
          alt={`${shot.title} — ${shot.caption}`}
          onClick={e => { e.stopPropagation(); if (!isPhone) setZoomed(z => !z) }}
        />
      </div>
      {!isPhone && <p className="lightbox-hint">{zoomed ? 'Tap the image to fit the screen' : 'Tap the image to zoom in'}</p>}
      <button type="button" className="lightbox-btn lightbox-prev" onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous screenshot"><ChevronLeft size={26} /></button>
      <button type="button" className="lightbox-btn lightbox-next" onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next screenshot"><ChevronRight size={26} /></button>
    </div>
  )
}
