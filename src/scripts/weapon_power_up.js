import Consecration from "./consecration"
import Starfall from "./starfall"
import Hero from "./hero"
import Weapon from "./weapon"


class WeaponPowerUp {
    constructor(options){
        this.hero = options.hero
        this.weaponId = Math.floor(Math.random() * this.hero.weapons.length)
        this.weapon = this.hero.weapons[this.weaponId]
        this.attributeId = Math.ceil(Math.random() * 4)
    }

    choose(){
        console.log(this.hero.weapons.length)
        switch(this.attributeId){
            case 1:
                console.log(this.weapon.length)
                console.log("rad")
                this.weapon.radius = Math.floor(this.weapon.radius * 1.2)
                break;
            case 2:
                console.log("echo")
                this.weapon.echo += 1
                break;
            case 3:
                console.log("freq")
                this.weapon.frequency = Math.floor(this.weapon.frequency * 0.5)
                break;
            case 4:
                console.log("dur")
                this.weapon.duration = Math.floor(this.weapon.duration * 1.2)
        }
        
    }
}

export default WeaponPowerUp;