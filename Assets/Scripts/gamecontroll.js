#pragma strict

public var btn01 : GUITexture;
public var btn02 : GUITexture;
public var btn03 : GUITexture;
public var btn04 : GUITexture;
public var btn05 : GUITexture;


public var TIMER_START_SPAWN : float = .01;
public var TIMER_REPEAT_SPAWN : float = 2;


protected var stringNum : String = "";


function Awake () {

	Random.seed = 100 * Time.realtimeSinceStartup;
	
	stringNum = "";
}

function Start () {

	InvokeRepeating("SpawnCube", TIMER_START_SPAWN, TIMER_REPEAT_SPAWN);
}

function FixedUpdate () {

}

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

function SetNum (_num : int) {
	
	stringNum += _num;

//	listNum.Add(_num);
	
	if ( CheckListNum() == true )
	{
	
		print("clear!!");
		
		stringNum = "";
//		listNum.clear();

		Application.LoadLevel("clear");
	}
}

function CheckListNum () : boolean {

	print(stringNum);

	if ( stringNum.IndexOf("12345") != -1 ) {
	
		return true;
	} 
	
	return false;
}

function SpawnCube () {

	var _spawner : GameObject = GameObject.Find("spawner");
	
	_spawner.SendMessage("SpawnCube");
	_spawner.SendMessage("UpPos",1);
	
	GameObject.Find("MainCamera").SendMessage("UpPos",1);
	
}

function OnMouseDown () {

}

function OnMouseUp () {

}
