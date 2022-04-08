//TOP LEFT 47.302385, -93.190924
//BOTTOM RIGHT 42.380774, -86.247945
//BOTTOM RIGHT (square) 40.359406, -86.247945
//Height diff: 6.942979
//width diff:

var width = 600;
var height = 600;
var latZero = 47.302385;
var latBig = 40.359406;
var longZero =  -93.190924;
var longBig =  -86.247945;

function changeLat(latVal) {
	var x = width/(latBig-latZero)*(latVal - latZero)*1.2 + 30;
	//var x = width/(latZero-latBig)*(latVal-latZero);
	return x;
}

function changeLong(longVal) {
	var y = height/(longBig-longZero)*(longVal - longZero);
	//var y = height/(longZero-longBig)*(longVal - longZero);
	return y;
}

console.log(latZero + ": " + changeLat(latZero));
console.log(latBig + ": " + changeLat(latBig));
console.log(longZero + ": " + changeLong(longZero));
console.log(longBig + ": " + changeLong(longBig));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0,0,width,height);
ctx.fillStyle = "white";

var coorArray = coor.split(" ");

ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

ctx.beginPath();
var workingArray = coorArray[0].split(",");
ctx.moveTo(changeLong(workingArray[0]), changeLat(workingArray[1]));

for(var i = 0; i < coorArray.length-1; i++) {
	var nextPoint = coorArray[i].split(",");
	 ctx.lineTo(changeLong(nextPoint[0]), changeLat(nextPoint[1]));

}
ctx.stroke();
