/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8090/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'
	let app = {
		init:  function () {
			if (!window.localStorage) {
				alert("Your web browser does not support local storage, so we won't be able to save your character!\nLuckily, there's a simple solution for this: switch to a modern browser, and everything should work!")
			} else {
				let storedCharacter = localStorage.getItem('character1');
				if (storedCharacter){
					this.getStoredCharacters()
				} else {
					this.newCharacter();
				}
			}
		},
		newCharacter: function(){
	//			console.log("Create new Character!")
				let CreateCharacter = __webpack_require__(1)
			//	let CreateCharacter = require('./components/coreSheet.jsx')
				ReactDOM.render(React.createElement(CreateCharacter, null), document.getElementById('sheet'))
		},
		getStoredCharacters: function(){
	// DEV NODE: CURRENTLY BYPASSES LIST, STRAIGHT TO CHAR 1 (MVP STYLE)
	
				let character = localStorage.getItem('character1')
				console.info(character);
				let CoreSheet = __webpack_require__(6)
			//	let ChooseCharacter = require('./components/storedCharacters.jsx')  -- NOT MADE YET
			//	ReactDOM.render(<ChooseCharacter />, document.getElementById('sheet'))	-- NOT MADE YET
				ReactDOM.render(React.createElement(CoreSheet, {saveslot: 1}), document.getElementById('sheet'));
		}
	}
	
	app.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	//let React = require('React');
	let publicFunctions = __webpack_require__(2);
	
	let Stats 			= __webpack_require__(3);
	let AgeDescription 	= __webpack_require__(4);
	let EditStats 		= __webpack_require__(5);
	
	let CreateCharacter = React.createClass({displayName: "CreateCharacter",
		getInitialState: function(){
			let stats = {};
			for (let stat in publicFunctions.statProperties) stats[stat] = 0;
			return stats;
		},
		componentWillMount: function(){
			this.setState({age: 30});
			this.setState({step: 1});
			this.setState({Move: publicFunctions.moveModifier(this.state.STR, this.state.DEX, this.state.SIZ, 30)});
		},
		editStat: function(event){console.log(event.target.id)},
		generateStats: function(event){
			let statProps 			= publicFunctions.statProperties;
			let staticStatValues	= {};
			let newStat				= 0;
	
			for (let stat in statProps){
				newStat = ((publicFunctions.d6(statProps[stat].roll.numberOfDice) + statProps[stat].roll.plus) * statProps[stat].roll.multiplier);
				staticStatValues[stat] = newStat;
				this.setState({ [stat]: newStat	});
			}
			this.setMove;
			this.setState({ step: 2	});
		},
		bundleStats: function(){
			let stats = {};
			for (let stat in publicFunctions.statProperties){
				stats[stat] = this.state[stat]
			}
			return stats;
		},
		enterStats: function(){
			//<input type="number" id={stat} value={this.state.stats[stat]} name={statName} onClick={this.editStat} min="-100" max="90" step="5" />
		},
		acceptStats: function(){
			return React.createElement("button", null, "Accept")
		},
		setMove: function(){
			console.log(publicFunctions.moveModifier(this.state.STR, this.state.DEX, this.state.SIZ, this.state.age));
			this.setState({Move: publicFunctions.moveModifier(this.state.STR, this.state.DEX, this.state.SIZ, this.state.age)});
		},
	
		ageBrackets: [
			{min: 15, 	max: 19,	checks: 0, appminus:  0, statminus: 0,	text: "Deduct 5 points from STR or SIZ, and also from EDU. Re-roll Luck, use highest value."},
			{min: 20, 	max: 39,	checks: 1, appminus:  0, statminus: 0,	text: "One improvement check for EDU."},
			{min: 40, 	max: 49,	checks: 2, appminus:  5, statminus: 5,	text: "Deduct 5 points from STR, CON or DEX, and also from APP. Make 2 improvement checks for EDU."},
			{min: 50, 	max: 59,	checks: 3, appminus: 10, statminus: 10,	text: "Deduct 10 points from STR, CON or DEX (split across one, two or all three), and also from APP. Make 3 improvement checks for EDU."},
			{min: 60, 	max: 69,	checks: 4, appminus: 15, statminus: 20,	text: "Deduct 20 points from STR, CON or DEX (split across one, two or all three), and reduce APP by 15. Make 4 improvement checks for EDU."},
			{min: 70, 	max: 79,	checks: 4, appminus: 20, statminus: 40,	text: "Deduct 40 points from STR, CON or DEX (split across one, two or all three), and reduce APP by 20. Make 4 improvement checks for EDU."},
			{min: 80, 	max: 89,	checks: 4, appminus: 25, statminus: 80, text: "Deduct 80 points from STR, CON or DEX (split across one, two or all three), and reduce APP by 25. Make 4 improvement checks for EDU."}
		],
		ageSet: function(e){
				this.setState({age: parseInt(e.target.value)});
		},
		ageAccept: function(e){
			window.agePicker.disabled = true;
			this.setState({step: 3});
	
			let bracketEffects = this.ageBrackets
				.find((bracket)=>{ if (bracket.min <= this.state.age && bracket.max >= this.state.age) return bracket;
			});
	
			let effects = '';
			let edu = (()=>{return this.state.EDU})();
				if(bracketEffects.checks > 0) {
					for (let i = 1; i <= bracketEffects.checks; i++){
						let roll = publicFunctions.d100();
						if (roll > edu) {
							let eduIncrease = Math.ceil(publicFunctions.d100()/10);
							effects += '<p>Education check'+(bracketEffects.checks > 1 ? ' ' + i : '') +': Rolled ' + roll + 
							'. <span class="success">Success!</span> EDU was increased by <span class="success">' + eduIncrease + '</span>, from ' + edu +' to '+ (edu +=eduIncrease) +'</p>';
					} else {
							effects += '<p>Education check'+(bracketEffects.checks > 1 ? ' ' + i : '') +': Rolled ' + roll + 
							'. <span class="failure">No increase</span>. You needed to roll <em>more</em> than ' + edu + '</p>';
					}
				}
			}
	
			if (bracketEffects.appminus != 0 ){
				let newAPP = this.state.APP - bracketEffects.appminus;
				effects += '<p><span class="decrease">Appearance decreased</span> by '+ bracketEffects.appminus + ' points, from ' + this.state.APP + ' to ' + newAPP + '</p>';
				this.setState({APP: newAPP})
			}
	
			if (bracketEffects.statminus > 0) {
				this.setState({statMinus : bracketEffects.statminus});
			}
	
			this.setState({ageEffects: effects})
			this.setState({EDU: edu})
	
		},
		saveText:function(event){
			let key = event.target.name;
			this.setState({[key]: event.target.value});
		},
		saveCharacter:function(){
			let saveInfo 		= this.bundleStats();
				saveInfo.name 		= this.state.name;
				saveInfo.occupation = this.state.occupation; 
				saveInfo.residence 	= this.state.residence; 
				saveInfo.player 	= this.state.player;
				saveInfo.age 		= this.state.age;
				saveInfo = JSON.stringify(saveInfo);
			
			localStorage.setItem('character1', saveInfo)
			console.log('Saved Character in local storage slot "characterslot1:"\n', saveInfo);
			location.reload()
		},
		render: function(){
			let hasStats = true;
	
			for (let stat in this.state.stats) { if (this.state.stats[stat] === 0) hasStats = false }
	
			return React.createElement("div", {id: "characterDetails", className: "characterGeneration"}, 
						React.createElement("div", {id: "head"}, 
							React.createElement("h5", null, "Call of Cthulhu RPG 7th edition character generator"), 
							React.createElement("h1", null, "Create Character")
						), 
						React.createElement("span", {id: "stepOne", className: "fadeIn", "data-wait": "3"}, 
							React.createElement("button", {id: "generateStats", 
									className: (this.state.step === 1 ? 'fadeIn' : 'fadeOut'), 
									onClick: this.generateStats, disabled: (this.state.step === 1 ? false : true)}, 
									"Generate stats"
							)
						), 
	
						React.createElement("div", {className: "controls " + (this.state.step > 1 ? "visible" : "hidden") }, 
							React.createElement(Stats, {stats: this.bundleStats(), move: this.state.Move}), 
							React.createElement("div", {
								style: {
										display:"flex",
										justifyContent: "center",
										paddingTop: "4rem"
								}}, 
								React.createElement("span", {style: {
										fontSize:"3rem"
								}}, "Age: "), 
								React.createElement("input", {id: "agePicker", type: "number", min: "15", max: "89", defaultValue: this.state.age, onChange: this.ageSet, style: {marginLeft:4,marginRight: 4}}), 
								React.createElement("button", {onClick: this.ageAccept, disabled: ((this.state.age > 14 && this.state.age < 89) && this.state.step === 2 ? false: true)}, "Accept")
							), 
							React.createElement(AgeDescription, {
								style: {
									textCenter: "center",
									fontSize: "3rem"
								}, 
								age: this.state.age, 
								brackets: this.ageBrackets})
						), 
	
						React.createElement("div", {className: "ageEffects " + (this.state.step > 2 ? "visible" : "hidden") }, 
							React.createElement("p", {dangerouslySetInnerHTML: {__html: this.state.ageEffects}})
	
						), 
	
						React.createElement("div", {className: "roundUp " + (this.state.step > 2 ? "visible" : "hidden")}, 
							React.createElement("h3", null, "Character name"), 
							React.createElement("input", {type: "text", name: "name", onBlur: this.saveText}), 
		
							React.createElement("h3", null, "Occupation"), 
							React.createElement("input", {type: "text", name: "occupation", onBlur: this.saveText}), 
	
							React.createElement("h3", null, "Residence (city or area)"), 
							React.createElement("input", {type: "text", name: "residence", onBlur: this.saveText}), 
		
							React.createElement("h3", null, "Player name"), 
							React.createElement("input", {type: "text", name: "player", onBlur: this.saveText})
	
						), 
	
						React.createElement("button", {style: {
							backgroundColor:"green",
							color:"white"
						}, className: (this.state.step > 2 ? "visible" : "hidden"), onClick: this.saveCharacter}, "Save and proceed")
	
	
	
					)
		}
	})
	
	module.exports = CreateCharacter

/***/ },
/* 2 */
/***/ function(module, exports) {

	let PublicFunctions = {
		// STATICS
		statProperties: {
				STR  :  {name: "STR",  desc: "Strength",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
				DEX  :  {name: "DEX",  desc: "Dexiterity",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
				POW  :  {name: "POW",  desc: "Power",			type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
				CON  :  {name: "CON",  desc: "Constitution", 	type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
				APP  :  {name: "APP",  desc: "Appearance",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
				EDU  :  {name: "EDU",  desc: "Education",		type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
				SIZ  :  {name: "SIZ",  desc: "Size",			type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
				INT  :  {name: "INT",  desc: "Intelligence", 	type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
				Luck :  {name: "Luck", desc: "Luck",			type: "luck", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
		},
	
		// PENDING FUNCTIONS
		getStoredCharacters: function (){
			console.log("Retrieve list of stored Characters.")
		},
		saveCharacter: function(){
			console.log("Save Character")
		},
		loadCharacter: function(){
			console.log("Load Character")
		},
		deleteCharacter: function(saveSlot){
			// Working version from component: coreSheet.deleteCharacter:
			let deleteAlert = confirm('Delete this character');
			
			if (deleteAlert === true) {
				localStorage.removeItem('character'+saveSlot);
			}
			location.reload();
			console.log("Load Character")
		},
	
		    maxValue: function(type){
	//	    	MAKE IT PURE: take the stats as a parameter
	        switch(type){
	            case("hitPoints"):  return Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)
	            case("Luck"):       return this.props.character.stats.Luck
	            case("sanity"):     return (this.props.character.stats.POW - this.props.character.health.mythos)
	            case("magic"):      return Math.floor(this.props.character.stats.POW / 5)
	            default:            return 99
	        }
	    },
	
	
	
	
		//TESTED FUNCTIONS
		d6: function(num){
			let output = 0;
			if (typeof num !== 'number') num = 1;
			for (let i  = 0; i<num; i++) {
				output += Math.round((Math.random() * 5) + 1);
			}
			return output 
		},
		d100: function() {		
			const output = Math.round((Math.random() * 99) + 1);
			return output;
		},
	
		generateStats: function(){
			let output 	= 	{};
			for (i in this.statProperties){
				let stat = this.statProperties[i];		
				output[stat.name] = ((this.d6(stat.roll.numberOfDice) + stat.roll.plus) * stat.roll.multiplier);
			}
			return output;
		},
		moveModifier: function (STR, DEX, SIZ, age) {
			let moveModifier = 2
	
			if (DEX  <  SIZ  &&  STR  <  SIZ) 	moveModifier = 7
			if (STR  >= SIZ  ||  DEX  >= SIZ) 	moveModifier = 8
			if (STR  >  SIZ  &&  DEX  >  SIZ)	moveModifier = 9
	
			if ((age - 30) > 10) { // Older than 40
				let ageModifier = age -30
					ageModifier = ageModifier.toString().charAt(0)	
				moveModifier -= ageModifier
			} 
			return (moveModifier)
		},
	
		// Utility functions
		bundleDate: function(){
			let bundleDate 	= 'Bundle Date: ';
			bundleDate 		+= Date.now();
			return bundleDate;
		}
	}
	
	module.exports = PublicFunctions;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	
	let publicFunctions = __webpack_require__(2);
	
	let Stats = React.createClass({displayName: "Stats",
		propTypes: {
			stats: React.PropTypes.object,
			move: React.PropTypes.number
		},
	    render: function(){
	    	return React.createElement("div", {id: "stats", className: "fadeIn"}, 
	    			Object.keys(this.props.stats).map((value, index)=>{
	
	    				if (value != "Luck") {
	
		    				return React.createElement("div", {className: "stat " + value, key: value}, 
		    					
		    					React.createElement("h4", {className: "name"}, 
		    						value
		    					), 
		    					React.createElement("div", {className: "full"}, 
		    						this.props.stats[value]
		    					), 
	
		    		    		React.createElement("div", {className: "partialValues"}, 
					    			React.createElement("div", {className: "half"}, 
					    				Math.floor(this.props.stats[value]/2)
					    			), 
		    						React.createElement("div", {className: "fifth"}, 
		    							Math.floor(this.props.stats[value]/5)
		    						)
		    					)
		    					
		    				)
		    			}	
	    			}), 
	
						React.createElement("div", {className: "stat move", key: "move"}, 	    					
	    					React.createElement("h4", {className: "name"}, 
	    						"Move"
	    					), 
	    					React.createElement("div", {className: "full"}, 
	    						this.props.move
	    					), 
	
	    		    		React.createElement("div", {className: "partialValues"}, 
				    			React.createElement("div", {className: "half"}, 
				    				parseInt(this.props.move) * 5 + "m"
				    			), 
	    						React.createElement("div", {className: "fifth"}, 
	    							"round"
	    						)
	    					)		
		    			)
	
	     		)
	    }
	})
	
	module.exports = Stats

/***/ },
/* 4 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	
	let AgeDescription = React.createClass({displayName: "AgeDescription",
		propTypes: {
			age: React.PropTypes.number,
			brackets: React.PropTypes.array
		},
		shouldComponentUpdate: function(nextProps, nextState) {
		  	return nextProps.age !== this.props.age;
		},
		render: function(){
			let bracketDescription = this.props.brackets
				.find((bracket)=>{ if (bracket.min <= this.props.age && bracket.max >= this.props.age) return bracket;
			});
			return React.createElement("p", null, "Effect: " + bracketDescription.text)
		}
	});
	
	
	module.exports = AgeDescription;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	
	let EditStats = React.createClass({displayName: "EditStats",
		propTypes: {
			stats: React.PropTypes.object  
		},
		render: function(){
			let tempvalues = [];
			for (let stat in this.props.stats)	{
				tempvalues.push({name: [stat], value: this.props.stats[stat]});
			}
			
			return React.createElement("div", {className: "stats"}, 
				
					tempvalues.map(function (stat, i, stats){
						return React.createElement(EditStat, {statName: stat.name, statVal: stat.value, key: 'decrease-' + stat.name})
					})
				
			); 
		}
	});
	
	module.exports = EditStats;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	//var React = require('react')
	var SkillList = __webpack_require__(7)
	let CharacterDetails = __webpack_require__(9)
	//let StorageManager = require("../modules/storageManager")
	
	let CoreSheet = React.createClass({displayName: "CoreSheet",
		PropTypes: {
			saveslot: React.PropTypes.number
		},
		getInitialState: function(){
	
			let storedData = localStorage.getItem('character'+this.props.saveslot);
				storedData = JSON.parse(storedData);
				console.dir(storedData);
	
			let importedStats = {
				STR: storedData.STR,
				CON: storedData.CON,
				SIZ: storedData.SIZ,
				DEX: storedData.DEX,
				APP: storedData.APP,
				INT: storedData.INT,
				POW: storedData.POW,
				EDU: storedData.EDU,
				Luck: storedData.Luck
			};
	
			let savedCharacter = {
					name: storedData.name,
					age: storedData.age,
					occupation: storedData.occupation,
					sex: "Male",
					residence: storedData.residence,
					player: storedData.player,
					counters: {
						hitPoints: 8,
						Luck: 30,
						magic: 5,
						sanity: 40
					},
					health: {
						mythos: 7		
					},
					stats: importedStats,
					skills: [
						{id:"climb", values: [32, 7, 2, 6]},
						{id:"axe", values: [25, 2, 6]},
						{id:"acting", values: [53,8,2,4,3,7,9,9,9,9,9,9]}
					]
				};
	
			return {
				statics: __webpack_require__(11),
				checkedSkills: [],
				character: savedCharacter
			}
		},
		componentWillMount: function(){
	
			this.setState({
				hitPoints: this.state.character.counters.hitPoints, 
				Luck: this.state.character.counters.Luck, 
				magic: this.state.character.counters.magic, 
				sanity: this.state.character.counters.sanity, 
			})
		},
		componentDidMount: function(){
	
			let counterForms = document.getElementById('characterDetails').getElementsByTagName('form')
			for (let i = 0; i < counterForms.length; i++){
				let inputElements = counterForms[i].getElementsByTagName('input')
				for (let elemID = 0; elemID < inputElements.length; elemID++ ){
					inputElements[elemID].addEventListener("click", (event)=>{this.setState({[event.target.name]: parseInt(event.target.value)})})
				}
			}
	
			let skillListInputs = document.getElementById('skills').getElementsByTagName('input')
			for (let i = 0; i < skillListInputs.length; i++){
				skillListInputs[i].addEventListener("click", (event)=>{
					let newCheckedSkills = function (x){return x}(this.state.checkedSkills)
					newCheckedSkills.push(event.target.name)
					this.setState({	checkedSkills : newCheckedSkills })
				})
			}
		},
		deleteCharacter(){
			let deleteAlert = confirm('Delete this character');
			
			if (deleteAlert === true) {
				localStorage.removeItem('character'+this.props.saveslot);
			}
			location.reload();
		},
	    render: function(){
	        return React.createElement("div", null, 
		        		React.createElement(CharacterDetails, {character: this.state.character}), 
	       				React.createElement(SkillList, {skillList: this.state.statics.skills, specializations: this.state.statics.specializations, characterStats: this.state.character.stats, characterSkills: this.state.character.skills}), 
	        			React.createElement("hr", null), 
	        			React.createElement("button", {onClick: this.deleteCharacter}, "Delete Character")
	        		)
		}
	})
	
	module.exports = CoreSheet

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	//var React = require('react')
	var SingleSkill = __webpack_require__(8)
	
	let SkillList = React.createClass({displayName: "SkillList",
		getInitialState: function() {
			return {
					skillList: 	this.props.skillList,
					allSkills: 	this.props.skillList
					}
		},
	
		propTypes: {
			skillList: 			React.PropTypes.array,
			specializations: 	React.PropTypes.object,
			characterStats: 	React.PropTypes.object,
			characterSkills: 	React.PropTypes.array
		},
	
		skillGroups: [
			{title: "Combat", items: ['dodge', 'throw', 'firstAid']},
			{title: "Investigation", items: ['libraryUse', 'intimidate', 'cthulhuMythos', 'fastTalk', 'charm', 'persuade', 'psychology', 'spotHidden', 'listen', 'stealth', 'track']},
			{title: "Firearms", items: ['firearms']},
			{title: "Science", items: ['science']},
			{title: "Vehicles", items: ['pilot', 'driveAuto']}
		],
	
		skillFilters: function(){
			return React.createElement("div", {id: "filters"}, 
						React.createElement("button", {onClick: ()=>this.setState({skillList: this.state.allSkills})}, "All"), 
				    	this.buttonsAtoZ(), 
		    			this.specializationFilters()
	    			)
		},
		
		buttonsAtoZ: function(){
			let buttons = []
			for (var i = 65; i <=90; i++) {
				let letter = String.fromCharCode(i), disabledStatus = true
				
				this.state.allSkills.filter((skill)=>{if (letter === skill.name.charAt(0)) disabledStatus = false})
				buttons.push(
					React.createElement("button", {
						type: "button", 
						onClick: (event)=>{this.setState({skillList: this.state.allSkills.filter((s)=>{if (s.name.charAt(0) === event.target.value) return s })})}, 
				 		value: letter, 
				 		disabled: disabledStatus, 
				 		key: "letter-" + letter
				 	}, letter)
				)
			}
			return buttons
		},
	
		makeSkillList: function(input){
			let output = [], temp = []
			if (Object.prototype.toString.call( input ) === '[object Array]') {
			
				input.map((item)  => { temp.push( this.state.allSkills.filter(
					(skill) => { if (skill.id === item || skill.type === item) return skill	}
					))}
				)
	
				temp.map((item)=>{ if (item.length >= 1) {
						for (let i in item) { output.push(item[i]) }
				}})
				return output
			}
		},
	
		specializationFilters: function(){
			let skills = this.state.allSkills
			let specializationButtons = []
	
			this.skillGroups.map((group)=>{
				specializationButtons.push(React.createElement("button", {
					onClick: (e)=>{this.setState({skillList: this.makeSkillList(group.items)})}, 
					key: "group-" + group.title, 
					className: "specialization"
				}, group.title))
			})
	
			return specializationButtons
		},
	
	
	    render: function(){
	    	let charSkills = this.props.characterSkills
	    	let charStats = this.props.characterStats
	
	    	return React.createElement("div", null, 
	    				this.skillFilters(), 
	    	 			React.createElement("div", {id: "skills"}, 
		    				this.state.skillList.map((skill) => { return React.createElement(SingleSkill, {id: skill.id, className: skill.id + " skill", key: skill.id, skillData: skill, improvement: charSkills, charStats: charStats})	})
	    				)
	    		)
	    }
	})
	
	module.exports = SkillList

/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	//let React = require('react')
	
	
	let SingleSkill = React.createClass({displayName: "SingleSkill",
		propTypes: {
			skillData: React.PropTypes.object,
			charStats: React.PropTypes.object,
			improvement: React.PropTypes.array
		},
	
		computeSkillValue: function() {	
			let skillValue = this.props.skillData.value
			let baseSkillId = this.props.skillData.id
			if (Array.isArray(skillValue)) skillValue = Math.floor(this.props.charStats[skillValue[0]] / skillValue[1])
			let improvedSkill = this.props.improvement.filter(function(improvedSkill){
				if (improvedSkill.id === baseSkillId) skillValue +=  improvedSkill.values.reduce((a, b ) =>  a + b )
			})
			return skillValue
		},
	
	    render: function(){
	    	let skillValue = this.computeSkillValue()
	    	let dataSkillOutput = {"skill": this.props.skillData.name,"values": [skillValue, skillValue/2, skillValue/5]}
	    	return React.createElement("div", {className: this.props.className, "data-skill": dataSkillOutput}, 
	    			React.createElement("input", {type: "checkbox", name: this.props.skillData.id}), 
	    			React.createElement("h4", {className: "name"}, this.props.skillData.name), 
		    		React.createElement("div", {className: "full"}, Math.min(skillValue, 99)), 
		    			React.createElement("div", {className: (skillValue < 2 ? "partialValues nil":"partialValues")}, 
		    				React.createElement("div", {className: (skillValue < 2 ? "half nil":"half")}, (Math.floor(skillValue/2) > 1 ? Math.floor(skillValue/2): "-")), 
	    					React.createElement("div", {className: (skillValue < 5 ? "fifth nil":"fifth")}, (Math.floor(skillValue/5) > 1 ? Math.floor(skillValue/5): "-"))
	    				)
	    		)
	    }
	})
	
	
	module.exports = SingleSkill

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	//let React = require('react')
	let Stats           = __webpack_require__(3);
	let PointCounter    = __webpack_require__(10);
	let publicFunctions = __webpack_require__(2);
	
	
	let CharacterDetails = React.createClass({displayName: "CharacterDetails",
		propTypes: {
			character: React.PropTypes.object,
		},
	
	    maxValue: function(type){
	        switch(type){
	            case("hitPoints"):  return Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)
	            case("Luck"):       return this.props.character.stats.Luck
	            case("sanity"):     return (this.props.character.stats.POW - this.props.character.health.mythos)
	            case("magic"):      return Math.floor(this.props.character.stats.POW / 5)
	            default:            return 99
	        }
	    },
	    moveValue: function () {
	        let moveModifier, age = this.props.character.age
	
	        if (this.props.character.stats.DEX  <  this.props.character.stats.SIZ  &&  this.props.character.stats.STR  <  this.props.character.stats.SIZ)   moveModifier = 7
	        if (this.props.character.stats.STR  >= this.props.character.stats.SIZ  ||  this.props.character.stats.DEX  >= this.props.character.stats.SIZ)   moveModifier = 8
	        if (this.props.character.stats.STR  >  this.props.character.stats.SIZ  &&  this.props.character.stats.DEX  >  this.props.character.stats.SIZ)   moveModifier = 9
	
	        if ((age - 30) > 10) { // Older than 40
	            let ageModifier = age -30
	                ageModifier = ageModifier.toString().charAt(0)  
	            moveModifier -= ageModifier
	        } 
	
	        return moveModifier
	    },
	
	    createCounters: function(){
	        let counters = [];
	        for (let counter in this.props.character.counters) {
	            counters.push(React.createElement(PointCounter, {
	                            type: counter, 
	                            max: this.maxValue(counter), 
	                            current: this.props.character.counters[counter], 
	                            key: counter}
	                        ))
	        }
	        return counters;
	    },
	
	    render: function(){
	    	return React.createElement("div", {id: "characterDetails"}, 
	    				React.createElement("div", {className: "details"}, 
	                        React.createElement("h2", null, this.props.character.name + " (" + this.props.character.age + ")"), 
	                        React.createElement("h4", null, this.props.character.sex + " " + this.props.character.occupation + " from " + this.props.character.residence), 
		    				React.createElement("h4", null, "Player: " + this.props.character.player)
	    				), 
	
	    				React.createElement(Stats, {stats: this.props.character.stats, move: this.moveValue()}), 
	
	                    this.createCounters()
	
	    		  )
	    }
	})
	
	module.exports = CharacterDetails

/***/ },
/* 10 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//** @jsx ReactDOM */
	'use strict'
	
	let PointCounter = React.createClass({displayName: "PointCounter",
	
		propTypes: {
			max: React.PropTypes.number,
			current: React.PropTypes.number,
			type: React.PropTypes.string
		},
	
	    render: function(){
	    	let skillCount = new Array(this.props.max).fill()
	    	let current = this.props.current;
	    		current = 0; // UN_COMMENTING THIS DISABLES THE CURRENT MARKER
	    	return React.createElement("form", {className:  this.props.type + " points"}, 
						React.createElement("label", null, React.createElement("h3", null, this.props.type)), 
						skillCount.map((t,i)=>{
							return React.createElement("span", {key: this.props.type + "-" + i}, 
			    					React.createElement("input", {type: "radio", value: ++i, name: this.props.type, defaultChecked: (i === current ? true : false), id: this.props.type + "-" + i}), 
			    					React.createElement("label", {htmlFor: this.props.type + "-" + i, "data-value": i})
			    				)
						})
					)
	    }
	})
	
	
	module.exports = PointCounter

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
		"skills": [
			{
				"id": "accounting",
				"name": "Accounting",
				"value": 5
			},
			{
				"id": "acting",
				"name": "Acting",
				"value": 5,
				"type": "artCraft"
			},
			{
				"id": "animalHandling",
				"name": "Animal Handling",
				"value": 5,
				"uncommon": true
			},
			{
				"id": "anthropology",
				"name": "Anthropology",
				"value": 1
			},
			{
				"id": "appraise",
				"name": "Appraise",
				"value": 5
			},
			{
				"id": "archaeology",
				"name": "Archaeology",
				"value": 1
			},
			{
				"id": "artillery",
				"name": "Artillery",
				"value": 1,
				"Uncommon": true
			},
			{
				"id": "astronomy",
				"name": "Astronomy",
				"value": 1,
				"type": "science"
			},
			{
				"id": "axe",
				"name": "Axe",
				"value": 15,
				"type": "fighting"
			},
			{
				"id": "biology",
				"name": "Biology",
				"value": 1,
				"type": "science"
			},
			{
				"id": "botany",
				"name": "Botany",
				"value": 1,
				"type": "science"
			},
			{
				"id": "bow",
				"name": "Bow",
				"value": 15,
				"type": "firearms"
			},
			{
				"id": "brawl",
				"name": "Brawl",
				"value": 25,
				"type": "fighting"
			},
			{
				"id": "intimidate",
				"name": "Intimidate",
				"value": 15
			},
			{
				"id": "chainsaw",
				"name": "Chainsaw",
				"value": 10,
				"type": "fighting"
			},
			{
				"id": "charm",
				"name": "Charm",
				"value": 15
			},
			{
				"id": "chemistry",
				"name": "Chemistry",
				"value": 1,
				"type": "science"
			},
			{
				"id": "climb",
				"name": "Climb",
				"value": 20
			},
			{
				"id": "computerUse",
				"name": "Computer Use",
				"value": 5,
				"modern": true
			},
			{
				"id": "creditRating",
				"name": "Credit Rating",
				"value": 0
			},
			{
				"id": "cryptography",
				"name": "Cryptography",
				"value": 1,
				"type": "science"
			},
			{
				"id": "cthulhuMythos",
				"name": "Cthulhu Mythos",
				"value": 0
			},
			{
				"id": "demolitions",
				"name": "Demolitions",
				"value": 1,
				"uncommon": true
			},
			{
				"id": "disguise",
				"name": "Disguise",
				"value": 5
			},
			{
				"id": "diving",
				"name": "Diving",
				"value": 1
			},
			{
				"id": "dodge",
				"name": "Dodge",
				"value": [
					"DEX",
					2
				]
			},
			{
				"id": "driveAuto",
				"name": "Drive Auto",
				"value": 20
			},
			{
				"id": "electricalRepair",
				"name": "Electrical Repair",
				"value": 10
			},
			{
				"id": "electronics",
				"name": "Electronics",
				"value": 1,
				"modern": true
			},
			{
				"id": "fastTalk",
				"name": "Fast Talk",
				"value": 5
			},
			{
				"id": "fineArt",
				"name": "Fine Art",
				"value": 5,
				"type": "artCraft"
			},
			{
				"id": "firstAid",
				"name": "First Aid",
				"value": 30
			},
			{
				"id": "flail",
				"name": "Flail",
				"value": 10,
				"type": "fighting"
			},
			{
				"id": "flamethrower",
				"name": "Flamethrower",
				"value": 10,
				"type": "firearms"
			},
			{
				"id": "forensics",
				"name": "Forensics",
				"value": 5,
				"type": "science"
			},
			{
				"id": "forgery",
				"name": "Forgery",
				"value": 1,
				"type": "artCraft"
			},
			{
				"id": "garrote",
				"name": "Garrote",
				"value": 15,
				"type": "fighting"
			},
			{
				"id": "geology",
				"name": "Geology",
				"value": 1,
				"type": "science"
			},
			{
				"id": "handgun",
				"name": "Handgun",
				"value": 20,
				"type": "firearms"
			},
			{
				"id": "heavyWeapons",
				"name": "Heavy Weapons",
				"value": 10,
				"type": "firearms"
			},
			{
				"id": "history",
				"name": "History",
				"value": 5
			},
			{
				"id": "hypnosis",
				"name": "Hypnosis",
				"value": 1,
				"uncommon": true
			},
			{
				"id": "jump",
				"name": "Jump",
				"value": 20
			},
			{
				"id": "languageOther1",
				"name": "Language: (Other)",
				"value": 1,
				"type": "language"
			},
			{
				"id": "languageOther2",
				"name": "Language (Other)",
				"value": 1,
				"type": "language"
			},
			{
				"id": "languageOther3",
				"name": "Language (Other)",
				"value": 1,
				"type": "language"
			},
			{
				"id": "languageOther4",
				"name": "Language (Other)",
				"value": 1,
				"type": "language"
			},
			{
				"id": "languageOther5",
				"name": "Language (Other)",
				"value": 1,
				"type": "language"
			},
			{
				"id": "languageOwn",
				"name": "Language (Own)",
				"value": [
					"EDU",
					1
				],
				"type": "language"
			},
			{
				"id": "law",
				"name": "Law",
				"value": 5
			},
			{
				"id": "libraryUse",
				"name": "Library Use",
				"value": 20
			},
			{
				"id": "listen",
				"name": "Listen",
				"value": 20
			},
			{
				"id": "locksmith",
				"name": "Locksmith",
				"value": 1
			},
			{
				"id": "machineGun",
				"name": "Machine Gun",
				"value": 10,
				"type": "firearms"
			},
			{
				"id": "mathematics",
				"name": "Mathematics",
				"value": 1,
				"type": "science"
			},
			{
				"id": "mechRepair",
				"name": "Mechanical Repair",
				"value": 10
			},
			{
				"id": "medicine",
				"name": "Medicine",
				"value": 1
			},
			{
				"id": "meteorology",
				"name": "Meteorology",
				"value": 1,
				"type": "science"
			},
			{
				"id": "naturalWorld",
				"name": "Natural World",
				"value": 10
			},
			{
				"id": "navigate",
				"name": "Navigate",
				"value": 10
			},
			{
				"id": "occult",
				"name": "Occult",
				"value": 5
			},
			{
				"id": "opHeMachinery",
				"name": "Operate Heavy Machinery",
				"value": 1
			},
			{
				"id": "persuade",
				"name": "Persuade",
				"value": 10
			},
			{
				"id": "pharmacy",
				"name": "Pharmacy",
				"value": 1,
				"type": "science"
			},
			{
				"id": "photography",
				"name": "Photography",
				"value": 5,
				"type": "artCraft"
			},
			{
				"id": "physics",
				"name": "Physics",
				"value": 1,
				"type": "science"
			},
			{
				"id": "pilotAirplane",
				"name": "Pilot: Airplane",
				"value": 1,
				"type": "pilot"
			},
			{
				"id": "pilotDirigible",
				"name": "Pilot: Dirigible",
				"value": 1,
				"type": "pilot"
			},
			{
				"id": "pilotShip",
				"name": "Pilot: Ship",
				"value": 1,
				"type": "pilot"
			},
			{
				"id": "pilotHelicopter",
				"name": "Pilot: Helicopter",
				"value": 1,
				"type": "pilot",
				"modern": true
			},
			{
				"id": "psychoanalysis",
				"name": "Psychoanalysis",
				"value": 1
			},
			{
				"id": "psychology",
				"name": "Psychology",
				"value": 10
			},
			{
				"id": "readLips",
				"name": "Read Lips",
				"value": 1,
				"uncommon": true
			},
			{
				"id": "ride",
				"name": "Ride",
				"value": 5
			},
			{
				"id": "rifleShotgun",
				"name": "Rifle/Shotgun",
				"value": 25,
				"type": "firearms"
			},
			{
				"id": "sleightHand",
				"name": "Sleight of Hand",
				"value": 10
			},
			{
				"id": "spear",
				"name": "Spear",
				"value": 20,
				"type": "firearms"
			},
			{
				"id": "spotHidden",
				"name": "Spot Hidden",
				"value": 25
			},
			{
				"id": "stealth",
				"name": "Stealth",
				"value": 20
			},
			{
				"id": "submachineGun",
				"name": "Submachine Gun",
				"value": 15,
				"type": "firearms"
			},
			{
				"id": "survivalDesert",
				"name": "Survival: Desert",
				"value": 10,
				"type": "survival"
			},
			{
				"id": "survivalJungle",
				"name": "Survival: Jungle",
				"value": 10,
				"type": "survival"
			},
			{
				"id": "survivalArctic",
				"name": "Survival: Arctic",
				"value": 10,
				"type": "survival"
			},
			{
				"id": "sword",
				"name": "Sword",
				"value": 20,
				"type": "fighting"
			},
			{
				"id": "swim",
				"name": "Swim",
				"value": 20
			},
			{
				"id": "throw",
				"name": "Throw",
				"value": 20,
				"type": "combat"
			},
			{
				"id": "track",
				"name": "Track",
				"value": 10
			},
			{
				"id": "whip",
				"name": "Whip",
				"value": 5,
				"type": "fighting"
			},
			{
				"id": "zoology",
				"name": "Zoology",
				"value": 1,
				"type": "science"
			}
		],
		"specializations": {
			"artCraft": {
				"name": "Art and Craft",
				"value": 5
			},
			"fighting": {
				"name": "Fighting",
				"value": "varies"
			},
			"firearms": {
				"name": "Firearms",
				"value": "varies"
			},
			"science": {
				"name": "Science",
				"value": 1
			},
			"pilot": {
				"name": "Pilot",
				"value": 1
			},
			"survival": {
				"name": "Survival",
				"value": 10
			}
		},
		"occupations": {
			"accountant": {
				"name": "Accountant",
				"description": "Either employed within a business or working as a freelance consultant with a portfolio of self-employed clients or businesses. Diligence and an attention to detail means thatmost accountants can make good researchers, being able to support investigations through the careful analysis of personal and business transactions, financial statements and other records.",
				"skillpoints": [
					{
						"EDU": 4
					}
				],
				"creditRating": [
					30,
					70
				],
				"contacts": "Business associates, legal professions, financial sector (bankers, other accountants)",
				"skills": [
					"accounting",
					"law",
					"libraryUse",
					"listen",
					"persuade",
					"spotHidden"
				],
				"addSkills": [
					[
						2,
						"Any"
					]
				]
			},
			"acrobat": {
				"name": "Acrobat",
				"description": "Acrobats may be either amateur athletes competing in staged meets — possibly even the Olympics — or professionals employed with the entertainment sector (e.g. circuses, carnivals, theatrical performances).",
				"skillpoints": [
					{
						"EDU": 2
					},
					{
						"DEX": 2
					}
				],
				"creditRating": [
					9,
					20
				],
				"contacts": "Amateur athletic circles, sports writers, circuses and carnivals.",
				"Skills": [
					"climb",
					"dodge",
					"jump",
					"throw",
					"spotHidden",
					"swim"
				],
				"addSkills": [
					[
						2,
						"Any"
					]
				]
			},
			"stageActor": {
				"name": "Stage Actor",
				"description": "Many stage actors have a background in the classics and, considering themselves “legitimate”, have a tendency to look down upon the commercial efforts of the film industry, although by the late twentieth century this is diminished, with film actors able to command greater respect and higher fees.",
				"skillpoints": [
					{
						"EDU": 2
					},
					{
						"APP": 2
					}
				],
				"creditRating": [
					9,
					40
				],
				"contacts": "Theatre industry, newspaper arts critics, actor’s guild or union.",
				"skills": [
					"disguise",
					"fighting",
					"history",
					"psychology"
				],
				"addSkills": [
					[
						2,
						"interpersonal"
					],
					[
						1,
						"Any"
					]
				],
				"artCraftLang": {
					"artCraft": "Acting"
				}
			},
			"filmStar": {
				"name": "Film Star",
				"description": "Movie stars and the film industry have long captured the interest of people across the world. Many stars are made ‘overnight’ and most of them lead flashy, high profile lives, ever in the media spotlight.",
				"skillpoints": [
					{
						"EDU": 2
					},
					{
						"APP": 2
					}
				],
				"creditRating": [
					20,
					90
				],
				"contacts": "Film industry, media critics, writers.",
				"Skills": [
					"disguise",
					"driveAuto",
					"psychology"
				],
				"addSkills": [
					[
						2,
						"interpersonal"
					],
					[
						2,
						"Any"
					]
				],
				"artCraftLang": {
					"artCraft": "Acting"
				}
			},
			"agencyDetective": {
				"name": "Agency Detective",
				"description": "Numerous well-known detective agencies exist around the world, with probably the most famous being the Pinkerton and Burns agencies (merged into one in modern times). Large agencies employ two types of agents: security guards and operatives./nGuards are uniformed patrolmen, hired by companies and individuals to protect property and people against burglars, assassins and kidnappers. Use the Uniformed Police Officer’s description for these characters. Company Operatives are plainclothes detectives, sent out on cases requiring them to solve mysteries, prevent murders, locate missing people, etc.",
				"skillPoints": [
					{
						"EDU": 2
					},
					[
						{
							"STR": 2
						},
						{
							"DEX": 2
						}
					]
				],
				"creditRating": [
					20,
					45
				],
				"contacts": "Local law enforcement, clients.",
				"skills": [
					"fighting",
					"firearms",
					"law",
					"libraryUse",
					"psychology",
					"stealth",
					"track"
				],
				"addSkills": [
					[
						1,
						"interpersonal"
					]
				]
			}
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmVjNjYwNDZkYzg0YzBkOWViZWEiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NyZWF0ZUNoYXJhY3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnVuY3Rpb25zL3B1YmxpYy5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3N0YXRzLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2FnZURlc2NyaXB0aW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2VkaXRTdGF0cy5qc3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb3JlU2hlZXQuanN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2tpbGxMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NpbmdsZVNraWxsLmpzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NoYXJhY3RlckRldGFpbHMuanN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcG9pbnRDb3VudGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2tpbGxzLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0Esc0JBQXFCLFlBQVk7QUFDakMsS0FBSSxHQUFHLEdBQUc7RUFDVCxJQUFJLEdBQUcsWUFBWTtHQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtJQUN6QixLQUFLLENBQUMsb01BQW9NLENBQUM7SUFDM00sTUFBTTtJQUNOLElBQUksZUFBZSxHQUFHLFlBQVksQ0FBQyxP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QTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDkwL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmVjNjYwNDZkYzg0YzBkOWViZWFcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi8ndXNlIHN0cmljdCdcclxubGV0IGFwcCA9IHtcclxuXHRpbml0OiAgZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlKSB7XHJcblx0XHRcdGFsZXJ0KFwiWW91ciB3ZWIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGxvY2FsIHN0b3JhZ2UsIHNvIHdlIHdvbid0IGJlIGFibGUgdG8gc2F2ZSB5b3VyIGNoYXJhY3RlciFcXG5MdWNraWx5LCB0aGVyZSdzIGEgc2ltcGxlIHNvbHV0aW9uIGZvciB0aGlzOiBzd2l0Y2ggdG8gYSBtb2Rlcm4gYnJvd3NlciwgYW5kIGV2ZXJ5dGhpbmcgc2hvdWxkIHdvcmshXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgc3RvcmVkQ2hhcmFjdGVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYXJhY3RlcjEnKTtcclxuXHRcdFx0aWYgKHN0b3JlZENoYXJhY3Rlcil7XHJcblx0XHRcdFx0dGhpcy5nZXRTdG9yZWRDaGFyYWN0ZXJzKClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLm5ld0NoYXJhY3RlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRuZXdDaGFyYWN0ZXI6IGZ1bmN0aW9uKCl7XHJcbi8vXHRcdFx0Y29uc29sZS5sb2coXCJDcmVhdGUgbmV3IENoYXJhY3RlciFcIilcclxuXHRcdFx0bGV0IENyZWF0ZUNoYXJhY3RlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jcmVhdGVDaGFyYWN0ZXIuanN4JylcclxuXHRcdC8vXHRsZXQgQ3JlYXRlQ2hhcmFjdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2NvcmVTaGVldC5qc3gnKVxyXG5cdFx0XHRSZWFjdERPTS5yZW5kZXIoPENyZWF0ZUNoYXJhY3RlciAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoZWV0JykpXHJcblx0fSxcclxuXHRnZXRTdG9yZWRDaGFyYWN0ZXJzOiBmdW5jdGlvbigpe1xyXG4vLyBERVYgTk9ERTogQ1VSUkVOVExZIEJZUEFTU0VTIExJU1QsIFNUUkFJR0hUIFRPIENIQVIgMSAoTVZQIFNUWUxFKVxyXG5cclxuXHRcdFx0bGV0IGNoYXJhY3RlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGFyYWN0ZXIxJylcclxuXHRcdFx0Y29uc29sZS5pbmZvKGNoYXJhY3Rlcik7XHJcblx0XHRcdGxldCBDb3JlU2hlZXQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29yZVNoZWV0LmpzeCcpXHJcblx0XHQvL1x0bGV0IENob29zZUNoYXJhY3RlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9zdG9yZWRDaGFyYWN0ZXJzLmpzeCcpICAtLSBOT1QgTUFERSBZRVRcclxuXHRcdC8vXHRSZWFjdERPTS5yZW5kZXIoPENob29zZUNoYXJhY3RlciAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoZWV0JykpXHQtLSBOT1QgTUFERSBZRVRcclxuXHRcdFx0UmVhY3RET00ucmVuZGVyKDxDb3JlU2hlZXQgc2F2ZXNsb3Q9ezF9IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hlZXQnKSk7XHJcblx0fVxyXG59XHJcblxyXG5hcHAuaW5pdCgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwLmpzeFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qKiBAanN4IFJlYWN0RE9NICovXHJcbid1c2Ugc3RyaWN0J1xyXG4vL2xldCBSZWFjdCA9IHJlcXVpcmUoJ1JlYWN0Jyk7XHJcbmxldCBwdWJsaWNGdW5jdGlvbnMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvcHVibGljJyk7XHJcblxyXG5sZXQgU3RhdHMgXHRcdFx0PSByZXF1aXJlKCcuL3N0YXRzJyk7XHJcbmxldCBBZ2VEZXNjcmlwdGlvbiBcdD0gcmVxdWlyZSgnLi9hZ2VEZXNjcmlwdGlvbicpO1xyXG5sZXQgRWRpdFN0YXRzIFx0XHQ9IHJlcXVpcmUoJy4vZWRpdFN0YXRzJyk7XHJcblxyXG5sZXQgQ3JlYXRlQ2hhcmFjdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdGxldCBzdGF0cyA9IHt9O1xyXG5cdFx0Zm9yIChsZXQgc3RhdCBpbiBwdWJsaWNGdW5jdGlvbnMuc3RhdFByb3BlcnRpZXMpIHN0YXRzW3N0YXRdID0gMDtcclxuXHRcdHJldHVybiBzdGF0cztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2FnZTogMzB9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3N0ZXA6IDF9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe01vdmU6IHB1YmxpY0Z1bmN0aW9ucy5tb3ZlTW9kaWZpZXIodGhpcy5zdGF0ZS5TVFIsIHRoaXMuc3RhdGUuREVYLCB0aGlzLnN0YXRlLlNJWiwgMzApfSk7XHJcblx0fSxcclxuXHRlZGl0U3RhdDogZnVuY3Rpb24oZXZlbnQpe2NvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZCl9LFxyXG5cdGdlbmVyYXRlU3RhdHM6IGZ1bmN0aW9uKGV2ZW50KXtcclxuXHRcdGxldCBzdGF0UHJvcHMgXHRcdFx0PSBwdWJsaWNGdW5jdGlvbnMuc3RhdFByb3BlcnRpZXM7XHJcblx0XHRsZXQgc3RhdGljU3RhdFZhbHVlc1x0PSB7fTtcclxuXHRcdGxldCBuZXdTdGF0XHRcdFx0XHQ9IDA7XHJcblxyXG5cdFx0Zm9yIChsZXQgc3RhdCBpbiBzdGF0UHJvcHMpe1xyXG5cdFx0XHRuZXdTdGF0ID0gKChwdWJsaWNGdW5jdGlvbnMuZDYoc3RhdFByb3BzW3N0YXRdLnJvbGwubnVtYmVyT2ZEaWNlKSArIHN0YXRQcm9wc1tzdGF0XS5yb2xsLnBsdXMpICogc3RhdFByb3BzW3N0YXRdLnJvbGwubXVsdGlwbGllcik7XHJcblx0XHRcdHN0YXRpY1N0YXRWYWx1ZXNbc3RhdF0gPSBuZXdTdGF0O1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgW3N0YXRdOiBuZXdTdGF0XHR9KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0TW92ZTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyBzdGVwOiAyXHR9KTtcclxuXHR9LFxyXG5cdGJ1bmRsZVN0YXRzOiBmdW5jdGlvbigpe1xyXG5cdFx0bGV0IHN0YXRzID0ge307XHJcblx0XHRmb3IgKGxldCBzdGF0IGluIHB1YmxpY0Z1bmN0aW9ucy5zdGF0UHJvcGVydGllcyl7XHJcblx0XHRcdHN0YXRzW3N0YXRdID0gdGhpcy5zdGF0ZVtzdGF0XVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0YXRzO1xyXG5cdH0sXHJcblx0ZW50ZXJTdGF0czogZnVuY3Rpb24oKXtcclxuXHRcdC8vPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD17c3RhdH0gdmFsdWU9e3RoaXMuc3RhdGUuc3RhdHNbc3RhdF19IG5hbWU9e3N0YXROYW1lfSBvbkNsaWNrPXt0aGlzLmVkaXRTdGF0fSBtaW49XCItMTAwXCIgbWF4PVwiOTBcIiBzdGVwPVwiNVwiIC8+XHJcblx0fSxcclxuXHRhY2NlcHRTdGF0czogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiA8YnV0dG9uPkFjY2VwdDwvYnV0dG9uPlxyXG5cdH0sXHJcblx0c2V0TW92ZTogZnVuY3Rpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKHB1YmxpY0Z1bmN0aW9ucy5tb3ZlTW9kaWZpZXIodGhpcy5zdGF0ZS5TVFIsIHRoaXMuc3RhdGUuREVYLCB0aGlzLnN0YXRlLlNJWiwgdGhpcy5zdGF0ZS5hZ2UpKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe01vdmU6IHB1YmxpY0Z1bmN0aW9ucy5tb3ZlTW9kaWZpZXIodGhpcy5zdGF0ZS5TVFIsIHRoaXMuc3RhdGUuREVYLCB0aGlzLnN0YXRlLlNJWiwgdGhpcy5zdGF0ZS5hZ2UpfSk7XHJcblx0fSxcclxuXHJcblx0YWdlQnJhY2tldHM6IFtcclxuXHRcdHttaW46IDE1LCBcdG1heDogMTksXHRjaGVja3M6IDAsIGFwcG1pbnVzOiAgMCwgc3RhdG1pbnVzOiAwLFx0dGV4dDogXCJEZWR1Y3QgNSBwb2ludHMgZnJvbSBTVFIgb3IgU0laLCBhbmQgYWxzbyBmcm9tIEVEVS4gUmUtcm9sbCBMdWNrLCB1c2UgaGlnaGVzdCB2YWx1ZS5cIn0sXHJcblx0XHR7bWluOiAyMCwgXHRtYXg6IDM5LFx0Y2hlY2tzOiAxLCBhcHBtaW51czogIDAsIHN0YXRtaW51czogMCxcdHRleHQ6IFwiT25lIGltcHJvdmVtZW50IGNoZWNrIGZvciBFRFUuXCJ9LFxyXG5cdFx0e21pbjogNDAsIFx0bWF4OiA0OSxcdGNoZWNrczogMiwgYXBwbWludXM6ICA1LCBzdGF0bWludXM6IDUsXHR0ZXh0OiBcIkRlZHVjdCA1IHBvaW50cyBmcm9tIFNUUiwgQ09OIG9yIERFWCwgYW5kIGFsc28gZnJvbSBBUFAuIE1ha2UgMiBpbXByb3ZlbWVudCBjaGVja3MgZm9yIEVEVS5cIn0sXHJcblx0XHR7bWluOiA1MCwgXHRtYXg6IDU5LFx0Y2hlY2tzOiAzLCBhcHBtaW51czogMTAsIHN0YXRtaW51czogMTAsXHR0ZXh0OiBcIkRlZHVjdCAxMCBwb2ludHMgZnJvbSBTVFIsIENPTiBvciBERVggKHNwbGl0IGFjcm9zcyBvbmUsIHR3byBvciBhbGwgdGhyZWUpLCBhbmQgYWxzbyBmcm9tIEFQUC4gTWFrZSAzIGltcHJvdmVtZW50IGNoZWNrcyBmb3IgRURVLlwifSxcclxuXHRcdHttaW46IDYwLCBcdG1heDogNjksXHRjaGVja3M6IDQsIGFwcG1pbnVzOiAxNSwgc3RhdG1pbnVzOiAyMCxcdHRleHQ6IFwiRGVkdWN0IDIwIHBvaW50cyBmcm9tIFNUUiwgQ09OIG9yIERFWCAoc3BsaXQgYWNyb3NzIG9uZSwgdHdvIG9yIGFsbCB0aHJlZSksIGFuZCByZWR1Y2UgQVBQIGJ5IDE1LiBNYWtlIDQgaW1wcm92ZW1lbnQgY2hlY2tzIGZvciBFRFUuXCJ9LFxyXG5cdFx0e21pbjogNzAsIFx0bWF4OiA3OSxcdGNoZWNrczogNCwgYXBwbWludXM6IDIwLCBzdGF0bWludXM6IDQwLFx0dGV4dDogXCJEZWR1Y3QgNDAgcG9pbnRzIGZyb20gU1RSLCBDT04gb3IgREVYIChzcGxpdCBhY3Jvc3Mgb25lLCB0d28gb3IgYWxsIHRocmVlKSwgYW5kIHJlZHVjZSBBUFAgYnkgMjAuIE1ha2UgNCBpbXByb3ZlbWVudCBjaGVja3MgZm9yIEVEVS5cIn0sXHJcblx0XHR7bWluOiA4MCwgXHRtYXg6IDg5LFx0Y2hlY2tzOiA0LCBhcHBtaW51czogMjUsIHN0YXRtaW51czogODAsIHRleHQ6IFwiRGVkdWN0IDgwIHBvaW50cyBmcm9tIFNUUiwgQ09OIG9yIERFWCAoc3BsaXQgYWNyb3NzIG9uZSwgdHdvIG9yIGFsbCB0aHJlZSksIGFuZCByZWR1Y2UgQVBQIGJ5IDI1LiBNYWtlIDQgaW1wcm92ZW1lbnQgY2hlY2tzIGZvciBFRFUuXCJ9XHJcblx0XSxcclxuXHRhZ2VTZXQ6IGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHthZ2U6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKX0pO1xyXG5cdH0sXHJcblx0YWdlQWNjZXB0OiBmdW5jdGlvbihlKXtcclxuXHRcdHdpbmRvdy5hZ2VQaWNrZXIuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7c3RlcDogM30pO1xyXG5cclxuXHRcdGxldCBicmFja2V0RWZmZWN0cyA9IHRoaXMuYWdlQnJhY2tldHNcclxuXHRcdFx0LmZpbmQoKGJyYWNrZXQpPT57IGlmIChicmFja2V0Lm1pbiA8PSB0aGlzLnN0YXRlLmFnZSAmJiBicmFja2V0Lm1heCA+PSB0aGlzLnN0YXRlLmFnZSkgcmV0dXJuIGJyYWNrZXQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRsZXQgZWZmZWN0cyA9ICcnO1xyXG5cdFx0bGV0IGVkdSA9ICgoKT0+e3JldHVybiB0aGlzLnN0YXRlLkVEVX0pKCk7XHJcblx0XHRcdGlmKGJyYWNrZXRFZmZlY3RzLmNoZWNrcyA+IDApIHtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8PSBicmFja2V0RWZmZWN0cy5jaGVja3M7IGkrKyl7XHJcblx0XHRcdFx0XHRsZXQgcm9sbCA9IHB1YmxpY0Z1bmN0aW9ucy5kMTAwKCk7XHJcblx0XHRcdFx0XHRpZiAocm9sbCA+IGVkdSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgZWR1SW5jcmVhc2UgPSBNYXRoLmNlaWwocHVibGljRnVuY3Rpb25zLmQxMDAoKS8xMCk7XHJcblx0XHRcdFx0XHRcdGVmZmVjdHMgKz0gJzxwPkVkdWNhdGlvbiBjaGVjaycrKGJyYWNrZXRFZmZlY3RzLmNoZWNrcyA+IDEgPyAnICcgKyBpIDogJycpICsnOiBSb2xsZWQgJyArIHJvbGwgKyBcclxuXHRcdFx0XHRcdFx0Jy4gPHNwYW4gY2xhc3M9XCJzdWNjZXNzXCI+U3VjY2VzcyE8L3NwYW4+IEVEVSB3YXMgaW5jcmVhc2VkIGJ5IDxzcGFuIGNsYXNzPVwic3VjY2Vzc1wiPicgKyBlZHVJbmNyZWFzZSArICc8L3NwYW4+LCBmcm9tICcgKyBlZHUgKycgdG8gJysgKGVkdSArPWVkdUluY3JlYXNlKSArJzwvcD4nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVmZmVjdHMgKz0gJzxwPkVkdWNhdGlvbiBjaGVjaycrKGJyYWNrZXRFZmZlY3RzLmNoZWNrcyA+IDEgPyAnICcgKyBpIDogJycpICsnOiBSb2xsZWQgJyArIHJvbGwgKyBcclxuXHRcdFx0XHRcdFx0Jy4gPHNwYW4gY2xhc3M9XCJmYWlsdXJlXCI+Tm8gaW5jcmVhc2U8L3NwYW4+LiBZb3UgbmVlZGVkIHRvIHJvbGwgPGVtPm1vcmU8L2VtPiB0aGFuICcgKyBlZHUgKyAnPC9wPic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGJyYWNrZXRFZmZlY3RzLmFwcG1pbnVzICE9IDAgKXtcclxuXHRcdFx0bGV0IG5ld0FQUCA9IHRoaXMuc3RhdGUuQVBQIC0gYnJhY2tldEVmZmVjdHMuYXBwbWludXM7XHJcblx0XHRcdGVmZmVjdHMgKz0gJzxwPjxzcGFuIGNsYXNzPVwiZGVjcmVhc2VcIj5BcHBlYXJhbmNlIGRlY3JlYXNlZDwvc3Bhbj4gYnkgJysgYnJhY2tldEVmZmVjdHMuYXBwbWludXMgKyAnIHBvaW50cywgZnJvbSAnICsgdGhpcy5zdGF0ZS5BUFAgKyAnIHRvICcgKyBuZXdBUFAgKyAnPC9wPic7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe0FQUDogbmV3QVBQfSlcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYnJhY2tldEVmZmVjdHMuc3RhdG1pbnVzID4gMCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzdGF0TWludXMgOiBicmFja2V0RWZmZWN0cy5zdGF0bWludXN9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHthZ2VFZmZlY3RzOiBlZmZlY3RzfSlcclxuXHRcdHRoaXMuc2V0U3RhdGUoe0VEVTogZWR1fSlcclxuXHJcblx0fSxcclxuXHRzYXZlVGV4dDpmdW5jdGlvbihldmVudCl7XHJcblx0XHRsZXQga2V5ID0gZXZlbnQudGFyZ2V0Lm5hbWU7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtba2V5XTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XHJcblx0fSxcclxuXHRzYXZlQ2hhcmFjdGVyOmZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgc2F2ZUluZm8gXHRcdD0gdGhpcy5idW5kbGVTdGF0cygpO1xyXG5cdFx0XHRzYXZlSW5mby5uYW1lIFx0XHQ9IHRoaXMuc3RhdGUubmFtZTtcclxuXHRcdFx0c2F2ZUluZm8ub2NjdXBhdGlvbiA9IHRoaXMuc3RhdGUub2NjdXBhdGlvbjsgXHJcblx0XHRcdHNhdmVJbmZvLnJlc2lkZW5jZSBcdD0gdGhpcy5zdGF0ZS5yZXNpZGVuY2U7IFxyXG5cdFx0XHRzYXZlSW5mby5wbGF5ZXIgXHQ9IHRoaXMuc3RhdGUucGxheWVyO1xyXG5cdFx0XHRzYXZlSW5mby5hZ2UgXHRcdD0gdGhpcy5zdGF0ZS5hZ2U7XHJcblx0XHRcdHNhdmVJbmZvID0gSlNPTi5zdHJpbmdpZnkoc2F2ZUluZm8pO1xyXG5cdFx0XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2hhcmFjdGVyMScsIHNhdmVJbmZvKVxyXG5cdFx0Y29uc29sZS5sb2coJ1NhdmVkIENoYXJhY3RlciBpbiBsb2NhbCBzdG9yYWdlIHNsb3QgXCJjaGFyYWN0ZXJzbG90MTpcIlxcbicsIHNhdmVJbmZvKTtcclxuXHRcdGxvY2F0aW9uLnJlbG9hZCgpXHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgaGFzU3RhdHMgPSB0cnVlO1xyXG5cclxuXHRcdGZvciAobGV0IHN0YXQgaW4gdGhpcy5zdGF0ZS5zdGF0cykgeyBpZiAodGhpcy5zdGF0ZS5zdGF0c1tzdGF0XSA9PT0gMCkgaGFzU3RhdHMgPSBmYWxzZSB9XHJcblxyXG5cdFx0cmV0dXJuIDxkaXYgaWQ9XCJjaGFyYWN0ZXJEZXRhaWxzXCIgY2xhc3NOYW1lPVwiY2hhcmFjdGVyR2VuZXJhdGlvblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBpZD1cImhlYWRcIj5cclxuXHRcdFx0XHRcdFx0PGg1PkNhbGwgb2YgQ3RodWxodSBSUEcgN3RoIGVkaXRpb24gY2hhcmFjdGVyIGdlbmVyYXRvcjwvaDU+XHJcblx0XHRcdFx0XHRcdDxoMT5DcmVhdGUgQ2hhcmFjdGVyPC9oMT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PHNwYW4gaWQ9XCJzdGVwT25lXCIgY2xhc3NOYW1lPVwiZmFkZUluXCIgZGF0YS13YWl0PVwiM1wiPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwiZ2VuZXJhdGVTdGF0c1wiIFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXsodGhpcy5zdGF0ZS5zdGVwID09PSAxID8gJ2ZhZGVJbicgOiAnZmFkZU91dCcpfSBcclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ2VuZXJhdGVTdGF0c30gZGlzYWJsZWQ9eyh0aGlzLnN0YXRlLnN0ZXAgPT09IDEgPyBmYWxzZSA6IHRydWUpfT5cclxuXHRcdFx0XHRcdFx0XHRcdEdlbmVyYXRlIHN0YXRzXHJcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImNvbnRyb2xzIFwiICsgKHRoaXMuc3RhdGUuc3RlcCA+IDEgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIpIH0+XHJcblx0XHRcdFx0XHRcdDxTdGF0cyBzdGF0cz17dGhpcy5idW5kbGVTdGF0cygpfSBtb3ZlPXt0aGlzLnN0YXRlLk1vdmV9IC8+XHJcblx0XHRcdFx0XHRcdDxkaXYgXHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3tcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTpcImZsZXhcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0anVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBhZGRpbmdUb3A6IFwiNHJlbVwiXHJcblx0XHRcdFx0XHRcdFx0fX0+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3tcclxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9udFNpemU6XCIzcmVtXCJcclxuXHRcdFx0XHRcdFx0XHR9fT5BZ2U6IDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJhZ2VQaWNrZXJcIiB0eXBlPVwibnVtYmVyXCIgbWluPVwiMTVcIiBtYXg9XCI4OVwiIGRlZmF1bHRWYWx1ZT17dGhpcy5zdGF0ZS5hZ2V9IG9uQ2hhbmdlPXt0aGlzLmFnZVNldH0gIHN0eWxlPXt7bWFyZ2luTGVmdDo0LG1hcmdpblJpZ2h0OiA0fX0vPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17dGhpcy5hZ2VBY2NlcHR9IGRpc2FibGVkPXsoKHRoaXMuc3RhdGUuYWdlID4gMTQgJiYgdGhpcy5zdGF0ZS5hZ2UgPCA4OSkgJiYgdGhpcy5zdGF0ZS5zdGVwID09PSAyID8gZmFsc2U6IHRydWUpfT5BY2NlcHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxBZ2VEZXNjcmlwdGlvbiBcclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17e1xyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dENlbnRlcjogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdFx0XHRcdGZvbnRTaXplOiBcIjNyZW1cIlxyXG5cdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0YWdlPXt0aGlzLnN0YXRlLmFnZX0gXHJcblx0XHRcdFx0XHRcdFx0YnJhY2tldHM9e3RoaXMuYWdlQnJhY2tldHN9IC8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17XCJhZ2VFZmZlY3RzIFwiICsgKHRoaXMuc3RhdGUuc3RlcCA+IDIgPyBcInZpc2libGVcIiA6IFwiaGlkZGVuXCIpIH0+XHJcblx0XHRcdFx0XHRcdDxwIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiB0aGlzLnN0YXRlLmFnZUVmZmVjdHN9fSAvPlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcInJvdW5kVXAgXCIgKyAodGhpcy5zdGF0ZS5zdGVwID4gMiA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIil9PlxyXG5cdFx0XHRcdFx0XHQ8aDM+Q2hhcmFjdGVyIG5hbWU8L2gzPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIG9uQmx1cj17dGhpcy5zYXZlVGV4dH0gLz5cclxuXHRcclxuXHRcdFx0XHRcdFx0PGgzPk9jY3VwYXRpb248L2gzPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwib2NjdXBhdGlvblwiIG9uQmx1cj17dGhpcy5zYXZlVGV4dH0gLz5cclxuXHJcblx0XHRcdFx0XHRcdDxoMz5SZXNpZGVuY2UgKGNpdHkgb3IgYXJlYSk8L2gzPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVzaWRlbmNlXCIgb25CbHVyPXt0aGlzLnNhdmVUZXh0fSAvPlxyXG5cdFxyXG5cdFx0XHRcdFx0XHQ8aDM+UGxheWVyIG5hbWU8L2gzPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGxheWVyXCIgb25CbHVyPXt0aGlzLnNhdmVUZXh0fSAvPlxyXG5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxidXR0b24gc3R5bGU9e3tcclxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiZ3JlZW5cIixcclxuXHRcdFx0XHRcdFx0Y29sb3I6XCJ3aGl0ZVwiXHJcblx0XHRcdFx0XHR9fSBjbGFzc05hbWU9eyh0aGlzLnN0YXRlLnN0ZXAgPiAyID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiKX0gb25DbGljaz17dGhpcy5zYXZlQ2hhcmFjdGVyfT5TYXZlIGFuZCBwcm9jZWVkPC9idXR0b24+XHJcblxyXG5cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblx0fVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDcmVhdGVDaGFyYWN0ZXJcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbXBvbmVudHMvY3JlYXRlQ2hhcmFjdGVyLmpzeFxuICoqLyIsImxldCBQdWJsaWNGdW5jdGlvbnMgPSB7XHJcblx0Ly8gU1RBVElDU1xyXG5cdHN0YXRQcm9wZXJ0aWVzOiB7XHJcblx0XHRcdFNUUiAgOiAge25hbWU6IFwiU1RSXCIsICBkZXNjOiBcIlN0cmVuZ3RoXCIsXHRcdHR5cGU6IFwiYmFzZVwiLCByb2xsOiB7bnVtYmVyT2ZEaWNlOiAzLCBkaWNldHlwZTogNiwgcGx1czogMCwgbXVsdGlwbGllcjogNX0gfSxcclxuXHRcdFx0REVYICA6ICB7bmFtZTogXCJERVhcIiwgIGRlc2M6IFwiRGV4aXRlcml0eVwiLFx0XHR0eXBlOiBcImJhc2VcIiwgcm9sbDoge251bWJlck9mRGljZTogMywgZGljZXR5cGU6IDYsIHBsdXM6IDAsIG11bHRpcGxpZXI6IDV9IH0sXHJcblx0XHRcdFBPVyAgOiAge25hbWU6IFwiUE9XXCIsICBkZXNjOiBcIlBvd2VyXCIsXHRcdFx0dHlwZTogXCJiYXNlXCIsIHJvbGw6IHtudW1iZXJPZkRpY2U6IDMsIGRpY2V0eXBlOiA2LCBwbHVzOiAwLCBtdWx0aXBsaWVyOiA1fSB9LFxyXG5cdFx0XHRDT04gIDogIHtuYW1lOiBcIkNPTlwiLCAgZGVzYzogXCJDb25zdGl0dXRpb25cIiwgXHR0eXBlOiBcImJhc2VcIiwgcm9sbDoge251bWJlck9mRGljZTogMywgZGljZXR5cGU6IDYsIHBsdXM6IDAsIG11bHRpcGxpZXI6IDV9IH0sXHJcblx0XHRcdEFQUCAgOiAge25hbWU6IFwiQVBQXCIsICBkZXNjOiBcIkFwcGVhcmFuY2VcIixcdFx0dHlwZTogXCJiYXNlXCIsIHJvbGw6IHtudW1iZXJPZkRpY2U6IDMsIGRpY2V0eXBlOiA2LCBwbHVzOiAwLCBtdWx0aXBsaWVyOiA1fSB9LFxyXG5cdFx0XHRFRFUgIDogIHtuYW1lOiBcIkVEVVwiLCAgZGVzYzogXCJFZHVjYXRpb25cIixcdFx0dHlwZTogXCJiYXNlXCIsIHJvbGw6IHtudW1iZXJPZkRpY2U6IDIsIGRpY2V0eXBlOiA2LCBwbHVzOiA2LCBtdWx0aXBsaWVyOiA1fSB9LFxyXG5cdFx0XHRTSVogIDogIHtuYW1lOiBcIlNJWlwiLCAgZGVzYzogXCJTaXplXCIsXHRcdFx0dHlwZTogXCJiYXNlXCIsIHJvbGw6IHtudW1iZXJPZkRpY2U6IDIsIGRpY2V0eXBlOiA2LCBwbHVzOiA2LCBtdWx0aXBsaWVyOiA1fSB9LFxyXG5cdFx0XHRJTlQgIDogIHtuYW1lOiBcIklOVFwiLCAgZGVzYzogXCJJbnRlbGxpZ2VuY2VcIiwgXHR0eXBlOiBcImJhc2VcIiwgcm9sbDoge251bWJlck9mRGljZTogMiwgZGljZXR5cGU6IDYsIHBsdXM6IDYsIG11bHRpcGxpZXI6IDV9IH0sXHJcblx0XHRcdEx1Y2sgOiAge25hbWU6IFwiTHVja1wiLCBkZXNjOiBcIkx1Y2tcIixcdFx0XHR0eXBlOiBcImx1Y2tcIiwgcm9sbDoge251bWJlck9mRGljZTogMywgZGljZXR5cGU6IDYsIHBsdXM6IDAsIG11bHRpcGxpZXI6IDV9IH0sXHJcblx0fSxcclxuXHJcblx0Ly8gUEVORElORyBGVU5DVElPTlNcclxuXHRnZXRTdG9yZWRDaGFyYWN0ZXJzOiBmdW5jdGlvbiAoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiUmV0cmlldmUgbGlzdCBvZiBzdG9yZWQgQ2hhcmFjdGVycy5cIilcclxuXHR9LFxyXG5cdHNhdmVDaGFyYWN0ZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlNhdmUgQ2hhcmFjdGVyXCIpXHJcblx0fSxcclxuXHRsb2FkQ2hhcmFjdGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJMb2FkIENoYXJhY3RlclwiKVxyXG5cdH0sXHJcblx0ZGVsZXRlQ2hhcmFjdGVyOiBmdW5jdGlvbihzYXZlU2xvdCl7XHJcblx0XHQvLyBXb3JraW5nIHZlcnNpb24gZnJvbSBjb21wb25lbnQ6IGNvcmVTaGVldC5kZWxldGVDaGFyYWN0ZXI6XHJcblx0XHRsZXQgZGVsZXRlQWxlcnQgPSBjb25maXJtKCdEZWxldGUgdGhpcyBjaGFyYWN0ZXInKTtcclxuXHRcdFxyXG5cdFx0aWYgKGRlbGV0ZUFsZXJ0ID09PSB0cnVlKSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjaGFyYWN0ZXInK3NhdmVTbG90KTtcclxuXHRcdH1cclxuXHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJMb2FkIENoYXJhY3RlclwiKVxyXG5cdH0sXHJcblxyXG5cdCAgICBtYXhWYWx1ZTogZnVuY3Rpb24odHlwZSl7XHJcbi8vXHQgICAgXHRNQUtFIElUIFBVUkU6IHRha2UgdGhlIHN0YXRzIGFzIGEgcGFyYW1ldGVyXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlKFwiaGl0UG9pbnRzXCIpOiAgcmV0dXJuIE1hdGguZmxvb3IoKHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLkNPTiArIHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlNJWikgLyAxMClcclxuICAgICAgICAgICAgY2FzZShcIkx1Y2tcIik6ICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5MdWNrXHJcbiAgICAgICAgICAgIGNhc2UoXCJzYW5pdHlcIik6ICAgICByZXR1cm4gKHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlBPVyAtIHRoaXMucHJvcHMuY2hhcmFjdGVyLmhlYWx0aC5teXRob3MpXHJcbiAgICAgICAgICAgIGNhc2UoXCJtYWdpY1wiKTogICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5QT1cgLyA1KVxyXG4gICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgIHJldHVybiA5OVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcblxyXG5cdC8vVEVTVEVEIEZVTkNUSU9OU1xyXG5cdGQ2OiBmdW5jdGlvbihudW0pe1xyXG5cdFx0bGV0IG91dHB1dCA9IDA7XHJcblx0XHRpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIG51bSA9IDE7XHJcblx0XHRmb3IgKGxldCBpICA9IDA7IGk8bnVtOyBpKyspIHtcclxuXHRcdFx0b3V0cHV0ICs9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiA1KSArIDEpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG91dHB1dCBcclxuXHR9LFxyXG5cdGQxMDA6IGZ1bmN0aW9uKCkge1x0XHRcclxuXHRcdGNvbnN0IG91dHB1dCA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiA5OSkgKyAxKTtcclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fSxcclxuXHJcblx0Z2VuZXJhdGVTdGF0czogZnVuY3Rpb24oKXtcclxuXHRcdGxldCBvdXRwdXQgXHQ9IFx0e307XHJcblx0XHRmb3IgKGkgaW4gdGhpcy5zdGF0UHJvcGVydGllcyl7XHJcblx0XHRcdGxldCBzdGF0ID0gdGhpcy5zdGF0UHJvcGVydGllc1tpXTtcdFx0XHJcblx0XHRcdG91dHB1dFtzdGF0Lm5hbWVdID0gKCh0aGlzLmQ2KHN0YXQucm9sbC5udW1iZXJPZkRpY2UpICsgc3RhdC5yb2xsLnBsdXMpICogc3RhdC5yb2xsLm11bHRpcGxpZXIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG91dHB1dDtcclxuXHR9LFxyXG5cdG1vdmVNb2RpZmllcjogZnVuY3Rpb24gKFNUUiwgREVYLCBTSVosIGFnZSkge1xyXG5cdFx0bGV0IG1vdmVNb2RpZmllciA9IDJcclxuXHJcblx0XHRpZiAoREVYICA8ICBTSVogICYmICBTVFIgIDwgIFNJWikgXHRtb3ZlTW9kaWZpZXIgPSA3XHJcblx0XHRpZiAoU1RSICA+PSBTSVogIHx8ICBERVggID49IFNJWikgXHRtb3ZlTW9kaWZpZXIgPSA4XHJcblx0XHRpZiAoU1RSICA+ICBTSVogICYmICBERVggID4gIFNJWilcdG1vdmVNb2RpZmllciA9IDlcclxuXHJcblx0XHRpZiAoKGFnZSAtIDMwKSA+IDEwKSB7IC8vIE9sZGVyIHRoYW4gNDBcclxuXHRcdFx0bGV0IGFnZU1vZGlmaWVyID0gYWdlIC0zMFxyXG5cdFx0XHRcdGFnZU1vZGlmaWVyID0gYWdlTW9kaWZpZXIudG9TdHJpbmcoKS5jaGFyQXQoMClcdFxyXG5cdFx0XHRtb3ZlTW9kaWZpZXIgLT0gYWdlTW9kaWZpZXJcclxuXHRcdH0gXHJcblx0XHRyZXR1cm4gKG1vdmVNb2RpZmllcilcclxuXHR9LFxyXG5cclxuXHQvLyBVdGlsaXR5IGZ1bmN0aW9uc1xyXG5cdGJ1bmRsZURhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgYnVuZGxlRGF0ZSBcdD0gJ0J1bmRsZSBEYXRlOiAnO1xyXG5cdFx0YnVuZGxlRGF0ZSBcdFx0Kz0gRGF0ZS5ub3coKTtcclxuXHRcdHJldHVybiBidW5kbGVEYXRlO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaWNGdW5jdGlvbnM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Z1bmN0aW9ucy9wdWJsaWMuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi8vKiogQGpzeCBSZWFjdERPTSAqL1xyXG4ndXNlIHN0cmljdCdcclxuXHJcbmxldCBwdWJsaWNGdW5jdGlvbnMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvcHVibGljJyk7XHJcblxyXG5sZXQgU3RhdHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzdGF0czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdG1vdmU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcclxuXHR9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgXHRyZXR1cm4gPGRpdiBpZD1cInN0YXRzXCIgY2xhc3NOYW1lPVwiZmFkZUluXCI+XHJcbiAgICBcdFx0XHR7T2JqZWN0LmtleXModGhpcy5wcm9wcy5zdGF0cykubWFwKCh2YWx1ZSwgaW5kZXgpPT57XHJcblxyXG4gICAgXHRcdFx0XHRpZiAodmFsdWUgIT0gXCJMdWNrXCIpIHtcclxuXHJcblx0ICAgIFx0XHRcdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInN0YXQgXCIgKyB2YWx1ZX0ga2V5PXt2YWx1ZX0+XHJcblx0ICAgIFx0XHRcdFx0XHRcclxuXHQgICAgXHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJuYW1lXCI+XHJcblx0ICAgIFx0XHRcdFx0XHRcdHt2YWx1ZX1cclxuXHQgICAgXHRcdFx0XHRcdDwvaDQ+XHJcblx0ICAgIFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZ1bGxcIj5cclxuXHQgICAgXHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuc3RhdHNbdmFsdWVdfVxyXG5cdCAgICBcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdCAgICBcdFx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhcnRpYWxWYWx1ZXNcIj5cclxuXHRcdFx0XHQgICAgXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoYWxmXCI+XHJcblx0XHRcdFx0ICAgIFx0XHRcdFx0e01hdGguZmxvb3IodGhpcy5wcm9wcy5zdGF0c1t2YWx1ZV0vMil9XHJcblx0XHRcdFx0ICAgIFx0XHRcdDwvZGl2PlxyXG5cdCAgICBcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpZnRoXCI+XHJcblx0ICAgIFx0XHRcdFx0XHRcdFx0e01hdGguZmxvb3IodGhpcy5wcm9wcy5zdGF0c1t2YWx1ZV0vNSl9XHJcblx0ICAgIFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdCAgICBcdFx0XHRcdFx0PC9kaXY+XHJcblx0ICAgIFx0XHRcdFx0XHRcclxuXHQgICAgXHRcdFx0XHQ8L2Rpdj5cclxuXHQgICAgXHRcdFx0fVx0XHJcbiAgICBcdFx0XHR9KX1cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17XCJzdGF0IG1vdmVcIn0ga2V5PVwibW92ZVwiPlx0ICAgIFx0XHRcdFx0XHRcclxuICAgIFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibmFtZVwiPlxyXG4gICAgXHRcdFx0XHRcdFx0TW92ZVxyXG4gICAgXHRcdFx0XHRcdDwvaDQ+XHJcbiAgICBcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmdWxsXCI+XHJcbiAgICBcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5tb3ZlfVxyXG4gICAgXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuICAgIFx0XHQgICAgXHRcdDxkaXYgY2xhc3NOYW1lPVwicGFydGlhbFZhbHVlc1wiPlxyXG5cdFx0XHQgICAgXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoYWxmXCI+XHJcblx0XHRcdCAgICBcdFx0XHRcdHtwYXJzZUludCh0aGlzLnByb3BzLm1vdmUpICogNSArIFwibVwifVxyXG5cdFx0XHQgICAgXHRcdFx0PC9kaXY+XHJcbiAgICBcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZpZnRoXCI+XHJcbiAgICBcdFx0XHRcdFx0XHRcdHJvdW5kXHJcbiAgICBcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuICAgIFx0XHRcdFx0XHQ8L2Rpdj5cdFx0XHJcblx0ICAgIFx0XHRcdDwvZGl2PlxyXG5cclxuICAgICBcdFx0PC9kaXY+XHJcbiAgICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRzXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21wb25lbnRzL3N0YXRzLmpzeFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qKiBAanN4IFJlYWN0RE9NICovXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxubGV0IEFnZURlc2NyaXB0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0YWdlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0YnJhY2tldHM6IFJlYWN0LlByb3BUeXBlcy5hcnJheVxyXG5cdH0sXHJcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG5cdCAgXHRyZXR1cm4gbmV4dFByb3BzLmFnZSAhPT0gdGhpcy5wcm9wcy5hZ2U7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgYnJhY2tldERlc2NyaXB0aW9uID0gdGhpcy5wcm9wcy5icmFja2V0c1xyXG5cdFx0XHQuZmluZCgoYnJhY2tldCk9PnsgaWYgKGJyYWNrZXQubWluIDw9IHRoaXMucHJvcHMuYWdlICYmIGJyYWNrZXQubWF4ID49IHRoaXMucHJvcHMuYWdlKSByZXR1cm4gYnJhY2tldDtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIDxwPntcIkVmZmVjdDogXCIgKyBicmFja2V0RGVzY3JpcHRpb24udGV4dH08L3A+XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFnZURlc2NyaXB0aW9uO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50cy9hZ2VEZXNjcmlwdGlvbi5qc3hcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi8vKiogQGpzeCBSZWFjdERPTSAqL1xyXG4ndXNlIHN0cmljdCdcclxuXHJcbmxldCBFZGl0U3RhdHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRzdGF0czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCAgXHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgdGVtcHZhbHVlcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgc3RhdCBpbiB0aGlzLnByb3BzLnN0YXRzKVx0e1xyXG5cdFx0XHR0ZW1wdmFsdWVzLnB1c2goe25hbWU6IFtzdGF0XSwgdmFsdWU6IHRoaXMucHJvcHMuc3RhdHNbc3RhdF19KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3RhdHNcIj5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRlbXB2YWx1ZXMubWFwKGZ1bmN0aW9uIChzdGF0LCBpLCBzdGF0cyl7XHJcblx0XHRcdFx0XHRyZXR1cm4gPEVkaXRTdGF0IHN0YXROYW1lPXtzdGF0Lm5hbWV9IHN0YXRWYWw9e3N0YXQudmFsdWUgfSBrZXk9eydkZWNyZWFzZS0nICsgc3RhdC5uYW1lfSAvPlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdDwvZGl2PjsgXHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRWRpdFN0YXRzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50cy9lZGl0U3RhdHMuanN4XG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovLyoqIEBqc3ggUmVhY3RET00gKi9cclxuJ3VzZSBzdHJpY3QnXHJcbi8vdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG52YXIgU2tpbGxMaXN0ID0gcmVxdWlyZSgnLi9za2lsbExpc3QnKVxyXG5sZXQgQ2hhcmFjdGVyRGV0YWlscyA9IHJlcXVpcmUoXCIuL2NoYXJhY3RlckRldGFpbHNcIilcclxuLy9sZXQgU3RvcmFnZU1hbmFnZXIgPSByZXF1aXJlKFwiLi4vbW9kdWxlcy9zdG9yYWdlTWFuYWdlclwiKVxyXG5cclxubGV0IENvcmVTaGVldCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRQcm9wVHlwZXM6IHtcclxuXHRcdHNhdmVzbG90OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0bGV0IHN0b3JlZERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhcmFjdGVyJyt0aGlzLnByb3BzLnNhdmVzbG90KTtcclxuXHRcdFx0c3RvcmVkRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkRGF0YSk7XHJcblx0XHRcdGNvbnNvbGUuZGlyKHN0b3JlZERhdGEpO1xyXG5cclxuXHRcdGxldCBpbXBvcnRlZFN0YXRzID0ge1xyXG5cdFx0XHRTVFI6IHN0b3JlZERhdGEuU1RSLFxyXG5cdFx0XHRDT046IHN0b3JlZERhdGEuQ09OLFxyXG5cdFx0XHRTSVo6IHN0b3JlZERhdGEuU0laLFxyXG5cdFx0XHRERVg6IHN0b3JlZERhdGEuREVYLFxyXG5cdFx0XHRBUFA6IHN0b3JlZERhdGEuQVBQLFxyXG5cdFx0XHRJTlQ6IHN0b3JlZERhdGEuSU5ULFxyXG5cdFx0XHRQT1c6IHN0b3JlZERhdGEuUE9XLFxyXG5cdFx0XHRFRFU6IHN0b3JlZERhdGEuRURVLFxyXG5cdFx0XHRMdWNrOiBzdG9yZWREYXRhLkx1Y2tcclxuXHRcdH07XHJcblxyXG5cdFx0bGV0IHNhdmVkQ2hhcmFjdGVyID0ge1xyXG5cdFx0XHRcdG5hbWU6IHN0b3JlZERhdGEubmFtZSxcclxuXHRcdFx0XHRhZ2U6IHN0b3JlZERhdGEuYWdlLFxyXG5cdFx0XHRcdG9jY3VwYXRpb246IHN0b3JlZERhdGEub2NjdXBhdGlvbixcclxuXHRcdFx0XHRzZXg6IFwiTWFsZVwiLFxyXG5cdFx0XHRcdHJlc2lkZW5jZTogc3RvcmVkRGF0YS5yZXNpZGVuY2UsXHJcblx0XHRcdFx0cGxheWVyOiBzdG9yZWREYXRhLnBsYXllcixcclxuXHRcdFx0XHRjb3VudGVyczoge1xyXG5cdFx0XHRcdFx0aGl0UG9pbnRzOiA4LFxyXG5cdFx0XHRcdFx0THVjazogMzAsXHJcblx0XHRcdFx0XHRtYWdpYzogNSxcclxuXHRcdFx0XHRcdHNhbml0eTogNDBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGhlYWx0aDoge1xyXG5cdFx0XHRcdFx0bXl0aG9zOiA3XHRcdFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhdHM6IGltcG9ydGVkU3RhdHMsXHJcblx0XHRcdFx0c2tpbGxzOiBbXHJcblx0XHRcdFx0XHR7aWQ6XCJjbGltYlwiLCB2YWx1ZXM6IFszMiwgNywgMiwgNl19LFxyXG5cdFx0XHRcdFx0e2lkOlwiYXhlXCIsIHZhbHVlczogWzI1LCAyLCA2XX0sXHJcblx0XHRcdFx0XHR7aWQ6XCJhY3RpbmdcIiwgdmFsdWVzOiBbNTMsOCwyLDQsMyw3LDksOSw5LDksOSw5XX1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhdGljczogcmVxdWlyZSgnanNvbiEuLi9hc3NldHMvc2tpbGxzLmpzb24nKSxcclxuXHRcdFx0Y2hlY2tlZFNraWxsczogW10sXHJcblx0XHRcdGNoYXJhY3Rlcjogc2F2ZWRDaGFyYWN0ZXJcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuXHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0aGl0UG9pbnRzOiB0aGlzLnN0YXRlLmNoYXJhY3Rlci5jb3VudGVycy5oaXRQb2ludHMsIFxyXG5cdFx0XHRMdWNrOiB0aGlzLnN0YXRlLmNoYXJhY3Rlci5jb3VudGVycy5MdWNrLCBcclxuXHRcdFx0bWFnaWM6IHRoaXMuc3RhdGUuY2hhcmFjdGVyLmNvdW50ZXJzLm1hZ2ljLCBcclxuXHRcdFx0c2FuaXR5OiB0aGlzLnN0YXRlLmNoYXJhY3Rlci5jb3VudGVycy5zYW5pdHksIFxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdGxldCBjb3VudGVyRm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcmFjdGVyRGV0YWlscycpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJylcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRlckZvcm1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0bGV0IGlucHV0RWxlbWVudHMgPSBjb3VudGVyRm9ybXNbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylcclxuXHRcdFx0Zm9yIChsZXQgZWxlbUlEID0gMDsgZWxlbUlEIDwgaW5wdXRFbGVtZW50cy5sZW5ndGg7IGVsZW1JRCsrICl7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50c1tlbGVtSURdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57dGhpcy5zZXRTdGF0ZSh7W2V2ZW50LnRhcmdldC5uYW1lXTogcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKX0pfSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBza2lsbExpc3RJbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tpbGxzJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGxMaXN0SW5wdXRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0c2tpbGxMaXN0SW5wdXRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XHJcblx0XHRcdFx0bGV0IG5ld0NoZWNrZWRTa2lsbHMgPSBmdW5jdGlvbiAoeCl7cmV0dXJuIHh9KHRoaXMuc3RhdGUuY2hlY2tlZFNraWxscylcclxuXHRcdFx0XHRuZXdDaGVja2VkU2tpbGxzLnB1c2goZXZlbnQudGFyZ2V0Lm5hbWUpXHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHRjaGVja2VkU2tpbGxzIDogbmV3Q2hlY2tlZFNraWxscyB9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVsZXRlQ2hhcmFjdGVyKCl7XHJcblx0XHRsZXQgZGVsZXRlQWxlcnQgPSBjb25maXJtKCdEZWxldGUgdGhpcyBjaGFyYWN0ZXInKTtcclxuXHRcdFxyXG5cdFx0aWYgKGRlbGV0ZUFsZXJ0ID09PSB0cnVlKSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjaGFyYWN0ZXInK3RoaXMucHJvcHMuc2F2ZXNsb3QpO1xyXG5cdFx0fVxyXG5cdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0fSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuXHQgICAgICAgIFx0XHQ8Q2hhcmFjdGVyRGV0YWlscyBjaGFyYWN0ZXI9e3RoaXMuc3RhdGUuY2hhcmFjdGVyfSAvPlxyXG4gICAgICAgXHRcdFx0XHQ8U2tpbGxMaXN0IHNraWxsTGlzdD17dGhpcy5zdGF0ZS5zdGF0aWNzLnNraWxsc30gc3BlY2lhbGl6YXRpb25zPXt0aGlzLnN0YXRlLnN0YXRpY3Muc3BlY2lhbGl6YXRpb25zfSBjaGFyYWN0ZXJTdGF0cz17dGhpcy5zdGF0ZS5jaGFyYWN0ZXIuc3RhdHN9IGNoYXJhY3RlclNraWxscz17dGhpcy5zdGF0ZS5jaGFyYWN0ZXIuc2tpbGxzfSAvPlxyXG4gICAgICAgIFx0XHRcdDxociAvPlxyXG4gICAgICAgIFx0XHRcdDxidXR0b24gb25DbGljaz17dGhpcy5kZWxldGVDaGFyYWN0ZXJ9PkRlbGV0ZSBDaGFyYWN0ZXI8L2J1dHRvbj5cclxuICAgICAgICBcdFx0PC9kaXY+XHJcblx0fVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb3JlU2hlZXRcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NvbXBvbmVudHMvY29yZVNoZWV0LmpzeFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qKiBAanN4IFJlYWN0RE9NICovXHJcbid1c2Ugc3RyaWN0J1xyXG4vL3ZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxudmFyIFNpbmdsZVNraWxsID0gcmVxdWlyZSgnLi9zaW5nbGVTa2lsbCcpXHJcblxyXG5sZXQgU2tpbGxMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNraWxsTGlzdDogXHR0aGlzLnByb3BzLnNraWxsTGlzdCxcclxuXHRcdFx0XHRhbGxTa2lsbHM6IFx0dGhpcy5wcm9wcy5za2lsbExpc3RcclxuXHRcdFx0XHR9XHJcblx0fSxcclxuXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRza2lsbExpc3Q6IFx0XHRcdFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuXHRcdHNwZWNpYWxpemF0aW9uczogXHRSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0Y2hhcmFjdGVyU3RhdHM6IFx0UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNoYXJhY3RlclNraWxsczogXHRSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcclxuXHR9LFxyXG5cclxuXHRza2lsbEdyb3VwczogW1xyXG5cdFx0e3RpdGxlOiBcIkNvbWJhdFwiLCBpdGVtczogWydkb2RnZScsICd0aHJvdycsICdmaXJzdEFpZCddfSxcclxuXHRcdHt0aXRsZTogXCJJbnZlc3RpZ2F0aW9uXCIsIGl0ZW1zOiBbJ2xpYnJhcnlVc2UnLCAnaW50aW1pZGF0ZScsICdjdGh1bGh1TXl0aG9zJywgJ2Zhc3RUYWxrJywgJ2NoYXJtJywgJ3BlcnN1YWRlJywgJ3BzeWNob2xvZ3knLCAnc3BvdEhpZGRlbicsICdsaXN0ZW4nLCAnc3RlYWx0aCcsICd0cmFjayddfSxcclxuXHRcdHt0aXRsZTogXCJGaXJlYXJtc1wiLCBpdGVtczogWydmaXJlYXJtcyddfSxcclxuXHRcdHt0aXRsZTogXCJTY2llbmNlXCIsIGl0ZW1zOiBbJ3NjaWVuY2UnXX0sXHJcblx0XHR7dGl0bGU6IFwiVmVoaWNsZXNcIiwgaXRlbXM6IFsncGlsb3QnLCAnZHJpdmVBdXRvJ119XHJcblx0XSxcclxuXHJcblx0c2tpbGxGaWx0ZXJzOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIDxkaXYgaWQ9XCJmaWx0ZXJzXCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtza2lsbExpc3Q6IHRoaXMuc3RhdGUuYWxsU2tpbGxzfSl9PkFsbDwvYnV0dG9uPlxyXG5cdFx0XHQgICAgXHR7dGhpcy5idXR0b25zQXRvWigpfVxyXG5cdCAgICBcdFx0XHR7dGhpcy5zcGVjaWFsaXphdGlvbkZpbHRlcnMoKX1cclxuICAgIFx0XHRcdDwvZGl2PlxyXG5cdH0sXHJcblx0XHJcblx0YnV0dG9uc0F0b1o6IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgYnV0dG9ucyA9IFtdXHJcblx0XHRmb3IgKHZhciBpID0gNjU7IGkgPD05MDsgaSsrKSB7XHJcblx0XHRcdGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpLCBkaXNhYmxlZFN0YXR1cyA9IHRydWVcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuc3RhdGUuYWxsU2tpbGxzLmZpbHRlcigoc2tpbGwpPT57aWYgKGxldHRlciA9PT0gc2tpbGwubmFtZS5jaGFyQXQoMCkpIGRpc2FibGVkU3RhdHVzID0gZmFsc2V9KVxyXG5cdFx0XHRidXR0b25zLnB1c2goXHJcblx0XHRcdFx0PGJ1dHRvbiBcclxuXHRcdFx0XHRcdHR5cGUgPVx0XHRcImJ1dHRvblwiXHJcblx0XHRcdFx0XHRvbkNsaWNrID1cdHsoZXZlbnQpPT57dGhpcy5zZXRTdGF0ZSh7c2tpbGxMaXN0OiB0aGlzLnN0YXRlLmFsbFNraWxscy5maWx0ZXIoKHMpPT57aWYgKHMubmFtZS5jaGFyQXQoMCkgPT09IGV2ZW50LnRhcmdldC52YWx1ZSkgcmV0dXJuIHMgfSl9KX19XHJcblx0XHRcdCBcdFx0dmFsdWUgPVx0XHR7bGV0dGVyfSBcclxuXHRcdFx0IFx0XHRkaXNhYmxlZCA9XHR7ZGlzYWJsZWRTdGF0dXN9XHJcblx0XHRcdCBcdFx0a2V5ID1cdFx0e1wibGV0dGVyLVwiICsgbGV0dGVyfVxyXG5cdFx0XHQgXHQ+e2xldHRlcn08L2J1dHRvbj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGJ1dHRvbnNcclxuXHR9LFxyXG5cclxuXHRtYWtlU2tpbGxMaXN0OiBmdW5jdGlvbihpbnB1dCl7XHJcblx0XHRsZXQgb3V0cHV0ID0gW10sIHRlbXAgPSBbXVxyXG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggaW5wdXQgKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG5cdFx0XHJcblx0XHRcdGlucHV0Lm1hcCgoaXRlbSkgID0+IHsgdGVtcC5wdXNoKCB0aGlzLnN0YXRlLmFsbFNraWxscy5maWx0ZXIoXHJcblx0XHRcdFx0KHNraWxsKSA9PiB7IGlmIChza2lsbC5pZCA9PT0gaXRlbSB8fCBza2lsbC50eXBlID09PSBpdGVtKSByZXR1cm4gc2tpbGxcdH1cclxuXHRcdFx0XHQpKX1cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0dGVtcC5tYXAoKGl0ZW0pPT57IGlmIChpdGVtLmxlbmd0aCA+PSAxKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBpIGluIGl0ZW0pIHsgb3V0cHV0LnB1c2goaXRlbVtpXSkgfVxyXG5cdFx0XHR9fSlcclxuXHRcdFx0cmV0dXJuIG91dHB1dFxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNwZWNpYWxpemF0aW9uRmlsdGVyczogZnVuY3Rpb24oKXtcclxuXHRcdGxldCBza2lsbHMgPSB0aGlzLnN0YXRlLmFsbFNraWxsc1xyXG5cdFx0bGV0IHNwZWNpYWxpemF0aW9uQnV0dG9ucyA9IFtdXHJcblxyXG5cdFx0dGhpcy5za2lsbEdyb3Vwcy5tYXAoKGdyb3VwKT0+e1xyXG5cdFx0XHRzcGVjaWFsaXphdGlvbkJ1dHRvbnMucHVzaCg8YnV0dG9uIFxyXG5cdFx0XHRcdG9uQ2xpY2s9eyhlKT0+e3RoaXMuc2V0U3RhdGUoe3NraWxsTGlzdDogdGhpcy5tYWtlU2tpbGxMaXN0KGdyb3VwLml0ZW1zKX0pfX1cclxuXHRcdFx0XHRrZXk9e1wiZ3JvdXAtXCIgKyBncm91cC50aXRsZX1cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJzcGVjaWFsaXphdGlvblwiXHJcblx0XHRcdD57Z3JvdXAudGl0bGV9PC9idXR0b24+KVxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gc3BlY2lhbGl6YXRpb25CdXR0b25zXHJcblx0fSxcclxuXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgXHRsZXQgY2hhclNraWxscyA9IHRoaXMucHJvcHMuY2hhcmFjdGVyU2tpbGxzXHJcbiAgICBcdGxldCBjaGFyU3RhdHMgPSB0aGlzLnByb3BzLmNoYXJhY3RlclN0YXRzXHJcblxyXG4gICAgXHRyZXR1cm4gPGRpdj5cclxuICAgIFx0XHRcdFx0e3RoaXMuc2tpbGxGaWx0ZXJzKCl9XHJcbiAgICBcdCBcdFx0XHQ8ZGl2IGlkPVwic2tpbGxzXCI+XHJcblx0ICAgIFx0XHRcdFx0e3RoaXMuc3RhdGUuc2tpbGxMaXN0Lm1hcCgoc2tpbGwpID0+IHsgcmV0dXJuIDxTaW5nbGVTa2lsbCBpZD17c2tpbGwuaWR9IGNsYXNzTmFtZT17c2tpbGwuaWQgKyBcIiBza2lsbFwifSBrZXk9e3NraWxsLmlkfSBza2lsbERhdGE9e3NraWxsfSBpbXByb3ZlbWVudD17Y2hhclNraWxsc30gY2hhclN0YXRzPXtjaGFyU3RhdHN9IC8+XHR9KX1cclxuICAgIFx0XHRcdFx0PC9kaXY+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNraWxsTGlzdFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50cy9za2lsbExpc3QuanN4XG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovLyoqIEBqc3ggUmVhY3RET00gKi9cclxuJ3VzZSBzdHJpY3QnXHJcbi8vbGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG5cclxuXHJcbmxldCBTaW5nbGVTa2lsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRwcm9wVHlwZXM6IHtcclxuXHRcdHNraWxsRGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNoYXJTdGF0czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGltcHJvdmVtZW50OiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcclxuXHR9LFxyXG5cclxuXHRjb21wdXRlU2tpbGxWYWx1ZTogZnVuY3Rpb24oKSB7XHRcclxuXHRcdGxldCBza2lsbFZhbHVlID0gdGhpcy5wcm9wcy5za2lsbERhdGEudmFsdWVcclxuXHRcdGxldCBiYXNlU2tpbGxJZCA9IHRoaXMucHJvcHMuc2tpbGxEYXRhLmlkXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShza2lsbFZhbHVlKSkgc2tpbGxWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy5wcm9wcy5jaGFyU3RhdHNbc2tpbGxWYWx1ZVswXV0gLyBza2lsbFZhbHVlWzFdKVxyXG5cdFx0bGV0IGltcHJvdmVkU2tpbGwgPSB0aGlzLnByb3BzLmltcHJvdmVtZW50LmZpbHRlcihmdW5jdGlvbihpbXByb3ZlZFNraWxsKXtcclxuXHRcdFx0aWYgKGltcHJvdmVkU2tpbGwuaWQgPT09IGJhc2VTa2lsbElkKSBza2lsbFZhbHVlICs9ICBpbXByb3ZlZFNraWxsLnZhbHVlcy5yZWR1Y2UoKGEsIGIgKSA9PiAgYSArIGIgKVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBza2lsbFZhbHVlXHJcblx0fSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICBcdGxldCBza2lsbFZhbHVlID0gdGhpcy5jb21wdXRlU2tpbGxWYWx1ZSgpXHJcbiAgICBcdGxldCBkYXRhU2tpbGxPdXRwdXQgPSB7XCJza2lsbFwiOiB0aGlzLnByb3BzLnNraWxsRGF0YS5uYW1lLFwidmFsdWVzXCI6IFtza2lsbFZhbHVlLCBza2lsbFZhbHVlLzIsIHNraWxsVmFsdWUvNV19XHJcbiAgICBcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IGRhdGEtc2tpbGw9e2RhdGFTa2lsbE91dHB1dH0+XHJcbiAgICBcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT17dGhpcy5wcm9wcy5za2lsbERhdGEuaWR9IC8+XHJcbiAgICBcdFx0XHQ8aDQgY2xhc3NOYW1lPVwibmFtZVwiPnt0aGlzLnByb3BzLnNraWxsRGF0YS5uYW1lfTwvaDQ+XHJcblx0ICAgIFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZ1bGxcIj57TWF0aC5taW4oc2tpbGxWYWx1ZSwgOTkpfTwvZGl2PlxyXG5cdCAgICBcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17KHNraWxsVmFsdWUgPCAyID8gXCJwYXJ0aWFsVmFsdWVzIG5pbFwiOlwicGFydGlhbFZhbHVlc1wiKX0+XHJcblx0ICAgIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9eyhza2lsbFZhbHVlIDwgMiA/IFwiaGFsZiBuaWxcIjpcImhhbGZcIil9PnsoTWF0aC5mbG9vcihza2lsbFZhbHVlLzIpID4gMSA/IE1hdGguZmxvb3Ioc2tpbGxWYWx1ZS8yKTogXCItXCIpfTwvZGl2PlxyXG4gICAgXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXsoc2tpbGxWYWx1ZSA8IDUgPyBcImZpZnRoIG5pbFwiOlwiZmlmdGhcIil9PnsoTWF0aC5mbG9vcihza2lsbFZhbHVlLzUpID4gMSA/IE1hdGguZmxvb3Ioc2tpbGxWYWx1ZS81KTogXCItXCIpfTwvZGl2PlxyXG4gICAgXHRcdFx0XHQ8L2Rpdj5cclxuICAgIFx0XHQ8L2Rpdj5cclxuICAgIH1cclxufSlcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZVNraWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jb21wb25lbnRzL3NpbmdsZVNraWxsLmpzeFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qKiBAanN4IFJlYWN0RE9NICovXHJcbid1c2Ugc3RyaWN0J1xyXG4vL2xldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxubGV0IFN0YXRzICAgICAgICAgICA9IHJlcXVpcmUoJy4vc3RhdHMnKTtcclxubGV0IFBvaW50Q291bnRlciAgICA9IHJlcXVpcmUoJy4vcG9pbnRDb3VudGVyJyk7XHJcbmxldCBwdWJsaWNGdW5jdGlvbnMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvcHVibGljJyk7XHJcblxyXG5cclxubGV0IENoYXJhY3RlckRldGFpbHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRjaGFyYWN0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0fSxcclxuXHJcbiAgICBtYXhWYWx1ZTogZnVuY3Rpb24odHlwZSl7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlKFwiaGl0UG9pbnRzXCIpOiAgcmV0dXJuIE1hdGguZmxvb3IoKHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLkNPTiArIHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlNJWikgLyAxMClcclxuICAgICAgICAgICAgY2FzZShcIkx1Y2tcIik6ICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5MdWNrXHJcbiAgICAgICAgICAgIGNhc2UoXCJzYW5pdHlcIik6ICAgICByZXR1cm4gKHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlBPVyAtIHRoaXMucHJvcHMuY2hhcmFjdGVyLmhlYWx0aC5teXRob3MpXHJcbiAgICAgICAgICAgIGNhc2UoXCJtYWdpY1wiKTogICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5QT1cgLyA1KVxyXG4gICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgIHJldHVybiA5OVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbW92ZU1vZGlmaWVyLCBhZ2UgPSB0aGlzLnByb3BzLmNoYXJhY3Rlci5hZ2VcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLkRFWCAgPCAgdGhpcy5wcm9wcy5jaGFyYWN0ZXIuc3RhdHMuU0laICAmJiAgdGhpcy5wcm9wcy5jaGFyYWN0ZXIuc3RhdHMuU1RSICA8ICB0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5TSVopICAgbW92ZU1vZGlmaWVyID0gN1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5TVFIgID49IHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlNJWiAgfHwgIHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLkRFWCAgPj0gdGhpcy5wcm9wcy5jaGFyYWN0ZXIuc3RhdHMuU0laKSAgIG1vdmVNb2RpZmllciA9IDhcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jaGFyYWN0ZXIuc3RhdHMuU1RSICA+ICB0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5TSVogICYmICB0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0cy5ERVggID4gIHRoaXMucHJvcHMuY2hhcmFjdGVyLnN0YXRzLlNJWikgICBtb3ZlTW9kaWZpZXIgPSA5XHJcblxyXG4gICAgICAgIGlmICgoYWdlIC0gMzApID4gMTApIHsgLy8gT2xkZXIgdGhhbiA0MFxyXG4gICAgICAgICAgICBsZXQgYWdlTW9kaWZpZXIgPSBhZ2UgLTMwXHJcbiAgICAgICAgICAgICAgICBhZ2VNb2RpZmllciA9IGFnZU1vZGlmaWVyLnRvU3RyaW5nKCkuY2hhckF0KDApICBcclxuICAgICAgICAgICAgbW92ZU1vZGlmaWVyIC09IGFnZU1vZGlmaWVyXHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vdmVNb2RpZmllclxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVDb3VudGVyczogZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgY291bnRlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBjb3VudGVyIGluIHRoaXMucHJvcHMuY2hhcmFjdGVyLmNvdW50ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLnB1c2goPFBvaW50Q291bnRlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e2NvdW50ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9e3RoaXMubWF4VmFsdWUoY291bnRlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50PXt0aGlzLnByb3BzLmNoYXJhY3Rlci5jb3VudGVyc1tjb3VudGVyXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y291bnRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudGVycztcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgXHRyZXR1cm4gPGRpdiBpZD1cImNoYXJhY3RlckRldGFpbHNcIj5cclxuICAgIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJkZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57dGhpcy5wcm9wcy5jaGFyYWN0ZXIubmFtZSArIFwiIChcIiArIHRoaXMucHJvcHMuY2hhcmFjdGVyLmFnZSArIFwiKVwifTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dGhpcy5wcm9wcy5jaGFyYWN0ZXIuc2V4ICsgXCIgXCIgKyB0aGlzLnByb3BzLmNoYXJhY3Rlci5vY2N1cGF0aW9uICsgXCIgZnJvbSBcIiArIHRoaXMucHJvcHMuY2hhcmFjdGVyLnJlc2lkZW5jZX08L2g0PlxyXG5cdCAgICBcdFx0XHRcdDxoND57XCJQbGF5ZXI6IFwiICsgdGhpcy5wcm9wcy5jaGFyYWN0ZXIucGxheWVyfTwvaDQ+XHJcbiAgICBcdFx0XHRcdDwvZGl2PlxyXG5cclxuICAgIFx0XHRcdFx0PFN0YXRzIHN0YXRzPXt0aGlzLnByb3BzLmNoYXJhY3Rlci5zdGF0c30gbW92ZT17dGhpcy5tb3ZlVmFsdWUoKX0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuY3JlYXRlQ291bnRlcnMoKX1cclxuXHJcbiAgICBcdFx0ICA8L2Rpdj5cclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyRGV0YWlsc1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50cy9jaGFyYWN0ZXJEZXRhaWxzLmpzeFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qKiBAanN4IFJlYWN0RE9NICovXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxubGV0IFBvaW50Q291bnRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cHJvcFR5cGVzOiB7XHJcblx0XHRtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRjdXJyZW50OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG5cdH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgXHRsZXQgc2tpbGxDb3VudCA9IG5ldyBBcnJheSh0aGlzLnByb3BzLm1heCkuZmlsbCgpXHJcbiAgICBcdGxldCBjdXJyZW50ID0gdGhpcy5wcm9wcy5jdXJyZW50O1xyXG4gICAgXHRcdGN1cnJlbnQgPSAwOyAvLyBVTl9DT01NRU5USU5HIFRISVMgRElTQUJMRVMgVEhFIENVUlJFTlQgTUFSS0VSXHJcbiAgICBcdHJldHVybiA8Zm9ybSBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnR5cGUgKyBcIiBwb2ludHNcIn0+XHJcblx0XHRcdFx0XHQ8bGFiZWw+PGgzPnt0aGlzLnByb3BzLnR5cGV9PC9oMz48L2xhYmVsPlxyXG5cdFx0XHRcdFx0e3NraWxsQ291bnQubWFwKCh0LGkpPT57XHJcblx0XHRcdFx0XHRcdHJldHVybiA8c3BhbiBrZXk9e3RoaXMucHJvcHMudHlwZSArIFwiLVwiICsgaX0+XHJcblx0XHQgICAgXHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiB2YWx1ZT17KytpfSBuYW1lPXt0aGlzLnByb3BzLnR5cGV9IGRlZmF1bHRDaGVja2VkID0geyhpID09PSBjdXJyZW50ID8gdHJ1ZSA6IGZhbHNlKX0gaWQ9e3RoaXMucHJvcHMudHlwZSArIFwiLVwiICsgaX0gLz5cclxuXHRcdCAgICBcdFx0XHRcdFx0PGxhYmVsIGh0bWxGb3I9e3RoaXMucHJvcHMudHlwZSArIFwiLVwiICsgaX0gZGF0YS12YWx1ZT17aX0gLz5cclxuXHRcdCAgICBcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdDwvZm9ybT5cclxuICAgIH1cclxufSlcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvaW50Q291bnRlclxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50cy9wb2ludENvdW50ZXIuanN4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwic2tpbGxzXCI6IFtcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYWNjb3VudGluZ1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQWNjb3VudGluZ1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiA1XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYWN0aW5nXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJBY3RpbmdcIixcblx0XHRcdFwidmFsdWVcIjogNSxcblx0XHRcdFwidHlwZVwiOiBcImFydENyYWZ0XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhbmltYWxIYW5kbGluZ1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQW5pbWFsIEhhbmRsaW5nXCIsXG5cdFx0XHRcInZhbHVlXCI6IDUsXG5cdFx0XHRcInVuY29tbW9uXCI6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhbnRocm9wb2xvZ3lcIixcblx0XHRcdFwibmFtZVwiOiBcIkFudGhyb3BvbG9neVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXBwcmFpc2VcIixcblx0XHRcdFwibmFtZVwiOiBcIkFwcHJhaXNlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhcmNoYWVvbG9neVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQXJjaGFlb2xvZ3lcIixcblx0XHRcdFwidmFsdWVcIjogMVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImFydGlsbGVyeVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQXJ0aWxsZXJ5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcIlVuY29tbW9uXCI6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJhc3Ryb25vbXlcIixcblx0XHRcdFwibmFtZVwiOiBcIkFzdHJvbm9teVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwic2NpZW5jZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYXhlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJBeGVcIixcblx0XHRcdFwidmFsdWVcIjogMTUsXG5cdFx0XHRcInR5cGVcIjogXCJmaWdodGluZ1wiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYmlvbG9neVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQmlvbG9neVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwic2NpZW5jZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiYm90YW55XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJCb3RhbnlcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidHlwZVwiOiBcInNjaWVuY2VcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImJvd1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQm93XCIsXG5cdFx0XHRcInZhbHVlXCI6IDE1LFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlyZWFybXNcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImJyYXdsXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJCcmF3bFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyNSxcblx0XHRcdFwidHlwZVwiOiBcImZpZ2h0aW5nXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJpbnRpbWlkYXRlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJJbnRpbWlkYXRlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDE1XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiY2hhaW5zYXdcIixcblx0XHRcdFwibmFtZVwiOiBcIkNoYWluc2F3XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwLFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlnaHRpbmdcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImNoYXJtXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJDaGFybVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxNVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImNoZW1pc3RyeVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ2hlbWlzdHJ5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJzY2llbmNlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJjbGltYlwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ2xpbWJcIixcblx0XHRcdFwidmFsdWVcIjogMjBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJjb21wdXRlclVzZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ29tcHV0ZXIgVXNlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDUsXG5cdFx0XHRcIm1vZGVyblwiOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiY3JlZGl0UmF0aW5nXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJDcmVkaXQgUmF0aW5nXCIsXG5cdFx0XHRcInZhbHVlXCI6IDBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJjcnlwdG9ncmFwaHlcIixcblx0XHRcdFwibmFtZVwiOiBcIkNyeXB0b2dyYXBoeVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwic2NpZW5jZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiY3RodWxodU15dGhvc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiQ3RodWxodSBNeXRob3NcIixcblx0XHRcdFwidmFsdWVcIjogMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImRlbW9saXRpb25zXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJEZW1vbGl0aW9uc1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ1bmNvbW1vblwiOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZGlzZ3Vpc2VcIixcblx0XHRcdFwibmFtZVwiOiBcIkRpc2d1aXNlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJkaXZpbmdcIixcblx0XHRcdFwibmFtZVwiOiBcIkRpdmluZ1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZG9kZ2VcIixcblx0XHRcdFwibmFtZVwiOiBcIkRvZGdlXCIsXG5cdFx0XHRcInZhbHVlXCI6IFtcblx0XHRcdFx0XCJERVhcIixcblx0XHRcdFx0MlxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImRyaXZlQXV0b1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRHJpdmUgQXV0b1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImVsZWN0cmljYWxSZXBhaXJcIixcblx0XHRcdFwibmFtZVwiOiBcIkVsZWN0cmljYWwgUmVwYWlyXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZWxlY3Ryb25pY3NcIixcblx0XHRcdFwibmFtZVwiOiBcIkVsZWN0cm9uaWNzXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcIm1vZGVyblwiOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZmFzdFRhbGtcIixcblx0XHRcdFwibmFtZVwiOiBcIkZhc3QgVGFsa1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiA1XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZmluZUFydFwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRmluZSBBcnRcIixcblx0XHRcdFwidmFsdWVcIjogNSxcblx0XHRcdFwidHlwZVwiOiBcImFydENyYWZ0XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJmaXJzdEFpZFwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRmlyc3QgQWlkXCIsXG5cdFx0XHRcInZhbHVlXCI6IDMwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZmxhaWxcIixcblx0XHRcdFwibmFtZVwiOiBcIkZsYWlsXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwLFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlnaHRpbmdcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImZsYW1ldGhyb3dlclwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRmxhbWV0aHJvd2VyXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwLFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlyZWFybXNcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImZvcmVuc2ljc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiRm9yZW5zaWNzXCIsXG5cdFx0XHRcInZhbHVlXCI6IDUsXG5cdFx0XHRcInR5cGVcIjogXCJzY2llbmNlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJmb3JnZXJ5XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJGb3JnZXJ5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJhcnRDcmFmdFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwiZ2Fycm90ZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiR2Fycm90ZVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxNSxcblx0XHRcdFwidHlwZVwiOiBcImZpZ2h0aW5nXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJnZW9sb2d5XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJHZW9sb2d5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJzY2llbmNlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJoYW5kZ3VuXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJIYW5kZ3VuXCIsXG5cdFx0XHRcInZhbHVlXCI6IDIwLFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlyZWFybXNcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImhlYXZ5V2VhcG9uc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiSGVhdnkgV2VhcG9uc1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMCxcblx0XHRcdFwidHlwZVwiOiBcImZpcmVhcm1zXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJoaXN0b3J5XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJIaXN0b3J5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJoeXBub3Npc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiSHlwbm9zaXNcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidW5jb21tb25cIjogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImp1bXBcIixcblx0XHRcdFwibmFtZVwiOiBcIkp1bXBcIixcblx0XHRcdFwidmFsdWVcIjogMjBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJsYW5ndWFnZU90aGVyMVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiTGFuZ3VhZ2U6IChPdGhlcilcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidHlwZVwiOiBcImxhbmd1YWdlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJsYW5ndWFnZU90aGVyMlwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiTGFuZ3VhZ2UgKE90aGVyKVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwibGFuZ3VhZ2VcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImxhbmd1YWdlT3RoZXIzXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJMYW5ndWFnZSAoT3RoZXIpXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJsYW5ndWFnZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibGFuZ3VhZ2VPdGhlcjRcIixcblx0XHRcdFwibmFtZVwiOiBcIkxhbmd1YWdlIChPdGhlcilcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidHlwZVwiOiBcImxhbmd1YWdlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJsYW5ndWFnZU90aGVyNVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiTGFuZ3VhZ2UgKE90aGVyKVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwibGFuZ3VhZ2VcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImxhbmd1YWdlT3duXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJMYW5ndWFnZSAoT3duKVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiBbXG5cdFx0XHRcdFwiRURVXCIsXG5cdFx0XHRcdDFcblx0XHRcdF0sXG5cdFx0XHRcInR5cGVcIjogXCJsYW5ndWFnZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibGF3XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJMYXdcIixcblx0XHRcdFwidmFsdWVcIjogNVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcImxpYnJhcnlVc2VcIixcblx0XHRcdFwibmFtZVwiOiBcIkxpYnJhcnkgVXNlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDIwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibGlzdGVuXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJMaXN0ZW5cIixcblx0XHRcdFwidmFsdWVcIjogMjBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJsb2Nrc21pdGhcIixcblx0XHRcdFwibmFtZVwiOiBcIkxvY2tzbWl0aFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibWFjaGluZUd1blwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiTWFjaGluZSBHdW5cIixcblx0XHRcdFwidmFsdWVcIjogMTAsXG5cdFx0XHRcInR5cGVcIjogXCJmaXJlYXJtc1wiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibWF0aGVtYXRpY3NcIixcblx0XHRcdFwibmFtZVwiOiBcIk1hdGhlbWF0aWNzXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJzY2llbmNlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJtZWNoUmVwYWlyXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJNZWNoYW5pY2FsIFJlcGFpclwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcIm1lZGljaW5lXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJNZWRpY2luZVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwibWV0ZW9yb2xvZ3lcIixcblx0XHRcdFwibmFtZVwiOiBcIk1ldGVvcm9sb2d5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJzY2llbmNlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJuYXR1cmFsV29ybGRcIixcblx0XHRcdFwibmFtZVwiOiBcIk5hdHVyYWwgV29ybGRcIixcblx0XHRcdFwidmFsdWVcIjogMTBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJuYXZpZ2F0ZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiTmF2aWdhdGVcIixcblx0XHRcdFwidmFsdWVcIjogMTBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJvY2N1bHRcIixcblx0XHRcdFwibmFtZVwiOiBcIk9jY3VsdFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiA1XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwib3BIZU1hY2hpbmVyeVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiT3BlcmF0ZSBIZWF2eSBNYWNoaW5lcnlcIixcblx0XHRcdFwidmFsdWVcIjogMVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInBlcnN1YWRlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJQZXJzdWFkZVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInBoYXJtYWN5XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJQaGFybWFjeVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwic2NpZW5jZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwicGhvdG9ncmFwaHlcIixcblx0XHRcdFwibmFtZVwiOiBcIlBob3RvZ3JhcGh5XCIsXG5cdFx0XHRcInZhbHVlXCI6IDUsXG5cdFx0XHRcInR5cGVcIjogXCJhcnRDcmFmdFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwicGh5c2ljc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGh5c2ljc1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwic2NpZW5jZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwicGlsb3RBaXJwbGFuZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUGlsb3Q6IEFpcnBsYW5lXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJwaWxvdFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwicGlsb3REaXJpZ2libGVcIixcblx0XHRcdFwibmFtZVwiOiBcIlBpbG90OiBEaXJpZ2libGVcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidHlwZVwiOiBcInBpbG90XCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJwaWxvdFNoaXBcIixcblx0XHRcdFwibmFtZVwiOiBcIlBpbG90OiBTaGlwXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInR5cGVcIjogXCJwaWxvdFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwicGlsb3RIZWxpY29wdGVyXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJQaWxvdDogSGVsaWNvcHRlclwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxLFxuXHRcdFx0XCJ0eXBlXCI6IFwicGlsb3RcIixcblx0XHRcdFwibW9kZXJuXCI6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJwc3ljaG9hbmFseXNpc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUHN5Y2hvYW5hbHlzaXNcIixcblx0XHRcdFwidmFsdWVcIjogMVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInBzeWNob2xvZ3lcIixcblx0XHRcdFwibmFtZVwiOiBcIlBzeWNob2xvZ3lcIixcblx0XHRcdFwidmFsdWVcIjogMTBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJyZWFkTGlwc1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiUmVhZCBMaXBzXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEsXG5cdFx0XHRcInVuY29tbW9uXCI6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJyaWRlXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJSaWRlXCIsXG5cdFx0XHRcInZhbHVlXCI6IDVcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJyaWZsZVNob3RndW5cIixcblx0XHRcdFwibmFtZVwiOiBcIlJpZmxlL1Nob3RndW5cIixcblx0XHRcdFwidmFsdWVcIjogMjUsXG5cdFx0XHRcInR5cGVcIjogXCJmaXJlYXJtc1wiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwic2xlaWdodEhhbmRcIixcblx0XHRcdFwibmFtZVwiOiBcIlNsZWlnaHQgb2YgSGFuZFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInNwZWFyXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTcGVhclwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyMCxcblx0XHRcdFwidHlwZVwiOiBcImZpcmVhcm1zXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzcG90SGlkZGVuXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTcG90IEhpZGRlblwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyNVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInN0ZWFsdGhcIixcblx0XHRcdFwibmFtZVwiOiBcIlN0ZWFsdGhcIixcblx0XHRcdFwidmFsdWVcIjogMjBcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzdWJtYWNoaW5lR3VuXCIsXG5cdFx0XHRcIm5hbWVcIjogXCJTdWJtYWNoaW5lIEd1blwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxNSxcblx0XHRcdFwidHlwZVwiOiBcImZpcmVhcm1zXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzdXJ2aXZhbERlc2VydFwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3Vydml2YWw6IERlc2VydFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMCxcblx0XHRcdFwidHlwZVwiOiBcInN1cnZpdmFsXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzdXJ2aXZhbEp1bmdsZVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3Vydml2YWw6IEp1bmdsZVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMCxcblx0XHRcdFwidHlwZVwiOiBcInN1cnZpdmFsXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzdXJ2aXZhbEFyY3RpY1wiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3Vydml2YWw6IEFyY3RpY1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxMCxcblx0XHRcdFwidHlwZVwiOiBcInN1cnZpdmFsXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwiaWRcIjogXCJzd29yZFwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3dvcmRcIixcblx0XHRcdFwidmFsdWVcIjogMjAsXG5cdFx0XHRcInR5cGVcIjogXCJmaWdodGluZ1wiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwic3dpbVwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiU3dpbVwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyMFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInRocm93XCIsXG5cdFx0XHRcIm5hbWVcIjogXCJUaHJvd1wiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAyMCxcblx0XHRcdFwidHlwZVwiOiBcImNvbWJhdFwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwidHJhY2tcIixcblx0XHRcdFwibmFtZVwiOiBcIlRyYWNrXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcImlkXCI6IFwid2hpcFwiLFxuXHRcdFx0XCJuYW1lXCI6IFwiV2hpcFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiA1LFxuXHRcdFx0XCJ0eXBlXCI6IFwiZmlnaHRpbmdcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJpZFwiOiBcInpvb2xvZ3lcIixcblx0XHRcdFwibmFtZVwiOiBcIlpvb2xvZ3lcIixcblx0XHRcdFwidmFsdWVcIjogMSxcblx0XHRcdFwidHlwZVwiOiBcInNjaWVuY2VcIlxuXHRcdH1cblx0XSxcblx0XCJzcGVjaWFsaXphdGlvbnNcIjoge1xuXHRcdFwiYXJ0Q3JhZnRcIjoge1xuXHRcdFx0XCJuYW1lXCI6IFwiQXJ0IGFuZCBDcmFmdFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiA1XG5cdFx0fSxcblx0XHRcImZpZ2h0aW5nXCI6IHtcblx0XHRcdFwibmFtZVwiOiBcIkZpZ2h0aW5nXCIsXG5cdFx0XHRcInZhbHVlXCI6IFwidmFyaWVzXCJcblx0XHR9LFxuXHRcdFwiZmlyZWFybXNcIjoge1xuXHRcdFx0XCJuYW1lXCI6IFwiRmlyZWFybXNcIixcblx0XHRcdFwidmFsdWVcIjogXCJ2YXJpZXNcIlxuXHRcdH0sXG5cdFx0XCJzY2llbmNlXCI6IHtcblx0XHRcdFwibmFtZVwiOiBcIlNjaWVuY2VcIixcblx0XHRcdFwidmFsdWVcIjogMVxuXHRcdH0sXG5cdFx0XCJwaWxvdFwiOiB7XG5cdFx0XHRcIm5hbWVcIjogXCJQaWxvdFwiLFxuXHRcdFx0XCJ2YWx1ZVwiOiAxXG5cdFx0fSxcblx0XHRcInN1cnZpdmFsXCI6IHtcblx0XHRcdFwibmFtZVwiOiBcIlN1cnZpdmFsXCIsXG5cdFx0XHRcInZhbHVlXCI6IDEwXG5cdFx0fVxuXHR9LFxuXHRcIm9jY3VwYXRpb25zXCI6IHtcblx0XHRcImFjY291bnRhbnRcIjoge1xuXHRcdFx0XCJuYW1lXCI6IFwiQWNjb3VudGFudFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkVpdGhlciBlbXBsb3llZCB3aXRoaW4gYSBidXNpbmVzcyBvciB3b3JraW5nIGFzIGEgZnJlZWxhbmNlIGNvbnN1bHRhbnQgd2l0aCBhIHBvcnRmb2xpbyBvZiBzZWxmLWVtcGxveWVkIGNsaWVudHMgb3IgYnVzaW5lc3Nlcy4gRGlsaWdlbmNlIGFuZCBhbiBhdHRlbnRpb24gdG8gZGV0YWlsIG1lYW5zIHRoYXRtb3N0IGFjY291bnRhbnRzIGNhbiBtYWtlIGdvb2QgcmVzZWFyY2hlcnMsIGJlaW5nIGFibGUgdG8gc3VwcG9ydCBpbnZlc3RpZ2F0aW9ucyB0aHJvdWdoIHRoZSBjYXJlZnVsIGFuYWx5c2lzIG9mIHBlcnNvbmFsIGFuZCBidXNpbmVzcyB0cmFuc2FjdGlvbnMsIGZpbmFuY2lhbCBzdGF0ZW1lbnRzIGFuZCBvdGhlciByZWNvcmRzLlwiLFxuXHRcdFx0XCJza2lsbHBvaW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIkVEVVwiOiA0XG5cdFx0XHRcdH1cblx0XHRcdF0sXG5cdFx0XHRcImNyZWRpdFJhdGluZ1wiOiBbXG5cdFx0XHRcdDMwLFxuXHRcdFx0XHQ3MFxuXHRcdFx0XSxcblx0XHRcdFwiY29udGFjdHNcIjogXCJCdXNpbmVzcyBhc3NvY2lhdGVzLCBsZWdhbCBwcm9mZXNzaW9ucywgZmluYW5jaWFsIHNlY3RvciAoYmFua2Vycywgb3RoZXIgYWNjb3VudGFudHMpXCIsXG5cdFx0XHRcInNraWxsc1wiOiBbXG5cdFx0XHRcdFwiYWNjb3VudGluZ1wiLFxuXHRcdFx0XHRcImxhd1wiLFxuXHRcdFx0XHRcImxpYnJhcnlVc2VcIixcblx0XHRcdFx0XCJsaXN0ZW5cIixcblx0XHRcdFx0XCJwZXJzdWFkZVwiLFxuXHRcdFx0XHRcInNwb3RIaWRkZW5cIlxuXHRcdFx0XSxcblx0XHRcdFwiYWRkU2tpbGxzXCI6IFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdDIsXG5cdFx0XHRcdFx0XCJBbnlcIlxuXHRcdFx0XHRdXG5cdFx0XHRdXG5cdFx0fSxcblx0XHRcImFjcm9iYXRcIjoge1xuXHRcdFx0XCJuYW1lXCI6IFwiQWNyb2JhdFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkFjcm9iYXRzIG1heSBiZSBlaXRoZXIgYW1hdGV1ciBhdGhsZXRlcyBjb21wZXRpbmcgaW4gc3RhZ2VkIG1lZXRzIOKAlCBwb3NzaWJseSBldmVuIHRoZSBPbHltcGljcyDigJQgb3IgcHJvZmVzc2lvbmFscyBlbXBsb3llZCB3aXRoIHRoZSBlbnRlcnRhaW5tZW50IHNlY3RvciAoZS5nLiBjaXJjdXNlcywgY2Fybml2YWxzLCB0aGVhdHJpY2FsIHBlcmZvcm1hbmNlcykuXCIsXG5cdFx0XHRcInNraWxscG9pbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiRURVXCI6IDJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiREVYXCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdFwiY3JlZGl0UmF0aW5nXCI6IFtcblx0XHRcdFx0OSxcblx0XHRcdFx0MjBcblx0XHRcdF0sXG5cdFx0XHRcImNvbnRhY3RzXCI6IFwiQW1hdGV1ciBhdGhsZXRpYyBjaXJjbGVzLCBzcG9ydHMgd3JpdGVycywgY2lyY3VzZXMgYW5kIGNhcm5pdmFscy5cIixcblx0XHRcdFwiU2tpbGxzXCI6IFtcblx0XHRcdFx0XCJjbGltYlwiLFxuXHRcdFx0XHRcImRvZGdlXCIsXG5cdFx0XHRcdFwianVtcFwiLFxuXHRcdFx0XHRcInRocm93XCIsXG5cdFx0XHRcdFwic3BvdEhpZGRlblwiLFxuXHRcdFx0XHRcInN3aW1cIlxuXHRcdFx0XSxcblx0XHRcdFwiYWRkU2tpbGxzXCI6IFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdDIsXG5cdFx0XHRcdFx0XCJBbnlcIlxuXHRcdFx0XHRdXG5cdFx0XHRdXG5cdFx0fSxcblx0XHRcInN0YWdlQWN0b3JcIjoge1xuXHRcdFx0XCJuYW1lXCI6IFwiU3RhZ2UgQWN0b3JcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJNYW55IHN0YWdlIGFjdG9ycyBoYXZlIGEgYmFja2dyb3VuZCBpbiB0aGUgY2xhc3NpY3MgYW5kLCBjb25zaWRlcmluZyB0aGVtc2VsdmVzIOKAnGxlZ2l0aW1hdGXigJ0sIGhhdmUgYSB0ZW5kZW5jeSB0byBsb29rIGRvd24gdXBvbiB0aGUgY29tbWVyY2lhbCBlZmZvcnRzIG9mIHRoZSBmaWxtIGluZHVzdHJ5LCBhbHRob3VnaCBieSB0aGUgbGF0ZSB0d2VudGlldGggY2VudHVyeSB0aGlzIGlzIGRpbWluaXNoZWQsIHdpdGggZmlsbSBhY3RvcnMgYWJsZSB0byBjb21tYW5kIGdyZWF0ZXIgcmVzcGVjdCBhbmQgaGlnaGVyIGZlZXMuXCIsXG5cdFx0XHRcInNraWxscG9pbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiRURVXCI6IDJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiQVBQXCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdFwiY3JlZGl0UmF0aW5nXCI6IFtcblx0XHRcdFx0OSxcblx0XHRcdFx0NDBcblx0XHRcdF0sXG5cdFx0XHRcImNvbnRhY3RzXCI6IFwiVGhlYXRyZSBpbmR1c3RyeSwgbmV3c3BhcGVyIGFydHMgY3JpdGljcywgYWN0b3LigJlzIGd1aWxkIG9yIHVuaW9uLlwiLFxuXHRcdFx0XCJza2lsbHNcIjogW1xuXHRcdFx0XHRcImRpc2d1aXNlXCIsXG5cdFx0XHRcdFwiZmlnaHRpbmdcIixcblx0XHRcdFx0XCJoaXN0b3J5XCIsXG5cdFx0XHRcdFwicHN5Y2hvbG9neVwiXG5cdFx0XHRdLFxuXHRcdFx0XCJhZGRTa2lsbHNcIjogW1xuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Mixcblx0XHRcdFx0XHRcImludGVycGVyc29uYWxcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0MSxcblx0XHRcdFx0XHRcIkFueVwiXG5cdFx0XHRcdF1cblx0XHRcdF0sXG5cdFx0XHRcImFydENyYWZ0TGFuZ1wiOiB7XG5cdFx0XHRcdFwiYXJ0Q3JhZnRcIjogXCJBY3RpbmdcIlxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJmaWxtU3RhclwiOiB7XG5cdFx0XHRcIm5hbWVcIjogXCJGaWxtIFN0YXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJNb3ZpZSBzdGFycyBhbmQgdGhlIGZpbG0gaW5kdXN0cnkgaGF2ZSBsb25nIGNhcHR1cmVkIHRoZSBpbnRlcmVzdCBvZiBwZW9wbGUgYWNyb3NzIHRoZSB3b3JsZC4gTWFueSBzdGFycyBhcmUgbWFkZSDigJhvdmVybmlnaHTigJkgYW5kIG1vc3Qgb2YgdGhlbSBsZWFkIGZsYXNoeSwgaGlnaCBwcm9maWxlIGxpdmVzLCBldmVyIGluIHRoZSBtZWRpYSBzcG90bGlnaHQuXCIsXG5cdFx0XHRcInNraWxscG9pbnRzXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiRURVXCI6IDJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwiQVBQXCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdFwiY3JlZGl0UmF0aW5nXCI6IFtcblx0XHRcdFx0MjAsXG5cdFx0XHRcdDkwXG5cdFx0XHRdLFxuXHRcdFx0XCJjb250YWN0c1wiOiBcIkZpbG0gaW5kdXN0cnksIG1lZGlhIGNyaXRpY3MsIHdyaXRlcnMuXCIsXG5cdFx0XHRcIlNraWxsc1wiOiBbXG5cdFx0XHRcdFwiZGlzZ3Vpc2VcIixcblx0XHRcdFx0XCJkcml2ZUF1dG9cIixcblx0XHRcdFx0XCJwc3ljaG9sb2d5XCJcblx0XHRcdF0sXG5cdFx0XHRcImFkZFNraWxsc1wiOiBbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHQyLFxuXHRcdFx0XHRcdFwiaW50ZXJwZXJzb25hbFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHQyLFxuXHRcdFx0XHRcdFwiQW55XCJcblx0XHRcdFx0XVxuXHRcdFx0XSxcblx0XHRcdFwiYXJ0Q3JhZnRMYW5nXCI6IHtcblx0XHRcdFx0XCJhcnRDcmFmdFwiOiBcIkFjdGluZ1wiXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImFnZW5jeURldGVjdGl2ZVwiOiB7XG5cdFx0XHRcIm5hbWVcIjogXCJBZ2VuY3kgRGV0ZWN0aXZlXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiTnVtZXJvdXMgd2VsbC1rbm93biBkZXRlY3RpdmUgYWdlbmNpZXMgZXhpc3QgYXJvdW5kIHRoZSB3b3JsZCwgd2l0aCBwcm9iYWJseSB0aGUgbW9zdCBmYW1vdXMgYmVpbmcgdGhlIFBpbmtlcnRvbiBhbmQgQnVybnMgYWdlbmNpZXMgKG1lcmdlZCBpbnRvIG9uZSBpbiBtb2Rlcm4gdGltZXMpLiBMYXJnZSBhZ2VuY2llcyBlbXBsb3kgdHdvIHR5cGVzIG9mIGFnZW50czogc2VjdXJpdHkgZ3VhcmRzIGFuZCBvcGVyYXRpdmVzLi9uR3VhcmRzIGFyZSB1bmlmb3JtZWQgcGF0cm9sbWVuLCBoaXJlZCBieSBjb21wYW5pZXMgYW5kIGluZGl2aWR1YWxzIHRvIHByb3RlY3QgcHJvcGVydHkgYW5kIHBlb3BsZSBhZ2FpbnN0IGJ1cmdsYXJzLCBhc3Nhc3NpbnMgYW5kIGtpZG5hcHBlcnMuIFVzZSB0aGUgVW5pZm9ybWVkIFBvbGljZSBPZmZpY2Vy4oCZcyBkZXNjcmlwdGlvbiBmb3IgdGhlc2UgY2hhcmFjdGVycy4gQ29tcGFueSBPcGVyYXRpdmVzIGFyZSBwbGFpbmNsb3RoZXMgZGV0ZWN0aXZlcywgc2VudCBvdXQgb24gY2FzZXMgcmVxdWlyaW5nIHRoZW0gdG8gc29sdmUgbXlzdGVyaWVzLCBwcmV2ZW50IG11cmRlcnMsIGxvY2F0ZSBtaXNzaW5nIHBlb3BsZSwgZXRjLlwiLFxuXHRcdFx0XCJza2lsbFBvaW50c1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcIkVEVVwiOiAyXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcIlNUUlwiOiAyXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcIkRFWFwiOiAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdXG5cdFx0XHRdLFxuXHRcdFx0XCJjcmVkaXRSYXRpbmdcIjogW1xuXHRcdFx0XHQyMCxcblx0XHRcdFx0NDVcblx0XHRcdF0sXG5cdFx0XHRcImNvbnRhY3RzXCI6IFwiTG9jYWwgbGF3IGVuZm9yY2VtZW50LCBjbGllbnRzLlwiLFxuXHRcdFx0XCJza2lsbHNcIjogW1xuXHRcdFx0XHRcImZpZ2h0aW5nXCIsXG5cdFx0XHRcdFwiZmlyZWFybXNcIixcblx0XHRcdFx0XCJsYXdcIixcblx0XHRcdFx0XCJsaWJyYXJ5VXNlXCIsXG5cdFx0XHRcdFwicHN5Y2hvbG9neVwiLFxuXHRcdFx0XHRcInN0ZWFsdGhcIixcblx0XHRcdFx0XCJ0cmFja1wiXG5cdFx0XHRdLFxuXHRcdFx0XCJhZGRTa2lsbHNcIjogW1xuXHRcdFx0XHRbXG5cdFx0XHRcdFx0MSxcblx0XHRcdFx0XHRcImludGVycGVyc29uYWxcIlxuXHRcdFx0XHRdXG5cdFx0XHRdXG5cdFx0fVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pzb24tbG9hZGVyIS4vYXNzZXRzL3NraWxscy5qc29uXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=