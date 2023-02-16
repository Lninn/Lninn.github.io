import './App.less'
import { TaskList } from './pages'
import Event from './pages/Event'

import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { AppProvider, useApp } from './AppCtx'
import ReactDOM from 'react-dom'


const Layout = () => {
  const { domRect } = useApp()

  const dom = domRect ? <Foo domRect={domRect} /> : null

  return (
    <div className="App">
      {dom}
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Event />,
      },
      {
        path: '/list',
        element: <TaskList />,
      },
      {
        path: '*',
        element: (
          <div>not found page</div>
        )
      }
    ]
  },
  
])

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

const Foo = ({ domRect }: { domRect: DOMRect }) => {

  const style: React.CSSProperties = {
    position: 'absolute',
    zIndex: 999,
    opacity: 0,

    top: domRect.top,
    left: domRect.left,

    width: domRect.width,
    height: domRect.height,

    backgroundColor: 'red',
  }

  const children = (
    <div style={style}>
      Placeholder
    </div>
  )

  return ReactDOM.createPortal(
    children,
    document.body,
  )
}

export default App
