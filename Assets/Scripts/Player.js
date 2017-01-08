#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;

var ms = 0.1;

var boostS = 0.4;
var boostDashing = false;

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

static var preRotation;

var rb : Rigidbody;

var ButtonCooldown : float = 0.5;
var ButtonCount : int = 0; 	
	 

function Start () {
	rb = GetComponent.<Rigidbody>();
	InvokeRepeating("drainBoost",0.0f,0.5f);
}

function Update () {
	rb.useGravity = true;
	
	if(!landed){
		if(onGround){
			xMove = 0.0f;
			zMove = 0.0f;
		}
		yMove = 0.0f;
		
		if(Input.GetKey(32) && boostMeter>0 && !boostDashing){		
			yMove+=maxSpeed;
			rb.useGravity = false;
			//if(speed < maxSpeed)
				//speed+=accel;
		}
		
		for(var i=0;i<controls.length;i++){
			var key : int = controls[i];
			if((Input.GetKey(key) && (onGround))){
				airMomentum = i;
				premoved=true;
				preRotation = transform.rotation;
				var moveSpeed = (boostDashing) ? boostS : ms;
				if(i<2){					
					transform.position += transform.forward * ((i%2==0) ?  moveSpeed : -moveSpeed);
				}else{
					transform.position += transform.right * ((i%2==0) ?  moveSpeed : -moveSpeed);
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
 
 function doBoost(){
	 if(Input.GetKeyDown(32)){
		if(ButtonCooldown > 0 && ButtonCount == 1){
			if(boostMeter > 0){
				boostMeter-=1;
				yMove = 0.0f;
				boostDashing = true;
				
			}
		}
	 }else{
		 ButtonCooldown = 0.5;
		 ButtonCount += 1;
		 boostDashing = false;
	 }	 

 }