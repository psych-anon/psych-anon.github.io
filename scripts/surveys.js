"use strict";

function Survey () {
	this.name = "";
	this.scale = 0;
	this.scaleList = [];
	this.instructions = "";
	this.secondaryInstructions = "";
	this.secondaryInstructionsArray = [];
	this.questionArray = [];
	this.mustBeMale = false;
	this.allowMultiple = false;
	this.counter = 1;
	this.setCounter = function(newCount){
		this.counter = newCount;
	}
}

function survey (survey_array) {
	var thisTask = this;
	this.counter = 0;
	this.Survey = new Survey();
	this.timeout = 400;
	this.surveyList = survey_array;
	this.surveyLocation = root_path + "/surveys/";
	this.surveyArray = [],
		this.totalSurveys = 0,
		this.surveysToDisplay = [],
		this.listOfSurveyFiles = [],
		this.surveys = [],
		this.currentSurvey = {};
	this.surveyObjs = [],

		this.setCounter = function () {

		}
	this.init = function() {
		$('body>div').hide();
		this.writeHTML();
		$('.survey').css('background-color','white');
		var thisTask = this;
		$('#surveyInstructionsButton')
			.unbind('click')
			.on('click',function(){
				thisTask.startSurvey();
			});		
		$('#surveyNext')
			.unbind('click')
			.on('click',function(){
				thisTask.nextClick();
			});
	}

	this.start = function () {
		this.init();
		this.importSurveys();
		//this.surveyObjs.shuffle(); 
		this.surveysToDisplay = this.surveyObjs;
		this.loadSurvey();
		$('.survey').show();
	}

	//Imports survey files listed in your surveyList variable.
	//Parses surveys and stores them in a Survey object.
	//Stores each survey object in an array.
	this.importSurveys = function () {
		var i, x, y, tempScaleList, tempSplit;
		var thisTask = this;
		$.ajaxSetup({async : false});
		//Fetches list of surveys
		thisTask.listOfSurveyFiles = thisTask.surveyList;
		$.post(root_path + 'saveSurveys.php', {subjid : subjID, response : "Response", survey : "Survey", question : "Question", studyName : study}, function () {});
		thisTask.totalSurveys = thisTask.listOfSurveyFiles.length;
		//Fetches actual survey data
		for (x = 0; x < thisTask.totalSurveys; x++) {
			jQuery.get(thisTask.surveyLocation + thisTask.listOfSurveyFiles[x]).success(function (data) {thisTask.surveys[x] = data.split("\n"); });
			thisTask.surveyObjs[x] = new Survey();
			tempScaleList = [];
			//Parses survey data
			for (y = 0; y < thisTask.surveys[x].length; y++) {
				tempSplit = thisTask.surveys[x][y].split("---");
				try {
					var key = tempSplit[0];
					tempSplit[1] = $.trim(tempSplit[1]);
				} catch (err) {
					var key = '';
				}
				switch(key.toLowerCase()){
					case "scale":
						thisTask.surveyObjs[x].scale = parseInt(tempSplit[1]);
						break;

					case "name":
						thisTask.surveyObjs[x].name = tempSplit[1];
						break;

					case "instructions":
						thisTask.surveyObjs[x].instructions = tempSplit[1];
						break;

					case "allowmultiple":
						thisTask.surveyObjs[x].allowMultiple = tempSplit[1];
						break;
										
					case "secondaryinstructions":
						thisTask.surveyObjs[x].secondaryInstructions = tempSplit[1];
						break;

					case "question":
						if (tempSplit.length == 2){
							thisTask.surveyObjs[x].questionArray.push(tempSplit[1]);
							thisTask.surveyObjs[x].secondaryInstructionsArray.push('');
						} else{
							thisTask.surveyObjs[x].questionArray.push(tempSplit[1]+'<br>');
							thisTask.surveyObjs[x].secondaryInstructionsArray.push(tempSplit.slice(2).join('<br>'));
						}
						break;

					case "":
						break;

					case "mustbemale":
						if (tempSplit[1].toLowerCase() == 'true') {
							thisTask.surveyObjs[x].mustBeMale = true;
						}
						break;

					default:
						if (key.slice(0, 5).toLowerCase() === "scale") {
							tempScaleList.push([parseInt(key.slice(5), 10), tempSplit[1]]);
						} else { 
							alert("Invalid format: " + surveys[x][y]);
						}
				}
			}
			thisTask.surveyObjs[x].questionArray.shuffle();
			for (i = 0; i < tempScaleList.length; i++) {
				if (tempScaleList[i][1].length < 11) {tempScaleList[i][1] = "<br>" + tempScaleList[i][1];}
				thisTask.surveyObjs[x].scaleList[tempScaleList[i][0]-1] = tempScaleList[i][1]; }
		}
		$.ajaxSetup({async : true});
	};


	this.loadSurvey = function () {
		var thisTask = this;
		$('#surveyNext').hide();
		$('body>div').hide();
		if (typeof(thisTask.surveysToDisplay[0]) === "object") {
			thisTask.currentSurvey = thisTask.surveysToDisplay[0];
			thisTask.surveysToDisplay.splice(0,1);
			if (thisTask.currentSurvey.mustBeMale && demoGender.toLowerCase() === "female") {
				loadSurvey();
			} else { 
				$('div.surveyInstructionsScreen').show();
				$("#surveyInstructions").html("Instructions: " + thisTask.currentSurvey.instructions);
				$("#surveySecondaryInstructions").html(thisTask.currentSurvey.secondaryInstructions);
				$('#surveyInstructions').show();
				$('div.surveyScreen').hide();
				$('div.survey').show();
			}
		} else {
			this.nextTask();		
		}
	}


	this.startSurvey = function () {
		$('div.surveyInstructionsScreen').hide();
		$('div.surveyScreen').show();
		$('div#surveyAnswersContainer').show();
		this.surveyQuestion();
	}

	this.surveyQuestion = function () {
		if (typeof(this.currentSurvey.questionArray[0]) === "string") {
			$("#surveyPrompt").html(this.currentSurvey.questionArray[0]);
			this.currentSurvey.currentQuestion= this.currentSurvey.questionArray[0];
			console.log(this.currentSurvey.currentQuestion);
			this.currentSurvey.questionArray.splice(0,1);
			$("#surveySecondaryInstructions").html(this.currentSurvey.secondaryInstructions);
			if (this.currentSurvey.secondaryInstructionsArray.length > 0){
				$("#surveySecondaryInstructions").append(this.currentSurvey.secondaryInstructionsArray[0]);
				this.currentSurvey.secondaryInstructionsArray.splice(0,1);
			} 
			this.displaySurveyAnswers();
		} else{ 
			this.loadSurvey();
		}
	}

	this.displaySurveyAnswers = function () {
		var $surveyAnswers = $('#surveyAnswers');
		var thisTask = this;
		$surveyAnswers.empty();
		for (var i = 1; i <= parseInt(this.currentSurvey.scale); i++) {
			if (typeof(this.currentSurvey.scaleList[i - 1]) === 'string') {
				$surveyAnswers.append('<td id="surveyAnswer" class="surveyAnswer" onclick="return false;surveyOnClick(' + i + ')">' + this.currentSurvey.scaleList[i - 1] + '</p>');
			} else{
				$surveyAnswers.append('<td id="surveyAnswer" class="surveyAnswer" onclick="return false;surveyOnClick(' + i + ')"><br><br></p>')
			}
		}
		$('td#surveyAnswer.surveyAnswer').on('click',function(){
			$(this).toggleClass('selected');
			$('.selected').css('background-color','blue');
			$('.surveyAnswer').not('.selected').css('background-color','rgb(225,225,225)');
			if(!thisTask.currentSurvey.allowMultiple){
				thisTask.nextClick();
			}
		});
		if(thisTask.currentSurvey.allowMultiple){
			$('#surveyNext').show();
		}
	}

	this.nextClick = function (){
		var ratingNum = '';
		$.each($('td#surveyAnswer.surveyAnswer'),function(i,button){
			if($(button).attr('class').indexOf('selected')>-1){
				ratingNum += (i+1);
			} 
		});
		if (ratingNum != ''){
			this.advanceQuestion(ratingNum);
		} else {
			alert('You must select at least one choice!');
		}
	}

	this.nextTask = function () {
		$('body>div').hide();
		$('#participantCode').html(subjID);
		$('.demographics').show();
	}

	this.advanceQuestion = function (ratingNum){
		$.post(root_path + 'saveSurveys.php', {subjid : subjID, response : ratingNum, survey : this.currentSurvey.name, question : this.currentSurvey.currentQuestion, studyName : study}, function () {});
		$("#surveyAnswers").hide();
		this.currentSurvey.setCounter(this.currentSurvey.counter + 1);
		setTimeout(function () {$("#surveyAnswers").show();}, this.timeout);
		this.surveyQuestion();
	}


	this.writeHTML = function () {
		$('.survey').remove();
		var $surveys = $('<div></div>');
		$surveys.hide().addClass('survey');
		$surveys.append('<div class="surveyInstructionsScreen"><h2 id="surveyInstructions"></h2>\
				<input id="surveyInstructionsButton" type="button" value="Proceed">\
				</div>\
				<div class="surveyScreen">\
				<h2 id="surveyPrompt"></h2>\
				<div id="surveyAnswersContainer" style="height:70px">\
				<ul id="surveyAnswers">\
				</ul>\
				<table><tbody><tr><td id="surveyAnswers"></td></tr></tbody></table>\
				</div>\
				<p id="surveySecondaryInstructions"></p>\
				<h1 id="surveyNext" style="width:100px;background-color:rgb(225,225,255);cursor:pointer;text-align:center;border:1px;border-color:black;border-style:solid;border-radius:5px;box-shadow: 1px 1px 5px #888888;display:none">Next</h1>\
				</div>');
		$('body').append($surveys);
		$('#surveyInstructionsButton').mouseenter(function() {
			$('#surveyInstructionsButton').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$('#surveyInstructionsButton').mouseleave(function() {
			$('#surveyInstructionsButton').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});	
	}
}
