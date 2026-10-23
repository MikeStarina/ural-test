import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  MIN_SKU_LENGTH,
  clearSelectedBrand,
  loadBrands,
  setSku,
  useSku,
} from '../model/brands'
import styles from './SkuSearch.module.css'

const getFormStatusText = (query, canSearch) => {
  if (query?.length > 0 && !canSearch) {
    return `Минимум ${MIN_SKU_LENGTH} символа.`
  }
  return 'Поиск по кнопке или клавише Enter.'
}

export function SkuSearch() {
  const dispatch = useDispatch()
  const sku = useSku()
  const requestAbort = useRef(null)
  const query = sku.trim()
  const canSearch = query.length >= MIN_SKU_LENGTH

  function onChange(event) {
    dispatch(setSku(event.target.value))
  }
  // TODO: to add proper form validation
  function onSubmit(event) {
    event.preventDefault()
    if (!canSearch) return

    requestAbort.current?.abort()
    dispatch(clearSelectedBrand())
    requestAbort.current = dispatch(loadBrands(query))
  }

  return (
    <form className={styles.search} role="search" onSubmit={onSubmit}>
      <label htmlFor="sku" className={styles.search__label}>Артикул</label>
      <div className={styles.search__row}>
        <input
          id="sku"
          className={styles.search__field}
          type="search"
          value={sku}
          placeholder="Например: 01089"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
          onChange={onChange}
        />
        {/* TODO: link "ready" animation w sku length */}
        <button
          className={
            canSearch ?
              // DISCUSS: here we need something to improve DX like "classnames"
              `${styles.search__button} ${styles.search__button_ready}`
              : styles.search__button
          }
          type="submit"
          disabled={!canSearch}
        >
          Найти
        </button>
      </div>
      <div className={styles.search__statusArea}>
        <span className={styles.search__status}>{getFormStatusText(query, canSearch)}</span>
      </div>
    </form>
  )
}
