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