#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;
var rotation;
function Start () {
	
}

function Update () {

    rotation = transform.rotation;
	yaw += speedH * Input.GetAxis("Mouse X");
    pitch -= speedV * Input.GetAxis("Mouse Y");
	
	transform.eulerAngles = new Vector3(0, yaw, 0.0f);
	Debug.Log("Preserver: " +transform.rotation);
	if(!Player.onGround)
		transform.rotation = Player.preRotation;
	
	Debug.Log("Preserver: " +transform.rotation);
}
