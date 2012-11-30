init = function(){
window.app = new App();

};

playLoop= function(){
  app.playSounds();
}

stopLoop = function(){
  app.stopSounds();
}

App = function(){

  this.context = null;
  this.soundBuffer = null;
  this.sounds = [];
  this.soundURLS = ["wav/hh-closed.wav", "wav/snare.wav", "wav/kick.wav", "wav/squeek.wav", "wav/clang.wav"];
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
    this.loadSound(urls[i], i);
  } 
}

App.prototype.loadSound = function(url, num){

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // Decode asynchronously
  var self = this;
  var num = num;

  // Decode asynchronously
  request.onload = function() {
    self.audioContext.decodeAudioData(request.response, function(buffer) {
        self.sounds[num] = buffer;
        self.loadedAudio();
    }, self.onError);
  }
  request.send();
}

// App.prototype.playSound = function(buffer) {
//   var source = this.audioContext.createBufferSource(); // creates a sound source
//   source.buffer = buffer;                         // tell the source which sound to play
//   source.connect(this.audioContext.destination);        // connect the source to the context's destination (the speakers)
//   source.noteOn(0);                               // play the source now
// }

App.prototype.playSounds = function(){
  this.loopPlayer.play(this.sounds, this.audioContext);
}

App.prototype.stopSounds = function(){
  this.loopPlayer.stopAll();
}

App.prototype.loadedAudio = function(sound){
  
  this.numLoaded ++
  console.log("loaded Audio,  this.numLoaded="+this.numLoaded);
  if(this.numLoaded >= this.soundURLS.length){
    console.log("soundsLoaded");
    // this.loopPlayer.play(this.sounds, this.audioContext);
  }

  // this.playSound(this.soundBuffer);
}



App.prototype.onError = function(){
  console.log("sound load error");
};


window.onload = init;


