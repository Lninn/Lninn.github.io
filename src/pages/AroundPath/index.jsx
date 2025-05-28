import Modal from '#/components/Modal'
import { useRef, useState } from 'react'
import { kml } from '@tmcw/togeojson'
import MapComponent from './MapContainer'
import './index.css'


export default function AroundPath() {
  const [importOpen, setImportOpen] = useState(false)
  const [polylinePath, setPolylinePath] = useState(null)
  const [filename, setFilename] = useState()

  const selectedFileRef = useRef(null)

  function openImportDialog() {
    setImportOpen(true)
  }

  async function handleFile(file) {
    const xmlText = await getTextFromFile(file)
    
    const result = getGeometryInfo(xmlText)
    const name = file.name

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
    setFilename(name)
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

  function onFileChange(e) {
    const files = e.target.files
    if (files.length <= 0) return

    selectedFileRef.current = files[0]
  }

  function onSyncClick() {
    const file = selectedFileRef.current
    if (file) {
      handleFile(file)
    } else {
      alert('没有选择文件')
    }
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={openImportDialog}>
        导入轨迹
      </button>

      <MapComponent filename={filename} polylinePath={polylinePath} />

      <Modal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)} 
        title="导入轨迹"
        size="md"
        position="center"
      >
        <form>
          <div className='form-item'>
            <input type="file" onChange={onFileChange} />
          </div>

          <div className='form-item'>
            <button className='btn btn-primary' onClick={onSyncClick}>
              同步
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
