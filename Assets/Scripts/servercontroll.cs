using UnityEngine;
using System.Collections;
using MiniJSON;

public class servercontroll : MonoBehaviour {

	protected string str = "";
	protected string strOld = "";

	public GameObject gamecontroll;


	public float TIMER_START_GET = .01f;
	public float TIMER_REPEAT_GET = .5f;

//	public string URL_SERVER = "http://192.168.1.44:8080";
	const string URL_SERVER = "http://joker.luna.ddns.vc:8080";
	const string URL_SERVER_GET = "http://joker.luna.ddns.vc:8080/get";
	const string URL_SERVER_CLEAR = "http://joker.luna.ddns.vc:8080/clear";
	const string URL_SERVER_INPUT = "http://joker.luna.ddns.vc:8080/input";


	// Use this for initialization
	void Start () {
//		Debug.Log("Start");

		StartCoroutine("UpdateValue");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	IEnumerator UpdateValue() {

		while (true) {
//			Debug.Log("UpdateValue");

			StartCoroutine("GetJSON");

			yield return new WaitForSeconds(TIMER_REPEAT_GET);
		}
	}

	IEnumerator GetJSON () {
//		Debug.Log("GetJSON");

		// webサーバへアクセス
		WWW www = new WWW(URL_SERVER_GET);
		// webサーバから何らかの返答があるまで停止

		yield return www;
		// もし、何らかのエラーがあったら
		if(!string.IsNullOrEmpty(www.error)){
			// エラー内容を表示
			Debug.LogError(string.Format("Fail Whale!\n{0}", www.error));
			yield break; // コルーチンを終了
		}

		// webサーバからの内容を文字列変数に格納
		string json = www.text; 
		Debug.Log("json:"+json);

		IList data = (IList)Json.Deserialize(json);
		string value = "";
		foreach(IDictionary result in data){
//			string status = (string)result["status"];
//			string status = (string)result["status"];
			value = (string)result["value"];
//			Debug.Log("status:"+status);
		}

		Debug.Log("value:"+value);

		//NOTE crossdomain.xml取得時も入ってくる
		//NOTE "status":trueはそのままboolにパース出来ない。"true"として受け取って、文字列判定してboolにする

		if (value != str) {
			strOld = str;
			str = value;

//			Debug.Log(str);

			gamecontroll.SendMessage("SetStringNum", str);
		}
	}

	public void Clear() {

		StartCoroutine("_clear");
	}

	IEnumerator _clear() {

		WWW www = new WWW(URL_SERVER_CLEAR);

		yield return www;
	}

	public void Input(int _num) {
		Debug.Log("Input()"+_num);

		StartCoroutine("_input",_num);
	}

	IEnumerator _input(int _num) {
		
		WWWForm form = new WWWForm();
		form.AddField("input",_num.ToString());
		WWW www = new WWW(URL_SERVER_INPUT,form);

		yield return www;
	}


}
