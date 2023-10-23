let inc = 0.005;

const particles = [];
var vectorField = [];
var particleCount = 10;

function setup() {
  createCanvas(400, 400);
  let yoff = 0;
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width);
      // let r = random(255);
      let r = (noise(xoff, yoff) * 180) + 90;
      vectorField.push(r);
      xoff += inc;
    }
    yoff += inc;
  }
  
  
  
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.speed = 1;
    this.history = [];
  }
  
  finished() {
    return this.x < 0;
  }
  
  update() {
    const toRad = Math.PI / 180;
    let vX = this.speed * Math.cos(this.direction * toRad);
    let vY = this.speed * Math.sin(this.direction * toRad);
    this.x += vX;
    this.y += vY;
    let index = Math.round(this.y) * width + Math.round(this.x);
    this.direction = vectorField[index];
    var vector = createVector(this.x, this.y);
    this.history.push(vector);
  }
  
  show() {
    stroke(0);
    fill(0, 150);
    ellipse(this.x, this.y, 18, 18);
    
    for (let i = 0; i < this.history.length; i++) {
      let pos;
      pos = this.history[i];
      ellipse(pos.x, pos.y, 5, 5);
    }
  }
}




function draw() {
  background(200);
  for (let p = 0; p < 5; p++) {
    if (particles.length > 10) {
      break;
    }
    let r = Math.random() * height;
    particle = new Particle(width - 100, r);
    particles.push(particle);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.show();
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
    
  }
  console.log(particles.length);
  
}
