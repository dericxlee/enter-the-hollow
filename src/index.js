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

import Fireball from "./scripts/fireball.js";
window.Fireball = Fireball;

import BladeFlurry from "./scripts/blade_flurry.js";
window.BladeFlurry = BladeFlurry;

import Bone from "./scripts/bone.js";
window.Bone = Bone;

import BoneProjectile from "./scripts/bone_projectile.js";
window.BoneProjectile = BoneProjectile;

// import LevelUpScreen from "./scripts/level_up_screen.js";
// window.LevelUpScreen = LevelUpScreen;


const canvas = document.getElementById('map')
const ctx = canvas.getContext('2d')

const gamev = new GameView(canvas, ctx)
// gamev.render()
// gamev.render(ctx)
gamev.start()
// gamev.game.spawn()
// gamev.game.resumeMovement()
// gamev.game.resumeCollision()
// gamev.game.allObjects()
// gamev.game.acquireWeapon()
// gamev.game.checkLevelUp()
// gamev.game.hero.addWeapon()
// gamev.game.resumeProjectiles()
// console.log(gamev.hero.availableWeapons[0])
// console.log(gamev.game.hero.WeaponOne === null, "weapon")
// console.log(gamev.hero === gamev.game.hero, "hero")
// gamev.game.callWeapons()
// console.log(gamev.hero === gamev.game.hero)
// console.log(gamev.hero.xvel)
// console.log(gamev.hero.weapons.length)

// button.addEventListener("click", (e) => gamev.game.testLog())

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

// const lvlup = new LevelUpScreen({hero: gamev.game.hero})
// lvlup.generateChoice()
// lvlup.render(ctx)