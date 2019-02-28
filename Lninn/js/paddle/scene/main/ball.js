class Ball extends Spirit {
  constructor({ context, }, name) {
    super(context, name)

   this.setup()
  }

  setup() {
    this.reset()
  }

  fire() {
    this.fired = true
  }

  move() {
    // 小球移动的高度 hardcode
    const h = 50

    if (this.fired) {
      if (this.x <= 0 || this.x + this.w >= config.w) {
        this.speedX *= -1
      } else if (this.y <= h || this.y + this.h >= config.h) {
        this.speedY *= -1
      }

      this.x += this.speedX
      this.y += this.speedY
    }
  }

  rebound(b) {
    const t = overlap(this, b)
    if (t.x > t.y) {
      this.speedY *= -1
    } else {
      this.speedX *= -1
    }
  }

  reset() {
    this.x = (config.w - this.w) / 2
    this.y = config.paddle_height - this.h - 3
    this.fired = false
    this.speedX = config.ball_speedX
    this.speedY = config.ball_speedY
  }
}