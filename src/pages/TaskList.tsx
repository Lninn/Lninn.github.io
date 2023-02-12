import { CSSProperties, useState } from 'react'
import { COLORS } from '../constant'
import Task from './Task'
import { ITask } from './type'

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

const StatusBar = () => {
  return (
    <div className='statusBar'>
      <div className='statusBar_item'>ACTIVE</div>
      <div className='statusBar_item'>DONE</div>
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
          backgroundColor: item.bgColor
        }

        const handleClick = () => {
          const newList = getTaskList(item)
          onChange(newList)
        }

        return (
          <Task
            key={idx}
            title={item.title}
            style={style}
            item={item}
            onClick={handleClick}
            y={-65 * idx}
          />
        )
      })}
    </div>
  )
}

const Create = () => {
  return (
    <div className='newTask'>
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
  
  const [taskList, setTaskList] = useState(LIST)

  return (
    <div className='page'>
      <Header />
      <div className='title'>
        TASKS
      </div>
      <StatusBar />
      <TaskList list={taskList} onChange={setTaskList} />
      <Create />
    </div>
  )
}

export default Page
