interface SelectValues {
  selectValues: string[]
  setSelectValues: (values: string[]) => void
}

export interface CheckboxProps extends SelectValues {
  name: string
}
