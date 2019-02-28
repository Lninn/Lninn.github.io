class SceneMain extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.paused = false

    const g = this.game
    this.paddle = Paddle.new(g, 'paddleBig')
    this.ball = Ball.new(g, 'ball1')
    this.player = Palyer.new(this)
    
    // blocks
    this.blocks = []
    this.numOfBlock = 0

    this.initBoard()
    this.setKeydownEvent()

    this.load()
    this.addElement(this.paddle)
    this.addElement(this.ball)
    this.addElement(this.player)
  }

  initBoard() {
    this.pauseBoard = Board.new(this.game.context)

    this.pauseBoard.addRect({
        color: 'rgba(0, 0, 0, 0.3)',
        x: 80, 
        y: 400, 
        w: config.w - 2 * 80,
        h: 300,
    })

    this.pauseBoard.addText([
      {
        text: '是否继续本局游戏 ?',
        font: '40px 微软雅黑',
        color: '#fff',
        x: w => (config.w - w) / 2,
        y: config.h / 2,
      },
      {
        text: 'Yes(Y)',
        x: w => (config.w - w * 4) / 2,
        y: config.h / 2 + 100,
      },
      {
        text: 'No(N)',
        x: w => (config.w + w * 2) / 2,
        y: config.h / 2 + 100,
      }
    ])

    this.passBoard = Board.new(this.game.context)

    this.passBoard.addRect({
      color: 'rgba(0, 0, 0, 0.3)',
      x: 80, 
      y: 400, 
      w: config.w - 2 * 80,
      h: 300,
    })

    this.passBoard.addText({
      text: '恭 喜 过 关!',
      font: '60px 微软雅黑',
      color: '#fff',
      x: w => (config.w - w) / 2,
      y: config.h / 2 + 60,
    })
  }

  setKeydownEvent() {
    const self = this
    this.registerAction('a', function() {
      if (!self.player.pass && !self.paused) {
        self.paddle.moveLeft()
      }
    })
  
    this.registerAction('d', function() {
      if (!self.player.pass && !self.paused) {
        self.paddle.moveRight()
      }
    })
  
    this.registerAction('f', function() {
      self.ball.fire()
    })

    this.addKEvent('p', function() {
      self.pause()        
    })

    this.addKEvent('y', function() {
      self.paused = false 
      self.removeElement(self.pauseBoard)       
    })

    this.addKEvent('n', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)        
    })
  }

  load(num = 1) {
    this.removeElement(this.passBoard)

    this.blocks = []

    const data = getDataFromLS('LEVELS') || []
    const points = data[num] || []
   
    this.numOfBlock = points.length
    for (const point of points) {
      this.addBlock(point)
    }
  }

  addBlock(point) {
    const b = Block.new(this.game, 'blockRed', point)
    this.blocks.push(b)
    this.addElement(b)
  }

  passLevel() {
    this.player.pass = true
    this.addElement(this.passBoard)
  }

  pause() {
    // log('暂停游戏')
    if (this.paused) {
      return
    }

    this.paused = true
    this.addElement(this.pauseBoard)
  }

  update() {
    super.update()
    
    if (this.paused || this.player.pass) {
      return
    }

    // blocks
    this.blocks.forEach(function(block) {
      if (block.collide(this.ball)) {  
        block.kill()
        this.ball.rebound(block)
        this.player.addScore()
        // 如果 alive false 表示减少一个
        if (!block.alive) {
          this.numOfBlock -= 1
        }
      }
    }, this)

    if (this.numOfBlock === 0) {
      this.passLevel()
    }
    
    // 3 是否满足当前游戏结束条件
    if (this.ball.y > this.paddle.y) {
      this.player.subLife()
      this.ball.reset()
    }

    this.ball.move(this.boardArea.h)

    if (this.paddle.collide(this.ball)) {
      this.ball.rebound(this.paddle)
    }
  }
}