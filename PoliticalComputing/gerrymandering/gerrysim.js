var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var toolType;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight - document.getElementById("nav").offsetHeight;

var cityList = [];
var districtList = [];
var workingNodes = [];

updateDraw();



function createCity(x, y, republican, democrat) {
	var city = {pop: republican + democrat, republican:republican, democrat:democrat, radius:0, x:x, y:y};
	city.radius = city.pop;
	return city;
}

function createNode(parent,x,y) {
	var node = {parent:parent, x:x, y:y};
	return node;
}

function createDistrict(nodes) {
	var district = {totalRep: 0, totalDem: 0, totalPop: 0, nodes:nodes};
	return district;
}

function drawCity(city) {
	//console.log("rendering");
	var percentDem = city.democrat/city.pop;
	var percentRep = city.republican/city.pop;
	if (percentRep > percentDem) {
		var valRed = Math.round(255);
		var valGreen = Math.round(255 - (percentRep-percentDem)*255);
		var valBlue = Math.round(255 - (percentRep-percentDem)*255);
	} else {
		var valBlue = Math.round(255);
		var valGreen = Math.round(255 - (percentDem-percentRep)*255);
		var valRed = Math.round(255 - (percentDem-percentRep)*255);
	}


	ctx.beginPath();
	ctx.arc(city.x,city.y,city.radius,2*Math.PI, false);
	ctx.fillStyle = "rgb(" + valRed + " , " + valGreen + ", " + valBlue + ") ";
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle =  "#000000";
	ctx.stroke();
}

function drawCityData(city, e) {
	//console.log("city data");
	ctx.fillStyle = "#606060";
	ctx.fillRect(translateX(e.clientX) - 2, translateY(e.clientY) - 2, 60,60);
	ctx.fillStyle = "#ffffff";
	ctx.font = "10px Arial";
	ctx.fillText("Pop: " + city.pop, translateX(e.clientX) + 10, translateY(e.clientY) + 15);
	ctx.fillText("Dem: " + city.democrat, translateX(e.clientX) + 10, translateY(e.clientY) + 25);
	ctx.fillText("Rep: " + city.republican, translateX(e.clientX) + 10, translateY(e.clientY) + 35);

}

function translateX(x) {
	return x - c.offsetLeft;
}

function translateY(y) {
	return y - c.offsetTop;
}

function drawNode(node, pointInPath) {
	if(pointInPath == 0) {
		console.log("drawing");
		ctx.beginPath();
		ctx.arc(node.x,node.y,10,2*Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	} else {
		ctx.lineTo(node.x, node.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(node.x,node.y,10,2*Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	}
	ctx.beginPath();
	ctx.moveTo(node.x, node.y);
}

function intersectCity(x,y,city) {
	//console.log("checking");
	//console.log(Math.hypot(translateX(x)-city.x,translateY(y)-city.y));
	if(Math.hypot(translateX(x)-city.x,translateY(y)-city.y) < city.radius + 5) {
		return true;
	} else {
		return false;
	}
}

function updateDraw() {
	//console.log("drawing");
	ctx.fillStyle = "lightgray";
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	for(var i = 0; i < cityList.length; i++) {
		drawCity(cityList[i]);
	}

	for(var i = 0; i < workingNodes.length; i++) {
		drawNode(workingNodes[i],i);
	}
}

function processForm() {
	city = createCity(parseInt(document.forms["form"]["x"].value),parseInt(document.forms["form"]["y"].value),parseInt(document.forms["form"]["repPop"].value),parseInt(document.forms["form"]["demPop"].value));
	cityList.push(city);
	updateDraw();
}

function updateMouse(e) {
	updateDraw();
	
	for(var i = 0; i < cityList.length; i++) {
		if(intersectCity(e.clientX, e.clientY, cityList[i])) {
			drawCityData(cityList[i], e);
		}
	}
}

function mouseDown(e) {
	if(workingNodes.length === 0) {
		workingNodes.push(createNode(null, translateX(e.clientX),translateY(e.clientY)));
	} else {
		workingNodes.push(createNode(workingNodes[workingNodes.length-1], translateX(e.clientX),translateY(e.clientY)));
	}
	console.log(workingNodes);
	updateDraw();
}




