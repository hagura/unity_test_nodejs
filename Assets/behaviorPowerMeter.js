#pragma strict

function Start () {

}

function Update () {
	gameObject.renderer.material.SetFloat("_Cutoff", Mathf.InverseLerp(0, Screen.width, Input.mousePosition.x));
}