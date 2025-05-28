import './UrlList.css'
import { supabase } from '../../supabaseClient'

export default function UrlList({ list, searchTerm, category }) {
  const handleClick = async (url) => {
    try {
      await supabase
        .from('bookmark_views')
        .insert([{ category, url }])
    } catch (error) {
      console.error('Failed to record view:', error)
    }
  }

  const highlightText = (text, highlight) => {
    if (!highlight) return text
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} className="highlight">{part}</span> : part
    )
  }

  return (
    <ul className="bookmark-list">
      {list.map(obj => (
        <li key={obj.name} className="bookmark-item">
          <a 
            href={obj.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-link"
            onClick={() => handleClick(obj.url)}
          >
            <div className="bookmark-icon-wrapper">
              <img
                data-name={obj.name}
                data-category={obj.category}
                src={obj.icon}
                alt=""
                className="bookmark-icon"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.src = '/fallback-icon.svg'
                  e.stopPropagation()
                  e.preventDefault()
                }}
              />
            </div>
            <div className="bookmark-content">
              <div className="bookmark-name">
                {highlightText(obj.name, searchTerm)}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
