const Game = function(images) {
  const canvas = e('#id-canvas')
  const o = {
    images,
    canvas,
    ctx: canvas.getContext('2d'),
    actions: {},
    keydowns: {},
    fps: 60,
    scene: null,
  }
 
  o.init = function() {
    window.addEventListener('keydown', event => {
      const k = event.key
      this.keydowns[k] = true
    })
    
    window.addEventListener('keyup', event => {
      const k = event.key
      this.keydowns[k] = false
    })
  }

  o.runloop = function() {
    const self = this

    setTimeout(function() {
      // event
      const keys = Object.keys(self.actions)
      for (const key of keys) {
        if (self.keydowns[key]) {
          self.actions[key](key)
        }
      }

      self.scene.update()

      // clear
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)

      // draw
      self.scene.draw()

      setTimeout(function() {
        self.runloop()
      }, 1000 / self.fps)
    }, 1000 / self.fps)
  }

  o.imageByName = function(name) {
    const img = o.images[name]

    return img
  }

  o.drawImage = function({ image, x, y, w, h }) {
    o.ctx.drawImage(image, x, y, w, h)
  }

  o.replaceScene = function(scene) {
    o.scene = scene
  }

  o.loadImg = function(callback) {
    loads = []
    const names = Object.keys(o.images)
    for (const name of names) {
      const path = o.images[name]
      const img = new Image()
      img.src = path
      img.onload = function() {
        loads.push(1)
        o.images[name] = img
        if (names.length == loads.length) {
          callback()
        }
      }
    }
  }

  o.__start = function(application) {
    o.loadImg(function() {
      o.scene = application(o)
      o.init()
      o.runloop()
    })
  }

  return o
}