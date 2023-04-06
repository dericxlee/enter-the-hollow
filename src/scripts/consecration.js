import Weapon from "./weapon";

class Consecration extends Weapon{
    static COLOR = "yellow"
    // static X_COORD = 1000
    // static Y_COORD = 1000
    static RADIUS = 40
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 3000
    static ECHO = 1
    static SPEED = 0
    static DUR = 3000
    static DMG = 1
    static NAME = "Consecration"
    // static ID = null
    constructor(options){
        super(options),
        this.name = Consecration.NAME,
        this.duration = Consecration.DUR,
        this.color = Consecration.COLOR,
        this.radius = Consecration.RADIUS,
        this.xvel = Consecration.X_VEL,
        this.yvel = Consecration.Y_VEL,
        this.frequency = Consecration.FREQ,
        this.echo = Consecration.ECHO,
        this.speed = Consecration.SPEED,
        this.hero = options.hero,
        this.damage = Consecration.DMG
        // this.intervalId = Consecration.ID
    }

    addProjectile(){
        // console.log("attack")
        this.intervalId = setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
                    name: this.name,
                    duration: this.duration,
                    x: this.hero.x,
                    y: this.hero.y,
                    radius: this.radius,
                    color: this.color,
                    xvel: this.xvel,
                    yvel: this.yvel,
                    speed: this.speed,
                    game: this.hero.game,
                    damage: this.damage
                }));
            }
        }, this.frequency)

        return this.intervalId
    }

    pauseProjectile(){
        return clearInterval(this.intervalId)
    }
}

export default Consecration;