// video capture object
let capture;

// our ml5 detector
let poseNet;

// an array of poses that get detected (human body features & their locations)
let poses = [];

// flag indicating that the model is ready to go
let readyToGo = false;

// images
let fries, hams, mouth, bg;

let friesArr=[];
let hamsArr=[];

let mouthX,mouthY;

let score=0;

function preload(){
  fries=loadImage("images/fries.gif");
  hams=loadImage("images/ham.gif");
  mouth=loadImage("images/1.png");
  bg=loadImage("images/bg.jpeg");
}

function setup(){
  let cnv = createCanvas(800,600);
  cnv.parent("#canvas_container");
  cnv.style("display","block");
  cnv.style("margin","auto");

  capture = createCapture(VIDEO);
  capture.size(width, height);

  poseNet = ml5.poseNet(capture, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  for (let i = 0; i < 5; i++) {
    friesArr.push(new Fries());
  }

  for(let i=0;i<3;i++){
    hamsArr.push(new Hams());
  }

  capture.hide();
}

function modelReady() {
  console.log("Poses ready!");
  readyToGo = true;
}

function draw(){
  background(0);
  if(readyToGo){
     imageMode(CORNER);
     image(capture, 0, 0, width, height);
     image(bg,0,0,800,600);
     textSize(15);
     text("Score: "+score,40,20);

     // figure out where the user's nose is
      if (poses.length > 0 && poses[0].pose.nose){
        let noseX = poses[0].pose.nose.x;
        let noseY = poses[0].pose.nose.y;
        mouthX=800-noseX;
        mouthY=noseY;
        imageMode(CENTER);
        image(mouth,mouthX, mouthY, 140, 140);
      }

      for(let i=0;i<5;i++){
        friesArr[i].randomPosition();
        friesArr[i].ateFries();
        friesArr[i].display();
      }

      for(let i=0;i<3;i++){
        hamsArr[i].randomPosition();
        hamsArr[i].ateHams();
        hamsArr[i].display();
      }
  }
  else{
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text("Model Loading", width/2, height/2);
  }
}

// debug: click the mouse to see all poseNet properties
function mousePressed() {
  // iterate over all pose properties and give us a readout of where these features can be found
  if (poses.length > 0) {
    for (let property in poses[0].pose) {
      if (poses[0].pose[property].x) {
        console.log(`${property} ${poses[0].pose[property].x} ${poses[0].pose[property].y}`)
      }
    }
  }
}

function Fries(){
  this.x=random(50, width-50);
  this.y=random(50, height-50);
  this.img=fries;
  this.ate=0;

  this.display=function(){
  imageMode(CENTER);
  image(this.img,this.x,this.y,100,100);
  }

  this.randomPosition=function(){
    if(frameCount%120==0){
      this.x=random(50, width-50);
      this.y=random(50, height-50);
    }
  }

  this.ateFries=function(){
    if(dist(mouthX,mouthY,this.x,this.y)<20){
      this.x=-200;
      this.y=-200;
      this.ate=1;
    }
    if(this.ate==1){
      score+=1;
      this.ate=0;
    }
  }
}

function Hams(){
  this.x=random(50, width-50);
  this.y=random(50, height-50);
  this.img=hams;
  this.ate=0;

  this.display=function(){
  imageMode(CENTER);
  image(this.img,this.x,this.y,100,100);
  }

  this.randomPosition=function(){
    if(frameCount%120==0){
      this.x=random(50, width-50);
      this.y=random(50, height-50);
    }
  }

  this.ateHams=function(){
    if(dist(mouthX,mouthY,this.x,this.y)<20){
      this.x=-200;
      this.y=-200;
      this.ate=1;
    }
    if(this.ate==1){
      score-=1;
      this.ate=0;
    }
  }
}
