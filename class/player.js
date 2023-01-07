class Player
{
    constructor(x, y)
    {
        //Basic States
        this.x = x
        this.y = y
        this.width = 50
        this.height = 30
        this.color = "#690fad"

        //Projectiles Controller
        this.pController = new ProjectileController()
        this.pController.color = '#0000ff'
    }

    setPosition(x, y)
    {
        this.x = x
        this.y = y
    }

    getPosition()
    {
        return { x: this.x, y: this.y }
    }
}