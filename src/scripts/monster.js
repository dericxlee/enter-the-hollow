import MovingObject from "./moving_object";
// import Hero from "./hero.js";

class Monster extends MovingObject{
    static RADIUS = 15
    static COLOR = 'green'
    static SPEED = 2
    constructor(options){
        super(options),
        this.radius = Monster.RADIUS,
        this.color = Monster.COLOR,
        this.speed = Monster.SPEED,
        // this.health = options.health,
        this.hero = this.game.hero
        this.updateXVel(),
        this.updateYVel()
        this.sprite = new Image();
        this.sprite.src = './assets/enemy.png';
    }

    draw(ctx){
        ctx.drawImage(this.sprite, 0, 0, 32, 32, this.x - 25, this.y - 25, 50, 50)
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
        this.xvel = this.updateXVel();
        this.yvel = this.updateYVel();
    }

    collideWith(otherObj){
        if (otherObj instanceof Projectile){
            this.game.add(new Gem({x: this.x, y: this.y, game: this.game}))
            this.remove()
            return true;
        }
        return false;
    }
}

export default Monster;

//[0,0] => [300, 400] dist = 500
//if speed is 10, need to call 50 move()
//vel needs to divide by (dist/speed) or multiply by (speed/dist)