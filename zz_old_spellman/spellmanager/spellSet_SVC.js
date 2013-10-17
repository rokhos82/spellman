SM.spellSetSVC = function(aSetDat,aUI) {
	this.setdat = aSetDat;
};

SM.spellSetSVC.prototype.addSpell = function(aSpellName,aSpellRank) {
	if(SM.debug) { SM.log("SM.spellSetSVC.prototype.addSpell(" + aSpellName + "," + aSpellRank + ")\n"); };
	if(!this.spellExists(aSpellName)) {
		this.setdat[aSpellName] = new SM.spellDAT(aSpellName,aSpellRank);
	} else {
		return "ERROR (SM.spellSetSVC.prototype.addSpell): Spell is already in the set.";
	}
};

SM.spellSetSVC.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("SM.spellSetSVC.prototype.removeSpell(" + aName + ")\n"); };
	
	if(!this.spellExists(aName)) {
		SM.log("ERROR (SM.spellSetSVC.prototype.removeSpell): Spell does not exist\n");
		return;
	}
	
	delete this.setdat.spells[aName];
};

SM.spellSetSVC.prototype.getSpell = function(aSpellName) {
	if(SM.debug) { SM.log("SM.spellSetSVC.prototype.getSpell(" + aSpellName + ")\n"); };
	if(this.spellExists(aSpellName)) {
		return new SM.spellSVC(this.setdat[aSpellName]);
	} else {
		return "ERROR (SM.spellSetSVC.prototype.getSpell): Spell is not in set";
	}
};

SM.spellSetSVC.prototype.getSpellArray = function() {
	if(SM.debug) { SM.log("SM.spellSetSVC.prototype.getSpellArray()\n"); };
	var list = new Array();
	var index = 0;
	forEach(this.setdat.spells,function(value,key) {
		list[index] = new SM.spellSVC(value);
		index++;
	});
	return list;
}

SM.spellSetSVC.prototype.spellExists = function(aSpellName) {
	return (this.setdat[aSpellName] ? true : false);
};