/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SkillList = require('./skillList')

module.exports = React.createClass({
	getInitialState: function(){
		return {
			statics: require('json!../assets/skills.json')
		}
	},
    render: function(){
//    console.log(this.state)
        return <div>
        			<h1>Sheet</h1>
        			<h3>Skills</h3>
       				<SkillList skillList={this.state.statics.skills} />
        		</div>
	}
})