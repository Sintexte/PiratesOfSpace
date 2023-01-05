class EnemieController
{

    constructor(EnemieNumber)
    {
        this.enemies = []
        this.generate_enemies(EnemieNumber)
    }

    generate_enemies(n_enemie)
    {
        for (let index = 0; index < n_enemie; index++)
        {
            this.enemies.push(new Enemie(30, 30))
        }
    }

}