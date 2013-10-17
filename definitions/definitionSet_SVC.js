SM.definitionSetSVC = function(aParent,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC"); };
	
	this.parent = aParent;
	this.dat = aDAT;
	this.ui = new SM.definitionSetINT(this);
	
	this.active_spell = new SM.spellDefSVC(this);
	this.active_disc = new SM.discDefSVC(this);
};

SM.definitionSetSVC.prototype.getSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.getSpell(" + aName + ")"); };
	
	if(!this.dat.spells[aName]) {
		SM.log("[ERROR] SM.spellDefSVC.prototype.getSpell: " + aName + " is not a spell");
		return;
	}

	return new SM.spellDefSVC(undefined,this.dat.spells[aName]);
};

SM.definitionSetSVC.prototype.addSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.addSpell(" + aName + ")"); };
	
	if(!this.dat.spells[aName]) {
		this.dat.spells[aName] = new SM.spellDefDAT(aName);
	}
	else {
		SM.log("[WARNING] SM.definitionSetSVC.prototype.addSpell: " + aName + " already exists");
	}
};

SM.definitionSetSVC.prototype.addDisc = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.addDisc(" + aName + ")"); };
	
	if(!this.dat.disciplines[aName]) {
		this.dat.disciplines[aName] = new SM.discDefDAT(aName);
	}
	else {
		SM.log("[WARNING] SM.definitionSetSVC.prototype.addDisc: " + aName + " already exists");
	}
};

SM.definitionSetSVC.prototype.spellExists = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.spellExists(" + aName + ")"); };
	
	if(this.dat.spells[aName])
		return true;
	else
		return false;
};

SM.definitionSetSVC.prototype.disciplineExists = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.disciplineExists(" + aName + ")"); };
	
	if(this.dat.disciplines[aName])
		return true;
	else
		return false;
};

SM.definitionSetSVC.prototype.isSpellInDiscipline = function(aSpell,aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.isSpellInDiscipline") };
	
	if(this.dat.disciplines[aDisc] && this.dat.disciplines[aDisc].spells[aSpell])
		return true;
	else
		return false;
};

SM.definitionSetSVC.prototype.getSpellList = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.getSpellList"); };
	
	var ar = new Array();
	
	for(n in this.dat.spells)
		ar.push(n);
		
	return ar.sort();
};

SM.definitionSetSVC.prototype.getDiscList = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.getDiscList"); };
	
	var ar = new Array();
	
	for(n in this.dat.disciplines)
		ar.push(n);
		
	return ar.sort();
};

SM.definitionSetSVC.prototype.getDiscSpellList = function(aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetSVC.prototype.getDiscSpellList"); };
	
	var ar = new Array();
	
	for(n in this.dat.disciplines[aDisc].spells)
		ar.push(n);
		
	return ar.sort();
};