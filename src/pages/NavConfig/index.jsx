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
import PageContainer from '#/components/PageContainer'
import Modal from '#/components/Modal'
import { FiPlus } from 'react-icons/fi'
import DroppableNavList from './DroppableNavList'
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
    setAvailableIcons([
      { value: 'BsBookmark', label: 'Bookmark' },
      { value: 'BsFileText', label: 'File Text' },
      { value: 'BsGear', label: 'Gear' },
      { value: 'BsFlower1', label: 'Flower' },
      { value: 'MdDashboard', label: 'Dashboard' },
      { value: 'VscError', label: 'Error' },
      { value: 'HiOutlinePuzzle', label: 'Puzzle' }
    ])
    
    setAvailableComponents([
      { value: 'BookmarkPage', label: '收藏夹页面' },
      { value: 'ArticlePage', label: '文章页面' },
      { value: 'DashboardPage', label: '数据概览页面' },
      { value: 'ErrorLogsPage', label: '错误日志页面' },
      { value: 'ComponentDemoPage', label: '组件演示页面' },
      { value: 'PlaceholderPage', label: '占位页面' }
    ])
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (formMode === 'add') {
        await createNavigationItem(currentItem)
      } else {
        await updateNavigationItem(currentItem.id, currentItem)
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

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentItem({
      ...currentItem,
      [name]: type === 'checkbox' ? checked : value
    })
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
          <h1>导航配置管理</h1>
          <button 
            className="nav-config-add-btn" 
            onClick={() => handleAddItem()}
          >
            <FiPlus /> 添加导航项
          </button>
        </div>

        {error && (
          <div className="nav-config-error">
            <p>加载出错: {error}</p>
            <button onClick={loadNavItems}>重试</button>
          </div>
        )}

        {loading ? (
          <div className="nav-config-loading">加载中...</div>
        ) : (
          <div className="nav-config-container">
            {navItems.length === 0 ? (
              <div className="nav-config-empty">
                <p>暂无导航项</p>
                <button onClick={() => handleAddItem()}>添加第一个导航项</button>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <DroppableNavList
                  items={navItems}
                  droppableId="nav-list-root"
                  onAddChild={handleAddItem}
                  onEdit={handleEditItem}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                />
              </DragDropContext>
            )}
          </div>
        )}

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={formMode === 'add' ? '添加导航项' : '编辑导航项'}
            size="md"
          >
            <form onSubmit={handleSubmit} className="nav-config-form">
              <div className="form-group">
                <label htmlFor="name">名称</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentItem.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="path">路径</label>
                <input
                  type="text"
                  id="path"
                  name="path"
                  value={currentItem.path}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">图标</label>
                <select
                  id="icon"
                  name="icon"
                  value={currentItem.icon}
                  onChange={handleInputChange}
                >
                  <option value="">无图标</option>
                  {availableIcons.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="component">组件</label>
                <select
                  id="component"
                  name="component"
                  value={currentItem.component}
                  onChange={handleInputChange}
                  required
                >
                  {availableComponents.map(comp => (
                    <option key={comp.value} value={comp.value}>
                      {comp.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="order_index">排序索引</label>
                <input
                  type="number"
                  id="order_index"
                  name="order_index"
                  value={currentItem.order_index}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="is_enabled"
                  name="is_enabled"
                  checked={currentItem.is_enabled}
                  onChange={handleInputChange}
                />
                <label htmlFor="is_enabled">启用</label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  取消
                </button>
                <button type="submit" className="primary">
                  {formMode === 'add' ? '添加' : '保存'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </PageContainer>
  )
}

export default NavConfigPage