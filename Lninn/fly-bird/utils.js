const currentDate = function() {
  const d = new Date()
  return `${d.toLocaleString()}:`
}

const log = console.log.bind(console, currentDate())

const e = sel => document.querySelector(sel)

const randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
  两个矩形相交的检测
  a bird
  b pipe
*/
const intersect = function(bird, pipe) {
  if (bird.x + bird.width > pipe.x) {
    if (bird.y + bird.height <= pipe.h1) {
      return true
    }
  }
  const between = (value, start, end) => {
    return value >= start && value <= end
  }

  // if (between(a.x, b.x, b.x + b.width) || between(b.x, a.x, a.x + a.width)) {
  //   if (
  //     between(a.y, b.y, b.y + b.height) ||
  //     between(b.y, a.y, a.y + a.height) ||
  //     between(a.y, b.y, b.y + b.h2) ||
  //     between(b.y, a.y, a.y + a.h2)
  //   ) {
  //     return true
  //   }
  // }

  return false
}
