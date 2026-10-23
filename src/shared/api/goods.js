export function hasIdentity(item) {
  if (!item || typeof item !== 'object') return false
  return Boolean(
    String(item.brand || '').trim()
    || String(item.number || '').trim()
    || String(item.name || '').trim(),
  )
}

export function readGoods(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.goods)) return []
  return data.goods.filter(hasIdentity)
}
