import { Row } from 'common'
import { BackgroundWrapper, AnimatedRow } from './Background.styles'

export const Background = () => {
  return (
    // Decorative: the scrolling posters and logos carry no information.
    <BackgroundWrapper aria-hidden="true">
      <AnimatedRow position="top" time={60}>
        <Row />
      </AnimatedRow>
      <AnimatedRow direction="right" time={40}>
        <Row />
      </AnimatedRow>
      <AnimatedRow position="bottom" time={50}>
        <Row />
      </AnimatedRow>
    </BackgroundWrapper>
  )
}
