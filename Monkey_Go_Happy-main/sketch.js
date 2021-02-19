var backImage, backgr;
var player, player_running;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gamestate = PLAY;
var score = 0;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  fruitGroup = new Group();
  rockGroup = new Group();
}

function draw() {
  background(0);
  textSize(25);
  fill("white");
  stroke("white")
  text("score : " + score, 550, 50);
  if (gamestate === PLAY) {
    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if(fruitGroup.isTouching(player)){
      score = score + 2
      fruitGroup.destroyEach();
      player.scale = player.scale + 0.05
    }
    
    if (keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);
    spawnFood();
  spawnObstacles();
  if(rockGroup.isTouching(player)){
    gamestate = END
  }
  }
  
  if(gamestate === END){
    backgr.velocity = 0
    backgr.visible = false;
    player.visible = false;
    fruitGroup.destroyEach();
    rockGroup.destroyEach();
    fill("red")
    textSize(50)
    text("GAME OVER", 300, 220)
  }
  drawSprites();
}
function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.lifetime = 200;
    player.depth = banana.depth + 1;
    fruitGroup.add(banana);
  }
}
function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var rock = createSprite(800, 350, 10, 40);
    rock.velocityX = -(4 + score / 100);
    rock.addImage(rockImg);
    rock.scale = 0.2;
    rock.lifetime = 200;
    rockGroup.add(rock);
  }
}
