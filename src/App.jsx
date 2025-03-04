import './App.css'

import { Suspense, useState } from 'react'

import Article from './Article'
import Bookmark from './Bookmark'
import AppHeader from './AppHeader'


const ROUTES = {
  BOOKMARK: 'bookmark',
  LOG: 'log'
}

const componentMap = {
  [ROUTES.BOOKMARK]: Bookmark,
  [ROUTES.LOG]: Article
}

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div>Loading...</div>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(ROUTES.BOOKMARK)

  const Component = componentMap[path] || (() => (
    <div className="not-found">页面不存在</div>
  ))

  return (
    <div className="app-container">
      <AppHeader activePath={path} onChange={setPath} />

      <main className="app-main">
        <Suspense fallback={<LoadingSpinner />}>
          <Component />
        </Suspense>
      </main>

      <footer className="app-footer">
        <p>Powered by Deepseek</p>
      </footer>
    </div>
  )
}

export default App
