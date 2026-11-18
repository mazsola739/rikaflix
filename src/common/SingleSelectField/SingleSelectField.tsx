import { FormField } from 'common'
import { Placeholders } from 'constant'
import { FieldHookConfig, useField } from 'formik'
import { StyledOption, StyledSelect } from './SingleSelectField.styles'
import { SingleSelectFieldProps } from './SingleSelectField.types'

export const SingleSelectField = ({ labelName, selectItems, selectValues, ...props }: SingleSelectFieldProps & FieldHookConfig<string>) => {
  const [field] = useField(props)
  const getColorVariant = !selectValues.length ? 'blurred' : 'white'

  return (
    <FormField labelName={labelName} name={field.name}>
      <StyledSelect color={getColorVariant} {...field}>
        <StyledOption color="blurred" value="" label={Placeholders.MEDIA_CHOOSE} />
        {selectItems.map((type, index) => (
          <StyledOption key={index} color="white" value={type} label={type}>
            {type}
          </StyledOption>
        ))}
      </StyledSelect>
    </FormField>
  )
}
