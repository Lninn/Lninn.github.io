class Block extends Spirit {
  constructor({ context, }, name = 'blockRed', { x, y, lives = 1}) {
    super(context, name, x, y)

    this.setup(lives)
  }

  setup(lives) {
    this.alive = true
    this.lives = lives

    this.nameOfColors = {
      1: 'blockRed',
      2: 'blockBlue',
      3: 'blockYellow',
      4: 'blockGreen',
      5: 'blockPurple',
    }

    this.setImage()
  }

  collide(ball) {
    return intersect(this, ball) && this.alive
  }

  addLives() {
    const l = Object.keys(this.nameOfColors).length

    if (this.lives >= l) {
      this.miss()
    } else {
      this.lives += 1
      this.alive = true
    }
  }

  miss() {
    this.lives = 0
    this.alive = false
  }

  update() {
    if (this.alive) {
      this.setImage()
    }
  }

  setImage() {
    const name = this.nameOfColors[this.lives]
    this.name = name
    this.image = config.images[name]
  }

  kill() {
    this.lives -= 1

    if (this.lives <= 0) {
      this.miss()
    }

    this.setImage()
    return this.alive
  }

  draw() {
    if (this.alive) {
      super.draw()
    }
  }
}