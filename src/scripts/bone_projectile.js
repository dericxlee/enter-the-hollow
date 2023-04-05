import Projectile from "./projectile";

class BoneProjectile extends Projectile{
    constructor(options){
        super(options)
        // this.xvel = this.randomVel()
        // this.yvel = this.randomVel()
        this.sprite = new Image();
        this.sprite.src = './assets/femur.png'
    }

    randomVel(){
        return Math.random() * 1
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI,
            false
        );

        ctx.fill();
        ctx.drawImage(this.sprite, 0, 0, 48, 48, this.x - (1.5 * this.radius), this.y - (1.5 * this.radius), 4 * this.radius, 4 * this.radius)
    }

    // move(){
    //     this.x = this.x + (this.xvel * this.speed)
    //     this.y = this.y + (this.yvel * this.speed)
    // }

    collideWith(otherObj){
        if (otherObj instanceof Monster){
            this.xvel = this.randomVel() * this.speed;
            this.yvel = this.randomVel() * this.speed;
            console.log(this.xvel)
            return true;
        }
        return false;
    }
}

export default BoneProjectile;