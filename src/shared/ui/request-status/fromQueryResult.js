import { readQueryError } from '@/shared/api'

export function fromQueryResult(result, fallback) {
  if (!result || result.isUninitialized) {
    return { status: 'idle', items: [], error: '' }
  }

  const items = result.currentData
  if (items === undefined && result.isError) {
    return {
      status: 'error',
      items: [],
      error: readQueryError(result.error, fallback),
    }
  }
  if (items === undefined) {
    return { status: 'loading', items: [], error: '' }
  }
  return {
    status: 'success',
    items: Array.isArray(items) ? items : [],
    error: '',
  }
}
