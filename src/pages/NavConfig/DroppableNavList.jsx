import { Droppable } from '@hello-pangea/dnd';
import DraggableNavItem from './DraggableNavItem';

const DroppableNavList = ({ 
  items, 
  droppableId, 
  level = 0, 
  onAddChild, 
  onEdit, 
  onToggleStatus, 
  onDelete 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <Droppable droppableId={droppableId} type={`list-${level}`}>
      {(provided) => (
        <ul 
          className={`nav-config-list ${level > 0 ? 'nav-config-sublist' : ''}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (
            <li key={item.id} className="nav-config-item-wrapper">
              <DraggableNavItem
                item={item}
                index={index}
                level={level}
                onAddChild={onAddChild}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
              
              {/* 子项列表渲染 */}
              {item.children && item.children.length > 0 && (
                <DroppableNavList
                  items={item.children}
                  droppableId={`nav-list-${item.id}`}
                  level={level + 1}
                  onAddChild={onAddChild}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              )}
            </li>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DroppableNavList;
