export function getUrlArray(list) {
  var originalData = JSON.parse(list)
  var restList = []

  var dataMap = {}

  for (const item of originalData) {
    if ('category' in item) {
      var name = item['category']
      if (name in dataMap) {
        dataMap[name].push(item)
      } else {
        dataMap[name] = [item]
      }
    } else {
      restList.push(item)
    }
  }

  var dataList = Object.entries(dataMap)
  
  return sortByFirstLetter(dataList, false)
}

function sortByFirstLetter(arr, ascending = true) {
  return arr.sort((a, b) => {
      if (ascending) {
          return a[0][0].localeCompare(b[0][0]);
      } else {
          return b[0][0].localeCompare(a[0][0]);
      }
  });
}
