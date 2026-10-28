import styles from './BrandList.module.css'


// TODO: make card standalone component
// TODO: create beetter tooltip for the card instead of native "title"
// TODO: use @container for the card
// TODO: better text overflow for the card
// TODO: kinda speculation rules for the card (to preload data for drawer)

/**
 * !IMPORTANT: due to test character of this project (had a little time) i used content-visibility: auto; for the card to manage
 * virtualization. I Know that this feature has "Newly available" status, but it is better than nothing
 */
export function BrandList({ items, selectedId, onSelect }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const selected = item.id === selectedId
        return (
          <li key={item.id}>
            <button
              className={selected ? `${styles.brandCard} ${styles.brandCard_selected}` : styles.brandCard}
              aria-pressed={selected}
              onClick={() => onSelect(item)}
            >
              <span className={styles.brandCard__name} title={item.brand}>{item.brand}</span>
              <span className={styles.brandCard__part} title={item.name}>{item.name}</span>
              <span className={styles.brandCard__meta}>
                <span className={styles.brandCard__number}>{item.number}</span>
                <span
                  className={item.count > 0 ? `${styles.brandCard__stock} ${styles.brandCard__inStock}` : styles.brandCard__stock}
                  title={item.count > 0 ? `${item.count} шт.` : 'нет в наличии'}
                >
                  {item.count > 0 ? `${item.count} шт.` : 'нет в наличии'}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
