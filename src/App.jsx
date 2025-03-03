import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import CSVtoJSONConverter from './CSVtoJSONConverter'

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 引入代码高亮样式



function App() {

  const [files, setFiles] = useState([]);
  const [markdown, setMarkdown] = useState("");

  const [urlList, seturlList] = useState([])

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

  function loadUrlList() {
    fetch('data.json')
    .then((response) => response.text())
    .then((list) => {
      try {
        seturlList(
          JSON.parse(list)
        )
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error) => console.error("Failed to load markdown file:", error));
  }

  return (
    <>
      <p>
        <button onClick={() => getFiles()}>点击获取文件列表</button>
        <button onClick={() => loadUrlList()}>加载URL list</button>
      </p>

      <CSVtoJSONConverter />

      <dl>
        <dt>Beast of Bodmin</dt>
        {urlList.map(obj => {
          return (
            <dd key={obj.name}>
              <a href={obj.url} target='_blank'>{obj.name}</a>
            </dd>
          )
        })}
      </dl>

      <p>
        {files.map(name => (<a key={name} onClick={() => loadFile(name)}>{name}</a>))}
      </p>

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>

      <p>power by Deepseek</p>
    </>
  )
}

export default App
