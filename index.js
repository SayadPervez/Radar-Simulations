function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0)
    fill(255,0,0)
    noStroke()
    ellipse(0,0,50)
    ellipse(window.innerWidth,window.innerHeight,50)
}
