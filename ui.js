var boxes = [];
var size = 16;
var running = false;
var simulateThread;

for (i = 0; i < 16; i++) {
	boxes.push([]);
}

$(document).ready(function () {
	var currBox,
	string;
	for (y = 0; y < 16; y++) {
		string = "<span>";
		for (x = 0; x < 16; x++) {
			string += "<div class='square' id=" + x + "x" + y + " ></div>";
			currBox = new box(x, y);
			boxes[x].push(currBox);
			//currBox.generateNeighbors();
		}
		string += "</span>";
		$("#container").append(string);
	}
	buttonify();

	$("#simulate").button({
		icons: {
			text : true,
    		primary: "ui-icon-play"
    	}
	}).click(function() {simulate();}	
	);

	$("#stop").button({
		icons: {
			text : true,
			primary: "ui-icon-stop"
		}
		}).click(function() {console.log('stopped'); running = false; clearInterval(simulateThread)});

});

var box = function(x, y) {
	this.x = x;
	this.y = y;
	this.enabled = false;
	this.neighbors = [];
	//will be calculated at each time stamp during first sweep
	//then second sweep will update each box based on this value
	this.numEnabledNeighbors = 0;

	this.generateNeighbors = function () {
		for (i = (this.x - 1); i < (this.x + 2); i++) {
			for (j = (this.y - 1); j < (this.y + 2); j++) {
				if (i >= 0 && i < size && j >= 0 && j < size && !(i === this.x && j === this.y)) {
					this.neighbors.push(boxes[i][j]);
				}
			}
		}
	};

	this.swap = function() {
		if (!this.enabled) {
			$("#" + this.x + "x" + this.y).css("background", "white");
			this.enabled = true;
		} else {
			$("#" + this.x + "x" + this.y).css("background", "#696969");
			this.enabled = false;
		}
	};

	this.enabledNeighbors = function () {
		var output = 0;
		for (i = 0; i < this.neighbors.length; i++) {
			if (this.neighbors[i].enabled) {
				output++;
			}
		} return output;
	};

	this.update = function() {
		if (this.enabled) {
			if (this.numEnabledNeighbors > 3 || this.numEnabledNeighbors < 2) {
				this.swap();
			}
		} else {
			if (this.numEnabledNeighbors === 3) {
				this.swap();
			}
		}
	}
}

buttonify = function () {
	for (x = 0; x < 16; x++) {
		for (y = 0; y < 16; y++) {
			boxes[x][y].generateNeighbors();
			makeButton(x, y);
		}
	}
}

makeButton = function (x, y) {
	var box = boxes[x][y];
	$("#" + x + "x" + y).click(function () {
		box.swap();
	});
}

simulate = function() {
	if (!running) {
		simulateThread = setInterval(function() {timeStep();}, 1000);
		running = true;
	}
}

timeStep = function () {
	for (column = 0; column < size; column++) {
		boxes[column].map(setNumEnabledNeighbors);
	}

	for (column = 0; column < size; column++) {
		boxes[column].map(function(box) {box.update();})
	}
}

setNumEnabledNeighbors = function(box) {
	box.numEnabledNeighbors = box.enabledNeighbors();
}
