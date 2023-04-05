import Weapon from "./weapon";

const cardinal = [[1,0], [-1,0], [0,1], [0,-1]]

class BladeFlurry extends Weapon{
    static FREQ = 5000
    static ECHO = 1
    static DURATION = 2500
    static COLOR = "white"
    static RADIUS = 15
    static SPEED = 0
    static X_VEL = 0
    static Y_VEL = 0
    constructor(options){
        super(options),
        this.name = "bladeFlurry",
        this.frequency = BladeFlurry.FREQ,
        this.echo = BladeFlurry.ECHO,
        this.duration = BladeFlurry.DURATION,
        this.xvel = BladeFlurry.X_VEL,
        this.yvel = BladeFlurry.Y_VEL,
        this.color = BladeFlurry.COLOR,
        this.radius = BladeFlurry.RADIUS,
        this.speed = BladeFlurry.SPEED,
        this.hero = options.hero
    }

    addProjectile(){
        setInterval(() => {
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
                        game: this.hero.game
                    }));
                }   
            }
        }, this.frequency)
    }
}

export default BladeFlurry;