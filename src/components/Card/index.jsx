import './styles.css';

/**
 * 卡片组件
 * @param {Object} props
 * @param {string|ReactNode} props.title - 卡片标题
 * @param {ReactNode} props.children - 卡片内容
 * @param {string} props.className - 额外的类名
 * @param {ReactNode} props.extra - 卡片右上角的额外内容
 * @param {string} props.size - 卡片大小，可选值: 'default', 'small'
 * @param {boolean} props.bordered - 是否有边框
 */
const Card = ({ 
  title, 
  children, 
  className = '', 
  extra,
  size = 'default',
  bordered = true
}) => {
  return (
    <div 
      className={`card ${size} ${bordered ? 'bordered' : ''} ${className}`}
    >
      {(title || extra) && (
        <div className="card-header">
          {title && <div className="card-title">{title}</div>}
          {extra && <div className="card-extra">{extra}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;