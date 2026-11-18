export type LogoMarkColor = 'red' | 'white'

export interface LogoMarkProps {
  /** Ribbon colours: red (default) or white (for red backgrounds). */
  color?: LogoMarkColor
  /** Draws the R ribbon by ribbon: stem, then bowl, then leg (used by the loading screen). */
  animated?: boolean
  /** Rendered width in pixels; the height follows the 3:5 shape. */
  width?: number
}

export interface LogoMarkStyleProps {
  animated: boolean
}
