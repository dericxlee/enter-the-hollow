class LevelUpScreen {
    static RNG = 3
    constructor(options){
        this.hero = options.hero
        this.firstChoice = this.generateChoice()
        this.secondChoice = this.generateChoice()
        this.thirdChoice = this.generateChoice()
    }

    generateChoice(){
        let random_number = Math.ceil(Math.random()*LevelUpScreen.RNG)

        if(random_number === 1){
            console.log("player up")
            return new PlayerPowerUp({hero: this.hero});
            
        } else if (random_number === 2){
            console.log("weapon up")
            return new WeaponPowerUp({hero: this.hero});
            
        } else {
            console.log("starfall")
            return new Starfall({hero: this.hero})
        }
    }

}

export default LevelUpScreen;