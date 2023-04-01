import Game from "./game.js";

class GameView {
    constructor (ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.hero = this.game.addHero();
    }

    start(){
        this.spawn();
        // this.game.acquireWeapon();
        // this.game.hero.weaponOne.addProjectile()
        setInterval(() => {
            this.game.checkCollisions();
            // this.hero.weaponOne.addProjectiles();
            this.game.moveObjects();
            this.game.draw(this.ctx);
            // console.log(this.game.hero.experience, "exp")
            // console.log(this.game.hero.level, "level")
        }, 50);
    }

    spawn(){
        setInterval(() => {
            // console.log(this.game.allObjects().length, "obj")
            this.game.spawnMonsters();
        }, 5000)
    }
}

export default GameView;