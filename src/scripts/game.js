import Hero from './hero.js';
import Monster from './monster.js';
import Starfall from "./starfall.js";
import Weapon from './weapon.js';
import Projectile from './projectile.js';
import Consecration from './consecration.js';
import BladeFlurry from './blade_flurry.js';
import Fireball from './fireball.js';
import Boss from './boss.js'

const currentTime = document.getElementById('current-time')
const gameOverPopUp = document.getElementById('game-over-pop-up')
const monKills = document.getElementById('mon-kills')
const highLvl = document.getElementById('highest-lvl')
const dmgDone = document.getElementById('damage-done')
const endGame = document.getElementById('end-game')
const endMsg = document.getElementById('end-msg')
const resetButton = document.getElementById('play-again-btn')
// const playerSpeed = document.getElementById('speed')
// const playerMagnet = document.getElementById('magnet')
// const playerHealth = document.getElementById('health')
// const progressLevel = document.getElementById('progress-level')

class Game{
    static DIM_X = 1400
    static DIM_Y = 700
    static NUM_MON = 20
    static SPAWN_RATE = 5000
    static TIMER = 180
    constructor(options){
        this.monsterSpawn = Game.NUM_MON;
        this.hero = this.addHero();
        this.monsters = [];
        this.gems = [];
        this.projectiles = [];
        this.addMonster();
        this.timer = Game.TIMER;
        this.intervalId = null
        this.moveIntervalId = null
        this.collisionIntervalId = null
        this.timerIntervalId = null

        this.resumeGameState()
        this.img = new Image();
        
        // this.img.onload = () => {
        //     this.ctx.drawImage(this.img, 0, 0, 1000, 1000)
        //     // console.log(this.img instanceof Image, "img")
        // };

        // this.img.src = './assets/grass.png';
        this.img.src = './assets/map2.jpeg'

        // this.addBoss()
        currentTime.innerText = `${this.timer}`

        this.kills = 0
        this.damageDone = 0
        this.reset = this.resetGameState.bind(this)
        this.pauseGameState()
        this.hero.displayChoices()
    }

    allObjects(){
        let objs = [].concat(this.projectiles, this.monsters, this.gems, this.hero)
        return objs
    }

    allMovingObjects(){
        return [].concat(this.hero, this.monsters, this.projectiles)
    }

    add(obj){
        if (obj instanceof Hero) {
            this.hero.push(obj)
        } else if (obj instanceof Monster) {
            this.monsters.push(obj)
        } else if (obj instanceof Gem) {
            this.gems.push(obj)
        } else if (obj instanceof Projectile) {
            this.projectiles.push(obj)
        } else {
            throw new Error("unknown type of object");
        }
    }

    resumeProjectiles(){
        for(let i = 0; i < this.hero.weapons.length; i++){
            let weapon = this.hero.weapons[i]
            console.log(weapon)
            weapon.addProjectile()
        }
    }

    pauseProjectiles(){
        // if(this.hero.weapons.length){
        for(let i = 0; i < this.hero.weapons.length; i++){
            let weapon = this.hero.weapons[i]
            console.log(weapon)
            weapon.pauseProjectile()
        }
        // } else {
        //     return false
        // }
    }

    addMonster(){
        for (let i = this.monsters.length; i < this.monsterSpawn; i++){
            this.add(new Monster({x: this.randomXPosition(), y: this.randomYPosition(), game: this, hero: this.hero}))
        }
    }

    addBoss(){
        this.add(new Boss({x: this.randomXPosition(), y: this.randomYPosition(), game: this, hero: this.hero}))
    }

    addHero(){
        return new Hero({xvel: 0, yvel: 0, game: this })
    }

    spawnMonsters(){
        this.monsterSpawn += 1
        return this.addMonster()
    }

    resumeGameState(){
        this.resumeProjectiles()
        this.resumeSpawn()
        this.resumeMovement()
        this.resumeCollision()
        this.resumeTimer()
    }

    resumeSpawn(){
        this.intervalId = setInterval(() => {
            this.spawnMonsters()}
        , Game.SPAWN_RATE)
        // console.log(this.intervalId, "interval")
        return this.intervalId
    }

    pauseSpawn(){
        // console.log("game paused")
        return clearInterval(this.intervalId)
    }

    remove(obj) {
        if (obj instanceof Monster) {
            this.monsters.splice(this.monsters.indexOf(obj), 1);
            this.kills += 1
            this.add(new Gem({x: obj.x, y: obj.y, game: this}))
        } else if (obj instanceof Gem) {
            this.gems.splice(this.gems.indexOf(obj), 1);
            this.hero.gainExp()
        } else if (obj instanceof Projectile) {
            this.projectiles.splice(this.projectiles.indexOf(obj), 1);
        } else {
            throw new Error("unknown type of object");
        }
    }

    randomXPosition(){
        return Math.random() * Game.DIM_X
    }

    randomYPosition(){
        return Math.random() * Game.DIM_Y
    }

    draw(ctx) {
        // ctx.clearRect(0,0,1000,1000)
        ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y)
        const allObjs = this.allObjects()
        for(let i = 0; i < allObjs.length; i++){
            let obj = allObjs[i];
            obj.draw(ctx);
        }
    }

    moveObjects(){
        // console.log(this.monster.xvel, this.monster.yvel)
        // this.checkCollision()
        this.hero.move()
        this.monsters.forEach(mon => mon.chase())
        // console.log(this.monster.xvel, this.monster.yvel)
        this.monsters.forEach( mon => mon.move())
        this.gems.forEach(gem => gem.chase())
        this.gems.forEach(gem => gem.move())
        this.projectiles.forEach( proj => proj.move())
    }

    resumeMovement(){
        this.moveIntervalId = setInterval(() => {
            this.moveObjects()}
        , 50)
        // console.log(this.intervalId, "interval")
        return this.moveIntervalId
    }

    pauseMovement(){
        return clearInterval(this.moveIntervalId)
    }

    xWrap(pos){ //for testing only
        let x = pos % Game.DIM_X;
        if(x < 0) x += Game.DIM_X;
        return x;
    }

    yWrap(pos){ //for testing only
        let y = pos % Game.DIM_Y;
        if(y < 0) y += Game.DIM_Y;
        return y;
    }

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];
    
                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return collision;
                }
            }
        }
    }

    resumeCollision(){
        this.collisionIntervalId = setInterval(() => {
            this.checkCollisions()}
        , 40)
        // console.log(this.intervalId, "interval")
        return this.collisionIntervalId
    }

    pauseCollision(){
        return clearInterval(this.collisionIntervalId)
    }

    pauseGameState(){ 
        // this.pauseProjectiles()
        this.pauseCollision()
        this.pauseMovement()
        this.pauseSpawn()
        this.pauseTimer()
    }

    resumeTimer(){
        this.timerIntervalId = setInterval(()=>{
            this.timer -= 1
            currentTime.innerText = `${this.timer}`
            // console.log(this.timer)
            if(this.timer % 5 === 0) this.addBoss()
            if(this.timer === 0) this.gameOver()
        }, 1000)
    }

    pauseTimer(){
        return clearInterval(this.timerIntervalId)
    }

    gameOver(){
        this.pauseGameState()
        this.pauseProjectiles()
        gameOverPopUp.style = 'display:block'


        if(this.hero.health > 0){
            endGame.innerText = "Victory!"
            endMsg.innerText = "You survived the Endless Hollow"
        } else {
            endGame.innerText = "Game Over!"
            endMsg.innerText = "Better luck next time!"
        }

        monKills.innerText = `Enemies defeated: ${this.kills}`
        highLvl.innerText = `Level reached: ${this.hero.level}`
        dmgDone.innerText = `Damage dealt: ${this.damageDone}`

        resetButton.addEventListener("click", this.reset)
    }

    resetGameState(){
        // this.hero.health = Hero.HP
        // this.hero.magnetism = Hero.MAGNET
        // this.hero.level = Hero.START_LVL
        // this.hero.speed = Hero.SPEED
        // this.hero.experience = 0
        // this.hero.experienceForLevel = Hero.EXP_REQ
        // this.hero.x = Hero.START_X
        // this.hero.y = Hero.START_Y
        this.hero.resetHeroState()
        this.damageDone = 0
        this.kills = 0
        this.monsters = [];
        this.addMonster()
        this.gems = [];
        this.projectiles = [];
        this.timer = Game.TIMER
        // this.resumeGameState()
        this.hero.displayChoices()
        gameOverPopUp.style = 'display:none'
        // progressLevel.innerText = `Level: ${this.hero.level}`
        // playerSpeed.innerText = `Speed: ${this.hero.speed}`
        // playerHealth.innerText = `Health: ${this.hero.health}`
        // playerMagnet.innerText = `Magnetic: ${this.hero.magnetism}`
        currentTime.innerText = `${this.timer}`
        resetButton.removeEventListener("click", this.reset)
    }
}

export default Game;