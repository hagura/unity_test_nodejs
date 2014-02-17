#pragma strict

public var cube01 : GameObject;
public var cube02 : GameObject;
public var cube03 : GameObject;
public var cube04 : GameObject;
public var cube05 : GameObject;



public var TIMER_START_SPAWN : float = .01;
public var TIMER_REPEAT_SPAWN : float = 2;



function Awake () {

}

function Start () {

	InvokeRepeating("SpawnCube", TIMER_START_SPAWN, TIMER_REPEAT_SPAWN);
}

function FixedUpdate () {

}

function Update () {
//	SpawnCube();
}

function LastUpdate () {

}

function SpawnCube () {
	var _num:int = (Random.value * 5) + 1;
	print(_num);
	
	_spawnCube(_num);
}

function _spawnCube (_id:int) {
	
	var _targetCube : GameObject;

	switch (_id) {
	case 1:
		_targetCube = cube01;
		break;
	case 2:
		_targetCube = cube02;
		break;
	case 3:
		_targetCube = cube03;
		break;
	case 4:
		_targetCube = cube04;
		break;
	case 5:
		_targetCube = cube05;
		break;
	default:
		break;
	}
	
	Instantiate(_targetCube, transform.position, transform.rotation);
}
