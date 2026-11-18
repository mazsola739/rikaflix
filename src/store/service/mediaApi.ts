import { createApi } from '@reduxjs/toolkit/query/react'
import { Show, GetShowsProps } from 'types'

import { browserBaseQuery } from './browserBaseQuery'

/**
 * RTK Query endpoints for the show list. There is no server: every request is
 * answered in the browser by `browserBaseQuery` (bundled data + localStorage).
 */
export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: browserBaseQuery,
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
