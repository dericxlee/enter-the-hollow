# Enter the Hollow

## Background

Enter the Hollow is a single-player rogue-like survival game which takes inspiration from Vampire Survivors. The goal of this game is to survive endless swarms of enemies within the allocated timer on a 2D plane. To assist the user, the user will receive new abilities or upgrades after every level-up. User abilities release projectiles automatically on a time interval and deals damage to enemies on contact. Enemies on death drop experience gems. The user will control its character using W-A-S-D movement keys. Abilities will be chosen in each level-up screen using left-mouse-button. Spacebar manually pauses and unpauses the game.


## Functionality & MVPs

### Collision Detection

All rendered objects have circle hitboxes. Collision is checked periodically on setInterval using distance comparison against the radius sum of the two objects. The only collisions that return an action are:

*User vs Enemy
*User vs Experience Gem
*Enemy vs Projectile

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

(SS)

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
 
*DOM from Vanilla JS
*Canvas, CSS, HTML for rendering
*Sprites from various sources (credit at the bottom)


## Implementation Timeline

*Friday Afternoon: Collision detection and vector updates
*Weekend: Create classes for core gameplay
*Monday: Create classes for core gameplay 
*Tuesday: User controls and sprites implementation
*Wednesday: Layout styling, additional features
*Thursday Morning: Minor tweaks on features


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