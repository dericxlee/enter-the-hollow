import MovingObject from "./moving_object.js";
import Starfall from "./starfall.js";
import Weapon from "./weapon.js";
import LevelUpScreen from "./level_up_screen.js";

class Hero extends MovingObject{
    static START_X = 500
    static START_Y = 500
    static RADIUS = 10
    static COLOR = "blue"
    static SPEED = 100
    static EXP_REQ = 10
    static START_LVL = 1
    static HP = 100
    constructor(options){
        super(options)
        this.x = Hero.START_X,
        this.y = Hero.START_Y,
        this.radius = Hero.RADIUS,
        this.game = options.game,
        this.color = Hero.COLOR,
        this.speed = Hero.SPEED,
        this.experience = 0,
        this.experienceForLevel = Hero.EXP_REQ,
        this.level = Hero.START_LVL,
        this.weapons = [],
        this.health = Hero.HP

        this.sprite = new Image();
        this.sprite.src = './assets/run.png';
    }

    draw(ctx) {

        // ctx.drawImage(this.sprite, this.x, this.y)

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
    }

    addWeapon(){
        console.log(this.weapons.length, "beg, hero")
        // if(!this.hero.weaponOne) this.hero.weaponOne = new Starfall({hero: this.hero})
        // if(!this.hero.weaponOne) this.hero.weaponOne = new Consecration({hero: this.hero})
        // console.log(this.hero.weaponOne instanceof Starfall, "starfall?")
        // console.log(this.hero.weaponOne instanceof Consecration, "cons?")
        this.weapons.push(new Starfall({hero: this}));
        // console.log(this.hero.weapons.length, "star")
        this.weapons.push(new Consecration({hero: this}));
        // console.log(this.weapons.length, "after, hero")
    }

    levelUp(){
        let baseExpReq = this.experienceForLevel
        if(baseExpReq === this.experience){
            console.log(this.level, "level up!")
            this.game.pauseSpawn()
            this.game.pauseMovement()
            this.game.pauseCollision()
            let lvlup = new LevelUpScreen({hero: this})
            
            this.level += 1;
            this.experienceForLevel = Math.floor(baseExpReq * 1.2)
            this.experience = 0
            return true;
        }
        return false;
    }

    gainExp(){
        this.experience += 1
        if(this.levelUp()){
            return this.levelUp()
        }
    }


}

export default Hero;