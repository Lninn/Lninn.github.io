import './index.less'


const TaskForm = () => {
  return (
    <div className="form">

      <div className='form-title'>
        New Task Todo
      </div>

      <div className='field'>
        <div className='field__title'>
          Task Title
        </div>
        <input
          className='field__input'
          placeholder='Add a task title'
        />
      </div>

      <div className='field'>
        <div className='field__title'>
          Task Description
        </div>
        <div
          contentEditable
          className='field__input textarea'
          placeholder='Add a task title'
        />
      </div>

      <div className='btn'>
        <button className='cancel'>Cancel</button>
        <button className='confirm'>Confirm</button>
      </div>

    </div>
  )
}

export default TaskForm
