"use strict";

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

function voteMultipleObj(prompts) {
	thisTask = this;
	this.saveFile = 'save.php';
	this.prompts = shuffle(prompts);
	this.csvHeader = 'SubjID,Study,Name,Trial,Picture,' + Array.prototype.join.call(this.prompts, ',') + ',Response Time,Instructions Time\n';
	this.answerWidth = '80px';
	this.answerHeight = '30px';
	this.$frame = $('.trial');
	this.$prompt = $('<h2 id="prompt" style="display:none">Rate this person based on your first impression</h2>');
	this.$stim = $('<table id="imageTable" style="margin-left:auto;margin-right:auto"><tr><td id="image"></td></tr></table>');
	this.$answerDiv = $('<div id="answerDiv" style="display:none"><table><tr></tr></table></div>');
	this.folder = 'ratings';
	this.suffix = '_ratings';

	this.setThisTask = function () {
		thisTask = this;
	}
	
	this.setCSS = function () {
		this.$frame
			.css('background-color',this.background_color)
			.css('color',this.color)
			.height(this.height);
		$('#imageTable').css('margin-top','3vh')
			.css('margin-bottom','3vh');
		$('#answerDiv').css('height','40vh')
			.css('width', '900px')
			.css('overflow-y', 'visible');
	}
	
	this.setClickEvents = function () {
		$('#begin').one('click', function () {thisTask.setInstructionsTime()});
		$('#begin').one('click', function () {thisTask.startTask()});
	}

	this.hideParts = function () {
		$('#answers').hide();
		$('#answerDiv').hide();
		$('#image').hide();
		$('#prompt').hide();
	}

	this.showParts = function () {
		$('#answers').show();
		$('#answerDiv').show();		
		$('#answerDiv').scrollTop(0);
		$('#image').show();
		$('#prompt').show();
	}

	this.writeStim = function (stim) {
		if (isPicFiletype(stim)){
			var $toAppend = this.appendImg(stim);
		} else {
			var $toAppend = this.appendP(stim);
		}
		$('#image').empty()
			.html($toAppend)
			.css('height', this.picHeight);
	}

	this.writeLine = function () {
		this.csvLine = subjID + ",";
		this.csvLine += study + ",";
		this.csvLine += this.name + ",";
		this.csvLine += this.counter + ",";
		this.csvLine += this.picsToDisplay[0] + ",";
		this.csvLine += Array.prototype.join.call(this.currentResp, ',') + ",";
		this.csvLine += this.trialRT + ",";
		this.csvLine += this.instructionsTime + "\n";
	}

	this.setAnswerCSS = function () {
		$('#prompt').css('margin-left','auto').css('margin-right','auto');
		$('.answer').width(this.answerWidth).height(this.answerHeight);
		$('#answerDiv>table').css('margin-left','auto')
			.css('margin-right','auto');
	}

	this.writeAnswers = function (trialScale) {
		var $answers = $('<tr></tr>');
		for (var j = 0; j < this.prompts.length; j++) {
			$answers.append($('<tr></tr>').html(this.prompts[j]));
			var $tr = $('<tr></tr>');
			$tr.addClass(j);
			for (var i = 1; i <= this.trialScale.length; i++) {
				var $td = $('<td class="answers"></td>');
				$td.attr('id', i)
					.html(this.trialScale[i-1])
					.addClass('answer')
					.on('click', function () {
						$(this).siblings().removeClass('selected')
						$(this).addClass('selected')
						$('.selected')
						.css('box-shadow','inset 0px 0px 2px 2px #FFD859')
						.css('-webkit-box-shadow','inset 0px 0px 2px 2px #FFD859')
						.css('-moz-box-shadow','inset 0px 0px 2px 2px #FFD859');
					$('#answerDiv td').not('.selected')
						.css('box-shadow','inset 0px 0px 0px 0px #FF0000')
						.css('-webkit-box-shadow','inset 0px 0px 0px 0px #FFD859')
						.css('-moz-box-shadow','inset 0px 0px 0px 0px #FFD859');
					})
				.on('mouseover', function () {
					$(this).css('background-color', 'rgb(0,0,175)')
					.css('color','white');})
					.on('mouseout', function () {
						$(this).css('background-color', 'rgb(225,225,225)')
						.css('color','black');})
					$tr.append($td);
			};
			$answers.append($tr);
		}
		$('#answerDiv>table').html($answers);
		var $next = $('<input type="button" value="Next" />');
		$next.on('click', function () {
			if ($('.selected').length == thisTask.prompts.length){
				var resps = $('.selected').map(function(i, td) {return $(td).attr('id');})
				thisTask.makeResponse(resps);
				$('td').removeClass('selected')
						.css('box-shadow','inset 0px 0px 0px 0px #FFD859')
						.css('-webkit-box-shadow','inset 0px 0px 0px 0px #FFD859')
						.css('-moz-box-shadow','inset 0px 0px 0px 0px #FFD859');
		; }
		});
		$next.mouseenter(function() {
			$next.css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$next.mouseleave(function() {
			$next.css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});
		$('#answerDiv').append($next);

	}

	this.shuffleprompts = function () {
		this.prompts = shuffle(prompts);
		prompts = shuffle(prompts);
	};

	this.makeResponse = function (resp) {
		this.setCurrentResp(resp);
		this.checkAcc();
		this.$frame.hide();
		this.setTrialRT();
		this.setCounter(this.counter + 1);
		this.writeLine();
		this.writeCSV(true);
		this.dequeueTrial();
		this.shuffleprompts();
		this.loadTrial();
	}

}
voteMultipleObj.prototype = new Task();
