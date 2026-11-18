import { LogoMark } from 'common/LogoMark'
import { useShowContext } from 'helper'
import { Fragment } from 'react'
import { imageUrl } from 'utils'
import { LogoTile } from './Row.styles'
import { LOGO_TILES, getRandomPoster, getAllPosters } from './Row.utils'

export const Row = () => {
  const { allShowOfType } = useShowContext()

  return (
    <>
      {LOGO_TILES.map(variant => (
        <Fragment key={variant}>
          <LogoTile variant={variant}>
            <LogoMark color={variant === 'red' ? 'white' : 'red'} width={88} />
          </LogoTile>
          {getRandomPoster(getAllPosters(allShowOfType), 8).map((poster, index) => (
            <img key={index} src={imageUrl(poster)} alt="" width="132" height="200" />
          ))}
        </Fragment>
      ))}
    </>
  )
}
