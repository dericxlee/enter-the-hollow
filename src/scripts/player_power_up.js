const playerSpeed = document.getElementById('speed')
const playerMagnet = document.getElementById('magnet')
const playerHealth = document.getElementById('health')

class PlayerPowerUp {
    static RNG = 3
    constructor(options){
        this.hero = options.hero
        this.id = Math.ceil(Math.random()*PlayerPowerUp.RNG)
        this.weaponName = ""
        this.type = this.findType()
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
        playerHealth.innerText = `Health: ${this.hero.health}`
        // console.log(this.hero.health, "health")
    }

    chooseSpeed(){
        this.hero.speed = this.hero.speed + 1
        playerSpeed.innerText = `Speed: ${this.hero.speed}`
        // console.log(this.hero.speed, "speed")
    }

    chooseMagnetism(){
        this.hero.magnetism = this.hero.magnetism + 20
        playerMagnet.innerText = `Magnetic: ${this.hero.magnetism}`
        // console.log(this.hero.magnetism, "magnet")
    }

    findType(){
        switch(this.id){
            case 1:
                return "Health +20"
                break;
            case 2:
                return "Speed +1"
                break;
            case 3:
                return "Magnetism +1"
                break;
        }   
    }
}

export default PlayerPowerUp;