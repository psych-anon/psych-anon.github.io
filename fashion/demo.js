"use strict";
var demoGender = '';

function demo() {
	thisTask = this;
	//this.$frame = $('<div class="demographics"></div>');
	this.frameClass = 'demographics';
	this.$prompt = $('<h2 id = "demographicsPrompt">Please enter the following demographic information</h2>');
	this.$stim = $('<form name="demographicForm" onsubmit="return false;" method="post"></form>');
	this.$button = $('<input id="submitDemo" type="submit" value="Continue" />');
	this.genderFirst = false;
	this.background_color = 'white';
	this.color = 'black';
	this.folder = 'demo';
	this.suffix = '_demo';
	this.toWriteHeader = 'SubjID,Study,';
	this.toWrite = '\n' + subjID + ',' + study + ',';
	this.writeInstructions = function () {
		$('.instructions').empty();
	}
	this.info = {
		"year":{
			"name":"year",
			"include":false,
			"type":"text",
			"warning":"REQyear",
			"HTML":"what year were you born?<p style=\"display:none\" class=\"required\" id = \"REQyear\"> This is a required field.</p><br><input type=\"text\" name=\"year\"><br><br>",
			"value":""
		},
		"age":{
			"name":"age",
			"include":true,
			"type":"text",
			"warning":"REQage",
			"HTML":"What is your age? (enter 999 if you prefer not to disclose)<p style=\"display:none\" class=\"required\" id = \"REQage\">This is a required field.</p><br><input type=\"text\" name=\"age\" ><br><br>",
			"value":""
		},
		"mouse":{
			"name":"mouse",
			"include":true,
			"type":"dropdown",
			"demo":"DEMOmouse",
			"warning":"REQmouse",
			"HTML":"Did you use an external mouse or a trackpad?<p style=\"display:none\" class=\"required\" id=\"REQmouse\">This is a required field.</p><br><select name=\"mouse\"><option value=\"\"></option><option value=\"Mouse\">Mouse</option><option value=\"Trackpad\">Trackpad</option><option value=\"Other\">Other</option></select><br><br>",
			"value":""
		},
		"gender":{
			"name":"gender",
			"include":true,
			"type":"radio",
			"demo":"DEMOgender",
			"warning":"REQgender",
			"HTML":"With which gender do you most identify?<p style=\"display:none\" class=\"required\" id=\"REQgender\">This is a required field.</p><br><input type=\"radio\" name=\"gender\" value=\"male\">Male<br><input type=\"radio\" name=\"gender\" value=\"female\">Female<br><input type=\"radio\" name=\"gender\" value=\"other\">Not otherwise specified<br><input type=\"radio\" name=\"gender\" value=\"decline\">I do not wish to provide this information<br><br>",
			"value":""
		},
		"language":{
			"name":"language",
			"include":false,
			"type":"text",
			"demo":"DEMOlanguage",
			"warning":"REQlanguage",
			"HTML":"<br><br>What is your native language?<p style=\"display:none\" class=\"required\" id = \"REQlanguage\">This is a required field.</p><br><input type=\"text\" name=\"language\"><br><br>",
			"value":""
		},
		"english":{
			"name":"english",
			"include":true,
			"type":"radio",
			"demo":"DEMOenglish",
			"warning":"REQenglish",
			"HTML":"Are you fluent in English?<p style=\"display:none\" class=\"required\" id=\"REQenglish\">This is a required field.</p><br><input type=\"radio\" name=\"english\" value=\"yes\">Yes<br><input type=\"radio\" name=\"english\" value=\"no\">No<br><br>",
			"value":""
		},
		"hispanic":{
			"name":"hispanic",
			"include":true,
			"type":"radio",
			"demo":"DEMOhispanic",
			"warning":"REQhispanic",
			"HTML":"Do you consider yourself to be Hispanic or Latino?<p style=\"display:none\" class=\"required\" id=\"REQhispanic\">This is a required field.</p><br><input type=\"radio\" name=\"hispanic\" value=\"hispanic\">Hispanic or Latino<br><input type=\"radio\" name=\"hispanic\" value=\"not\">Not Hispanic or Latino<br><input type=\"radio\" name=\"hispanic\" value=\"decline\">I do not wish to provide this information<br><br>",
			"value":""
		},
		"race":{
			"name":"race",
			"include":true,
			"type":"checkbox",
			"demo":"DEMOrace",
			"warning":"REQrace",
			"HTML":"With which race/ethnicity do you most identify?<p style=\"display:none\" class=\"required\" id = \"REQrace\">This is a required field.</p><br><input class=\"race\" type=\"checkbox\" name=\"AmericanIndian\">Aboriginal/Indigenous or Native American/Alaska Native<br><input class=\"race\" type=\"checkbox\" name=\"Black\">Black or African-American<br><input class=\"race\" type=\"checkbox\" name=\"Asian\">East Asian<br><input class=\"race\" type=\"checkbox\" name=\"PacificIslander\">Native Hawaiian or Other Pacific Islander<br><input class=\"race\" type=\"checkbox\" name=\"SouthAsian\">South Asian<br><input class=\"race\" type=\"checkbox\" name=\"White\">White<br><input class=\"race\" type=\"checkbox\" name=\"Other\">Other<br><input class=\"race\" type=\"checkbox\" name=\"Decline\">I do not wish to provide this information<br><br>",
			"value":""
		},
		"sexOrientation":{
			"name":"sexOrientation",
			"include":false,
			"type":"dropdown",
			"demo":"DEMOsexOrientation",
			"warning":"REQsexOrientation",
			"HTML":"What sexual orientation do you most identify with?<p style=\"display:none\" class=\"required\" id=\"REQsexOrientation\">This is a required field.</p><br><select name=\"sexOrientation\"><option value=\"\"></option><option value=\"Heterosexual\">Heterosexual</option><option value=\"Gay\">Gay</option><option value=\"Lesbian\">Lesbian</option><option value=\"Bisexual\">Bisexual</option><option value=\"Transgender\">Transgender</option><option value=\"Asexual\">Asexual</option><option value=\"Queer\">Queer</option><option value=\"Questioning\">Questioning</option><option value=\"Other\">Not Otherwise Specified</option><option value=\"Decline\">I do not wish to provide this information</option></select><br><br>",
			"value":""
		},
		"weightLoss":{
			"name":"weightLoss",
			"include":false,
			"type":"radio",
			"demo":"DEMOweightLoss",
			"warning":"REQweightLoss",
			"HTML":"I am purposely trying to lose weight by eating less<p style=\"display:none\" class=\"required\" id=\"REQweightLoss\">This is a required field.</p><br><input type=\"radio\" name=\"weightLoss\" value=\"yes\">Yes<br><input type=\"radio\" name=\"weightLoss\" value=\"no\">No<br><input type=\"radio\" name=\"weightLoss\" value=\"decline\">I do not wish to provide this information<br><br>",
			"value":""
		},
		"computerYears":{
			"name":"computerYears",
			"include":false,
			"type":"text",
			"demo":"DEMOcomputerYears",
			"warning":"REQcomputerYears",
			"HTML":"<br><br>How many years of experience do you have regularly using computers?<p style=\"display:none\" class=\"required\" id = \"REQcomputerYears\">This is a required field.</p><br><input type=\"text\" name=\"computerYears\"><br><br>",
			"value":""
		},
		"recognize_faces":{
			"name":"recognize_faces",
			"include":false,
			"type":"radio",
			"demo":"DEMOrecognize_faces",
			"warning":"REQrecognize_faces",
			"HTML":"<br><br>Did you recognize any of these faces?<p style=\"display:none\" class=\"required\" id = \"REQrecognize_faces\">This is a required field.</p><br><p><input type=\"radio\" name=\"recognize_faces\" value=\"yes\">Yes<br><input type=\"radio\" name=\"recognize_faces\" value=\"no\">No<br></p>",
			"value":""
		},
		"if_so":{
			"name":"if_so",
			"include":false,
			"type":"text",
			"demo":"DEMOif_so",
			"warning":"REQif_so",
			"HTML":"If so, how many?<p style=\"display:none\" class=\"required\" id = \"REQif_so\">This is a required field.</p><br><input type=\"text\" name=\"if_so\" ><br><br>",
			"value":"0"
		},
		"light":{
			"name":"light",
			"include":false,
			"type":"text",
			"demo":"DEMOlight",
			"warning":"REQlight",
			"HTML":"<br><br>Please enter some other words related to \"light\"?<p style=\"display:none\" class=\"required\" id = \"REQlight\">This is a required field.</p><br><input type=\"text\" name=\"light\"><br><br>",
			"value":""
		},
		"dark":{
			"name":"dark",
			"include":false,
			"type":"text",
			"demo":"DEMOdark",
			"warning":"REQdark",
			"HTML":"<br><br>Please enter some other words related to \"dark\"?<p style=\"display:none\" class=\"required\" id = \"REQdark\">This is a required field.</p><br><input type=\"text\" name=\"dark\"><br><br>",
			"value":""
		},
		"white":{
			"name":"white",
			"include":false,
			"type":"text",
			"demo":"DEMOwhite",
			"warning":"REQwhite",
			"HTML":"<br><br>Please enter some other words related to \"white\"?<p style=\"display:none\" class=\"required\" id = \"REQwhite\">This is a required field.</p><br><input type=\"text\" name=\"white\"><br><br>",
			"value":""
		},
		"black":{
			"name":"black",
			"include":false,
			"type":"text",
			"demo":"DEMOblack",
			"warning":"REQblack",
			"HTML":"<br><br>Please enter some other words related to \"black\"?<p style=\"display:none\" class=\"required\" id = \"REQblack\">This is a required field.</p><br><input type=\"text\" name=\"black\"><br><br>",
			"value":""
		},
		"relationship":{
			"name":"relationship",
			"include":false,
			"type":"text",
			"warning":"REQrelationship",
			"HTML":"What is your relationship to this person?<p style=\"display:none\" class=\"required\" id = \"REQrelationship\"> This is a required field.</p><br><input type=\"text\" name=\"relationship\"><br><br>",
			"value":""
		},
		"yearsKnown":{
			"name":"yearsKnown",
			"include":false,
			"type":"text",
			"warning":"REQyearsKnown",
			"HTML":"How many years have you known this person?<p style=\"display:none\" class=\"required\" id = \"REQyearsKnown\"> This is a required field.</p><br><input type=\"text\" name=\"yearsKnown\"><br><br>",
			"value":""
		},
		"inRelationship":{
			"name":"inRelationship",
			"include":false,
			"type":"radio",
			"demo":"DEMOinRelationship",
			"warning":"REQinRelationship",
			"HTML":"<br><br>Are you currently in a romantic relationship?<p style=\"display:none\" class=\"required\" id = \"REQinRelationship\">This is a required field.</p><br><p><input type=\"radio\" name=\"inRelationship\" value=\"yes\">Yes<br><input type=\"radio\" name=\"inRelationship\" value=\"no\">No<br><input type=\"radio\" name=\"inRelationship\" value=\"complicated\">It's complicated<br></p>",
			"value":""
		},
		"income":{
			"name":"income",
			"include":false,
			"type":"text",
			"warning":"REQincome",
			"HTML":"How much money do you make per year?<p style=\"display:none\" class=\"required\" id = \"REQincome\"> This is a required field.</p><br><input type=\"text\" name=\"income\"><br><br>",
			"value":""
		},
		"currency":{
			"name":"currency",
			"include":false,
			"type":"text",
			"warning":"REQcurrency",
			"HTML":"What currency is your income in?<p style=\"display:none\" class=\"required\" id = \"REQcurrency\"> This is a required field.</p><br><input type=\"text\" name=\"currency\"><br><br>",
			"value":""
		},
		"whatCountry":{
			"name":"whatCountry",
			"include":false,
			"type":"text",
			"warning":"REQwhatCountry",
			"HTML":"In what country have you spent most of your life?<p style=\"display:none\" class=\"required\" id = \"REQwhatCountry\"> This is a required field.</p><br><input type=\"text\" name=\"whatCountry\"><br><br>",
			"value":""
		},
		"inCountry":{
			"name":"inCountry",
			"include":false,
			"type":"radio",
			"demo":"DEMOinCountry",
			"warning":"REQinCountry",
			"HTML":"<br><br>Are you currently living in that country?<p style=\"display:none\" class=\"required\" id = \"REQinCountry\">This is a required field.</p><br><p><input type=\"radio\" name=\"inCountry\" value=\"yes\">Yes<br><input type=\"radio\" name=\"inCountry\" value=\"no\">No<br></p>",
			"value":""
		},
		"whatTown":{
			"name":"whatTown",
			"include":false,
			"type":"text",
			"warning":"REQwhatTown",
			"HTML":"In that country, in what town have you spent most of your life?<p style=\"display:none\" class=\"required\" id = \"REQwhatTown\"> This is a required field.</p><br><input type=\"text\" name=\"whatTown\"><br><br>",
			"value":""
		},
		"whatRegion":{
			"name":"whatRegion",
			"include":false,
			"type":"text",
			"warning":"REQwhatRegion",
			"HTML":"What is the postal code/post code/zip code/pin code for this town?<p style=\"display:none\" class=\"required\" id = \"REQwhatRegion\"> This is a required field.</p><br><input type=\"text\" name=\"whatRegion\"><br><br>",
			"value":""
		},
		"zip":{
			"name":"zip",
			"include":false,
			"type":"text",
			"warning":"REQzip",
			"HTML":"What is the zip code of your town?<p style=\"display:none\" class=\"required\" id = \"REQzip\"> This is a required field.</p><br><input type=\"text\" name=\"zip\"><br><br>",
			"value":""
		},
		"whatGoals":{
			"name":"whatGoals",
			"include":false,
			"type":"textarea",
			"warning":"REQwhatGoals",
			"HTML":"What do you think were the goals of this study?<br>Please write a few sentences on what you think the researchers were examining.<p style=\"display:none\" class=\"required\" id = \"REQwhatGoals\"> This is a required field.</p><br><textarea name=\"whatGoals\"></textarea><br><br>",
			"value":""
		}
	};

	this.start = function () {
			
		
		this.hideAll();
		this.init();
		this.$frame.show();
		
		
		$('#submitDemo').mouseenter(function() {
			$('#submitDemo').css({'color':'blue','font-weight':'bold','background-color':'#A9A9A9'});
		});	
		$('#submitDemo').mouseleave(function() {
			$('#submitDemo').css({'color':'black','font-weight':'normal','background-color':'#D1D1D1'});
		});
	}

	this.setThisTask = function () {
		thisTask = this;
	}

	this.setCSS = function () {
		$('.demographics').css('background_color',this.background_color)
			.css('color',this.color);
		$('.required').css('display','inline')
			.css('color','red') 
			.hide();
		$('form[name=demographicForm]').on('submit',function () {
			thisTask.validateDemo();
		});
		this.$frame.css('color',this.color)
			.css('background-color', this.background_color);
		$('#begin').unbind().on('click',function(){thisTask.$frame.show();});

	}

	if (this.genderFirst == true) {
		this.writeHTML = function(){
			if (this.genderFirst ==true){
				$('.maleOrFemale').html('<h2 id = "demographicsPrompt">Please enter the following demographic information</h2><form name="demographicForm" method="post">')
					.append(this.info["gender"]["HTML"])
					.append('<input type="submit" value="Continue to surveys"></form>');
				this.info["gender"]["include"] = false;
			}
		}
		this.genderFirst = false;
	}

	this.writeForm = function () {
		for (var item in this.info){
			if (this.info[item]["include"] == true){
				$('form[name=demographicForm]').append(this.info[item]["HTML"]);
			}
		}
		$('form[name=demographicForm]').append(this.$button);
	}

	this.validateForm = function() {
		this.DEMOgender = $('input[name="gender"]:checked').val();
		this.nextTask();
		return false;
	}

	this.getFormValue = function(field){
		switch(field['type']){

			case "checkbox":
				field['value'] = '';
				$('input:checkbox.'+field['name']).each(function (i,box) {

					box.checked ? field['value'] = field['value'] + $(box).attr('name') + " " : "";
				});
				break;

			case "text":
				field['value'] = '';
				field['value'] = $('input:text[name='+field['name']+']').val();
				break;

			case "textarea":
				field['value'] = '';
				field['value'] = $('textarea[name='+field['name']+']').val();
				break;

			case "radio":
				field['value'] = '';
				field['value'] = $('input:radio[name='+field['name']+']:checked').val();
				break;

			case "dropdown":
				field['value'] = '';
				field['value'] = $('[name='+field['name']+']').val();
				break;

			default:
				break;
		}

		if (field['value'] === null || field['value'] === '' || field['value'] === undefined){
			$('#' + field['warning']).show();
			return false;
		}
		this.toWriteHeader = this.toWriteHeader + field['name'] +',';
		this.toWrite = this.toWrite +'"'+ field['value'] +'",';
		return field['value'];

	}

	this.validateDemo = function() {
		$('.required').hide();
		this.toWriteHeader = 'SubjID,Study,IP,';
		this.toWrite = '\n' + subjID + ',' + study + ',' + IP + ",";
		var thisDemo = this;
		$.each(this.info,function(index,value){
			if (value['include']==true){
				thisDemo.getFormValue(value);
			}
		});
		if ($('.required:visible').length == 0){
		//	$.post(root_path + 'saveDemo.php', {subjid : subjID, studyName : study, folder : this.folder, suffix : this.suffix, toWrite : this.toWriteHeader + this.toWrite + '\n'}, function () {});
			$.post(root_path + 'save.php', {subjid : subjID, studyName : study, folder : this.folder, suffix : this.suffix, toWrite : this.toWriteHeader + this.toWrite + '\n'}, function () {});
			this.nextTask();
		}
		return false;
	}

	this.nextTask = function(){
		$("#participantCode").html(subjID);
		$('.demographics').hide();
		$('.thanks').show();
		try {
			writeToJSON();
		} catch (err) {
		}
	}

	this.loadTrial = function () {
		this.$frame.show();
		this.showParts();
	}
}


demo.prototype = new Task();
