import Weapon from "./weapon.js";

class Starfall extends Weapon{
    static COLOR = "pink"
    static RADIUS = 15
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 500
    static ECHO = 1
    static SPEED = 0
    static DUR = 1000
    static OFFSET = 100
    constructor(options){
        super(options),
        this.duration = Starfall.DUR,
        this.color = Starfall.COLOR,
        this.radius = Starfall.RADIUS,
        this.xvel = Starfall.X_VEL,
        this.yvel = Starfall.Y_VEL,
        this.frequency = Starfall.FREQ,
        this.echo = Starfall.ECHO,
        this.speed = Starfall.SPEED,
        this.hero = options.hero,
        this.offset = Starfall.OFFSET
    }
}

export default Starfall;