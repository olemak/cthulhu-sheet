let PublicFunctions = {
	// STATICS
	statProperties: {
			STR  :  {name: "STR",  desc: "Strength",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
			DEX  :  {name: "DEX",  desc: "Dexiterity",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
			POW  :  {name: "POW",  desc: "Power",			type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
			CON  :  {name: "CON",  desc: "Constitution", 	type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
			APP  :  {name: "APP",  desc: "Appearance",		type: "base", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
			EDU  :  {name: "EDU",  desc: "Education",		type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
			SIZ  :  {name: "SIZ",  desc: "Size",			type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
			INT  :  {name: "INT",  desc: "Intelligence", 	type: "base", roll: {numberOfDice: 2, dicetype: 6, plus: 6, multiplier: 5} },
			Luck :  {name: "Luck", desc: "Luck",			type: "luck", roll: {numberOfDice: 3, dicetype: 6, plus: 0, multiplier: 5} },
	},

	// PENDING FUNCTIONS
	getStoredCharacters: function (){
		console.log("Retrieve list of stored Characters.")
	},
	saveCharacter: function(){
		console.log("Save Character")
	},
	loadCharacter: function(){
		console.log("Load Character")
	},
	deleteCharacter: function(saveSlot){
		// Working version from component: coreSheet.deleteCharacter:
		let deleteAlert = confirm('Delete this character');
		
		if (deleteAlert === true) {
			localStorage.removeItem('character'+saveSlot);
		}
		location.reload();
		console.log("Load Character")
	},

	    maxValue: function(type){
//	    	MAKE IT PURE: take the stats as a parameter
        switch(type){
            case("hitPoints"):  return Math.floor((this.props.character.stats.CON + this.props.character.stats.SIZ) / 10)
            case("Luck"):       return this.props.character.stats.Luck
            case("sanity"):     return (this.props.character.stats.POW - this.props.character.health.mythos)
            case("magic"):      return Math.floor(this.props.character.stats.POW / 5)
            default:            return 99
        }
    },




	//TESTED FUNCTIONS
	d6: function(num){
		let output = 0;
		if (typeof num !== 'number') num = 1;
		for (let i  = 0; i<num; i++) {
			output += Math.round((Math.random() * 5) + 1);
		}
		return output 
	},
	d100: function() {		
		const output = Math.round((Math.random() * 99) + 1);
		return output;
	},

	generateStats: function(){
		let output 	= 	{};
		for (i in this.statProperties){
			let stat = this.statProperties[i];		
			output[stat.name] = ((this.d6(stat.roll.numberOfDice) + stat.roll.plus) * stat.roll.multiplier);
		}
		return output;
	},
	moveModifier: function (STR, DEX, SIZ, age) {
		let moveModifier = 2

		if (DEX  <  SIZ  &&  STR  <  SIZ) 	moveModifier = 7
		if (STR  >= SIZ  ||  DEX  >= SIZ) 	moveModifier = 8
		if (STR  >  SIZ  &&  DEX  >  SIZ)	moveModifier = 9

		if ((age - 30) > 10) { // Older than 40
			let ageModifier = age -30
				ageModifier = ageModifier.toString().charAt(0)	
			moveModifier -= ageModifier
		} 
		return (moveModifier)
	},

	// Utility functions
	bundleDate: function(){
		let bundleDate 	= 'Bundle Date: ';
		bundleDate 		+= Date.now();
		return bundleDate;
	}
}

module.exports = PublicFunctions;