class Spirit {
  constructor(ctx, name, x = 0, y = 0, w = null, h = null) {
    this.ctx = ctx
    this.name = name
    this.x = x
    this.y = y

    // log(game, name)
    const img = config.images[name]
    this.w = w || img.width
    this.h = h || img.height
    this.image = img
  }

  static new(...args) {
    return new this(...args)
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}