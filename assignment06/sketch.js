let world;
let decos=[];
let particles = [];
let bgmusic;

function preload(){
  bgmusic=loadSound("assets/bgmusic.mp3");

}

function setup(){
  let canvasName=createCanvas(400,300).id();
  world=new World('VRScene');
  world.camera.cameraEl.removeAttribute('wasd-controls');

  // background color
  world.setBackground(11,108,163);
  world.setFlying(false);

  // set user position
  world.setUserPosition(-9.5,5,10);
  let sky=new Sky({
    asset:'sky'
  })
  world.add(sky);

  // create floor
  let floor=new Plane({
    x:0,
    y:0,
    z:0,
    width:100,
    height:100,
    rotationX:-90,
    asset:'ground',
    repeatX:100,
    repeatY:100
  })
  world.add(floor);

  // create container for the house
  container=new Container3D({x:0,y:0.1,z:0});
  world.add(container);

  let room=new Plane({
    x:0,
    y:0,
    z:0,
    width:31,
    height:31,
    rotationX:-90,
    asset:'floor',
    repeatX:32,
    repeatY:32
  })
  container.addChild(room);


  for (let i = 0; i < 100; i++) {

   let temp = new Box({
     x: random(-50, 50),
     y: 0,
     z: random(-50, 50),
     red: random(255),
     green: random(255),
     blue: random(255),
     width: 1,
     height: random(0.5, 5),
     depth: 1,
       clickFunction: function(theBox) {

     // update this cube's color to random
     theBox.setColor( random(255), random(255), random(255) );
    }
   });
   // world.add( temp );
   container.addChild(temp);
 }

 for(var i = 0; i <50; i++){
   var temp = new Deco(random(-50,50),random(20,50),random(-50,50));
   decos.push(temp);

 }

   let octahedron = new Octahedron({
     x: 5, y: 5, z: -5,
     radius: 1,
     side: 'double',
     asset: canvasName,
     dynamicTexture: true,
     dynamicTextureWidth: 512,
     dynamicTextureHeight: 512
   });
   world.add(octahedron);

   let ring = new Ring({
     x:0,
     y:2,
     z:-2,
     radiusInner: 0.5,
     radiusOuter: 1,
     red:random(255),
     green:random(255),
     blue:random(255)
  });

// add the ring to the world
world.add(ring);


}

function draw(){

  // always create a new particle
  var temp = new Particle(0, 0, -5);

  // add to array
  particles.push( temp );

  // draw all particles
  for (var i = 0; i < particles.length; i++) {
    var result = particles[i].move();
    if (result == "gone") {
      particles.splice(i, 1);
      i-=1;
    }
  }


}

class Deco{
  constructor(x,y,z){
    this.d = new TorusKnot({
      x:x,y:y,z:z,
      red: random(255), green:random(255), blue:random(255),
      clickFunction: function(theBox) {
								// update color
								theBox.setColor( random(255), random(255), random(255) );

								// teleport the user here immediately
								world.teleportToObject( theBox );
                bgmusic.play();
							}
    });
    world.add(this.d);
  }

}

class Particle {

	constructor(x,y,z) {

		this.myBox = new Sphere({
								x:x, y:y, z:z,
								red: random(255), green:random(255), blue:random(255),
								radius: 0.5
		});

		world.add(this.myBox);

		// keep track of an offset in Perlin noise space
		this.xOffset = random(1000,3000);
		this.zOffset = random(2000, 3000);
	}

	// function to move the box
	move() {
		var yMovement = 0.01;

		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		this.xOffset += 0.01;
		this.yOffset += 0.01;

		this.myBox.nudge(xMovement, yMovement, zMovement);

		var boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);

		if (boxScale.x <= 0) {
			// remove the box from the world
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
	}
}
