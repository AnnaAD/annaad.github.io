function createCity(x, y, republican, democrat) {
	var city = {pop: republican + democrat, republican:republican, democrat:democrat, radius:0, x:x, y:y, color:0};
	city.radius = city.pop;
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

	city.color = "rgb(" + valRed + " , " + valGreen + ", " + valBlue + ") ";
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

function createRandomCities(num) {
	for (var i = 0; i < num; i++) {
		cityList.push(createCity(Math.random()*(ctx.canvas.width-200)+30,Math.random()*(ctx.canvas.height-100),Math.floor(Math.random()*30),Math.floor(Math.random()*30)));
		for(var j = 0; j < districtList.length; j++) {
			if(inside(city, districtList[i].nodes)) {
				addCityToDistrict(city,districtList[j]);
			}
		}
	}
	updateDraw();
}

function addCityToDistrict(city, district) {
	district.totalPop += city.pop;
	district.totalRep += city.republican;
	district.totalDem += city.democrat;
}

function intersectCity(x,y,city) {
	//console.log("checking");
	if(Math.hypot(x-city.x,y-city.y) < city.radius + 5) {
		return true;
	} else {
		return false;
	}
}



function intersectNode(x,y,node) {
	//console.log("checking");
	if(Math.hypot(x-node.x,y-node.y) < 10) {
		return true;
	} else {
		return false;
	}
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function intersectWorkingPath(node) {
	if(workingNodes.length>1) {
		var a = node.x;
		var b = node.y;
		var c = workingNodes[workingNodes.length-1].x;
		var d = workingNodes[workingNodes.length-1].y;
		var output = false;
		for(var i = 0; i < workingNodes.length-2; i++) {
			var p = workingNodes[i].x;
			var q = workingNodes[i].y;
			var r = workingNodes[i+1].x;
			var s = workingNodes[i+1].y;

			var det, gamma, lambda;
			det = (c - a) * (s - q) - (r - p) * (d - b);
			if (det === 0) {
				output = false;
			} else {
				lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
				gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
				output = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
			}

			if(output == true) {
				return output;
			}
		}
	}
	return output;
}
