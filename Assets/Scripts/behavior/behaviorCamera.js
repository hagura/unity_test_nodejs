#pragma strict

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
