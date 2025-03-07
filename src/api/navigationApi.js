import { supabase } from '#/supabaseClient'
import { DEFAULT_ICONS_MAP, DEFAULT_COMPONENTS_MAP } from '#/config/nav-shared'
import { SubPageWrapper } from '#/config/routes'
import { lazy } from 'react'


// 获取所有导航项
export const fetchNavigationItems = async (includeDisabled = false) => {
  let query = supabase
    .from('navigation_items')
    .select('*')
    .order('order_index')
  
  if (!includeDisabled) {
    query = query.eq('is_enabled', true)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching navigation items:', error)
    throw error
  }
  
  // 将扁平结构转换为树形结构
  return buildNavigationTree(data)
}

// 获取单个导航项
export const fetchNavigationItem = async (id) => {
  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Error fetching navigation item with id ${id}:`, error)
    throw error
  }
  
  return data
}

// 创建导航项
export const createNavigationItem = async (navigationItem) => {
  const { data, error } = await supabase
    .from('navigation_items')
    .insert([navigationItem])
    .select()
  
  if (error) {
    console.error('Error creating navigation item:', error)
    throw error
  }
  
  return data[0]
}

// 更新导航项
export const updateNavigationItem = async (id, updates) => {
  // 不需要更新 children
  delete updates.children

  const { data, error } = await supabase
    .from('navigation_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error(`Error updating navigation item with id ${id}:`, error)
    throw error
  }
  
  return data[0]
}

// 删除导航项
export const deleteNavigationItem = async (id) => {
  // 首先检查是否有子项
  const { data: children } = await supabase
    .from('navigation_items')
    .select('id')
    .eq('parent_id', id)
  
  if (children && children.length > 0) {
    throw new Error('Cannot delete navigation item with children. Delete children first or update them.')
  }
  
  const { error } = await supabase
    .from('navigation_items')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error(`Error deleting navigation item with id ${id}:`, error)
    throw error
  }
  
  return true
}

// 启用/禁用导航项
export const toggleNavigationItemStatus = async (id, isEnabled) => {
  const { data, error } = await supabase
    .from('navigation_items')
    .update({
      is_enabled: isEnabled,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error(`Error toggling status for navigation item with id ${id}:`, error)
    throw error
  }
  
  return data[0]
}

// 更新导航项顺序
export const updateNavigationOrder = async (items) => {
  // 使用事务确保所有更新都成功或都失败
  const { error } = await supabase.rpc('update_navigation_order', {
    items_array: items
  })
  
  if (error) {
    console.error('Error updating navigation order:', error)
    throw error
  }
  
  return true
}

// 辅助函数：将扁平结构转换为树形结构
const buildNavigationTree = (items) => {
  const itemMap = {}
  const rootItems = []
  
  // 首先创建一个以ID为键的映射
  items.forEach(item => {
    itemMap[item.id] = {
      ...item,
      children: []
    }
  })
  
  // 然后构建树
  items.forEach(item => {
    if (item.parent_id === null) {
      rootItems.push(itemMap[item.id])
    } else {
      if (itemMap[item.parent_id]) {
        itemMap[item.parent_id].children.push(itemMap[item.id])
      }
    }
  })
  
  return rootItems
}

// 将数据库格式转换为前端路由格式
export const convertToRouteConfig = async (includeDisabled = false) => {
  const navItems = await fetchNavigationItems(includeDisabled)
  
  const mapItemToRoute = (item) => {
    // 当前 item 的children有值，且 parent_id 为空，说明是子级路由
    const isSubRoute = item.children && item.children.length > 0 && item.parent_id === null
    const route = {
      name: item.name,
      path: item.path,
      icon: item.icon ? dynamicImportIcon(item.icon) : null,
      component: isSubRoute ? SubPageWrapper : dynamicImportComponent(item.component),
    }
    
    if (item.children && item.children.length > 0) {
      route.children = item.children.map(mapItemToRoute)
    }
    
    return route
  }

  return navItems.map(mapItemToRoute)
}

// 动态导入图标组件
const dynamicImportIcon = (iconName) => {
  // 这里需要根据实际情况实现动态导入
  // 简化示例，实际实现可能需要更复杂的逻辑
  // const iconMap = {
  //   'BsBookmark': () => import('react-icons/bs').then(mod => mod.BsBookmark),
  // }

  return DEFAULT_ICONS_MAP[iconName] || null
}

// 动态导入页面组件
const dynamicImportComponent = (componentPath) => {
  const c = DEFAULT_COMPONENTS_MAP[componentPath]
  // console.log('debug-dynamicImportComponent', {  componentPath, c })
  // 这里需要根据实际情况实现动态导入
  // 简化示例，实际实现可能需要更复杂的逻辑
  // const componentMap = {
  //   'test': lazy(() => import('#/pages/NavConfig')),
  // }
  
  return c || lazy(() => import('#/pages/PlaceholderPage'))
}
