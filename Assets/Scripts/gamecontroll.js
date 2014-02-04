#pragma strict

public var btn01 : GUITexture;
public var btn02 : GUITexture;
public var btn03 : GUITexture;
public var btn04 : GUITexture;
public var btn05 : GUITexture;

public var spawner : GameObject;

function Awake () {
}

function Start () {

}

function FixedUpdate () {

}


var clone : GameObject;
function Update () {
//print("test");
//Debug.Log("test2");
 if(Input.touchCount > 0){
  for(var i : int = 0; i < Input.touchCount; i++){
   var touch : Touch = Input.GetTouch(i);
    if(touch.phase == TouchPhase.Began && btn05.HitTest(touch.position)){
//     Handheld.Vibrate();
print("hit");


    }
  }
 }
}

function LastUpdate () {

}

function OnMouseDown() {
//	var tmp : Rect = btn01.getTexture

}

function OnMouseUp () {

}
