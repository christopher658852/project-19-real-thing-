var ground,groundImg;
var rock,rockImg,rocksGroup,rock2,rock2Img,rock3,rock3Img;
var girl,girlImg;
var gameOverImg,restartImg, gameOver, restart;
var score=0;
var jumpSound, collidedSound;
var invisibleGround;


// gameStates
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
    groundImg= loadImage("garden.jpg");
    girlImg= loadImage("teenagerGirl.png");
    rockImg=loadImage("download2.png");
    gameOverImg=loadImage("gameOver.png");
    jumpSound=loadSound("jump.wav");
    rock2Img=loadImage("rock2.png");
    rock3Img=loadImage("rock3.jpg");
    collidedSound=loadSound("collided.wav")
   restartImg=loadImage("restart.png")
}

function setup() {
    
    createCanvas(400,280);
    ground = createSprite(400,160);
    ground.addImage(groundImg);
    
    girl = createSprite(70,250,120,120);
    girl.addImage(girlImg);
    girl.scale=0.4;

    rocksGroup=new Group();
}

function draw() {



    if(gameState===PLAY){

        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
        ground.velocityX=-4;

        if (ground.x < 12){
            ground.x = ground.width/2;
        }
        
        if(keyDown("SPACE") && girl.y  >= height-120) {
            jumpSound.play();
            girl.velocityY =-10;   
        }
        girl.velocityY+=0.8;
    
        invisibleGround = createSprite(width/2,height-15 ,width,1 );
        invisibleGround.visible =false;  
    
        girl.collide(invisibleGround);
        girl.setCollider('circle',0,0,90) 
        // girl.debug = true

        if(rocksGroup.isTouching(girl)){
            collidedSound.play();
            gameState = END;
        }
        spawnObstacles(); 
    }
    else if (gameState === END){
        gameOverImg.visible= true
        ground.velocityX = 0;
        girl.velocityY = 0;
        rocksGroup.setVelocityXEach(0); 
    }

    drawSprites();
    textSize(20);
    stroke("black"); 
    fill("white");
    text("Score: "+ score,250,70);
}
    

function spawnObstacles() {
    if(frameCount % 60 === 0) {
        var obstacle = createSprite(600,height-30,20,30);
        obstacle.setCollider('circle',0,0,100)
        // obstacle.debug = true

        obstacle.velocityX = -(6 + 3*score/100);

        //generate random obstacles
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: obstacle.addImage(rockImg);
                break;
            case 2: obstacle.addImage(rock2Img);
                break;
            case 3: obstacle.addImage(rock3Img)   
            default: 
                break;
        }

        //assign scale and lifetime to the obstacle           
        obstacle.scale = 0.3;
        obstacle.lifetime = -1;
        obstacle.depth = girl.depth;
        girl.depth +=1;
        //add each obstacle to the group
        rocksGroup.add(obstacle);
    }
}

