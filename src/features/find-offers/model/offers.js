import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { fetchOffers } from '../api/fetch-offers'

export const offersKey = 'findOffers'

export const loadOffers = createAsyncThunk(
  'findOffers/load',
  (brand, { signal }) => fetchOffers(brand.number, brand.brand, signal),
)

const offersSlice = createSlice({
  name: 'findOffers',
  initialState: {
    status: 'idle',
    items: [],
    error: '',
    requestId: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state, action) => {
        state.status = 'loading'
        state.items = []
        state.error = ''
        state.requestId = action.meta.arg.id
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.arg.id) return
        state.status = 'success'
        state.items = action.payload
        state.error = ''
      })
      .addCase(loadOffers.rejected, (state, action) => {
        if (state.requestId !== action.meta.arg.id || action.meta.aborted) return
        state.status = 'error'
        state.items = []
        state.error = action.error.message || 'Не удалось получить предложения.'
      })
  },
})

export const offersReducer = offersSlice.reducer

export const selectOffers = (state) => state[offersKey]

export function useOffers() {
  return useSelector(selectOffers)
}
