'use strict'
let app = {
	init:  function () {
		if (!window.localStorage) {
			alert("Your web browser does not support local storage, so we won't be able to save your character!\nLuckily, there's a simple solution for this: switch to a modern browser, and everything should work!")
		} else {
			let storedCharacter = localStorage.getItem('character1');
			if (storedCharacter){
				this.getStoredCharacters()
			} else {
				this.newCharacter();
			}
		}
	},
	newCharacter: function(){
//			console.log("Create new Character!")
			let CreateCharacter = require('./components/createCharacter.jsx')
		//	let CreateCharacter = require('./components/coreSheet.jsx')
			ReactDOM.render(<CreateCharacter />, document.getElementById('sheet'))
	},
	getStoredCharacters: function(){
// DEV NODE: CURRENTLY BYPASSES LIST, STRAIGHT TO CHAR 1 (MVP STYLE)

			let character = localStorage.getItem('character1')
			console.info(character);
			let CoreSheet = require('./components/coreSheet.jsx')
		//	let ChooseCharacter = require('./components/storedCharacters.jsx')  -- NOT MADE YET
		//	ReactDOM.render(<ChooseCharacter />, document.getElementById('sheet'))	-- NOT MADE YET
			ReactDOM.render(<CoreSheet saveslot={1} />, document.getElementById('sheet'));
	}
}

app.init();