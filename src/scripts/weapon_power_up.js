import Consecration from "./consecration"
import Starfall from "./starfall"
import Hero from "./hero"
import Weapon from "./weapon"
import BladeFlurry from "./blade_flurry"
import Fireball from "./fireball"


class WeaponPowerUp {
    static RNG = 4
    constructor(options){
        this.hero = options.hero
        this.weaponId = Math.floor(Math.random() * this.hero.weapons.length)
        this.weapon = this.hero.weapons[this.weaponId]
        this.weaponName = this.weapon.name
        this.attributeId = Math.ceil(Math.random() * WeaponPowerUp.RNG)
        this.type = this.findType()
    }

    choose(){
        // console.log(this.hero.weapons.length)
        switch(this.attributeId){
            case 1:
                // console.log(this.weapon.length)
                // console.log(this.weaponName, this.type, "rad")
                this.weapon.radius = Math.floor(this.weapon.radius * 1.2)
                break;
            case 2:
                // console.log(this.weaponName, this.type, "echo")
                this.weapon.echo += 1
                break;
            case 3:
                // console.log(this.weaponName, this.type, "freq")
                this.weapon.frequency = Math.floor(this.weapon.frequency * 0.8)
                break;
            case 4:
                // console.log(this.weaponName, this.type, "dam")
                this.weapon.damage += 2
                break;
        }
        
    }

    findType(){
        // console.log("working")
        switch(this.attributeId){
            case 1:
                return "Area +20%"
                break;
            case 2:
                return "Multi-Cast +1"
                break;
            case 3:
                return "Cast Frequency +20%"
                break;
            case 4:
                return "Damage +2"
                break;
        }
    }
}

export default WeaponPowerUp;