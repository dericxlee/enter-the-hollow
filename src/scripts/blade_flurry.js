import Weapon from "./weapon";

const cardinal = [[1,0], [-1,0], [0,1], [0,-1]]

class BladeFlurry extends Weapon{
    static FREQ = 2000
    static ECHO = 1
    static DURATION = 2000
    static COLOR = "white"
    static RADIUS = 15
    static SPEED = 0
    static X_VEL = 0
    static Y_VEL = 0
    static DMG = 5
    static NAME = "Bladestorm"
    constructor(options){
        super(options),
        this.name = BladeFlurry.NAME,
        this.frequency = BladeFlurry.FREQ,
        this.echo = BladeFlurry.ECHO,
        this.duration = BladeFlurry.DURATION,
        this.xvel = BladeFlurry.X_VEL,
        this.yvel = BladeFlurry.Y_VEL,
        this.color = BladeFlurry.COLOR,
        this.radius = BladeFlurry.RADIUS,
        this.speed = BladeFlurry.SPEED,
        this.hero = options.hero,
        this.damage = BladeFlurry.DMG
    }

    addProjectile(){
        this.intervalId = setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                for(let j = 0; j < cardinal.length; j++){
                    this.hero.game.add(new Projectile({
                        name: this.name,
                        duration: this.duration,
                        x: this.hero.x + (cardinal[j][0] * 5),
                        y: this.hero.y + (cardinal[j][1] * 5),
                        radius: this.radius,
                        color: this.color,
                        xvel: cardinal[j][0] * 5,
                        yvel: cardinal[j][1] * 5,
                        speed: this.speed,
                        game: this.hero.game,
                        damage: this.damage
                    }));
                }   
            }
        }, this.frequency)

        return this.intervalId
    }
}

export default BladeFlurry;