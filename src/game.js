import Hero from './hero.js';
import Monster from './monster.js';
import RainOfFire from "./rain_of_fire.js";

class Game{
    static DIM_X = 1000
    static DIM_Y = 1000
    static NUM_MON = 50
    constructor(){
        this.monsterSpawn = Game.NUM_MON;
        this.hero = this.addHero();
        this.monsters = [];
        this.gems = [];
        this.weapons = [];
        this.addMonster();
    }

    allObjects(){
        let objs = [].concat(this.hero, this.monsters, this.gems)
        return objs
    }

    allMovingObjects(){
        return [].concat(this.hero, this.monsters, this.weapons)
    }

    add(obj){
        if (obj instanceof Hero) {
            this.hero.push(obj)
        } else if (obj instanceof Monster) {
            this.monsters.push(obj)
        } else if (obj instanceof Gem) {
            this.gems.push(obj)
        } else if (obj instanceof Weapon) {
            this.weapons.push(obj)
        } else {
            throw new Error("unknown type of object");
        }
    }

    acquireWeapon(){
        console.log(this.hero.weaponOne)
        if(!this.hero.weaponOne) this.hero.weaponOne = new RainOfFire({game: this})
    }

    addMonster(){
        for (let i = this.monsters.length; i < this.monsterSpawn; i++){
            this.add(new Monster({x: this.randomXPosition(), y: this.randomYPosition(), game: this, hero: this.hero}))
        }
        // return new Monster({x: this.randomXPosition(), y: this.randomYPosition(), hero: this.hero, game: this})
    }

    addHero(){
        // this.add(new Hero({xvel: 10, yvel: 0, game: this}))
        return new Hero({xvel: 10, yvel: 0, game: this })
    }

    spawnMonsters(){
        this.monsterSpawn += 1
        // console.log(this.monsterSpawn)
        return this.addMonster()
    }

    remove(obj) {
        if (obj instanceof Monster) {
            this.monsters.splice(this.monsters.indexOf(obj), 1);
        } else if (obj instanceof Gem) {
            this.gems.splice(this.gems.indexOf(obj), 1);
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
        // console.log(allObjs.length)
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

}

export default Game;