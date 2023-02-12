import { useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'

// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

import './DatePanel.less'


const current = dayjs()
const dayOfWeek = current.format('dddd')
const dateOfMonth = current.format('D')

const dateList = [
  dateOfMonth,
  '13',
  '14',
  '15',
  '16',
]


const DatePanel = () => {
  const [activeDate, setActiveDate] = useState(dateOfMonth)

  return (
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
  )
}

export default DatePanel
