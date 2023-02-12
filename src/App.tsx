import Card from './components/Card'
import Header from './components/Header'

import './App.less'


const COLORS = [
  '#bcef4b',
  '#fef752',
  '#1f1f1f',
  '#b32580',
  '#ffffff',
  '#9d6bce',
]

function App() {
  return (
    <div className="App">

     <Header />

      <Card title='DESIGN MEETING' bgColor={COLORS[0]} />
      <Card title='DAILY PROJECT' bgColor={COLORS[1]} />
      <Card title='WEEKLY PLANING' bgColor={COLORS[4]} />
    </div>
  )
}

export default App
