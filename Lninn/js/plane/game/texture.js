class Texture {
  constructor(game, name, x, y) {
    this.game = game
    this.name = name
    this.x = x
    this.y = y

    this.setup()
  }

  static new(...args) {
    return new this(...args)
  }

  setup() {
    const img = this.game.imageByName(this.name)

    this.image = img
    this.w = img.width
    this.h = img.height
  }

  update() {}

  draw() {
    this.game.drawImage(this)
  }
}