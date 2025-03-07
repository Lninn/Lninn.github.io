import './index.css'
import { HashRouter } from 'react-router-dom'
import AppHeader from '#/components/AppHeader'
import Footer from '#/components/Footer'
import { AppRoutes } from './AppRoutes'

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <AppHeader />
        <main className="app-main">
          <div className="content-wrapper">
            <div className="page-container">
              <AppRoutes />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
