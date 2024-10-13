namespace SpriteKind {
    export const obstacle = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . e e e e e . . . . . 
        . . . . . e e . . . e e e . . . 
        . . . . . e . . . . . e e . . . 
        . . . . e e . . . . . . e . . . 
        . . . . e . . . . . . . e e . . 
        . . . . . e . . . . . . e . . . 
        . . . . . e . . . . . e e . . . 
        . . . . . e e e e e e . . . . . 
        . . . . . . e e e . . . . . . . 
        . . . . . e e . . . . . . . . . 
        e e . e e e . . . . . . . . . . 
        . e e e . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 50)
    maximum_projectiles = 5
    current_projectiles = 0
    enemy_velocity = 50
    top_speed = 150
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.obstacle, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
})
info.onCountdownEnd(function () {
    music.play(music.createSong(hex`0078000408020300001c00010a006400f4016400000400000000000000000000000000050000043c0000000400012404000800012508000c0001240c001000012510001400012714001800012918001c00012a1c002000012a20002400012c24002800012c01001c000f05001202c102c201000405002800000064002800031400060200043c0000000400012004000800012208000c0001200c001000012210001400012414001800012518001c0001271c002000012720002400012924002800012902001c000c960064006d019001000478002c010000640032000000000a0600052b0000000400012704000800012908000c00012a0c001000012c10001400022a2c14001800012c18001c00012c`), music.PlaybackMode.UntilDone)
    game.splash("You got away from the Sheriff!")
    game.setGameOverMessage(true, "Congrats Cowboy!")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food, effects.spray, 500)
})
info.onScore(5, function () {
    game.splash("Oh no, tumbleweeds!")
    info.setLife(3)
    tumbleweeds = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . e e e e e . . . . . . . 
        . . . e e . . . . e e e e . . . 
        . . . e . e e e . . e . e e . . 
        . . . e e e . e e e . . . e . . 
        . . . e . . . . . e e e . . e . 
        . . e . . . . e . . e e e . e . 
        . . e e e . e e . . e . e e e . 
        . . e . e . e e e e e . . e e . 
        . . e . e e e . . . . . . e e . 
        . . e e . . e e e e e . e e . . 
        . . . e e e . . . . e e e . . . 
        . . . . . . e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.obstacle)
    tumbleweeds.setPosition(randint(10, 142), randint(10, 142))
    tumbleweeds.setVelocity(randint(20, 50), randint(20, 50))
    tumbleweeds.setBounceOnWall(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    mySprite2.setPosition(randint(10, 142), randint(10, 142))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
let horse: Sprite = null
let tumbleweeds: Sprite = null
let current_projectiles = 0
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
let top_speed = 0
let enemy_velocity = 0
let maximum_projectiles = 0
let Difficulty = game.askForNumber("Choose difficulty!", 1)
if (Difficulty == 1) {
    maximum_projectiles = 1
    enemy_velocity = 30
    top_speed = 50
} else if (Difficulty == 2) {
    maximum_projectiles = 3
    enemy_velocity = 50
    top_speed = 100
} else if (Difficulty == 3) {
    maximum_projectiles = 5
    enemy_velocity = 100
    top_speed = 150
}
scene.setBackgroundImage(assets.image`Wild West`)
mySprite = sprites.create(assets.image`Cowboy`, SpriteKind.Player)
mySprite.setPosition(46, 81)
mySprite2 = sprites.create(assets.image`Sheriff`, SpriteKind.Enemy)
mySprite2.setPosition(108, 81)
mySprite.sayText("You ain't from around here partner...", 2000, false)
pause(2000)
mySprite2.sayText("I am the sheriff...", 2000, false)
pause(2000)
mySprite2.sayText("and I've heard you have caused some ruckus in my town.", 2000, false)
pause(2000)
mySprite.sayText("You ain't no sheriff, law ain't corrupt!", 2000, false)
pause(2000)
mySprite2.sayText("Well I am and you're going to the jail house!", 2000, false)
pause(2000)
game.splash("The Cowboy is in trouble!")
game.splash("Hold on to your boots...")
game.splash("Run away from the sheriff and grab your horses!")
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 100)
mySprite2.follow(mySprite, 50)
info.setLife(3)
info.setScore(0)
info.startCountdown(45)
game.onUpdateInterval(2000, function () {
    horse = sprites.create(assets.image`horse`, SpriteKind.Food)
    horse.setPosition(randint(10, 142), randint(10, 142))
})
