import { ComponentProps, useState } from 'react'
import { capitalize } from 'utils'
import { CheckboxWrapper, CheckboxLabel, HiddenCheckbox, StyledCheckbox, StyledLabelName } from './Checkbox.styles'
import { CheckboxProps } from './Checkbox.types'

export const Checkbox = ({ name, selectValues, setSelectValues, ...props }: ComponentProps<'label'> & CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(() => selectValues.includes(capitalize(name)))

  const handleChange = () => {
    setIsChecked(previousState => !previousState)
    if (isChecked) {
      setSelectValues(selectValues.filter(element => element.toLowerCase() !== name))
    } else {
      setSelectValues([...selectValues, capitalize(name)])
    }
  }

  return (
    <CheckboxWrapper>
      <CheckboxLabel>
        <HiddenCheckbox type="checkbox" checked={isChecked} onChange={handleChange} />
        <StyledCheckbox />
        <StyledLabelName>{props.children}</StyledLabelName>
      </CheckboxLabel>
    </CheckboxWrapper>
  )
}
