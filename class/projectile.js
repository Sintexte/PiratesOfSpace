//Basic class used to store the behavior of a projectile
//TODO: delete projectile [Check ProjectileController]
class Projectile
{
    //x: Int Starting point on the X-axis
    //y: Int Starting point on the Y-axis
    constructor(x, y)
    {
        this.x = x
        this.y = y

        //velocity
        this.vx = 0
        this.vy = 0

        this.speedMultipler = 1

        this.shooted = false

        //This part is used for the aesthetics,
        //it has nothing todo with the behavior of the projectile
        this.color = "#ff0000"
        this.radius = 15
    }

    setColor(color)
    {
        //TODO: have to check if good format
        this.color = color
    }

    //Shoot the projectile
    //mX for the X axis (Mouse)
    //mY for the Y axis (Mouse)
    shoot(mX, mY)
    {
        //cannot shoot multiple time the same projectile
        if (this.shooted == false)
        {
            //differance between two points
            let dx = mX - this.x
            let dy = mY - this.y

            //calculating the angle
            let angle = Math.atan2(dy, dx)

            //calculating the velocity
            this.vx = Math.cos(angle)
            this.vy = Math.sin(angle)

            //setting the shooted? to true
            this.shooted = true
        }
    }

    update_position()
    {
        //only update position if shooted
        if (this.shooted)
        {
            this.x += this.vx * this.speedMultipler
            this.y += this.vy * this.speedMultipler
        }
    }
}