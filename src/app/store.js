import { configureStore } from '@reduxjs/toolkit'
import { brandsKey, brandsReducer } from '@/features/find-brands'
import { offersKey, offersReducer } from '@/features/find-offers'

export const store = configureStore({
  reducer: {
    [brandsKey]: brandsReducer,
    [offersKey]: offersReducer,
  },
})
