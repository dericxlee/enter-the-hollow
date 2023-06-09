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

class Game{
    static BOSS_TIMER = 30
    static DIM_X = 1400
    static DIM_Y = 700
    static NUM_MON = 30
    static MON_TIMER = 7500
    static TIMER = 60
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
        this.paused = true
    
        this.img = new Image();
        this.img.src = './assets/map2.jpeg'

        
        this.kills = 0
        this.damageDone = 0
        this.reset = this.resetGameState.bind(this)
        this.endless = this.endlessMode.bind(this)
        this.hero.displayChoices()
        currentTime.innerText = `${this.timer}`
    }

    allObjects(){
        let objs = [].concat(this.projectiles, this.monsters, this.gems, this.hero)
        return objs
    }

    // allMovingObjects(){
    //     return [].concat(this.hero, this.monsters, this.projectiles)
    // }

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
            // console.log(weapon)
            weapon.addProjectile()
        }
    }

    pauseProjectiles(){
        for(let i = 0; i < this.hero.weapons.length; i++){
            let weapon = this.hero.weapons[i]
            weapon.pauseProjectile()
        }
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
        this.monsterSpawn += 2
        return this.addMonster()
    }

    resumeGameState(){
        this.resumeProjectiles()
        this.resumeSpawn()
        this.resumeMovement()
        this.resumeCollision()
        this.resumeTimer()
        this.paused = false
    }

    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y)
        const allObjs = this.allObjects()
        for(let i = 0; i < allObjs.length; i++){
            let obj = allObjs[i];
            obj.draw(ctx);
        }
    }

    moveObjects(){
        this.hero.move()
        this.monsters.forEach(mon => mon.chase())
        this.monsters.forEach( mon => mon.move())
        this.gems.forEach(gem => gem.chase())
        this.gems.forEach(gem => gem.move())
        this.projectiles.forEach( proj => proj.move())
    }

    resumeSpawn(){
        this.intervalId = setInterval(() => {
            this.spawnMonsters()}
        , Game.MON_TIMER)
        return this.intervalId
    }

    pauseSpawn(){
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


    resumeMovement(){
        this.moveIntervalId = setInterval(() => {
            this.moveObjects()}
        , 50)
        return this.moveIntervalId
    }

    pauseMovement(){
        return clearInterval(this.moveIntervalId)
    }

    // xWrap(pos){ //for testing only
    //     let x = pos % Game.DIM_X;
    //     if(x < 0) x += Game.DIM_X;
    //     return x;
    // }

    // yWrap(pos){ //for testing only
    //     let y = pos % Game.DIM_Y;
    //     if(y < 0) y += Game.DIM_Y;
    //     return y;
    // }

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

    pauseTimer(){
        return clearInterval(this.timerIntervalId)
    }

    pauseGameState(){ 
        this.pauseProjectiles()
        this.pauseCollision()
        this.pauseMovement()
        this.pauseSpawn()
        this.pauseTimer()
        this.paused = true
    }

    resumeTimer(){
        this.timerIntervalId = setInterval(()=>{
            this.timer -= 1
            currentTime.innerText = `${this.timer}`
            if(this.timer < 0) currentTime.innerText = "Endless"
            if(this.timer % Game.BOSS_TIMER === 0) this.addBoss()
            if(this.timer === 0) this.gameOver()
        }, 1000)
    }


    gameOver(){
        this.pauseGameState()
        gameOverPopUp.style = 'display:flex'

        if(this.hero.health > 0){
            resetButton.innerText = "Endless Mode"
            resetButton.addEventListener("click", this.endless)
            endGame.innerText = "You Survived..."
            endGame.style.color = "black"
            endMsg.innerText = "Take your chances at Endless?"
            endMsg.style.color = "black"
            gameOverPopUp.style.backgroundColor = "lightblue"

        } else {
            resetButton.innerText ="Try Again?"
            resetButton.addEventListener("click", this.reset)
            endGame.innerText = "Game Over"
            endMsg.innerText = "Care to enter again?"
        }

        monKills.innerText = `Enemies defeated: ${this.kills}`
        highLvl.innerText = `Level reached: ${this.hero.level}`
        dmgDone.innerText = `Total damage dealt: ${this.damageDone}`

        // resetButton.addEventListener("click", this.reset)
    }

    resetGameState(){
        this.hero.resetHeroState()
        this.monsterSpawn = Game.NUM_MON
        this.damageDone = 0
        this.kills = 0
        this.monsters = [];
        this.addMonster()
        this.gems = [];
        this.projectiles = [];
        this.timer = Game.TIMER
        gameOverPopUp.style = 'display:none'
        currentTime.innerText = `${this.timer}`
        resetButton.removeEventListener("click", this.reset)
        this.intervalId = null
        this.moveIntervalId = null
        this.collisionIntervalId = null
        this.timerIntervalId = null
        this.hero.displayChoices()
    }

    endlessMode(){
        this.timer = -1
        currentTime.innerText = "Endless"
        resetButton.removeEventListener("click", this.endless)
        gameOverPopUp.style = 'display:none'
        this.resumeGameState()
    }
}

export default Game;