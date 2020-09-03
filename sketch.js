var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trexRunning, trexCollided;
var ground, groundImage, invisibleGround;
var CloudsGroup, cloudsImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var count;
var gameOver, restart, gameoverImage, restartImage;




function preload(){
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png") 
trexCollided = loadImage("trex_collided.png")
groundImage = loadImage ("ground2.png")
cloudsImage = loadImage ("cloud.png")
obstacle1 = loadImage ("obstacle1.png") 
obstacle2 = loadImage ("obstacle2.png") 
obstacle3 = loadImage ("obstacle3.png") 
obstacle4 = loadImage ("obstacle4.png") 
obstacle5 = loadImage ("obstacle5.png") 
obstacle6 = loadImage ("obstacle6.png") 
gameoverImage = loadImage("gameOver.png") 
restartImage = loadImage("restart.png")  
  
}








function setup() {
  createCanvas(600, 200);
  trex = createSprite (40, 170, 30, 40)
  trex.addAnimation ("running", trexRunning)
  trex.addAnimation ("dying", trexCollided)
  trex.scale = 0.5;
  ground = createSprite (200, 180, 600, 20)
  ground.addImage ("ground", groundImage)
  ground.x = ground.width/2
  ground.velocityX = -6;
  invisibleGround = createSprite (200, 190, 600, 20)
  invisibleGround.visible = false;
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  count = 0;
  trex.setCollider("circle",0,0,30); 
  gameOver = createSprite (270,90, 40, 30)
  gameOver.addImage("go", gameoverImage)
  gameOver.scale = 0.5;
  restart = createSprite (270,120,40,30)
  restart.addImage("re", restartImage)
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(180);
   
  text("Score: "+ count, 250, 100);
  
  if(gameState === PLAY){
  count = count + Math.round(getFrameRate()/60);
  
  trex.collide(invisibleGround);
  
  if (keyDown("space")){
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
 }
  
  
  spawnClouds();
  spawnObstacles();
    
  if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
  }  
  }
  
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("dying", trexCollided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - 6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage("obs1", obstacle1) ;
       break; 
       case 2:obstacle.addImage("obs2", obstacle2) ;
       break; 
       case 3:obstacle.addImage("obs3", obstacle3) ;
       break; 
       case 4:obstacle.addImage("obs4", obstacle4) ;
       break; 
       case 5:obstacle.addImage("obs5", obstacle5) ;
       break; 
       case 6:obstacle.addImage("obs6", obstacle6) ;
       break; 
       default:break;
    
    
    
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =Math.round(random(80,120));
    cloud.addImage("cloud", cloudsImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  }
  function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("running", trexRunning);
  count = 0;
}
  
