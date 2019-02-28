class SceneTitle extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    this.fullScreen = false
    const self = this
    this.registerAction('k', function() {
      const s = SceneMain.new(self.game)
      self.game.replaceScene(s)
    })

    this.registerAction('e', function() {
      const s = SceneEditor.new(self.game)
      self.game.replaceScene(s)
    })

    this.registerAction('q', function() {
      if (self.fullScreen) {
        self.fullScreen = false
        document.webkitExitFullscreen()
      } else {
        self.fullScreen = true
        document.documentElement.webkitRequestFullScreen()
      }
    })
    
    this.registerAction('c', function() {
      log('清空当前游戏进度')
    })
  }

  draw() {
    super.draw()

    const { game, } = this
    const c = game.context

    const fontSize = 60
    const interval = 100

    c.fillStyle = "#db3236"
    c.font =`${fontSize}px 微软雅黑`
    let text = config.game_name
    let l1 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w - l1) / 2, 
      config.h / 2 - interval * 2,
    )

    c.fillStyle = '#fff'
    config.optionList.forEach(function(text, i) {
      c.font = `${fontSize / 2}px 微软雅黑`
      let len = c.measureText(text).width
      c.fillText(
        text, 
        (config.w - len) / 2, 
        interval * 4 + (i * 50),
      )
    }, this)
    
    c.fillStyle = '#fff'
    c.font = `${fontSize / 3}px 微软雅黑`
    text = `make by ${config.author_name}`
    let l2 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w - l2) / 2, 
      config.h - interval,
    )
  }
}