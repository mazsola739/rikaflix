import { Constants } from 'constant'
import { useShowContext } from 'helper'
import { Switcher, Sort } from 'modules'
import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { FilterContainer, FilterContents, FilterOptions, FilterItem, FilterOverflowMenu, FilterMore, FilterMoreOptions, FilterMoreOption, Underline } from './Filter.styles'
import { countFittingGenres, createGenreMeasurer, getAllGenres } from './Filter.utils'

/** On a wide screen the first 7 genres are listed, the rest are under "...more". */
const MAX_INLINE_GENRES = 7
/** "...more" is padded by 10px on both sides. */
const MORE_PADDING = 20

/** How many genres fit next to each other in `optionsRef`; follows the width of the screen. */
const useInlineGenreCount = (optionsRef: RefObject<HTMLDivElement | null>, genres: string[]) => {
  const [count, setCount] = useState(MAX_INLINE_GENRES)

  useEffect(() => {
    const element = optionsRef.current
    if (!element) return

    let isActive = true
    const update = () => {
      const measure = isActive && createGenreMeasurer(element)
      if (!measure) return

      setCount(countFittingGenres(genres.map(measure), element.clientWidth, measure(Constants.MORE) + MORE_PADDING, MAX_INLINE_GENRES))
    }

    const observer = new ResizeObserver(update)
    observer.observe(element)
    // Measure again once Montserrat has loaded: the fallback font has different widths.
    document.fonts?.ready.then(update)

    return () => {
      isActive = false
      observer.disconnect()
    }
  }, [optionsRef, genres])

  return count
}

export const Filter = () => {
  const { setShowsProps, filteredShows } = useShowContext()

  const genreTitles = useMemo(() => getAllGenres(filteredShows), [filteredShows])
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const inlineCount = useInlineGenreCount(optionsRef, genreTitles)

  const selectGenre = (genre: string) => {
    setShowsProps(prev => ({
      ...prev,
      genres: [genre],
      page: '1'
    }))
  }

  return (
    <FilterContainer>
      <FilterContents>
        <FilterOptions ref={optionsRef}>
          <Switcher
            options={genreTitles}
            limit={inlineCount}
            renderItem={option => <FilterItem onClick={() => selectGenre(option)}>{option}</FilterItem>}
            name="genre-options"
            defaultSelectedItem="All"
            slideVerticalPosition="-11.9px"
          />
          {genreTitles.length > inlineCount ? (
            // Focusable, so a tap opens the list on touch screens, where there is no hover.
            <FilterOverflowMenu tabIndex={0}>
              <FilterMore>{Constants.MORE}</FilterMore>
              <FilterMoreOptions>
                {genreTitles.slice(inlineCount).map(genre => (
                  <FilterMoreOption
                    key={genre}
                    onClick={event => {
                      selectGenre(genre)
                      // Close the list: it stays open while it has the focus.
                      event.currentTarget.closest<HTMLElement>('[tabindex]')?.blur()
                    }}
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
