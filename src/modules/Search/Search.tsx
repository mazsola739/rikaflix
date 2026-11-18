import { Input, Button } from 'common'
import { Constants, ButtonText } from 'constant'
import { useShowContext } from 'helper'
import { useState } from 'react'
import { SearchBarContainer } from './Search.styles'

export const Search = () => {
  const [searchInput, setSearchInput] = useState('')

  const { setShowsProps } = useShowContext()

  const searchShows = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowsProps(prev => ({ ...prev, title: searchInput, page: '1' }))
  }

  return (
    <SearchBarContainer role="form">
      <Input name={Constants.SEARCH} placeholder={Constants.SEARCH_PLACEHOLDER} value={searchInput} onChange={event => setSearchInput(event.target.value)} />
      <Button onClick={searchShows} size="large">
        {ButtonText.SEARCH}
      </Button>
    </SearchBarContainer>
  )
}
