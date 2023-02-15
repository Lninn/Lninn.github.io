import './Card.less'

import { useNavigate } from 'react-router-dom'


interface CardProps {
  title: string
  bgColor: string
}

const Card = ({ title, bgColor }: CardProps) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/list')
  }

  return (
    <div
      className='card'
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >
      <div className='left'>
        <div className='time'>
          <div className='hour'>
            11
          </div>
          <div className='minute'>
            30
          </div>
        </div>

        <div className='line'></div>

        <div className='time'>
          <div className='hour'>
            11
          </div>
          <div className='minute'>
            30
          </div>
        </div>
      </div>

      <div className='card__content'>
        {title}

        <div className='footer'>
          <div>NANA</div>
          <div>ALEX</div>
          <div>MARk</div>
        </div>
      </div>
    </div>
  )
}

export default Card
