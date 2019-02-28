class Palyer {
  constructor(scene) {
    this.scene = scene

    this.setup() 
  }

  setup() {
    this.score = 0
    this.lives = config.initial_lives
    this.level = 1
    this.pass = false
    this.timer = 0
    this.timeInterval = 180

    this.fontSize = 30
    this.count = 4
  }

  static new(...args) {
    return new this(...args)
  }

  subLife() {
    this.lives -= 1
  }

  addScore() {
    this.score += 100
  }

  next() {
    if (this.timer >= this.timeInterval) {
      this.level += 1
      this.pass = false
      this.lives = config.initial_lives
      this.timer = 0
      this.count = 4
      this.scene.load(this.level)
      this.scene.ball.reset()
    } else {
      this.timer += 1
    }
  }

  update() {
    if (this.lives === 0) {
      const s = SceneEnd.new(this.scene.game)
      this.scene.game.replaceScene(s)
    }

    if (this.pass) {
      this.next()
    }
  }

  draw() {
    // log('player draw')
    const { boardArea, game: { context: c, }, } = this.scene

    // 生命
    for (let i = 0; i < this.lives; i++) {
      const img = Spirit.new(
        c,
        'heart', 
        config.w - boardArea.x * 3  - 35 * i,
        boardArea.y + (boardArea.h - 20) / 2,
        30,
        30,
      )
      img.draw()
    }

    c.fillStyle = "#000"
    c.font = `${this.fontSize}px 微软雅黑`
    c.fillText(
      `第 ${this.level} 关  分数: ${this.score}`,
      boardArea.x,
      boardArea.y + this.fontSize + (boardArea.h - this.fontSize) / 2,
    )

    if (this.pass) {
      this.timer % 60 == 0 && this.count--
   
      c.fillStyle = "#fff"
      c.font = `${100}px 微软雅黑`
      c.fillText(
        this.count,
        config.w / 2 - 50,
        config.h / 2 - 200,
      )
    }
  }
}