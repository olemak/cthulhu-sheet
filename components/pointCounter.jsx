/** @jsx ReactDOM */
'use strict'

let PointCounter = React.createClass({

	propTypes: {
		max: React.PropTypes.number,
		current: React.PropTypes.number,
		type: React.PropTypes.string
	},

    render: function(){
    	let skillCount = new Array(this.props.max).fill()
    	let current = this.props.current;
    		current = 0; // UN_COMMENTING THIS DISABLES THE CURRENT MARKER
    	return <form className={ this.props.type + " points"}>
					<label><h3>{this.props.type}</h3></label>
					{skillCount.map((t,i)=>{
						return <span key={this.props.type + "-" + i}>
		    					<input type="radio" value={++i} name={this.props.type} defaultChecked = {(i === current ? true : false)} id={this.props.type + "-" + i} />
		    					<label htmlFor={this.props.type + "-" + i} data-value={i} />
		    				</span>
					})}
				</form>
    }
})


module.exports = PointCounter