var boxes = [];
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
});

var box = function(x, y) {
	x : x;
	y : y;
	enabled : false;
}

buttonify = function () {
	for (x = 0; x < 16; x++) {
		for (y = 0; y < 16; y++) {
			makeButton(x, y);
		}
	}
}

makeButton = function (x, y) {
	var box = boxes[x][y];
	$("#" + x + "x" + y).click(function () {
		if (!box.enabled) {
			$(this).css("background", "white");
			box.enabled = true;
		} else {
			$(this).css("background", "#696969");
			box.enabled = false;
		}
	});
}