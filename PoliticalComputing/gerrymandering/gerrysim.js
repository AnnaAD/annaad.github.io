var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var toolType;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight - document.getElementById("nav").offsetHeight;

var cityList = [];

var funCity = createCity(10,10,10,10);
cityList.push(funCity);
updateDraw();





function createCity(x, y, republican, democrat) {
	var city = {pop: republican + democrat, republican:republican, democrat:democrat, radius:0, x:x, y:y};
	city.radius = city.pop/100;
	return city;
}

function drawCity(city) {
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
}

function drawCityData(city, e) {
	console.log("city data");
	ctx.fillStyle = "#606060";
	ctx.drawRect(e.clientX, e.clientY, 30,50);
}

function intersectCity(x,y,city) {
	console.log("checking");
	if(Math.sqrt(Math.pow(x-city.x, 2)+Math.pow(y-city.y, 2)) < city.radius) {
		return true;
	} else {
		return false;
	}
}

function updateDraw() {
	console.log("drawing");
	for(var i = 0; i < cityList.length; i++) {
		drawCity(cityList[i]);
	}
}

function processForm() {
	console.log(document.forms["form"]["x"].value + " , " + document.forms["form"]["y"].value + " , " + document.forms["form"]["repPop"].value + " , " + document.forms["form"]["demPop"].value);
	city = createCity(parseInt(document.forms["form"]["x"].value),parseInt(document.forms["form"]["y"].value),parseInt(document.forms["form"]["repPop"].value),parseInt(document.forms["form"]["demPop"].value));
	cityList.push(city);
	updateDraw();
	console.log(cityList);
}

function updateMouse(e) {
	for(var i = 0; i < cityList.length; i++) {
		if(intersectCity(e.clientX, e.clientY, cityList[i])) {
			drawCityData(cityList[i], e)
		}
	}
}


