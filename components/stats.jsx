/** @jsx ReactDOM */
'use strict'

let publicFunctions = require('../functions/public');

let Stats = React.createClass({
	propTypes: {
		stats: React.PropTypes.object,
		move: React.PropTypes.number
	},
    render: function(){
    	return <div id="stats" className="fadeIn">
    			{Object.keys(this.props.stats).map((value, index)=>{

    				if (value != "Luck") {

	    				return <div className={"stat " + value} key={value}>
	    					
	    					<h4 className="name">
	    						{value}
	    					</h4>
	    					<div className="full">
	    						{this.props.stats[value]}
	    					</div>

	    		    		<div className="partialValues">
				    			<div className="half">
				    				{Math.floor(this.props.stats[value]/2)}
				    			</div>
	    						<div className="fifth">
	    							{Math.floor(this.props.stats[value]/5)}
	    						</div>
	    					</div>
	    					
	    				</div>
	    			}	
    			})}

					<div className={"stat move"} key="move">	    					
    					<h4 className="name">
    						Move
    					</h4>
    					<div className="full">
    						{this.props.move}
    					</div>

    		    		<div className="partialValues">
			    			<div className="half">
			    				{parseInt(this.props.move) * 5 + "m"}
			    			</div>
    						<div className="fifth">
    							round
    						</div>
    					</div>		
	    			</div>

     		</div>
    }
})

module.exports = Stats