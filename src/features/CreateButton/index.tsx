import './index.less'


const CreateButton = ({ onClick, }: { onClick: () => void }) => {
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

export default CreateButton
