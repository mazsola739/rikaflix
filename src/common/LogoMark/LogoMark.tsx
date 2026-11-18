import { LogoMarkSvg } from './LogoMark.styles'
import { LogoMarkColor, LogoMarkProps } from './LogoMark.types'

const COLORS: Record<LogoMarkColor, string> = {
  red: '#E50914',
  white: '#FFFFFF'
}

/**
 * The capital R of Montserrat Black, the font of the "rikaflix" text, as outlines (font units, baseline at y = 0),
 * so it looks the same everywhere, even before the font has loaded. public/favicon.svg uses the same path.
 */
const OUTLINE = 'M57 0 L57 -700 L384 -700 Q545 -700 629 -629 Q713 -558 713 -436 Q713 -355 674 -297 Q640 -245 581 -215 L728 0 L476 0 L357 -176 L293 -176 L293 0 L57 0 Z'
const COUNTER = 'M293 -354 L379 -354 Q428 -354 451.5 -376 Q475 -398 475 -436 Q475 -474 451.5 -496 Q428 -518 379 -518 L293 -518 L293 -354 Z'

/** The letter's box in font units: x, y, width, height. */
const VIEW_BOX = { x: 57, y: -700, width: 671, height: 700 }

/** The Rikaflix "R". */
export const LogoMark = ({ color = 'red', animated = false, width = 120 }: LogoMarkProps) => {
  const fill = COLORS[color]
  const { x, y, width: boxWidth, height: boxHeight } = VIEW_BOX

  return (
    <LogoMarkSvg animated={animated} viewBox={`${x} ${y} ${boxWidth} ${boxHeight}`} width={width} height={Math.round((width * boxHeight) / boxWidth)} role="img" aria-label="Rikaflix">
      <path className="letter" d={`${OUTLINE} ${COUNTER}`} fill={fill} fillRule="evenodd" />
      {/* On the intro screen the outline is drawn first, then the letter fills in. */}
      {animated && [OUTLINE, COUNTER].map(outline => <path key={outline} className="outline" d={outline} fill="none" stroke={fill} strokeWidth={12} strokeLinejoin="round" pathLength={1} />)}
    </LogoMarkSvg>
  )
}
