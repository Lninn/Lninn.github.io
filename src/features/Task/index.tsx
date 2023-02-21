import clsx from 'clsx'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useApp } from '../../AppCtx'
import Radio from '../../components/Radio'
import { ITask } from '../../pages/type'
import penSvg from '../../assets/pen.svg'

import './index.less'


interface IProps {
  title: string
  style: CSSProperties
  item: ITask
  y: number
  onCheck: (checked: boolean) => void
}

const Task = (props: IProps) => {
  const {
    y,
    item,
    title,
    style,
    onCheck,
  } = props

  const taskRef = useRef<HTMLDivElement | null>(null)
  const [isClick, setIsClick] = useState(false)

  const [status, setStatus] = useState<boolean>(false)

  const { patch } = useApp()

  useEffect(() => {
    const element = taskRef.current
    if (!element) return

    const handleElementFocusIn = () => {
      setIsClick(true)
    }
    const handleElementFocusOut = () => {
      setIsClick(false)
    }

    element.addEventListener('focusin', handleElementFocusIn)
    element.addEventListener('focusout', handleElementFocusOut)

    return () => {
      element.removeEventListener('focusin', handleElementFocusIn)
      element.removeEventListener('focusout', handleElementFocusOut)
    }
  }, [])

  const cls = clsx(
    'task',
    { isClick },
    { isEdit: status }
  )

  const finalStyle: CSSProperties = {
    ...style,
    marginTop: y + 'px',
  }

  const handleEditClick = () => {
    
    setStatus(!status)
    
    const element = taskRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    patch(rect)
  }

  const checked = item.status === 'done'

  return (
    <div
      className={cls}
      style={finalStyle}
      tabIndex={0}
      ref={taskRef}
    >
      <div className="task__header">
        <Radio
          checked={checked}
          onChange={onCheck}
        />

        <img
          className='task__header__editIcon'
          src={penSvg}
          alt=''
          onClick={handleEditClick}
        />
      </div>
      <div>
        {title}
      </div>
    </div>
  )
}

export default Task
