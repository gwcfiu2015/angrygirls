var WINDOW_HEIGHT = 600;
var WINDOW_WIDTH = 800;
angleMode = "degrees";
var building; 
var frontLayer; 
var middleLayer;
var backLayer;
var shoe;
var girl;
var boy;
var showShoe = false;
var shoeThrown = false;
var attackingBoy = true;
var score = 0;
var lives = 3;
var openSlideshow = false;
var m2;

PImage image2;
image2 = loadImage("level1intro.png");
PImage image3;
image3 = loadImage("defeatedcat.png");
PImage image4;
image4 = loadImage("level2intro.png");


document.onkeydown = function checkKey(e) {
    e = e || window.event;

    if (e.keyCode.toString() === "32") { //if spacebar pressed
        showShoe = true;
        shoeThrown = true;
    }
};

var throwShoe = function ()
{
    if (shoe.x_pos < WINDOW_WIDTH && shoe.x_pos + shoe.width < boy.x_pos)
    {
        shoe.drawShoe();
        shoe.moveShoe();
        
        
    }
    else
    {
        attackingBoy = false;
        showShoe = false;
        shoeThrown = false;
        boy.setBoyPosition();
        attackingBoy = true;
    }
};

var boyAttack = function()
{
    if (boy.x_pos > girl.x_pos + girl.width && boy.x_pos > shoe.x_pos + shoe.width)
    {
        boy.drawBoy();
        boy.moveBoy();
    }
    
    else
    {
        attackingBoy = false;
        boy.setBoyPosition();
        showShoe = false;
        attackingBoy = true;
    }
};

var setScore = function()
{
    textAlign(RIGHT, CENTER);
    text("SCORE", 780, 50);
    text("LIVES", 780, 70); 
    fill(255, 255, 255);
    textSize(20);
    
    text(score, 780, 50);
    text(lives, 780, 70);
    
    if (boy.x_pos <= shoe.x_pos + shoe.width + 3) //three is a magic number
    {
      score += 1;   
    }
    
    if(boy.x_pos <= girl.x_pos + girl.width + shoe.width)
    {
        score -= 2;
        lives -= 1;
    }
    
    if (lives == 0)
    {
        alert("GAME OVER");
        score = 0;
        lives = 3;
    }
    
    if (score == 3)
    {
        openSlideshow = true;
        m = millis();
        m2 = m;
    }
      
};


void setup()
{
    /*@pjs preload="frontpage.png","heels.png", "angrygirlrunning1.png", "angrygirlrunning2.png", "runningboy1.png", "runningboy2.png", "nextlevelpage.png";*/
    size(800,600); 
    background(75, 3, 61);
    fill(255);
    PImage image1;
    image1 = loadImage("frontpage.png");
    image(image1, 0 , 0);
    
    PFont fontA = loadFont("courier");
    textFont(fontA, 14);  
    
    middleLayer = new Layer(1.5, 400, color(239, 138, 219));
    backLayer = new Layer(0.5, 600, color(187, 49, 160));
    wall = new Wall(0, 540, 800, 60, color (0, 0, 0));
    girl = new Girl(435, 60, 60, color(162, 3, 3));
    shoe = new Shoe(480, 40, 30, color(89, 3, 162));
    boy = new Boy(452, 40, 70, color(87, 214, 219));

}

void draw(){  
    var m = millis();
if (!openSlideshow) {
    if (m>7000 && m<=16000) 
    {
        image(image2, 0, 0);
    }
    if (m>15000) {
        background(75, 3, 61);
        backLayer.drawLayer();
            backLayer.moveLayer();
        middleLayer.drawLayer();
            middleLayer.moveLayer();
        wall.drawWall();
        girl.drawGirl();
        setScore();
        if (showShoe)
        {
            shoe.drawShoe();
        }
        else
        {
            showShoe = false;
            shoeThrown = false;
            shoe.setShoePosition();
        }
        if (shoeThrown)
        {
            throwShoe();
        }
        if (attackingBoy)
        {
            boyAttack();
        }
    }
}
        else {
//            alert("in open slideshow");
            //alert("in open slideshow");
            //m = 0;
            if (m <= m2+6000) 
            {
                image(image3,0,0);
            }
            

            else if (m > m2+6000 && m < m2 + 18000) 
            {
                image(image4,0,0);
                
            }
            
            else {
                var myWindow = window.open("AngryGirlsLevel2.html", "_self");
            }
            
        }
    
}
class Building
{
    var x_pos;
    var y_pos;
    var width;
    var height;
    var buildingColor;

    Building(var x, var y, var  w,var h,var inputColor)
    {
        x_pos = x;
        y_pos = y;
        width = w;
        height = h;
        buildingColor = inputColor;
    }

    void drawBuilding()
    {
        noStroke();
        fill(buildingColor);
        rect(x_pos, y_pos, width, height);
    }

    void move(var layerSpeed)
    {
        x_pos -= layerSpeed; 
    }
} 

class Layer
{
    var speed; 
    var maxHeight; 
    var skyline = new Array(); 
    var layerColor; 
    var layerWidth = 0;
    var currentX = 0;

    Layer(var s, var mh, var inputColor)
    {
        speed = s; 
        maxHeight = mh; 
        layerColor = inputColor; 
        fillLayer(); 
    }

    void fillLayer()
    {
        while(layerWidth < WINDOW_WIDTH) 
        {
            addBuilding(currentX);
        }

    }
    void addBuilding(var buildingX)
    {
        var buildingHeight = random(100, maxHeight); 
        var buildingWidth = random(10, 150); 
        var buildingY = WINDOW_HEIGHT - buildingHeight;
        var newBuilding = new Building(buildingX, buildingY, buildingWidth, buildingHeight, layerColor);
        skyline.push(newBuilding);
        layerWidth+= buildingWidth; 
        currentX += buildingWidth;
    }

    void drawLayer()
    {
        for(var i = 0; i < skyline.length; i++) 
        {
            skyline[i].drawBuilding(); 
        }
    }
    void moveLayer()
    {

        for(var j = 0; j < skyline.length; j++) 
        {
            skyline[j].move(speed);
        }

        layerWidth -= speed;
        currentX -= speed;
        fillLayer();
    }
}

class Wall
{
    var wallColor;
    var x_pos;
    var y_pos;
    var height;
    var width;


Wall(var x, var y, var  w,var h,var inputColor)
    {
        x_pos = x;
        y_pos = y;
        width = w;
        height = h;
        wallColor = inputColor;
    }

    void drawWall()
    {
        noStroke();
        fill(wallColor);
        rect(x_pos, y_pos, width, height);
    }
}

class Girl
{
    var x_pos;
    var y_pos;
    var height;
    var width;
    var girlColor;
    var flipped = true;
    var counter = 0;

           
    Girl(var y, var  w,var h,var inputColor)
    {
        x_pos = 100;
        y_pos = y;
        width = w;
        height = h;
        girlColor = inputColor;
    }

    void drawGirl()
    {
       PImage b;
        if (flipped)
        {
            if(counter == 8)
            {
                flipped = false;
                counter = 0;
            }
            counter += 1;
            b= loadImage("angrygirlrunning1.png");
        }
        else
        {
            if (counter == 8)
            {
                flipped = true;
                counter = 0;
            }
            counter += 1;
            b= loadImage("angrygirlrunning2.png");
        }
        image(b, x_pos, y_pos);
    }
}

class Shoe
{
    var x_pos;
    var y_pos;
    var height;
    var width;
    var shoeColor;
           
    Shoe(var y, var  w,var h,var inputColor)
    {
        x_pos = 160;
        y_pos = y;
        width = w;
        height = h;
        shoeColor = inputColor;
    }

    void drawShoe()
    {
        PImage b;
        b = loadImage("heels.png");
        image(b, x_pos, y_pos);
    }

    void setShoePosition()
    {
        x_pos = 160;
    }
    

    void moveShoe()
    {
        if (x_pos < WINDOW_WIDTH)
        {
            x_pos= x_pos += 2;
        }
    }
}

class Boy
{
    var x_pos;
    var y_pos;
    var height;
    var width;
    var boyColor;
    var flipped = true;
    var counter = 0;


    Boy(var y, var  w,var h,var inputColor)
    {
        x_pos = WINDOW_WIDTH;
        y_pos = y;
        width = w;
        height = h;
        boyColor = inputColor;
    }

    void drawBoy()
    {
        PImage b;
        if (flipped)
        {
            if(counter == 9)
            {
                flipped = false;
                counter = 0;
            }
            counter += 1;
            b= loadImage("runningboy1.png");
        }
        else
        {
            if (counter == 9)
            {
                flipped = true;
                counter = 0;
            }
            counter += 1;
            b= loadImage("runningboy2.png");
        }
        image(b, x_pos, y_pos);
    }

    void setBoyPosition()
    {
        x_pos = WINDOW_WIDTH;
    }

    void moveBoy()
    {
        if (x_pos > girl.x_pos + girl.width)
        {
            x_pos = x_pos -= 2;
        }
    }
}