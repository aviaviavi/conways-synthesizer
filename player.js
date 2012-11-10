var MusicPlayer = function () {
	/* play music off of an input grid. PROBLEM. we need a global, dynamic grid. not sure if this handles that. Grid is a 16x16 array of boxes*/
	this.play = function(grid) {
		/* TEMPORARY CODE, this goes through the 16 total columns one time upon being called. */

		var	playOneColumn = function (index, grid) {
					var column = grid[index];
					/* keep track of which column we are on */
					$("#indicator" + index).css("background-color", "gold");
					if (index == 0) {
						$("#indicator15").css("background-color", "black");
					} else {
						$("#indicator" + (index-1)).css("background-color", "black");
					}
					for (var j = 0; j<16; j++) {
						if (column[j].enabled) {
							if (majorKey) {
								tones.pulseSound(majorChordNotes[15-j], audiolet);
							} else {
								tones.pulseSound(minorChordNotes[15-j], audiolet);
							}
						}
					}
				};
		index = 0;
		metronome = setInterval(function() {
			playOneColumn(index, grid);
			if (index < 15) {
				index++;
			} else {
				index = 0;
			}
		}, interval/16.0)
		

	}


}

player = new MusicPlayer();