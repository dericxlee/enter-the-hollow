import Game from "./game.js";
// import LevelUpScreen from "./level_up_screen.js";

class GameView {
    constructor (ctx){
        this.game = new Game();
        this.ctx = ctx;
        this.hero = this.game.hero;
        this.start()
    }

    start(){
        setInterval(() => {
            this.game.draw(this.ctx);
        }, 50);
    }

}

export default GameView;