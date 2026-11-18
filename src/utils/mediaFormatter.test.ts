import { Show } from 'types'
import { getBackEndForm, getFrontEndForm } from './mediaFormatter'
import { convertStringToMin } from './runtimeFormatter'

const show: Show = {
  id: 'abc',
  type: 'Movie',
  title: 'Iron Man',
  tagline: "Heroes aren't born.",
  vote_average: 7.9,
  release_date: '2008.04.30',
  poster_path: 'images/posters/iron-man.jpg',
  backdrop_path: '',
  overview: 'Suit up.',
  genres: ['Action'],
  runtime: 126
}

describe('media form conversion', () => {
  it('keeps the real id so edits reach the right show', () => {
    expect(getFrontEndForm(show).id).toBe('abc')
  })

  it('round-trips a show through the form shape', () => {
    expect(getBackEndForm(getFrontEndForm(show))).toEqual(show)
  })

  it('sends rating and runtime as numbers even when the form holds strings', () => {
    const values = { ...getFrontEndForm(show), rating: '8.5' as unknown as number, runtime: '95' }
    const result = getBackEndForm(values)

    expect(result.vote_average).toBe(8.5)
    expect(result.runtime).toBe(95)
  })
})

describe('convertStringToMin', () => {
  it.each([
    ['2h 6m', '126'],
    ['95', '95'],
    [' 1h 5m ', '65'],
    ['', ''],
    ['abc', '']
  ])('%j -> %j', (input, expected) => {
    expect(convertStringToMin(input)).toBe(expected)
  })
})
