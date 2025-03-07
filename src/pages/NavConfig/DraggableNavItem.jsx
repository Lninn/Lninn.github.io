// 移除图标导入
import { Draggable } from '@hello-pangea/dnd';

const DraggableNavItem = ({ 
  item, 
  index, 
  level = 0, 
  onAddChild, 
  onEdit, 
  onToggleStatus, 
  onDelete 
}) => {
  return (
    <Draggable draggableId={`nav-item-${item.id}`} index={index}>
      {(provided) => (
        <li 
          className={`nav-config-item ${!item.is_enabled ? 'disabled' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="nav-config-item-content" style={{ paddingLeft: `${level * 20}px` }}>
            <div className="nav-config-item-drag" {...provided.dragHandleProps}>
              拖动
            </div>
            
            <div className="nav-config-item-info">
              <div className="nav-config-item-name">{item.name}</div>
              <div className="nav-config-item-path">{item.path}</div>
            </div>
            
            <div className="nav-config-item-actions">
              <button 
                className="nav-config-btn edit" 
                onClick={() => onEdit(item)}
                title="编辑"
              >
                编辑
              </button>
              
              <button 
                className="nav-config-btn" 
                onClick={() => onToggleStatus(item.id, item.is_enabled)}
                title={item.is_enabled ? "禁用" : "启用"}
              >
                {item.is_enabled ? "禁用" : "启用"}
              </button>
              
              <button 
                className="nav-config-btn delete" 
                onClick={() => onDelete(item.id)}
                title="删除"
                style={{ color: 'var(--error-color, #e53935)' }}
              >
                删除
              </button>
              
              <button 
                className="nav-config-btn add-child" 
                onClick={() => onAddChild(item.id)}
                title="添加子项"
              >
                添加
              </button>
            </div>
          </div>
          
          {/* 渲染子项部分保持不变 */}
          {item.children && item.children.length > 0 && (
            <ul className="nav-config-sublist">
              {item.children.map((child, childIndex) => (
                <DraggableNavItem
                  key={child.id}
                  item={child}
                  index={childIndex}
                  level={level + 1}
                  onAddChild={onAddChild}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default DraggableNavItem;
