import { ELLIPSIS_ICON } from 'assets'
import styled from '@emotion/styled'
import { darkJungleGreen, white } from 'styles/variables'

export const CardImageContainer = styled.div`
  position: relative;
  z-index: 1;

  grid-area: image;

  overflow: hidden;

  border-radius: 4px;
  height: 460px;
`

export const CardImageWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  transition: all 0.5s;

  cursor: pointer;
`

export const CardRatingWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;

  display: none;
`

export const CardDropDown = styled.div`
  position: absolute;
  z-index: 2;
  top: 12px;
  right: 12px;

  opacity: 0.95;
`

export const StyledEllipsis = styled(ELLIPSIS_ICON)`
  display: none;

  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 5px;

  background-color: ${darkJungleGreen};

  font-size: 20px;
  color: ${white};
`

export const CardDetailsContainer = styled.section`
  display: grid;
  grid-template-columns: 250px 65px;
  grid-template-rows: 25px 15px 20px;
  gap: 5px 10px;
  grid-template-areas:
    'title year'
    'tagline year'
    'genres genres';
  grid-area: content;
`

export const CardTitle = styled.h4`
  grid-area: title;
  opacity: 0.7;
  white-space: nowrap;

  overflow: hidden;

  transition: all 0.5s;

  margin: 0;

  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  text-overflow: ellipsis;
`

export const CardTagline = styled.p`
  grid-area: tagline;
  opacity: 0.5;
  white-space: nowrap;

  overflow: hidden;

  transition: all 0.5s;

  margin: 0;

  font-size: 12px;
  font-weight: 300;
  font-style: italic;
  text-overflow: ellipsis;
`

export const CardYearWrapper = styled.div`
  grid-area: year;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  transition: all 0.5s;

  border: 1px solid ${white + '80'};
  border-radius: 4px;
  width: 65px;
  height: 30px;

  font-size: 14px;
`

export const CardGenre = styled.p`
  grid-area: genres;
  display: inline;
  opacity: 0.5;
  white-space: nowrap;

  transition: all 0.5s;

  overflow: hidden;

  margin: 0;

  text-overflow: ellipsis;
  font-size: 14px;
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-areas:
    'image'
    'content';

  width: 325px;
  height: 540px;

  background-color: ${darkJungleGreen};

  font-weight: 500;
  font-style: normal;
  color: ${white};

  &:hover ${CardImageWrapper} {
    opacity: 0.6;
    transform: scale(1.15);
  }
  &:hover ${CardRatingWrapper} {
    display: inline-block;
  }
  &:hover ${StyledEllipsis} {
    display: inline-block;
  }
  &:hover ${CardTitle} {
    opacity: 1;
  }
  &:hover ${CardTagline} {
    opacity: 1;
  }
  &:hover ${CardYearWrapper} {
    opacity: 1;
  }
  &:hover ${CardGenre} {
    opacity: 1;
  }
`
