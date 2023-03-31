import Weapon from "./weapon.js";

class Starfall extends Weapon{
    static COLOR = "pink"
    static POS = true
    static X_COORD = 1000
    static Y_COORD = 1000
    static RADIUS = 15
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 500
    static ECHO = 1
    static SPEED = 0
    static DUR = 1000
    constructor(options){
        super(options),
        this.randomPos = Starfall.POS,
        this.duration = Starfall.DUR,
        this.x = Starfall.X_COORD,
        this.y = Starfall.Y_COORD,
        this.color = Starfall.COLOR,
        this.radius = Starfall.RADIUS,
        this.xvel = Starfall.X_VEL,
        this.yvel = Starfall.Y_VEL,
        this.frequency = Starfall.FREQ,
        this.echo = Starfall.ECHO,
        this.speed = Starfall.SPEED,
        this.hero = options.hero
    }
}

export default Starfall;