import { ResultCountContainer, Count, Found } from './ResultCount.styles'
import { ResultCountProps } from './ResultCount.types'
import { found } from './ResultCount.utils'

export const ResultCount = ({ foundShows }: ResultCountProps) => {
  return (
    <ResultCountContainer>
      <Count>{foundShows}</Count>
      <Found>{found(foundShows)}</Found>
    </ResultCountContainer>
  )
}
