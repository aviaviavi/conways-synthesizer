$(document).ready(function () {
	var string = "<span><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div><div class='square'></div</span>";
	for (i = 0; i < 16; i++) {
		$("#container").append(string);
	}
});