import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const MIN_SKU_LENGTH = 3
export const brandsKey = 'findBrands'

const brandsSlice = createSlice({
  name: 'findBrands',
  initialState: {
    sku: '',
    searchSku: '',
    selected: null,
  },
  reducers: {
    setSku(state, action) {
      state.sku = action.payload
      state.searchSku = ''
      state.selected = null
    },
    commitSearch(state, action) {
      state.searchSku = action.payload
    },
    selectBrand(state, action) {
      state.selected = action.payload
    },
    clearSelectedBrand(state) {
      state.selected = null
    },
  },
})

export const { setSku, commitSearch, selectBrand, clearSelectedBrand } = brandsSlice.actions
export const brandsReducer = brandsSlice.reducer

const selectBrandsState = (state) => state[brandsKey]

export const selectSku = (state) => selectBrandsState(state).sku
export const selectSearchSku = (state) => selectBrandsState(state).searchSku
export const selectSelectedBrand = (state) => selectBrandsState(state).selected

export function useSku() {
  return useSelector(selectSku)
}

export function useSearchSku() {
  return useSelector(selectSearchSku)
}

export function useSelectedBrand() {
  return useSelector(selectSelectedBrand)
}
