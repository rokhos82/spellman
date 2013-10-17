SM.spellManagerSVC = function(aManData,aDefSvc,aStorageName,aDispRoot) {
	if(SM.debug) { SM.log("SM.spellManagerSVC(" + aStorageName + ")\n"); };
	
	this.mandat = aManData;
	
	this.activeSpell = undefined;
	this.activeDiscipline = undefined;
	
	this.storageName = aStorageName;
	
	this.spell_defs = aDefSvc;
	
	this.spell_book = new SM.spellBookSVC(this.mandat.spell_book,this.spell_defs,"",this);
	//this.discs_svc = new SM.disciplineSetSVC(this.mandat.spell);
	this.active_spells_svc = undefined;
	
	this.man_int = new SM.spellManagerINT(aDispRoot,this);
};

SM.spellManagerSVC.prototype.loadFromLocalStorage = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.loadFromLocalStorage()\n"); };
	if(JSON && localStorage) {
		if(localStorage.getItem(this.storageName)) {
			this.mandat = JSON.parse(localStorage.getItem(this.storageName));
		}
	} else {
		SM.log("ERROR (SM.spellManagerSVC.prototype.loadFromLocalStorage): Local Storage or JSON is not available\n");
	}
};

SM.spellManagerSVC.prototype.saveToLocalStorage = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.saveToLocalStorage()\n"); };
	if(JSON && localStorage) {
		localStorage.setItem(this.storageName,JSON.stringify(this.mandat));
	} else {
		SM.log("ERROR (SM.spellManagerSVC.prototype.loadFromLocalStorage): Local Storage or JSON is not available\n");
	}
};//*/

SM.spellManagerSVC.prototype.addDiscipline = function(aDiscName,aDiscRank) {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.addDiscipline(" + aDiscName + "," + aDiscRank + ")\n"); };
	if(this.spell_defs.checkDisc(aDiscName)) {
		return this.discs_svc.addDiscipline(aDiscName,aDiscRank);
	} else {
		SM.log("ERROR (SM.spellManagerSVC.prototype.addDisc): Discipline '" + aDiscName + "' does not have a definition\n");
	}
};//*/

SM.spellManagerSVC.prototype.setActiveDiscipline = function(aDisciplineName) {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.setActiveDiscipline(" + aDisciplineName + ")\n"); };
	if(this.discsvc.disciplineExists(aDisciplineName)) {
		this.activeDiscipline = this.discsvc.getDiscipline(aDisciplineName);
	} else {
		return ("ERROR (SM.spellManagerSVC.prototype.setActiveDiscipline): Discipline does not exist.");
	}
};

SM.spellManagerSVC.prototype.clearActiveDiscipline = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.clearActiveDiscipline()\n"); };
	this.activeDiscipline = undefined;
};

SM.spellManagerSVC.prototype.setActiveSpell = function(aSpellName) {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.setActiveSpell(" + aSpellName + ")\n"); };
	if(this.spelldefs[aSpellName]) {
		this.activeSpell = this.spellsvc.getSpell(aSpellName);
	} else {
		return ("ERROR (SM.spellManagerSVC.prototype.setActiveSpell): Spell does not exist.");
	}
};

SM.spellManagerSVC.prototype.clearActiveSpell = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.clearActiveSpell()\n"); };
	this.activeSpell = undefined;
}

SM.spellManagerSVC.prototype.getSpellInfo = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.getSpellInfo()\n"); };
	if(!this.activeSpell) {
	} else {
		return "ERROR (SM.spellManagerSVC.prototype.getSpellInfo): No active spell set.";
	}
};

SM.spellManagerSVC.prototype.getDisciplineInfo = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.getDisciplineInfo()\n"); };
	if(!this.activeDiscipline) {
	} else {
		return "ERROR (SM.spellManagerSVC.prototype.getDisciplineInfo): No active discipline set.";
	}
};

SM.spellManagerSVC.prototype.getSpellBook = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.getSpells()\n"); };
	
	return this.spells_svc.getSpellArray();
};

SM.spellManagerSVC.prototype.getDisciplines = function() {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.getDisciplines()\n"); };
};

SM.spellManagerSVC.prototype.castSpell = function(data) {
	if(SM.debug) { SM.log("SM.spellManagerSVC.prototype.castSpell()\n"); };
	if(this.activeSpell) {
		this.activeSpell.cast(this.activeDiscipline,data);
	} else {
		return "ERROR (SM.spellManagerSVC.prototype.castSpell): No active spell set.";
	}
};