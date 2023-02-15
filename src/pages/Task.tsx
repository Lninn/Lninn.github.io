import { CSSProperties, useEffect, useRef, useState } from 'react'
import { ITask } from './type'
import clsx from 'clsx'


interface IProps {
  title: string
  style: CSSProperties
  item: ITask
  onClick: () => void
  y: number
}

const Task = (props: IProps) => {
  const {
    y,
    item,
    title,
    style,
    onClick,
  } = props

  const taskRef = useRef<HTMLDivElement | null>(null)
  const [isClick, setIsClick] = useState(false)

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

  const handleClick = () => {
    onClick()
  }

  const cls = clsx(
    'task',
    { isClick }
  )

  const finalStyle: CSSProperties = {
    ...style,
    marginTop: y + 'px',
  }

  return (
    <div
      className={cls}
      style={finalStyle}
      onClick={handleClick}
      tabIndex={0}
      ref={taskRef}
    >
      <div className="task__header">
        <div>{item.status}</div>
        <div>Editing</div>
      </div>
      <div>
        
        {title}
      </div>
    </div>
  )
}

export default Task
