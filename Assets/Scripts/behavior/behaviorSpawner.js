#pragma strict

public var cube01 : GameObject;
public var cube02 : GameObject;
public var cube03 : GameObject;
public var cube04 : GameObject;
public var cube05 : GameObject;


public var POSITION : Vector3 = Vector3(0,2,0);


function Awake () {

}

function Start () {

}

function FixedUpdate () {

}

function Update () {

}

function LastUpdate () {

}

public function SettingStart () {

	transform.position = POSITION;
}

public function UpPos (_y:float) {

	transform.position.y += _y;
}

public function SpawnCube (_num:int) : int {
//	if (typeof _num === 'undefined') {
//		_num = 0;
//	}

	if (_num == 0) {
		_num = (Random.value * 5) + 1;
	}

	_spawnCube(_num);
	
	var _gamecontroll : GameObject;
	_gamecontroll = GameObject.Find("gamecontroll");
	
//	_gamecontroll.SendMessage("SetNum", _num);//OFFLINE
	
	return _num;
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
	
	var _dstCube : GameObject;
	_dstCube = Instantiate(_targetCube, transform.position, transform.rotation);
	
	GameObject.Find("MainCamera").SendMessage("LookAt",_dstCube);
}
