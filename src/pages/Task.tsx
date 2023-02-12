import { CSSProperties, useState } from 'react'
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

  const [isClick, setIsClick] = useState(false)

  const handleClick = () => {
    onClick()

    setIsClick(true)
  }

  const cls = clsx(
    'task',
    { isClick }
  )

  const ty = isClick ? y + (-50) : y

  const finalStyle: CSSProperties = {
    ...style,
    transform: `translateY(${ty}px)`,
  }

  return (
    <div
      className={cls}
      style={finalStyle}
      onClick={handleClick}
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
