// set up font variable
let myFont;
function preload(){
  myFont=loadFont("font/Courgette-Regular.ttf");
}

function setup() {
  // set the background size of our canvas
  createCanvas(500, 500);
  // background color
  background(149, 219, 245,200);
  strokeWeight(2);

  // feet
  fill(204,70,104);
  // left
  push();
  translate(145,328);
  rotate(radians(-35));
  ellipse(0,0,140,100);
  pop();
  // right
  push();
  translate(330,328);
  rotate(radians(35));
  ellipse(0,0,140,100);
  pop();

  // hand
  fill(255,182,193);

  // left
  push();
  translate(115,110);
  rotate(radians(67));
  ellipse(0,0,140,105);
  pop();

  // right
  push();
  translate(380,220);
  rotate(radians(35));
  ellipse(0,0,140,105);
  pop();


  // face
  // strokeWeight(2);
  fill(255,182,193);
  ellipse(240,200,300,300);

  //eyes
  fill(0,200);
  ellipse(205,150,30,80);
  ellipse(275,150,30,80);

  // inside eyes
  noStroke();
  fill(255);
  ellipse(205,130,15,30);
  ellipse(275,130,15,30);

  // bottom eyes
  fill(46,65,210,160);
  ellipse(205,175,20,30);
  ellipse(275,175,20,30);


  // blush
  noStroke();
  fill(204,70,104,100);
  ellipse(160,190,40,25);
  ellipse(320,190,40,25);

  // mouth
  // outer
  fill(169, 44,60,200);
  push();
  translate(240,230);
  rotate(radians(-22));
  arc(0,0, 50, 50, 0, PI + QUARTER_PI, CHORD);
  pop();

  // inner
  fill(246, 157, 153,90)
  push();
  translate(240,238);
  arc(0,0,46,35,0,PI);
  pop();

  // bottom text
  textFont(myFont);
  fill(255,182,193);
  textSize(70);
  text("KIRBY",285,490);

  // decorations
  fill(255);
  // bottom star
  circle(55,420,20);
  // up triangle
  triangle(45,420,55,390,65,418);
  // right triangle
  triangle(60,412,85,420,60,428);
  // bottom triangle
  triangle(65,420,55,450,45,418);
  // left triangle
  triangle(62,410,55,430,25,420);

  // top star
  circle(420,55,20);
  // up triangle
  triangle(410,55,420,25,430,53);
  // right triangle
  triangle(425,47,450,55,425,63);
  // bottom triangle
  triangle(430,55,420,85,410,53);
  // left triangle
  triangle(427,45,420,65,390,55);


}
