import "./MapContainer.css";
import AMapLoader from '@amap/amap-jsapi-loader';
import { useEffect, useState } from "react";


export default function MapContainer({ userPathList }) {
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

    if (userPathList.length === 0) return

    const locations = userPathList.map(userPath => {
      return userPath.gps_path.split('|').map(coordString => {
        return new window.AMap.LngLat(...coordString.split(','))
      })
    })

    locations.forEach(l => {
      AddPolyline(l)
    })

    function AddPolyline(path) {
      const polyline = new window.AMap.Polyline({
        path,
        strokeColor: "blue",
        strokeWeight: 5,
      })
      map.add(polyline)
      map.setFitView([polyline])
    }
    
  }, [map, userPathList])

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
