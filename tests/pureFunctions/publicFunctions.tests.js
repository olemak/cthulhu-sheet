/** @jsx ReactDOM */
'use strict'

let assert 	= require('assert');
let expect = require('chai').expect;	

// IMPORT FUNCTIONS TO TEST:
let PublicFunction = require ('../../functions/public.js');

describe('Public Functions', function(){
	describe('moveModifier() returns a Move Rate Modifier (shallow test)', function(){
		const moveRate = PublicFunction.moveModifier(40,40,50,39);
		// SHOULD GET PARAMETERS DIRECTLY FROM CHARACTER STATS
		it('Should be a number between 2 and 9', function(){
			expect(moveRate).to.be.a('number').within(2,9);
		});
	});
	describe('d6() rolls a specified number of six-sided dice', function(){
		it('d6( ) : in 1...6', function(){
			expect(PublicFunction.d6()).to.be.a('number').within(1,6);
		});
		it('d6(1) : in 1...6', function(){
			expect(PublicFunction.d6(1)).to.be.a('number').within(1,6);
		});
		it('d6(2) : in 2...12', function(){
			expect(PublicFunction.d6(2)).to.be.a('number').within(2,12);
		});
		it('d6(3) : in 3...18', function(){
			expect(PublicFunction.d6(3)).to.be.a('number').within(3,18);
		});
	});
	describe('d100() rolls a single "hundred-sided" die',  function (){
		it('Returned a number between 1 and 100', function (){
			expect(PublicFunction.d100()).to.be.a('number').within(1,100);
		});
		xit('Roll d100 x 500, got at least one 1 and one 100\n\tPending for: Time consuming. Isolated. Works.', function (){
			let d100x1K = [];
			for(let i = 0; i < 500; i++ ) d100x1K.push(PublicFunction.d100())
			let hasOne 		= (d100x1K.indexOf(1) > -1		? true : false);
			let hasHundred 	= (d100x1K.indexOf(100) > -1	? true : false);
			console.log('\t one(s):\t' , hasOne, '\n\t hundred(s):\t', hasHundred);
			expect((hasOne && hasHundred)).to.be.true;
		})
	});
	describe('statsBase() returns the central list of base stat names, with properties', function(){
		const statProps = PublicFunction.statProperties;
		it('Returned an object',  function (){
			expect(statProps).to.be.a('object');
		});
		it('Keys are equal to the nine STAT names',  function (){
			expect(statProps).to.include.keys(["STR", "CON", "DEX", "APP","SIZ", "INT", "POW", "EDU", "Luck"])
		});
		it('Each stats has properties:\n\t[name:string, desc:string, type:string, roll: object]',  function (){
			for (let STAT in statProps) {
				expect(statProps[STAT]).to.have.all.keys(["name", "desc", "type", "roll"]);
				expect(statProps[STAT].name).to.be.a('string');
				expect(statProps[STAT].desc).to.be.a('string');
				expect(statProps[STAT].type).to.be.a('string');
				expect(statProps[STAT].roll).to.be.a('object');
				expect(statProps[STAT].roll).have.all.keys(["numberOfDice", "dicetype", "plus", "multiplier"]);
				expect(statProps[STAT].roll.numberOfDice).to.be.a('number');
				expect(statProps[STAT].roll.dicetype).to.be.a('number');
				expect(statProps[STAT].roll.plus).to.be.a('number');
				expect(statProps[STAT].roll.multiplier).to.be.a('number');
			}
		});
	});
	describe('generateStats() generate an object containing 9 key-indexed stats',  function (){
		const stats = PublicFunction.generateStats()

		it('Returned an object',  function (){
			expect(stats).to.be.a('object');
		});
		it('Keys are equal to the nine STAT names',  function (){
			expect(stats).to.include.keys(["STR", "CON", "DEX", "APP","SIZ", "INT", "POW", "EDU", "Luck"])
		});
		it('Values are between 15 an 90',  function (){
			for (let STAT in stats) {
				expect(stats[STAT]).to.be.within(15,90);
			}
		});
		it('SIZ, INT and EDU are all 40 or more',  function (){
			expect(stats.SIZ).to.be.least(40);
			expect(stats.INT).to.be.least(40);
			expect(stats.EDU).to.be.least(40);
		});
	});
	describe('bundleDate() creates a string in the format "Bundle Date: [timestamp]"', function(){
		const bundleDateReturn = PublicFunction.bundleDate();

		it('Returned a string', function(){
			expect(bundleDateReturn).to.be.a('string');
		});

		it('Starts with "Bundle Date:"', function(){
			const textBeforeColon = bundleDateReturn.split(':')[0];
			
			expect(textBeforeColon).to.equal("Bundle Date");
		});

		it('Value after colon is a recent datestamp', function(){
			const textAfterColon = parseInt(bundleDateReturn.split(':')[1].trim());
			
			expect(textAfterColon).to.be.a("number");
			expect(textAfterColon).to.be.least(1470830311710);
			expect(textAfterColon).to.be.below(Date.now());
		});
	});
});