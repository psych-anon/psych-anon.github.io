"use strict";
var subjID, IP, mTurkID;

//Change at your discretion
var study = "ratings/body_att"; //CHANGEME
subjID = getSubjID(10); // # is the length of subjID
//preventTouch(); // If you don't want people to use phones/tablets

// This looks at the url and pulls out information
// e.g., https://expt.hehmanlab.org/templates/RatingsExample/ceo_dom.html?mTurkID=ZACHTEST
// This would set mTurkID = 'ZACHTEST'
try {
	mTurkID = $.url().param('mTurkID');
} catch (err) {}

if (mTurkID == undefined) {
	mTurkID = '';
}

var voteTask = new voteObj();
// Change demoTask to surveyTask if you want to ask questions at the end
voteTask.nextTask = function() {
	// This is the command that logs turkers into the database
	$.get('https://expt.hehmanlab.org/scripts/log_turker.php', {mTurkID : mTurkID, study : study, subjID : subjID}, function (d) {console.log(d)});
	demoTask.start();
	
}

// Uncomment the below lines if you want to ask surveys. Include survey names in the new survey brackets
// var surveyTask = new survey(['GES.txt','L2C.txt']);
// surveyTask.nextTask = function(){demoTask.start();}

var demoTask = new demo();
demoTask.info['age']['include']=true; //CHANGEME (IF YOU WANT)
demoTask.info['mouse']['include']=false; //CHANGEME (IF YOU WANT)
demoTask.info['gender']['include']=true; //CHANGEME (IF YOU WANT)
demoTask.info['english']['include']=false; //CHANGEME (IF YOU WANT)
demoTask.info['hispanic']['include']=true; //CHANGEME (IF YOU WANT)
demoTask.info['race']['include']=true; //CHANGEME (IF YOU WANT)
demoTask.height= 'auto';
demoTask.width= '1000px';
demoTask.background_color='#B8DBFF';

// Change the main splash screen instructions here:
var consentTitle = ['Study on Perceiving People'];

var consentText = [
// each separate block of text will be separated by newlines
// add or remove blocks as desired
	'Welcome to the experiment! Thank you for your participation.',
    	'In this experiment, you will be presented with 80 photographs of different people. Your task is to rate these different photographs based on how attractive you think they are',
    	'This task will take approximately 6 minutes to complete, although you will be given one hour to complete the task and enter your code into Mechanical Turk.'
	]; 
var consentBold = [ 
// each separate block of text will be separated by newlines
// add or remove blocks as desired
	'Please DO NOT use your browser\'s back or reload buttons!',
	'You will receive the code for Mechanical Turk at the end of the study.'
	];
// You can change how they display by altering the "type" below (e.g. h1/h2/h3/p, etc.)
// Writes text to splash page and adds a button to start the first task
postInstructions([
		wrap([consentTitle,'h3']),
		wrap([consentText,'p','.consent']), 
		wrap([consentBold,'h3','.instructions'])],
		voteTask); // Make sure you put your first task here

// Change task-specific information here
voteTask.name = "body_att";
voteTask.prompt="How attractive do you think this person is?";
voteTask.instructions='In the following task, please rate how attractive each person is.';
voteTask.trialScale = ["Not at all attractive", "", "", "Somewhat attractive", "", "", "Very attractive"];

// Provide the full list of stimuli you would like to randomly sample from
var picList = ['01_BODY_AS_1.png',
'01_BODY_AS_2.png',
'01_BODY_BL_1.png',
'01_BODY_BS_1.png',
'01_BODY_LL_1.png',
'01_BODY_LS_1.png',
'01_BODY_WL_1.png',
'01_BODY_WS_1.png',
'02_BODY_AL_1.png',
'02_BODY_BL_1.png',
'02_BODY_BS_1.png',
'02_BODY_LL_1.png',
'02_BODY_LS_1.png',
'02_BODY_WL_1.png',
'02_BODY_WS_1.png',
'02_BODY_WS_2.png',
'03_BODY_AL_1.png',
'03_BODY_AS_1.png',
'03_BODY_BL_1.png',
'03_BODY_BS_1.png',
'03_BODY_LL_1.png',
'03_BODY_LS_1.png',
'03_BODY_WL_1.png',
'03_BODY_WS_1.png',
'04_BODY_AL_1.png',
'04_BODY_AS_1.png',
'04_BODY_BL_1.png',
'04_BODY_BS_1.png',
'04_BODY_LL_1.png',
'04_BODY_LS_1.png',
'04_BODY_WL_1.png',
'04_BODY_WS_1.png',
'05_BODY_AL_1.png',
'05_BODY_AS_1.png',
'05_BODY_BL_1.png',
'05_BODY_BS_1.png',
'05_BODY_LL_1.png',
'05_BODY_LS_1.png',
'05_BODY_WL_1.png',
'05_BODY_WS_1.png',
'06_BODY_AS_1.png',
'06_BODY_BL_1.png',
'06_BODY_BS_1.png',
'06_BODY_LL_1.png',
'06_BODY_LS_1.png',
'06_BODY_LS_2.png',
'06_BODY_WL_1.png',
'06_BODY_WS_1.png',
'07_BODY_BL_1.png',
'07_BODY_BL_2.png',
'07_BODY_BS_1.png',
'07_BODY_LL_1.png',
'07_BODY_LS_1.png',
'07_BODY_LS_2.png',
'07_BODY_WS_1.png',
'07_BODY_WS_2.png',
'08_BODY_AS_1.png',
'08_BODY_BL_1.png',
'08_BODY_BL_2.png',
'08_BODY_BS_1.png',
'08_BODY_LS_1.png',
'08_BODY_LS_2.png',
'08_BODY_WS_1.png',
'08_BODY_WS_2.png',
'09_BODY_AS_1.png',
'09_BODY_AS_2.png',
'09_BODY_BL_1.png',
'09_BODY_BS_1.png',
'09_BODY_BS_2.png',
'09_BODY_LL_1.png',
'09_BODY_WL_1.png',
'09_BODY_WS_1.png',
'10_BODY_BL_1.png',
'10_BODY_BL_2.png',
'10_BODY_BS_1.png',
'10_BODY_BS_2.png',
'10_BODY_LS_1.png',
'10_BODY_LS_2.png',
'10_BODY_WS_1.png',
'10_BODY_WS_2.png',
'11_BODY_AS_1.png',
'11_BODY_BL_1.png',
'11_BODY_BS_1.png',
'11_BODY_BS_2.png',
'11_BODY_WL_1.png',
'11_BODY_WS_1.png',
'11_BODY_WS_2.png',
'12_BODY_BL_1.png',
'12_BODY_BL_2.png',
'12_BODY_BS_1.png',
'12_BODY_LL_1.png',
'12_BODY_LS_1.png',
'12_BODY_LS_2.png',
'12_BODY_WL_1.png',
'12_BODY_WS_1.png',
]; // You can use pictures or words

//this is a shuffle function that rearranges an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Here, we define our array of stimuli as a randomly shuffled version of the list
picList = shuffle(picList);

// This command truncates the length of the array (i.e., the number of trials you want each participant to see
if (picList.length > 80) { //CHANGE this number to the number of trials you want 
	picList.length = 80; //CHANGE this number to the number of trials you want
}

// This command defines the voteTask array as the random subset that is defined above
voteTask.picArray = picList.slice();

// These are all completely optional for styling
voteTask.color = 'black';
voteTask.background_color = '#B8DBFF';
voteTask.picHeight = '500px'; 
voteTask.width = '1000px';
voteTask.height = '800px';

// Preload images as desired
// The function takes an array of pictures
// or an array of arrays
//donePreloading();
preloadImages_new(voteTask.picArray, function(){donePreloading();});
voteTask.setCounter = function () {
	voteTask.counter += 1;
	$( "#progressbar" ).progressbar({ value: voteTask.counter , max : voteTask.length})
		.show();
}
window.onload = function () {
	$(function() { $( "#progressbar" ).progressbar({ value: 0, max: voteTask.length})
		.height('5px'); });
	demoTask.writeHTML(); 
	
	$('.instructions input').mouseenter(function() {
		$('.instructions input').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
	});	
	$('.instructions input').mouseleave(function() {
		$('.instructions input').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
	});	
	$('input').click(function() {
		$('.instructions h3:first-child').css({
			'font-size':'1.2em', 'padding':'25px', 'text-align':'left'
		});
		$('#begin').mouseenter(function() {
			$('#begin').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$('#begin').mouseleave(function() {
			$('#begin').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});	
	});
};
