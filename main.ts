scene.setBackgroundColor(15)
effects.starField.startScreenEffect()

info.setScore(0)
info.setLife(3)

let playerShip = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . 7 . . . . . 7 . . . . .
    . . . . 7 7 . . . 7 7 . . . . .
    . . . . . 7 . . . 7 . . . . . .
    . . . . 7 7 7 7 7 7 7 . . . . .
    . . . . 7 . 7 7 7 . 7 . . . . .
    . . . . 7 7 7 7 7 7 7 . . . . .
    . . 7 7 7 7 . . . 7 7 7 7 . . .
    . . 7 . 7 7 7 7 7 7 7 . 7 . . .
    . . 7 . . . . . . . . . 7 . . .
    . 7 7 . . . . . . . . . 7 7 . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

playerShip.setPosition(80, 110)
playerShip.setStayInScreen(true)
controller.moveSprite(playerShip, 120, 120)

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 7 7 7 7 7 7 7 . . . . .
        . . . . 7 a a a a a 7 . . . . .
        . . . . 7 a 6 5 6 a 7 . . . . .
        . . . . 7 a 5 6 5 a 7 . . . . .
        . . . . 7 a a a a a 7 . . . . .
        . . . . 7 7 7 7 7 7 7 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, playerShip, 0, -150)

    music.pewPew.play();
})

game.onUpdateInterval(1000, function () {
    let enemy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . 2 . 2 2 2 . 2 . . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . 2 2 . . . 2 2 . . . . .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)

    enemy.x = randint(10, 150)
    enemy.y = 0
    enemy.vy = randint(30, 80)
})

game.onUpdateInterval(15000, function () {
    let life = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 2 2 2 2 . . 2 2 2 2 . . .
        . . . 2 . . 2 2 2 2 . . 2 . . .
        . . . 2 . . . . . . . . 2 . . .
        . . . 2 2 . . . . . . 2 2 . . .
        . . . . 2 2 . . . . 2 2 . . . .
        . . . . . 2 2 . . 2 2 . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . . 2 2 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Food)

    life.x = randint(10, 150)
    life.y = 0
    life.vy = randint(30, 80)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, other) {
    other.destroy(effects.disintegrate, 200)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    music.zapped.play()
})    

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, other) {
    sprite.destroy()
    other.destroy(effects.fire, 200)
    scene.cameraShake(4, 500)
    info.changeScoreBy(10)
    music.baDing.play()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, other) {
    other.destroy(effects.hearts, 200)
    scene.cameraShake(4, 500)
    info.changeLifeBy(1)
    music.magicWand.play()
})