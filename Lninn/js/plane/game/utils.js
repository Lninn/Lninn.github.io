const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

// const imageFromPath = function(path) {
//   const img = new Image()
//   img.src = path
//   return img
// }

const randomBetween = function(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start 
}

const intersect = function(a, b) {
  const t = (x, x1, x2) => {
    return x >= x1 && x <= x2
  }

  if (t(a.x, b.x, b.x + b.w) || t(b.x, a.x, a.x + a.w)) {
    if (t(a.y, b.y, b.y + b.h) || t(b.y, a.y, a.y + a.h)) {
      return true
    }
  }

  return false
}

const hasPoint = (r, p) => {
  if (p.x >= r.x && p.x <= r.x + r.w) {
    if (p.y >= r.y && p.y <= r.y + r.h) {
      return true
    }
  }
  
  return false
}