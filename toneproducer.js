
	/* generate a new Audiolet instance */
	var toneproducer = function() {
		this.audiolet = new Audiolet();
		/* creates a single sound, with a particular frequency on a particular audiolet controller. */
    	this.makeSound = function(frequency, audiolet) {
    		sine = new Sine(audiolet, frequency);
    		sine.connect(audiolet.output);
    		console.log("starting sound");
    		return sine;
    	}

    	/* stops the sound, and removes it from the audiolet controller */
		this.stopAndDestroySound = function(sound, output) {
        		sound.disconnect(output);
        		sound.remove();
        		console.log("ending sound");
        		return;
   		 }
  
   /* pulse a sound, which starts and stops a sound. Currently stops it after 120 ms, however this should depend on a bpm variable.*/
		this.pulseSound = function(frequency, audiolet) {
			var sound = this.makeSound(frequency, audiolet);
			setTimeout(function(){tones.stopAndDestroySound(sound, audiolet.output)}, 1000);
		}

	};

/* create an instance of audiolet */
	tones = new toneproducer();
	/* our instance of audiolet */
	audiolet = tones.audiolet;
	/* an array containing frequencies for each fo the 16 rows. */
	majorChordNotes = [261.63, 293.66, 349.23, 392, 440, 523.25, 587.33, 698.46, 783.99, 880, 1046.5, 1174.66, 1396.9, 1567.98, 1760, 2093];