import { CSSProperties, useState } from 'react'
import { COLORS } from '../constant'
import Task from './Task'
import { ITask } from './type'
import clsx from 'clsx'
import Modal from '../components/Modal'

import './TaskList.less'


const LIST: ITask[] = [
  {
    id: 1,
    title: 'SET UP A VIDEO CONFERENCE',
    bgColor: COLORS[0],
    status: 'active',
  },
  {
    id: 2,
    title: 'SET UP A VIDEO CONFERENCE',
    bgColor: COLORS[1],
    status: 'active',
  },
  {
    id: 3,
    title: 'SET UP A VIDEO CONFERENCE',
    bgColor: COLORS[3],
    status: 'active',
  },
  {
    id: 4,
    title: 'SET UP A VIDEO CONFERENCE',
    bgColor: COLORS[4],
    status: 'active',
  },
  {
    id: 5,
    title: 'SET UP A VIDEO CONFERENCE',
    bgColor: COLORS[1],
    status: 'active',
  },
]

interface IOption {
  label: string
  value: string
}

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

interface IProps {
  list: ITask[]
  onChange: (list: ITask[]) => void
}

const TaskList = ({
  list,
  onChange,
}: IProps) => {
  const getTaskList = (item: ITask): ITask[] => {
    return list.map(task => {
      if (item.id === task.id) {
        return {
          ...task,
          status: task.status === 'active' ? 'done' : 'active',
        }
      } else {
        return task
      }
    })
  }

  return (
    <div className='taskList'>
      {list.map((item, idx) => {
        const style: CSSProperties = {
          backgroundColor: item.bgColor,
          zIndex: idx,
        }

        const handleCheck = () => {
          const newList = getTaskList(item)
          onChange(newList)
        }

        return (
          <Task
            key={idx}
            title={item.title}
            style={style}
            item={item}
            onCheck={handleCheck}
            y={idx == 0 ? 0 : -155}
          />
        )
      })}
    </div>
  )
}

const Create = ({ onClick, }: { onClick: () => void }) => {
  return (
    <div className='newTask' onClick={onClick}>
      <div className='newTask__label'>
        CREATE SUBTASK
      </div>
      <div className='newTask__btn'>
        +
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div className='listHeader'>
      <div className='listHeader__btn'>
        Exit
      </div>
      <div className='listHeader__label'>
        2/15
      </div>
    </div>
  )
}

const Page = () => {
 
  const [visible, setVisible] = useState(false)
  const [taskList, setTaskList] = useState(LIST)

  const onClose = () => {
    setVisible(false)
  }

  const handleAdd = () => {
    setVisible(true)
  }

  return (
    <div className='page'>
      <Header />
      <div className='title'>
        TASKS
      </div>
      <StatusBar />
      <TaskList list={taskList} onChange={setTaskList} />
      <Create onClick={handleAdd} />
      <Modal visible={visible} onClose={onClose} >

        <button onClick={onClose}>
          关闭
        </button>
        
        asdasda asdasd
        asdasda asdasd
        asdasda asdasd
      </Modal>
    </div>
  )
}

export default Page
