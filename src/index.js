import StaticObject from "./static_object.js";
window.StaticObject = StaticObject;

import Gem from './gem.js';
window.Gem = Gem;

import MovingObject from "./moving_object.js";
window.MovingObject = MovingObject;

import Monster from "./monster.js";
window.Monster = Monster;

import Hero from "./hero.js";
window.Hero = Hero;

import Game from "./game.js";
window.Game = Game;

import GameView from "./gameview.js";
window.GameView = Game;

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

// const hero = new Hero({
//     xvel: 600,
//     yvel: 0,
// });


// const mon = new Monster({
//     x: 300,
//     y: 300,
// });

// // hero.draw(ctx);
// mon.draw(ctx);

// console.log(mon.distFromHero(), "origin")
// console.log(mon.xvel)
// console.log(mon.yvel)
// hero.move();
// // hero.draw(ctx);
// mon.chase();
// console.log(mon.distFromHero(), "one move")
// console.log(mon.xvel)
// console.log(mon.yvel)
// mon.move();
// console.log(mon.distFromHero())

const gamev = new GameView(ctx)
gamev.start()
gamev.game.allObjects()

