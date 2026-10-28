import { configureStore } from '@reduxjs/toolkit'
import { priceApi } from '@/shared/api'
import { brandsKey, brandsReducer } from '@/features/find-brands'

export const store = configureStore({
  reducer: {
    [priceApi.reducerPath]: priceApi.reducer,
    [brandsKey]: brandsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(priceApi.middleware),
})
