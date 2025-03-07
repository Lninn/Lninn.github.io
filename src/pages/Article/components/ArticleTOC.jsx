import { useEffect, useState } from 'react';
// 删除 import './ArticleTOC.css'; 因为样式已合并到 index.css

export function ArticleTOC({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // 解析 Markdown 内容中的标题
  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    const lines = content.split('\n');
    const headingRegex = /^(#{1,3})\s+(.+)$/;
    const extractedHeadings = [];

    lines.forEach((line, index) => {
      const match = line.match(headingRegex);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        extractedHeadings.push({
          id,
          text,
          level,
          index
        });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  // 监听滚动，高亮当前可见的标题
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="article-toc">
      <h3 className="toc-title">目录</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`toc-h${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}