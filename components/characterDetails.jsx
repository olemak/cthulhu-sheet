/** @jsx ReactDOM */
'use strict'
var React = require('react')
var Stats = require('./stats')
var PointCounter = require('./pointCounter')

module.exports = React.createClass({
	propTypes: {
		character: React.PropTypes.object,
	},
    createCounters: function(){
        let counters = [];
        for (let counter in this.props.character.counters) {
            console.log(counter + ': ' + this.props.character.counters[counter])
            counters.push(<PointCounter 
                            type={counter}
                    //        max={Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)} 
                            max={10}
                            current={this.props.character.health[counter]}
                        />)
        }
        return counters;
    },
    render: function(){
    	let charStats = this.props.characterStats
   //     console.log(this.props.character)
    	return <div id="characterDetails">
    				<div className="details">
                        <h2>{this.props.character.name} ({this.props.character.age})</h2>
                        <h4>{this.props.character.sex} {this.props.character.occupation} from {this.props.character.residence}</h4>
	    				<h4>Player: {this.props.character.player}</h4>
    				</div>

    				<Stats stats={this.props.character.stats} />

                    {this.createCounters()}

{/*}
                    <PointCounter 
                        type="hitPoints"
                        max={Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)} 
                        current={this.props.character.health.hitPoints} 
                    />
 
                    <PointCounter 
                        type="Luck"
                        max={this.props.character.stats.Luck} 
                        current={this.props.character.health.luck} 
                    />

                    <PointCounter 
                        type="magic"
                        max={Math.floor(this.props.character.stats.POW/5)} 
                        current={this.props.character.health.magic} 
                    />

                    <PointCounter 
                        type="sanity"
                        max={this.props.character.stats.POW - this.props.character.health.mythos} 
                        current={this.props.character.health.sanity} 
                    />
{*/}
    		  </div>
    }
})