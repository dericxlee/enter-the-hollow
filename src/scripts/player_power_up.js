// import PowerUp from "./powerup"

class PlayerPowerUp {
    constructor(options){
        this.hero = options.hero
        // this.id = Math.ceil(Math.random()*2)
        this.id = 2
    }

    choose(){
        if(this.id === 1){
            return this.chooseHealth()
        } else if (this.id === 2){
            return this.chooseSpeed()
        }
    }

    chooseHealth(){
        this.hero.health = Math.floor(this.hero.health * 1.2)
        console.log(this.hero.health)
    }

    chooseSpeed(){
        this.hero.speed = Math.floor(this.hero.speed * 1.2)
        console.log(this.hero.speed)
    }
}

export default PlayerPowerUp;