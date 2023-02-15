import './App.less'
import { TaskList } from './pages'
import Event from './pages/Event'

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="App">
        <Event />
      </div>
    ),
  },
  {
    path: '/list',
    element: (
      <div className="App">
        <TaskList />
      </div>
    ),
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
