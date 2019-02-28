class SceneEnd extends Scene {
  constructor(game) {
    super(game)

    this.init()
  }

  init() {
    const self = this
    this.addKEvent('r', function() {
      const s = SceneTitle.new(self.game)
      self.game.replaceScene(s)     
    })

    this.addKEvent('k', function() {
      const s = SceneMain.new(self.game)
      self.game.replaceScene(s)        
    })
  }

  draw() {
    super.draw()

    const { context: c, } = this.game
    const space = 30
    c.fillStyle = 'rgba(0, 0, 0, 0.3)'
    c.fillRect(
      space, 
      space, 
      config.w - space * 2,
      config.h - 2 * space,
    )

    const fontSize = 60
    const interval = 100
    c.fillStyle = "#fff"

    c.font =`${fontSize / 3}px 微软雅黑`
    let text = '成绩: 10000'
    let l1 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w - l1) / 2, 
      config.h / 2 - interval * 2,
    )
    
    c.font = `${fontSize}px 微软雅黑`
    text = 'GAME OVER'
    let l2 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w - l2) / 2, 
      config.h / 2 - interval,
    )

    c.font =`${fontSize / 2}px 微软雅黑`
    text = '重新开始 (K)'
    let l3 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w) / 2 - l3 * 1.5, 
      config.h / 2 + interval,
    )

    text = '返回主页 (R)'
    let l4 = c.measureText(text).width
    c.fillText(
      text, 
      (config.w + l4) / 2, 
      config.h / 2 + interval,
    )
  }
}