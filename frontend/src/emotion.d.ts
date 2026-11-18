import '@emotion/react'

import { ThemeObject } from './types'

// Makes `props.theme` in styled components typed with our theme object.
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeObject {}
}
