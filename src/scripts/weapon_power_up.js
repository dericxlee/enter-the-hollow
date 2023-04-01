import Consecration from "./consecration"
import Starfall from "./starfall"
import Hero from "./hero"
import Weapon from "./weapon"


class WeaponPowerUp {
    constructor(options){
        this.hero = options.hero
        this.weaponId = Math.floor(Math.random() * this.hero.weapons.length)
        this.weapon = this.hero.weapons[this.weaponId]
        // this.attributeId = Math.ceil(Math.random() * 4)
        this.attributeId = 2
    }

    choose(){
        switch(this.attributeId){
            case 1:
                this.weapon.radius = Math.floor(this.weapon.radius * 2)
                break;
            case 2:
                this.weapon.echo += 1
                break;
            case 3:
                this.weapon.frequency = Math.floor(this.weapon.frequency * 0.5)
                break;
        }
        
    }
}

export default WeaponPowerUp;