
// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
//var canvas = document.getElementById("myCanvas");

//var context = canvas.getContext("2d");
var  canvas, context, toggle;
var y= 220;
var x= 0;
var mid = 128;
var dirX = 1;
var dirY = 1;
var destX  ;
var destY ;
var i;
var state = 'right' ;
var inbounds='true';
var status = -1; // -1: stopped  , 0 In play	
var imageObj = new Image();	
var imageObj2 = new Image();
var background_obj= new Image();

var jump = 'rest';
var backg_x = 0;
var backg_y = 0;
var floating =false;
background_obj.src = "level_bounds.png";
imageObj.src = "spshipsprite-r.png";
imageObj2.src = "spshipsprite-l.png";

var state_image = imageObj2;
var shoot_state = false;
var death = false;

var degrees = 0;
var str;
var name;
//init();
var dir = 1;
var monster = {};
var origin = {};


// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
	//bulletReady = true;
};
bulletImage.src = "bullet.png";

var bullet = {
	speed: 10// movement in pixels per second
};




//function init() {

    canvas = document.createElement( 'canvas' );
    canvas.width = 568;
    canvas.height = 400;
    context = canvas.getContext( '2d' );
    context.font = "40pt Calibri";
    //context.fillStyle = "white";
	
	
	// align text horizontally center
	context.textAlign = "center";
	// align text vertically center
	context.textBaseline = "middle";	
	//context.font = "12pt Calibri"; 
	
	canvas.width = 8248;
	context.drawImage(background_obj, backg_x, backg_y);
 	imageData = context.getImageData(0,0,8248,400); //fnord
 	 	    
    //var x = document;
    canvas.width = 568;

   $( "#container" ).append( canvas );
//}
    animate();



function animate() {
    requestAnimFrame( animate );
    shoot();
    draw();
}
		// shoot addition


function draw() {

    context.fillText( state + ":" , canvas.width / 2 , canvas.height / 2 );

	$(document).keyup(function(e)
	{
		if (e.keyCode == 37)
		{
		//	state= "stop";
			dirX=1;
			 dir=3;	
			 shoot_state = false; 
		}
		if (e.keyCode == 39)
		{
	//		state= "stop";
			dirX=1;
			 dir=4;	
			shoot_state = false; 
		}
		if (e.keyCode == 38)
		{
			jump = 'descend';
		}
});

	$(document).keydown(function(e) {
	//alert (e.keyCode);
	//if space start/stop gameloop
	//var time = new Date().getTime() * 0.002;
	
	
		if(e.keyCode == 32)
		{
			status = 0 - status;
			bulletReady = true;
			shoot_state = true;
		    bullet.x = destX + 150;
            bullet.y = destY +20;
            first = true;
		}
	//	if (jump != 'descend')
	//	{
			if (e.keyCode == 38 )
			{
				jump = 'ascend';
			}
	//	}
		if (e.keyCode == 40){
		//	down
		}
		if (e.keyCode == 37){
			state = 'left';
		}
		if (e.keyCode == 39){
			state = 'right';
		}
	});
		///////////////////////////////////////////////////////////////////////////////
	   if (state == 'left')
	   {
	   		x = x-(1 * dirX);
	   		backg_x = backg_x + 2 ;
	   		state_image = imageObj2;
	   	//	degrees = degrees - 1;
	   //		context.setTransform(1,0.5,-0.5,10,10);
	   }
		if (state == 'right')
		{
  		x		= x + (1 * dirX);
	  		backg_x = backg_x - 2 ;
	  	//	degrees = degrees +1 ;
	  	//	context.setTransform(1,0.5,-0.5,1,10,10);
	  	    state_image = imageObj;
	  		
		}
		if (jump == 'ascend')
		{
			//if( red==0 && blue==0 && green==0)
			//{
				y = y + 1;
		//	}
		//	if ((y <= -40) && (floating != 'true'))
		//	{
		//		jump = 'descend';
		//	}
		}
		if (jump == 'descend')
		{
			y = y - 1;
			if (y == 0)
			{
				jump = 'rest';
			}
		}
		if (jump == 'rest')
		{
			y = 0;
			dirY = -1;
		}
		if (inbounds=='true')
		{
		//	destX = (canvas.width / 2 ) + x;
			destY = canvas.height  -  y - 60		;// 60 pixels offset from centre
		}//end if inbounds
		if (destX > canvas.width || destX < 0)
		{
   		//	dirX =-dirX;
    	}
		if (destY < 10)
		{
  				
  				destY = 10;
  				
		}
		//canvas.width = 8248;
		context.clearRect(0,0 , canvas.width, canvas.height);
		// move the rotation point to the center of the rect
        //  context.translate( x + 1, y + 1 );
		// rotate the rect
	 	// context.rotate(50*Math.PI/180);
	 
		context.drawImage(background_obj, backg_x, backg_y);
		
		red		= imageData.data[	( (8248 * (destY+40 )) + parseInt(0-backg_x + 178) )*4 ]; 
		green	= imageData.data[ ( ( (8248 * (destY+40 )) + parseInt(0-backg_x + 178) )*4 )+ 1];
		blue	= imageData.data[ ( ( (8248 * (destY+40 )) + parseInt(0-backg_x + 178) )*4 )+ 2];
		if  ((red > mid      &&   green < mid   &&  blue >mid) || (red < mid && green > mid && blue > mid)) {
			
			
			if (jump !="ascend")
			{
			//	jump = 'descend';
			}
		//	inbounds	= 'true';
		//	float		= 'false';
		}
		
		
		
		
		if ( red==0 && green==255 && blue==246 ){
		//	jump		= 'ascend';
		//	float		= 'true';
		//	inbounds	= 'true';
		}
		if( red==0 && blue==0 && green==0){
			death		= 'true';
			
		}
	
		context.save();
        context.beginPath();
	 	//context.translate( 200,200 );
        // rotate the rect
    
        context.rotate(degrees*Math.PI/180);
		context.drawImage(state_image, 100, destY );
 		context.restore();
		//red = imageData.data;
		//name = red[100];
		//canvas.width = 568;

		str = "width=" + imageData.width + " height=" +	imageData.height 
		+ " red :" + red  + " green :" + green + " blue :" + blue  
		+ " destX :" + parseInt(0-backg_x)  + " destY :" +destY 
		+ " inbounds:" + inbounds  
		+ " float: " + floating + " jump : " + jump;
		
		context.fillText(str, 20, 14);
		
		str2 = "x: " + x + "y :" + y;
		context.fillText(str2, 20, 34);
		
		
		str3 = "shoot: " + shoot_state ;
		context.fillText(str3, 20, 54);
		
		
		
		context.fillStyle = 'white';
	
	if (death){
	//alert ("death");
	death= false;
	destY=0;
	destX=0;
	backg_x=0;
	
	}
	
	
	
	

	
	if (shoot_state) {
	        context.drawImage(bulletImage, bullet.x, bullet.y);
	    }

	
	}// end draw
	
	
	
	
	
	function shoot()
{

    if (dir==1){

        bullet.y -= bullet.speed  * 1;
    }

    if (dir==2){

        bullet.y += bullet.speed  * 1;
    }

    if (dir==3){

        bullet.x -= bullet.speed * 1  ;
    }

    if (dir==4){

        bullet.x += bullet.speed  * 1 ;

    }
   //distance = square root sqrt  of ( (x2-x1)^2 + (y2-y1)^2)
    var distance = Math.sqrt(    Math.pow(bullet.x - 100, 2) + Math.pow(bullet.y - destY,2) );
    if (distance > 200)
    {
        shoot_state = false;
        bulletReady = false;
        first = true;
        bullet.x = destX - 100 ;
        bullet.y = destY;
    }
}
	