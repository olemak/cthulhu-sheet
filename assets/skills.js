const specialisations = {
	artCraft: 		{	name: "Art and Craft",				value: 5		},
	fighting: 		{	name: "Fighting",					value: "varies"	},
	firearms: 		{	name: "Firearms", 					value: "varies"	},
	science: 		{	name: "Science", 					value: 	1		},	
	pilot: 			{	name: "Pilot", 						value: 	1		},	
	survival: 		{	name: "Survival", 					value: 	10		}	
};

const skills = {
	accounting: 	{	name: "Accounting",					value: 5,												},
	acting: 		{	name: "Acting",						value: 5,			type: "artCraft"					}, 
	animalHandling: {	name: "Animal Handling",			value: 5,							uncommon: true		},
	anthropology: 	{	name: "Anthropology",				value: 1												},
	appraise: 		{	name: "Appraise",					value: 5												},
	archaeology: 	{	name: "Archaeology",				value: 1												}, 
	artillery: 		{	name: "Artillery",					value: 1,							Uncommon: true		},
	astronomy: 		{	name: "Astronomy",					value: 1,			type: "science"						},
	axe: 			{	name: "Axe",						value: 15,			type: "fighting"					},
	biology: 		{	name: "Biology",					value: 1,			type: "science"						},
	botany: 		{	name: "Botany",						value: 1,			type: "science"						},
	bow: 			{	name: "Bow",						value: 15,			type: "firearms"					},
	brawl: 			{	name: "Brawl",						value: 25,			type: "fighting"					},
	chainsaw: 		{	name: "Chainsaw",					value: 10,			type: "fighting"					}, 
	charm: 			{	name: "Charm",						value: 15,												},
	chemistry: 		{	name: "Chemistry",					value: 1, 			type: "science"						},
	climbkey:  		{	name: "Climb", 						value: 20,												},
	computerUse: 	{	name: "Computer Use",				value: 5, 							modern: true		},
	creditRating: 	{	name: "Credit Rating",				value: 0,												},
	cryptography: 	{	name: "Cryptography",				value: 1,			type: "science"						},
	cthulhuMythos: 	{	name: "Cthulhu Mythos",				value: 0,												},
	demolitions: 	{	name: "Demolitions",				value: 1, 							uncommon: true		},
	disguise: 		{	name: "Disguise", 					value: 5,												},
	diving: 		{	name: "Diving", 					value: 1,												},
	dodge: 			{	name: "Dodge", 						value: ["DEX",2],											},
	driveAuto: 		{	name: "Drive Auto", 				value: 20,												},
	electricalRepair:{	name: "Electrical Repair", 			value: 10,												},
	electronics: 	{	name: "Electronics", 				value: 1,							modern: true		},
	fastTalk: 		{	name: "Fast Talk", 					value: 5												},
	fineArt: 		{	name: "Fine Art", 					value: 5,			type: "artCraft"					},
	firstAid:		{	name: "First Aid", 					value: 30												},
	flail: 			{ 	name: "Flail", 						value: 10,			type: "fighting"					},
	flamethrower: 	{	name: "Flamethrower",				value: 10,			type: "firearms"					},
	forensics: 		{	name: "Forensics", 					value: 5,			type: "science"						},
	forgery: 		{	name: "Forgery",					value: 1,			type: "artCraft"					},
	garrote: 		{	name: "Garrote",					value: 15,			type: "fighting"					},
	geology: 		{	name: "Geology",					value: 1,			type: "science"						},
	handgun: 		{	name: "Handgun", 					value: 20,			type: "firearms"					},
	heavyWeapons: 	{	name: "Heavy Weapons", 				value: 10,			type: "firearms"					},
	history: 		{	name: "History", 					value: 5,												},
	hypnosis: 		{	name: "Hypnosis", 					value: 1,							uncommon: true		},
	intimidate: 	{	name: "Intimidate", 				value: 15												},
	jump: 			{	name: "Jump", 						value: 20												},
	languageOther1: {	name: "Language: (Other)", 			value: 1,			type: "language"					},
	languageOther2: {	name: "Language (Other)", 			value: 1,			type: "language"					},
	languageOther3: {	name: "Language (Other)", 			value: 1,			type: "language"					},
	languageOther4: {	name: "Language (Other)", 			value: 1,			type: "language"					},
	languageOther5: {	name: "Language (Other)", 			value: 1,			type: "language"					},
	languageOwn:	{	name: "Language (Own)", 			value: ["EDU",1],	type: "language"					},
	law: 			{	name: "Law", 						value: 5												},
	libraryUse: 	{	name: "Library Use", 				value: 20												},
	listen: 		{	name: "Listen", 					value: 20												},
	locksmith: 		{	name: "Locksmith", 					value: 1												},
	machineGun: 	{	name: "Machine Gun", 				value: 10,			type: "firearms"					},
	mathematics: 	{	name: "Mathematics", 				value: 1,			type: "science"						},
	mechRepair:		{	name: "Mechanical Repair", 			value: 10												},
	medicine: 		{	name: "Medicine", 					value: 1												},
	meteorology: 	{	name: "Meteorology", 				value: 1,			type: "science"						},
	naturalWorld: 	{	name: "Natural World", 				value: 10												},
	navigate: 		{	name: "Navigate", 					value: 10												},
	occult:			{	name: "Occult",						value: 5												},
	opHeMachinery: 	{	name: "Operate Heavy Machinery", 	value: 1												},
	persuade:		{	name: "Persuade", 					value: 10												},
	pharmacy:		{	name: "Pharmacy",					value: 1,			type: "science"						},
	photography:	{	name: "Photography", 				value: 5 ,			type: "artCraft"					},
	physics:		{	name: "Physics", 					value: 1 ,			type: "science"						},
	pilotAirplane: 	{	name: "Pilot: Airplane",			value: 1,			type: "pilot"						},
	pilotDirigible: {	name: "Pilot: Dirigible",			value: 1,			type: "pilot"						},
	pilotShip: 		{	name: "Pilot: Ship",				value: 1,			type: "pilot"						},
	pilotHelicopter:{	name: "Pilot: Helicopter",			value: 1,			type: "pilot",		modern: true	},
	psychoanalysis: {	name: "Psychoanalysis",				value: 1												},
	psychology: 	{	name: "Psychology",					value: 10												},
	readLips:		{	name: "Read Lips", 					value: 1,							uncommon: true		},
	ride:			{	name: "Ride", 						value: 5												},
	rifleShotgun:	{	name: "Rifle/Shotgun",				value: 25, 			type: "firearms"					},
	sleightHand: 	{	name: "Sleight of Hand", 			value: 10												},
	spear: 			{	name: "Spear", 						value: 20,			type: "firearms"					},
	spotHidden: 	{	name: "Spot Hidden",				value: 25												},
	stealth:		{	name: "Stealth", 					value: 20												},
	submachineGun: 	{	name: "Submachine Gun", 			value: 15,			type: "firearms"					},
	survivalDesert:	{	name: "Survival: Desert", 			value: 10,			type: "survival"					},
	survivalJungle:	{	name: "Survival: Jungle", 			value: 10,			type: "survival"					},
	survivalArctic:	{	name: "Survival: Arctic", 			value: 10,			type: "survival"					},
	sword:			{	name: "Sword", 						value: 20,			type: "fighting"					},
	swim: 			{	name: "Swim",						value: 20												},
	throw:			{	name: "Throw",						value: 20												},
	track: 			{	name: "Track",						value: 10												},
	whip:			{	name: "Whip", 						value: 5,			type: "fighting"					},
	zoology:		{	name: "Zoology",		 			value: 1,			type: "science"						}	
};

export {skills};