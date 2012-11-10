var MusicPlayer = function () {
	/* play music off of an input grid. PROBLEM. we need a global, dynamic grid. not sure if this handles that. Grid is a 16x16 array of boxes*/
	this.play = function(grid) {
		/* TEMPORARY CODE, this goes through the 16 total columns one time upon being called. */
		var	playOneColumn = function (i, grid) {
					var column = grid[i];
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
		i = 0;
		metronome = setInterval(function() {
			playOneColumn(i, grid);
			if (i < 15) {
				i++;
			} else {
				i = 0;
			}
		}, interval/16.0)
		

	}


}

player = new MusicPlayer();