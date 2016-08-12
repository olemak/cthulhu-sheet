/** @jsx ReactDOM */
'use strict'
let React = require('React')
let ReactDOM 	= require('React-DOM');
let EnzymeTest = React.createClass({


	render: function(){
		return <div id="testme">
			<h1>Hello!</h1>
		</div>
	}
})

module.exports = EnzymeTest