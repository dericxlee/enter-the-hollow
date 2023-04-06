import Projectile from "./projectile";

class Weapon {
    constructor(options){
        this.frequency = options.frequency,
        this.echo = options.echo,
        this.duration = options.duration
        this.color = options.color,
        this.radius = options.radius,
        this.xvel = options.xvel,
        this.yvel = options.yvel,
        this.speed = options.speed,
        this.hero = options.hero,
        this.offset = options.offset,
        this.damage = options.damage
    }

    choose(){
        this.hero.addWeapon()
    }

    // addProjectile(){
    //     if(this.offset) return this.addRandomPosProjectile();
    //     return this.addDefinedProjectile();
    // }

    // addDefinedProjectile(){
    //     // console.log("attack")
    //     setInterval(() => {
    //         // console.log(this.hero.game.projectiles.length, "define")
    //         for(let i = 0; i < this.echo; i++){
    //             this.hero.game.add(new Projectile({
    //                 duration: this.duration,
    //                 x: this.hero.x,
    //                 y: this.hero.y,
    //                 radius: this.radius,
    //                 color: this.color,
    //                 xvel: this.xvel,
    //                 yvel: this.yvel,
    //                 speed: this.speed,
    //                 game: this.hero.game
    //             }));
    //         }
    //     }, this.frequency)
    // }

    // addRandomPosProjectile(){
    //     setInterval(() => {
    //         // console.log(this.hero.game.projectiles.length, "randompos")
    //         for(let i = 0; i < this.echo; i++){
    //             this.hero.game.add(new Projectile({
    //                 duration: this.duration,
    //                 x: this.findRandomX(),
    //                 y: this.findRandomY(),
    //                 radius: this.radius,
    //                 color: this.color,
    //                 xvel: this.xvel,
    //                 yvel: this.yvel,
    //                 speed: this.speed,
    //                 game: this.hero.game
    //             }));
    //         }
    //     }, this.frequency)
    // }

    // findRandomX(){
    //     let min = this.hero.x - this.offset
    //     let max = this.hero.x + this.offset
    //     return Math.floor(Math.random() * (max - min) + min);
    // }

    // findRandomY(){
    //     let min = this.hero.y - this.offset
    //     let max = this.hero.y + this.offset
    //     return Math.floor(Math.random() * (max - min) + min);
    // }

    // distance(){
    //     dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    // }
}

export default Weapon;