import { FormField } from 'common'
import { FieldHookConfig, useField } from 'formik'
import { StyledTextArea } from './TextAreaField.styles'
import { TextAreaFieldProps } from './TextAreaField.types'

export const TextAreaField = ({ labelName, ...props }: FieldHookConfig<string> & TextAreaFieldProps) => {
  const [field] = useField(props)
  return (
    <FormField labelName={labelName} name={field.name}>
      <StyledTextArea {...field} />
    </FormField>
  )
}
