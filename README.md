# Enter the Hollow

## Background

Enter the Hollow is a single-player rogue-like survival game which takes inspiration from Vampire Survivors. The goal of this game is to survive endless swarms of enemies within the allocated timer on a 2D plane. To assist the user, the user will receive new abilities or upgrades after every level-up. User abilities release projectiles automatically on a time interval and deals damage to enemies on contact. Enemies on death drop experience gems. The user will control its character using W-A-S-D movement keys. Abilities will be chosen in each level-up screen using left-mouse-button. Spacebar manually pauses and unpauses the game.


## Functionality & MVPs

### Collision Detection

All rendered objects have circle hitboxes. Collision is checked periodically on setInterval using distance comparison against the radius sum of the two objects. The only collisions that return an action are:

*User vs Enemy
*User vs Experience Gem
*Enemy vs Projectile

(SS)

### Vector Update

Enemies and gems (within magnetic radius) have periodically updated vectors on setInterval to follow the user. New vectors are calculated and adjusted using their speed attribute and total distance from user.

(SS)

### Level-up pop-up

Upgrade choices are generated using Math.random() in their individual class constructors. Weapon choices are pulled from an array using Math.random() to prevent duplicates. addEventListener are added upon level-up screen and subsequently removed on event. This prevents overloading an event with an increasing amount of actions being fired. 

(SS)

### Pause

Pausing game state is resolved by assigning interval ids from all setInterval functions to class variables. On pause, clearInterval is called all interval id variables. On unpause, the same variables are reassigned new setInterval functions. 

(SS)

Spacebar pauses the game manually. To prevent user override of natural pauses, variables are assigned a loop of addEventListener and removeEventListener. 

``` pauseBySpace(event){
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

### Play Again

Game state is reset to constructor values by mass reassignment of class variables. All objects except game and user (hero) are removed.

(SS)



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