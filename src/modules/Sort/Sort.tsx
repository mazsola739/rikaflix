import { useState, useRef, useEffect } from 'react'
import { DEFAULT_SORT_OPTION, menuItems, sortOrder } from './Sort.data'
import { SortContainer, SortBy, SortDropDown, SortingOptions, StyledDown, StyledUp, SortList, SortListWrapper, SortListItem, StyledSortOrderIcon } from './Sort.styles'
import { SortProps, SortLabel, ItemClickHandler } from './Sort.types'

export const Sort = ({ changeMovieSorting }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [option, setOption] = useState<SortLabel>(DEFAULT_SORT_OPTION)
  const selectSortRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Close the sort menu when clicking anywhere outside of it.
    const selectSortBlurHandler = (event: Event) => {
      if (!event.composedPath().includes(selectSortRef.current as HTMLDivElement)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', selectSortBlurHandler)

    return () => {
      window.removeEventListener('click', selectSortBlurHandler)
    }
  }, [isOpen])

  const handleItemClick: ItemClickHandler = ({ label, sortOrder }) => {
    setOption(label)
    changeMovieSorting(`${label} ${sortOrder}`)
  }

  return (
    <SortContainer>
      <SortBy>Sort by</SortBy>
      <SortDropDown ref={selectSortRef}>
        <SortingOptions onClick={() => setIsOpen(prev => !prev)}>
          {option}
          {isOpen ? <StyledDown /> : <StyledUp />}
        </SortingOptions>

        {isOpen && (
          <SortList>
            <SortListWrapper onClick={() => setIsOpen(false)}>
              {menuItems.map(({ label, type }) =>
                sortOrder.map(sortOrder => (
                  <SortListItem key={`${label}_${sortOrder}`} onClick={() => handleItemClick({ label, sortOrder })}>
                    {label} <StyledSortOrderIcon type={type} sortOrder={sortOrder} />
                  </SortListItem>
                ))
              )}
            </SortListWrapper>
          </SortList>
        )}
      </SortDropDown>
    </SortContainer>
  )
}
