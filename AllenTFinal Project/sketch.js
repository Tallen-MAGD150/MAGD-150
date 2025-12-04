var Image1,Image2,Image3,Image4, motionBlur;
var sliderGlow,sliderInt;
var myImage = [];
var pic;
var currentImage;
var checkboxMotion;
var bloom;
var bright, brightSlider,checkboxBright;

function preload()
{
	  myImage[0] = loadImage("Images/Image1 - Copy.png");
	  myImage[1] = loadImage("Images/Image2 - Copy.png");
	  myImage[2] = loadImage("Images/Image3 - Copy.png");
	  myImage[3] = loadImage("Images/Image4 - Copy.png");
	  //loadFont("/");
}
function setup() {
  createCanvas(600, 650, WEBGL); // Use WEBGL mode to use shaders
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
  //textSize(100);
  //text('hioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', 50, 50);
}
  
function draw() {
  background(2555); 
 imageMode(CENTER);
 image(currentImage, 0, 0);
     if (checkboxMotion.checked()) 
	{
	// Apply the shader
    filter(motionBlur);
   }
   
   if(checkboxBright.checked())
   {
	      //
	bright.setUniform("brightness", brightSlider.value());
	filter(bright);
   }
   bloom.setUniform("intensity",sliderInt.value());
   bloom.setUniform("glow",sliderGlow.value());
   

   // Apply the blend shader
      filter(bloom);
   
   


   

}  


// Set the button's value to a random color.
function randomImage() {
	currentImage = random(myImage);
    pic = currentImage;

	//pic = random(myImage[0]);
	button.value(pic);
}

function mousePressed() 
{
      currentImage = random(images);
}