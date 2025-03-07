import { FiMenu } from 'react-icons/fi';
import './styles.css';

const MobileNav = () => {
  const handleClick = () => {
    alert('移动端导航功能正在开发中，敬请期待！');
  };

  return (
    <div className="mobile-nav">
      <button 
        className="mobile-nav-button" 
        onClick={handleClick}
        aria-label="移动端菜单"
      >
        <FiMenu />
      </button>
    </div>
  );
};

export default MobileNav;