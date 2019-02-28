class GameText {
  constructor(ctx, obj = {}) {
    this.ctx = ctx

    this.setup(obj)
  }

  setup(obj) {
    this.fontSize = obj.fontSize || 16
    this.style = obj.style || '#000'
    this.text = obj.text || '未定义'
    this.x = obj.x || 0
    this.y = obj.y || 0
    this.center = obj.center || false

    this.enable = true
  }

  static new(...args) {
    return new this(...args)
  }

  changeText(text) {
    this.text = text
  }

  toggle() {
    this.enable = !this.enable
  }

  draw() {
    if (!this.enable) {
      return
    }
    
    const c = this.ctx
    c.font = this.fontSize + 'px 微软雅黑'
    c.fillStyle = this.style
    if (this.center) {
      const w = this.ctx.measureText(this.text).width
      c.fillText(this.text, this.x - w / 2, this.y)
    } else {
      c.fillText(this.text, this.x, this.y)
    }
  }
}