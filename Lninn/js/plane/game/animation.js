class Animation {
  constructor(game, name) {
    this.game = game
    this.name = name

    this.frames = {
      left: [],
      right: [],
      front: [],
      back: [],
    }

    this.direction = 'right'

    this.addImage('front', 1, 5)
    this.addImage('left', 5, 9)
    this.addImage('right', 9, 13)
    this.addImage('back', 13, 17)
    
    this.frameCount = 5
    this.index = 0
    this.image = this.frames[this.direction][this.index]
  }

  addImage(direction, start, end) {
    for (let i = start; i < end; i++) {
      const name = `${this.name}${i}`
      const img = this.game.imageByName(name)
      this.frames[direction].push(img)
    }
  }

  setDir(key) {
    if (key == 'a') {
      this.direction = 'left'
    } else if (key == 'd') {
      this.direction = 'right'
    } else if (key == 'w') {
      this.direction = 'front'
    } else if (key == 's') {
      this.direction = 'back'
    }
  }

  static new(...args) {
    return new this(...args)
  }

  update() {
    if (this.frameCount <= 0) {
      this.index = (this.index + 1) % this.frames[this.direction].length
      this.image = this.frames[this.direction][this.index]
      this.frameCount = 5 
    }
    this.frameCount -= 1
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, 100, 100)
  }
}