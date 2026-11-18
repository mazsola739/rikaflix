import { InputField } from 'common'
import { DateFieldProps } from './DateField.types'

export const DateField = ({ name, labelName, placeholder, selectValues }: DateFieldProps) => {
  return (
    <InputField
      name={name}
      labelName={labelName}
      placeholder={placeholder}
      onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.type === 'text') {
          e.target.type = 'date'
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        if (selectValues === '' || selectValues) {
          e.target.type = 'text'
        }
      }}
      selectValues={selectValues}
    />
  )
}
