import { FiMenu } from 'react-icons/fi';
import './mobile-styles.css';

const MobileNavPlaceholder = () => {
  const handleClick = () => {
    alert('移动端导航功能正在开发中，敬请期待！');
  };

  return (
    <div className="mobile-nav-placeholder">
      <button 
        className="mobile-menu-button" 
        onClick={handleClick}
        aria-label="移动端菜单"
      >
        <FiMenu />
      </button>
    </div>
  );
};

export default MobileNavPlaceholder;