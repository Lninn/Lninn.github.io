class SceneMain extends Scene {
  constructor(game) {
    super(game)

    this.setup()
    this.init()
  }

  setup() {
    this.bg1 = Texture.new(this.game, 'bg1', 0, -1000)
    this.bg2 = Texture.new(this.game, 'bg1', 0, -3048)
    this.bgSpeed = 3

    this.player = Player.new(this.game, this)
  }

  init() {
    this.addElement(this.bg1)
    this.addElement(this.bg2)

    this.addElement(this.player)
  }

  update() {
    if (this.bg1.y >= 1000) {
      this.bg1.y = this.bg2.y - 2048
    }

    if (this.bg2.y >= 1000) {
      this.bg2.y = this.bg1.y - 2048
    }

    this.bg1.y += this.bgSpeed
    this.bg2.y += this.bgSpeed

    super.update()
  }
}