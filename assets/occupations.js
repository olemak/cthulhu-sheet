var occupations = {
	accountant: {
		name: "Accountant",
		description: "Either employed within a business or working as a freelance consultant with a portfolio of self-employed clients or businesses. Diligence and an attention to detail means thatmost accountants can make good researchers, being able to support investigations through the careful analysis of personal and business transactions, financial statements and other records.",
		skillpoints: [{EDU: 4}],
		creditRating: [30, 70],
		contacts: "Business associates, legal professions, financial sector (bankers, other accountants)",
		Skills: ["accounting", "law", "libraryUse", "listen", "persuade", "spotHidden"],
		addSkills: [[2, "Any"]]
	},

	acrobat: {
		name: "Acrobat",
		description: "Acrobats may be either amateur athletes competing in staged meets — possibly even the Olympics — or professionals employed with the entertainment sector (e.g. circuses, carnivals, theatrical performances).",
		skillpoints: [{EDU: 2}, {DEX: 2}],
		creditRating: [9, 20],
		contacts: "Amateur athletic circles, sports writers, circuses and carnivals.",
		Skills: ["climb", "dodge", "jump", "throw", "spotHidden", "swim"],
		addSkills: [[2, "Any"]]
	},

	stageActor: {
		name: "Stage Actor",
		description: "Many stage actors have a background in the classics and, considering themselves “legitimate”, have a tendency to look down upon the commercial efforts of the film industry, although by the late twentieth century this is diminished, with film actors able to command greater respect and higher fees.",
		skillpoints: [{EDU: 2}, {APP: 2}],
		creditRating: [9,40],
		contacts: "Theatre industry, newspaper arts critics, actor’s guild or union.",
		skills: ["disguise", "fighting", "history", "psychology"],
		addSkills: [[2, "interpersonal"], [1, "Any"]],
		artCraftLang: {artCraft: "Acting"}
	},

	filmStar: {
		name: "Film Star",
		description: "Movie stars and the film industry have long captured the interest of people across the world. Many stars are made ‘overnight’ and most of them lead flashy, high profile lives, ever in the media spotlight.",
		skillpoints: [{EDU: 2}, {APP: 2}],
		creditRating: [20, 90],
		contacts: "Film industry, media critics, writers.",
		Skills: ["disguise", "driveAuto", "psychology"],
		addSkills: [[2, "interpersonal"], [2, "Any"]],
		artCraftLang: {artCraft: "Acting"}
	},

	agencyDetective: {
		name: 			"Agency Detective",
		description:	"Numerous well-known detective agencies exist around the world, with probably the most famous being the Pinkerton and Burns agencies (merged into one in modern times). Large agencies employ two types of agents: security guards and operatives./nGuards are uniformed patrolmen, hired by companies and individuals to protect property and people against burglars, assassins and kidnappers. Use the Uniformed Police Officer’s description for these characters. Company Operatives are plainclothes detectives, sent out on cases requiring them to solve mysteries, prevent murders, locate missing people, etc.",
		skillPoints: 	[{EDU: 2}, [{STR: 2},{DEX: 2}]],
		creditRating: 	[20, 45],
		contacts: 		"Local law enforcement, clients.",
		skills: 		["fighting", "firearms", "law", "libraryUse", "psychology", "stealth", "track"],
		addSkills: 		[[1, "interpersonal"]],
	}
};

export {occupations}


