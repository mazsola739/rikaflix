import { useShowContext } from 'helper'
import { Fragment } from 'react'
import { imageUrl } from 'utils'
import { netflixArray, getRandomPoster, getAllPosters } from './Row.utils'

export const Row = () => {
  const { allShowOfType } = useShowContext()

  return (
    <>
      {netflixArray.map((logo: string) => (
        <Fragment key={logo}>
          <img src={logo} alt="img" width="132" height="200" />
          {getRandomPoster(getAllPosters(allShowOfType), 8).map((poster, index) => (
            <img key={index} src={imageUrl(poster)} alt="img" width="132" height="200" />
          ))}
        </Fragment>
      ))}
    </>
  )
}
