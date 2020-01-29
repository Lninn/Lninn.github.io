const config = {
  width: 300,
  height: 500,
  paused: false,
}

class Container {
  constructor() {
    this._setup()
    this._init()
  }

  _setup() {
    this.sel = "#id-canvas"
  }

  _init() {
    this.canvas = e(this.sel)
    this.ctx = this.canvas.getContext("2d")

    // this.setCanvasSize()
    this.width = this.canvas.width
    this.height = this.canvas.height
  }

  update() {}

  draw() {}

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawImage(...args) {
    this.ctx.drawImage(...args)
  }

  setCanvasSize() {
    const { width, height } = config
    const { canvas } = this

    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    // canvas.setAttribute("width", width)
    // canvas.setAttribute("height", height)

    this.width = canvas.getAttribute("width")
    this.height = canvas.getAttribute("height")
  }
}

class Application extends Container {
  constructor(paths) {
    super()
    this.paths = paths

    this.setup()
    this.init()

    this.run = this.run.bind(this)
  }

  setup() {
    this.textures = {}
    // events
    this.keydowns = {}
    this.events = {}

    this.timer = null
  }

  init() {
    const that = this
    window.addEventListener("keydown", function(e) {
      const k = e.key
      that.keydowns[k] = true
    })

    window.addEventListener("keyup", function(e) {
      const k = e.key
      that.keydowns[k] = false
    })
  }

  registerAction(key, callback) {
    this.events[key] = callback
  }

  drawBackground() {
    const img = this.getImgByName("bg")
    this.drawImage(img, 0, 0, this.width, this.height)
  }

  run() {
    const { container, events, keydowns } = this

    const keys = Object.keys(events)
    keys.forEach(key => {
      if (keydowns[key]) events[key]()
    })

    this.clear()

    this.drawBackground()

    this.update()

    this.draw()

    this.timer = requestAnimationFrame(this.run)
  }

  start() {
    const names = Object.keys(this.paths)
    let loaded = 0
    const that = this
    for (let i = 0, len = names.length; i < len; i++) {
      const name = names[i]
      const img = new Image()
      img.src = this.paths[name]
      img.onload = function() {
        that.textures[name] = img
        loaded += 1
        if (loaded == names.length) {
          that.timer = requestAnimationFrame(that.run)
        }
      }
    }
  }

  getImgByName(name) {
    return this.textures[name]
  }
}
