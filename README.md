# Enter the Hollow

[Live Site](https://dericxlee.github.io/enter-the-hollow/)

## Background

Enter the Hollow is a single-player rogue-like survival game which takes inspiration from Vampire Survivors. The goal of this game is to survive endless swarms of enemies within the allocated timer on a 2D plane. To assist the user, the user will receive new abilities or upgrades after every level-up. User abilities release projectiles automatically on a time interval and deals damage to enemies on contact. Enemies on death drop experience gems. The user will control its character using W-A-S-D movement keys. Abilities will be chosen in each level-up screen using left-mouse-button. Spacebar manually pauses and unpauses the game.


## Functionality & MVPs


### Player Movement

Player movement is bound by the borders of the canvas.

```javascript
    move(){
        const hor = this.x + (this.xvel * this.speed)
        const ver = this.y + (this.yvel * this.speed)

        if(hor < 0 || hor > 1400) {
            this.x = this.x
        } else {
            this.x = hor
        };
        
        if(ver < 50 || ver > 700) {
            this.y = this.y
        } else {
            this.y = ver
        };
    }
```



### Collision Detection

All rendered objects have circle hitboxes. Collision is checked periodically on setInterval using distance comparison against the radius sum of the two objects. The only collisions that return an action are:

1. User vs Enemy
2. User vs Experience Gem
3. Enemy vs Projectile

```javascript
    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];
    
                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return collision;
                }
            }
        }
    }
```

### Vector Update

Enemies and gems (within magnetic radius) have periodically updated vectors on setInterval to follow the user. New vectors are calculated and adjusted using their speed attribute and total distance from user. Below is the code for gem vector. 

```javascript
    distFromHero(){
        return Math.sqrt((this.hero.x - this.x)**2 + (this.hero.y - this.y)**2)
    }

    updateXVel(){
        return this.xvel = (this.hero.x - this.x) * (this.speed/this.distFromHero())
    }

    updateYVel(){ 
        return this.yvel = (this.hero.y - this.y) * (this.speed/this.distFromHero())
    }

    chase(){
        if(this.distFromHero() < this.hero.magnetism){
            this.xvel = this.updateXVel();
            this.yvel = this.updateYVel();
        }
    }
```

### Level-up pop-up

Upgrade choices are generated using Math.random() in their individual class constructors. Weapon choices are pulled from an array using Math.random() to prevent duplicates. addEventListener are added upon level-up screen and subsequently removed on event. This prevents overloading an event with an increasing amount of actions being fired. 

```javascript
    displayChoices(){
        if((this.level - 1) % 3 === 0 && this.weapons.length < 3) {
            this.addWeaponChoices()
        } else {
            this.addChoices()
        }
        buttonOverlay.style = 'display:block'
        buttonOne.addEventListener("click", this.onClickOne)
        buttonTwo.addEventListener("click", this.onClickTwo)
        buttonThree.addEventListener("click", this.onClickThree)
    }

    generateChoice(){
        let randomNumber = Math.ceil(Math.random()*Hero.RNG)

        if(randomNumber === 1){
            return new PlayerPowerUp({hero: this});
            
        } else { // adding more weight to weapon upgrades
            return new WeaponPowerUp({hero: this});
        }
    }

    generateWeaponChoice(){
        let randomNum = Math.floor(Math.random() * this.availableWeapons.length)
        let weapon = this.availableWeapons[randomNum]
        this.availableWeapons.splice(randomNum, 1)
        return weapon;
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
```

### Pause

Pausing game state is resolved by assigning interval ids from all setInterval functions to class variables. On pause, clearInterval is called all interval id variables. On unpause, the same variables are reassigned new setInterval functions. Additional work can be done to consolidate most setInterval functions within the timer function.

```javascript
    pauseTimer(){
        return clearInterval(this.timerIntervalId)
    }

    pauseGameState(){ 
        this.pauseProjectiles()
        this.pauseCollision()
        this.pauseMovement()
        this.pauseSpawn()
        this.pauseTimer()
        this.paused = true
    }
```

```javascript
    resumeTimer(){
        this.timerIntervalId = setInterval(()=>{
            this.timer -= 1
            currentTime.innerText = `${this.timer}`
            if(this.timer < 0) currentTime.innerText = "Endless"
            if(this.timer % Game.BOSS_TIMER === 0) this.addBoss()
            if(this.timer === 0) this.gameOver()
        }, 1000)
    }

    resumeGameState(){
        this.resumeProjectiles()
        this.resumeSpawn()
        this.resumeMovement()
        this.resumeCollision()
        this.resumeTimer()
        this.paused = false
    }
```

Spacebar pauses the game manually. To prevent user override of natural pauses, variables are assigned a loop of addEventListener and removeEventListener. 

``` javascript
    pauseBySpace(event){
        const spacekey = event.key;
        event.preventDefault()
        if(spacekey == ' ' && !this.game.paused){
            this.game.pauseGameState()
            window.keyDown = window.removeEventListener('keydown', this.pauseBySpace);
            window.keyDown = window.addEventListener('keydown', this.unPauseBySpace);
            pauseBox.style.display = "block"
        }
    }

    unPauseBySpace(event){
        const spacekey = event.key;
        event.preventDefault()
        if(spacekey == ' ' && this.game.paused){
            this.game.resumeGameState()
            window.keyDown = window.removeEventListener('keydown', this.unPauseBySpace);
            window.keyDown = window.addEventListener('keydown', this.pauseBySpace);
            pauseBox.style.display = "none"
        }
    }
```

### Play Again

Game state is reset to constructor values by mass reassignment of class variables. All objects except game and user (hero) are removed.

```javascript
    resetGameState(){
        this.hero.resetHeroState()
        this.monsterSpawn = Game.NUM_MON
        this.damageDone = 0
        this.kills = 0
        this.monsters = [];
        this.addMonster()
        this.gems = [];
        this.projectiles = [];
        this.timer = Game.TIMER
        gameOverPopUp.style = 'display:none'
        currentTime.innerText = `${this.timer}`
        resetButton.removeEventListener("click", this.reset)
        this.intervalId = null
        this.moveIntervalId = null
        this.collisionIntervalId = null
        this.timerIntervalId = null
        this.hero.displayChoices()
    }
```

```javascript
    resetHeroState(){
        this.weapons = [];
        this.resetWeapons()
        this.resetAbilityHud();
        this.health = Hero.HP
        this.magnetism = Hero.MAGNET
        this.level = Hero.START_LVL
        this.speed = Hero.SPEED
        this.experience = 0
        this.experienceForLevel = Hero.EXP_REQ
        this.x = Hero.START_X
        this.y = Hero.START_Y
        experienceBar.max = this.experienceForLevel
        experienceBar.value = this.experience
        progressLevel.innerText = `Level: ${this.level}`
        playerSpeed.innerText = `Speed: ${this.speed}`
        playerHealth.innerText = `Health: ${this.health}`
        playerMagnet.innerText = `Magnetic: ${this.magnetism}`
        playerHealth.style.color = "white"
    }
```

## Technologies, Libraries, APIs
 
1. DOM from Vanilla JS
2. Canvas, CSS, HTML for rendering
3. Sprites from various sources (credit at the bottom)


## Implementation Timeline

1. Friday Afternoon: Collision detection and vector updates

2. Weekend: Create classes for core gameplay

3. Monday: Create classes for core gameplay

4. Tuesday: User controls and sprites implementation

5. Wednesday: Layout styling, additional features

6. Thursday Morning: Minor tweaks on features


## Assets Used

Shuriken Sprite by DK_Happy
https://dk-happy.itch.io/shuriken-ninja

Pixel-art Effects by CodeManu
https://codemanu.itch.io/pixelart-effect-pack

Character Sprite by Pipoya
https://pipoya.itch.io/pipoya-free-rpg-character-sprites-32x32

Gem sprites by Laredgames
https://laredgames.itch.io/gems-coins-free

Font imports from CDNFonts
https://www.cdnfonts.com/