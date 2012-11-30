var analyser;
var ctx; // canvas context
var freqByteData; // frequeny domain data
var timeByteData; // time domain data
var deg = 0;
var viz_canvas;
var viz_dur;
var viz_color;
function vizer(context,canvas,duration){
        window.requestAnimationFrame(vizdraw);
	viz_canvas =canvas;
	viz_dur = duration;

	ctx = viz_canvas.getContext('2d');
	analyser =  context.createAnalyser();
	analyser.fftSize = 2048;
	freqByteData = new Uint8Array(analyser.frequencyBinCount);
	timeByteData = new Uint8Array(analyser.frequencyBinCount);
	initColors();
	return analyser;

}
function viz_setPlayer(n){
	console.log("player "+n);
	ctx.fillStyle = colors[n];
}
var colors = [];

function color(r, g, b, a) {
	return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',' + (a ? a : 1) + ')';
}
function initColors(){
	var Cyan= color(0, 174, 239);

	var Yellow =color(213, 216, 0)

	var Orange =color (207 ,145 ,18)

	var Leaf = color(124 , 162 , 67);

	var Red = color(237 , 25 , 62);

	var Blue = color(0 ,103 , 180);

	var Green = color(30 , 122 , 54);

	var Pink  = color(210 , 115 , 158);
	colors.push(Cyan);
	colors.push(Yellow);
	colors.push(Orange);
	colors.push(Leaf);
	colors.push(Red);
	colors.push(Blue);
	colors.push(Green);
	colors.push(Pink);

}

	function average(array) {
		return array.reduce(function(a, b){ return a + b; }) / array.length;	
	};

	function vizdraw() {

		analyser.getByteFrequencyData(freqByteData);
		analyser.getByteTimeDomainData(timeByteData);
		console.log("indraw");



		var mean = 0;
		for(var i = 0; i < 1024; i++) {
			mean += freqByteData[i];
		}
		mean = mean/1024;
		console.log("deg ="+deg+" mean="+mean);
		deg++ ;
		
		ctx.fillRect(deg*(viz_canvas.width/90), 255, viz_canvas.width/180,mean*-2);
		if(deg < 90) {
			window.setTimeout(function(){
			console.log("Tick");
			window.requestAnimFrame(vizdraw)},viz_dur/90);
		}

	};


window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function(/* function */ callback, /* DOMElement */ element){
	                window.setTimeout(callback, 1000/60);
	              };
	      })();

