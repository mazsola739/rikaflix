import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Show, GetShowsProps } from 'types'

import { browserBaseQuery } from './browserBaseQuery'

/**
 * Base URL of the backend API. In development `/api` is proxied to the Express
 * server by Vite (see vite.config.ts); set `VITE_API_URL` to point elsewhere.
 */
const API_URL = import.meta.env.VITE_API_URL ?? '/api/'

/** `browser` = no server: data and changes live in the browser (GitHub Pages build). */
export const isBrowserMode = import.meta.env.VITE_DATA_SOURCE === 'browser'

/**
 * RTK Query endpoints of the shows API (see backend/README.md for the contract).
 * The same endpoints are answered by the Express backend or, in browser mode,
 * by `browserBaseQuery`.
 */
export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: isBrowserMode ? browserBaseQuery : fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getShows: builder.query<
      {
        allShowOfType: Show[]
        filteredShows: Show[]
        showsOnPage: Show[]
        foundShows: number
      },
      GetShowsProps
    >({
      query: ({ type = 'All', title = '', genres, sortBy, limit, page }) => {
        const searchParams = new URLSearchParams({
          type,
          title,
          genres: genres.join(),
          sortBy,
          limit,
          page
        })

        return `shows/?${searchParams}`
      }
    }),
    getShowById: builder.query<Show, string>({
      query: id => `shows/${id}`
    }),
    createShow: builder.mutation<Show, Omit<Show, 'id'>>({
      query: media => ({
        url: 'shows',
        method: 'POST',
        body: media
      })
    }),
    updateShow: builder.mutation<Show, Pick<Show, 'id'> & Partial<Show>>({
      query: media => ({
        url: `shows/${media.id}`,
        method: 'PUT',
        body: media
      })
    }),
    deleteShow: builder.mutation<null, Pick<Show, 'id'>>({
      query: ({ id }) => ({ url: `shows/${id}`, method: 'DELETE' })
    })
  })
})

export const { useGetShowsQuery, useGetShowByIdQuery, useCreateShowMutation, useUpdateShowMutation, useDeleteShowMutation } = mediaApi
