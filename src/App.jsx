import { useEffect, useState } from 'react'
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

  var [urlData, setUrlData] = useState([])

  useEffect(() => {
    loadUrlList()
  }, [])

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

          var originalData = JSON.parse(list)
          var restList = []

          var dataMap = {}

          for (const item of originalData) {
            if ('category' in item) {
              var name = item['category']
              if (name in dataMap) {
                dataMap[name].push(item)
              } else {
                dataMap[name] = [item]
              }
            } else {
              restList.push(item)
            }
          }

          var dataList = Object.entries(dataMap)
          setUrlData(sortByFirstLetter(dataList, false))
          console.log({ restList })
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
      </p>

      <CSVtoJSONConverter />

      <p>
        {files.map(name => (<a key={name} onClick={() => loadFile(name)}>{name}</a>))}
      </p>

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>

      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {urlData.map(obj => {
          var [name, data] = obj

          return (
            <div key={name}>
              <span style={{ textTransform: 'uppercase' }}>{name}</span>
              <UrlList list={data} />
            </div>
          )
        })}
      </section>

      <p>power by Deepseek</p>
    </>
  )
}

function sortByFirstLetter(arr, ascending = true) {
  return arr.sort((a, b) => {
      if (ascending) {
          return a[0][0].localeCompare(b[0][0]);
      } else {
          return b[0][0].localeCompare(a[0][0]);
      }
  });
}

function UrlList({ list }) {
  return (
    <ul>
        {list.map(obj => {
          return (
            <li key={obj.name} style={{ marginBlockEnd: 8 }}>
              <img
                height={24}
                width={24}
                src={obj.icon}
                style={{ verticalAlign: 'bottom', paddingRight: 8 }}
              />
              <a href={obj.url} target='_blank'>{obj.name}</a>
            </li>
          )
        })}
      </ul>
  )
}

export default App
