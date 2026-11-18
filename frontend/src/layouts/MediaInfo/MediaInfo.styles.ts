import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { MediaInfoStyleProps } from './MediaInfo.types'
import { darkJungleGreen, watermelon, white } from 'styles/variables'

const zoom = keyframes`
 0% {
    background-size: 100%;
  }
  100%  {
    background-size: 200%;
  }
`

export const InfoBackground = styled.div<MediaInfoStyleProps>`
  animation: ${zoom} 60s alternate infinite;

  background-image: url('${({ backdrop }) => backdrop}');
  background-repeat: no-repeat;
  background-position: center;
`

export const InfoContainer = styled.div`
  background-image: ${`linear-gradient(
    90deg,
    ${darkJungleGreen} 0%,
    ${darkJungleGreen + 'D9'} 7%,
    ${darkJungleGreen + 'D9'} 93%,
    ${darkJungleGreen} 100%
  )`};
`

export const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 325px 700px;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-content: space-between;
  grid-template-areas: 'image media';

  padding: 0 60px 10px;

  color: ${white};
`

export const InfoImage = styled.div`
  grid-area: image;

  overflow: hidden;

  border-radius: 4px;
  width: 325px;
  height: 460px;
`

export const InfoMovieContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 25px 20px 60px 285px;
  gap: 5px 0;
  grid-auto-flow: row;
  grid-template-areas:
    'title'
    'tagline'
    'genres'
    'details'
    'info';
  grid-area: media;
`

export const InfoTitle = styled.h2`
  position: relative;
  left: 0%;

  grid-area: title;
  white-space: nowrap;

  overflow: hidden;

  transition:
    left 20s,
    width 10s;

  margin: 0;
  width: 100%;

  font-size: 40px;
  font-weight: 300;
  font-style: normal;
  text-overflow: ellipsis;
`

export const InfoTitleHolder = styled.div`
  overflow: hidden;

  box-sizing: border-box;

  &:hover ${InfoTitle} {
    left: -100%;

    width: 200%;
  }
`

export const InfoTagline = styled.h5`
  position: relative;
  left: 0%;

  grid-area: title;
  white-space: nowrap;
  opacity: 0.7;

  overflow: hidden;

  transition:
    left 20s,
    width 10s;

  margin: 0;
  width: 100%;

  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  text-overflow: ellipsis;
`

export const InfoTaglineHolder = styled.div`
  overflow: hidden;

  box-sizing: border-box;

  &:hover ${InfoTagline} {
    left: -100%;

    width: 200%;
  }
`

export const InfoGenre = styled.p`
  grid-area: genres;
  opacity: 0.5;

  margin: 0;
  font-size: 14px;
`

export const InfoContent = styled.div`
  display: grid;
  grid-template-columns: 60px 150px 150px;
  grid-template-rows: 1fr;
  grid-auto-flow: row;
  justify-content: space-between;
  grid-template-areas: 'rating year runtime';
  grid-area: details;
`

export const InfoRating = styled.div`
  grid-area: rating;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
`

export const InfoReleaseDate = styled.time`
  grid-area: year;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  font-size: 24px;
  font-weight: 300;
  color: ${watermelon};
`

export const InfoRuntime = styled.time`
  grid-area: runtime;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  font-size: 24px;
  font-weight: 300;
  color: ${watermelon};
`

export const InfoOverview = styled.article`
  grid-area: info;
  opacity: 0.5;

  overflow-y: scroll;

  max-width: 700px;
  max-height: 285px;
  padding-right: 5px;

  font-size: 20px;
  line-height: 1.4;
  font-weight: 300;
  text-align: justify;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 20px;

    background-color: ${watermelon};
  }
`
