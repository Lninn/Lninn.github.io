import './index.css'
import ExampleComponent from './Modal/ExampleComponent'
import ConfirmDialog from './Modal/ConfirmDialog'
import SelectDemo from './SelectDemo'

export default function ComponentDemo() {
  return (
    <div className="component-demo">
      <h3>Select 组件</h3>
      <SelectDemo />

      <h1>组件演示</h1>
      <p>这里是组件演示页面，你可以在这里预览和测试各个组件。</p>

      <h3>使用示例</h3>
      <ExampleComponent />

      <h3>确认对话框</h3>
      <ConfirmDialog />
    </div>
  )
}
