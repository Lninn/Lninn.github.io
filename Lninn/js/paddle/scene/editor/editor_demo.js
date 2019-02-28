class SceneDemo extends Scene {
  constructor(game) {
    super(game)

    this.setup()
    this.init()
  }

  setup() {
    this.bg = GameImage.new(this.game, 'editorBg')

    this.w = 400
    this.h = 600
    this.blocks = []
  }

  init() {
    this.addElement(this.bg)

    const b = {
      w: 40,
      h: 20,
    }

    for (let i = 0; i <= this.h; i += b.h) {
      for (let j = 0; j <= this.w; j += b.w) {
        this.blocks.push([j, i])
      }
    }

    const self = this

    this.game.canvas.addEventListener('click', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      const b = self.getBlock(point)
      if (b) {
        self.addElement(b)
      }
  
    })

    let enableDrag = false
    this.game.canvas.addEventListener('mousedown', function(event) {
      const x = event.offsetX
      const y = event.offsetY  
      
      if (x >= 0 && x <= 400) {
        if (y >= 0 && y <= 600) {
          enableDrag = true
        }
      }
    })

    this.game.canvas.addEventListener('mousemove', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (enableDrag) {
        const b = self.getBlock(point)
        if (b) {
          self.addElement(b)
        }
      }
    })

    this.game.canvas.addEventListener('mouseup', function(event) {
      enableDrag = false
    })
  
  }

  addBlock(point) {
    const b = Block.new(this.game, point)
    this.addElement(b)
  }

  getBlock(point = []) {
    for (const p of this.blocks) {
      const b = Block.new(this.game, p)
      if (hasPoint(b, point)) {
        return b
      }
    }

    return null
  }
}