﻿#pragma strict

var speedH = 2.0f;
var speedV = 2.0f;
var yaw = 0.0f;
var pitch = 0.0f;

function Start () {
	
}

function Update () {
	yaw += speedH * Input.GetAxis("Mouse X");
    pitch -= speedV * Input.GetAxis("Mouse Y");
	if(Player.onGround)
		transform.eulerAngles = new Vector3(0, yaw, 0.0f);
}
