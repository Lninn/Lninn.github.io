import { lazy } from 'react';
import { lazyWithDelay } from '#/utils/lazyWithDelay'


/**
 * 加载页面组件
 * @param {number} delay 延迟加载时间（毫秒）
 * @returns {Object} 组件映射对象
 */
export function loadPageComponents(delay = 0) {
  const hasDelay = typeof delay === 'number' && delay > 0 ;

  const pageModules = import.meta.glob('/src/pages/**/index.jsx');
  const components = {};
  
  // 处理标准页面组件
  for (const path in pageModules) {
    if (path.includes('/components/') || path.includes('/modules/')) {
      continue;
    }
    // 从路径中提取组件名称
    const pathParts = path.split('/');
    const componentName = pathParts[pathParts.length - 2];
    
    // 格式化组件名称
    const formattedName = componentName.endsWith('Page') 
      ? componentName 
      : `${componentName}Page`;
    
    // 创建懒加载组件
    const value = pageModules[path];
    components[formattedName] = hasDelay ? lazyWithDelay(value, delay) : lazy(value);
  }

  // 处理特殊组件（非index.jsx文件）
  const allModules = import.meta.glob('/src/pages/**/*.jsx');
  
  for (const path in allModules) {
    // 跳过 index.jsx 文件和组件内部文件
    if (path.endsWith('/index.jsx') || path.includes('/components/') || path.includes('/modules/')) {
      continue;
    }
    
    // 从路径中提取文件名（不含扩展名）
    const fileName = path.split('/').pop().replace('.jsx', '');
    
    // 只处理以Page结尾的文件
    if (fileName.endsWith('Page')) {
      const value = allModules[path]
      components[fileName] = hasDelay? lazyWithDelay(value, delay) : lazy(value);
    }
  }
  
  return components;
}

/**
 * 创建选项数组
 * @param {Object} map 组件映射对象
 * @returns {Array} 选项数组
 */
export function createComponentOptions(map) {
  return Object.keys(map).map(key => ({
    label: key,
    value: key
  }));
}
