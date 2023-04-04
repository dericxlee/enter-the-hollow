import Game from "./game.js";

class GameView {
    constructor (ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.hero = this.game.hero;
        this.start()
        this.bindKeyDown = this.bindKeyDown.bind(this)
        this.bindKeyUp = this.bindKeyUp.bind(this)
        window.keyDown = window.addEventListener('keydown', this.bindKeyDown);
        window.keyUp = window.addEventListener('keyup', this.bindKeyUp);
    }

    start(){
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 50);
    }

    bindKeyDown(event){
        const keyName = event.key;
        event.preventDefault()
        if (keyName == 'a' || keyName == 'A') this.hero.xvel = (-1 * this.hero.speed)
        if (keyName == 'd' || keyName == 'D') this.hero.xvel = (1 * this.hero.speed)
        if (keyName == 'w' || keyName == 'W') this.hero.yvel = (-1 * this.hero.speed)
        if (keyName == 's' || keyName == 'S') this.hero.yvel = (1 * this.hero.speed)
    }

    bindKeyUp(event){
        const keyUpName = event.key;
        if (keyUpName == 'a' || keyUpName == 'A') this.hero.xvel = 0
        if (keyUpName == 'd' || keyUpName == 'D') this.hero.xvel = 0
        if (keyUpName == 'w' || keyUpName == 'W') this.hero.yvel = 0
        if (keyUpName == 's' || keyUpName == 'S') this.hero.yvel = 0
    }

}

export default GameView;