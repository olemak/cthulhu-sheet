/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SingleSkill = require('./singleSkill')
module.exports = React.createClass({
	propTypes: {
		skillList: React.PropTypes.array,
		characterStats: React.PropTypes.object,
		characterSkills: React.PropTypes.array
	},
    render: function(){
    	let skills = this.props.skillList
    	let charSkills = this.props.characterSkills
    	let charStats = this.props.characterStats
    	console.info(charStats)
    	return <div id="skills">
	    		{skills.map(function(skill){
	    			return <SingleSkill id={skill.id} className={skill.id + " skill"} key={skill.id} skillData={skill} improvement={charSkills} charStats={charStats} />
	    		})}
    		</div>
    }
})