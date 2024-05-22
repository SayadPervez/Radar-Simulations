let frame = 0;
let allParticles = [];
let center = null;
const circleResolution = 1;
const mouseSize = 10
const maxPendingArrays = 20

class Radar
{
    constructor(location)
    {
        this.location = location;
        this.drawRadar()
    }

    drawRadar()
    {
        strokeWeight(10);
        stroke(255,255,255);
        point(this.location);
    }
}

class Particle
{
    constructor(origin,emissionTime,r,theta,range)
    {
        this.origin = center;
        this.location = origin;
        this.range = range
        this.r = r
        this.emissionTime = emissionTime;
        this.velocity = createVector(
            r * Math.cos(theta*Math.PI/180),
            r * Math.sin(theta*Math.PI/180)
        )
        this.draw();
        this.reflected = false;
    }

    draw()
    {
        strokeWeight(1);
        if(this.reflected)
        {
            stroke(255,192,203)
        }
        else
        {
            stroke(255,255,0)
        }
        point(this.location);
    }

    update(i,ii)
    {
        this.originReception(i,ii)
        this.mouseCollision()
        this.location.add(this.velocity)
        if(this.location.dist(this.origin)>this.range)
        {
            allParticles[i][ii]=null
        }
    }

    mouseCollision()
    {
        if(this.reflected==false &&this.location.dist(createVector(mouseX,mouseY))<=mouseSize)
        {
            this.velocity.mult(-1);
            this.reflected = true;
        }
    }

    originReception(i,ii)
    {
        if(this.location.dist(center)<=10 && this.reflected)
        {
            console.log((Date.now()-this.emissionTime)*60*this.r/(1000*2),"px")
            allParticles[i][ii]=null
        }
    }
}

function mouseInteractions()
{
    stroke(255,0,0);
    fill(255,0,0);
    ellipse(mouseX, mouseY, mouseSize, mouseSize);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    center = createVector(window.innerWidth/2,window.innerHeight/2);
    frameRate(60)
}

function draw() {

    background(0);
    new Radar(center);

    if(frame%60==0)
    {
        let tempParticles = []
        let emissionTime = Date.now();
        for(let i=0;i<360*circleResolution;i++)
        {
            tempParticles.push(new Particle(center.copy(),emissionTime,1,i/circleResolution,400));
        }
        allParticles.push(tempParticles)

        if(allParticles.length>=maxPendingArrays)
        {
            allParticles[allParticles.length - maxPendingArrays] = null
        }
    }

    for (let i=0;i<allParticles.length;i++)
    {
        let pArray = allParticles[i]
        if(pArray==null)
        {
            continue
        }
        for (let ii=0;ii<pArray.length;ii++)
        {
            let p = pArray[ii]
            if(p!=null)
            {
                p.update(i,ii)
                p.draw();
            }
        }
    }

    mouseInteractions()

    frame+=1
}
