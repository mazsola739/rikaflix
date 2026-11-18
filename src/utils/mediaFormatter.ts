import { Show, InitialValueProps } from 'types'
import { capitalize } from './capitalizer'
import { convertDateToString, convertStringToDate } from './dateFormatter'
import { convertMinToString, convertStringToMin } from './runtimeFormatter'

/** Converts a show from the API shape into the field names the media form uses. */
export const getFrontEndForm = (media: Show): InitialValueProps => {
  const { genres, id, poster_path, backdrop_path, release_date, runtime, type, vote_average, ...untouched } = media
  const convertedObject = {
    ...untouched,
    genre: genres.map(genre => capitalize(genre)),
    // Keep the real id: Edit sends it back to PUT shows/:id.
    id,
    posterUrl: poster_path,
    backgroundUrl: backdrop_path,
    typeOfShow: type,
    rating: vote_average === 0 ? ('' as const) : vote_average,
    releaseDate: convertDateToString(release_date),
    runtime: convertMinToString(runtime.toString())
  }
  return convertedObject
}

/** Converts the media form values back into the API shape. */
export const getBackEndForm = (media: InitialValueProps): Show => {
  const { genre, posterUrl, backgroundUrl, typeOfShow, rating, releaseDate, runtime, ...untouched } = media
  return {
    ...untouched,
    genres: genre,
    poster_path: posterUrl,
    backdrop_path: backgroundUrl,
    release_date: convertStringToDate(releaseDate),
    runtime: +convertStringToMin(runtime),
    type: typeOfShow,
    // Form inputs hold strings; the API expects a number.
    vote_average: Number(rating)
  }
}

export const removeId = (media: Show) => {
  const { id, ...mediaWithoutId } = media
  return mediaWithoutId
}
