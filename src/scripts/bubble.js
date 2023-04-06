import Weapon from "./weapon";

class Bubble extends Weapon{
    static FREQ = 2500
    static ECHO = 1
    static DURATION = 2500
    static COLOR = "yellow"
    static RADIUS = 15
    static SPEED = 5
    static X_VEL = 0
    static Y_VEL = 0
    static DMG = 3
    static NAME = "Bubblebeam"
    constructor(options){
        super(options),
        this.name = Bubble.NAME,
        this.frequency = Bubble.FREQ,
        this.echo = Bubble.ECHO,
        this.duration = Bubble.DURATION,
        this.xvel = Bubble.X_VEL,
        this.yvel = Bubble.Y_VEL,
        this.color = Bubble.COLOR,
        this.radius = Bubble.RADIUS,
        this.speed = Bubble.SPEED,
        this.hero = options.hero,
        this.damage = Bubble.DMG
    }

    addProjectile(){
        this.intervalId = setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                for(let j = 0; j < 3; j++){
                    this.hero.game.add(new Projectile({
                        name: this.name,
                        duration: this.duration,
                        x: this.hero.x,
                        y: this.hero.y,
                        radius: this.radius,
                        color: this.color,
                        xvel: this.hero.xvel * this.speed * Math.random()|| this.hero.lastXVel * Math.random() * this.speed,
                        yvel: this.hero.yvel * this.speed * Math.random()|| this.hero.lastYVel * Math.random() * this.speed,
                        speed: this.speed,
                        game: this.hero.game,
                        damage: this.damage
                    }));
                }   
            }
        }, this.frequency)

        return this.intervalId
    }

    // pauseProjectile(){
    //     return clearInterval(this.intervalId)
    // }
}

export default Bubble;