import { CSSProperties, useState } from 'react'
import { COLORS } from '../constant'
import { ITask } from './type'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router-dom'
import arrowLeft from '../assets/arrowLeft.svg'
import { CreateButton, Task, TaskForm } from '../features'
import StatusBar from './StatusBar'

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

const Page = () => {
 
  const [visible, setVisible] = useState(false)
  const [taskList, setTaskList] = useState(LIST)

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  const onClose = () => {
    setVisible(false)
  }

  const handleAdd = () => {
    setVisible(true)
  }

  return (
    <div className='page'>
      <div className='listHeader'>
        <div
          className='listHeader__btn'
          onClick={handleClick}
        >
          <img className='listHeader__icon' src={arrowLeft} />
        </div>
        <div className='listHeader__label'>
          2/15
        </div>
      </div>

      <div className='title'>
        TASKS
      </div>
      <StatusBar />
      <TaskList list={taskList} onChange={setTaskList} />
      <CreateButton onClick={handleAdd} />
      <Modal visible={visible} onClose={onClose} >
        <TaskForm />
      </Modal>
    </div>
  )
}

export default Page
