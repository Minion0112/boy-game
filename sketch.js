var PLAY = 1;
var END = 0;
var level;
var gameState = PLAY;
var left

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacle7;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("Boy1.jpg","Boy2.jpg","Boy3.jpg");
  trex_collided = loadAnimation("Boycollided.jpg");
  trex_jump = loadAnimation("Boyjump.jpg","Boyjump.jpg");
  trex_slide = loadAnimation("boyslide.jpg","boyslide.jpg","boyslide.jpg","boyslide.jpg");
  groundImage = loadImage("road.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  obstacle7 = loadImage("object7.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("jump",trex_jump);
  trex.addAnimation("slide",trex_slide);

  trex.scale = 0.2;
  
  ground = createSprite(100,180,0,20);
  ground.addImage("ground",groundImage);
  ground.scale=1; 
 //ground.x = ground.width/4;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  level = 0;
  left=createSprite(20,50,10,10);
  }

function draw() {
  //trex.debug = true;
if(score%1000===0 && score>0){
text("Congrats You just completed level 1 ",300,300); 

}
if(score%2000===0 && score>0){
text("Congrats You just completed level 2 ",300,300); 

}
if(score%3000===0 && score>0){
text("Congrats You just completed level 3 ",300,300); 

}
if(score%4000===0 && score>0){
text("Congrats You just completed level 4 ",300,300); 

}
if(score%5000===0 && score>0){
text("Congrats You just completed level 5 ",300,300); 

}
if(score%6000===0 && score>0){
text("Congrats You just completed level 6 ",300,300); 

}
if(score%7000===0 && score>0){
text("Congrats You just completed level 7 ",300,300); 

}
if(score%8000===0 && score>0){
text("Congrats You just completed level 8 ",300,300); 

}
if(score%9000===0 && score>0){
text("Congrats You just completed level 9 ",300,300); 

}
if(score%10000===0 && score>0){
text("Congrats You won the game ",300,300); 
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
     restart.visible=true;
	 
	 if(mousePressedOver(restart) ) {
      reset();
    }
restart.visible=true;
}

  trex.depth=trex.depth+1
  background("white");
  	 text("Score: "+ score, 500,50);
  text("level : "+level,500,70);
	
	
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
	
	
	
	if(invisibleGround.isTouching(trex)){
	trex.changeAnimation("running")
	  
	 }
	 
    if(keyDown("space") && trex.y >= 149) {
       trex.changeAnimation("running")
        trex.velocityY = -15;
    }
	if(mousePressedOver(left)){
	trex.velocityY=-15;
   } 

	
	if(invisibleGround.isTouching(trex) && keyDown("down_arrow")){
		trex.changeAnimation("slide")
	}
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 150){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart) ) {
      reset();
    }
  }
  
  
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.setCollider("rectangle",0,-100,);
  // obstacle.debug=true;
   
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
	  case 7: obstacle.addImage(obstacle7);
	          obstacle.setCollider("rectangle",0,-400,100,1000); 
			  obstacle.y= 125;
              break;	  
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  level = 0
  
}