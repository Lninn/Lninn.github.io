import { use } from 'react'
import UrlList from './UrlList'
import { getUrlArray } from './url-support'


var urlListPromise = getUrlList()

export default function Bookmark() {
  const data = use(urlListPromise)

  return (
    <section style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map(obj => {
        var [name, data] = obj

        return (
          <div key={name}>
            <span style={{ textTransform: 'uppercase' }}>{name}</span>
            <UrlList list={data} />
          </div>
        )
      })}
    </section>
  )
}

function getUrlList() {
  return fetch('data.json')
    .then((response) => response.text())
    .then((list) => {
      try {
        var data = getUrlArray(list)
        return data
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error) => console.error("Failed to load markdown file:", error));
}
