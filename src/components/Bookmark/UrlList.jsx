export default function UrlList({ list }) {
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
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/fallback-icon.svg';
                }}
              />
              <a href={obj.url} target='_blank'>{obj.name}</a>
            </li>
          )
        })}
      </ul>
  )
}
