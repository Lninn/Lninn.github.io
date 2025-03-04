import './index.css'

import { Suspense, useState, lazy } from 'react'
import AppHeader from '../AppHeader'

const ROUTES = {
  BOOKMARK: {
    path: 'bookmark',
    component: lazy(() => import('../../Bookmark'))
  },
  LOG: {
    path: 'log',
    component: lazy(() => import('../Article'))
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
  const [path, setPath] = useState(ROUTES.BOOKMARK.path)

  const route = Object.values(ROUTES).find(r => r.path === path)
  const Component = route?.component || NotFound

  return (
    <div className="app-container">
      <AppHeader activePath={path} onChange={setPath} />

      <main className="app-main">
        <div className="content-container">
          <Suspense fallback={<LoadingSpinner />}>
            <Component />
          </Suspense>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>Powered by Deepseek</p>
        </div>
      </footer>
    </div>
  )
}

export default App
