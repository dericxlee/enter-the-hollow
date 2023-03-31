import MovingObject from "./moving_object";

class Weapon extends MovingObject{
    static FREQ = 1000
    static RANGE = 50
    constructor(options){
        super(options),
        this.frequency = Weapon.FREQ,
        this.range = Weapon.RANGE
    }
}