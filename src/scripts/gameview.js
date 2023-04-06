import Game from "./game.js";

const startBtn = document.getElementById('start-btn')
const instructions = document.getElementById('instruction-div')
const pauseBox = document.getElementById('pause-div')

class GameView {
    static FPS = 30
    constructor(canvas, ctx){
        this.game = new Game();
        this.canvas = canvas;
        this.ctx = ctx;
        this.hero = this.game.hero;
        this.FPS = GameView.FPS

        this.bindKeyDown = this.bindKeyDown.bind(this)
        this.bindKeyUp = this.bindKeyUp.bind(this)
        this.pauseBySpace = this.pauseBySpace.bind(this)
        this.unPauseBySpace = this.unPauseBySpace.bind(this)

        window.keyDown = window.addEventListener('keydown', this.pauseBySpace);
        
        window.keyDown = window.addEventListener('keydown', this.bindKeyDown);
        window.keyUp = window.addEventListener('keyup', this.bindKeyUp);

        this.hideInstructions = this.hideInstructions.bind(this)
        startBtn.addEventListener("click", this.hideInstructions)

    }

    render(){
        setInterval(() => {
            this.game.draw(this.ctx);
        }, this.FPS);
    }

    bindKeyDown(event){
        const keyName = event.key;
        event.preventDefault()
        if (keyName == 'a' || keyName == 'A') this.hero.xvel = (-1) //* this.hero.speed)
        if (keyName == 'd' || keyName == 'D') this.hero.xvel = (1) // * this.hero.speed)
        if (keyName == 'w' || keyName == 'W') this.hero.yvel = (-1) // * this.hero.speed)
        if (keyName == 's' || keyName == 'S') this.hero.yvel = (1) //* this.hero.speed)
    }

    bindKeyUp(event){
        const keyUpName = event.key;
        if (keyUpName == 'a' || keyUpName == 'A') {
            this.hero.xvel = 0;
            this.hero.lastXVel = -1;
            this.hero.lastYVel = 0
        }
        if (keyUpName == 'd' || keyUpName == 'D') {
            this.hero.xvel = 0
            this.hero.lastXVel = 1;
            this.hero.lastYVel = 0;
        }
        if (keyUpName == 'w' || keyUpName == 'W') {
            this.hero.yvel = 0
            this.hero.lastYVel = -1 
            this.hero.lastXVel = 0
        }
        if (keyUpName == 's' || keyUpName == 'S') {
            this.hero.yvel = 0
            this.hero.lastYVel = 1
            this.hero.lastXVel = 0
        }
    }

    pauseBySpace(event){
        const spacekey = event.key;
        event.preventDefault()
        if(spacekey == ' ' && !this.game.paused){
            this.game.pauseGameState()
            window.keyDown = window.removeEventListener('keydown', this.pauseBySpace);
            window.keyDown = window.addEventListener('keydown', this.unPauseBySpace);
            pauseBox.style.display = "block"
        }
    }

    unPauseBySpace(event){
        const spacekey = event.key;
        event.preventDefault()
        if(spacekey == ' ' && this.game.paused){
            this.game.resumeGameState()
            window.keyDown = window.removeEventListener('keydown', this.unPauseBySpace);
            window.keyDown = window.addEventListener('keydown', this.pauseBySpace);
            pauseBox.style.display = "none"
        }
    }

    hideInstructions(){
        this.render()
        instructions.style = 'display:none'
    }

}

export default GameView;