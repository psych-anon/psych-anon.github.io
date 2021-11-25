"use strict";
//console.log = function () {}
var stimsToDisplay, i, stim, stimNum, tempStim, isMale, imgURL, scaledCoordArrayX, scaledCoordArrayY, saveFile, savePath, start, now, end, coordArray, writeArray, mouseXPos, mouseYPos, followUpQuestions, study, thisTask, IP;
var escape;
var timer;
var probeTimer;
var prime;
var comparison = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var probe;
var fixDur = 500;
var primeDur = 2000;
var probeDur = 7000;
var keyStart;
var inRange = true;
var showDelayedStim;
var oldTimeout = setTimeout;
var oldClearTimeout = clearTimeout;
var root_path = '';

switch (document.location.hostname) {
	case 'localhost':
		root_path = '/scripts/';
		break;

	default:
		root_path = '/scripts/';
		break;
}

Array.prototype.transpose = function () {
	var a = this,
	    w = a.length ? a.length : 0,
	    h = a[0] instanceof Array ? a[0].length : 0;
	if (h === 0 || w === 0) {
		return []
	}
	var i, j, t = [];
	for (i = 0; i < h; i++) {
		t[i] = [];
		for (j = 0; j < w; j++) {
			t[i][j] = a[j][i]
		}
	}
	return t
};

Array.prototype.shuffle = function () {
	var arrayLength = this.length, j, tempi, tempj;
	if ( arrayLength === 0 ) {
		return false;
	}
	while (--arrayLength) {
		j = Math.floor( Math.random() * (arrayLength+1) );
		tempi = this[arrayLength];
		tempj = this[j];
		this[arrayLength] = tempj;
		this[j] = tempi;
	}
	return arrayLength;
};

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}

if (!Array.prototype.map)
{
	/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map*/
	Array.prototype.map = function(fun /*, thisArg */)
	{
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var res = new Array(len);
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++)
		{
			// NOTE: Absolute correctness would demand Object.defineProperty
			//       be used.  But this method is fairly new, and failure is
			//       possible only if Object.prototype or Array.prototype
			//       has a property |i| (very unlikely), so use a less-correct
			//       but more portable alternative.
			if (i in t)
				res[i] = fun.call(thisArg, t[i], i, t);
		}

		return res;
	};
}

function addKeyListener(key, func) {
	$(document).on('keydown',function (e) {
		if (key.toUpperCase() == String.fromCharCode(e.keyCode)) {
			func(e);
		}
	});
}

/*
   function getKeypress(temp,thisTask,choice){
   $(document).one('mousedown',function(e) {
   var RT = keyStart - getUTC();
   var press = e.which;
   if ((press == 1 && temp[2][0].toLowerCase() =='c')||(press == 3 && temp[2][0].toLowerCase() =='i')){
   $(document).one('mouseup',function(e){return false;});
   $("#stim2").hide();
   var toWrite = subjID + "," + prime + "," + probe + "," + press + ",1," + RT;
   $.post('/scripts/saveDemo.php', {subjid : subjID, toWrite : toWrite, studyName : study}, function () {});
   thisTask.writeToMT(choice,false,'');
// if (temp[0]=="10*"){
// confidenceRating(temp,thisTask);
// return true;
// }
thisTask.endTrial();
return false;
} else if ((press == 3 && temp[2][0].toLowerCase() =='c')||(press == 1 && temp[2][0].toLowerCase() =='i')) {
$(document).one('mouseup',function(e){return false;});
// $(document).unbind('mouseup');
$("#stim2").hide();
var toWrite = subjID + "," + prime + "," + probe + "," + press + ",0," + RT;
$.post('/scripts/saveDemo.php', {subjid : subjID, toWrite : toWrite, studyName : study}, function () {});
thisTask.writeToMT(choice,false,'w');
// if (temp[0]=="10*"){
// confidenceRating(temp,thisTask);
// return true;
// }
thisTask.endTrial();
return false;
} else{
getKeypress(temp,thisTask,choice);
return false;
}
});
}

function confidenceRating(trial,task,choice){
clearTimeout(probeTimer);
var origHTML = $('#stim2').html();
$("#stim2").empty().html('<p class="stim">How confident are you about your classification<br>of the face on a scale of 1 to 5?<br>(1=Not at all confident; 5=Extremely confident)<br><br>(Use the number keys on your keyboard)</p>').show();
$('#stim').empty().hide();
$(document).bind('keypress',function(e) {
var press = String.fromCharCode(e.which);
if (isNumber(press) && String.fromCharCode(e.which)<6 && String.fromCharCode(e.which)>0){
$(document).unbind('keypress');
var toWrite = subjID + "," + trial[1] + "," + press;
$.post('/scripts/saveDemo.php', {subjid : subjID+"_conf", toWrite : toWrite, studyName : study}, function () {});
$('#stim2').empty().hide().html(origHTML);
setTimeout(function(){getKeypress(trial,task,choice)},50);
keyStart = getUTC();
$("#stim2").show();
$("div#stim2 .stim").show();
$(".secondStim").show();

probeTimer = setTimeout(function(){
if($("#stim2").css('display')!='none'){
$("#stim2").hide();
ZIalert('Please make your response faster.');
var toWrite = subjID + "," + prime + "," + probe + ",TO,TO,timeout,"  ;
$.post('/scripts/saveDemo.php', {subjid : subjID, toWrite : toWrite, studyName : study}, function () {});
task.writeToMT(choice,true,'t');
task.endTrial();
// $(document).unbind('keypress');
}				
},probeDur);
return true;
}
else {
return false;
}
});
}*/

function getIP () {
	$.get(root_path + 'getip.php', function(data) {IP = data;});
}

function isPicFiletype(stim){
	if (stim.length < 4) {return false;}
	var type = stim.slice(stim.length-4,stim.length);
	type = type.toLowerCase();
	switch(type){
		case '.jpg':
			return true;

		case '.bmp':
			return true;

		case '.png':
			return true;

		case '.gif':
			return true;

		case '.tif':
			return true;

		default:
			return false;
	}
}

function preloadImages(array){
	var array_len = array.length;
	for (var i = 0; i < array_len; i++){
		if (typeof(array[i])=="string"){
			if (isPicFiletype(array[i])){
				//Regular browsers
				$('<img/>').one("load",function(){}).attr("src","./pictures/" + array[i]);
				//IE support
				var image = new Image();
				image.onload = function () {}
				image.src = "./pictures/" + array[i];
			}
		} else if (typeof(array[i])=="object"){
			preloadImages(array[i]);
		}
	}
	console.log('done preloading');
}

function flattenPictureArray(array){
	var array_len = array.length;
	var flat_array = [];
	for (var i = 0; i < array_len; i++){
		if (typeof(array[i])=="string"){
			if (isPicFiletype(array[i])){
				flat_array.push("./pictures/" + array[i]);
			}
		} else if (typeof(array[i])=="object"){
			try {[].push.apply(flat_array, flattenPictureArray(array[i]));}
			catch (err) {}
		}
	}
	return flat_array;
}

function preloadImages_new(array, func){
	var flat_array = flattenPictureArray(array);
	if (flat_array.length > 0) {
	var pl = new preLoader(flat_array, {
		onComplete : function () {
			func(); 
		} 
	});
	} else {
		func();
	}
}

function defineRandOrder(stimArray) {
	var randOrder = [];
	var randGroups = [];
	for (i = 0; i < stimArray.length ; i++) {
		randOrder.push(stimArray[i][3]);
		try {
			randGroups[stimArray[i][3]].push(stimArray[i]);
		} catch(err) {
			randGroups[stimArray[i][3]]=[];
			randGroups[stimArray[i][3]].push(stimArray[i]);
		}
	}
	for (i = 1; i < randGroups.length; i++) {
		try {randGroups[i].shuffle();}
		catch(err) {console.log(err)}
	}
	return [randOrder,randGroups];	
}

function defineRandGroup(stimArray) {
	var randOrder = [];
	var randGroups = [];
	for (i = 0; i < stimArray.length ; i++) {
		randOrder.push(stimArray[i][3]);
		try {
			randGroups[stimArray[i][3]].push(stimArray[i]);
		} catch(err) {
			randGroups[stimArray[i][3]]=[];
			randGroups[stimArray[i][3]].push(stimArray[i]);
		}
	}
	for (i = 1; i < randGroups.length; i++) {
		try {
			randGroups[i].shuffle();
			var tempStr = randGroups[i][0][1];
			randGroups[i][0][1]= tempStr.substring(0,10)+"2000"+tempStr.substring(13);
		}
		catch(err) {console.log(err)}
	}
	return [randOrder,randGroups];	
}

/*
function getSubjID(id_len) {
	var id = getUTC().toString();
	id = id.slice(id.length - id_len);	
	return id;
}
*/

//Actually make subjID random, not based on time
//Also, make sure it starts with 1-9, not 0
//This makes it easier for sorting later
function getSubjID(id_len) {
	var min = '1';
	var max = '9';

	for (var i = 1; i < id_len; i++) {
		min = min + '0';
		max = max + '9';
	}
	
	var id = randint(Number(min), Number(max));
	return id;
}


function startOnClick(button,div) {
	//Hides the parent div of the button clicked
	//and shows the div specified
	$(button).parent().hide();
	$(div).show();
}

function hideExptArea(){
	$('#exptArea').hide();
	$('body').css('background-color','white');
}

function getUTC(){
	var tempDate = new Date();
	return Math.abs(Date.UTC(tempDate.getYear(), tempDate.getMonth(), tempDate.getDay(), tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds(), tempDate.getMilliseconds()));
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var ZIalert = function(msg){
	// if ($('.break').css('display') == "none" && $('.survey').css('display') == "none" && $('.demographics').css('display') == "none" && $('.thanks').css('display') == "none" ){
	setTimeout(function(){
		if ($('#exptArea').css('display') != "none"){

			setTimeout(function(){
				$('#exptArea').hide();
				$('#startButton').hide();},10);
			$('#alert').show().css('background-color','white');
			$('#alertMsg').append(msg+'<br><br>');
			$('#alert').one('click',function(){$('#alertMsg').empty();$('#exptArea').show();$('#startButton').show();$('#alert').hide();});
		}
	},5);
}

var randint = function(lowerBound,upperBound){
	var diff = upperBound + 1 - lowerBound;
	return Math.floor(Math.random()*diff)%(diff) + lowerBound;
}

function Progress (){
	this.name = '';

	this.taskinit = function(task, name){
		var thisProgress = this;
		this.name = name;
		var old_setter = task.setCounter;
		task.setCounter = function(newVal){
			old_setter(newVal);
			thisProgress.advanceProgressBar(newVal);
		}
		$('#progressBars').append('<div id="' + name + '"></div>');
		$('#' + this.name).progressbar({value: 0, max : task.length}).height('4px').hide();
	}

	this.exptinit = function(num_tasks){
		$('#progressBars').append('<div id="expt_progress"></div>');
		$('#expt_progress').progressbar({value: 0}).hide();
	}

	this.showProgressBar = function(){
		$('#' + this.name).show();
	}

	this.advanceProgressBar = function(val){
		$('#' + this.name).progressbar({value: val});
	}

	this.destroyProgressBar = function(){
		$('#' + this.name).remove();
	}
}

var arrangeTasks = function (array) {
	var array_len = array.length;
	var task;
	for (var i = 0; i < array_len; i++){
		if (typeof(array[i])=="string"){
			if (isPicFiletype(array[i])){
				$('<img/>').one("load",function(){}).attr("src","./pictures/" + array[i]);
			}
		} else if (typeof(array[i])=="object"){
			preloadImages(array[i]);
		}
	}	
}

var preventTouch = function(){
	$(document).on('touchstart',function(e){$('body').html("<h3 style='color:white'>I'm sorry, it looks like you're on a tablet or a phone.<br>Please only do this task on a computer with an external mouse.</h3>")});
}

var wrap = function (parts) {
	var text = parts[0].join('<br><br>');
	var temp_selector = parts[1] || 'p';
	var temp_class = parts[2] || '';
	var temp_id = parts[3] || '';
	var $temp = $('<' + temp_selector + '>');
	$temp.addClass(temp_class);
	$temp.attr('id',temp_id);
	$temp.html(text);
	return $temp
}

var postInstructions = function (text, task, hide) {
	var disp = hide ? 'none' : ''; // display:none if hide is true
	var $instructions = $('<div>')
		.addClass('instructions')
		.attr('id','main')
		.css('display', disp);
	for (var i = 0; i < text.length; i++) {
		$instructions.append(text[i]);
	}
	$instructions
		.append($('<h3>')
				.attr('id','preloading')
				.html('Preloading images, please wait...')
		       )
		.append($('<input>')
				.attr('type','button')
				.attr('style','display:none')
				.attr('value','Agree')
				.attr('id','start')
				.mouseenter(function() {
					$('#start').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
				})
				.mouseleave(function() {
					$('#start').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
				})
				.on('click', function () {
					$('.instructions').hide(); 
					$('.instructions h3:first-child').css({
						'font-size':'1.2em', 'padding':'25px', 'text-align':'left'
					});
					console.log('doint the change');
					$('#begin').mouseenter(function() {
						$('#begin').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
					});	
					$('#begin').mouseleave(function() {
						$('#begin').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
					});	
					task.start();
				})
		       );
	prependToBody($instructions, function () {});

}

var prependToBody = function (elem, success) {
	// Try to prepend to the body
	// If body is not yet loaded, call this recursively
	/*
	if ($('body').length < 1) {
		setTimeout(function () {
			prependToBody(elem,time,success)
		}, time);
		return;
	}
	*/
	// If body is loaded, prepend the element and fire the success function
	$(document).ready(function () {
		var $body = $('body');
		$body.prepend(elem)
		.ready(function () {success();});
	});

}

var donePreloading = function () {
	getIP();
	if ($('#exptArea').length > 0) {
		$(document).mousemove(function(e){mouseXPos = e.pageX - $('#exptArea').offset().left;mouseYPos = e.pageY - $('#exptArea').offset().top;});
	}
	setTimeout(function () {
		$('#preloading').html("Pressing the button below indicates your consent to participate.");
		$('#start').show();
	});
}

var getQueryString = function (propertyName) {
	var url = document.URL;
	var startIndex= url.indexOf(propertyName)+propertyName.length+1;
	var endIndex= url.indexOf("&",startIndex);
	if (endIndex == -1) {endIndex= url.length;}
	return url.substring(startIndex,endIndex);
};


var showQualtrics = function (link) {
	$("#participantCode").html('<a href="' + link + '&subjID=' + subjID + '">Survey link</a>');
	$('.thanks').show();
	$(document).unbind('contextmenu');
	try { writeToJSON(); } catch (err) {	}
}
