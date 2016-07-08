/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SingleSkill = require('./singleSkill')
module.exports = React.createClass({
	propTypes: {
		skillList: React.PropTypes.array
	},
    render: function(){
    	console.log("Props: ")
    	console.log(this.props)
    	var skills = this.props.skillList
    	return <div id="skills">
	    		{skills.map(function(skill){
	    			return <SingleSkill id={skill.id} className={skill.id + " skill"} key={skill.id} skillData={skill} />
	    		})}
    		</div>
    	
    }
})