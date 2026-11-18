import { Constants } from 'constant'
import { useShowContext } from 'helper'
import { Switcher, Sort } from 'modules'
import { FilterContainer, FilterContents, FilterOptions, FilterItem, FilterOverflowMenu, FilterMore, FilterMoreOptions, FilterMoreOption, Underline } from './Filter.styles'
import { getAllGenres } from './Filter.utils'

export const Filter = () => {
  const { setShowsProps, filteredShows } = useShowContext()

  const genreTitles = getAllGenres(filteredShows)

  return (
    <FilterContainer>
      <FilterContents>
        <FilterOptions>
          <Switcher
            options={genreTitles}
            renderItem={option => (
              <FilterItem
                onClick={() =>
                  setShowsProps(prev => ({
                    ...prev,
                    genres: [option],
                    page: '1'
                  }))
                }
              >
                {option}
              </FilterItem>
            )}
            name="genre-options"
            defaultSelectedItem="All"
            slideVerticalPosition="-11.9px"
          />
          {genreTitles.length > 7 ? (
            <FilterOverflowMenu>
              <FilterMore>{Constants.MORE}</FilterMore>
              <FilterMoreOptions>
                {genreTitles.slice(7, genreTitles.length).map(genre => (
                  <FilterMoreOption
                    key={genre}
                    onClick={() =>
                      setShowsProps(prev => ({
                        ...prev,
                        genres: [genre],
                        page: '1'
                      }))
                    }
                  >
                    {genre}
                  </FilterMoreOption>
                ))}
              </FilterMoreOptions>
            </FilterOverflowMenu>
          ) : (
            <></>
          )}
        </FilterOptions>
        <Sort changeMovieSorting={sortBy => setShowsProps(prev => ({ ...prev, sortBy, page: '1' }))} />
      </FilterContents>
      <Underline />
    </FilterContainer>
  )
}
