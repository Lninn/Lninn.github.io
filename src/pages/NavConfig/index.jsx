import { useState, useEffect } from 'react'
// 将这行
import { DragDropContext } from '@hello-pangea/dnd';
import { 
  fetchNavigationItems, 
  createNavigationItem, 
  updateNavigationItem, 
  deleteNavigationItem, 
  toggleNavigationItemStatus,
  updateNavigationOrder
} from '#/api/navigationApi'
import { DEFAULT_ICONS_OPTIONS, DEFAULT_COMPONENTS_OPTIONS } from '#/config/nav-shared'
import PageContainer from '#/components/PageContainer'
import Modal from '#/components/Modal'
import { FiPlus } from 'react-icons/fi'
import DroppableNavList from './DroppableNavList'
import NavItemForm from './NavItemForm' // 导入表单组件
import './styles.css'


const NavConfigPage = () => {
  const [navItems, setNavItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [formMode, setFormMode] = useState('add') // 'add' or 'edit'
  const [availableIcons, setAvailableIcons] = useState([])
  const [availableComponents, setAvailableComponents] = useState([])

  // 加载导航项
  const loadNavItems = async () => {
    setLoading(true)
    try {
      const items = await fetchNavigationItems(true) // 包括禁用的项
      setNavItems(items)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 加载可用的图标和组件
  const loadAvailableOptions = async () => {
    // 实际项目中，这些数据可能来自API
    setAvailableIcons(DEFAULT_ICONS_OPTIONS)
    
    setAvailableComponents(DEFAULT_COMPONENTS_OPTIONS)
  }

  useEffect(() => {
    loadNavItems()
    loadAvailableOptions()
  }, [])

  // 打开添加模态框
  const handleAddItem = (parentId = null) => {
    setCurrentItem({
      name: '',
      path: '',
      icon: '',
      component: 'PlaceholderPage',
      parent_id: parentId,
      is_enabled: true,
      order_index: navItems.length
    })
    setFormMode('add')
    setShowModal(true)
  }

  // 打开编辑模态框
  const handleEditItem = (item) => {
    setCurrentItem({...item})
    setFormMode('edit')
    setShowModal(true)
  }

  // 处理表单提交
  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'add') {
        await createNavigationItem(formData)
      } else {
        await updateNavigationItem(formData.id, formData)
      }
      
      setShowModal(false)
      loadNavItems() // 重新加载数据
    } catch (err) {
      setError(err.message)
    }
  }

  // 处理删除
  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除此导航项吗？')) return
    
    try {
      await deleteNavigationItem(id)
      loadNavItems() // 重新加载数据
    } catch (err) {
      setError(err.message)
      alert(err.message)
    }
  }

  // 处理启用/禁用
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleNavigationItemStatus(id, !currentStatus)
      loadNavItems() // 重新加载数据
    } catch (err) {
      setError(err.message)
    }
  }

  // 处理拖拽结束
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    
    // 如果没有目标位置或者位置没有变化，则不做任何处理
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // 获取被拖拽的项目ID
    const itemId = draggableId.replace('nav-item-', '');
    
    // 创建新的排序数据
    const reorderedItems = reorderNavItems(
      navItems,
      source,
      destination,
      itemId
    );
    
    // 更新本地状态
    setNavItems(reorderedItems);
    
    // 将更新发送到服务器
    try {
      // 将树形结构转换为扁平结构，包含新的顺序信息
      const flatItems = flattenNavItems(reorderedItems);
      await updateNavigationOrder(flatItems);
    } catch (err) {
      setError(err.message);
      // 如果更新失败，重新加载原始数据
      loadNavItems();
    }
  };

  // 重新排序导航项
  const reorderNavItems = (items, source, destination, itemId) => {
    // 如果是同一个容器内的拖拽，使用简单的数组操作
    if (source.droppableId === destination.droppableId) {
      const result = [...items];
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);
      
      // 更新顺序索引
      result.forEach((item, index) => {
        item.order_index = index;
      });
      
      return result;
    } 
    
    // 不同容器之间的拖拽（例如从一个父项到另一个父项）
    // 这里需要使用 itemId 来找到被拖拽的项目
    // 移除未使用的变量 sourceParentId
    const destParentId = destination.droppableId.replace('nav-list-', '');
    
    // 创建新的数据结构
    const newItems = JSON.parse(JSON.stringify(items));
    
    // 查找并移除源项目
    const draggedItem = findAndRemoveItem(newItems, itemId);
    if (!draggedItem) return items; // 如果找不到项目，返回原始数组
    
    // 更新拖拽项的父ID
    draggedItem.parent_id = destParentId === 'root' ? null : parseInt(destParentId);
    
    // 将项目添加到目标位置
    if (destParentId === 'root') {
      // 添加到根级别
      newItems.splice(destination.index, 0, draggedItem);
    } else {
      // 添加到特定父项的子项中
      const destParent = findItemById(newItems, parseInt(destParentId));
      if (destParent) {
        if (!destParent.children) destParent.children = [];
        destParent.children.splice(destination.index, 0, draggedItem);
      }
    }
    
    // 更新所有项目的顺序索引
    updateOrderIndices(newItems);
    
    return newItems;
  };

  // 在树形结构中查找并移除项目
  const findAndRemoveItem = (items, itemId) => {
    const id = parseInt(itemId);
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        // 找到项目，从数组中移除
        const [removedItem] = items.splice(i, 1);
        return removedItem;
      }
      
      // 递归检查子项
      if (items[i].children && items[i].children.length > 0) {
        const found = findAndRemoveItem(items[i].children, itemId);
        if (found) return found;
      }
    }
    
    return null;
  };

  // 在树形结构中查找项目
  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      
      if (item.children && item.children.length > 0) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    
    return null;
  };

  // 更新所有项目的顺序索引
  const updateOrderIndices = (items) => {
    items.forEach((item, index) => {
      item.order_index = index;
      
      if (item.children && item.children.length > 0) {
        updateOrderIndices(item.children);
      }
    });
  };

  // 将树形结构扁平化，用于发送到服务器
  const flattenNavItems = (items, result = []) => {
    items.forEach((item, index) => {
      const flatItem = {
        id: item.id,
        order_index: index
      };
      result.push(flatItem);
      
      if (item.children && item.children.length > 0) {
        flattenNavItems(item.children, result);
      }
    });
    
    return result;
  };

  return (
    <PageContainer>
      <div className="nav-config-page">
        <div className="nav-config-header">
          <h1>导航配置</h1>
          <button 
            className="nav-config-add-btn"
            onClick={() => handleAddItem()}
          >
            <FiPlus size={18} />
            添加导航项
          </button>
        </div>

        {error && (
          <div className="nav-config-error">
            {error}
            <button onClick={() => setError(null)}>关闭</button>
          </div>
        )}

        {loading ? (
          <div className="nav-config-loading">加载中...</div>
        ) : navItems.length === 0 ? (
          <div className="nav-config-empty">
            <p>暂无导航项</p>
            <button onClick={() => handleAddItem()}>添加导航项</button>
          </div>
        ) : (
          <div className="nav-config-container">
            <DragDropContext onDragEnd={handleDragEnd}>
              <DroppableNavList
                items={navItems}
                droppableId="root"
                onAddChild={handleAddItem}
                onEdit={handleEditItem}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            </DragDropContext>
          </div>
        )}

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={formMode === 'add' ? '添加导航项' : '编辑导航项'}
            size="md"
          >
            <NavItemForm 
              item={currentItem}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowModal(false)}
              availableIcons={availableIcons}
              availableComponents={availableComponents}
            />
          </Modal>
        )}
      </div>
    </PageContainer>
  )
}

export default NavConfigPage
