import "./index.css"
import { use, useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug" // 需要安装这个依赖
import "highlight.js/styles/github.css"
import { ArticleSkeleton } from "./components/ArticleSkeleton"

const allArticlesPromise = fetchAllArticles()

// 阅读进度条组件
function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setWidth(Math.min(scrollPercent * 100, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return <div className="reading-progress" style={{ width: `${width}%` }} />;
}

function ArticleList({ articles, onSelect, activeTitle, isMobileView, onToggleSidebar }) {
  return (
    <div className="article-list">
      <div className="list-header">
        <h2 className="list-title">文章列表</h2>
        {isMobileView && (
          <button className="close-sidebar-btn" onClick={onToggleSidebar} aria-label="关闭侧边栏">
            <span>×</span>
          </button>
        )}
      </div>
      <div className="search-container">
        <input 
          type="text" 
          className="article-search" 
          placeholder="搜索文章..." 
        />
      </div>
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
                  if (isMobileView) onToggleSidebar()
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

function ArticleContent({ content, isMobileView, onToggleSidebar }) {
  if (!content) {
    return (
      <div className="article-empty">
        <p>👈 请选择一篇文章</p>
      </div>
    )
  }

  return (
    <div className="article-content">
      {isMobileView && (
        <button className="toggle-sidebar-btn" onClick={onToggleSidebar} aria-label="打开侧边栏">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          目录
        </button>
      )}
      <div className="markdown-wrapper">
        <ReactMarkdown 
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default function Article() {
  const [markdown, setMarkdown] = useState("")
  const [activeTitle, setActiveTitle] = useState("")
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const allArticles = use(allArticlesPromise)

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768)
    }
    
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => {
      window.removeEventListener('resize', checkMobileView)
      clearTimeout(timer)
    }
  }, [])

  const handleArticleSelect = (article) => {
    const [[title, content]] = Object.entries(article)
    setActiveTitle(title)
    setMarkdown(content)
    
    // 滚动到顶部
    window.scrollTo(0, 0)
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  if (isLoading) {
    return <ArticleSkeleton />
  }

  return (
    <>
      <ReadingProgress />
      <div className={`article-container ${isMobileView ? 'mobile-view' : ''} ${sidebarVisible ? 'sidebar-visible' : ''}`}>
        <div className="article-sidebar">
          <ArticleList 
            articles={allArticles} 
            onSelect={handleArticleSelect}
            activeTitle={activeTitle}
            isMobileView={isMobileView}
            onToggleSidebar={toggleSidebar}
          />
        </div>
        <div className="article-main">
          <ArticleContent 
            content={markdown} 
            isMobileView={isMobileView}
            onToggleSidebar={toggleSidebar}
          />
        </div>
        {/* 移除 ArticleTOC 组件 */}
      </div>
    </>
  )
}

// 其余函数保持不变
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
  // 如 # 标题 => 标题
  firstLine = firstLine.replace(/^#+ /, '');

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
