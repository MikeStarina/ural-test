import { useState } from 'react'
import styles from './OffersTable.module.css'

const PAGE_SIZE = 50

const priceFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
})

const stockFormat = new Intl.NumberFormat('ru-RU')

function formatPrice(value) {
  if (typeof value !== 'number') return '—'
  return priceFormat.format(value)
}

function formatStock(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return stockFormat.format(value)
}

export function OffersTable({ items = [] }) {
  const [shown, setShown] = useState(PAGE_SIZE)
  const visible = items.slice(0, shown)
  const hidden = items.length - visible.length

  return (
    <div className={styles.table__wrapper}>
      <p className={styles.table__note}>
        Цена и остаток указаны по конкретному складу.
        {hidden > 0 ? ` Показаны первые ${visible.length} из ${stockFormat.format(items.length)}.` : null}
      </p>
      <div className={styles.table__container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Название / производитель</th>
              <th scope="col" className={styles.num}>Цена</th>
              <th scope="col" className={styles.num}>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr key={item.id} className={item.kind === 'requested' ? styles.requested : undefined}>
                <td>
                  <div className={styles.table__title} title={item.name}>{item.name}</div>
                  <div className={styles.table__meta}>
                    <span>{item.brand}</span>
                    {item.number ? <span>{item.number}</span> : null}
                    {item.warehouse ? <span>{item.warehouse}</span> : <span>нет склада</span>}
                    <span>{item.kind === 'requested' ? 'запрошенная' : 'аналог'}</span>
                  </div>
                </td>
                <td className={styles.table__num}>{formatPrice(item.price)}</td>
                <td className={styles.table__num}>{formatStock(item.stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hidden > 0 ? (
        <button type="button" className={styles.more} onClick={() => setShown((count) => count + PAGE_SIZE)}>
          Показать ещё {Math.min(PAGE_SIZE, hidden)}
        </button>
      ) : null}
    </div>
  )
}
