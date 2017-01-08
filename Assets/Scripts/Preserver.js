#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;
var rotation;
function Start () {
	
}

function Update () {

	if(!Player.onGround)
		transform.rotation = Player.preRotation;
	
	Debug.Log("Preserver: " +transform.rotation);
}
