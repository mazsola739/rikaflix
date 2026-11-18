import { FormField } from 'common'
import { FieldHookConfig, useField } from 'formik'
import { StyledInput } from './InputField.styles'
import { InputFieldProps } from './InputField.types'

export const InputField = ({ labelName, selectValues, ...props }: FieldHookConfig<string> & InputFieldProps) => {
  const [field] = useField(props)
  const color = !selectValues.length ? 'blurred' : 'white'

  return (
    <FormField labelName={labelName} name={field.name}>
      <StyledInput colorVariant={color} {...field} />
    </FormField>
  )
}
