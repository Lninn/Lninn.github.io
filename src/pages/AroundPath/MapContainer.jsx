import "./MapContainer.css";
import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect, useState } from "react";


const ORIGINAL_POLYLINE_OPTIONS = {
  strokeColor: "blue",
  strokeWeight: 3,
}
const ACTIVE_POLYLINE_OPTIONS = {
  strokeColor: "red",
  strokeWeight: 5,
}

export default function MapContainer({ userPathList, activeUserPath }) {
  const [map, setMap] = useState(null)

  const [polylineList, setPolylineList] = useState([])

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "cbda977efbb9bf5d0b4809ae711ccba7",
    };
    AMapLoader.load({
      key: "16e9f3a53e15d22721e46259c3a8a8d2", // 申请好的Web端开发者Key，首次调用 load 时必填
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

    if (userPathList.length === 0) return

    const nextPolylineList = []

    const transformData = userPathList.map(userPath => {
      const locations =  userPath.gps_path.split('|').map(coordString => {
        return new window.AMap.LngLat(...coordString.split(','))
      })

      return {
        locations,
        id: userPath.id,
      }
    })

    transformData.forEach(entry => {
      const polyline = new window.AMap.Polyline({
        path: entry.locations,
        ...ORIGINAL_POLYLINE_OPTIONS,
        extData: { userPathId: entry.id, }
      })

      nextPolylineList.push(polyline)
      map.add(polyline)
    })

    map.setFitView(nextPolylineList)
    setPolylineList(nextPolylineList)
    return () => {
      if (!map) return

      nextPolylineList.forEach(p => {
        map.remove(p)
      })
      setPolylineList([])
    }
    
  }, [map, userPathList])

  useEffect(() => {
    if (!activeUserPath) return

    const targetPolyline = polylineList.find(polyline => {
      const extData = polyline.getExtData()
      return extData.userPathId === activeUserPath?.id
    })

    if (targetPolyline) {
      targetPolyline.setOptions(ACTIVE_POLYLINE_OPTIONS)
      const bounds = targetPolyline.getBounds()
      const [,center] = map.getFitZoomAndCenterByBounds(bounds)
      map.setCenter(center)
    }

    return () => {
      targetPolyline.setOptions(ORIGINAL_POLYLINE_OPTIONS)
    }
  }, [map, activeUserPath, polylineList])

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
