#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;
var rotation;
function Start () {
	
}

function Awake()
  {
       rotation = transform.rotation;
  }
function LateUpdate()
  {
        transform.rotation = rotation;
  }

function Update () {
	yaw += speedH * Input.GetAxis("Mouse X");
    pitch -= speedV * Input.GetAxis("Mouse Y");
	Debug.Log(transform.rotation);
	if(Player.onGround){
		transform.eulerAngles = new Vector3(0, yaw, 0.0f);
	}
}
