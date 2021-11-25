"use strict";

function Task() {
	thisTask = this;
	this.background_color = 'white';
	this.color = 'black';
	this.frameClass = 'trial';
	this.parentFrame = 'body';
	this.$frame = $('');
	this.beginButton = $('<input type="button" id="begin" value="Begin" />');
	this.instructions = '';
	this.name = '';
	this.condition = '';
	this.continue = true;
	this.badTrials = 0;
	this.trialScale = [""];
	this.timeout = 500;
	this.primeTimeout = 250;
	this.ITI = 500;
	this.answerTimeout = 500;
    this.endTrialTimer = '';
    this.endTrialTimeout = 0;
	this.$choices = '';
	this.height = '600px';
	this.$prompt = '';
	this.$stim = '';
	this.$stim2 = '';
	this.$feedback = '';
	this.$answerDiv = '';
	this.$button = '';
	this.fontSize = 'xx-large';
	this.instructionsStart = 0;
	this.instructionsEnd = 0;
	this.instructionsTime = 0;
	this.blockNum = 1;
	this.picArray = [];
	this.isRandom = true;
	this.picsToDisplay = [];
	this.picHeight = '400px';
	this.trialStart = 0;
	this.trialEnd = 0;
	this.trialRT = 0;
	this.length = 0;
	this.counter = 0;
	this.breakEvery = 0;
	this.saveFile = 'save.php';
	this.prefix = this.suffix = this.folder = this.name = '';
	this.csvHeader = '';
	this.width = 800;
	this.currentResp = '';
	this.currentStim = [];
	this.nextTask = function () {};
	this.csvLine = '';
	this.randomization = [];
	this.study = '';
	
	this.setThisTask = function () {
		thisTask = this;
	}	
	
	this.setCounter = function (newVal) {
		thisTask.counter = newVal;
	}

	this.start = function () {
		this.hideAll();
		this.init();
		//this.$frame.show();
		this.instructionsStart = getUTC();
		$('.instructions').show();
	}

	this.setInstructionsTime = function () {
		this.instructionsEnd = getUTC();
		this.instructionsTime = this.instructionsStart - this.instructionsEnd;
	}

	this.setTrialRT = function () {
		this.trialEnd = getUTC();
		this.trialRT = this.trialStart - this.trialEnd;
	}

	this.checkTrialRT = function () {
		if (this.timeoutTime > 0 && this.trialRT > this.timeoutTime)
		{
			this.continue = false;
			this.timeoutAlert();
		}
	}

	this.timeoutAlert = function () {
		this.continue = true;
	}

	this.hideAll = function () {
		$('body div').hide();
	}

	this.setLength = function (trials) {
		this.length = trials.length;
	}

	this.init = function () {
		preloadImages_new(this.picArray,function(){});
		this.setThisTask();
		this.writeHTML();
		this.writeForm();
		this.fillDisplayArray();
		this.writeAnswers();
		this.writeInstructions();
		this.setLength(this.picsToDisplay);
		this.writeCSV(false);
		this.setCSS();
		this.setAnswerCSS();
		this.setClickEvents();
	}

	this.writeCSV = function (isItTrial) {
		var toWrite = '';
		if (!isItTrial) {
			toWrite = this.csvHeader;
		} else {
			toWrite = this.csvLine;

		}
		$.post(root_path + this.saveFile, {subjid : subjID, studyName: study, suffix : this.suffix, prefix : this.prefix, folder: this.folder, name : this.name, toWrite : toWrite});
	}

	this.fillDisplayArray = function () {
		this.picsToDisplay = this.picArray;
		if (this.isRandom == true) {
			this.picsToDisplay.shuffle();
		}
		this.length = this.picsToDisplay.length;
	}

	this.writeHTML = function () {
		if ($('.' + this.frameClass).length > 0) {
			this.$frame = $('.' + this.frameClass);
			this.$frame.empty()
				.width(this.width)
				.height(this.height);
		} else {
			this.$frame = $('<div></div>');
			this.$frame.addClass(this.frameClass)
				.width(this.width + 'px')
				.height(this.height);
			$(this.parentFrame).append(this.$frame);
		}
		if ($('.break').length < 1) {
			var $break = $('<div></div>');
			$break.addClass('break');
			$('body').append($break);
		}
		this.parsePrompt();
		this.$frame.append(this.$choices)
			.append(this.$prompt)
			.append(this.$stim)
			.append(this.$stim2)
			.append(this.$feedback)
			.append(this.$answerDiv)
			.append(this.$button);
		this.$frame.hide();
	}

	this.writeForm = function () { }

	this.parsePrompt = function () {
		if (this.prompt != undefined) {
			this.$prompt.html(this.prompt);
		}
	}

	this.showPrime = function () { }

	this.appendStim = function (stim) {
		if (isPicFiletype(stim)){
			return this.appendImg(stim);
		} else {
			return this.appendP(stim);
		}
	}

	this.appendImg = function (stim) {
		var $toAppend = $('<img />');
		$toAppend.attr('src','pictures/' + stim)
			.attr('id','pic')
			.css('margin-left','auto')
			.css('margin-right','auto')
			.height(this.picHeight)
			.width('auto');
		return $toAppend;
	}

	this.appendP = function (stim) {
		var $toAppend =	$('<p></p>');
		var $strong = $("<strong></strong");
		$strong.html(stim);
		$toAppend.attr('id','pic')
			.width('100%')
			.css('text-align','center')
			.append($strong)
			.css('color',this.color)
			.css('margin-left','auto')
			.css('margin-right','auto')
			.css('margin-bottom','0px')
			.css('margin-top','0px')
			.css('height', this.picHeight)
			.css('line-height', this.picHeight)
			.css('width', '100%')
			.css('font-size','xx-large');
		return $toAppend;
	}

	this.writeInstructions = function () {
		$(".instructions").empty()
			.append(wrap([[this.instructions],'h3']))
			.append(this.beginButton);
	}

	this.setAnswerCSS = function () { }

	this.setCSS = function () {
		this.$frame
			.css('background-color',this.background_color)
			.css('color',this.color)
			.height(this.height);
		$('#imageTable').css('margin-top','50px')
			.css('margin-bottom','50px');
		$('.instructions h3:first-child').css({
			'font-size':'1.2em', 'padding':'25px', 'text-align':'left'
		});
	}

	this.setClickEvents = function () {
		$('#begin').one('click', function () {thisTask.setInstructionsTime()});
		$('#begin').one('click', function () {thisTask.startTask()});
		$('#begin').mouseenter(function() {
			$('#begin').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$('#begin').mouseleave(function() {
			$('#begin').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});	
	}

	this.startTask = function () {
		this.hideAll();
		this.loadTrial();
	}

	this.checkTrial = function () {
		try {
			if (this.picsToDisplay[0] == undefined) {
				return false;
			}
		} catch (err) {
			return false;
		}

		if (this.breakEvery > 0 && this.counter % this.breakEvery == 0) {
			this.breakNow = true;
			return false;
		} else {
			this.breakNow = false;
			return true;
		}
	}


	this.loadTrial = function () {
		this.continue = true;
		if (this.checkTrial()) {
			this.showTrial();
		} else if (this.breakNow) {
			this.showBreak();
		} else {
			this.endTask();
		}
	}

	this.showTrial = function () {
		this.hideParts();
		this.currentStim = this.picsToDisplay[0];
		this.writeStim(this.currentStim);
		this.$frame.show();
		this.startTrial();
	}

	this.startTrial = function () {
		setTimeout(function () {
			thisTask.showParts();
			thisTask.trialStart = getUTC();
			thisTask.setKeyListeners();
            thisTask.setEndTrialTimer();
		}, this.answerTimeout);
	}

this.setEndTrialTimer = function () {
    if (this.endTrialTimeout > 0){
        this.endTrialTimer = setTimeout(function(){
            thisTask.makeResponse("TO");
        }, this.endTrialTimeout);
    }
}
    
	
	this.setKeyListeners = function () {}
	
	this.showBreak = function () {
		var $breakText = $('<h3></h3>').html(this.breakText);
		var $breakButton = $('<input type="button" />')
			.attr('value','Continue')
			.one('click',function () {
				thisTask.showTrial();
			});
		$('.break').empty()
			.append($breakText)
			.append($breakButton)
			.show();
	}
	
	this.endTask = function() {
		this.count_finished();
		this.nextTask();
	}

	this.finished = function (i) {
		$.post(root_path + 'num_finished.php', {
			ident : i, 
			table : this.study, 
			pic : this.randomization[i]
		});
	}

	this.count_finished = function () {
		for (var i = 0; i < this.randomization.length; i++){
			this.finished(i);
		}
	}

	this.random_from_arrays = function (i, from_array, to_array) {
		var ret_val;
		var thisTask = this;
		$.ajax({async : false});
		$.get(root_path + 'randomize_lists.php', {table : this.study, ident : i}, function (data) {
			//ret_val = data;
		}).done(function(ret_val){
			thisTask.randomization[i] = ret_val;
			to_array.push(from_array[i][ret_val]);
			to_array.shuffle();
		});
	}

	this.hideParts = function () { }

	this.showParts = function () { }

	this.writeStim = function () { }

	this.showStim = function () { }

	this.dequeueTrial = function () {
		this.picsToDisplay.splice(0,1);
	}

	this.writeAnswers = function () { }

	this.setCurrentResp = function (resp) {
		this.currentResp = resp;
	}

	this.checkAcc = function () {}

	this.makeResponse = function (resp) {
        clearTimeout(this.endTrialTimer);
		this.setCurrentResp(resp);
		this.checkAcc();
		this.$frame.hide();
		this.setTrialRT();
		this.setCounter(this.counter + 1);
		this.writeLine();
		this.writeCSV(true);
		this.dequeueTrial();
		this.checkTrialRT();
		if (this.continue == true)
		{
			this.loadTrial();
		}
	}

	this.writeLine = function () { }

	this.nextTask = function () {
		this.hideAll();
		$("#participantCode").html(subjID);
		$('.thanks').show();
		try {
			writeToJSON();
		} catch (err) {
		}
	}
}
