export type LogoMarkColor = 'red' | 'white'

export interface LogoMarkProps {
  /** Red (default) or white (for red backgrounds). */
  color?: LogoMarkColor
  /** Draws the outline of the R, then fills it in (used by the loading screen). */
  animated?: boolean
  /** Rendered width in pixels; the height follows the shape of the letter (about the same). */
  width?: number
}

export interface LogoMarkStyleProps {
  animated: boolean
}
