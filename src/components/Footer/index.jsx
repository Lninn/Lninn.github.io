import './index.css';
import { NavLink } from 'react-router-dom';
import useRoutesStore from '#/store/routes'

function Footer() {
  const currentYear = new Date().getFullYear();
  const { routes } = useRoutesStore();

  // 过滤出主导航项
  const mainNavItems = routes.filter(route => 
    !route.path.includes('*') && !route.hidden
  );

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo">
            <h3>Lninn</h3>
            <p className="footer-slogan">探索、创造、分享</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>导航</h4>
              <ul>
                {mainNavItems.map(route => (
                  <li key={route.path}>
                    <NavLink to={route.path}>{route.name}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>资源</h4>
              <ul>
                <li><a href="https://github.com/Lninn" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a></li>
                <li><a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Supabase</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} Lninn. All rights reserved.</p>
          <p className="powered-by">Powered by <span className="highlight">Deepseek</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
