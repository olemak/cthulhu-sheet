/** @jsx ReactDOM */
'use strict'

let EditStats = React.createClass({
	propTypes: {
		stats: React.PropTypes.object  
	},
	render: function(){
		let tempvalues = [];
		for (let stat in this.props.stats)	{
			tempvalues.push({name: [stat], value: this.props.stats[stat]});
		}
		
		return <div className="stats">
			{
				tempvalues.map(function (stat, i, stats){
					return <EditStat statName={stat.name} statVal={stat.value } key={'decrease-' + stat.name} />
				})
			}
		</div>; 
	}
});

module.exports = EditStats;