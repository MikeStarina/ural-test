import { PRICE_API_KEY, PRICE_API_URL } from '@/shared/config'

function buildQuery(params) {
  const query = new URLSearchParams({ key: PRICE_API_KEY })

  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === '') continue
    query.set(key, String(value))
  }

  return query
}

// TODO: error handling
export async function searchGoods(params, signal) {
    const res = await fetch(`${PRICE_API_URL}?${buildQuery(params)}`, {
      signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`err (${res.status}).`)
    }
    const data = await res.json().catch(() => { throw new Error('err') })
    return data
}
