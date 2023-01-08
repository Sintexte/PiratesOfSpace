class Enemie
{
    constructor(x, y)
    {
        //position
        this.x = x
        this.y = y

        //target position; Not Used, Yet ?
        this.tX = 0
        this.tY = 0

        //size
        this.width = 50
        this.height = 30

        //angle
        this.angle = 0

        //movement
        this.speed = 5
        this.vx = 0
        this.vy = 0

        //game aspects
        this.health = 100
        this.dead = false

        //collision
        this.collision = new EnemieCollision(x, y, this.width / 1.5, this.height / 1.5)
        this.iscollision = false

        //"Aestetic"
        this.basecolor = "#FF0000"
        this.deadcolor = "#000000"
        this.hitcolor = "#00FF00"
        this.color = this.basecolor
    }

    //Game Aspect
    die()
    {
        this.dead = true
        this.vx = 0
        this.vy = 0
    }

    hurt(damage)
    {
        this.health -= damage
        if (this.health < 0) { this.dead = true; this.die() }

    }

    //Getters
    isDead() { return this.dead }

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

    movement_update()
    {
        this.x += this.vx * this.speed
        this.y += this.vy * this.speed

        //moving the square collision with the object
        this.collision.setPosition(this.x, this.y)
    }

    //collision update
    collision_update()
    {
        if (this.iscollision)
        {
            //Enemie Behavior/StateChange when colliding
            //will implement a enemie behavior
            //when taking colliding take damage
            //the problem is what if u collide with something that doesnt do damage
            //this implementation assume every collision must be a projectile
            //TODO {modify the code so it can know between hurtful collision and friendly collision,
            //      , for that you would need to change some code in script.js there where the projectile are given as collision bodies}

            this.hurt(100)
            this.color = this.hitcolor
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
        if (!this.isDead())
        {
            this.movement_update()

            //collision 
            this.collision_update()
        } else
        {
            this.color = this.deadcolor
        }


    }
}