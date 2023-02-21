import clsx from "clsx"
import { useState } from "react"
import { IOption } from "../type"

import './StatusBar.less'


const STATUS_OPTIONS: Array<IOption> = [
  {
    label: 'ACTIVE',
    value: 'active',
  },
  {
    label: 'DONE',
    value: 'done',
  },
]

const StatusBar = () => {
  const [status, setStatus] = useState('active')

  return (
    <div className='statusBar'>
      {STATUS_OPTIONS.map(option => {
        const isActive = option.value === status

        const cls = clsx(
          'statusBar__item',
          { isActive }
        )

        return (
          <div 
            key={option.value}
            className={cls}
            onClick={() => setStatus(option.value)}
          >
            {option.label}
          </div>
        )
      })}
    </div>
  )
}

export default StatusBar
