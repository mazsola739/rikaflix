export interface LoadingProps {
  /** False while the data is still loading: the counter then waits at 99 %. Defaults to true. */
  isReady?: boolean
  /** Called once the screen has faded out, so the parent can unmount it. */
  onFinished?: () => void
}

export interface LoadingStyleProps {
  isLeaving: boolean
}
