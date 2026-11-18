import { Constants } from 'constant'
import { PaginationContainer, PaginationWrapper, PaginationBackward, StyledShiftLeft, StyledLeft, PaginationSeparator, PaginationForward, StyledRight, StyledShiftRight } from './Pagination.styles'
import { PaginationProps } from './Pagination.types'
import { PaginationButton } from './PaginationButton'

export const Pagination = ({ currentPage, totalPages, paginate }: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationWrapper>
        <PaginationBackward>
          <PaginationButton onClick={() => paginate(currentPage !== 1 ? 1 : currentPage)} color={currentPage === 1 && 'disabled'}>
            <StyledShiftLeft />
          </PaginationButton>
          <PaginationButton onClick={() => currentPage !== 1 && paginate(currentPage - 1)} color={currentPage === 1 && 'disabled'}>
            <StyledLeft />
          </PaginationButton>
        </PaginationBackward>
        <PaginationButton onClick={() => paginate(1)} color={currentPage === 1 && 'active'}>
          1
        </PaginationButton>
        {currentPage > 3 && <PaginationSeparator>{Constants.SEPARATOR}</PaginationSeparator>}
        {currentPage === totalPages && totalPages > 3 && <PaginationButton onClick={() => paginate(currentPage - 2)}>{currentPage - 2}</PaginationButton>}
        {currentPage > 2 && <PaginationButton onClick={() => paginate(currentPage - 1)}>{currentPage - 1}</PaginationButton>}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationButton onClick={() => paginate(currentPage)} color="active">
            {currentPage}
          </PaginationButton>
        )}
        {currentPage < totalPages - 1 && <PaginationButton onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</PaginationButton>}
        {currentPage === 1 && totalPages > 3 && <PaginationButton onClick={() => paginate(currentPage + 2)}>{currentPage + 2}</PaginationButton>}
        {currentPage < totalPages - 2 && <PaginationSeparator>{Constants.SEPARATOR}</PaginationSeparator>}
        <PaginationButton onClick={() => paginate(totalPages)} color={currentPage === totalPages && 'active'}>
          {totalPages}
        </PaginationButton>
        <PaginationForward>
          <PaginationButton onClick={() => paginate(currentPage !== totalPages ? currentPage + 1 : currentPage)} color={currentPage === totalPages && 'disabled'}>
            <StyledRight />
          </PaginationButton>
          <PaginationButton onClick={() => paginate(currentPage !== totalPages ? totalPages : currentPage)} color={currentPage === totalPages && 'disabled'}>
            <StyledShiftRight />
          </PaginationButton>
        </PaginationForward>
      </PaginationWrapper>
    </PaginationContainer>
  )
}
