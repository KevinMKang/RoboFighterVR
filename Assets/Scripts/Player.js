#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;

var ms = 0.1;

var speed = 0f;
var accel = 1f;
var maxSpeed = 1f;

var xMove = 0.0f;;
var yMove = 0.0f;;
var zMove = 0.0f;

static var onGround = false;
var boostMeter = 6;

var landingLag = 1f;
var landed = false;

var premoved = false;

var airMomentum = 0;

//controls, up down right left
var controls = new Array();
controls.push(119);controls.push(115);controls.push(100);controls.push(97);


function Start () {
	InvokeRepeating("drainBoost",0.0f,0.5f);
}

function Update () {
	
	if(!landed){
		if(onGround){
			xMove = 0.0f;
			zMove = 0.0f;
		}
		yMove = 0.0f;
		
		if(Input.GetKey(32) && boostMeter>0){		
			yMove+=speed;
			if(speed < maxSpeed)
				speed+=accel;
		}
		
		for(var i=0;i<controls.length;i++){
			var key : int = controls[i];
			if((Input.GetKey(key) && (onGround))){
				airMomentum = i;
				premoved=true;
				if(i<2){					
					transform.position += transform.forward * ((i%2==0) ?  ms : -ms);
				}else{
					transform.position += transform.right * ((i%2==0) ?  ms : -ms);
				}
			}
		}
		
		if(premoved && !onGround){
			if(airMomentum<2){					
					transform.position += GameObject.Find("Preserver").transform.forward * ((airMomentum%2==0) ?  ms : -ms);
					premoved = true;
				}else{
					transform.position += GameObject.Find("Preserver").transform.right * ((airMomentum%2==0) ?  ms : -ms);
					premoved = true;
				}
		}
		
		transform.Translate(xMove,yMove,zMove);
		
	}else{
		landingLag-=0.1;
		if(landingLag <= 0){
			landingLag = 1f;
			landed=false;
		}
	}
	
	yaw += speedH * Input.GetAxis("Mouse X");
    pitch -= speedV * Input.GetAxis("Mouse Y");
	transform.eulerAngles = new Vector3(0, yaw, 0.0f);
}

 function OnCollisionEnter(theCollision : Collision){
     if(theCollision.gameObject.name == "Ground")
     {
         if(!onGround && boostMeter <= 0){
			landed = true;
		 }
		 if(!onGround){
			xMove = 0;
			zMove = 0;
			yMove = 0;
		 }
		 onGround = true;
		 boostMeter = 6;
		 speed = 0;		 
     }
 }
 
 function OnCollisionExit(theCollision : Collision){
     if(theCollision.gameObject.name == "Ground")
     {
         onGround = false;
     }
 }
 
 function drainBoost(){
	 if(!onGround)
		 boostMeter-=1;	 
 }