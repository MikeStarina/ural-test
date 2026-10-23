import { searchGoods, readGoods } from '@/shared/api'

export async function fetchBrands(number, signal) {
  const data = await searchGoods({ number }, signal)

  return readGoods(data).map((item) => ({
    id: item.goodsID || `${item.brand}-${item.number}`,
    brand: item.brand,
    number: item.number,
    name: item.name?.trim() || 'Без названия',
    count: Number(item.count) || 0,
  }))
}
