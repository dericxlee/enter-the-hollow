import Weapon from "./weapon.js";

class RainOfFire extends Weapon{
    static COLOR = "black"
    static X_COORD = Math.random()*1000
    static Y_COORD = Math.random()*1000
    static RADIUS = 100
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 1000
    static ECHO = 1
    constructor(options){
        super(options),
        this.x = RainOfFire.X_COORD,
        this.y = RainOfFire.Y_COORD,
        this.color = RainOfFire.COLOR,
        this.radius = RainOfFire.RADIUS,
        this.xvel = RainOfFire.X_VEL,
        this.yvel = RainOfFire.Y_VEL,
        this.frequency = RainOfFire.FREQ,
        this.echo = RainOfFire.ECHO
    }

    attack(){
        setInterval(() => {
            for(let i = 0; i < this.echo; i++){
                this.game.add(this);
            }
        }, this.frequency)
    }

}

export default RainOfFire;