import { useDispatch } from 'react-redux'
import { RequestStatus, getRequestStatus } from '@/shared/ui/request-status'
import { BrandList } from './BrandList'
import {
  selectBrand,
  useBrands,
  useSelectedBrand,
} from '../model/brands'
import styles from './BrandSection.module.css'

function formatCount(count, forms) {
  const abs = Math.abs(count) % 100
  const last = abs % 10
  let word = forms[2]
  if (abs < 11 || abs > 14) {
    if (last === 1) word = forms[0]
    else if (last > 1 && last < 5) word = forms[1]
  }
  return `${count} ${word}`
}

export function BrandSection() {
  const dispatch = useDispatch()
  const brands = useBrands()
  const selected = useSelectedBrand()
  const requestStatus = getRequestStatus(brands, {
    loading: 'Ищем производителей…',
    empty: 'По этому артикулу ничего не найдено.',
  })

  if (brands.status === 'idle') return null

  return (
    <section className={styles.brands} aria-busy={brands.status === 'loading'}>
      <div className={styles.brands__head}>
        <h2 className={styles.brands__title}>Производители</h2>
        {brands?.status === 'success' && brands?.items?.length > 0 ? (
          <span className={styles.brands__count}>
            {formatCount(brands.items.length, ['позиция', 'позиции', 'позиций'])}
          </span>
        ) : null}
      </div>
      {requestStatus ? (
        <RequestStatus tone={requestStatus.tone}>{requestStatus.message}</RequestStatus>
      ) : null}
      {brands?.status === 'success' && brands?.items?.length > 0 ? (
        <BrandList
          items={brands.items}
          selectedId={selected?.id}
          onSelect={(item) => dispatch(selectBrand(item))}
        />
      ) : null}
    </section>
  )
}
