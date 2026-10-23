import { useDispatch } from 'react-redux'
import { SkuSearch, BrandSection, clearSelectedBrand, useSelectedBrand } from '@/features/find-brands'
import { OfferSection } from '@/features/find-offers'
import styles from './MainPage.module.css'


// TODO: move it all (except header) to the widget when it wil be necessary
export function MainPage() {
  const dispatch = useDispatch()
  const selected = useSelectedBrand()

  return (
    <main className={styles.page}>
      {/* TODO: to make the header a standalone component */}
      <header className={styles.header}>
        <div className={styles.header__logoWrapper}>
          <a href="/">
            <Logo />
          </a>
          <span className={styles.header__separator} role="separator" aria-hidden="true"></span>
          <div className={styles.header__titleBlock}>
            {/* TODO: do something w typography in the project (styles or components) */}
            <h1 className={styles.header__title}>Проценка</h1>
            <p className={styles.header__subtitle}>
              Сервис подбора автозапчастей и&nbsp;их&nbsp;аналогов от Фаворит
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.header__info}
          aria-label="Подсказка"
          aria-describedby="header-hint"
        >
          <span aria-hidden="true">?</span>
          <span id="header-hint" role="tooltip" className={styles.header__tooltip}>
            Введите артикул и нажмите «Найти». Выберите бренд, чтобы открыть аналоги и складские предложения.
          </span>
        </button>
      </header>
      {/* Thoughts: should i wrap it into something sematic (e.g. <section>)? */}
      {/* Thoughts: later we should create a widget with all the logic for search and selection of the brand */}
      <SkuSearch />
      <BrandSection />
      <OfferSection brand={selected} onClose={() => dispatch(clearSelectedBrand())} />
    </main>
  )
}


const Logo = () => {
  // svg inlined for the dark theme in the future
  // TODO: move it somewhere when necessary
  return (
    <svg width="148" height="70" fill="none" className={styles.logo}>
      <path fill="currentColor" d="M28.2435 65.0666h-4.3607V44.7153h18.113v.872H28.2435v9.3029H36.82l-.5808.8727h-7.9957z" />
      <path fill="currentColor" d="M28.3972 65.0666H27.322l14.2756-20.3513h1.0751l-7.123 10.1749h7.7046V44.7153h4.3606v20.3513h-4.3606v-9.3028h-8.3158zM47.615 44.7163h5.0006l14.3628 20.3513h-5.0007zm21.1065 0v20.3513h-.872V44.7163zm35.6795 0h4.361v20.3513h-4.361z" />
      <path fill="currentColor" d="M118.274 65.0666h-4.361V45.5873h-9.391v-.872h23.055v.872h-9.304v19.4793zm-36.455-.8259c-3.0182-.018-5.2343-.8291-6.6467-2.4341-1.4124-1.6032-2.1091-3.909-2.0902-6.9164 0-1.5029.1735-2.8323.5232-3.9872q.522-1.7327 1.5958-2.9285c.7165-.7979 1.6206-1.4034 2.7138-1.8147 1.0932-.4129 2.3946-.6186 3.9041-.6186h.0008v-.8259h-.0008c-.9312 0-1.9011.065-2.9104.1925a16.5 16.5 0 0 0-2.9696.6606c-.9699.3126-1.892.7198-2.7648 1.224-.8728.5051-1.6395 1.1327-2.2984 1.883-.6597.7518-1.1845 1.646-1.572 2.6808-.3882 1.0365-.5824 2.2235-.5824 3.5619q0 2.0076.5824 3.534c.3883 1.0175.9123 1.9018 1.572 2.6545.6589.7519 1.4256 1.3845 2.2984 1.8969a13.15 13.15 0 0 0 2.7648 1.2241 17.3 17.3 0 0 0 2.9696.6457c1.0093.1284 1.9792.1933 2.9104.1933h.0008v-.8259z" />
      <path fill="currentColor" d="M96.487 46.2691c.5528.454.969 1.0241 1.2496 1.7093q.422 1.029.4219 2.2466t-.4219 2.2465c-.2806.6861-.6968 1.2611-1.2496 1.7234-.5528.4648-1.2454.6959-2.0795.6959h-3.5751l.5816.8308h6.3374c.9032-.0888 1.6863-.3422 2.3406-.7716.823-.5429 1.439-1.2256 1.846-2.0499.408-.8234.611-1.7102.611-2.6603 0-.9485-.203-1.8361-.611-2.6595-.407-.8243-1.023-1.507-1.846-2.0499-.8246-.543-1.8471-.8136-3.0678-.8136H81.8191v20.3513h4.3606V45.6184l8.2278-.0296c.8341-.0009 1.5275.2262 2.0795.6803" />
      <path fill="currentColor" d="m92.75 57.6299 5.2055 7.4363h5.0005l-5.2292-7.4363zm54.268-43.3952s-30.436-8.4902-54.7428-4.9661c-24.3064 3.524-19.615 9.0026-19.615 9.0026s-6.2905-4.4454.4812-8.1989c6.7717-3.7536 33.5236-10.8864 73.8766 4.1624M132.1 29.2199s-54.1868-8.2623-95.3073 2.8824S9.1441 59.9238 9.1441 59.9238s-15.1204-9.0833-6.3144-20.9165c7.021-9.4337 56.6366-27.2736 129.2703-9.7874M94.5801 54.8911h-9.669v.8481h9.669z" />
    </svg>
  )
}
