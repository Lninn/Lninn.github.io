import { useEffect, useState } from 'react';
import './form-styles.css' // 确保样式被导入


const NavItemForm = ({ item, onSubmit, onCancel, availableIcons, availableComponents }) => {
  const [formData, setFormData] = useState(item || {
    name: '',
    path: '',
    icon: '',
    component: 'PlaceholderPage',
    parent_id: null,
    is_enabled: true,
    order_index: 0
  });
  
  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="nav-item-form">
      <div className="form-group">
        <label htmlFor="name">名称</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="导航项名称"
          required
        />
        <small>显示在导航菜单中的名称</small>
      </div>

      <div className="form-group">
        <label htmlFor="path">路径</label>
        <input
          type="text"
          id="path"
          name="path"
          value={formData.path}
          onChange={handleInputChange}
          placeholder="/example/path"
          required
        />
        <small>以斜杠开头的URL路径</small>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="icon">图标</label>
          <select
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
          >
            <option value="">无图标</option>
            {availableIcons.map(icon => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
          <small>导航项的图标</small>
        </div>

        <div className="form-group">
          <label htmlFor="component">组件</label>
          <select
            id="component"
            name="component"
            value={formData.component}
            onChange={handleInputChange}
            required
          >
            {availableComponents.map(comp => (
              <option key={comp.value} value={comp.value}>
                {comp.label}
              </option>
            ))}
          </select>
          <small>对应的页面组件</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="order_index">排序索引</label>
          <input
            type="number"
            id="order_index"
            name="order_index"
            value={formData.order_index}
            onChange={handleInputChange}
            min="0"
          />
          <small>数字越小排序越靠前</small>
        </div>

        <div className="form-group checkbox-group">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="is_enabled"
              name="is_enabled"
              checked={formData.is_enabled}
              onChange={handleInputChange}
            />
            <label htmlFor="is_enabled">启用</label>
          </div>
          <small>是否在导航菜单中显示</small>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          取消
        </button>
        <button type="submit" className="btn-submit">
          {item?.id ? '保存' : '添加'}
        </button>
      </div>
    </form>
  );
};

export default NavItemForm;
