class PlayerPowerUp {
    constructor(options){
        this.hero = options.hero
        this.id = Math.ceil(Math.random()*2)
        // this.id = 2
    }

    choose(){
        if(this.id === 1){
            return this.chooseHealth()
        } else if (this.id === 2){
            return this.chooseSpeed()
        }
    }

    chooseHealth(){
        this.hero.health = this.hero.health + 20
        console.log(this.hero.health, "health")
    }

    chooseSpeed(){
        this.hero.speed = this.hero.speed + 1
        console.log(this.hero.speed, "speed")
    }
}

export default PlayerPowerUp;