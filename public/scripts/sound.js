/*
- 4 intruments running in loops
- changing:
 pitch = global variable
 timiing = loop.interval = "8n";
  velocity == vol

loopone.stop()

loopone.start()

*/

var socket = io();

/******************************
instrument configuration constructor
*****************************/
config = function (freq, vol, int){
  this.frequency = freq;
  this.volume = vol;
  this.interval = int;
};


/******************************
intrument one
*****************************/
/*
configurations:
  volume ==> instOne.volume = 1
  frequency ==> instOne.frequency = <var> * 800 + 200
  timing ==> loopOne.start().interval = 1
  loopOne.start()
  loopOne.stop()
*/

socket.on('confOne', function(array){
  // console.log('got something');
  // console.log(array);
  loopOne.start(0.1);
  instOne.frequency = array[1] * 800 + 200;
  // console.log('frequency: ' + instOne.frequency);
  loopOne.interval = array[0] * 2;
  // console.log('interval: ' + loopOne.interval);
  instOne.volume = array[3]/2;
});

socket.on('confOneDisconnect', function(){
  console.log('one disconnected');
});


var instOne = new config ('440', 0.5, 0.5);

var synthOne = new Tone.Synth({
	'oscillator.type' : 'square8',
  'envelope' : {
  	attack : 0.001,
    decay : 0.2,
    sustain : 0
  }
}).toMaster();

var loopOne = new Tone.Loop(function(time){
	//triggered every eighth note.
  synthOne.triggerAttack(instOne.frequency, time, instOne.volume);
	// console.log(time);
}, '4n');
loopOne.humanize = true;

/******************************
intrument two
*****************************/
// things to configure
// synthTwo.envelope.attack
// loopTwo.interval
// frequency
// volume

/*
configurations:
  volume ==> instOne.volume = 1
  frequency ==> instOne.frequency = <var> * 800 + 200
  timing ==> loopOne.start().interval = 1
  loopOne.start()
  loopOne.stop()
*/

socket.on('confTwo', function(array){
  // console.log('got something');
  // console.log(array);
  loopTwo.start(0.1);
  instTwo.frequency = array[1] * 320;
  console.log('frequency: ' + instTwo.frequency);
  loopTwo.interval = array[0] * 0.01;
  console.log(array[0]);
  console.log('interval: ' + loopTwo.interval);
  synthTwo.envelope.attack = array[2];
  instTwo.volume = array[3]/2;
  console.log(array[3]);
});

var instTwo = new config ('440', 0.5, 0.5);

var synthTwo = new Tone.MonoSynth({
  'detune' : 10,
	'oscillator' : {
  	type : "fatsawtooth10",
  },
  'filter' : {
    type:"peaking",
  },
	'envelope' : {
  	attack : 0.1,
    decay : 0.4,
    sustain : 0,
    // release : 4
  },
  'filterEnvelope':{
    attack:0.2,
    decay:0.2,
    sustain:0,
    // release:2,
    baseFrequency:100,
    octaves:10,
    exponent:2,
},
}).toMaster();

var loopTwo = new Tone.Loop(function(time){
  synthTwo.triggerAttack(instTwo.frequency, time, instTwo.volume);
}, '0.1');
// loopTwo.humanize = true;

/******************************
intrument three
*****************************/
// things to configure
// synthTwo.envelope.attack
// loopTwo.interval
// frequency
// volume

/*
configurations:
  volume ==> instOne.volume = 1
  frequency ==> instOne.frequency = <var> * 800 + 200
  timing ==> loopOne.start().interval = 1
  loopOne.start()
  loopOne.stop()
*/

socket.on('confThree', function(array){
  // console.log('got something');
  // console.log(array);
  loopThree.start(0.1);
  synthThree.dampening.value = array[1] * 3000 + 1000;
  // console.log('frequency: ' + instTwo.frequency);
  synthThree.resonance.value = array[0] * 15;
  // console.log('interval: ' + loopTwo.interval);
  synthThree.attackNoise = array[2];
  synthThree.volume.value = array[3]*60-60;
});

var instThree = new config ('110', 0.5, 0.5);
var synthThree = new Tone.PluckSynth().toMaster();
var loopThree = new Tone.Loop(function(time){
  synthThree.triggerAttack(instThree.frequency, time);
}, '8n');
loopThree.humanize = true;
synthThree.dampening.value = 1500;
synthThree.resonance.value = 15;
synthThree.attackNoise = 0.5;



/******************************
event listeners
*****************************/
$("#button01").click(function() {
  loopOne.start(0.1);
});

$("#button02").click(function() {
  loopOne.stop();
});


$("#button03").click(function() {
  loopTwo.start(0.1);
});

$("#button04").click(function() {
  loopTwo.stop();
});


$("#button05").click(function() {
  loopThree.start(0.1);
});

$("#button06").click(function() {
  loopThree.stop();
});

/******************************
transport
*****************************/
Tone.Transport.start();

/******************************
a function that returns true is the user uses a mobile device
*****************************/
function isMobile() {
  var mobile = (navigator.userAgent.toLowerCase().includes('iphone') ||
              navigator.userAgent.toLowerCase().includes('android') ||
              navigator.userAgent.toLowerCase().includes('ipad') ||
              navigator.userAgent.toLowerCase().includes('ipod')
  );

  return mobile;
}

console.log(isMobile());