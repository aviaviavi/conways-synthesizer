	var soundData = function (sound, gain, delay) {
		this.sound = sound;
		this.gain = gain;
		this.delay = delay;
	}

	/* generate a new Audiolet instance */
	var toneproducer = function() {
		this.audiolet = new Audiolet();
		/* creates a single sound, with a particular frequency on a particular audiolet controller. */
    	this.makeSound = function(frequency, audiolet) {
    		/* waveform switch */
    		switch (waveform) {
    			case "sine":
    			sine = new Sine(audiolet, frequency);
    			break;
    			case "square":
    			sine = new Square(audiolet, frequency);
    			break;
    			case "triangle":
    			sine = new Triangle(audiolet, frequency);
    			break;
    			case "saw":
    			sine = new Saw(audiolet, frequency);
    			break;
    		}
    		gain = new Gain(audiolet, .1);
    		sine.connect(gain);
    		delay = new Delay(audiolet, interval/4, interval/8);
    		sine.connect(delay,0,1);
    		delay.connect(gain);
    		gain.connect(audiolet.output);
    		return new soundData(sine, gain, delay);
    	}

    	/* stops the sound, and removes it from the audiolet controller */
		this.stopAndDestroySound = function(soundData, output) {
        		soundData.sound.disconnect(output);
        		soundData.gain.disconnect(output);
        		soundData.delay.disconnect(output);
        		soundData.sound.remove();
        		soundData.delay.remove();
        		soundData.gain.remove();
        		return;
   		 }
  
   /* pulse a sound, which starts and stops a sound. Currently stops it after 120 ms, however this should depend on a bpm variable.*/
		this.pulseSound = function(frequency, audiolet) {
			var soundData = this.makeSound(frequency, audiolet);
			/* stop the note after interval/clipFactor milliseconds. */
			setTimeout(function(){tones.stopAndDestroySound(soundData, audiolet.output)}, interval/clipFactor);
		}

	};

/* create an instance of audiolet */
	tones = new toneproducer();
	/* our instance of audiolet */
	audiolet = tones.audiolet;
	/* an array containing frequencies for each fo the 16 rows, in a major key. */
	majorChordNotes = [261.63, 293.66, 349.23, 392, 440, 523.25, 587.33, 698.46, 783.99, 880, 1046.5, 1174.66, 1396.9, 1567.98, 1760, 2093];
	for (i = 0; i < 16; i++) {
		majorChordNotes[i] = majorChordNotes[i]/2;
	}
	/* an array containing frequencies for each fo the 16 rows, in a minor key. */
	minorChordNotes = [261.63, 311.13, 349.23, 392, 440, 523.25, 622.25, 698.46, 783.99, 880, 1046.5, 1244.51, 1396.9, 1567.98, 1760, 2093];
	for (i = 0; i < 16; i++) {
		minorChordNotes[i] = minorChordNotes[i]/2;
	}

