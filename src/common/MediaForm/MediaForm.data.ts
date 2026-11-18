import { Genres } from 'constant'
import { capitalize, LOCAL_IMAGE_PATTERN } from 'utils'
import * as Yup from 'yup'

export const MovieSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  typeOfShow: Yup.string().required('Must select 1 show type'),
  tagline: Yup.string().trim().required('Required'),
  releaseDate: Yup.date().required('Required'),
  genre: Yup.array().ensure().min(1, 'At least 1 genre must be selected'),
  runtime: Yup.string().trim().required('Required'),
  posterUrl: Yup.string()
    .trim()
    .required('Required')
    .test('url-or-local-image', 'Must be a valid Url', (value = '') => LOCAL_IMAGE_PATTERN.test(value) || Yup.string().url().isValidSync(value)),
  rating: Yup.number().required('Required').min(0.1, 'Must be at least 0.1').max(10, 'Must be at most 10'),
  overview: Yup.string()
})

export const types = ['Movie', 'TV show']

export const allGenres = [
  { name: Genres.ACTION, labelName: capitalize(Genres.ACTION) },
  { name: Genres.ADVENTURE, labelName: capitalize(Genres.ADVENTURE) },
  { name: Genres.ANIMATION, labelName: capitalize(Genres.ANIMATION) },
  { name: Genres.COMEDY, labelName: capitalize(Genres.COMEDY) },
  { name: Genres.CRIME, labelName: capitalize(Genres.CRIME) },
  { name: Genres.DOCUMENTARY, labelName: capitalize(Genres.DOCUMENTARY) },
  { name: Genres.DRAMA, labelName: capitalize(Genres.DRAMA) },
  { name: Genres.FAMILY, labelName: capitalize(Genres.FAMILY) },
  { name: Genres.FANTASY, labelName: capitalize(Genres.FANTASY) },
  { name: Genres.HISTORY, labelName: capitalize(Genres.HISTORY) },
  { name: Genres.HORROR, labelName: capitalize(Genres.HORROR) },
  { name: Genres.MUSIC, labelName: capitalize(Genres.MUSIC) },
  { name: Genres.MUSICAL, labelName: capitalize(Genres.MUSICAL) },
  { name: Genres.MYSTERY, labelName: capitalize(Genres.MYSTERY) },
  { name: Genres.POLITICS, labelName: capitalize(Genres.POLITICS) },
  { name: Genres.ROMANCE, labelName: capitalize(Genres.ROMANCE) },
  { name: Genres.SCIFI, labelName: capitalize(Genres.SCIFI) },
  { name: Genres.THRILLER, labelName: capitalize(Genres.THRILLER) },
  { name: Genres.WAR, labelName: capitalize(Genres.WAR) },
  { name: Genres.WESTERN, labelName: capitalize(Genres.WESTERN) }
]
