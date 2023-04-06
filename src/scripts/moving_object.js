// import StaticObject from './static_object.js';

class MovingObject{
    constructor(options){
        this.x = options.x,
        this.y = options.y,
        this.radius = options.radius,
        this.color = options.color,
        this.game = options.game,
        this.xvel = options.xvel,
        this.yvel = options.yvel,
        this.speed = options.speed
    }

    // draw(ctx) {
    //     ctx.fillStyle = this.color;
    //     ctx.beginPath();

    //     ctx.arc(
    //         this.x,
    //         this.y,
    //         this.radius,
    //         0,
    //         2 * Math.PI,
    //         false
    //     );

    //     ctx.fill();
    // }

    move(){
        this.x = this.x + this.xvel;
        this.y = this.y + this.yvel;
        // this.x = this.game.xWrap(hor)
        // this.y = this.game.yWrap(ver)
    }

    distanceFrom(otherObj){
        return Math.sqrt((this.x - otherObj.x)**2 + (this.y - otherObj.y)**2)
    }

    isCollidedWith(otherObj){
        return ((this.radius + otherObj.radius) > this.distanceFrom(otherObj))
    }

    collideWith(otherObj){

    }

    remove(){
        this.game.remove(this);
    }
}

export default MovingObject;