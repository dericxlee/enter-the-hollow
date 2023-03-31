import Projectile from "./projectile";

class Weapon {
    constructor(options){
        this.frequency = options.frequency,
        this.echo = options.echo,
        this.randomPos = options.randomPos,
        this.duration = options.duration
        this.color = options.color,
        this.x = options.x,
        this.y = options.y,
        this.radius = options.radius,
        this.xvel = options.xvel,
        this.yvel = options.yvel,
        this.speed = options.speed,
        this.hero = options.hero
    }

    addProjectile(){
        if(this.randomPos) return this.addRandomPosProjectile();
        return this.addDefinedProjectile();
    }

    addDefinedProjectile(){
        // console.log("attack")
        setInterval(() => {
            console.log(this.hero.game.projectiles.length, "define")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
                    duration: this.duration,
                    x: this.x,
                    y: this.y,
                    radius: this.radius,
                    color: this.color,
                    xvel: this.xvel,
                    yvel: this.yvel,
                    speed: this.speed,
                    game: this.hero.game
                }));
            }
        }, this.frequency)
    }

    addRandomPosProjectile(){
        setInterval(() => {
            console.log(this.hero.game.projectiles.length, "randompos")
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
                    duration: this.duration,
                    x: Math.random() * this.x,
                    y: Math.random() * this.y,
                    radius: this.radius,
                    color: this.color,
                    xvel: this.xvel,
                    yvel: this.yvel,
                    speed: this.speed,
                    game: this.hero.game
                }));
            }
        }, this.frequency)
    }
}

export default Weapon;