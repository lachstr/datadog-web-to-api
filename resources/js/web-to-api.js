

function jsonConv(input){

	var jsonInput = JSON.parse(input)

	var newWidget = {type: "", requests: [], markers: []};

	if (!(jsonInput.viz)){
		throw "Invalid input: no 'viz' property found"
	}

	newWidget.type = jsonInput.viz;

	if (jsonInput.requests){
		jsonInput.requests.forEach(function (request, index) {
			var newRequest = { q: "", display_type: ""};
			newRequest.q = request.q;
			newRequest.display_type = request.type;
			newWidget.requests.push(newRequest);
		});
	} else {
		throw "Invalid input: no 'requests' list found"
	}

	if (jsonInput.markers){
		jsonInput.markers.forEach(function (marker, index){
			var newMarker = { value: "", display_type: ""};
			newMarker.display_type = marker.type;
			newMarker.value = marker.value;
			newWidget.markers.push(newMarker);
		});
	}

	return JSON.stringify(newWidget, null, 2)

}