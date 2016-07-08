/** @jsx ReactDOM */
'use strict'
var React = require('react')
module.exports = React.createClass({
	propTypes: {
		skillData: React.PropTypes.object
	},

    render: function(){
    	var skillValue = parseInt(this.props.skillData.value)
    	return <div className={this.props.className}>
    			<input type="checkbox" />
    			<h4>{this.props.skillData.name}</h4>
    			<div class="full">{skillValue}</div>
    			<div class="half">{Math.floor(skillValue/2)}</div>
    			<div class="fifth">{Math.floor(skillValue/5)}</div>
    		</div>
    }
})