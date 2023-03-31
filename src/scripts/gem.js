import StaticObject from './static_object.js';

class Gem extends StaticObject{
    static GEM_RADIUS = 5
    static GEM_COLOR = "red"
    constructor(options){
        super(options)
        this.radius = Gem.GEM_RADIUS;
        this.color = Gem.GEM_COLOR;
    }

    collideWith(otherObj){
        if (otherObj instanceof Hero){
            otherObj.gainExp();
            this.remove();
            return true;
        }
        return false;
    }
}

export default Gem;