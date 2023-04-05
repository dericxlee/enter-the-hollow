import StaticObject from './static_object.js';

class Gem extends StaticObject{
    static GEM_RADIUS = 7
    static GEM_COLOR = "white"
    constructor(options){
        super(options)
        this.radius = Gem.GEM_RADIUS;
        this.color = Gem.GEM_COLOR;
        this.sprite = new Image()
        this.sprite.src = './assets/gem.png'
    }

    collideWith(otherObj){
        if (otherObj instanceof Hero){
            otherObj.gainExp();
            this.remove();
            return true;
        }
        return false;
    }

    draw(ctx){
        ctx.drawImage(this.sprite, 0, 0, 16, 16, this.x - 8, this.y - 8, 20, 20)
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
        // ctx.drawImage(this.sprite, 0, 0, 20, 20, this.x - 10, this.y - 10, 20, 20)
    }
}

export default Gem;