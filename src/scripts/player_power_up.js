class PlayerPowerUp {
    constructor(options){
        this.hero = options.hero
        this.id = Math.ceil(Math.random()*2)
        this.weaponName = "General"
        this.type = this.findType()
        // this.id = 2
    }

    choose(){
        if(this.id === 1){
            return this.chooseHealth()
        } else if (this.id === 2){
            return this.chooseSpeed()
        } else if (this.id === 3){
            return this.chooseMagnetism()
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

    chooseMagnetism(){
        this.hero.magnetism = this.hero.magnetism + 20
        console.log(this.hero.magnetism, "magnet")
    }

    findType(){
        switch(this.id){
            case 1:
                return "Increase Health"
                break;
            case 2:
                return "Increase Speed"
                break;
            case 3:
                return "Increased Magnetism"
                break;
        }   
    }
}

export default PlayerPowerUp;