class Bird {
  constructor(app) {
    this.app = app

    this.x = (app.width - 92) / 2
    this.y = 300
    this.width = 92
    this.height = 64

    // 重力
    this.gy = 9.8
    this.gyFactor = 0.015

    // 加速度
    this.vy = 0
    this.jumpOffset = -5.5
    this.degrees = 0

    // animation
    this.frames = [0, 92, 184]
    this.currentFraIdx = 0
    this.frameCount = 0
    this.numOfFrameTimes = 10
  }

  update = function() {
    if (this.frameCount <= 0) {
      this.currentFraIdx = (this.currentFraIdx + 1) % this.frames.length
      this.frameCount = this.numOfFrameTimes
    }
    this.frameCount -= 1

    this.y += this.vy
    this.vy += this.gy * this.gyFactor

    if (this.vy > 1.5 && this.degrees < 90) {
      this.degrees += 3
    }

    const h = this.app.height - 120 - this.height
    if (this.y > h) {
      this.y = h
    }
  }

  draw() {
    const { currentFraIdx, frames, width, height, x, y, app } = this
    const _w = frames[currentFraIdx]

    app.ctx.save()

    const w2 = width / 2
    const h2 = height / 2

    // 以角色的中心旋转
    app.ctx.translate(x + w2, y + h2)
    app.ctx.rotate((this.degrees * Math.PI) / 180)
    app.ctx.translate(-w2, -h2)
    app.ctx.drawImage(
      app.textures["bird"],
      _w,
      0,
      width,
      height,
      0,
      0,
      width,
      height,
    )
    app.ctx.restore()
  }

  jump() {
    this.degrees = -45
    this.vy = this.jumpOffset
  }
}
