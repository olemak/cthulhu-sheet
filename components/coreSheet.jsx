/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SkillList = require('./skillList')

module.exports = React.createClass({
	getInitialState: function(){
		return {
			statics: require('json!../assets/skills.json'),
			character: {
				name: "Tex Arcana",
				age: 27,
				sanityLost: 0,
				sanityGained: 0,
				occupation: "archeologist",
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
    console.log(this.state.character.stats)
        return <div>
        			<h1>Sheet</h1>
        			<h3>Skills</h3>
       				<SkillList skillList={this.state.statics.skills} characterStats={this.state.character.stats} characterSkills={this.state.character.skills} />
        		</div>
	}
})