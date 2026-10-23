import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RequestStatus, getRequestStatus } from '@/shared/ui/request-status'
import { OffersTable } from './OffersTable'
import { loadOffers, useOffers } from '../model/offers'
import styles from './OfferSection.module.css'

export function OfferSection({ brand, onClose }) {
  const dispatch = useDispatch()
  const offers = useOffers()
  const dialogRef = useRef(null)
  const closedByState = useRef(false)
  const current = Boolean(brand) && offers.requestId === brand.id
  const status = current ? offers.status : 'loading'
  const requestStatus = getRequestStatus(
    { status, error: offers.error, items: offers.items },
    {
      loading: 'Загружаем предложения…',
      empty: 'Предложения не найдены.',
    },
  )

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

  useEffect(function EF_loadOffers() {
    if (!brand) return;
    const request = dispatch(loadOffers(brand))
    return () => request.abort()
  }, [brand, dispatch])

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
          {status === 'success' && offers.items.length > 0 ? (
            <OffersTable items={offers.items} />
          ) : null}
        </div>
      ) : null}
    </dialog>
  )
}
