/** @jsx ReactDOM */
'use strict'
//let React = require('react')
let Stats           = require('./stats');
let PointCounter    = require('./pointCounter');
let publicFunctions = require('../functions/public');


let CharacterDetails = React.createClass({
	propTypes: {
		character: React.PropTypes.object,
	},

    maxValue: function(type){
        switch(type){
            case("hitPoints"):  return Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)
            case("Luck"):       return this.props.character.stats.Luck
            case("sanity"):     return (this.props.character.stats.POW - this.props.character.health.mythos)
            case("magic"):      return Math.floor(this.props.character.stats.POW / 5)
            default:            return 99
        }
    },
    moveValue: function () {
        let moveModifier, age = this.props.character.age

        if (this.props.character.stats.DEX  <  this.props.character.stats.SIZ  &&  this.props.character.stats.STR  <  this.props.character.stats.SIZ)   moveModifier = 7
        if (this.props.character.stats.STR  >= this.props.character.stats.SIZ  ||  this.props.character.stats.DEX  >= this.props.character.stats.SIZ)   moveModifier = 8
        if (this.props.character.stats.STR  >  this.props.character.stats.SIZ  &&  this.props.character.stats.DEX  >  this.props.character.stats.SIZ)   moveModifier = 9

        if ((age - 30) > 10) { // Older than 40
            let ageModifier = age -30
                ageModifier = ageModifier.toString().charAt(0)  
            moveModifier -= ageModifier
        } 

        return moveModifier
    },

    createCounters: function(){
        let counters = [];
        for (let counter in this.props.character.counters) {
            counters.push(<PointCounter 
                            type={counter}
                            max={this.maxValue(counter)}
                            current={this.props.character.counters[counter]}
                            key={counter}
                        />)
        }
        return counters;
    },

    render: function(){
    	return <div id="characterDetails">
    				<div className="details">
                        <h2>{this.props.character.name + " (" + this.props.character.age + ")"}</h2>
                        <h4>{this.props.character.sex + " " + this.props.character.occupation + " from " + this.props.character.residence}</h4>
	    				<h4>{"Player: " + this.props.character.player}</h4>
    				</div>

    				<Stats stats={this.props.character.stats} move={this.moveValue()} />

                    {this.createCounters()}

    		  </div>
    }
})

module.exports = CharacterDetails