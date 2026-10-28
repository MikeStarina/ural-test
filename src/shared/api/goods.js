export function readText(value, fallback = '') {
  if (typeof value === 'string') {
    const text = value.trim()
    return text || fallback
  }
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return fallback
}

export function hasIdentity(item) {
  if (!item || typeof item !== 'object') return false
  return Boolean(readText(item.brand) || readText(item.number) || readText(item.name))
}

export function readGoods(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.goods)) return []
  return data.goods.filter(hasIdentity)
}
