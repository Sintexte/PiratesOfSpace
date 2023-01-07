//This Class is a Projectile Class
//Each projectile object (player/enemie?) on the screen come from this class
//TODO: delete projectile 
class Projectile
{
    //x, y: Int
    //forceVector: {Float, Float}
    constructor(x, y, forceVector)
    {
        this.rigidebody = new RigideBody2d(x, y, 100, false)
        this.rigidebody.addForce(forceVector.x, forceVector.y)
        //Creation time of the projectile (usefeull so it can be deleted later)
        this.creationTime = new Date().getTime()
    }


}