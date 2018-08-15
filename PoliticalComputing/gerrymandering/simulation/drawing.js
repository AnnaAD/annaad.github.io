
function drawCity(city) {
	//console.log("rendering");
	
	ctx.fillStyle = city.color;
	ctx.beginPath();
	ctx.arc(city.x,city.y,city.radius,2*Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle =  "#000000";
	ctx.stroke();
}

function drawCityData(city, e) {
	//console.log("city data");
	ctx.fillStyle = city.color;
	ctx.fillRect(mousePos.x - 2, mousePos.y - 2, 90,60);
	ctx.fillStyle = "#000000";
	ctx.font = "10px Arial";
	ctx.fillText(city.name, mousePos.x + 5, mousePos.y + 10);
	ctx.fillText("Population: " + city.pop, mousePos.x + 5, mousePos.y + 25);
	ctx.fillText("Democrats: " + city.democrat, mousePos.x + 5, mousePos.y + 35);
	ctx.fillText("Republicans: " + city.republican, mousePos.x + 5, mousePos.y + 45);

}


function drawDistrictData(district) {
	//console.log("city data");
	ctx.fillStyle = "#606060";
	ctx.fillRect(mousePos.x - 2, mousePos.y - 2, 100,65);
	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 10px Arial";
	ctx.fillText("District Data", mousePos.x + 5, mousePos.y + 10);
	ctx.font = "10px Arial"
	ctx.fillText("Population: " + district.totalPop, mousePos.x + 5, mousePos.y + 22);
	ctx.fillText("Democrats: " + district.totalDem, mousePos.x + 5, mousePos.y + 32);
	ctx.fillText("Republicans: " + district.totalRep, mousePos.x +5, mousePos.y + 42);
	if(district.totalRep > district.totalDem) {
		ctx.fillText("Vote: Republican" , mousePos.x + 5, mousePos.y + 55);
	} else if (district.totalDem > district.totalRep) {
		ctx.fillText("Vote: Democrat" , mousePos.x + 5, mousePos.y + 55);
	} else {
		ctx.fillText("Vote: Undecided" , mousePos.x + 5, mousePos.y + 55);
	}
}

function drawNode(node, pointInPath) {
	if(pointInPath == 0) {
		//console.log("drawing");
		ctx.beginPath();
		ctx.arc(node.x,node.y,10,2*Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	} else {
		ctx.strokeStyle = "#000000";
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

function drawWorkingNode(node, pointInPath) {
	if(pointInPath == 0) {
		ctx.fillStyle = "#0000ff";
		ctx.beginPath();
		ctx.arc(node.x,node.y,10,2*Math.PI, false);
		ctx.fill();
	} else {
		ctx.fillStyle = "#0000ff";
		ctx.strokeStyle = "#0000ff"
		ctx.lineTo(node.x, node.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(node.x,node.y,10,2*Math.PI, false);
		ctx.fill();
	}
	ctx.beginPath();
	ctx.moveTo(node.x, node.y);
}