export const getGenreFormat = (genres: string[]) => (genres.length === 2 ? genres.join(' & ') : genres.join(', '))
