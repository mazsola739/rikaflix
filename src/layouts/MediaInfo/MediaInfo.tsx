import { Poster, RatingRing } from 'common'
import { Navigation } from 'layouts'
import { useParams, Navigate } from 'react-router-dom'
import { useGetShowByIdQuery } from 'store'
import { getGenreFormat, getRuntimeFormat, imageUrl } from 'utils'
import {
  InfoBackground,
  InfoContainer,
  InfoWrapper,
  InfoImage,
  InfoMovieContainer,
  InfoTitleHolder,
  InfoTitle,
  InfoTaglineHolder,
  InfoTagline,
  InfoGenre,
  InfoContent,
  InfoRating,
  InfoReleaseDate,
  InfoRuntime,
  InfoOverview
} from './MediaInfo.styles'

export const MediaInfo = () => {
  const { id = '' } = useParams()

  const { data: media, isLoading } = useGetShowByIdQuery(id)

  // The data is local, so this lasts a few milliseconds: show nothing rather than flash a loader.
  if (isLoading) return null

  if (!media) return <Navigate replace to={'/home'} />

  const { title, tagline, vote_average, release_date, poster_path, backdrop_path, overview, genres, runtime } = media

  return (
    // Most shows have no backdrop image: their poster fills the background instead.
    <InfoBackground backdrop={imageUrl(backdrop_path || poster_path)}>
      <InfoContainer>
        <Navigation type="info" />
        <InfoWrapper>
          <InfoImage>
            <Poster data={poster_path} title={title} />
          </InfoImage>
          <InfoMovieContainer>
            <InfoTitleHolder>
              <InfoTitle>{title}</InfoTitle>
            </InfoTitleHolder>
            <InfoTaglineHolder>
              <InfoTagline>{tagline}</InfoTagline>
            </InfoTaglineHolder>
            <InfoGenre>{getGenreFormat(genres)}</InfoGenre>
            <InfoContent>
              <InfoRating>
                <RatingRing vote_average={vote_average} />
              </InfoRating>
              <InfoReleaseDate>{release_date}</InfoReleaseDate>
              <InfoRuntime>{getRuntimeFormat(runtime)}</InfoRuntime>
            </InfoContent>
            <InfoOverview>{overview}</InfoOverview>
          </InfoMovieContainer>
        </InfoWrapper>
      </InfoContainer>
    </InfoBackground>
  )
}
