/** @jsx ReactDOM */
'use strict'
//var React = require('react')
var SkillList = require('./skillList')
let CharacterDetails = require("./characterDetails")
//let StorageManager = require("../modules/storageManager")

let CoreSheet = React.createClass({
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
			statics: require('json!../assets/skills.json'),
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
        return <div>
	        		<CharacterDetails character={this.state.character} />
       				<SkillList skillList={this.state.statics.skills} specializations={this.state.statics.specializations} characterStats={this.state.character.stats} characterSkills={this.state.character.skills} />
        			<hr />
        			<button onClick={this.deleteCharacter}>Delete Character</button>
        		</div>
	}
})

module.exports = CoreSheet