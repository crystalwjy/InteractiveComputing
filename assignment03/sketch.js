// snake body size
let size=20;
// food variable
let f;
// background image
let bg;
// start screen image
let startImage;
// sound variables
let hitFood,startMusic;
// game state
let state=0;
// font
let myFont;

function preload(){
  bg=loadImage("assets/snakebg.png");
  startImage=loadImage("assets/startScreen.jpeg");
  hitFood=loadSound("assets/hit.wav");
  myFont=loadFont("assets/Dongle-Regular.ttf");
}

function setup(){
  let cnv = createCanvas(600,600);
  cnv.parent('#canvas_container');
  cnv.style("display","block");
  cnv.style("margin","auto");
  s=new snake();
  newFoodPos();
  noStroke();
}

function draw(){
  if(state==0){
    gameStart();
  }
  // level 1
  else if(state==1){
    gamePlay1();
  }
  // level 2
  else if(state==2){
    gamePlay2();
  }
  else if(state==3){
    gamePlay3();
  }
  else{
    gameEnd();
  }
}

function gameStart(){
  background(100,204,44);
  textFont(myFont);
  image(startImage,70,100);
  fill(240,230,140,200);
  textSize(45);
  text("Difficulty Level",205,360);
  // level 1 button
  textSize(30);
  fill(240,230,140,200);
  rect(200,380,40,40);
  fill(128,128,0);
  text("1",215,405);
  // level 2 button
  fill(240,230,140,200);
  rect(280,380,40,40);
  fill(128,128,0);
  text("2",295,405);

  // level 3 button
  fill(240,230,140,200);
  rect(360,380,40,40);
  fill(128,128,0);
  text("3",375,405);


}

function gamePlay1(){
  background(0);
  image(bg,0,0,width,height);
  frameRate(4);

  // if the snake touches the food
  if(s.eat(f)){
    hitFood.play();
    newFoodPos();
  }
  s.end();
  s.update();
  s.display();

  fill(255,0,0);
  rect(f.x,f.y,size,size);

  // display score
  fill(0);
  textSize(30);
  text("Score: "+s.len,15,20);

}

function gamePlay2(){
  background(0);
  image(bg,0,0,width,height);
  frameRate(6);

  // if the snake touches the food
  if(s.eat(f)){
    hitFood.play();
    newFoodPos();
  }
  s.end();
  s.update();
  s.display();

  fill(255,0,0);
  rect(f.x,f.y,size,size);

  // display score and difficulty level
  fill(0);
  textSize(15);
  text("Score: "+s.len,15,20);

}

function gamePlay3(){
  background(0);
  image(bg,0,0,width,height);
  frameRate(9);

  // if the snake touches the food
  if(s.eat(f)){
    hitFood.play();
    newFoodPos();
  }
  s.end();
  s.update();
  s.display();

  fill(255,0,0);
  rect(f.x,f.y,size,size);

  // display score
  fill(0);
  textSize(15);
  textFont(myFont);
  text("Score: "+s.len,15,20);

}

function gameEnd(){
  background(0);
  text("game end",15,15);
}


function snake(){
  this.x=0;
  this.y=0;
  this.xSpeed=1;
  this.ySpeed=0;
  this.len=0;
  this.tail=[];

  this.direction=function(x,y){
    this.xSpeed=x;
    this.ySpeed=y;
  }

  this.update=function(){
    if(this.len==this.tail.length){
      for(let i=0;i<this.len-1;i++){
        this.tail[i]=this.tail[i+1];
      }
    }
    this.tail[this.len-1]=createVector(this.x,this.y);
    // make the new position for the snake to move
    this.tail[this.len-1]=createVector(this.x,this.y);

    this.x=this.x+this.xSpeed*size;
    this.y=this.y+this.ySpeed*size;

    this.x=constrain(this.x,0,width-size);
    this.y=constrain(this.y,0,height-size);
  }

  this.display=function(){
    fill(255);
    for(let i=0;i<this.tail.length;i++){
      rect(this.tail[i].x,this.tail[i].y,size,size);
    }
    rect(this.x,this.y,size,size);
  }

  this.eat=function(pos){
    let d=dist(this.x,this.y,pos.x,pos.y);
    if(d<1){
      this.len+=1;
      return true;
    }
    else{
      return false;
    }
  }

  this.end=function(){
    for(let i=0;i<this.tail.length;i++){
      let pos=this.tail[i];
      let d=dist(this.x,this.y,pos.x,pos.y);
      if(d<1){
        // console.log("ded");
        this.len=0;
        this.tail=[];
      }
    }
  }
}

function keyPressed(){
  if(keyIsDown(87)){
    s.direction(0,-1);
  }
  else if(keyIsDown(83)){
    s.direction(0,1);
  }
  else if(keyIsDown(65)){
    s.direction(-1,0);
  }
  else if(keyIsDown(68)){
    s.direction(1,0);
  }
}

function newFoodPos(){
  let col=floor(width/size);
  let row=floor(height/size);
  f=createVector(floor(random(col)),floor(random(row)));
  f.mult(size);
}

function mousePressed(){
  if(state==0){
    if(mouseX>=200 && mouseX<=240 && mouseY>=380 && mouseY<=420){
      state=1;
    }
    else if(mouseX>=280 && mouseX<=320 && mouseY>=380 && mouseY<=420){
      state=2;
    }
    else if(mouseX>=360 && mouseX<=400 && mouseY>=380 && mouseY<=420){
      state=3;
    }
  }
  else{
    state=0;
  }

}
