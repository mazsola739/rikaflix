export const getRuntimeFormat = (runtime: number) => {
  const minutes = (runtime % 60) | 0
  const hours = (runtime / 60) | 0

  const fillTime = (time: number) => `${time}`.padStart(2, '0')

  return `${fillTime(hours)}h ${fillTime(minutes)} min`
}

export const convertMinToString = (minutesString: string) => {
  if (minutesString.trim().length === 0) {
    return ''
  }
  const totalMinutes = +minutesString
  if (isNaN(totalMinutes) || totalMinutes <= 0) {
    return ''
  }
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.ceil(totalMinutes % 60)
  return `${hours}h ${minutes}m`
}

/** "1h 35m" -> "95". Plain minutes ("95") are accepted too, e.g. when the field never lost focus. */
export const convertStringToMin = (formattedString: string) => {
  const trimmed = formattedString.trim()
  if (/^\d+$/.test(trimmed)) {
    return String(Number(trimmed))
  }
  if (trimmed.length === 0 || !trimmed.includes(' ')) {
    return ''
  }
  const [hoursString, minutesString] = trimmed.split(/\s+/)
  const hours = +hoursString.slice(0, -1)
  const minutes = +minutesString.slice(0, -1)
  if (isNaN(hours) || isNaN(minutes)) {
    return ''
  }
  return (hours * 60 + minutes).toString()
}
