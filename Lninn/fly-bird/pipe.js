class Pipe {
  constructor(app) {
    this.app = app

    this.width = 100
    this.height = this.randomHeight()
    this.speed = -4
    this.x = 0
    this.y = 0
    this.betweenDistance = 300
    // 分数检测标志位
    this.checked = false
  }

  randomHeight() {
    const min = 40
    const max = 240
    const n1 = randomInt(min, max)
    const n2 = randomInt(min, max)
    return n1 + n2
  }

  draw() {
    const { ctx, textures } = this.app
    const { x, y, width } = this
    const img = this.app.getImgByName("pipe")

    const h1 = this.height
    const h2 = this.app.height - h1 - this.betweenDistance

    // save h1 h2
    // h1 上方 pipe 高度
    this.h1 = h1
    this.h2 = h2

    ctx.drawImage(img, x, y, width, h1)

    ctx.save()
    ctx.transform(1, 0, 0, -1, 0, this.app.height)
    const groundOfHeight = 120
    ctx.drawImage(img, x, y + groundOfHeight, width, h2 - groundOfHeight)
    ctx.restore()
  }

  update() {
    if (this.x <= -this.width) {
      this.height = this.randomHeight()
      this.x = 3 * 500 - this.width

      // reset
      this.checked = false
    } else {
      this.x += this.speed
    }
  }

  pass(bird) {
    return bird.x > this.x
  }
}

class PipeList {
  constructor(app) {
    this.app = app
    this.initialPosition = config.width
    this.numOfPipes = 4
    this.betweenOfPipe = 500

    this.setup()
  }

  setup() {
    this.pipes = []

    for (let i = 1; i < this.numOfPipes; i++) {
      const pipe = new Pipe(this.app)
      pipe.x = i * this.betweenOfPipe + this.initialPosition

      this.pipes.push(pipe)
    }
  }

  update() {
    // for (const pipe of this.pipes) {
    //   pipe.update()
    // }
  }

  draw() {
    for (const pipe of this.pipes) {
      pipe.draw()
    }
  }
}
