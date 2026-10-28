import { useEffect, useRef } from 'react'
import { RequestStatus, fromQueryResult, getRequestStatus } from '@/shared/ui/request-status'
import { useGetOffersQuery } from '../api/offers'
import { OffersTable } from './OffersTable'
import styles from './OfferSection.module.css'

export function OfferSection({ brand, onClose }) {
  const offersQuery = useGetOffersQuery(
    { number: brand?.number ?? '', brand: brand?.brand ?? '' },
    { skip: !brand },
  )
  const offers = fromQueryResult(offersQuery, 'Не удалось получить предложения.')
  const dialogRef = useRef(null)
  const closedByState = useRef(false)
  const requestStatus = getRequestStatus(offers, {
    loading: 'Загружаем предложения…',
    empty: 'Предложения не найдены.',
  })

  useEffect(function EF_openDialog() {
    const dialog = dialogRef.current
    if (!dialog) return;

    if (!brand) {
      if (dialog.open) {
        closedByState.current = true
        dialog.close()
      }
      return;
    }

    if (!dialog.open) dialog.showModal()
    return;
  }, [brand])

  function handleClose() {
    if (closedByState.current) {
      closedByState.current = false
      return;
    }
    onClose()
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) event.currentTarget.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.drawer}
      aria-labelledby="offers-title"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      {brand ? (
        <div className={styles.drawer__panel}>
          <div className={styles.drawer__body}>
            <div className={styles.drawer__head}>
              <div>
                <h2 className={styles.drawer__title} id="offers-title">Аналоги и предложения</h2>
                <p className={styles.drawer__count}>{brand.brand} | {brand.number}</p>
              </div>
              <button
                type="button"
                className={styles.drawer__close}
                onClick={() => dialogRef.current?.close()}
              >
                Закрыть
              </button>
            </div>

            {requestStatus ? (
              <RequestStatus tone={requestStatus.tone}>{requestStatus.message}</RequestStatus>
            ) : null}
            {offers.status === 'success' && offers.items.length > 0 ? (
              <OffersTable key={brand.id} items={offers.items} />
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
