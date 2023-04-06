import Weapon from "./weapon";

class Fireball extends Weapon{
    static COLOR = "black"
    static RADIUS = 30
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 2000
    static ECHO = 1
    static SPEED = 10
    static DUR = 5000
    static DMG = 5
    static NAME = "Fireball"
    constructor(options){
        super(options),
        this.name = Fireball.NAME,
        this.duration = Fireball.DUR,
        this.color = Fireball.COLOR,
        this.radius = Fireball.RADIUS,
        this.xvel = Fireball.X_VEL,
        this.yvel = Fireball.Y_VEL,
        this.frequency = Fireball.FREQ,
        this.echo = Fireball.ECHO,
        this.speed = Fireball.SPEED,
        this.hero = options.hero,
        this.damage = Fireball.DMG
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
                    xvel: (this.hero.xvel * this.speed * Math.random()) || this.hero.lastXVel * this.speed * Math.random(),
                    yvel: (this.hero.yvel * this.speed * Math.random()) || this.hero.lastYVel * this.speed * Math.random(),
                    speed: this.speed,
                    game: this.hero.game,
                    damage: this.damage
                }));
            }
        }, this.frequency)

        return this.intervalId
    }

    // pauseProjectile(){
    //     return clearInterval(this.intervalId)
    // }
}

export default Fireball;