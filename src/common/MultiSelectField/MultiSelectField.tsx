import { FormField, MultiSelect } from 'common'
import { MultiSelectProps } from 'common/MultiSelect/MultiSelect.types'
import { FieldHookConfig, useField } from 'formik'
import { StyledSelect } from './MultiSelectField.styles'
import { MultiSelectFieldProps } from './MultiSelectField.types'

export const MultiSelectField = ({ labelName, selectItems, setSelectValues, selectValues, ...props }: FieldHookConfig<string> & MultiSelectFieldProps & MultiSelectProps) => {
  const [field] = useField(props)
  return (
    <FormField labelName={labelName} name={field.name}>
      <>
        <StyledSelect {...field} multiple>
          {selectItems.map((element, index) => (
            <option key={index} value={element.name} />
          ))}
        </StyledSelect>
        <MultiSelect setSelectValues={setSelectValues} selectValues={selectValues} selectItems={selectItems} />
      </>
    </FormField>
  )
}
