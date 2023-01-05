var width
var height
var player
var enemieController
var debug = true

function setup()
{
    width = window.innerWidth
    height = window.innerHeight
    player = new Player(width / 2 - 50 / 2, height / 2 - 30 / 2)
    enemieController = new EnemieController(3)
    createCanvas(width, height)
}

function draw()
{
    background(0)
    fill(player.color)
    noStroke()
    rect(player.x, player.y, player.width, player.height)
    mouseToDirection()

    enemieController.enemies.forEach(element =>
    {
        console.log("Enemie Draw");
        fill(element.color)
        noStroke()
        rect(element.x, element.y, element.width, element.height)
    })
}

function mouseToDirection()
{
    stroke(255)
    strokeWeight(2)
    //triangle
    let ax1 = mouseX, ay1 = height / 2, ax2 = mouseX, ay2 = mouseY
    let bx1 = width / 2, by1 = height / 2, bx2 = mouseX, by2 = height / 2
    let cx1 = width / 2, cy1 = height / 2, cx2 = mouseX, cy2 = mouseY

    //works
    let adistance = Math.abs(Math.abs(ax2 - ax1) - Math.abs(ay2 - ay1))
    let bdistance = Math.abs(Math.abs(bx2 - bx1) - Math.abs(by2 - by1))
    let cdistance = ~~Math.sqrt(adistance * adistance + bdistance * bdistance)

    if (debug)
    {
        //adjacent
        line(ax1, ay1, ax2, ay2)
        //opposite
        line(bx1, by1, bx2, by2)
        //hypotenuse
        line(cx1, cy1, cx2, cy2)
        console.log("Distances:\na->" + adistance + ", b->" + bdistance + ", c->" + cdistance)
    }
}