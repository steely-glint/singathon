init = function(){
  console.log("here");
  var app = new App();

};


App = function(){

  this.context = null;
  this.soundBuffer = null;
  this.sounds = [];
  this.soundURLS = ["dog.wav", "squeek.wav", "clang.wav"];
  this.loopPlayer = new LoopPlayer();
  this.numLoaded = 0;


  try {
    this.audioContext = new webkitAudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  this.loadMultipleSounds(this.soundURLS);

};

App.prototype.loadMultipleSounds = function(urls){
  for(var i = 0; i < urls.length; i++){ 
    this.loadSound(urls[i]);
  } 
}

App.prototype.loadSound = function(url){

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // Decode asynchronously
  var self = this;

  // Decode asynchronously
  request.onload = function() {
    self.audioContext.decodeAudioData(request.response, function(buffer) {
        self.sounds.push(buffer);
        self.loadedAudio();
    }, self.onError);
  }
  request.send();
}

App.prototype.playSound = function(buffer) {
  var source = this.audioContext.createBufferSource(); // creates a sound source
  source.buffer = buffer;                         // tell the source which sound to play
  source.connect(this.audioContext.destination);        // connect the source to the context's destination (the speakers)
  source.noteOn(0);                               // play the source now
}

App.prototype.playMultiple = function(){
  // Create two sources and play them both together

  for(var i = 0; i < this.sounds.length; i++){
    var source = audioContext.createBufferSource();
    source.buffer = bufferList[i];
    source.connect(audioContext.destination);
    source.noteOn(0);
    sources.push(source);
  }
}

App.prototype.loadedAudio = function(sound){
  
  this.numLoaded ++
  console.log("loaded Audio,  this.numLoaded="+this.numLoaded);
  if(this.numLoaded >= this.soundURLS.length){
    this.loopPlayer.play(this.sounds, this.audioContext);
  }

  // this.playSound(this.soundBuffer);
}

App.prototype.onError = function(){
  console.log("sound load error");
};


window.onload = init;


