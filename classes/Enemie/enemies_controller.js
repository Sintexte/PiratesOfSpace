class EnemieController
{

    //sWidth: Int screen width
    //sHeight: Int screen Height
    constructor(EnemieNumber, sWidth, sHeight)
    {
        this.enemies = []
        this.generateEnemies(EnemieNumber, sWidth, sHeight)

        //collision
        //possible colliding objects
        this.pCollidingObjects = []

        //margin behind the screen  
        this.margin = 50

        //timer Clean up enemies
        this.timerstart = (new Date()).getTime()
        this.cleanupInterval = 100

        this._iscleaningupEnemies = false
    }

    //assuming an object that have x, y, radius as states
    setCollidingEllipseObjects(array)
    {
        this.pCollidingObjects = []
        array.forEach((ellipse) =>
        {
            this.pCollidingObjects.push(ellipse)
        })
    }

    //generate a number of enemies
    //n_enemies: Int number of enemies
    generateEnemies(n_enemies, screenWidth, screenHeight)
    {
        //TODO: add check to input
        let margin = 600
        let Xmargin = { start: -margin, end: margin }
        let Ymargin = { start: -margin, end: margin }

        for (let index = 0; index < n_enemies; index++)
        {
            let posX = Math.floor(((Math.random() * (screenWidth + Xmargin.end)) + (screenWidth + Xmargin.start)))
            let posY = Math.floor(((Math.random() * (screenHeight + Ymargin.end)) + (screenHeight + Ymargin.start)))
            this.enemies.push(new Enemie(posX, posY))
        }
    }


    //calculation for the collision of the enemie on all "projectiles" or ellipseShaped bodies
    collision_update(enemie)
    {
        enemie.collision.checkCollisionArray(enemie, this.pCollidingObjects)
    }


    //Reused Code: Might Make a particule class for this
    //The cleanUpProjectiles() assume there is no camera play or translation 
    //Its necessary to clean up the projectiles or edge cutting FPS/performance drop overtime
    //      startX: Int *Starter Postion of the Screen on the X-axis
    //      endX: Int *End Position of the screen on the X-axis
    //      startY/endY:Int *Same as above but for the Y-axis
    //of course use this function in the gameloop so it works properly
    _cleanUpEnemies()
    {
        //1- check if the timer is equal to the interval
        //2- clean up the projectile depending on the screen X/Y axis 
        //3- setting the timer again for another interval

        let nowDate = new Date().getTime()
        if (nowDate - this.timerstart >= this.cleanupInterval)
        {
            //cleaning up the projectiles
            this.enemies.forEach((enemie, index) =>
            {
                //check if the projectile is out of the screen
                if (enemie.isDead())
                {
                    delete this.enemies[index]
                    this.enemies = this.enemies.filter((value) => { return value != undefined })

                    this._iscleaningupEnemies = true//debug
                }
            })

            //setting the timer
            this.timerstart = new Date().getTime()

            //debug
            if (this._iscleaningupEnemies && this.enemies.length == 0)
            {
                console.log("All Enemies where cleaned from the Screen");
                this._iscleaningupEnemies = false
            }
        }
    }

    _update()
    {
        this.enemies.map((enemie) =>
        {
            this.collision_update(enemie)

            enemie.collision_update(enemie)
            enemie._update()
        })
    }

}