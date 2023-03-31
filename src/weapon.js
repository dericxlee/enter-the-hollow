class Weapon {
    constructor(options){
        this.frequency = options.frequency,
        this.echo = options.echo,
        this.color = options.color,
        this.x = options.x,
        this.y = options.y,
        this.radius = options.radius,
        this.xvel = options.xvel,
        this.yvel = options.yvel
    }
}

export default Weapon;