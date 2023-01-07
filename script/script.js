var width
var height
var center
var player
var enemieController
var playerProjectileController
var stars = []
var gamestarted = false
var debug = true

//design purpous only
var bg_starsStablizer = 1
var stars_color = "#536F8D"

//testing
var rigidbody1

function setup()
{
    width = window.innerWidth
    height = window.innerHeight
    stars = generate_stars(300)
    center = { width: width / 2, height: height / 2 }
    player = new Player((center.width), center.height)
    enemieController = new EnemieController(3)
    createCanvas(width, height)
    gamestarted = true

    rigidbody1 = new RigideBody2d(center.width, center.height, 30, false)
}

//draw function
function draw()
{
    background(0)
    drawSpaceBackground()

    //draw projectiles
    push()
    fill("#fff")
    ellipse(rigidbody1.position.x, rigidbody1.position.y, 20, 20)
    pop()

    drawPlayer()
    drawEnemies()

    rigidbody1.apply()
}

function drawEnemies()
{
    enemieController.enemies.forEach(element =>
    {
        fill(element.color)
        noStroke()
        rect(element.x, element.y, element.width, element.height)
    })
}

//draw player and rotate the player depeding on the mouse
function drawPlayer()
{
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
}

//functions with purpous
//returns a radiant angle depending on the mouse position
function playerToMouseDirection()
{
    //TODO: if mouse colliding on rect3 or rect2 the returned angle should be negative [NOT DONE]
    stroke(255)
    strokeWeight(2)

    //triangle
    let ax1 = mouseX, ay1 = center.height, ax2 = mouseX, ay2 = mouseY //opposite
    let bx1 = center.width, by1 = center.height, bx2 = mouseX, by2 = center.height //adjacent
    let cx1 = center.width, cy1 = center.height, cx2 = mouseX, cy2 = mouseY //hypotenuse

    //works (distances)
    let opposite = (ax2 - ax1) - (ay2 - ay1)
    let adjacent = (bx2 - bx1) - (by2 - by1)
    let hypotenuse = ~~Math.sqrt(adjacent * adjacent + opposite * opposite) //cannot get distance from graphic unreliable
    let angle = Math.asin(opposite / hypotenuse)
    if (mouseX > center.width && mouseY > 0)
    {
        angle *= -1
    }
    if (isNaN(angle))
    {
        angle = 1.5
    }

    //for debuging purpouses
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
        text(angle, center.width, height - 20)
        //console.log("Distances:\nadjacent->" + adjacent + ", opposite->" + opposite + ", hypotenuse->" + hypotenuse)
    }

    //radiant angle
    return angle
}

//functions for design only
function generate_stars(n_stars)
{
    let _stars = []
    let max_size = 3
    let max_radius = 3
    for (let index = 0; index < n_stars; index++)
    {
        let _x = Math.floor((Math.random() * width) + 1);
        let _y = Math.floor((Math.random() * height) + 1);
        let _size = Math.floor((Math.random() * max_size) + 1);
        let _radius = Math.floor((Math.random() * max_radius) + 1);

        _stars.push({ x: _x, y: _y, size: _size, radius: _radius })
    }
    return _stars
}

function drawSpaceBackground()
{
    stars.forEach(element =>
    {
        push()
        fill(stars_color)
        ellipse(element.x, element.y, element.size, element.radius)
        pop()
        element.x += ((Math.random() * 0.3) + 1) * bg_starsStablizer
        element.y += ((Math.random() * 0.3) + 1) * bg_starsStablizer
    });

    if (bg_starsStablizer == 1)
    {
        bg_starsStablizer *= -1
    } else
    {
        bg_starsStablizer *= -1
    }
}

function mouseClicked()
{
    if (gamestarted)
    {
        let mX, mY
        if (mouseX < center.width && mouseY < center.height)
        {
            mX = ((mouseX) / 50) * -1
            mY = ((mouseY) / 50) * -1
        }
        rigidbody1.addForce((mouseX / 100) * 0.5 * -1, (mouseY / 100) * 0.5 * -1)
    }
}