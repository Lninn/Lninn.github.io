import './Card.less'


interface CardProps {
  title: string
  bgColor: string
}

const Card = ({ title, bgColor }: CardProps) => {
  return (
    <div className='card' style={{ backgroundColor: bgColor }}>
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
