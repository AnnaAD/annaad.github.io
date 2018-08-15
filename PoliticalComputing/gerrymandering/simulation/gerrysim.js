var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var mousePos;

var toolType;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight - document.getElementById("nav").offsetHeight;

var cityList = [];
var districtList = [];
var workingNodes = [];

updateDraw();

var totalRepDistricts, totalDemDistricts, totalRep, totalDem, totalPop = 0;


function updateDraw() {
	updateTotals();
	ctx.fillStyle = "lightgray";
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	for(var i = 0; i < cityList.length; i++) {
		drawCity(cityList[i]);
	}

	for(var i = 0; i < workingNodes.length; i++) {
		drawWorkingNode(workingNodes[i],i);
	}

	for(var i = 0; i < districtList.length; i++) {
		for(var j = 0; j < districtList[i].nodes.length; j++) {
			drawNode(districtList[i].nodes[j],j);
		}
	}
}


function calculateTotals() {
	totalDemDistricts = 0;
	totalRepDistricts = 0;
	for(var i = 0; i< districtList.length; i++) {
		if(districtList[i].totalDem > districtList[i].totalRep) {
			totalDemDistricts++;
		} else if (districtList[i].totalDem < districtList[i].totalRep) {
			totalRepDistricts++;
		}
	}
	totalPop = 0;
	totalDem = 0;
	totalRep = 0;
	for(var i = 0; i < cityList.length; i++) {
		//console.log(cityList[i].pop);
		totalPop += cityList[i].pop;
		totalRep += cityList[i].republican;
		totalDem += cityList[i].democrat;
	}
}

function updateTotals() {
	calculateTotals();
	if(document.getElementById("pop") != null) {
		document.getElementById("pop").innerHTML = "Total Population: " + totalPop;
		document.getElementById("rep").innerHTML = "Percent Republicans: " + Math.round(totalRep/totalPop * 100);
		document.getElementById("dem").innerHTML = "Percent Democrats: " + Math.round(totalDem/totalPop * 100);
		document.getElementById("repDistricts").innerHTML = "Republican Districts: " + totalRepDistricts;
		document.getElementById("demDistricts").innerHTML = "Democrat Districts: " + totalDemDistricts;
	}
}



function processForm() {
	city = createCity(parseInt(document.forms["form"]["x"].value),parseInt(document.forms["form"]["y"].value),parseInt(document.forms["form"]["repPop"].value),parseInt(document.forms["form"]["demPop"].value));
	cityList.push(city);
	for(var i = 0; i < districtList.length; i++) {
		if(inside(city, districtList[i].nodes)) {
			addCityToDistrict(city,districtList[i]);
		}
	}
	updateDraw();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x:evt.clientX - rect.left,
    y:evt.clientY - rect.top
  }
}

function updateMouse(e) {
	mousePos = getMousePos(canvas,e);
	updateDraw();
	
	for(var i = 0; i < cityList.length; i++) {
		if(intersectCity(mousePos.x, mousePos.y, cityList[i])) {
			drawCityData(cityList[i]);
			return;
		}
	}


	for(var i = 0; i < districtList.length; i++) {
		//console.log(mousePos.x + " " + mousePos.y);
		if(inside(mousePos, districtList[i].nodes)) {
			drawDistrictData(districtList[i]);
			return;
		}
	}
}


function mouseDown(e) {
	mousePos = getMousePos(canvas,e);
	
	for(var i = 0; i < districtList.length; i++) {
		//console.log(mousePos.x + " " + mousePos.y);
		if(inside(mousePos, districtList[i].nodes)) {
			return;
		}
	}

	if(intersectWorkingPath(mousePos)) {
		return;
	}

	if(workingNodes.length === 0) {
		workingNodes.push(createNode(null, mousePos.x,mousePos.y));
	} else {
		if (intersectNode(mousePos.x,mousePos.y,workingNodes[0])) {
			workingNodes.push(workingNodes[0]);
			districtList.push(createDistrict(workingNodes));
			
			for(var i = 0; i < cityList.length; i++) {
				if(inside(cityList[i],districtList[districtList.length-1].nodes)) {
					addCityToDistrict(cityList[i],districtList[districtList.length-1]);
				}
			}

			workingNodes = [];
		} else {
			workingNodes.push(createNode(workingNodes[workingNodes.length-1], mousePos.x,mousePos.y));
		}
	}
	updateDraw();
}
