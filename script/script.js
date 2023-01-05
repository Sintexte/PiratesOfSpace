var width
var height
var player

function setup()
{
    width = window.innerWidth
    height = window.innerHeight
    player = new Player(width / 2, height / 2)
    createCanvas(width, height)
}

function draw()
{
    background(0);
    fill(player.color)
    rect(player.x, player.y, player.width, player.height)
}