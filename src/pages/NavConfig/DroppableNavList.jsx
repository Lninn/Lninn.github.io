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
            <div key={item.id}>
              <DraggableNavItem
                item={item}
                index={index}
                level={level}
                onAddChild={onAddChild}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
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
              {provided.placeholder}
            </div>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DroppableNavList;