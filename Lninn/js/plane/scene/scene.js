class Scene {
  constructor(game) {
    this.game = game

    this.elements = []
  }

  static new(...args) {
    return new this(...args)
  }

  registerAction(key, action) {
    if (key.length > 1) {
      for (const k of key) {
        this.game.actions[k] = action
      }
    } else {
      this.game.actions[key] = action
    }
  }

  addElement(element) {
    this.elements.push(element)
  }

  removeElement(element) {
    const i = this.elements.indexOf(element)
    this.elements.splice(i, 1)
  }

  update() {
    for (const element of this.elements) {
      element.update()
    }
  }

  draw() {
    for (const element of this.elements) {
      element.draw()
    }
  }
}