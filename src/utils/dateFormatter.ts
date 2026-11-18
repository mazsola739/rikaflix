export const getYear = (date: string) => {
  return new Date(date).getFullYear()
}

export const convertDateToString = (date: string) => {
  if (date.trim().length === 0) {
    return ''
  }
  const dateForm = date.replaceAll('.', '-')
  return dateForm
}

export const convertStringToDate = (date: string) => {
  if (date.trim().length === 0) {
    return ''
  }
  const dateForm = date.replaceAll('-', '.')
  return dateForm
}
