var city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

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
	city.name = getCityName();
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
		var city = createCity(Math.random()*(ctx.canvas.width-280)+30,Math.random()*(ctx.canvas.height-100),Math.floor(Math.random()*30),Math.floor(Math.random()*30));
		cityList.push(city);
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

function getCityName() {
	return city_names[Math.round(Math.random() * (city_names.length-1))];
}

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
