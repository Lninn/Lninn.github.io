import './index.css'

import { Suspense, memo, useEffect, useState } from 'react'
import AppHeader from '../AppHeader'
import Footer from '../Footer'
import useRouteStore from '../../store/route'
import ErrorBoundary from '../ErrorBoundary'
import { ROUTES } from '../../config/routes'
import PropTypes from 'prop-types'


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

const RouteComponent = memo(function RouteComponent({ component }) {
  const Component = component
  return (
    <ErrorBoundary showDetails={import.meta.env.NODE_ENV !== 'production'}>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
})

RouteComponent.propTypes = {
  component: PropTypes.elementType.isRequired
}

function App() {
  const { activePath } = useRouteStore()
  const [cachedRoutes] = useState(() => {
    // 初始化时创建所有路由组件
    const routes = new Map()
    
    // 缓存所有路由组件
    Object.values(ROUTES).forEach(route => {
      const div = document.createElement('div')
      div.style.display = 'none'
      routes.set(route.path, {
        element: <RouteComponent component={route.component} />,
        container: div
      })
    })

    // 添加 404 路由
    const notFoundDiv = document.createElement('div')
    notFoundDiv.style.display = 'none'
    routes.set('404', {
      element: <RouteComponent component={NotFound} />,
      container: notFoundDiv
    })

    return routes
  })

  useEffect(() => {
    const contentContainer = document.querySelector('.content-container')
    if (!contentContainer) return

    // 首次挂载所有路由容器
    cachedRoutes.forEach(({ container }) => {
      contentContainer.appendChild(container)
    })

    return () => {
      // 清理时移除所有容器
      cachedRoutes.forEach(({ container }) => {
        container.remove()
      })
    }
  }, [])

  useEffect(() => {
    // 切换路由时显示/隐藏对应组件
    cachedRoutes.forEach(({ container }, path) => {
      if (path === activePath || (path === '404' && !Object.values(ROUTES).find(r => r.path === activePath))) {
        container.style.display = 'block'
      } else {
        container.style.display = 'none'
      }
    })
  }, [activePath])

  return (
    <div className="app-container">
      <AppHeader />
      <main className="app-main">
        <div className="content-container">
          {Array.from(cachedRoutes.entries()).map(([path, { element }]) => (
            <div key={path} ref={node => {
              if (node) {
                cachedRoutes.get(path).container = node
              }
            }}>
              {element}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
