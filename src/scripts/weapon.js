import Projectile from "./projectile";

class Weapon {
    constructor(options){
        this.frequency = options.frequency,
        this.echo = options.echo,
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
        console.log("attack")
        setInterval(() => {
            for(let i = 0; i < this.echo; i++){
                this.hero.game.add(new Projectile({
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
}

export default Weapon;