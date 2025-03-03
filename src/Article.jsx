import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 引入代码高亮样式
import { use, useState } from "react";

const allArticlesPromise = fetchAllArticles();

export default function Article() {

  const [markdown, setMarkdown] = useState("");

  const allArticles = use(allArticlesPromise)

  return (
    <div>
      <ul>
        {allArticles.map(item => {
          var [[title, content]] = Object.entries(item)

          return (
            <li key={title}>
              <a href="" onClick={(e) => {
                e.preventDefault()
                setMarkdown(content)
              }}>{title}</a>
            </li>
          )
        })}
      </ul>

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

function fetchAllArticles() {
  const files = getFiles()

  return Promise.all(files.map(name => {
    return fetch(`/articles/${name}`).then(
      r => r.text()
    ).then(markdownText => {
      const firstLine = getFirstLine(markdownText) || '未命名标题';
      return { [firstLine]: markdownText }
    })
  }))
}

function getFirstLine(markdownText) {
  const lines = markdownText.split('\n');
  let firstLine = lines[0].trim();

  // 去除 Markdown 标题符号（如 ###）
  firstLine = firstLine.replace(/^#+\s*/, '');

  return firstLine;
}


function getFiles() {
  // 使用 import.meta.glob 获取文件列表
  const fileList = import.meta.glob("/public/articles/*");
  const fileNames = Object.keys(fileList).map((filePath) =>
    filePath.split("/").pop()
  );
  return fileNames;
}

// function loadFile(name) {
//   // 加载 public 目录中的 init.md 文件
//   fetch(`/articles/${name}`)
//     .then((response) => response.text())
//     .then((t) => {
//       // console.log(t)
//       return t
//     })
//     .then((text) => setMarkdown(text))
//     .catch((error) => console.error("Failed to load markdown file:", error));
// }
