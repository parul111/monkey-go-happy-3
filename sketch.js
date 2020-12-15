var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,background1

function preload(){
  
  
monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,400);
  background1=createSprite(0,0,600,400);
  background1.addImage(backgroundImage);
  monkey=createSprite(50,160,20,50);
  monkey.addAnimation("moving",monkey_running);
  
  monkey.scale=0.2;
  
  ground = createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible= false;
  
  obstaclesGroup=new Group();
  foodGroup=new Group();
    score=0;

}
  function spanObstacles(){
 if (frameCount % 360 === 0){
   var obstacle = createSprite(600,300,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage(obstacleImage);
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
  }





function draw() {
 
  background1.velocityX=-3;
  
  if(background1.x<0) {
    background1.x=background1.width/2;
  }
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  monkey.collide(ground);
  
  
  if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY+=0.8;
  }
  if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityX=0;
    ground.velocityX=0;
    gameState=END;
  }

  drawSprites();
  //displaying score
  text("Score: "+ score, 500,50);
  
  spanObstacles();
}

