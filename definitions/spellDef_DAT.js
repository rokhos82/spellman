SM.spellDefDAT = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefDAT(" + aName + ")"); };

	this.text = {};
	this.text.name = aName;
	this.text.prereq = "";
	this.text.components = "";
	this.text.description = "";
	this.text.effect = "";
	this.text.limits = "";
	this.text.special = "";
	this.text.strain = "";
	this.text.min_cost = "";
	this.text.drain = "";
	this.text.surge = "";
	this.text.tav = "";
	this.text.duration = "";
	this.text.aoe = "";
	this.text.range = "";
	this.text.karma = "";
	this.text.damage = "";
	this.text.staging = "";
	
	this.disciplines = {};
	
	this.calc = {};
	this.calc.min_cost = new Array();
	this.calc.tav = new Array(); // [20,"add",["5","mul","EPOT"],"add",["10","mul","TARGETS"]] <-- Shoal of Shadow TAV formula
	this.calc.aoe = new Array();
	this.calc.strain = new Array();
	this.calc.duration = new Array();
	this.calc.surge = new Array();
	this.calc.drain = new Array();
	this.calc.range = new Array();
	this.calc.surge_dur = new Array();
	
	// 0 := not used
	// 1 := normal calc
	// 2 := output only calc
	this.calc_hash = {};
	this.calc_hash.min_cost = false;
	this.calc_hash.tav = false;
	this.calc_hash.aoe = false;
	this.calc_hash.strain = false;
	this.calc_hash.duration = false;
	this.calc_hash.surge = false;
	this.calc_hash.drain = false;
	this.calc_hash.range = false;
	
	this.units = {
		"range":"",
		"aoe":""
	};
	
	this.special = {
		"surge_limited":false
	};
};