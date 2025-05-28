import Modal from '#/components/Modal'
import { useEffect, useRef, useState } from 'react'
import { kml } from '@tmcw/togeojson'
import { supabase } from '#/supabaseClient'
import Notification from '#/components/Notification'
import { useNotification } from '#/hooks/useNotification'
import MapComponent from './MapContainer'
import './index.css'


export default function AroundPath() {
  const [importOpen, setImportOpen] = useState(false)
  
  const selectedFileRef = useRef(null)
  const { notification, notify, clearNotification } = useNotification()

  const { userPathList } = useUserPath()

  function openImportDialog() {
    setImportOpen(true)
  }

  async function handleFile(file) {
    const name = file.name

    const xmlText = await getTextFromFile(file)
    const result = getGeometryInfo(xmlText)

    const coordinates = getCoordinates(result)

    const locations = await batchConvert(coordinates)
    const pathString = locations.map(l => l.toArray()).join('|');
    const originalPathString = coordinates.map(coord => coord.join(',')).join('|')

    const payload = { name, originalPath: originalPathString, gpsPath: pathString }
    try {
      await addUserPath(payload)
      notify('success', '添加成功')
    } catch {
      notify('error', '添加路径接口失败')
    }
  }

  function getCoordinates(result) {
    const features = result.features
    const featureWithPoints = features[2]
    const geometry = featureWithPoints.geometry
    const coordinates = geometry.coordinates

    return coordinates.map(point => {
      return (
        [
          point[0], point[1]
        ]
      )
    })
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
      notify('error', '没有选择文件')
    }
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={openImportDialog}>
        导入轨迹
      </button>

      <MapComponent userPathList={userPathList} />

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

      {/* 通知组件 */}
      {notification && (
        <Notification 
          type={notification.type}
          message={notification.message}
          onClose={clearNotification}
        />
      )}
    </div>
  )
}

// 并发量上限(3次/秒)
// limit 手动发现可以设置为 480
async function batchConvert(coords, coordsys = 'gps', limit = 400) {
  let flag = 0

  const results = [];
  for (let i = 0; i < coords.length; i += limit) {
      const batch = coords.slice(i, i + limit);
      const locations = batch.map(coord => coord.join(',')).join('|');
      
      await new Promise((resolve) => {
          window.AMap.convertFrom(locations, coordsys, (status, result) => {
            console.log('convertFrom', { status, result })
              if (status === 'complete') {
                  results.push(...result.locations);
                  resolve();
              }
          });
      });

      if (flag % 2 === 0) {
        await sleep(1)
        flag = 0
      } else {
        flag++
      }

  }

  return results
}

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

async function addUserPath({ name, originalPath, gpsPath }) {
  const { error } = await supabase
    .from('user_paths')
    .insert([
      { name, original_path: originalPath, gps_path: gpsPath },
    ])
    .select()
  
  if (error) {
    throw error
  }
}

function useUserPath() {
  const [userPathList, setUserPathList] = useState([])

   useEffect(() => {
    async function run() {
      let { data: user_paths } = await supabase
        .from('user_paths')
        .select('*')

        setUserPathList(user_paths)
    }

    run()
  }, [])

  return {
    userPathList,
  }
}
