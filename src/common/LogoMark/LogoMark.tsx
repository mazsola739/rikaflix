import { useId } from 'react'
import { LogoMarkSvg } from './LogoMark.styles'
import { LogoMarkColor, LogoMarkProps } from './LogoMark.types'

/** Ribbon shades: the front ribbon, the back ribbon, and the shadow where they fold. */
const PALETTE: Record<LogoMarkColor, { front: string; back: string; shadow: string }> = {
  red: { front: '#E50914', back: '#B1060F', shadow: '#5C0007' },
  white: { front: '#FFFFFF', back: '#D9D9D9', shadow: '#8C8C8C' }
}

/**
 * The Rikaflix "R": a back ribbon (the stem) with a front ribbon folded over it
 * (the bowl), ending in a leg. Drawn on a 120 × 200 grid.
 */
export const LogoMark = ({ color = 'red', animated = false, width = 120 }: LogoMarkProps) => {
  // Gradient ids must be unique per instance (the header shows many logos) and valid in url(#…).
  const id = `logo-mark-${useId().replace(/[^\w-]/g, '')}`
  const { front, back, shadow } = PALETTE[color]

  return (
    <LogoMarkSvg animated={animated} viewBox="0 0 120 200" width={width} height={(width * 5) / 3} role="img" aria-label="Rikaflix">
      <defs>
        {/* The stem darkens towards the fold under the front ribbon. */}
        <linearGradient id={`${id}-stem`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={back} />
          <stop offset="0.6" stopColor={back} />
          <stop offset="1" stopColor={shadow} />
        </linearGradient>
        {/* The leg comes out of the bowl's shadow. */}
        <linearGradient id={`${id}-leg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shadow} />
          <stop offset="0.2" stopColor={shadow} />
          <stop offset="0.45" stopColor={front} />
        </linearGradient>
      </defs>
      <rect className="stem" x="8" y="8" width="36" height="184" fill={`url(#${id}-stem)`} />
      <polygon className="leg" points="50,98 86,98 116,192 80,192" fill={`url(#${id}-leg)`} />
      <path className="bowl" d="M8,26 H64 A36,36 0 0 1 64,98 H44" fill="none" stroke={front} strokeWidth="36" pathLength={1} />
    </LogoMarkSvg>
  )
}
