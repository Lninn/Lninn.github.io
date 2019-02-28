class Board {
  constructor(context) {
    this.context = context

    this.setup()
  }

  static new(context) {
    return new this(context)
  }

  setup() {
    this.texts = []
    this.rects = []

    this.addRect = this.add('rects')
    this.addText = this.add('texts')
  }

  add(type) {
    const self = this

    return function(data) {
      if (Array.isArray(data)) {
        self[type] = self[type].concat(data)
      } else {
        self[type].push(data)
      }
    }
  }

  draw() {
    const c = this.context

    this.rects.forEach(function({ color, x, y, w, h, }) {
      c.fillStyle = color
      c.fillRect(x, y, w, h)
    })

    this.texts.forEach(function({ text, font, color, x, y, }) {
      c.fillStyle = color
      c.font = font
      const w = c.measureText(text).width
      c.fillText(text, x(w), y)
    })
  }
}