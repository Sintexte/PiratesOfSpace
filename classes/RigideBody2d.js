//This Class main purpous is to simulate a body
//But is more movement oriented for now (acceleration/forces/friction ...)

//this class was made with alot of pain and love
//not completed yet but works as intended
class RigideBody2d
{
    constructor(x, y, mass, isfriction)
    {
        if (!mass) mass = 1
        if (!isfriction) isfriction = false
        this.position = new Vector2(x, y)
        this.forces = [new Vector2(0, 0)]
        this.force = new Vector2(0, 0)
        this.velocity = new Vector2(0, 0)
        this.accelaration = new Vector2(0, 0)
        this.mass = mass//kg
        this.friction = new Vector2(0, 0)
        this.deltatime = new Date().getTime()
        this.isfriction = isfriction
        //finalv       = initialv+acc*time 
        //acceleration = force/mass
    }

    apply_friction()
    {
        //friction
        this.force.x -= this.friction.x / this.mass
        this.force.y -= this.friction.y / this.mass
    }

    apply_velocity()
    {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    calculate_force()
    {
        this.forces.map((element) =>
        {
            this.force.x += element.x
            this.force.y += element.y
        })
    }

    apply_force()
    {
        this.accelaration.x += this.force.x / this.mass
        this.accelaration.y += this.force.y / this.mass
    }

    apply_acceleration()
    {
        this.velocity.x = this.accelaration.x * ((new Date().getTime() - this.deltatime) / 1000)
        this.velocity.y = this.accelaration.y * ((new Date().getTime() - this.deltatime) / 1000)
    }

    apply()
    {
        this.apply_force()
        this.apply_acceleration()
        this.apply_velocity()
        this.calculate_force()
        if (this.isfriction) this.apply_friction()
    }

    addForce(Fx, Fy)
    {
        this.forces.push(new Vector2(Fx, Fy))
    }

    removeAllForces()
    {
        this.forces = [new Vector2(0, 0)]
    }
}