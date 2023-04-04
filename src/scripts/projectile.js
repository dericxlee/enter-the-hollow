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
        this.speed = options.speed
        setTimeout(()=> {
            this.remove()
        }, this.duration)

        this.fireball = new Image();
        this.fireball.src = './assets/fireball.png'
    }

    draw(ctx){
        if(this.name = "fireball"){
            ctx.drawImage(this.fireball, 24, 24, 72, 72, this.x - (1.8 * this.radius), this.y - (1.8 * this.radius), 3.6 * this.radius, 3.6 * this.radius)
        }

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
    }
}

export default Projectile;