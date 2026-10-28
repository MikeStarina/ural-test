import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  MIN_SKU_LENGTH,
  commitSearch,
  setSku,
  useSku,
} from '../model/brands'
import styles from './SkuSearch.module.css'

const SEARCH_DELAY = 300

function getFormStatusText(query, canSearch) {
  if (query.length > 0 && !canSearch) {
    return `Минимум ${MIN_SKU_LENGTH} символа.`
  }
  return ''
}

export function SkuSearch() {
  const dispatch = useDispatch()
  const sku = useSku()
  const timer = useRef(null)
  const query = sku.trim()
  const canSearch = query.length >= MIN_SKU_LENGTH
  const statusText = getFormStatusText(query, canSearch)

  // TODO: write something like useDebounce hook here
  useEffect(function EF_loadBrands() {
    const nextQuery = sku.trim()
    if (nextQuery.length < MIN_SKU_LENGTH) {
      clearTimeout(timer.current)
      return
    }

    timer.current = setTimeout(() => {
      dispatch(commitSearch(nextQuery))
    }, SEARCH_DELAY)

    return () => clearTimeout(timer.current)
  }, [sku, dispatch])

  function onChange(event) {
    dispatch(setSku(event.target.value))
  }

  function onSubmit(event) {
    event.preventDefault()
    if (!canSearch) return

    clearTimeout(timer.current)
    dispatch(commitSearch(query))
  }

  return (
    <form className={styles.search} role="search" onSubmit={onSubmit}>
      <label htmlFor="sku" className={styles.search__label}>Артикул</label>
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
      <div className={styles.search__statusArea}>
        {statusText ? <span className={styles.search__status}>{statusText}</span> : null}
      </div>
    </form>
  )
}
