class EnemieController
{

    //sWidth: Int screen width
    //sHeight: Int screen Height
    constructor(EnemieNumber, sWidth, sHeight)
    {
        this.enemies = []
        this.generateEnemies(EnemieNumber, sWidth, sHeight)

        //margin behind the screen  
        this.margin = 50
    }

    //generate a number of enemies
    //n_enemies: Int number of enemies
    generateEnemies(n_enemies, screenWidth, screenHeight)
    {
        //TODO: add check to input
        console.log(this.margin);
        let margin = 600
        let Xmargin = { start: -margin, end: margin }
        let Ymargin = { start: -margin, end: margin }

        for (let index = 0; index < n_enemies; index++)
        {
            let posX = Math.floor(((Math.random() * (screenWidth + Xmargin.end)) + (screenWidth + Xmargin.start)))
            let posY = Math.floor(((Math.random() * (screenHeight + Ymargin.end)) + (screenHeight + Ymargin.start)))
            console.log(posX, posY);
            this.enemies.push(new Enemie(posX, posY))
        }
    }


    _update()
    {
        this.enemies.map((enemie) =>
        {
            enemie._update()
        })
    }

}