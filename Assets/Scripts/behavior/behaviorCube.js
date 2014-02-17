#pragma strict


public var POSITION_Y_DESTROY : float = -30f;

public var POWER : float = 500f;


function Start () {

}

function Update () {
	
	// self destroy
	if (transform.position.y <= POSITION_Y_DESTROY) {
		Destroy(gameObject);
	}
}

function Explosion () {
	
	var dir : Vector3 = Vector3(Random.value*POWER - POWER/2,Random.value*POWER,Random.value*POWER - POWER/2);
	gameObject.rigidbody.AddForce(dir.normalized * POWER, ForceMode.Acceleration);
}