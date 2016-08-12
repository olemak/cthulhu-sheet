/** @jsx ReactDOM */
'use strict'
//var React = require('react')
var SingleSkill = require('./singleSkill')

let SkillList = React.createClass({
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
		return <div id="filters">
					<button onClick={()=>this.setState({skillList: this.state.allSkills})}>All</button>
			    	{this.buttonsAtoZ()}
	    			{this.specializationFilters()}
    			</div>
	},
	
	buttonsAtoZ: function(){
		let buttons = []
		for (var i = 65; i <=90; i++) {
			let letter = String.fromCharCode(i), disabledStatus = true
			
			this.state.allSkills.filter((skill)=>{if (letter === skill.name.charAt(0)) disabledStatus = false})
			buttons.push(
				<button 
					type =		"button"
					onClick =	{(event)=>{this.setState({skillList: this.state.allSkills.filter((s)=>{if (s.name.charAt(0) === event.target.value) return s })})}}
			 		value =		{letter} 
			 		disabled =	{disabledStatus}
			 		key =		{"letter-" + letter}
			 	>{letter}</button>
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
			specializationButtons.push(<button 
				onClick={(e)=>{this.setState({skillList: this.makeSkillList(group.items)})}}
				key={"group-" + group.title}
				className="specialization"
			>{group.title}</button>)
		})

		return specializationButtons
	},


    render: function(){
    	let charSkills = this.props.characterSkills
    	let charStats = this.props.characterStats

    	return <div>
    				{this.skillFilters()}
    	 			<div id="skills">
	    				{this.state.skillList.map((skill) => { return <SingleSkill id={skill.id} className={skill.id + " skill"} key={skill.id} skillData={skill} improvement={charSkills} charStats={charStats} />	})}
    				</div>
    		</div>
    }
})

module.exports = SkillList