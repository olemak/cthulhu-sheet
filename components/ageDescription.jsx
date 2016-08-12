/** @jsx ReactDOM */
'use strict'

let AgeDescription = React.createClass({
	propTypes: {
		age: React.PropTypes.number,
		brackets: React.PropTypes.array
	},
	shouldComponentUpdate: function(nextProps, nextState) {
	  	return nextProps.age !== this.props.age;
	},
	render: function(){
		let bracketDescription = this.props.brackets
			.find((bracket)=>{ if (bracket.min <= this.props.age && bracket.max >= this.props.age) return bracket;
		});
		return <p>{"Effect: " + bracketDescription.text}</p>
	}
});


module.exports = AgeDescription;