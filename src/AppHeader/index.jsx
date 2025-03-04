var data = [
  {
    path: 'bookmark',
    name: '书签'
  },
  {
    path: 'log',
    name: '日志'
  },
]

export default function AppHeader({ activePath, onChange }) {
  return (
    <header className="app-header">
      <AppNav activePath={activePath} onChange={onChange} />
    </header>
  )
}

function AppNav({ activePath, onChange }) {
  return (
    <nav className='app-nav'>
      <ul>
        {data.map(item => {
          return (
            <li key={item.name}>
              <a
                href=""
                aria-disabled={activePath === item.path}
                onClick={e => {
                  e.preventDefault()
                  onChange(item.path)
                }}
              >
                {item.name}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
