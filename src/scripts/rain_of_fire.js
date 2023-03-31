import Weapon from "./weapon.js";

class RainOfFire extends Weapon{
    static COLOR = "black"
    static POS = true
    static X_COORD = 1000
    static Y_COORD = 1000
    static RADIUS = 15
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 1000
    static ECHO = 1
    static SPEED = 0
    static DUR = 3000
    constructor(options){
        super(options),
        this.randomPos = RainOfFire.POS,
        this.duration = RainOfFire.DUR,
        this.x = RainOfFire.X_COORD,
        this.y = RainOfFire.Y_COORD,
        this.color = RainOfFire.COLOR,
        this.radius = RainOfFire.RADIUS,
        this.xvel = RainOfFire.X_VEL,
        this.yvel = RainOfFire.Y_VEL,
        this.frequency = RainOfFire.FREQ,
        this.echo = RainOfFire.ECHO,
        this.speed = RainOfFire.SPEED,
        this.hero = options.hero
    }
}

export default RainOfFire;