class Enemie
{
    constructor(x, y)
    {
        //position
        this.x = x
        this.y = y

        //target position
        this.tX = 0
        this.tY = 0

        //size
        this.width = 50
        this.height = 30

        //angle
        this.angle = 0

        //movement
        this.speed = 1
        this.vx = 0
        this.vy = 0

        //collision
        this.collision = new SquareCollision(x, y, this.width / 1.5, this.height / 1.5)
        this.iscollision = false

        //"Aestetic"
        this.color = "#FF0000"
    }

    //Setters
    setCollision(bool)
    {
        this.iscollision = bool
    }

    setAngle(angle)
    {
        this.collision.setAngle(angle)
        this.angle = angle
    }

    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }

    //move the enemie to a position 
    //gx: Int go Position X-axis
    //gy: Int go Position Y-axis
    move(gX, gY)
    {
        //position where togo
        let x2 = gX, y2 = gY

        //differance between two points
        let dx = x2 - this.x
        let dy = y2 - this.y

        //calculating the angle
        let angle = Math.atan2(dy, dx)

        //calculating the velocity
        this.vx = Math.cos(angle)
        this.vy = Math.sin(angle)
    }

    moveLook(gX, gY)
    {
        this.move(gX, gY)
        this.setAngle(this.enemieToDirection(gX, gY))
    }

    //isColliding with an ellipse
    //eX: Int ellipse position on the X-axis
    //eY: Int ellipse position on the Y-axis
    //r: Int ellipse radius 
    isColliding(eX, eY, r)
    {
        let iscollision = this.collision.toEllipseCollision({ x: eX, y: eY, radius: r })
        return iscollision
    }


    //posx, posy position of the enemie
    //mx, my a given position
    enemieToDirection(mX, mY)
    {
        //returns a radiant angle depending on a given position
        //{TODO: if mouse colliding on rect3 or rect2 the returned angle should be negative [NOT DONE]} [*DEPRECATED]
        let posX = this.x
        let posY = this.y
        //differance between two points
        let dx = mX - posX
        let dy = mY - posY

        //calculating the angle
        let angle = Math.atan2(dy, dx)

        //radiant angle
        return angle
    }

    //collision update
    collision_update()
    {
        if (this.iscollision)
        {
            //Enemie Behavior/StateChange when colliding
            console.log("Collision");
            this.color = "#00ff00"
        } else
        {
            //out of collision Return to normal state
            if (this.color != "#ff0000")
            {
                this.color = "#ff0000"
            }
        }
    }

    //main update function for the object
    _update()
    {
        //movement
        this.x += this.vx * this.speed
        this.y += this.vy * this.speed

        //collision 
        this.collision_update()
    }
}