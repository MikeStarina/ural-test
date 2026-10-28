import { priceApi, readGoods, readPricePayload, readText } from '@/shared/api'

const brandsApi = priceApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: (number) => ({
        params: { number },
      }),
      transformResponse(data) {
        return readGoods(readPricePayload(data)).flatMap((item, index) => {
          const brand = readText(item.brand)
          const article = readText(item.number)
          if (!brand || !article) return []

          return [{
            id: readText(item.goodsID) || `${index}:${brand}:${article}`,
            brand,
            number: article,
            name: readText(item.name, 'Без названия'),
            count: Number(item.count) || 0,
          }]
        })
      },
    }),
  }),
})

export const { useGetBrandsQuery } = brandsApi
