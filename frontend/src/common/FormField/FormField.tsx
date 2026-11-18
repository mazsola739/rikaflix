import { ErrorMessage } from 'formik'
import { FormFieldContainer, FormFieldLabelName, FormFieldError } from './FormField.styles'
import { FormFieldProps } from './FormField.types'

export const FormField = ({ children, labelName, name }: FormFieldProps) => {
  return (
    <FormFieldContainer>
      <label>
        <FormFieldLabelName>{labelName}</FormFieldLabelName>
        {children}
      </label>
      <ErrorMessage name={name} component={FormFieldError} />
    </FormFieldContainer>
  )
}
