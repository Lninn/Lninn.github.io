import Modal from '#/components/Modal'
import { useEffect, useRef, useState } from 'react'
import { kml } from '@tmcw/togeojson'
import { supabase } from '#/supabaseClient'
import Notification from '#/components/Notification'
import Select from '#/components/Select'
import Progress from '#/components/Progress'
import { useNotification } from '#/hooks/useNotification'
import MapComponent from './MapContainer'
import './index.css'


export default function AroundPath() {
  const [importOpen, setImportOpen] = useState(false)
  const [userPathModalOpen, setUserPathModalOpen] = useState(false)
  const [travelingPathOpen, setTravelingPathOpen] = useState(false)

  const [activeUserPath, setActiveUserPath] = useState(null)
  
  const selectedFileRef = useRef(null)
  const { notification, notify, clearNotification } = useNotification()

  const { userPathList, refresh } = useUserPath()
  const [percent, setPercent] = useState(0)

  function openImportDialog() {
    setImportOpen(true)
  }

  function openUserPathDialog() {
    setUserPathModalOpen(true)
  }

  function openTravelingPathDialog() {
    setTravelingPathOpen(true)
  }

  function onSuccessAddUserPath() {
    notify('success', '添加成功')
    
    selectedFileRef.current = null;
    setPercent(0);
    setImportOpen(false);

    refresh();
  }

  function onSuccessDeleteUserPath(userPath) {
    notify('success', '删除 ' + userPath.name +' 成功')
    refresh();
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

      onSuccessAddUserPath()

    } catch {
      notify('error', '添加路径接口失败')
    }
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
            if (status === 'complete') {
              results.push(...result.locations);
              resolve();

              const number = Math.min(i + limit, coords.length) / coords.length
              const percent = (number * 100).toFixed(2)
              setPercent(percent)
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

      <button className='btn btn-primary' onClick={openUserPathDialog}>
        路径管理
      </button>

      <button className='btn btn-primary' onClick={openTravelingPathDialog}>
        行程管理
      </button>

      <div className='user-path-panel'>
        {userPathList.map(uP => {
          const isActive = activeUserPath?.name === uP.name
          let cls = 'user-path-item'
          if (isActive) {
            cls += ' active'
          }

          return (
            <div className={cls} key={uP.name} onClick={() => setActiveUserPath(uP)}>{uP.name}</div>
          )
        })}
      </div>

      <MapComponent activeUserPath={activeUserPath} userPathList={userPathList} />
      
      <TravelingPathModal
        open={travelingPathOpen}
        onClose={() => {
          setTravelingPathOpen(false)
        }}
        onAdd={() => {
          console.log('添加行程成功')
        }}
        userPathList={userPathList}
      />

      <UserPathModal
        open={userPathModalOpen}
        onClose={() => setUserPathModalOpen(false)}
        userPathList={userPathList}
        onDelete={(userPath) => {
          onSuccessDeleteUserPath(userPath)
        }}
      />

      <Modal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)} 
        title="导入轨迹"
        size="md"
        position="center"
      >
        <form>
          <div className='form-item'>
            <label>坐标解析进度</label>
            <Progress percent={percent} />
          </div>

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

  async function fetchList() {
    let { data: user_paths } = await supabase
      .from('user_paths')
      .select('*')

      setUserPathList(user_paths)
  }

  useEffect(() => {
    async function run() {
      await fetchList()
    }

    run()
  }, [])

  return {
    userPathList,
    refresh: fetchList,
  }
}

function UserPathModal({ open, onClose, userPathList, onDelete }) {
  async function handleDelete(userPath) {

    const { error } = await supabase
      .from('user_paths')
      .delete()
      .eq('name', userPath.name)

    if (!error) {
      onDelete(userPath)
    }
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose} 
      title="导入轨迹"
      size="md"
      position="center"
    >
      {userPathList.map(userPath => {
        return (
          <div key={userPath.name}>
            <div>{userPath.name} <button onClick={() => handleDelete(userPath)}>删除</button></div>
          </div>
        )
      })}
    </Modal>

  )
}

function TravelingPathModal({ open, onClose, onAdd, userPathList }) {
  const [title, setTitle] = useState('')

  const [travelingPaths, setTravelingPaths] = useState([])

  const [activeUserPath, setActiveUserPath] = useState(null)

  const userPathOptions = userPathList.map(up => {
    return {
      label: up.name,
      value: up.id,
    }
  })

  async function fetchData() {

    let { data: traveling_paths } = await supabase
      .from('traveling_paths')
      .select('*')
  
    return traveling_paths
  }

  async function getData() {
    const list = await fetchData()
    setTravelingPaths(list)
  }

  useEffect(() => {
    getData()
  }, [])

  async function AddTravelingPath() {

    if (!title) {
      alert("请输入标题")
      return
    }

    const { error } = await supabase
      .from('traveling_paths')
      .insert([
        { title, legs: [] },
      ])
      .select()

    if (!error) {
      await getData()

      setTitle('')
      onAdd()
    }
  }

  async function addLegToTravelingPath(tPath) {
    console.log(tPath)
  }

  return (
     <Modal
      isOpen={open}
      onClose={onClose} 
      title="行程管理"
      size="md"
      position="center"
    >
      <div style={{ height: 600 }}>
        <div className='create-traveling-form'>
          <div className='form-item'>
            <label>行程名称</label>
            <input style={{ width: 200 }} type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className='form-item'>
            <button className='btn btn-primary' onClick={AddTravelingPath}>添加行程</button>
          </div>
        </div>

        <ul>
          {travelingPaths.map(tPath => {
            return (
              <li key={tPath.title} className='traveling-path-item'>
                <div>{tPath.title}</div>

                <div onClick={() => addLegToTravelingPath(tPath)}>增加</div>

                <Select
                  value={activeUserPath}
                  onChange={setActiveUserPath}
                  options={userPathOptions}
                  placeholder="选择对应的里程"
                  style={{ width: '200px' }}
                />

              </li>
            )
          })}
        </ul>
      </div>
    </Modal>
  )
}
