﻿#pragma strict

public var incX : float = 3;
public var incY : float = 3;

function Start () {

}

function Update () {

}

function OnMouseDown() {
	var tmp : Rect = gameObject.guiTexture.pixelInset;
	tmp.x += incX;
	tmp.y -= incY;
	gameObject.guiTexture.pixelInset = tmp;
}

function OnMouseUp() {
	var tmp : Rect = gameObject.guiTexture.pixelInset;
	tmp.x -= incX;
	tmp.y += incY;
	gameObject.guiTexture.pixelInset = tmp;
}
