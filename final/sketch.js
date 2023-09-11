let img1,img2,img3,snow;
let layer1,layer2,currentLayer;
let buffer1;
let snows=[];
let output;
function preload(){
  img1=loadImage("2dassets/tree_1.png");
  img2=loadImage("2dassets/tree_2.png");
  img3=loadImage("2dassets/tree_3.png");
  snow=loadImage("2dassets/snowflake.png");
}


function setup(){
  createCanvas(800,600);
  background(0);
  layer1 = createGraphics(800,600);
  layer2 = createGraphics(800,600);
  layer3 = createGraphics(800,600);
  buffer1 = createGraphics(800,600);
  output = document.getElementById('color_panel')
  for (let i = 0; i < 50; i++) {
    let temp = new Snow(random(10, width-10), random(-500,50) );
    snows.push( temp );
  }
}

function draw(){
  background(0);
  imageMode(CORNER);
  image(img1,0,0);
  // image(img2,0,0);
  // buffer1.fill(snow);
  // image(buffer1, mouseX, mouseY);
  for (let i = 0; i < snows.length; i++) {
    snows[i].display();
    // snows[i].drawornaments();
  }
}

function selectTopLayer(el) {
  currentLayer = layer2;
  document.querySelector('.selected').classList.remove('selected');
  el.classList.add('selected');
}

function selectBottomLayer(el) {
  currentLayer = layer1;
  document.querySelector('.selected').classList.remove('selected');
  el.classList.add('selected');
}

function selectThirdLayer(el) {
  currentLayer = layer3;
  document.querySelector('.selected').classList.remove('selected');
  el.classList.add('selected');
}

class Snow{
  constructor(x,y){
    this.img=snow;
    this.x=x;
    this.y=y;
    this.angle = random(360);
    this.speed = random(1,2);
    this.size=random(10,60);
  }
  display(){
    this.y += this.speed;
    if (this.y > height+50) {
      this.y = random(-500, -50);
      this.x = random(10,width-10);
    }
    imageMode(CENTER);

    // rotation
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    image(this.img,0,0,this.size,this.size);
    this.angle++;
    pop();
  }

  drawornaments(){
    let c=get(mouseX,mouseY);
    if(c=255){
      fill(random(255),random(255),random(255));
      if(this.shapes=1){
        ellipse(this.x,this.y,20,20);
      }
      else if(this.shapes=2){
        rect(this.x,this.y,20,20);
      }
    }
  }

}


// class Orna{
//   constructor(){
//     this.x=x;
//     this.y=y;
//     this.shapes=random(1,2);
//   }
//   display(){
//     let c=get(mouseX,mouseY);
//     if(c=255){
//       fill(random(255),random(255),random(255));
//       if(this.shapes=1){
//         ellipse(this.x,this.y,20,20);
//       }
//       else if(this.shapes=2){
//         rect(this.x,this.y,20,20);
//       }
//     }
//
//   }
// }
