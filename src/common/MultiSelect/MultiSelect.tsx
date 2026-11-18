import { Checkbox } from 'common'
import { Placeholders } from 'constant'
import { useState, useRef, useEffect } from 'react'
import { capitalize } from 'utils'
import { SelectContainer, SelectHeader, SelectDropDown } from './MultiSelect.styles'
import { MultiSelectProps } from './MultiSelect.types'

export const MultiSelect = ({ setSelectValues, selectValues, selectItems }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentValue = selectValues.map(value => capitalize(value)).join(', ')

  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Close the dropdown when clicking anywhere outside of it.
    const selectBlurHandler = (event: Event) => {
      if (!event.composedPath().includes(selectRef.current as HTMLDivElement)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', selectBlurHandler)

    return () => {
      window.removeEventListener('click', selectBlurHandler)
    }
  }, [isOpen])

  const getColorVariant = !currentValue.length ? 'blurred' : 'white'

  return (
    <SelectContainer ref={selectRef}>
      <SelectHeader color={getColorVariant} onClick={() => setIsOpen(previousState => !previousState)} isOpen={isOpen} type="button">
        {currentValue.length > 0 ? currentValue : Placeholders.SELECT_GENRE}
      </SelectHeader>
      {isOpen && (
        <SelectDropDown>
          {selectItems.map((element, index) => (
            <Checkbox key={index} setSelectValues={setSelectValues} selectValues={selectValues} name={element.name}>
              {element.labelName}
            </Checkbox>
          ))}
        </SelectDropDown>
      )}
    </SelectContainer>
  )
}
