// 改为
import { Draggable } from '@hello-pangea/dnd';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiEyeOff, FiMove } from 'react-icons/fi';

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
              <FiMove />
            </div>
            <div className="nav-config-item-info">
              <div className="nav-config-item-name">{item.name}</div>
              <div className="nav-config-item-path">{item.path}</div>
            </div>
            <div className="nav-config-item-actions">
              <button 
                className="nav-config-btn add-child" 
                onClick={() => onAddChild(item.id)}
                title="添加子项"
              >
                <FiPlus />
              </button>
              <button 
                className="nav-config-btn edit" 
                onClick={() => onEdit(item)}
                title="编辑"
              >
                <FiEdit />
              </button>
              <button 
                className="nav-config-btn toggle" 
                onClick={() => onToggleStatus(item.id, item.is_enabled)}
                title={item.is_enabled ? "禁用" : "启用"}
              >
                {item.is_enabled ? <FiEyeOff /> : <FiEye />}
              </button>
              <button 
                className="nav-config-btn delete" 
                onClick={() => onDelete(item.id)}
                title="删除"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default DraggableNavItem;
