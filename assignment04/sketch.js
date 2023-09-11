let robots=[];
let arrows=[];
let eyes=['one','two'];
let arrowImages=[];
// let arrowDirections=['arrowLeft','arrowRight','arrowUp','arrowDown'];
// let arrowLeft,arrowRight,arrowUp,arrowDown;
let temp;
let score=0;
let font;

function preload(){
  arrowImages.push(loadImage('assets/arrow_left.png'));
  arrowImages.push(loadImage('assets/arrow_right.png'));
  arrowImages.push(loadImage('assets/arrow_up.png'));
  arrowImages.push(loadImage('assets/arrow_down.png'));
  font=loadFont("assets/Orbitron-VariableFont_wght.ttf");


}

function setup(){
  let cnv=createCanvas(800,600);
  cnv.parent("#canvas_container");
  cnv.style("display","block");
  cnv.style("margin","auto");
  imageMode(CENTER);

  // arrows
  for(let i=1;i<8;i++){
    for(let j=1;j<8;j++){
      let xpos=i*width/8;
      let ypos=j*height/8;
      let a=new Arrow(xpos,ypos);
      arrows.push(a);
    }
  }

}

function draw(){
  background(100);

  // display door
  rectMode(CENTER);
  fill(255,255,0);
  noStroke();
  rect(790,450,20,150);

  //display score
  textFont(font);
  textSize(20);
  fill(255);
  noStroke();
  text("Score: "+score,10,25);
  // display arrows
  for(let i=0;i<arrows.length;i++){
    arrows[i].display();
  }

  // create robots
  if(frameCount%250===0){
    temp=new Robot(0,height/2,"right");
    robots.push(temp);
  }

  // display robots
  for(let i=0;i<robots.length;i++){
    robots[i].display();
    robots[i].move(arrows);
    robots[i].detectHit(i);
  }
}

class Robot{
  constructor(x,y,direction){
    this.x=x;
    this.y=y;
    this.direction=direction;
    this.head=random(25,50);
    this.body=this.head+25;
    this.headColor=[random(255),random(255),random(255)];
    this.bodyColor=[random(255),random(255),random(255)];
    this.armColor=[random(255),random(255),random(255)];
    this.eye=random(eyes);
    this.speed=1;
    this.thrusterTransparency=255;
    this.thrusterChange=-20;
  }

  display(){
    rectMode(CENTER);
    noStroke();

    //thruster
    if(this.thrusterTransparency<=50){
      this.thrusterChange=10;
    }
    else if(this.thrusterTransparency>=255){
      this.thrusterChange=-10;
    }
    this.thrusterTransparency+=this.thrusterChange;
    // thruster on the left
    if(this.direction=="right"){
      fill(255,255,0,this.thrusterTransparency);
      noStroke();
      ellipse(this.x-this.body/2,this.y+this.body/1.5,20,20);
    }
    // thruster on the right
    if(this.direction=="left"){
      fill(255,255,0,this.thrusterTransparency);
      noStroke();
      ellipse(this.x+this.body/2,this.y+this.body/1.5,20,20);
    }
    // thruster at the bottom
    if(this.direction=="up"){
      fill(255,255,0,this.thrusterTransparency);
      noStroke();
      ellipse(this.x,this.y+this.head/1.5+this.body/1.5,20,20);

    }
    // thrsuter at the top
    if(this.direction=="down"){
      fill(255,255,0,this.thrusterTransparency);
      noStroke();
      ellipse(this.x,this.y-this.head,20,20);

    }

    // arms
    fill(this.armColor);
    rect(this.x-this.body/2,this.y-this.body/24,this.body/4,this.body/5*4);
    rect(this.x+this.body/2,this.y-this.body/24,this.body/4,this.body/5*4);
    // head
    fill(this.headColor);
    rect(this.x,this.y-this.head/2,this.head,this.head);
    // body
    fill(this.bodyColor);
    rect(this.x,this.y+this.body/2,this.body,this.body);
    // eyes
    fill(255);
    if(this.eye=="one"){
      rect(this.x,this.y-this.head/2,this.head/6*3,this.head/4);
    }
    else if(this.eye=="two"){
      rect(this.x-this.head/4,this.y-this.head/3*2,this.head/5,this.head/4);
      rect(this.x+this.head/4,this.y-this.head/3*2,this.head/5,this.head/4);
    }
  }

  move(arrows){
    if(this.direction=="right"){
      this.x+=this.speed;
    }
    if(this.direction=="left"){
      this.x-=this.speed;
    }
    if(this.direction=="up"){
      this.y-=this.speed;
    }
    if(this.direction=="down"){
      this.y+=this.speed;
    }

    for(let i=0;i<arrows.length;i++){
      let d=dist(this.x,this.y,arrows[i].x,arrows[i].y);
      if(d<=50){
        stroke(255,255,0);
        strokeWeight(map(d,50,25,1,5));
        line(this.x,this.y,arrows[i].x,arrows[i].y);
      }
      if(d<=25){
        this.direction=arrows[i].direction;
      }
    }

  }

  detectHit(i){
    if(this.x-this.body>=width || this.x+this.body<=0 || this.y+this.body<=0 || this.y-this.body-this.head>=height){
      // console.log("hit");
      robots.splice(i,1);
      // score if enter door
      if(this.x>=width&&this.y>450-75&&this.y<450+75){
        score+=1;
      }
    }
  }
}

class Arrow{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.direction=random(['left','right','up','down']);
    this.lock=0;
    this.arr=arrowImages[0];
  }

  display(){
    imageMode(CENTER);
    if(this.direction==="left"){
      this.arr=arrowImages[0];
    }
    else if(this.direction==="right"){
      this.arr=arrowImages[1];
    }
    else if(this.direction==="up"){
      this.arr=arrowImages[2];
    }
    else if(this.direction==="down"){
      this.arr=arrowImages[3];
    }
    image(this.arr,this.x,this.y);

    // lock if more than 5 click
    if(this.lock==5){
      rectMode(CENTER);
      stroke('yellow');
      strokeWeight(2);
      noFill();
      rect(this.x,this.y,50,50);
    }

  }

  checkClick(){
    if(this.lock<5&&dist(this.x,this.y,mouseX,mouseY)<=25){
      if(this.direction==="up"){
        this.direction="right";
      }
      else if(this.direction==="right"){
        this.direction="down";
      }
      else if(this.direction==="down"){
        this.direction="left";
      }
      else if(this.direction==="left"){
        this.direction="up";
      }
      this.lock+=1;
    }
  }
}

function mousePressed(){
  for(let i=0;i<arrows.length;i++){
    arrows[i].checkClick();
  }
}
