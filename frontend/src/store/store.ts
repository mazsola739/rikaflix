import { configureStore } from '@reduxjs/toolkit'
import { mediaApi } from './service/mediaApi'

export const store = configureStore({
  reducer: {
    [mediaApi.reducerPath]: mediaApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mediaApi.middleware)
})
