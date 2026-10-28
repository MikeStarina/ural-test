import { hasIdentity, priceApi, readGoods, readPricePayload, readText } from '@/shared/api'

function toPrice(value) {
  const price = Number(value)
  return Number.isFinite(price) ? price : null
}

function appendOffers(rows, part, kind) {
  const name = readText(part.name, 'Без названия')
  const brand = readText(part.brand)
  const number = readText(part.number)
  const goodsId = readText(part.goodsID) || name
  const warehouses = Array.isArray(part.warehouses)
    ? part.warehouses.filter((warehouse) => warehouse && typeof warehouse === 'object')
    : []

  if (warehouses.length === 0) {
    rows.push({
      id: `${kind}-${rows.length}-${goodsId}-empty`,
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
      id: `${kind}-${rows.length}-${goodsId}-${readText(warehouse.id) || index}`,
      name,
      brand,
      number,
      warehouse: readText(warehouse.code, 'без кода'),
      price: toPrice(warehouse.price),
      stock: Number(warehouse.stock) || 0,
      kind,
    })
  })
}

const offersApi = priceApi.injectEndpoints({
  endpoints: (build) => ({
    getOffers: build.query({
      query({ number, brand }) {
        const article = readText(number)
        const maker = readText(brand)
        if (!article || !maker) {
          throw new Error('Не хватает артикула или производителя.')
        }

        return {
          params: { number: article, brand: maker, analogues: 'on' },
        }
      },
      transformResponse(data) {
        const [part] = readGoods(readPricePayload(data))
        if (!part) return []

        const rows = []
        appendOffers(rows, part, 'requested')

        const analogues = Array.isArray(part.analogues) ? part.analogues : []
        analogues.forEach((analogue) => {
          if (hasIdentity(analogue)) appendOffers(rows, analogue, 'analogue')
        })

        return rows
      },
    }),
  }),
})

export const { useGetOffersQuery } = offersApi
