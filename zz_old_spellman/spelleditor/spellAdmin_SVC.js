SA.spellAdminSVC = function(aAdmDat,aStorage) {
	if(SA.debug) { SA.log("SA.spellAdminSVC()\n"); };
	this.admdat = aAdmDat;
	this.storageName = aStorage;
	
	this.activeSpell = undefined;
	this.activeDiscipline = undefined;
	
	this.spellsSvc = new SA.spellDefSetSVC(this.admdat.spells);
	this.discsSvc = new SA.disciplineDefSetSVC(this.admdat.discs);
};

SA.spellAdminSVC.prototype.loadFromLocalStorage = function() {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.loadFromLocalStorage()\n"); };
	if(JSON && localStorage) {
		if(localStorage.getItem(this.storageName)) {
			this.admdat = JSON.parse(localStorage.getItem(this.storageName));
			this.spellsSvc = new SA.spellDefSetSVC(this.admdat.spells);
			this.discsSvc = new SA.disciplineDefSetSVC(this.admdat.discs);
		}
	} else {
		SA.log("ERROR (SA.spellAdminSVC.prototype.loadFromLocalStorage): JSON or localStorage is not available\n");
	}
};

SA.spellAdminSVC.prototype.saveToLocalStorage = function() {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.saveToLocalStorage()\n"); };
	if(JSON && localStorage) {
		localStorage.setItem(this.storageName,JSON.stringify(this.admdat));
	} else {
		SA.log("ERROR (SA.spellAdminSVC.prototype.saveToLocalStorage): JSON or localStorage is not available\n");
	}
};

SA.spellAdminSVC.prototype.createSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.createSpell(" + aName + ")\n"); };
	if(!this.spellsSvc.spellExists(aName)) {
		this.spellsSvc.addSpell(aName);
	} else {
		SA.log("ERROR (SA.spellAdminSVC.prototype.createSpell): Spell already exists - " + aName + "\n");
	}
};

SA.spellAdminSVC.prototype.createDiscipline = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.createDiscipline(" + aName + ")\n"); };
	if(!this.discsSvc.discExists(aName)) {
		this.discsSvc.addDisc(aName);
	} else {
		SA.log("ERROR (SA.spellAdminSVC.prototype.createDiscipline): Discipline already exists");
	}
};

SA.spellAdminSVC.prototype.setActiveSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.setActiveSpell(" + aName + ")\n"); };
	
	this.activeSpell = this.spellsSvc.getSpell(aName);
};

SA.spellAdminSVC.prototype.clearActiveSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.clearActiveSpell(" + aName + ")\n"); };
	this.activeSpell = undefined;
};

SA.spellAdminSVC.prototype.setActiveDiscipline = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.setActiveDiscipline(" + aName + ")\n"); };
	this.activeDiscipline = this.discsSvc.getDisc(aName);
};

SA.spellAdminSVC.prototype.clearActiveDiscipline = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.clearActiveDiscipline(" + aName + ")\n"); };
	this.activeDiscipline = undefined;
};

SA.spellAdminSVC.prototype.getSpellList = function() {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.getSpellList()\n"); };
	return this.spellsSvc.getSpellNames();
};

SA.spellAdminSVC.prototype.getDiscList = function() {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.getDiscList()\n"); };
	return this.discsSvc.getDiscNames();
};

SA.spellAdminSVC.prototype.addSpellToDiscipline = function(aSpell,aDisc) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.addSpellToDiscipline()\n"); };
	
	if(this.spellsSvc.spellExists(aSpell) && this.discsSvc.discExists(aDisc)) {
		var disc = this.discsSvc.getDisc(aDisc);
		var spell = this.spellsSvc.getSpell(aSpell);
		
		disc.addSpell(spell);
		spell.addDisc(disc);
	} else {
		SA.log("ERROR (SA.spellAdminSVC.prototype.addSpellToDiscipline): " + aSpell + " or " + aDisc + " does not exists.\n");
	}
};

SA.spellAdminSVC.prototype.checkSpell = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.checkSpell(" + aName + ")\n"); };
	
	return this.spellsSvc.spellExists(aName);
};

SA.spellAdminSVC.prototype.checkDisc = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminSVC.prototype.checkDisc(" + aName + ")\n"); };
	
	return this.discsSvc.discExists(aName);
};