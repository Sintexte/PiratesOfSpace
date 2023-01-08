class SquareCollision
{
    constructor(x, y, width, height)
    {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.angle = 0
    }

    //Setters
    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }

    setSize(width, height)
    {

    }

    setAngle(angle)
    {
        this.angle = angle
    }

    _toEllipseCollisionAngle(ellipse)
    {
        //TODO
        //not implemented
        //stoped cause no need for a better collision system
        //standart collision even tho not very accurate, but is accurate enough for the needed collision system
    }


    //Old_Doc:
    /* Collision */
    //tested&works
    // rect: Object<{x:Int, y:Int, w:Int, h:Int}, {x:Int, y:Int, r:Decimal}>
    // {x,y}: position on the axis of the rect and ellipse object
    // {w,h}: size of the rect and ellipse object width/height
    // {radius}: radius of the ellipse object
    // 
    // *originalName: RectToEllipseCollision()
    toEllipseCollision(ellipse)
    {
        let x = this.x
        let y = this.y
        let w = this.width
        let h = this.height

        // Calculate the distance between the center of the ellipse and the closest point on the rectangle
        var distX = abs(ellipse.x - x - w / 2);
        var distY = abs(ellipse.y - y - h / 2);

        // If the distance is greater than half the width or height of the rectangle, the ellipse is too far away
        if (distX > (w / 2 + ellipse.radius)) { return false; }
        if (distY > (h / 2 + ellipse.radius)) { return false; }

        // If the distance is less than half the width or height, the ellipse is close enough
        if (distX <= (w / 2)) { return true; }
        if (distY <= (h / 2)) { return true; }

        // If the distance is between half the width or height and the sum of half the width or height and the radius, use Pythagoras to check for collision
        var dx = distX - w / 2;
        var dy = distY - h / 2;
        return (dx * dx + dy * dy <= (ellipse.radius * ellipse.radius)); //modified to work with the visuals of p5 build in ellipse drawer function
    }

}