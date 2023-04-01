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