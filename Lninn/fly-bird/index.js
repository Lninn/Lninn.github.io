const __main = function() {
  const paths = {
    bg: "./img/background.png",
    pipe: "./img/pipe.png",
    bird: "./img/bird.png",
    ground: "./img/ground.png",
  }

  const app = new Application(paths)
  log(app)

  const bird = new Bird(app)

  const ground = new Ground(app)

  const pipes = new PipeList(app)

  // 移动端点击
  function handleStart() {
    bird.jump()
  }
  const canvas = app.canvas
  canvas.addEventListener("touchstart", handleStart, false);

  // 键盘事件
  window.addEventListener("keydown", e => {
    const key = e.key
    if (key == "d") {
      !config.paused && bird.jump()
    }
  })

  window.addEventListener("keydown", e => {
    const key = e.key
    if (key == "p") {
      config.paused = !config.paused
    }
  })

  let score = 0
  const between = (value, start, end) => {
    return value >= start && value <= end
  }
  
  app.update = function() {
    if (config.paused) {
      bird.update()
      return
    }

    ground.update()
    // pipes.update()
    for (const pipe of pipes.pipes) {
      pipe.update()

      // 碰撞检测
      // const a = bird
      // const b = pipe
      // const x = b.y + b.h1 + 300
      // if (between(a.x, b.x, b.x + b.width) || between(b.x, a.x, a.x + a.width)) {
      //   if (
      //     between(a.y, b.y, b.y + b.height) ||
      //     between(b.y, a.y, a.y + a.height) ||
      //     between(a.y, x, x + b.h2) ||
      //     between(x - a.height / 2 + 10, a.y, a.y + a.height)
      //   ) {
      //       config.paused = !config.paused
      //   }
      // }

      // if (!pipe.checked && pipe.pass(bird)) {
      //   pipe.checked = true
      //   score += 100
      // }
    }

    bird.update()
  }

  app.draw = function() {
    ground.draw()
    pipes.draw()
    bird.draw()

    const c = app.ctx
    const fontSize = 120
    c.fillStyle = "#f00"

    c.font = `${fontSize / 3}px 微软雅黑`
    let text = `Score: ${score}`
    let scoreLen = c.measureText(text).width
    const w = (config.width + scoreLen) / 2
    const h = config.height / 2
    c.fillText(text, w, h)
  }

  app.start()
}

__main()

//
