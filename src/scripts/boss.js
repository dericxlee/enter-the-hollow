import Monster from "./monster"
import Hero from "./hero"

class Boss extends Monster{
    static RADIUS = 40
    static COLOR = 'green'
    static SPEED = 3
    static HP = 500
    static DMG = 10
    constructor(options){
        super(options),
        this.radius = Boss.RADIUS,
        this.color = Boss.COLOR,
        this.speed = Boss.SPEED,
        this.health = Boss.HP,
        this.damage = Boss.DMG,
        this.hero = this.game.hero,
        this.updateXVel(),
        this.updateYVel()

        this.sprite = new Image();
        this.sprite.src = './assets/boss.png';
        this.spriteWidth = 96;
        this.spriteHeight = 96;
        this.frame = 0;
    }

    draw(ctx){
        ctx.drawImage(this.sprite, this.frame * this.spriteWidth, 288, 96, 96, this.x - 48, this.y - 48, 96, 96)
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

    collideWith(otherObj){
        if (otherObj instanceof Projectile){
            this.health = this.health - otherObj.damage
            if(this.health <= 0) {
                for(let i = 0; i < 10; i++){
                    this.game.add(new Gem({x: this.x, y: this.y, game: this.game}))
                }
                this.remove()
            }
            return true;
        }
        return false;
    }

    randomGemPos(){
        Math.floor((Math.random() * 10) + (Math.random() * (-10)))
    }
}

export default Boss;