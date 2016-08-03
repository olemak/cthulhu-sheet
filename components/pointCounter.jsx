/** @jsx ReactDOM */
'use strict'
var React = require('react')
module.exports = React.createClass({
	getInitialState: function(){
		return {currentPoints: this.props.current}
	},
	propTypes: {
		max: React.PropTypes.number,
		current: React.PropTypes.number,
		type: React.PropTypes.string
	},
	onValueChange: function(event) {
		this.setState({currentPoints: event.target.value})
	},
    render: function(){
    	let allPoints = new Array(this.props.max).fill(this.props.type)
    	let current = this.props.current
    	return <form className={ this.props.type + " points"}>
    			<label><h3>{this.props.type}</h3></label>
    			{allPoints.map(function(pointType, index, array){
    				return <span key={this.props.type + "-" + index}>
    					<input 
    						type="radio" 
    						onChange={this.onValueChange}
    						value={++index} 
    						name={this.props.type} 
    						defaultChecked = {(index === this.state.currentPoints ? true : false)}
    						id={this.props.type + "-" + index} 
						/>
    					<label 
    						htmlFor={this.props.type + "-" + index}
    						data-value={index} 
    					/>
    					</span>
    			}.bind(this))}
    		</form>
    }
})