import "./MapContainer.css";
import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect, useState } from "react";


export default function MapContainer({ filename, polylinePath }) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "8750ad1552105ca34626f4a00b92c478",
    };
    AMapLoader.load({
      key: "fa974d63c94fdbe25c7ab1f203fa983d", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    })
      .then((AMap) => {
        const newMap = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 是否为3D地图模式
          zoom: 5, // 初始化地图级别
          center: [116.397428, 39.90923],
          features: ['bg', 'point'],
          // mapStyle: "amap://styles/whitesmoke", 
        });
        setMap(newMap)
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!map) return

    if (!polylinePath) return

    async function run() {
      const locations = await getPolylinePath()
      AddPolyline(locations)
    }

    async function getPolylinePath() {
       const cachefile = localStorage.getItem(filename)
      if (cachefile) {
        const locations = cachefile.split('|').map(lnglatString => {
          return new window.AMap.LngLat(...lnglatString.split(','))
        })
        return locations
      } else {
        const locations = await batchConvert(polylinePath)
  
        const pathString = locations.map(l => l.toArray()).join('|');
        localStorage.setItem(filename, pathString)
  
        return locations
      }
    }

    function AddPolyline(path) {
      const polyline = new window.AMap.Polyline({
        path,
        strokeColor: "#FF33FF",
        strokeWeight: 5,
      })
      map.add(polyline)
      map.setFitView([polyline])
    }

    run()
    
  }, [map, polylinePath])

  return (
    <>
      <div
        id="container"
        className='container'
        style={{ height: "800px" }}
      ></div>
    </>
  );
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
