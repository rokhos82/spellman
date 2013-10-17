SM.spellBookSVC = function(aParent) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC"); };

	this.dat = aParent.dat.spell_book;
	this.parent = aParent;
	this.ui = new SM.spellBookINT(this);
	
	this.active_cast = {};
};

SM.spellBookSVC.prototype.loadFromLocalStorage = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.loadFromLocalStorage"); };
	
	this.dat = aDAT;
};

SM.spellBookSVC.prototype.addSpell = function(aName,aPower) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.addSpell(" + aName + "," + aPower + ")"); };
	
	this.dat.spells[aName] = aPower;
};

SM.spellBookSVC.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.removeSpell(" + aName + ")"); };
	
	delete this.dat.spells[aName];
};

SM.spellBookSVC.prototype.getSpellList = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.getSpellList"); };
	
	var spells = {};
	
	var a = new Array();
	
	for(n in this.dat.spells)
		a.push(n);
		
	a = a.sort();
	
	for(s in a) {
		spells[a[s]] = this.dat.spells[a[s]];
	}
	
	return spells;
};

SM.spellBookSVC.prototype.addDisc = function(aName,aPower) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.addDisc(" + aName + "," + aPower + ")"); };
	
	this.dat.discs[aName] = aPower;
};

SM.spellBookSVC.prototype.removeDisc = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.removeDisc(" + aName + ")"); };
	
	delete this.dat.discs[aName];
}

SM.spellBookSVC.prototype.getDiscList = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.getDiscList"); };
	
	var discs = {};
	
	var a = new Array();
	
	for(n in this.dat.discs)
		a.push(n);
		
	a = a.sort();
	
	for(s in a)
		discs[a[s]] = this.dat.discs[a[s]];
	
	return discs;
};

SM.spellBookSVC.prototype.calcSpellPower = function(aSpell,aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.calcSpellPower"); };
	
	return this.dat.spells[aSpell] + this.dat.discs[aDisc];
};

SM.spellBookSVC.prototype.getPresetList = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.getPresetList"); };
	
	var presets = {};
	
	var a = new Array();
	
	for(n in this.dat.presets)
		a.push(n);
		
	for(s in a)
		presets[a[s]] = this.dat.presets[a[s]];
		
	return presets;
};

SM.spellBookSVC.prototype.savePreset = function(aName,aSpell,aDisc,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookSVC.prototype.savePreset"); };
	
	if(this.dat.presets[aName]) {
		SM.log("[ERROR] SM.spellBookSVC.prototype.savePreset: Spell Preset Name Already Exists");
		return;
	}
	
	this.dat.presets[aName] = new SM.spellPresetDAT(aSpell,aDisc,aDAT);
};