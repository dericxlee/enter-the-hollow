import MovingObject from "./moving_object.js";
import Starfall from "./starfall.js";
import Weapon from "./weapon.js";
import WeaponPowerUp from "./weapon_power_up.js";
import PlayerPowerUp from "./player_power_up.js";
import Fireball from "./fireball.js";
import BladeFlurry from "./blade_flurry.js";
import Consecration from "./consecration.js";
// import Bone from "./bubble.js";
import Bubble from "./bubble.js";
import Bone from "./bone.js";
import BoneProjectile from "./bone_projectile.js";
import Boss from "./boss.js";


const buttonOne = document.querySelector("#first-upgrade")
const buttonTwo = document.querySelector("#second-upgrade")
const buttonThree = document.querySelector("#third-upgrade")
const allButtons = document.querySelectorAll(".button")
const buttonOverlay = document.getElementById('button-div')
const experienceBar = document.getElementById('exp')
const progressLevel = document.getElementById('progress-level')
const playerSpeed = document.getElementById('speed')
const playerMagnet = document.getElementById('magnet')
const playerHealth = document.getElementById('health')

class Hero extends MovingObject{
    static RNG = 2
    static START_X = 700
    static START_Y = 350
    static RADIUS = 15
    static COLOR = "blue"
    static SPEED = 5
    static EXP_REQ = 10
    static START_LVL = 1
    static HP = 200
    static MAGNET = 20
    
    constructor(options){
        super(options),
        this.x = Hero.START_X,
        this.y = Hero.START_Y,
        this.radius = Hero.RADIUS,
        this.game = options.game,
        this.color = Hero.COLOR,
        this.speed = Hero.SPEED,
        this.experience = 0,
        this.experienceForLevel = Hero.EXP_REQ,
        this.level = Hero.START_LVL,
        this.availableWeapons = [
            new Starfall({hero: this}),
            new Consecration({hero: this}),
            new Fireball({hero: this}),
            new BladeFlurry({hero: this}),
            new Bubble({hero: this})
        ],
        this.weapons = [],
        this.health = Hero.HP
        this.upgrades = [];
        this.xvel = options.xvel || 0
        this.yvel = options.yvel || 0
        this.lastXVel = 0
        this.lastYVel = 0
        this.magnetism = Hero.MAGNET

        this.sprite = new Image();
        this.sprite.src = './assets/hero.png';
        this.spriteWidth = 96;
        this.spriteHeight = 128;

        this.onClickOne = this.onClickOne.bind(this)
        this.onClickTwo = this.onClickTwo.bind(this)
        this.onClickThree = this.onClickThree.bind(this)

        progressLevel.innerText = `Level: ${this.level}`
        playerSpeed.innerText = `Speed: ${this.speed}`
        playerHealth.innerText = `Health: ${this.health}`
        playerMagnet.innerText = `Magnetic: ${this.magnetism}`
    }

    resetWeapons(){
        this.availableWeapons = [
            new Starfall({hero: this}),
            new Consecration({hero: this}),
            new Fireball({hero: this}),
            new BladeFlurry({hero: this}),
            new Bubble({hero: this})
        ]
    }

    draw(ctx) {

        ctx.drawImage(this.sprite, 0, 0, 32, 32, this.x - 25, this.y - 25, 50, 50)

        // ctx.fillStyle = this.color;
        // ctx.beginPath();

        // ctx.arc(
        //     this.x,
        //     this.y,
        //     this.radius,
        //     0,
        //     2 * Math.PI,
        //     false
        // );

        // ctx.fill();
    }

    move(){
        // let hor = this.x + this.xvel;
        // let ver = this.y + this.yvel;
        this.x = this.x + (this.xvel * this.speed)
        this.y = this.y + (this.yvel * this.speed)
    }
    

    addWeapon(){ //for weapon testing
        // this.weapons.push(new Starfall({hero: this}));
        // this.weapons.push(new Consecration({hero: this}));
        // this.weapons.push(new Fireball({hero: this}));
        // this.weapons.push(new BladeFlurry({hero: this}))
        // this.weapons.push(new Bubble({hero: this}))
        // this.weapons.push(new Bone({hero: this}))
    }

    levelUp(){
        let baseExpReq = this.experienceForLevel
        if(baseExpReq === this.experience){
            // console.log(this.level, "level up!")
            this.game.pauseGameState()
            // this.game.pauseProjectiles()
            // buttonOverlay.style = 'display:block'
            // this.addChoices()
            // buttonOne.addEventListener("click", this.onClickOne)
            // buttonTwo.addEventListener("click", this.onClickTwo)
            // buttonThree.addEventListener("click", this.onClickThree)

            this.level += 1;
            this.displayChoices()
            this.experienceForLevel = Math.floor(baseExpReq * 1.5)
            this.experience = 0
            experienceBar.value = this.experience
            playerSpeed.innerText = `Speed: ${this.speed}`
            playerHealth.innerText = `Health: ${this.health}`
            playerMagnet.innerText = `Magnetic: ${this.magnetism}`

            return true;
        }
        return false;
    }

    displayChoices(){
        // this.game.pauseGameState()
        if((this.level - 1) % 3 === 0 && this.weapons.length < 3) {
            this.addWeaponChoices()
        } else {
            this.addChoices()
        }
        buttonOverlay.style = 'display:block'
        buttonOne.addEventListener("click", this.onClickOne)
        buttonTwo.addEventListener("click", this.onClickTwo)
        buttonThree.addEventListener("click", this.onClickThree)
        // if((this.level + 1) % 3 === 0) {
        //     this.addWeaponChoices()
        // } else {
        //     this.addChoices()
        // }
    }

    addChoices(){
        for(let i = this.upgrades.length; i < 3; i++){
            this.upgrades.push(this.generateChoice())
            allButtons[i].innerHTML = `${this.upgrades[i].weaponName} ${this.upgrades[i].type}`
        }
    }

    addWeaponChoices(){
        for(let i = this.upgrades.length; i < 3; i++){
            this.upgrades.push(this.generateWeaponChoice())
            allButtons[i].innerHTML = `${this.upgrades[i].name}`
        }
    }

    gainExp(){
        this.experience += 1
        experienceBar.max = this.experienceForLevel
        experienceBar.value = this.experience
        if(this.levelUp()){
            progressLevel.innerText = `Level: ${this.level}`
            return this.levelUp()
        }
        // experienceBar.setAttribute(max: this.experienceForLevel, value: this.experience)
    }

    generateChoice(){
        let randomNumber = Math.ceil(Math.random()*Hero.RNG)

        if(randomNumber === 1){
            // console.log("player up")
            return new PlayerPowerUp({hero: this});
            
        } else { // adding more weight to weapon upgrades
            // console.log("weapon up")
            return new WeaponPowerUp({hero: this});
        }
    }

    generateWeaponChoice(){
        let randomNum = Math.floor(Math.random() * this.availableWeapons.length)
        let weapon = this.availableWeapons[randomNum]
        // console.log(randomNum)
        this.availableWeapons.splice(randomNum, 1)
        return weapon;
        // console.log(this.allWeapon.length)
    }

    onClickOne(){
        let newWeap = this.upgrades[0] instanceof Weapon
        // this.upgrades[0].choose();
        if(newWeap) {
            this.weapons.push(this.upgrades[0])
            this.availableWeapons = this.availableWeapons.concat(this.upgrades[1], this.upgrades[2])
        } else {
            this.upgrades[0].choose()
        }
        // console.log(this.availableWeapons.length)
        this.upgrades = [];
        this.game.resumeGameState();
        buttonOverlay.style = 'display:none';
        this.toRemoveListener()
    }

    onClickTwo(){
        // let dummyWeap = this.upgrades
        let newWeap = this.upgrades[1] instanceof Weapon
        if(newWeap) {
            this.weapons.push(this.upgrades[1])
            this.availableWeapons = this.availableWeapons.concat(this.upgrades[0], this.upgrades[2])
        } else {
            this.upgrades[1].choose();
        }
        this.upgrades = [];
        this.game.resumeGameState();
        buttonOverlay.style = 'display:none';
        this.toRemoveListener()
    }

    onClickThree(){
        let newWeap = this.upgrades[2] instanceof Weapon
        if(newWeap) {
            this.weapons.push(this.upgrades[2])
            this.availableWeapons = this.availableWeapons.concat(this.upgrades[0], this.upgrades[1])
        } else {
            this.upgrades[2].choose();
        }
        this.upgrades = [];
        this.game.resumeGameState();
        buttonOverlay.style = 'display:none';
        this.toRemoveListener()
    }

    toRemoveListener(){
        buttonOne.removeEventListener("click", this.onClickOne)
        buttonTwo.removeEventListener("click", this.onCLickOne)
        buttonThree.removeEventListener("click", this.onClickThree)
    }

    collideWith(otherObj){
        if (otherObj instanceof Monster){
            // console.log(otherObj.damage, "take dmg")
            // console.log(this.health, "my hp")
            this.health = this.health - otherObj.damage
            playerHealth.innerText = `Health: ${this.health}`
            if(this.health <= 0) {
                playerHealth.style.color = "red"
                this.game.gameOver()
                // this.remove()
            }
            return true;
        }
        return false;
    }

    resetHeroState(){
        this.weapons = [];
        this.resetWeapons()
        this.health = Hero.HP
        this.magnetism = Hero.MAGNET
        this.level = Hero.START_LVL
        this.speed = Hero.SPEED
        this.experience = 0
        this.experienceForLevel = Hero.EXP_REQ
        this.x = Hero.START_X
        this.y = Hero.START_Y
        progressLevel.innerText = `Level: ${this.level}`
        playerSpeed.innerText = `Speed: ${this.speed}`
        playerHealth.innerText = `Health: ${this.health}`
        playerMagnet.innerText = `Magnetic: ${this.magnetism}`
        playerHealth.style.color = "white"
    }
}

export default Hero;