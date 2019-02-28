class SceneEditor extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.setEditorVar()
    this.setKeydownEvent()
    this.setMouseEvent()
   
    this.setText()
  }

  setEditorVar() {
    this.enableEdit = false
    this.enableDrag = false
    this.enableMove = false

    this.fontSize = 25
    this.blockList = new BlockList(this)
  }

  setKeydownEvent() {
    const self = this
    this.addKEvent('123456789', function(num) {
      self.handleLevel(num)
    })

    this.addKEvent('c', function() {
      self.blockList.clear()
    })

    this.addKEvent('s', function() {
      self.blockList.setData()
      saveFile('LEVELS')
    })

    this.addKEvent('r', function() {
      self.toggle()
    })
  }

  setMouseEvent() {
    const c = this.game.canvas

    c.addEventListener('mousedown', this.mousedown.bind(this))

    c.addEventListener('mousemove', debounce(this.mousemove.bind(this), 200))

    c.addEventListener('mouseup', this.mouseup.bind(this))

    const self = this
    c.addEventListener('click', function(event) {
      const point = {
        x: event.offsetX,
        y: event.offsetY,
      }

      // 解决拖动和点击共存的问题
      if (self.enableMove) {
        self.enableMove = false
        return
      }

      self.checkPoint(point)
    })
  }

  setText() {
    const c = this.game.context

    this.titleText = GameText.new(c, {
      text: '关卡编辑',
      fontSize: 60,
      style: '#db3236',
      x: config.w / 2,
      y: 400,
      center: true,
    })
    
    this.tipText = GameText.new(c, {
      text: '按数字键选择你要编辑的关卡(1-9)',
      fontSize: 30,
      style: '#2d2e36',
      x: config.w / 2,
      y: 500,
      center: true,
    })

    this.addElement(this.titleText)
    this.addElement(this.tipText)
  }

  handleLevel(num) {
    if (!this.enableEdit) {
      this.enableEdit = true
      this.blockList.setPointList(num)

      this.addElement(this.blockList)
   
      this.removeElement(this.titleText)
      this.removeElement(this.tipText)
    }
  }

  toggle() {
    if (this.enableEdit) {
      this.enableEdit = !this.enableEdit
      this.removeElement(this.directText)
      this.blockList.clear(false)

      this.addElement(this.titleText)
      this.addElement(this.tipText)
    } else {
      const s = SceneTitle.new(this.game)
      this.done()
      this.game.replaceScene(s)
    }
  }

  checkPoint(point, isMove = false) {
    if (!this.enableEdit
        || point.y <= this.boardArea.y + this.boardArea.h + 15 ) {
      return
    }

    // 如果 color_mode 为 true，可以拖出随机颜色的砖块
    // 否则只能设置一种颜色
    this.blockList.addPoint(
      point,
      config.color_mode ? false : isMove
    )
  }

  mousedown(event) {
    const x = event.offsetX
    const y = event.offsetY  
    
    if (x >= 0 && x <= config.w && y >= 0 && y <= config.h) {
      this.enableDrag = true
    }
  }

  mousemove(args) {
    if (!this.enableDrag) {
      return
    }

    const event = args[0]

    const point = {
      x: event.offsetX,
      y: event.offsetY,
    }

    this.enableMove = true
    this.checkPoint(point, true)
  }

  mouseup(event) {
    this.enableDrag = false
  }
}