import './index.css'
import ExampleComponent from './Modal/ExampleComponent'
import ConfirmDialog from './Modal/ConfirmDialog'
import { kml } from '@tmcw/togeojson'
import MapComponent from '#/utils/MapContainer'
import { useState } from 'react'

export default function ComponentDemo() {

  const [polylinePath, setPolylinePath] = useState(null)
  
  async function test(file) {
    const xmlText = await getTextFromFile(file)
    
    const result = getGeometryInfo(xmlText)

    const features = result.features
    const featureWithPoints = features[2]
    const geometry = featureWithPoints.geometry
    const coordinates = geometry.coordinates

    const newPath = coordinates.map(point => {
      return (
        [
          point[0], point[1]
        ]
      )
    })
    setPolylinePath(newPath)
  }

  function getGeometryInfo(text) {
    return kml(new DOMParser().parseFromString(text, "text/xml"))
  }

  function getTextFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.onload = () => {
        const text = reader.result
        resolve(text)
      }
    })
  }

  return (
    <div className="component-demo">
      
      <p>
        <input type="file" onChange={e => {
          const files = e.target.files
          if (files.length <= 0) return

          test(files[0])
        }} />
      </p>

      <MapComponent polylinePath={polylinePath} />

      <h1>组件演示</h1>
      <p>这里是组件演示页面，你可以在这里预览和测试各个组件。</p>

      <h3>使用示例</h3>
      <ExampleComponent />

      <h3>确认对话框</h3>
      <ConfirmDialog />
    </div>
  )
}
