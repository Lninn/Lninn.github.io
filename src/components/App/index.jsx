import './index.css'

import { Suspense } from 'react'
import AppHeader from '../AppHeader'
import Bookmark from '../Bookmark'
import Article from '../Article'
import Dashboard from '../Dashboard'
import Footer from '../Footer'
import useRouteStore from '../../store/route'


const ROUTES = {
  BOOKMARK: {
    path: 'bookmark',
    component: Bookmark
  },
  LOG: {
    path: 'log',
    component: Article
  },
  DASHBOARD: {
    path: 'dashboard',
    component: Dashboard
  }
}

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>Loading...</span>
    </div>
  )
}

function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>页面不存在</p>
    </div>
  )
}

function App() {
  const { activePath } = useRouteStore()

  const route = Object.values(ROUTES).find(r => r.path === activePath)
  const Component = route?.component || NotFound

  return (
    <div className="app-container">
      <AppHeader />

      <main className="app-main">
        <div className="content-container">
          <Suspense fallback={<LoadingSpinner />}>
            <Component />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
