class EnemieCollision extends SquareCollision
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height)
        this.timerstart = (new Date()).getTime()
        this.timerdelta = 1000 //ms //time to start 

    }

    checkCollisionArray(enemie, objects){
        //update the collision 
        objects.forEach((projectile) =>
        {
            //hard to debug code might change
            //only the enemie know he has been colliding
            //the other party will not, i will need to change the code and debug
            //to make it that both party knows in this case projectiles
            let iscolliding = enemie.isColliding(projectile.x, projectile.y, projectile.radius)

            if(iscolliding){enemie.setCollision(true)} 
            else{
                if(new Date().getTime() - this.timerstart > this.timerdelta){
                    enemie.setCollision(false)
                    this.timerstart = new Date().getTime()
                }
            }
            
        })
    }
}