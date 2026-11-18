import { ResultCount, Card, Pagination } from 'common'
import { Constants } from 'constant'
import { useShowContext } from 'helper'
import { MoviesContainer, MoviesWrapper, NoPagination, NoResult } from './CardList.styles'

export const CardList = () => {
  const { showsProps, setShowsProps, showsOnPage, foundShows } = useShowContext()

  const paginate = (page: number) => setShowsProps(prev => ({ ...prev, page: page.toString() }))

  return (
    <MoviesContainer aria-label="media list">
      {showsOnPage.length ? (
        <>
          <ResultCount foundShows={foundShows} />
          <MoviesWrapper>
            {showsOnPage.map(media => (
              <Card key={media.id} media={media} />
            ))}
          </MoviesWrapper>
          {foundShows <= +showsProps.limit ? <NoPagination /> : <Pagination currentPage={+showsProps.page} totalPages={Math.ceil(foundShows / +showsProps.limit)} paginate={paginate} />}
        </>
      ) : (
        <NoResult>
          <p>{Constants.NO_RESULT}</p>
        </NoResult>
      )}
    </MoviesContainer>
  )
}
