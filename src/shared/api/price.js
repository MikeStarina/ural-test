import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PRICE_API_KEY, PRICE_API_URL } from '@/shared/config'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: PRICE_API_URL,
  prepareHeaders(headers) {
    headers.set('Accept', 'application/json')
    return headers
  },
})

function baseQuery(args, api, extraOptions) {
  const request = typeof args === 'string' ? { url: args } : { ...args }
  return rawBaseQuery({
    ...request,
    url: request.url ?? '',
    params: { key: PRICE_API_KEY, ...request.params },
  }, api, extraOptions)
}

export const priceApi = createApi({
  reducerPath: 'priceApi',
  baseQuery,
  endpoints: () => ({}),
})

export function readPricePayload(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.goods)) {
    throw new Error('Некорректный ответ.')
  }
  return data
}

export function readQueryError(error, fallback = 'Не удалось получить данные.') {
  if (!error || typeof error !== 'object') return fallback
  if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') return 'нет связи'
  if (error.status === 'PARSING_ERROR') return 'Некорректный ответ.'
  if (error.status === 'CUSTOM_ERROR') return error.error || 'Некорректный ответ.'
  if (typeof error.status === 'number') return 'Не удалось получить данные.'
  if (typeof error.message === 'string' && error.message) return error.message
  return fallback
}
