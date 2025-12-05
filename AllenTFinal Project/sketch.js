var Image1,Image2,Image3,Image4, motionBlur;
var sliderGlow,sliderInt;
var myImage = [];
var pic;
var currentImage;
var checkboxMotion;
var bloom;
var bright, brightSlider,checkboxBright,checkboxText;
var myX=[], myY=[];
var arrNum = 210;
var font;
var checkDustParticales;
var radious;
var text1;


function preload()
{
	  myImage[0] = loadImage("Images/Image1 - Copy.png");
	  myImage[1] = loadImage("Images/Image2 - Copy.png");
	  myImage[2] = loadImage("Images/Image3 - Copy.png");
	  myImage[3] = loadImage("Images/Image4 - Copy.png");
	  font = loadFont('assets/gist-light/GistLight.otf');
	  text1 = "YOU'R DATA WAS STOLEN!!!";
}
function setup() {
  createCanvas(800, 850, WEBGL); // Use WEBGL mode to use shaders
  motionBlur = createFilterShader(fip.motionBlur); // Load the motion blur shader
  bright = createFilterShader(fip.brightness);
  bloom = createFilterShader(fip.bloom);
  currentImage = random(myImage);
  button = createButton('Add Glow With Slider');
  sliderGlow = createSlider(0,10,0);
  button = createButton('Add Intensity With Slider');
  sliderInt = createSlider(0,5,0);
  button = createButton('New Image');
  checkboxMotion = createCheckbox("Add Motion Blur");
  button.mousePressed(randomImage);
  checkboxBright = createCheckbox("Add brightness: Then use slider");
  brightSlider = createSlider(0.0,25.0,0);
  checkDustParticales = createCheckbox("Create Dust Particales");
  checkboxText = createCheckbox("DON'T CLICK ME");
  randomX_Y();
}
function draw() {
  background(211,211,211); 
  translate(-width / 2, -height / 2);//This translate shifts things back to 0,0 needed for top lef drawing

  image(currentImage, 0, 0,width);
  fill('deeppink');
  textFont(font);
  textSize(20);
  text("Frame Rate:" + frameRate(),10,50);
  text(`Mouse x: ${mouseX} Mouse y: ${mouseY}`, 10, 80);
 

     if (checkboxMotion.checked()) 
	{
	// Apply the shader
    filter(motionBlur);
   }
   if(checkboxBright.checked())
   {
	bright.setUniform("brightness", brightSlider.value());
	filter(bright);
   }
   bloom.setUniform("intensity",sliderInt.value());
   bloom.setUniform("glow",sliderGlow.value());
   // Apply the blend shader
      filter(bloom);
	  
 //DrawCircle function
  if(checkDustParticales.checked() == true){
		   drawCircle();
  }
  
  if(checkboxText.checked())
  {
	   fill('RED');
	   strokeWeight(4);
	   textSize(45);
	   text(text1,10,height / 2);
  }
}  


// Set the button's value to a random image.
function randomImage() {
	currentImage = random(myImage);
}

function mousePressed() 
{
      currentImage = random(images);
}
function randomX_Y()
{
	radious = random(1,5.6);
  for(var i = 0; i < arrNum; i++)
      {
        var x = random(width);
        var y = random(height);
        myX.push(x);
        myY.push(y);
      }
  console.log('My X values',myX);
  console.log('My Y values',myY);
}
function drawCircle(){
  noStroke();
  fill(211,211,211,100);
  for(var w = 0; w < arrNum; w++){
    circle(myX[w], myY[w], radious);
  }
}
