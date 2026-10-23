import { PRICE_API_KEY, PRICE_API_URL } from '@/shared/config'

function buildQuery(params) {
  const query = new URLSearchParams({ key: PRICE_API_KEY })

  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === '') continue
    query.set(key, String(value))
  }

  return query
}

function isAbortError(error) {
  return error?.name === 'AbortError'
}

export async function searchGoods(params, signal) {
  let res
  try {
    res = await fetch(`${PRICE_API_URL}?${buildQuery(params)}`, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (isAbortError(error)) throw error
    throw new Error('нет связи', { cause: error })
  }

  if (!res.ok) {
    throw new Error('Не удалось получить данные.')
  }

  let data
  try {
    data = await res.json()
  } catch (error) {
    if (isAbortError(error)) throw error
    throw new Error('Некорректный ответ.', { cause: error })
  }

  if (!data || typeof data !== 'object' || !Array.isArray(data.goods)) {
    throw new Error('Некорректный ответ.')
  }

  return data
}
