// ball position
let xPos=250;
let yPos=250;

// ball speed
let xSpeed=0;
let ySpeed=0;

// ball size
let ballSize=10;

// paddle
let paddleX=200;
let paddleY=490;

// count bounce
let bounceCount=0;
let hitCount=0;

// ufo position
let ufoX=600;
let ufoY=600;

// ufo size
let ufoSize=50;

// color variables
let r,g,b=255;

// sound variables
let ballBounce;
let over;
let ufo_hit;

// image variable
let ufo;

// background variables
let bg1,bg2;
let bgspeed=1.0;
let bg1Y=0;
let bg2Y=-1000;



function preload(){
  ufo=loadImage("assets/ufo.png");
  bg1=loadImage("assets/starfield.png");
  bg2=loadImage("assets/starfield.png");
  ballBounce=loadSound("assets/space_bounce.wav");
  over=loadSound("assets/game_over.wav");
  ufo_hit=loadSound("assets/ship_caught.wav");
}

function setup(){
  createCanvas(500,500);
  noStroke();
}

function draw(){
  background(0);
  // background
  imageMode(CORNER);
  image(bg1,0,bg1Y);
  image(bg2,0,bg2Y);

  bg1Y+=bgspeed;
  bg2Y+=bgspeed;

  if(bg1Y>=1000){
    bg1Y=-1000;
  }
  if(bg2Y>=1000){
    bg2Y=-1000;
  }

  // visual border
  fill(128);
  rect(0,0,width,10);
  rect(0,0,10,height);
  rect(width-10,0,10,height);

  // draw paddle
  fill(255);
  rect(paddleX,paddleY,100,10);

  // paddle key control
  if(keyIsDown(65)){
    paddleX-=3;
  }
  if(keyIsDown(68)){
    paddleX+=3;
  }

  if(paddleX<10){
    paddleX=10;
  }

  if(paddleX>390){
    paddleX=390;
  }

  // display ufo
  imageMode(CENTER);
  image(ufo,ufoX,ufoY);

  // draw the ball
  r-=10;
  fill(r,g,b);
  circle(xPos,yPos,ballSize*2);

  // move the ball
  xPos+=xSpeed;
  yPos+=ySpeed;

  // check if the ball hit the edge
  if(xPos+ballSize>=width-10 || xPos-ballSize<=10){
    xSpeed*=-1;
    ballBounce.play();
    bounceCount+=1;
    r=random(255);
    g=random(255);
    b=random(255);
  }

  if(yPos-ballSize<=10){
    ySpeed*=-1;
    ballBounce.play();
    bounceCount+=1;
    r=random(255);
    g=random(255);
    b=random(255);
  }

  // check if the ball hit the paddle
  if(xPos>=paddleX && xPos<=(paddleX+100) && yPos+ballSize>=paddleY){
    yPos=paddleY-ballSize;
    ballBounce.play();
    ySpeed*=-1;
    bounceCount+=1;

    xSpeed=map(xPos,paddleX,paddleX+100,-3,3);
    xSpeed=constrain(xSpeed*1.05,-3,3);
    ySpeed=constrain(ySpeed*1.05,-3,3);

  }

  // check if the ball hit the ufo
  if(dist(ufoX,ufoY,xPos,yPos)<ballSize+ufoSize){
    ufo_hit.play();
    while(dist(ufoX,ufoY,xPos,yPos)<ballSize+ufoSize){
      ufoX=random(70,420);
      ufoY=random(70,420);
    }
    hitCount+=1;
  }

  // game over
  if(yPos-ballSize>=height){
    over.play();
    xSpeed=0;
    ySpeed=0;
    xPos=250;
    yPos=250;
    ufoX=600;
    ufoY=600;
    hitCount=0;
    bounceCount=0;
  }

  // display score info
  fill(255);
  text('Bounces: '+bounceCount+' Hits: '+hitCount,15,15);

}

function mousePressed(){
  if(xSpeed==0&&ySpeed==0){
    xSpeed=Math.random()*3+1;
    ySpeed=Math.random()*3+1;
    ufoX=random(70,420);
    ufoY=random(70,420);
  }
}
