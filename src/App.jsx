import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 引入代码高亮样式


function App() {
  const [count, setCount] = useState(0)

  const [files, setFiles] = useState([]);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {

     // 使用 import.meta.glob 获取文件列表
     const fileList = import.meta.glob("/public/articles/*");
     const fileNames = Object.keys(fileList).map((filePath) =>
       filePath.split("/").pop()
     );
     setFiles(fileNames);

  }, []);

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
      <h1>Hello world132</h1>

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
