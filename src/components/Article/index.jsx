import { use, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import "./index.css"

const allArticlesPromise = fetchAllArticles()

function ArticleList({ articles, onSelect, activeTitle }) {
  return (
    <div className="article-list">
      <h2 className="list-title">文章列表</h2>
      <ul>
        {articles.map(item => {
          const [[title, _]] = Object.entries(item)
          return (
            <li key={title}>
              <a 
                href="#"
                className={`article-link ${activeTitle === title ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(item)
                }}
              >
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ArticleContent({ content }) {
  if (!content) {
    return (
      <div className="article-empty">
        <p>👈 请选择一篇文章</p>
      </div>
    )
  }

  return (
    <div className="article-content">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default function Article() {
  const [markdown, setMarkdown] = useState("")
  const [activeTitle, setActiveTitle] = useState("")
  const allArticles = use(allArticlesPromise)

  const handleArticleSelect = (article) => {
    const [[title, content]] = Object.entries(article)
    setActiveTitle(title)
    setMarkdown(content)
  }

  return (
    <div className="article-container">
      <ArticleList 
        articles={allArticles} 
        onSelect={handleArticleSelect}
        activeTitle={activeTitle}
      />
      <ArticleContent content={markdown} />
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
