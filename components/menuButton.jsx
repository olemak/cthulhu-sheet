/** @jsx ReactDOM */
'use strict'
//let React = require('react')

let MenuButton = React.createClass({
	render: function(){
		return <div className="button" id="menuButton">{this.text()}</div>
	}
})


MenuButton.prototype.text = function(){
	return "text from text: DELETE ME"
}





module.exports = MenuButton