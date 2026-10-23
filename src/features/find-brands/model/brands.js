import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { fetchBrands } from '../api/fetch-brands'

export const MIN_SKU_LENGTH = 3
export const brandsKey = 'findBrands'

const emptyBrands = () => ({ status: 'idle', items: [], error: '' })

export const loadBrands = createAsyncThunk(
  'findBrands/load',
  (sku, { signal }) => fetchBrands(sku, signal),
)

const brandsSlice = createSlice({
  name: 'findBrands',
  initialState: {
    sku: '',
    brands: emptyBrands(),
    selected: null,
    requestId: null,
  },
  reducers: {
    setSku(state, action) {
      state.sku = action.payload
      state.brands = emptyBrands()
      state.selected = null
      state.requestId = null
    },
    selectBrand(state, action) {
      state.selected = action.payload
    },
    clearSelectedBrand(state) {
      state.selected = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadBrands.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.brands.status = 'loading'
        state.brands.items = []
        state.brands.error = ''
      })
      .addCase(loadBrands.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.brands.status = 'success'
        state.brands.items = action.payload
        state.brands.error = ''
      })
      .addCase(loadBrands.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId || action.meta.aborted) return
        state.brands.status = 'error'
        state.brands.items = []
        state.brands.error = action.error.message || 'Не удалось получить производителей.'
      })
  },
})

export const { setSku, selectBrand, clearSelectedBrand } = brandsSlice.actions
export const brandsReducer = brandsSlice.reducer

const selectBrandsState = (state) => state[brandsKey]

export const selectSku = (state) => selectBrandsState(state).sku
export const selectBrands = (state) => selectBrandsState(state).brands
export const selectSelectedBrand = (state) => selectBrandsState(state).selected

export function useSku() {
  return useSelector(selectSku)
}

export function useBrands() {
  return useSelector(selectBrands)
}

export function useSelectedBrand() {
  return useSelector(selectSelectedBrand)
}
