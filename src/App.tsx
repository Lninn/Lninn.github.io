import { useState } from 'react'

import Card from './components/Card'
import Header from './components/Header'

import * as dayjs from 'dayjs'

import clsx from 'clsx'

// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

import './App.less'


const COLORS = [
  '#bcef4b',
  '#fef752',
  '#1f1f1f',
  '#b32580',
  '#ffffff',
  '#9d6bce',
]

const dayOfWeek = dayjs().format('dddd')
const dateOfMonth = dayjs().format('D')

const dateList = [
  dateOfMonth,
  '13',
  '14',
  '15',
  '16',
]

function App() {

  const [activeDate, setActiveDate] = useState(dateOfMonth)

  return (
    <div className="App">

     <Header />

     <div className='panel'>
        <div className='datetime'>
            <div className='dayOfWeek'>
              {dayOfWeek}
            </div>
            <div className='dateOfMonth'>
              {dateOfMonth}
            </div>
        </div>

        <div className="panel__list">
          {dateList.map(date => {
            const handleClick = () => {
              setActiveDate(date)
            }
            const cls = clsx(
              'panel__list__item',
              { active: date === activeDate }
            )
            const label = date === dateOfMonth ? 'TODAY' : date

            return (
              <div key={date} className={cls} onClick={handleClick}>
                {label}
              </div>
            )
          })}
        </div>
     </div>

      <Card title='DESIGN MEETING' bgColor={COLORS[0]} />
      <Card title='DAILY PROJECT' bgColor={COLORS[1]} />
      <Card title='WEEKLY PLANING' bgColor={COLORS[4]} />
    </div>
  )
}

export default App
