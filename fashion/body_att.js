"use strict";
var subjID, IP, mTurkID;

//Change at your discretion
var study = "ratings/body_att_sally"; //**********CHANGEME**********
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

// Uncomment the below lines if you want to ask surveys. Include survey names in the new survey brackets
var surveyTask = new survey(['datacheck.txt']);
surveyTask.nextTask = function(){demoTask.start();}

surveyTask.background_color = '#D4E2EB';

// NEW FEATURE OF MULTIPLE PROMPTS
// this set of prompts (prompts1) will be randomly ordered per participant (but not per trial)
var prompts = ['How attractive is this person?']
var voteTask = new voteMultipleObj(prompts);
voteTask.nextTask = function(){surveyTask.start();}



var demoTask = new demo();
demoTask.info['age']['include']=true; //
demoTask.info['mouse']['include']=false; //
demoTask.info['gender']['include']=true; //
demoTask.info['sexOrientation']['include']=true; //
demoTask.info['english']['include']=false; //
demoTask.info['hispanic']['include']=true; //
demoTask.info['race']['include']=true; //
demoTask.info['recognize_faces']['include']=true; //
demoTask.info['whatResponseStyle']['include']=true; //
demoTask.height= 'auto';
demoTask.width= '1000px';
demoTask.background_color='#D4E2EB';

// Change the main splash screen instructions here:
var consentTitle = ['Test a McGill App Under Development'];

var consentText = [
// each separate block of text will be separated by newlines
// add or remove blocks as desired
	'Evaluate people on a face rating app on various traits.',
    'Thank you for expressing interest in our app development study.',
	'Our research explores how people form impressions of others from their facial appearance.',
	'In this study, you will be testing a modified version of a Montreal-based face rating app developed by McGill students, researchers at McGill, and a Montreal-based technology company. The app is currently in the alpha stage of testing, and we are collecting face rating data to improve our prediction algorithms. Faces are everywhere in daily life, and we are interested in how people identify characteristics of others from their faces.',

    'While we are using this data to improve our app, you will not be using the app itself at this point.',
    'You will be shown faces of real people, and asked to share your impressions of them by rating them on a few traits. To move onto the next profile, complete all the ratings and click NEXT.',
 	'This process will take approximately ~30 minutes, although you will be given one hour to complete the study.'
	]; 
var consentBold = [ 
// each separate block of text will be separated by newlines
// add or remove blocks as desired
	'Please DO NOT use your browser\'s back or reload buttons!',
	'Please only use an external MOUSE and not your laptop\'s trackpad.',
	'To help us make sense of our findings, please form these impressions as you realistically would in everyday life. After the study, you will be asked to complete a short demographic survey and give feedback on your experience.'
	];
// You can change how they display by altering the "type" below (e.g. h1/h2/h3/p, etc.)
// Writes text to splash page and adds a button to start the first task
postInstructions([
		wrap([consentTitle,'h3']),
		wrap([consentText,'p','.consent']), 
		wrap([consentBold,'h3','.instructions'])],
		voteTask); // Make sure you put your first task here

// **********CHANGEME********** Change task-specific information here
voteTask.name = "body_att_sally"; // CHANGEME
// Set the scale and instructions for the first set of prompts (prompt1)
voteTask.prompt="What's your first impression of this person?";
voteTask.instructions=['Evaluate people on a face rating app on various traits.'];
voteTask.trialScale = ["Not at all","  ","  ","Neutral","  ","  ","Very much"]; 


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

// Replace this list with the new stim that we're using (OLD STATIC STIMULI LIST. SEE BELOW FOR RANDOMLY SELECTING X STIM FROM A POOL)
// voteTask.picArray = ['01_F_HA.jpg', 'AF05NES_F.jpg', 'AM26NES_F.jpg', 'AM34NES_F.jpg', 'ryan.jpg']; 
// You can use pictures or words 


// Provide the full list of stimuli you would like to randomly sample from, from each social category:
var picListWF = [
'01_BODY_AS_1.png',
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
];

// Randomly shuffle face stimuli for each group
picListWF = shuffle(picListWF);

// *****CHANGEME****** create an array of all stimuli groups
var picList = [picListWF]

// Truncate the length of the array for each group 
var PicListLength = 60 // ****CHANGEME**** change this to the number of stimuli from each group that you want to present

for (let i = 0; i < picList.length; i++ ) { // Iterate through each stimuli set and truncate
	if (picList[i].length > PicListLength) {
		picList[i].length = PicListLength;
	}
}; 
picList = [].concat.apply([], picList); // flatten nested array into 1-d array
picList = shuffle(picList) // reshuffle the finalized stimuli set, with equal distribution of stimuli from each group
voteTask.picArray = picList.slice(); // append to Task

// These are all completely optional for styling
voteTask.color = 'black';
voteTask.background_color = '#D4E2EB';
voteTask.picHeight = '450px'; 
voteTask.width = '1000px';
voteTask.height = '1111px';

// Preload images as desired
// The function takes an array of pictures
// or an array of arrays
//donePreloading();
preloadImages_new(voteTask.picArray, function(){donePreloading();});
voteTask.setCounter = function () {
	voteTask.counter += 1;
//	$( "#progressbar" ).progressbar({ value: voteTask.counter , max : voteTask.length})
	//	.show();
}
window.onload = function () {
	//$(function() { $( "#progressbar" ).progressbar({ value: 0, max: voteTask.length })
	//	.height('5px'); });
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
