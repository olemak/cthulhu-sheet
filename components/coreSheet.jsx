/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SkillList = require('./skillList')
var CharacterDetails = require('./characterDetails')

module.exports = React.createClass({
	getInitialState: function(){
		return {
			statics: require('json!../assets/skills.json'),
			character: {
				name: "Tex Arcana",
				age: 27,
				occupation: "Archaist",
				sex: "Male",
				residence: "Devil's Gulch, Arkansas",
				birthplace: "Santa Fe",
				player: "Ole Martin Kristiansen",
				counters: {
					hitPoints: 8,
					luck: 30,
					magic: 5,
					sanity: 40
				},
				health: {
					majorWound: false,
					hitPoints: 8,
					sanity: 40,
					luck: 30,
					magic: 5,
					mythos: 0		
				},
				stats: {
					STR: 65,
					CON: 50,
					SIZ: 75,
					DEX: 60,
					APP: 45,
					INT: 50,
					POW: 50,
					EDU: 50,
					Luck: 45
				},
				skills: [
					{id:"climb", values: [32, 7, 2, 6]},
					{id:"axe", values: [25, 2, 6]},
					{id:"acting", values: [53,8,2,4,3,7,9,9,9,9,9,9]}
				]
			}
		}
	},
    render: function(){
        return <div>
	        		<CharacterDetails character={this.state.character} />
       				<SkillList skillList={this.state.statics.skills} characterStats={this.state.character.stats} characterSkills={this.state.character.skills} />
        		</div>
	}
})