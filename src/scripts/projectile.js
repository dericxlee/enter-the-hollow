import MovingObject from "./moving_object";

class Projectile extends MovingObject{
    constructor(options){
        super(options)
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
    }
}

export default Projectile;