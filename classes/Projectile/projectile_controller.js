//This is a class that controll the projectile 
//make it easier to shoot multiple at once
//TODO: delete projectile by either using (time/position) 
//      position: if the projectile position is out of the screen DELETE
//      time: if the projectile lifetime has finished DELETE
class ProjectileController
{
    constructor()
    {
        this.projectiles = []

        //for global color of all the projectiles
        this.color = "#0000ff"


        //Interval to clean up the projectile (ms)
        this.timer = new Date().getTime()
        this.cleanupInterval = 100

        //debug
        this._iscleaningupPorjectile = false
    }

    setColor(color)
    {
        //TODO: have to check if good format
        //TODO: make a basic 2d object class and inherit from it for all classes with similar behavior
        this.color = color
    }

    //Add a projectile to the group but doesnt shoot it
    addProjectile(posX, posY)
    {
        let projectile = new Projectile(posX, posY)
        projectile.setColor(this.color)

        this.projectiles.push(projectile)
    }

    //Shoot a already made projectile
    //using First in, First out
    //mX: direction of the projectile (Generally MouseX)
    //mY: direction of the projectile (Generally MouseY)
    shootProjectile(mX, mY)
    {
        if (this.projectiles.length > 0)
        {
            this.projectiles.forEach((projectile) =>
            {
                //projectile still didnt got shot
                if (!projectile.shooted)
                {
                    projectile.shoot(mX, mY)
                    return
                }
            })
        }
    }

    //Add a projectile and shoot it
    shoot(posX, posY, mX, mY)
    {
        this.addProjectile(posX, posY)
        this.shootProjectile(mX, mY)
    }

    //return: Array<Projectile>
    getProjectiles()
    {
        return this.projectiles
    }

    //The cleanUpProjectiles() assume there is no camera play or translation 
    //Its necessary to clean up the projectiles or edge cutting FPS/performance drop overtime
    //      startX: Int *Starter Postion of the Screen on the X-axis
    //      endX: Int *End Position of the screen on the X-axis
    //      startY/endY:Int *Same as above but for the Y-axis
    //of course use this function in the gameloop so it works properly
    _cleanUpProjectiles(startX, startY, endX, endY)
    {
        //1- check if the timer is equal to the interval
        //2- clean up the projectile depending on the screen X/Y axis 
        //3- setting the timer again for another interval

        let nowDate = new Date().getTime()
        if (nowDate - this.timer >= this.cleanupInterval)
        {
            //cleaning up the projectiles
            this.projectiles.forEach((projectile, index) =>
            {
                //check if the projectile is out of the screen
                if ((projectile.x < startX || projectile.x > endX) || (projectile.y < startY || projectile.y > endY))
                {
                    delete this.projectiles[index]
                    this.projectiles = this.projectiles.filter((value) => { return value != undefined })

                    this._iscleaningupPorjectile = true//debug
                }
            })

            //setting the timer
            this.timer = new Date().getTime()

            //debug
            if (this._iscleaningupPorjectile && this.projectiles.length == 0)
            {
                console.log("All Projectiles where cleaned from the Screen");
                this._iscleaningupPorjectile = false
            }
        }
    }

    //Update all projectile positions
    _update()
    {
        this.projectiles.forEach((projectile) =>
        {
            projectile.update_position()
        })
    }
}