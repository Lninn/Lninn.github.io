class Paddle extends Spirit {
  constructor({ context, }, name) {
    super(context, name)

    this.setup()
  }

  setup() {
    this.reset()
  }

  move(x) {
    if (x < 0) {
      x = 0
    } else if (x > config.w - this.w) {
      x = config.w - this.w
    }

    this.x = x
  }

  moveLeft() {
    this.move(this.x - this.speed)
  }

  moveRight() {
    this.move(this.x + this.speed)
  }

  collide(ball) {
    return intersect(this, ball)
  }

  reset() {
    this.x = (config.w - this.w) / 2
    this.y = config.paddle_height
    this.speed = config.paddle_speed
  }
}