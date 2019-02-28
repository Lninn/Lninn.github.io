const Enemy = function(game) {
  const img = game.imageByName('enemy1')
  const o = {
    game,
    bullets: [],
    cooldown: 0,
  }

  o.image = img
  o.w = img.width
  o.h = img.height

  o.setup = function() {
    // o.h -= 23
    // o.w -= 25
    o.y = -randomBetween(200, 400)
    o.x = randomBetween(0, 700)
    o.speed = randomBetween(3, 7)
  }

  o.setup()

  o.fire = function() {
    if (o.cooldown == 0) {
      o.cooldown = 4
      const b = Bullet(o.game, o.x + o.image.width / 2 - 10, o.y)
      o.bullets.push(b)
    }
  }

  o.collide = function(plane) {
    for (const b of plane.bullets) {
      if (intersect(o, b)) {
        plane.bullets.splice(plane.bullets.indexOf(b), 1)
        return true
      }
    }

    return false
  }

  o.update = function() {
    o.y += o.speed
    if (o.y > 1200) {
      o.setup()
    }

    if (o.cooldown > 0) {
      o.cooldown -= 1
    }

    for (const b of o.bullets) {
      b.update()
    }
  }

  o.draw = function() {
    o.game.drawImage(o)

    for (const b of o.bullets) {
      b.draw()
    }
  }

  return o
}
