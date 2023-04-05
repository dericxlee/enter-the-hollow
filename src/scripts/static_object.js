// class StaticObject{
//     constructor(options){
//         this.x = options.x
//         this.y = options.y
//         this.radius = options.radius
//         this.color = options.color
//         this.game = options.game
//     }

//     draw(ctx) {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();

//         ctx.arc(
//             this.x,
//             this.y,
//             this.radius,
//             0,
//             2 * Math.PI,
//             false
//         );

//         ctx.fill();
//     }

//     distanceFrom(otherObj){
//         return Math.sqrt((this.x - otherObj.x)**2 + (this.y - otherObj.y)**2)
//     }

//     isCollidedWith(otherObj){
//         return ((this.radius + otherObj.radius) > this.distanceFrom(otherObj))
//     }

//     collideWith(otherObj){

//     }

//     remove(){
//         this.game.remove(this);
//     }
// }

// export default StaticObject;