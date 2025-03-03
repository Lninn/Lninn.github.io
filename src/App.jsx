import { Suspense, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Article from './Article'
import Bookmark from './Bookmark'
import AppNav from './Nav'


const compoentMap = {
  'bookmark': Bookmark,
  'log': Article,
}

function App() {

  const [path, setPath] = useState('bookmark')

  const Component = compoentMap[path]

  return (
    <>
      <AppNav activePath={path} onChange={setPath} />

      <Suspense fallback={<div>Loading component...</div>}>
        <Component />
      </Suspense>

      <p>power by Deepseek</p>
    </>
  )
}

export default App
