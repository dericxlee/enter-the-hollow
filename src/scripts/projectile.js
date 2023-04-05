import MovingObject from "./moving_object";

class Projectile extends MovingObject{
    constructor(options){
        super(options)
        this.name = options.name
        this.duration = options.duration
        this.x = options.x,
        this.y = options.y,
        this.radius = options.radius,
        this.color = options.color,
        this.game = options.game,
        this.xvel = options.xvel,
        this.yvel = options.yvel,
        this.speed = options.speed,
        this.damage = options.damage
        setTimeout(()=> {
            this.remove()
        }, this.duration)

        this.fireball = new Image();
        this.fireball.src = './assets/fireball.png'
        this.starfall = new Image();
        this.starfall.src = './assets/starfall.png'
        this.shuriken = new Image();
        this.shuriken.src = './assets/shuriken.png'
        this.consecration = new Image();
        this.consecration.src = './assets/light.png'
        this.bubble = new Image();
        this.bubble.src = './assets/bubble.png'
    }

    draw(ctx){
        

        // ctx.fillStyle = this.color;
        // ctx.beginPath();

        // ctx.arc(
        //     this.x,
        //     this.y,
        //     this.radius,
        //     0,
        //     2 * Math.PI,
        //     false
        // );

        // ctx.fill();

        if(this.name === "fireball"){
            ctx.drawImage(this.fireball, 24, 24, 72, 72, this.x - (1.5 * this.radius), this.y - (1.5 * this.radius), 4 * this.radius, 4 * this.radius)
        } else if (this.name === "starfall"){
            ctx.drawImage(this.starfall, 0, 0, 32, 32, this.x - (2 * this.radius), this.y - (2 * this.radius), 4 * this.radius, 4 * this.radius)
        } else if (this.name === "bladeFlurry"){
            ctx.drawImage(this.shuriken, 0, 0, 1380, 1380, this.x - (2 * this.radius), this.y - (2 * this.radius), 4 * this.radius, 4 * this.radius)
        } else if (this.name === "consecration"){
            ctx.drawImage(this.consecration, 24, 24, 72, 72, this.x - (1.5 * this.radius), this.y - (1.5 * this.radius), 3 * this.radius, 3 * this.radius)
        } else if (this.name === "bubble"){
            ctx.drawImage(this.bubble, 0, 0, 512, 512, this.x - (1.5 * this.radius), this.y - (1.5 * this.radius), 3 * this.radius, 3 * this.radius)
        }
    }
}

export default Projectile;