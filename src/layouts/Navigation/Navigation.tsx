import { Button, Logo } from 'common'
import { ButtonText } from 'constant'
import { useShowContext } from 'helper'
import { Link } from 'react-router-dom'
import { GetShowsProps } from 'types'
import { NavigationContainer, StyledMovie, StyledSeries, StyledRandom, StyledLens, StyledPlus } from './Navigation.styles'
import { NavigationProps } from './Navigation.types'

export const Navigation = ({ type, openModal }: NavigationProps) => {
  const { allShowOfType, setShowsProps } = useShowContext()
  // "Random" opens the detail page of a random show of the currently selected type.
  const randomShow = allShowOfType[Math.floor(Math.random() * allShowOfType.length)]

  const showOnly = (mediaType: GetShowsProps['type']) => () =>
    setShowsProps(prev => ({
      ...prev,
      type: mediaType,
      genres: ['All'],
      page: '1'
    }))

  return (
    <NavigationContainer>
      <Link to={`/home`}>
        <Button
          color="blurred"
          font="bold"
          size="medium"
          onClick={() =>
            setShowsProps(prev => ({
              ...prev,
              type: 'All',
              genres: ['All'],
              page: '1'
            }))
          }
        >
          <Logo />
        </Button>
      </Link>
      <Link to={`/home`}>
        <Button color="blurred" font="bold" size="medium" onClick={showOnly('Movie')}>
          <StyledMovie /> {ButtonText.MOVIES}
        </Button>
      </Link>
      <Link to={`/home`}>
        <Button color="blurred" font="bold" size="medium" onClick={showOnly('TV show')}>
          <StyledSeries /> {ButtonText.SERIES}
        </Button>
      </Link>
      <Link to={randomShow ? `/shows/${randomShow.id}` : `/home`}>
        <Button color="blurred" font="bold" size="medium">
          <StyledRandom /> {ButtonText.RANDOM}
        </Button>
      </Link>
      {type === 'info' ? (
        <Link to={`/home`}>
          <Button color="blurred" font="bold" size="medium">
            <StyledLens /> {ButtonText.SEARCH}
          </Button>
        </Link>
      ) : (
        <Button onClick={openModal && openModal('add')} color="blurred" font="bold" size="medium">
          <StyledPlus /> {ButtonText.ADD_NEW}
        </Button>
      )}
    </NavigationContainer>
  )
}
