import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 引入代码高亮样式


const urls = [
  {
    "url": "http://poolga.com/",
    "icon": "http://poolga.com/public/img/apple-touch-icon-144x144-precomposed.png",
    "categories": ["44", "46"],
    "label": ["分享", "摄影", "Find Inspiration", "Wallpapers", "创意"],
    "name": "Poolga",
    "created_at": "2024-04-14 09:42:55.428336+00",
    "id": 124
  },
  {
    "url": "http://rendur.com/",
    "icon": "http://rendur.com/favicon.png",
    "categories": ["44", "46"],
    "label": ["Online Code", "Online IDE"],
    "name": "RENDUR",
    "created_at": "2024-04-14 08:33:10.848287+00",
    "id": 98
  },
  {
    "url": "https://500px.com/",
    "icon": "https://500px.com/smartbanner_icon.png",
    "categories": ["44", "46"],
    "label": ["图片素材", "摄影"],
    "name": "500px",
    "created_at": "2024-04-14 09:39:28.035599+00",
    "id": 121
  },
  {
    "url": "https://astexplorer.net/",
    "icon": "https://astexplorer.net/favicon.png",
    "categories": ["44", "46"],
    "label": ["前端", "javascript", "工具", "语法树", "AST Tree"],
    "name": "AST Explorer",
    "created_at": "2024-04-14 10:00:48.317012+00",
    "id": 136
  },
  {
    "url": "https://caniuse.com/",
    "icon": "https://caniuse.com//img/favicon-128.png",
    "categories": ["44", "46"],
    "label": ["工具", "javascript", "前端"],
    "name": "Can I use ?",
    "created_at": "2024-04-14 09:54:51.805719+00",
    "id": 131
  },
]


function App() {
  const [count, setCount] = useState(0)

  const [files, setFiles] = useState([]);
  const [markdown, setMarkdown] = useState("");

  function getFiles() {
     // 使用 import.meta.glob 获取文件列表
     const fileList = import.meta.glob("/public/articles/*");
     const fileNames = Object.keys(fileList).map((filePath) =>
       filePath.split("/").pop()
     );
     console.log('fileNames ', { fileNames })
     setFiles(fileNames);
  }

  function loadFile(name) {
     // 加载 public 目录中的 init.md 文件
     fetch(`/articles/${name}`)
     .then((response) => response.text())
     .then((t) => {
      // console.log(t)
       return t
     })
     .then((text) => setMarkdown(text))
     .catch((error) => console.error("Failed to load markdown file:", error));
  }

  return (
    <>
      <h1>Hello world123</h1>

      <p>
        <button onClick={() => getFiles()}>点击获取文件列表</button>
      </p>

      <p className='urls'>
        {urls.map(obj => {
          return (
            <a href={obj.url} target='_blank'>{obj.name}</a>
          )
        })}
      </p>

      <p>
        {files.map(name => (<a key={name} onClick={() => loadFile(name)}>{name}</a>))}
      </p>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>

      <p>power by Deepseek</p>
    </>
  )
}

export default App
