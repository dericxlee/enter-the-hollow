import MovingObject from "./moving_object.js";
import Starfall from "./starfall.js";
import Weapon from "./weapon.js";

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
        this.color = Hero.COLOR,
        this.speed = Hero.SPEED,
        this.experience = 0,
        this.experienceForLevel = Hero.EXP_REQ,
        this.level = Hero.START_LVL,
        this.weapons = [],
        this.health = Hero.HP
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
        if(this.experienceForLevel === this.experience){
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