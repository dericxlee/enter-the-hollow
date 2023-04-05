import Weapon from "./weapon";

class Bone extends Weapon{
    static COLOR = "white"
    // static X_COORD = 1000
    // static Y_COORD = 1000
    static RADIUS = 30
    static X_VEL = 0
    static Y_VEL = 0
    static FREQ = 1000
    static ECHO = 1
    static SPEED = 5
    static DUR = 10000
    static DMG = 1
    constructor(options){
        super(options),
        this.name = "bone"
        this.duration = Bone.DUR,
        this.color = Bone.COLOR,
        this.radius = Bone.RADIUS,
        this.xvel = Bone.X_VEL,
        this.yvel = Bone.Y_VEL,
        this.frequency = Bone.FREQ,
        this.echo = Bone.ECHO,
        this.speed = Bone.SPEED,
        this.hero = options.hero,
        this.damage = Bone.DMG
    }

    addProjectile(){
        // console.log("attack")
        setInterval(() => {
            // console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new BoneProjectile({
                    name: this.name,
                    duration: this.duration,
                    x: this.hero.x,
                    y: this.hero.y,
                    radius: this.radius,
                    color: this.color,
                    xvel: Math.random() * this.speed,
                    yvel: Math.random() * this.speed,
                    speed: this.speed,
                    game: this.hero.game,
                    damage: this.damage
                }));
            }
        }, this.frequency)
    }
}

export default Bone;