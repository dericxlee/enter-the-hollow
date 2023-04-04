import Weapon from "./weapon";

class Fireball extends Weapon{
    static FREQ = 5000
    static ECHO = 1
    static DURATION = 2500
    static COLOR = "orange"
    static RADIUS = 10
    static SPEED = 50
    constructor(options){
        super(options),
        this.frequency = Fireball.FREQ,
        this.echo = Fireball.FREQ,
        this.duration = Fireball.DURATION,
        this.color = Fireball.COLOR,
        this.radius = Fireball.RADIUS,
        this.speed = Fireball.SPEED,
        this.hero = options.hero
    }

    addProjectile(){
        // console.log("attack")
        setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
                    duration: this.duration,
                    x: this.hero.x,
                    y: this.hero.y,
                    radius: this.radius,
                    color: this.color,
                    // xvel: this.hero.xvel,
                    // yvel: this.hero.yvel,
                    xvel: 5,
                    yvel: 0,
                    speed: this.speed,
                    game: this.hero.game
                }));
            }
        }, this.frequency)
    }
}

export default Fireball;