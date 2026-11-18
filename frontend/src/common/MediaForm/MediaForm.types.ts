import { InitialValueProps } from 'types'

export interface MediaFormProps {
  handleSubmit: (values: InitialValueProps) => Promise<void>
  initialValues: InitialValueProps
}
