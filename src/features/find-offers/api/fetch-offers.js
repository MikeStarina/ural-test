import { searchGoods, hasIdentity, readGoods } from '@/shared/api'

function toPrice(value) {
  const price = Number(value)
  return Number.isFinite(price) ? price : null
}

function appendOffers(rows, part, kind) {
  const name = part.name?.trim() || 'Без названия'
  const brand = part.brand || ''
  const number = part.number || ''
  const warehouses = Array.isArray(part.warehouses) ? part.warehouses : []

  if (warehouses.length === 0) {
    rows.push({
      id: `${kind}-${rows.length}-${part.goodsID || name}-empty`,
      name,
      brand,
      number,
      warehouse: '',
      price: null,
      stock: Number(part.count) || 0,
      kind,
    })
    return
  }

  warehouses.forEach((warehouse, index) => {
    rows.push({
      id: `${kind}-${rows.length}-${part.goodsID || name}-${warehouse.id || index}`,
      name,
      brand,
      number,
      warehouse: warehouse.code?.trim() || 'без кода',
      price: toPrice(warehouse.price),
      stock: Number(warehouse.stock) || 0,
      kind,
    })
  })
}

export async function fetchOffers(number, brand, signal) {
  const data = await searchGoods({ number, brand, analogues: 'on' }, signal)
  const [part] = readGoods(data)
  if (!part) return []

  const rows = []
  appendOffers(rows, part, 'requested')

  const analogues = Array.isArray(part.analogues) ? part.analogues : []
  analogues.forEach((analogue) => {
    if (hasIdentity(analogue)) appendOffers(rows, analogue, 'analogue')
  })

  return rows
}
