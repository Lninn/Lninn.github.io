class Ground {
  constructor(app) {
    this.app = app
    this.x = 0
    this.y = 0
    this.speed = -3
    this.width = 24
    this.height = 120

    this.numOfgrounds = app.width / this.width + 1
    this.y = app.height - this.height
  }

  update() {
    this.x += this.speed
    if (this.x < -this.width) {
      this.x = 0
    }
  }

  draw() {
    const { numOfgrounds, x, y, width, height, app } = this

    const img = app.getImgByName("ground")
    for (let i = 0; i < numOfgrounds; i++) {
      const _x = i * width + x
      app.drawImage(img, _x, y, width, height)
    }
  }
}
