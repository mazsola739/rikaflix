import { Button, Logo } from 'common'
import { ButtonText } from 'constant'
import { useShowContext } from 'helper'
import { Link } from 'react-router-dom'
import { GetShowsProps } from 'types'
import { NavigationContainer, NavLabel, StyledMovie, StyledSeries, StyledRandom, StyledLens, StyledPlus } from './Navigation.styles'
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
          <StyledMovie /> <NavLabel>{ButtonText.MOVIES}</NavLabel>
        </Button>
      </Link>
      <Link to={`/home`}>
        <Button color="blurred" font="bold" size="medium" onClick={showOnly('TV show')}>
          <StyledSeries /> <NavLabel>{ButtonText.SERIES}</NavLabel>
        </Button>
      </Link>
      <Link to={randomShow ? `/shows/${randomShow.id}` : `/home`}>
        <Button color="blurred" font="bold" size="medium">
          <StyledRandom /> <NavLabel>{ButtonText.RANDOM}</NavLabel>
        </Button>
      </Link>
      {type === 'info' ? (
        <Link to={`/home`}>
          <Button color="blurred" font="bold" size="medium">
            <StyledLens /> <NavLabel>{ButtonText.SEARCH}</NavLabel>
          </Button>
        </Link>
      ) : (
        <Button onClick={openModal && openModal('add')} color="blurred" font="bold" size="medium">
          <StyledPlus /> <NavLabel>{ButtonText.ADD_NEW}</NavLabel>
        </Button>
      )}
    </NavigationContainer>
  )
}
