import { LogoMark } from 'common/LogoMark'
import { useEffect, useRef, useState } from 'react'
import { EXIT_MS, LoadingBar, LoadingBarFill, LoadingMark, LoadingOverlay, LoadingPercent, LoadingProgress } from './Loading.styles'
import { LoadingProps } from './Loading.types'

/** The counter takes this long to reach 100 %, so the intro is never just a flash. */
const COUNT_MS = 2200
/** Pause at 100 % before the exit starts. */
const HOLD_MS = 250

/** Eases in and out, but keeps an even pace in the middle (50 % at half time). */
const easeInOut = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

/**
 * The intro screen: the Rikaflix R draws itself while a counter runs to 100 %,
 * then the screen zooms into the R and fades out. It waits at 99 % until
 * `isReady` is true, so it never claims to be done before the data is.
 */
export const Loading = ({ isReady = true, onFinished }: LoadingProps) => {
  const [progress, setProgress] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)

  // Read inside the animation loop and the timers, which must not restart when these change.
  const isReadyRef = useRef(isReady)
  const onFinishedRef = useRef(onFinished)
  useEffect(() => {
    isReadyRef.current = isReady
    onFinishedRef.current = onFinished
  }, [isReady, onFinished])

  useEffect(() => {
    // The clock starts at the first frame, i.e. when the page is actually visible: in a background
    // tab neither frames nor the R's CSS animation run, so the two stay in step.
    let start: number | undefined
    let frame = 0
    const tick = () => {
      // performance.now() rather than the rAF timestamp: one clock for start and now (also in tests).
      const now = performance.now()
      start ??= now
      const elapsed = Math.min(1, (now - start) / COUNT_MS)
      const counted = Math.round(easeInOut(elapsed) * 100)
      const value = isReadyRef.current ? counted : Math.min(counted, 99)
      setProgress(value)
      if (value < 100) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const isDone = progress === 100
  useEffect(() => {
    if (!isDone) return
    const leave = setTimeout(() => setIsLeaving(true), HOLD_MS)
    const finish = setTimeout(() => onFinishedRef.current?.(), HOLD_MS + EXIT_MS)
    return () => {
      clearTimeout(leave)
      clearTimeout(finish)
    }
  }, [isDone])

  return (
    <LoadingOverlay role="progressbar" aria-label="Loading Rikaflix" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} isLeaving={isLeaving}>
      <LoadingMark isLeaving={isLeaving}>
        <LogoMark animated width={110} />
      </LoadingMark>
      <LoadingProgress>
        <LoadingBar>
          <LoadingBarFill style={{ width: `${progress}%` }} />
        </LoadingBar>
        <LoadingPercent>{progress} %</LoadingPercent>
      </LoadingProgress>
    </LoadingOverlay>
  )
}
