import MovingObject from './moving_object.js';
import StaticObject from './static_object.js';

class Gem extends MovingObject{
    static GEM_RADIUS = 7
    static GEM_COLOR = "white"
    static GEM_SPEED = 10
    constructor(options){
        super(options)
        this.radius = Gem.GEM_RADIUS;
        this.color = Gem.GEM_COLOR;
        this.speed = Gem.GEM_SPEED;
        this.xvel = 0
        this.yvel = 0
        this.hero = this.game.hero;

        this.sprite = new Image()
        this.sprite.src = './assets/gem.png'
    }

    collideWith(otherObj){
        if (otherObj instanceof Hero){
            // otherObj.gainExp();
            this.remove();
            return true;
        }
        return false;
    }

    distFromHero(){
        return Math.sqrt((this.hero.x - this.x)**2 + (this.hero.y - this.y)**2)
    }

    updateXVel(){ //dynamic xvel to 'chase' hero
        return this.xvel = (this.hero.x - this.x) * (this.speed/this.distFromHero())
    }

    updateYVel(){ //dynamic yvel to 'chase' hero
        return this.yvel = (this.hero.y - this.y) * (this.speed/this.distFromHero())
    }

    chase(){
        if(this.distFromHero() < this.hero.magnetism){
            this.xvel = this.updateXVel();
            this.yvel = this.updateYVel();
        }
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