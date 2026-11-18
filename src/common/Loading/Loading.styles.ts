import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { darkJungleGreen, white } from 'styles/variables'
import { LoadingStyleProps } from './Loading.types'

/** How long the exit (zoom into the R + fade) takes; Loading.tsx waits for it before finishing. */
export const EXIT_MS = 600

/** A soft red glow that breathes once the R is drawn. */
const glow = keyframes`
  from { filter: drop-shadow(0 0 0 rgba(229, 9, 20, 0)); }
  to { filter: drop-shadow(0 0 24px rgba(229, 9, 20, 0.55)); }
`

/** The screen covers the app until it has faded out, so the page appears from behind it. */
export const LoadingOverlay = styled.div<LoadingStyleProps>`
  position: fixed;
  z-index: 1000;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  background-color: ${darkJungleGreen};

  opacity: ${({ isLeaving }) => (isLeaving ? 0 : 1)};
  transition: opacity ${EXIT_MS}ms ease-in;
`

export const LoadingMark = styled.div<LoadingStyleProps>`
  animation: ${glow} 1.2s 1.3s ease-in-out infinite alternate;

  transform: scale(${({ isLeaving }) => (isLeaving ? 8 : 1)});
  transition: transform ${EXIT_MS}ms cubic-bezier(0.7, 0, 0.84, 0);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`

export const LoadingProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 220px;
`

export const LoadingBar = styled.div`
  overflow: hidden;

  border-radius: 2px;
  width: 100%;
  height: 4px;

  background-color: rgba(255, 255, 255, 0.12);
`

/** Its width is set inline on every frame, so Emotion doesn't generate a class per percent. */
export const LoadingBarFill = styled.div`
  height: 100%;

  background-color: #e50914;
`

export const LoadingPercent = styled.p`
  margin: 0;

  opacity: 0.8;

  font-size: 16px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${white};
`
