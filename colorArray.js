function getColorsArray(imgData) {
	var arrayIndex = 0;
	var fullColors = [];
	
	var pixel = {color:"333, 333, 333", freq:0};
	fullColors[0] = pixel;
	var pixel = {color:"333, 333, 333", freq:0}; 
	fullColors[1] = pixel;
	
	for (var i = 0; i < imgData.data.length; i += 4) {
		//select colors: red, green, blue, and alpha
		r = imgData.data[i];
		g = imgData.data[i+1];
		b = imgData.data[i+2];
		a = imgData.data[i+3]; //not needed
	
		//create rgb string of the color
		color = r + ', ' + g + ', ' + b;
	
		//Flag if color exists stop looking & don't add it to the array
		var flagColorExists = false;
	
		//check if color exists- if true then increase frequency
		for (var j = 0; j < fullColors.length; j++) {
			if (fullColors[j].color == color && flagColorExists == false) {
				fullColors[j].freq = fullColors[j].freq + 1;
				flagColorExists = true;
			}
		}
	
		//If color exists flag is FALSE then add the color to the array
		if(!flagColorExists) {
			arrayIndex++; // add to the array index
			//create nested array of each pixel color and the frequency the color shows up
			var pixel = {color:color, freq:1}; 
			fullColors[arrayIndex] = pixel;
		}
	}
	
	//call sort
	fullColors.sort(sortByFreq);
	
	//sort function (greatest to least)
	function sortByFreq(a, b) {
		if (a['freq'] === b['freq']) {
			return 0;
		}
		else {
			return (a['freq'] < b['freq']) ? 1 : -1;
		}
	}
	
	return fullColors;
}