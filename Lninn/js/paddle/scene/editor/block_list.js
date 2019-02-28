class BlockList{
  constructor(scene) {
    this.scene = scene

    this.setup()
    this.init()
  }

  setup() {
    this.positions = []
    this.blocks = []
    this.points = []
    this.texts = []

    this.level = 1
  }

  init() {
    const img = config.images['blockRed']
    for (let y = 0; y <= config.h; y += img.height) {
      for (let x = 0; x <= config.w; x += img.width) {
        this.positions.push({
          x,
          y,
          w: img.width,
          h: img.height,
        })
      }
    }
  }

  addPoint(point, isMove = false) {
    const p = this.getClosestPoint(point)
    const i = this.findIndex(p)

    if (i < 0) {
      this.addBlock(p)
    } else if (!isMove) {
      this.blocks[i].addLives()
    }
  }

  getClosestPoint(point) {
    for (const p of this.positions) {
      if (hasPoint(p, point)) {
        return p
      }
    }

    return null
  }

  findIndex(point) {
    return this.points.findIndex(function(p) {
      return p.x === point.x && p.y === point.y
    })
  }

  addBlock(point) {
    this.points.push(point)
    const b = Block.new(this.scene.game, 'blockRed', point)
    this.blocks.push(b)
  }

  setPointList(num) {
    this.level = num
    
    const data = getDataFromLS('LEVELS')
    const pointList = data[num] || []

    if (pointList.length == 0) {
      this.clear()     
    } else {
      for (const point of pointList) {
        const t = Block.new(this.scene.game, 'blockRed', point)
        this.blocks.push(t)
      }
  
      this.points = this.points.concat(pointList)
      this.numOfBlock = this.points.length
    }
  }

   /**
   * 表示是否清除本地数据
   * 还是清除当前的数据
   * @param {Boolean} x: 布尔标识，默认清除本地数据
   */
  clear(bool = true) {
    this.blocks = []
    this.points = []
    
    if (bool) {
      this.setData()
    }
  }

  setData() {
    const data = getDataFromLS('LEVELS')
    data[this.level] = this.blocks
      .filter(b => b.lives > 0)
      .map(b => ({
        x: b.x,
        y: b.y,
        lives: b.lives,
      }))

    setDataToLS('LEVELS', data)
  }

  update() {
    for (const b of this.blocks) {
      b.update()
    }
  }

  drawText() {
    const c = this.scene.game.context
    const { boardArea, fontSize, enableEdit, } = this.scene

    if (!enableEdit) {
      return
    }

    c.fillStyle = '#2b1216'
    c.font = fontSize + 'px 微软雅黑'
    c.fillText(
      `第 ${this.level} 关`,
      boardArea.x,
      boardArea.y + this.scene.fontSize + (boardArea.h - this.scene.fontSize) / 2,
    )
    c.fillText(
      `数量: ${this.blocks.length}`,
      boardArea.x + 500,
      boardArea.y + this.scene.fontSize + (boardArea.h - this.scene.fontSize) / 2,
    )
  }

  draw() {
    // log('block list draw')
    for (const b of this.blocks) {
      try {
        b.draw()
      } catch (error) {
        log('block list draw error')
      }
    }

    this.drawText() 
  }
}