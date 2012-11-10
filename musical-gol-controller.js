$(document).ready(function (){
	/* generate a new Audiolet instance */
	var AudioletApp = function() {
		this.audiolet = new Audiolet();

	};

	/* creates a single sound, with a particular frequency on a particular audiolet controller. */
    function makeSound(frequency, audiolet) {
    	this.sine = new Sine(audiolet, frequency);
    	this.sine.connect(audiolet.output);
    	return this.sine;
    }

    /* stops the sound, and removes it from the audiolet controller */
	function stopAndDestroySound(sound, output) {
        	sound.disconnect(output);
        	sound.remove();
        	return;
     }
  
   /* pulse a sound, which starts and stops a sound. Currently stops it after 120 ms, however this should depend on a bpm variable.*/
	function pulseSound(frequency, audiolet) {
		var sound = makeSound(frequency, audiolet);
		setTimeout(function(){stopAndDestroySound(sound, audiolet.output)}, 120);
	}

	/* create an instance of audiolet */
	this.audioletApp = new AudioletApp();
	/* our instance of audiolet */
	al = this.audioletApp.audiolet;
	/* an array containing frequencies for each fo the 16 rows. */
	majorChordNotes = [261.63, 293.66, 349.23, 392, 440, 523.25, 587.33, 698.46, 783.99, 880, 1046.5, 1174.66, 1396.9, 1567.98, 1760, 2093];


});