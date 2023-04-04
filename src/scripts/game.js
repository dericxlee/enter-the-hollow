import Hero from './hero.js';
import Monster from './monster.js';
import Starfall from "./starfall.js";
import Weapon from './weapon.js';
import Projectile from './projectile.js';
import Consecration from './consecration.js';

class Game{
    static DIM_X = 1000
    static DIM_Y = 1000
    static NUM_MON = 50
    static SPAWN_RATE = 5000
    constructor(options){
        this.monsterSpawn = Game.NUM_MON;
        this.hero = this.addHero();
        this.monsters = [];
        this.gems = [];
        this.projectiles = [];
        this.addMonster();
        this.intervalId = null
        this.moveIntervalId = null
        this.collisionIntervalId = null
        // console.log(this.spawning)
        this.resumeGameState()
    }

    allObjects(){
        let objs = [].concat(this.hero, this.monsters, this.gems, this.projectiles)
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

    acquireWeapon(){
        console.log(this.hero.weapons.length, "beg")
        // if(!this.hero.weaponOne) this.hero.weaponOne = new Starfall({hero: this.hero})
        // if(!this.hero.weaponOne) this.hero.weaponOne = new Consecration({hero: this.hero})
        // console.log(this.hero.weaponOne instanceof Starfall, "starfall?")
        // console.log(this.hero.weaponOne instanceof Consecration, "cons?")
        this.hero.weapons.push(new Starfall({hero: this.hero}));
        // console.log(this.hero.weapons.length, "star")
        this.hero.weapons.push(new Consecration({hero: this.hero}));
        // console.log(this.hero.weapons.length, "con")
    }

    callWeapons(){
        for(let i = 0; i < this.hero.weapons.length; i++){
            let weapon = this.hero.weapons[i]
            weapon.addProjectile()
        }
    }

    addMonster(){
        for (let i = this.monsters.length; i < this.monsterSpawn; i++){
            this.add(new Monster({x: this.randomXPosition(), y: this.randomYPosition(), game: this, hero: this.hero}))
        }
        // return new Monster({x: this.randomXPosition(), y: this.randomYPosition(), hero: this.hero, game: this})
    }

    addHero(){
        // this.add(new Hero({xvel: 10, yvel: 0, game: this}))
        return new Hero({xvel: 0, yvel: 0, game: this })
    }

    spawnMonsters(){
        this.monsterSpawn += 1
        // console.log(this.monsterSpawn)
        return this.addMonster()
    }

    resumeGameState(){
        this.resumeSpawn()
        this.resumeMovement()
        this.resumeCollision()
    }

    resumeSpawn(){
        this.intervalId = setInterval(() => {
            this.spawnMonsters()}
        , Game.SPAWN_RATE)
        // console.log(this.intervalId, "interval")
        return this.intervalId
    }

    pauseSpawn(){
        console.log("game paused")
        return clearInterval(this.intervalId)
    }

    remove(obj) {
        if (obj instanceof Monster) {
            this.monsters.splice(this.monsters.indexOf(obj), 1);
        } else if (obj instanceof Gem) {
            this.gems.splice(this.gems.indexOf(obj), 1);
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
        ctx.clearRect(0,0,1000,1000)
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
        , 20)
        // console.log(this.intervalId, "interval")
        return this.collisionIntervalId
    }

    pauseCollision(){
        return clearInterval(this.collisionIntervalId)
    }

    pauseGameState(){ //does not pause draw
        this.pauseCollision()
        this.pauseMovement()
        this.pauseSpawn()
    }
}

export default Game;