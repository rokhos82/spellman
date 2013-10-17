SA.spellDefSetSVC = function(aSetDat) {
	this.setdat = aSetDat;
};

SA.spellDefSetSVC.prototype.spellExists = function(aName) {
	if(SA.debug) { SA.log("SA.spellDefSetSVC.prototype.spellExists(" + aName + ")\n"); };
	
	return (this.setdat.defs[aName]) ? true : false;
};

SA.spellDefSetSVC.prototype.addSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellDefSetSVC.prototype.addSpell(" + aName + ")\n"); };
	if(aName || typeof aName != "string") {
		this.setdat.defs[aName] = new SA.spellDefDAT(aName);
	} else {
		SA.log("ERROR (SA.spellDefSetSVC.prototype.addSpell): Name is not valid\n");
	}
};

SA.spellDefSetSVC.prototype.getSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellDefSetSVC.prototype.getSpell(" + aName + ")\n"); };
	if(this.spellExists(aName)) {
		return new SA.spellDefSVC(this.setdat.defs[aName]);
	} else {
		return "ERROR (SA.spellDefSetSVC.prototype.getSpell): Spell does not exist.";
	}
};

SA.spellDefSetSVC.prototype.getAllSpells = function() {
	if(SA.debug) { SA.log("SA.spellDefSetSVC.prototype.getAllSpells()\n"); };
	
	var spells = {};
	
	forEach(this.setdat.defs,function(value,key) {
		spells[key] = new SA.spellDefSVC(value);
	});
	
	return spells;
};

SA.spellDefSetSVC.prototype.getSpellNames = function() {
	if(SA.debug) { SA.log("SA.spellDefSetSVC.prototype.getSpellNames()\n"); };
	
	var names = new Array();
	var i = 0;
	
	forEach(this.setdat.defs,function(val,key) {
		names[i] = key;
		i++;
	});
	
	return names;
};