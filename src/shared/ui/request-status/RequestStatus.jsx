import styles from './RequestStatus.module.css'

const toneClass = {
  error: styles.status_error,
  empty: styles.status_empty,
}

export function RequestStatus({ tone, children }) {
  const className = toneClass[tone] ? `${styles.status} ${toneClass[tone]}` : styles.status

  return (
    <p className={className} role={tone === 'error' ? 'alert' : 'status'}>
      {/* TODO: spinner - standalone component */}
      {tone === 'loading' ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span>{children}</span>
    </p>
  )
}
