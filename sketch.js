const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint

var Sprites = []

var Polygon

var TriangleImage

var Slingshot

function preLoad()
{
  TriangleImage = loadImage("Triangle.png")
}

function setup() {
  createCanvas(1500,700);
  //createSprite(400, 200, 50, 50);


  engine = Engine.create();
  world = engine.world;
  

  //MakeRow(330, 5, 235)
  //MakeRow(360, 3, 195)
  //MakeRow(390, 1, 155)

  console.log(TriangleImage)
  Polygon = new ImageSprite(200,200,20,20, TriangleImage)

  Ground1 = new Ground(320,600,600,10)
  Ground2 = new Ground(650, 400,300,10)
  Ground3 = new Ground(640, 520, 200,10)
  Ground4 = new Ground(1110, 520, 400, 10)

  BaeeGround = new Ground(width/2, 700, width, 20)

  MakePyramid(50 ,580,19, 6)
  MakePyramid(560,380,7,2)
  MakePyramid(610,500, 3,2)
  MakePyramid(965, 500, 11, 2)

  Slingshot = new SlingShot(Polygon.body, {x: 200, y:200})

  Engine.run(engine)

}

function draw() {
  Engine.update(engine)
  background(255,255,255); 
  UpdateAllSprites();
  drawSprites();
}

function UpdateAllSprites()
{
for (var i = 0; i < Sprites.length; i++)
  {
	  Sprites[i].Update()
  }
}

function MakeRow(StartingX,BlocksInRow, FixedY, BlockWidth, BlockHeight)
{
  if (BlockWidth === undefined)
    BlockWidth = 30

  if (BlockHeight === undefined)
    BlockHeight = 40


  for (var i = 0; i < BlocksInRow; i++)
  {
    new Box(StartingX + i * BlockWidth, FixedY , BlockWidth, BlockHeight)
  }
}

function MakePyramid(StartingX, StartingY, AmountOfBlocksStarting,BlocksToSubtractEachRow,AmountOfRows,BlockWidth, BlockHeight)
{
  var BlocksToMake = AmountOfBlocksStarting

  if (AmountOfRows === undefined)
  {
    var RowCounter = 0

    for (var i = AmountOfBlocksStarting; i > 0; i = i - BlocksToSubtractEachRow)
    {
      RowCounter = RowCounter + 1
      AmountOfRows = RowCounter
    }
    console.log(RowCounter) 
  }

  if (BlockWidth === undefined)
    BlockWidth = 30

  if (BlockHeight === undefined)
    BlockHeight = 40

  for (var i = 0; i < AmountOfRows; i ++)
  {
    MakeRow(StartingX + ((BlocksToSubtractEachRow/2) * i * BlockWidth), BlocksToMake, StartingY - (i * BlockHeight), BlockWidth, BlockHeight)
    BlocksToMake = BlocksToMake - BlocksToSubtractEachRow
  }
}

function mouseDragged()
{
    Matter.Body.setPosition(Polygon.body, {x: mouseX, y: mouseY})
}

function mouseReleased()
{
    Slingshot.fly();
}

function keyPressed()
{
  Body.setPosition(Polygon.body, {x:200, y:200})
  if (keyCode === 32)
  {
    Slingshot.attach(Polygon.body)
  }
}