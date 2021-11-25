"use strict";

function voteObj() {
	thisTask = this;
	this.saveFile = 'save.php';
	this.csvHeader = 'SubjID,Study,Name,Trial,Picture,Rating,Response Time,Instructions Time\n';
	this.answerWidth = '80px';
	this.$frame = $('.trial');
	this.$prompt = $('<h2 id="prompt" style="display:none">Rate this picture</h2>');
	this.$stim = $('<table id="imageTable" style="margin-left:auto;margin-right:auto"><tr><td id="image"></td></tr></table>');
	this.$answerDiv = $('<div id="answerDiv" style="display:none"><table><tr></tr></table></div>');
	this.folder = 'ratings';
	this.suffix = '_ratings';

	this.setThisTask = function () {
		thisTask = this;
	}

	this.setClickEvents = function () {
		$('#begin').one('click', function () {thisTask.setInstructionsTime()});
		$('#begin').one('click', function () {thisTask.startTask()});
		$('.instructions h3:first-child').css({
			'font-size':'1.2em', 'padding':'25px', 'text-align':'left'
		});
		$('#begin').mouseenter(function() {
			$('#begin').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$('#begin').mouseleave(function() {
			$('#begin').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});	
	}

	this.hideParts = function () {
		$('#answers').hide();
		$('#answerDiv').hide();
		$('#image').hide();
	}

	this.showParts = function () {
		$('#answers').show();
		$('#answerDiv').show();
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
		this.csvLine += this.currentResp + ",";
		this.csvLine += this.trialRT + ",";
		this.csvLine += this.instructionsTime + "\n";
	}

	this.setAnswerCSS = function () {
		$('#prompt').css('margin-left','auto').css('margin-right','auto');
		$('.answer').width(this.answerWidth);
		$('#answerDiv>table').css('margin-left','auto')
			.css('margin-right','auto');
	}

	this.writeAnswers = function (trialScale) {
		var $answers = $('<tr></tr>');
		for (var i = 1; i <= this.trialScale.length; i++) {
			var $td = $('<td class="answers"></td>');
			$td.attr('id', i)
				.html(this.trialScale[i-1])
				.addClass('answer')
				.on('click', function () {thisTask.makeResponse($(this).attr('id'));})
				.on('mouseover', function () {
					$(this).css('background-color', 'rgb(0,0,175)')
					.css('color','white');})
				.on('mouseout', function () {
					$(this).css('background-color', 'rgb(225,225,225)')
					.css('color','black');})
				$answers.append($td);
		};
		$('#answerDiv>table').html($answers);
	};
}
voteObj.prototype = new Task();
