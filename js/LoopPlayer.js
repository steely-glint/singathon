
LoopPlayer = function(){
	this.context = null;

};

LoopPlayer.prototype.play = function(buffers, context){

	console.log("play");

	this.NUM_BARS = 4;
	this.BAR_LENGTH = 60;
	this.LOOP_LENGTH = this.BAR_LENGTH * 2;
	this.NUM_BARS = 2;
	this.TOTAL_USER_INSTRUMENTS = 1;

	this.WHOLE = Math.floor(this.BAR_LENGTH);
	this.HALF = Math.floor(this.BAR_LENGTH) / 2;
	this.QUARTER = Math.floor(this.BAR_LENGTH / 4);
	this.EIGHTH = Math.floor(this.BAR_LENGTH / 8);
	this.SIXTEENTH = Math.floor(this.BAR_LENGTH / 16);


	var closedHH = buffers[0];
	var snare = buffers[1];
	var kick = buffers[2];

	this.frameNum = 1;
	this.playing = false;
	this.numUserInstruments = 0;

	this.context = context;
	this.buffers = buffers;
	this.sources = [];
	this.tracks = [];

	//closed hi - hat
	this.tracks[0] = [];
	this.tracks[0][1] = closedHH;
	this.tracks[0][this.QUARTER + 1] = closedHH;
	this.tracks[0][this.QUARTER * 2 + 1] = closedHH;
	this.tracks[0][this.QUARTER * 3 + 1] = closedHH;
	this.tracks[0][this.QUARTER * 4 + 1] = closedHH;
	this.tracks[0][this.QUARTER * 5 + 1] = closedHH;
	this.tracks[0][this.QUARTER * 6 + 1] = closedHH;
	this.tracks[0][this.QUARTER * 7 + 1] = closedHH;

	this.tracks[1] = [];
	this.tracks[1][this.HALF + 1] = snare;
	this.tracks[1][this.HALF * 3 + 1] = snare;

	this.tracks[2] = [];
	this.tracks[2][1] = kick;
	this.tracks[2][this.HALF * 2 + 1] = kick;


	console.log(this.tracks[0]);
	console.log(this.tracks[1]);
	console.log(this.tracks[2]);

	this.playing  = true;
	this.animate();

};

LoopPlayer.prototype.addUserInstrument = function (n){
	if(this.numUserInstruments < this.TOTAL_USER_INSTRUMENTS){
		switch(n){
			case 0:
				this.tracks[3] = [];
				this.tracks[3][this.HALF + 1] = snare;
				this.tracks[3][this.HALF * 3 + 1] = snare;
			case 1:
				this.tracks[4] = [];
				this.tracks[4][1] = kick;
				this.tracks[4][this.HALF * 2 + 1] = kick;	


		}
		this.numUserInstruments ++;
	}
};


LoopPlayer.prototype.animate = function() {
	// console.log("animating");
	if(this.playing) requestAnimFrame(this.animate.bind(this));
	
	

	if(this.frameNum >= this.LOOP_LENGTH){
		console.log("1 loop");
		this.frameNum = 1;
	}
	if(this.frameNum >= this.BAR_LENGTH){
		console.log("1 bar");
	}

	for(var i = 0; i < this.tracks.length; i ++){

		var track = this.tracks[i];
		if(track[this.frameNum] != null){
			this.playSound(track[this.frameNum]);	
		}
	}

	this.frameNum ++

};

LoopPlayer.prototype.playSound = function(buffer, time) {
  var source = this.context.createBufferSource();
  source.buffer = buffer;
  source.connect(this.context.destination);
  //source.loop = true;
  // source.noteOn(time);
  source.noteOn(0);
  this.sources.push(source);
}

LoopPlayer.prototype.stopAll = function(){
	this.playing = false;
	for(var i = 0; i < this.sources.length; i++){
		this.sources[i].noteOff(0);
  	}
}