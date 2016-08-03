/** @jsx ReactDOM */
'use strict'
var React = require('react')
var SingleSkill = require('./singleSkill')
module.exports = React.createClass({
	getInitialState: function() {
		return {
					skillList: this.props.skillList,
					allSkills: this.props.skillList
				}
	},
	propTypes: {
		skillList: React.PropTypes.array,
		characterStats: React.PropTypes.object,
		characterSkills: React.PropTypes.array
	},

	filterSkills: function (event) {
		switch(event.target.value){
			case("all"):
				this.setState({skillList: this.state.allSkills})
			break
			case("combat"):
				setState({skillList: this.state.allSkills})
			break
			default:
				this.setState({skillList: this.state.allSkills.filter((skill)=>{
					if ('name' in skill && skill.name.charAt(0) === event.target.value) return skill
				})})
			break
		}

	},
	buttonsAtoZ: function(){
		let buttons = []
		for (var i = 65; i <=90; i++) {
			let letter = String.fromCharCode(i), disabledStatus = true
			this.state.allSkills.filter((skill)=>{if (letter === skill.name.charAt(0)) disabledStatus = false})
			buttons.push(<button onClick={this.filterSkills} value={letter} disabled={disabledStatus} key={"letter-" + letter}>{letter}</button>)
		}
		return buttons
	},
    render: function(){
    	let charSkills = this.props.characterSkills
    	let charStats = this.props.characterStats

    	return <div>
    			<div id="filters">
    				<button onClick={this.filterSkills} value="all">All</button>
    				<button>Combat</button>
    				<button>Investigation</button>
    				{this.buttonsAtoZ()}
    			</div>
    	 		<div id="skills">
	    		{this.state.skillList.map((skill) => {
	    			return <SingleSkill id={skill.id} className={skill.id + " skill"} key={skill.id} skillData={skill} improvement={charSkills} charStats={charStats} />
	    		})}
    		</div>
    		</div>
    }
})