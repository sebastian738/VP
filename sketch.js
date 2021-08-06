//Create variables here
var dog,dogimg,happydogimg;
var foodStock, foodS;
var database;
var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  happydogimg = loadImage("happy dog.png");
  dogimg= loadImage("Dog.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  dog = createSprite(700,300);
  dog.addImage("dog",dogimg);
  dog.scale =0.5;
  
  feed=createButton("Feed the dog"); 
  feed.position(350,95); 
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(450,95); 
  addFood.mousePressed(addFoods);   
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
   
  foodObj = new Food();
}
function draw() {  
  background(46,139,87);
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("black");
  textSize(30);
 
  text("Food Available:" + foodS,200,500);
  
  //add styles here
  
  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>12){ 
   
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }
  else if(lastFed%12 == 0){ 
    text("Last Feed : 12 PM",350,30); 
  }
  else if(lastFed==0){ 

    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 

  drawSprites();
}


//function to update food stock and last fed time 
function feedDog(){ 
  dog.addImage("dog",happydogimg); 
  var food_stock_val = foodObj.getFoodStock()
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
} 
//function to add food in story' 
function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 

} 
function readStock(data)
{ foodS=data.val();
   foodObj.updateFoodStock(foodS);
   }



