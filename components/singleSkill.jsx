/** @jsx ReactDOM */
'use strict'
var React = require('react')
module.exports = React.createClass({
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
    	var skillValue = this.computeSkillValue()
    	var dataSkillOutput = {"skill": this.props.skillData.name,"values": [skillValue, skillValue/2, skillValue/5]}
    	return <div className={this.props.className} data-skill={dataSkillOutput}>
    			<input type="checkbox" />
    			<h4 className="name">{this.props.skillData.name}</h4>
	    		<div className="full">{Math.min(skillValue, 99)}</div>
	    			<div className={(skillValue < 2 ? "partialValues nil":"partialValues")}>
	    				<div className={(skillValue < 2 ? "half nil":"half")}>{(Math.floor(skillValue/2) > 1 ? Math.floor(skillValue/2): "-")}</div>
    					<div className={(skillValue < 5 ? "fifth nil":"fifth")}>{(Math.floor(skillValue/5) > 1 ? Math.floor(skillValue/5): "-")}</div>
    				</div>
    		</div>
    }
})