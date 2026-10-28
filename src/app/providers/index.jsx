import { Provider } from 'react-redux'
import { MainPage } from '@/pages/main'
import { store } from '../store'

export function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
}
