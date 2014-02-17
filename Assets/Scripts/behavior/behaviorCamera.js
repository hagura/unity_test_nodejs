#pragma strict

public var POSITION_X : float = 0f;
public var POSITION_Y : float = 10f;
public var POSITION_Z : float = -8f;

//public var ROTATION : Vector3 = Vector3(0,0,0);

public var position;

function Start () {

}

function Update () {

}

public function UpPos (_y:float) {

	transform.position.y += _y;
}

public function LookAt (_obj:GameObject) {
	transform.LookAt(_obj.transform);
}

function SettingStart() {

	gameObject.transform.position.x = POSITION_X;
	gameObject.transform.position.y = POSITION_Y;
	gameObject.transform.position.z = POSITION_Z;
	
	LookAt(GameObject.Find("floor"));
}