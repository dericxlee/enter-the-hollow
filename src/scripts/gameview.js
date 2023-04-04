import Game from "./game.js";
import Hero from "./hero.js";

// window.keyDown = window.addEventListener('keydown', this.bindKeyDown);

class GameView {
    constructor (ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.hero = this.game.hero;
        this.start()
        this.bindKeyDown = this.bindKeyDown.bind(this)
        window.keyDown = window.addEventListener('keydown', this.bindKeyDown);
    }

    start(){
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 50);
    }

    bindKeyDown(event){
        const keyName = event.key;
        if (keyName == 'a' || keyName == 'A') this.hero.xvel = (-1 * this.hero.speed)
        if (keyName == 'd' || keyName == 'D') this.hero.xvel = (1 * this.hero.speed)
        if (keyName == 'w' || keyName == 'W') this.hero.yvel = (-1 * this.hero.speed)
        if (keyName == 's' || keyName == 'S') this.hero.yvel = (1 * this.hero.speed)
    }

}

export default GameView;