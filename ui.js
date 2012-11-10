var boxes = [];
var size = 16;
var running = false;
//our pointer to the setInterval call on timestep()
var simulateThread;
var isDown = false;
var interval;

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

	$( "#slider-vertical" ).slider({
            orientation: "vertical",
            range: "min",
            min: 150,
            max: 1000,
            value: 240,
            slide: function( event, ui ) {
                $( "#amount" ).val( ui.value );
                running = false; 
                clearInterval(simulateThread);
                simulate();

            }
        });
        $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );


		$(document).mousedown(function() {
		    isDown = true;      // When mouse goes down, set isDown to true
		    console.log('mousedown');
		}).mouseup(function() {
			isDown = false;    // When mouse goes up, set isDown to false
			console.log('mouseup');
		});

		$("#random").button().click(function() {
			var randomize = function(box) {
				if (Math.random() < 3.0/16.0) {
					box.swap();
				}
			}
			for (column = 0; column < size; column++) {
				boxes[column].map(randomize);
			}
		});

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

//called at the beggining to make all the squares buttons
buttonify = function () {
	for (x = 0; x < 16; x++) {
		for (y = 0; y < 16; y++) {
			boxes[x][y].generateNeighbors();
			makeButton(x, y);
		} 
	}
}

//makes an individual square a button
makeButton = function (x, y) {
	var box = boxes[x][y];
	$("#" + x + "x" + y).click(function () {
		box.swap();
	});
}

simulate = function() {
	if (!running) {
		interval = 60000*16/($("#amount").val())
		simulateThread = setInterval(function() {timeStep();}, interval);
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
