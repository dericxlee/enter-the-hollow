import StaticObject from "./scripts/static_object.js";
window.StaticObject = StaticObject;

import Gem from './scripts/gem.js';
window.Gem = Gem;

import MovingObject from "./scripts/moving_object.js";
window.MovingObject = MovingObject;

import Monster from "./scripts/monster.js";
window.Monster = Monster;

import Hero from "./scripts/hero.js";
window.Hero = Hero;

import Game from "./scripts/game.js";
window.Game = Game;

import GameView from "./scripts/gameview.js";
window.GameView = Game;

import Weapon from "./scripts/weapon.js";
window.Weapon = Weapon;

import Projectile from "./scripts/projectile.js";
window.Projectile = Projectile; 

import PlayerPowerUp from "./scripts/player_power_up.js"
window.PlayerPowerUp = PlayerPowerUp;

import WeaponPowerUp from "./scripts/weapon_power_up.js";
window.WeaponPowerUp = WeaponPowerUp;

import Starfall from "./scripts/starfall.js";
window.Starfall = Starfall;

import Consecration from "./scripts/consecration.js";
window.Consecration = Consecration;

import LevelUpScreen from "./scripts/level_up_screen.js";
window.LevelUpScreen = LevelUpScreen;


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
// gamev.start()
// gamev.game.spawn()
// gamev.game.resumeMovement()
// gamev.game.resumeCollision()
// gamev.game.allObjects()
// gamev.game.acquireWeapon()
// gamev.game.checkLevelUp()
gamev.game.hero.addWeapon()
// console.log(gamev.game.hero.WeaponOne === null, "weapon")
// console.log(gamev.hero === gamev.game.hero, "hero")
gamev.game.callWeapons()


// const p1 = new Projectile({
//     x: 500,
//     y: 500,
//     radius: 100,
//     color: "black",
//     game: gamev.game,
//     xvel: 0,
//     yvel: 0,
//     speed: 0
// })

// gamev.game.add(p1)
// console.log(gamev.game.projectiles.length)

// const pup1 = new WeaponPowerUp({
//     hero: gamev.game.hero,
// })

// // console.log(gamev.hero.speed)
// console.log(gamev.game.hero.weapons[0].radius, "rad console")
// pup1.choose()
// console.log(pup1.choose())
// console.log(gamev.hero.speed)

const lvlup = new LevelUpScreen({hero: gamev.game.hero})
lvlup.generateChoice()
lvlup.render(ctx)