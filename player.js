var MusicPlayer = function () {
	/* play music off of an input grid. PROBLEM. we need a global, dynamic grid. not sure if this handles that. Grid is a 16x16 array of boxes*/
	this.play = function(grid) {
		/* TEMPORARY CODE, this goes through the 16 total columns one time upon being called. */
		for (var i = 0; i<16; i++) {
			playOneColumn = setInterval(
				function (i, grid) {
					var column = grid[i];
					alert(column.toString());
					for (var j = 0; j<16; j++) {
						if (column[j].enabled) {
							tones.pulseSound(majorChordNotes[15-y], audiolet);
						}
					}
				},interval);
		}
		clearInterval(playOneColumn);

	}


}

player = new MusicPlayer();