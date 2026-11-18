import { countFittingGenres, GENRE_GAP } from './Filter.utils'

describe('countFittingGenres', () => {
  // Five genres, 100px each: all of them need 5 × 100 + 4 gaps.
  const widths = [100, 100, 100, 100, 100]
  const allFive = 500 + 4 * GENRE_GAP
  const moreWidth = 90

  it('shows every genre, without "...more", when they all fit', () => {
    expect(countFittingGenres(widths, allFive, moreWidth, 7)).toBe(5)
  })

  it('keeps room for "...more" when some genres do not fit', () => {
    // 3 genres + "...more" need 300 + 2 gaps + 1 gap + 90.
    expect(countFittingGenres(widths, 300 + 3 * GENRE_GAP + moreWidth, moreWidth, 7)).toBe(3)
    expect(countFittingGenres(widths, 300 + 3 * GENRE_GAP + moreWidth - 1, moreWidth, 7)).toBe(2)
  })

  it('never shows more than the maximum', () => {
    expect(countFittingGenres(widths, 10_000, moreWidth, 3)).toBe(3)
  })

  it('always shows at least one genre', () => {
    expect(countFittingGenres(widths, 50, moreWidth, 7)).toBe(1)
  })
})
