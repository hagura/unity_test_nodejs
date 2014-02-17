#pragma strict

public var btn01 : GUITexture;
public var btn02 : GUITexture;
public var btn03 : GUITexture;
public var btn04 : GUITexture;
public var btn05 : GUITexture;
public var msgClear : GUIText;
public var particleControll : GameObject;
public var mainCamera : GameObject;
public var spawner : GameObject;
public var servercontroll : GameObject;


private var flagClear : boolean;


protected var stringNum : String = "";
protected var stringNumOld: String = "";


function Awake () {

	Random.seed = 100 * Time.realtimeSinceStartup;
}

function Start () {

	spawner = GameObject.Find("spawner");

	//TEST
	SettingStart();
}

function FixedUpdate () {

	// sync json

	if (flagClear) {
		if (Input.GetMouseButtonDown(0)) {
			// reset game
			SettingStart();
		}
	} else {
		if (power < 1) {
			power += 0.01;
		} else if (power >= 1) {
			power = 1;
		}
	}
}

function Update () {

	// check finish
	if (CheckListNum() == true) {
		if (!flagClear) {
			SettingEnd();
		}
	}
	barDisplay = power;   	
}

function LastUpdate () {

}

function SettingStart () {

	stringNum = "";

	flagClear = false;

	msgClear.gameObject.SetActive(false);
	particleControll.gameObject.SetActive(false);
	
	btn01.gameObject.SetActive(true);
	btn02.gameObject.SetActive(true);
	btn03.gameObject.SetActive(true);
	btn04.gameObject.SetActive(true);
	btn05.gameObject.SetActive(true);
	
	var cubeList = GameObject.FindGameObjectsWithTag("Cube");
	for (var cube in cubeList) {
		Destroy(cube);
	}
	
	mainCamera.SendMessage("SettingStart");
	spawner.SendMessage("SettingStart");
	
	power = 1;
}

function SettingEnd () {

	flagClear = true;

	msgClear.gameObject.SetActive(true);
	particleControll.gameObject.SetActive(true);
	
	btn01.gameObject.SetActive(false);
	btn02.gameObject.SetActive(false);
	btn03.gameObject.SetActive(false);
	btn04.gameObject.SetActive(false);
	btn05.gameObject.SetActive(false);
	
	var cubeList = GameObject.FindGameObjectsWithTag("Cube");
	for (var cube in cubeList) {
		cube.SendMessage("Explosion");
	}
	
	servercontroll.SendMessage("Clear");
}

function _destroyCubeAll() {

	var cubeList = GameObject.FindGameObjectsWithTag("Cube");
	for (var cube in cubeList) {
		Destroy(cube);
	}
}

function _syncInvokeCube(_offset:String) {
	Debug.Log("_syncInvokeCube()"+_offset);
	
	for (var _index:int=0; _index < _offset.Length; _index++) {
		
		var _cubeID : int = int.Parse(_offset.Substring(_index,1));
		Debug.Log("_cubeID:"+_cubeID);
		
		SpawnCube(_cubeID);
	}
}

function SetStringNum(_str:String) {
	Debug.Log("SetStringNum");
	
	if (flagClear) {
		return;
	}
	
	if (_str == "") {
		SettingStart();
		return;
	}
	
	if (_str != stringNum) {
		stringNumOld = stringNum;
		stringNum = _str;
		
		var _offset : String = "";
		
		if (stringNumOld == "") {
			_offset = stringNum;
		} else if (stringNumOld.Length >= stringNum.Length) {
			_destroyCubeAll();
			_offset = stringNum;
		} else {
			var index = stringNum.IndexOf(stringNumOld);
			Debug.Log("index:"+index);
			
			var indexLast = stringNum.LastIndexOf(stringNumOld);
			Debug.Log("indexLast:"+indexLast);
			
			if (index != 0) {
				_destroyCubeAll();
				_offset = stringNum;
			} else {
	//			var indexStart : int = index + stringNumOld.Length;
				var indexStart : int = index + stringNumOld.Length;
				Debug.Log("indexStart:"+indexStart);
				
				var length : int = stringNum.Length - stringNumOld.Length;
				Debug.Log("length:"+length);
				
				_offset = stringNum.Substring(indexStart, length);
			}
		}
		
		Debug.Log("_offset:"+_offset);
		
		// invoke cube by 1 char
		_syncInvokeCube(_offset);
	}
}

function CheckFlagClear() : boolean {

	return flagClear;
}

function CheckListNum () : boolean {

	if (stringNum.IndexOf("54321") != -1) {
	
		return true;
	} 
	return false;
}

function SpawnCube (_num:int) {
//	print("SpawnCube");
	
	spawner.SendMessage("SpawnCube",_num);
	spawner.SendMessage("UpPos",1);
	
	mainCamera.SendMessage("UpPos",1);
}

public function OnButtonDown (_buttonID:int) {
//	print("OnButtonDown");

	if (power >= 1) {
		power = 0;
		if (_buttonID <= 5) {
	//		SpawnCube(_buttonID);//OFFLINE
			
			servercontroll.SendMessage("Input",_buttonID);
		}
	}
}


// GUI power bar
var powerBarFull : Texture2D;
var powerBarEmpty : Texture2D;
private var barDisplay : float = 0;
public var power : float =1;
function OnGUI (){
//	GUI.BeginGroup(new Rect(20,Screen.height/2 +50,20,300));
//	GUI.Box (Rect (0,0, 20, 300),healthBarFull);
	GUI.BeginGroup(new Rect(20,50,20,100));
	GUI.Box (Rect (0,0, 20, 100),powerBarFull);

//	GUI.BeginGroup (new Rect (0, 0, 20, 300 * barDisplay)); //barDisplayが0.1なら300の10%がダメージとなり塗りつぶされる
//	GUI.Box (Rect (0,0, 20, 300),healthBarEmpty);
	GUI.BeginGroup (new Rect (0, 0, 20, 100 - 100 * barDisplay)); //barDisplayが0.1なら300の10%がダメージとなり塗りつぶされる
	GUI.Box (Rect (0,0, 20, 100),powerBarEmpty);
	GUI.EndGroup ();
	GUI.EndGroup ();
}
