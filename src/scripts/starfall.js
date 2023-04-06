import Weapon from "./weapon.js";

class Starfall extends Weapon{
    static COLOR = "pink"
    static RADIUS = 20
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 400
    static ECHO = 1
    static SPEED = 0
    static DUR = 800
    static OFFSET = 150
    static DMG = 4
    static NAME = "Starfall"
    constructor(options){
        super(options),
        this.name = Starfall.NAME,
        this.duration = Starfall.DUR,
        this.color = Starfall.COLOR,
        this.radius = Starfall.RADIUS,
        this.xvel = Starfall.X_VEL,
        this.yvel = Starfall.Y_VEL,
        this.frequency = Starfall.FREQ,
        this.echo = Starfall.ECHO,
        this.speed = Starfall.SPEED,
        this.hero = options.hero,
        this.offset = Starfall.OFFSET,
        this.damage = Starfall.DMG
    }

    addProjectile(){
        this.intervalId = setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "randompos")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
                    name: this.name,
                    duration: this.duration,
                    x: this.findRandomX(),
                    y: this.findRandomY(),
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

    findRandomX(){
        let min = this.hero.x - this.offset
        let max = this.hero.x + this.offset
        return Math.floor(Math.random() * (max - min) + min);
    }

    findRandomY(){
        let min = this.hero.y - this.offset
        let max = this.hero.y + this.offset
        return Math.floor(Math.random() * (max - min) + min);
    }
}

export default Starfall;