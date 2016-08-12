/** @jsx ReactDOM */
'use strict'
//let React = require('React');
let publicFunctions = require('../functions/public');

let Stats 			= require('./stats');
let AgeDescription 	= require('./ageDescription');
let EditStats 		= require('./editStats');

let CreateCharacter = React.createClass({
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
		return <button>Accept</button>
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

		return <div id="characterDetails" className="characterGeneration">
					<div id="head">
						<h5>Call of Cthulhu RPG 7th edition character generator</h5>
						<h1>Create Character</h1>
					</div>
					<span id="stepOne" className="fadeIn" data-wait="3">
						<button id="generateStats" 
								className={(this.state.step === 1 ? 'fadeIn' : 'fadeOut')} 
								onClick={this.generateStats} disabled={(this.state.step === 1 ? false : true)}>
								Generate stats
						</button>
					</span>

					<div className={"controls " + (this.state.step > 1 ? "visible" : "hidden") }>
						<Stats stats={this.bundleStats()} move={this.state.Move} />
						<div 
							style={{
									display:"flex",
									justifyContent: "center",
									paddingTop: "4rem"
							}}>
							<span style={{
									fontSize:"3rem"
							}}>Age: </span>
							<input id="agePicker" type="number" min="15" max="89" defaultValue={this.state.age} onChange={this.ageSet}  style={{marginLeft:4,marginRight: 4}}/>
							<button onClick={this.ageAccept} disabled={((this.state.age > 14 && this.state.age < 89) && this.state.step === 2 ? false: true)}>Accept</button>
						</div>
						<AgeDescription 
							style={{
								textCenter: "center",
								fontSize: "3rem"
							}}
							age={this.state.age} 
							brackets={this.ageBrackets} />
					</div>

					<div className={"ageEffects " + (this.state.step > 2 ? "visible" : "hidden") }>
						<p dangerouslySetInnerHTML={{__html: this.state.ageEffects}} />

					</div>

					<div className={"roundUp " + (this.state.step > 2 ? "visible" : "hidden")}>
						<h3>Character name</h3>
						<input type="text" name="name" onBlur={this.saveText} />
	
						<h3>Occupation</h3>
						<input type="text" name="occupation" onBlur={this.saveText} />

						<h3>Residence (city or area)</h3>
						<input type="text" name="residence" onBlur={this.saveText} />
	
						<h3>Player name</h3>
						<input type="text" name="player" onBlur={this.saveText} />

					</div>

					<button style={{
						backgroundColor:"green",
						color:"white"
					}} className={(this.state.step > 2 ? "visible" : "hidden")} onClick={this.saveCharacter}>Save and proceed</button>



				</div>
	}
})

module.exports = CreateCharacter