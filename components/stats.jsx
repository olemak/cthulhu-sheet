/** @jsx ReactDOM */
'use strict'
var React = require('react')
module.exports = React.createClass({
	propTypes: {
		stats: React.PropTypes.object,
	},
    render: function(){
    	let charStats = this.props.stats
 //   	console.info(charStats)
 //   	console.log("charStats: ", charStats)
    	return <div id="stats">
    			{Object.keys(charStats).map(function(value, index){
    				let statClasses = "stat " + value
    				return <div className={statClasses} key={value}>
    					<h4 className="name">{value}</h4>
    					<div className="full">{charStats[value]}</div>
    		    		<div className="partialValues">
			    			<div className="half">{Math.floor(charStats[value]/2)}</div>
    						<div className="fifth">{Math.floor(charStats[value]/5)}</div>
    					</div>
    				</div>
    			})}
     		</div>
    }
})