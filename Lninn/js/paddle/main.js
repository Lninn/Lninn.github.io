const __main = function() {
  Game.instance(config.images, function(game) {
    const s = SceneTitle.new(game)
    // const s = SceneEnd.new(game)
    // const s = SceneMain.new(game)
    game.runWithScene(s)
  })
}

__main()