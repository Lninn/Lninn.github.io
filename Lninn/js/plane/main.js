const enableDebugMode = function(game, enable) {
  if (!enable) {
    return
  }

  game.paused = false

  window.addEventListener('keydown', function(event) {
    const k = event.key

    if (k == 'p') {
      game.paused = !game.paused
    }
  })

  game.enableDrag = false
  game.mouse = function(target) {
    const g = game.canvas

    g.addEventListener('mousedown', function(event) {
      const p = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (hasPoint(target, p)) {
        game.enableDrag = true
      }
    })

    g.addEventListener('mousemove', function(event) {
      const p = {
        x: event.offsetX,
        y: event.offsetY,
      }

      if (game.enableDrag) {
        target.x = p.x
        target.y = p.y
      }
    })

    g.addEventListener('mouseup', function(event) {
      game.enableDrag = false
    })
  }
}

const App = function(game) {
  const s = SceneMain.new(game)
  return s
}

const __main = function() {
  const images = {
    bg1: 'img/bg_1.png',
    bullet1: 'img/bullet_1.png',
    enemy1: 'img/enemy_1.png',
    plane: 'img/plane.png',
    plane1: 'img/plane/plane_01.gif',
    plane2: 'img/plane/plane_02.gif',
    plane3: 'img/plane/plane_03.gif',
    plane4: 'img/plane/plane_04.gif',
    plane5: 'img/plane/plane_05.gif',
    plane6: 'img/plane/plane_06.gif',
    plane7: 'img/plane/plane_07.gif',
    plane8: 'img/plane/plane_08.gif',
    plane9: 'img/plane/plane_09.gif',
    plane10: 'img/plane/plane_10.gif',
    plane11: 'img/plane/plane_11.gif',
    plane12: 'img/plane/plane_12.gif',
    plane13: 'img/plane/plane_13.gif',
    plane14: 'img/plane/plane_14.gif',
    plane15: 'img/plane/plane_15.gif',
    plane16: 'img/plane/plane_16.png',
    boom1: 'img/boom_1.gif',
  }
  
  const g = Game(images)

  enableDebugMode(g, true)

  g.__start(App)
}

__main()