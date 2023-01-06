var width
var height
var center
var player
var enemieController
var debug = true

function setup()
{
    width = window.innerWidth
    height = window.innerHeight
    center = { width: width / 2, height: height / 2 }
    player = new Player((center.width), center.height)
    enemieController = new EnemieController(3)
    createCanvas(width, height)
}

function draw()
{
    background(0)

    //player
    push()
    let angle = playerToMouseDirection()
    rectMode(CENTER)
    translate(center.width, center.height);
    player.setPosition(0, 0)
    rotate(angle);
    fill(player.color)
    noStroke()
    rect(player.x, player.y, player.width, player.height)
    pop()


    enemieController.enemies.forEach(element =>
    {
        fill(element.color)
        noStroke()
        rect(element.x, element.y, element.width, element.height)
    })
}

function playerToMouseDirection()
{
    stroke(255)
    strokeWeight(2)
    //rectangle
    let size = { width: center.width, height: center.height }

    let rect3 = { x: 0, y: center.height, width: size.width, height: size.height }//negative angle
    let rect2 = { x: center.width, y: 0, width: size.width, height: size.height }//negative angle

    //triangle
    let ax1 = mouseX, ay1 = center.height, ax2 = mouseX, ay2 = mouseY //opposite
    let bx1 = center.width, by1 = center.height, bx2 = mouseX, by2 = center.height //adjacent
    let cx1 = center.width, cy1 = center.height, cx2 = mouseX, cy2 = mouseY //hypotenuse

    //works (distances)
    let opposite = Math.abs(Math.abs(ax2 - ax1) - Math.abs(ay2 - ay1))
    let adjacent = Math.abs(Math.abs(bx2 - bx1) - Math.abs(by2 - by1))
    let hypotenuse = ~~Math.sqrt(adjacent * adjacent + opposite * opposite) //cannot get distance from graphic unreliable
    let angle = Math.asin(opposite / hypotenuse)

    if (debug)
    {
        //opposite
        line(ax1, ay1, ax2, ay2)
        //adjacent
        line(bx1, by1, bx2, by2)
        //hypotenuse
        line(cx1, cy1, cx2, cy2)
        //angle
        textSize(32)
        let degree_angle = angle * (180 / Math.PI)
        text(degree_angle, center.width, height - 20);
        //console.log("Distances:\nadjacent->" + adjacent + ", opposite->" + opposite + ", hypotenuse->" + hypotenuse)
        fill(255)
        rect(rect2.x, rect2.y, rect2.width, rect2.height)
    }

    //radiant angle
    return angle
}