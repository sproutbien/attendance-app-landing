import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import type { Shot } from '../config'

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
        <img
          src={`/screens/${shot.file}`}
          alt={`${shot.title} — ${shot.caption}`}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setMissing(true)}
        />
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
          <img src={`/screens/${shot.file}`} alt={`${shot.title} on a phone`} loading="lazy" onError={() => setMissing(true)} />
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
