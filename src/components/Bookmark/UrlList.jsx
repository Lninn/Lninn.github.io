import { supabase } from '../../supabaseClient'


export default function UrlList({ list, searchTerm, category }) {
  const handleClick = async (url) => {
    try {
      await supabase
        .from('bookmark_views')
        .insert([
          { 
            category: category,
            url: url
          }
        ])
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
    <ul>
      {list.map(obj => (
        <li key={obj.name} style={{ marginBlockEnd: 8 }}>
          <img
            height={24}
            width={24}
            src={obj.icon}
            style={{ verticalAlign: 'bottom', paddingRight: 8 }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/fallback-icon.svg';
            }}
          />
          <a 
            href={obj.url} 
            target='_blank'
            onClick={() => handleClick(obj.url)}
          >
            {highlightText(obj.name, searchTerm)}
          </a>
        </li>
      ))}
    </ul>
  )
}
