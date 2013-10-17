SM.disciplineSVC = function(aDiscDat) {
	this.discdat = aDiscDat;
};


SM.disciplineSVC.prototype.containsSpell = function(aSpellName) {
	if(SM.debug) { SM.log("SM.disciplineSVC.prototype.containsSpell(" + aSpellName + ")\n"); };
};

SM.disciplineSVC.prototype.getName = function() {
	if(SM.debug) { SM.log("SM.disciplineSVC.prototype.getName()\n"); };
	return this.discdat.name;
};

SM.disciplineSVC.prototype.getRank = function() {
	if(SM.debug) { SM.log("SM.disciplineSVC.prototype.getRank()\n"); };
	return this.discdat.rank;
};

SM.disciplineSVC.prototype.addSpell = function(aName) {
	if(SM.debug) { SM.log("SM.disciplineSVC.prototype.addSpell(" + aName + ")\n"); };
	
	if(this.discdat.spells.indexOf(aName) < 0) {
		this.discdat.spells.push(aName);
		this.discdat.spells = this.discdat.spells.sort();
	}
	else {
		SM.log("ERROR (SM.disciplineSVC.prototype.addSpell): Spell '" + aName + "' already in discipline '" + this.discdat.name + "'\n");
	}
};