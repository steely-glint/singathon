
LoopPlayer = function(){
	this.context = null;

};

LoopPlayer.prototype.play = function(buffers, context){

	this.context = context;

	var hihat = buffers[0];
	var kick = buffers[1];
	var snare = buffers[2];

	// We'll start playing the rhythm 100 milliseconds from "now"
	var startTime = context.currentTime + 0.100;
	var tempo = 80; // BPM (beats per minute)
	var eighthNoteTime = (60 / tempo) / 2;

	for (var bar = 0; bar < 2; bar++) {
		var time = startTime + bar * 8 * eighthNoteTime;
		// Play the bass (kick) drum on beats 1, 5
		this.playSound(kick, time);
		this.playSound(kick, time + 4 * eighthNoteTime);

		// Play the snare drum on beats 3, 7
		this.playSound(snare, time + 2 * eighthNoteTime);
		this.playSound(snare, time + 6 * eighthNoteTime);

		// Play the hi-hat every eighth note.
		for (var i = 0; i < 8; ++i) {
			this.playSound(hihat, time + i * eighthNoteTime);
		}
	}

};


LoopPlayer.prototype.playSound = function(buffer, time) {
  var source = this.context.createBufferSource();
  source.buffer = buffer;
  source.connect(this.context.destination);
  source.noteOn(time);
}