import plusImg from '../assets/plus.svg'
import manImg from '../assets/man.png'

import './Header.less'


const Header = () => {
  return (
    <div className='header'>
      <div className='avatar'>
        <img  className='avatar__img' src={manImg} alt='avatar' />
      </div>

      <div className='menu'>
        <img className='icon' src={plusImg} alt='' />
      </div>
    </div>
   )
}

export default Header
