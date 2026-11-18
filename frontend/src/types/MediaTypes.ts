export interface Show {
  type: string
  id: string
  title: string
  tagline: string
  vote_average: number
  release_date: string
  poster_path: string
  backdrop_path: string
  overview: string
  genres: string[]
  runtime: number
}

//todo
export interface InitialValueProps {
  typeOfShow: string
  id: string
  title: string
  releaseDate: string
  tagline: string
  rating: '' | number
  genre: string[]
  runtime: string
  posterUrl: string
  backgroundUrl: string
  overview: string
}
