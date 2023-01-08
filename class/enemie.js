class Enemie
{
    constructor(x, y)
    {
        //position
        this.x = x
        this.y = y

        //size
        this.width = 50
        this.height = 30

        //movement
        this.speed = 1
        this.vx = 0
        this.vy = 0

        //"Aestetic"
        this.color = "#FF0000"
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

    _update()
    {
        this.x += this.vx * this.speed
        this.y += this.vy * this.speed
    }
}