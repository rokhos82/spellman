SM.spellBookSVC = function(aBookDAT,aSpellDEF,aDispID,aParent) {
	if(SM.debug) { SM.log("SM.spellBookSVC()\n"); };
	
	this.book_dat = aBookDAT;
	this.book_int = new SM.spellBookINT(this,null);
	this.cast_int = undefined;
	this.spells_def = aSpellDEF;
	
	this.spell_list = new SM.spellSetSVC(this.book_dat.spells_list,aParent.man_int);
	this.disc_list = new SM.disciplineSetSVC(this.book_dat.discs_list);
	this.preset_list = undefined;//new SM.presetSpellSetSVC(this.book_dat.preset_spells);
	this.melded_list = undefined;//new SM.meldedSpellSetSVC(this.book_dat.melded_spells);
	
	this.active_spell = undefined;
	this.active_disc = undefined;
	
	this.parent = aParent;
};

SM.spellBookSVC.prototype.addSpell = function(aName,aRank,aDisc) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.addSpell(" + aName + "," + aRank + ")\n"); };
	
	if(this.spells_def.checkSpell(aName) && this.spells_def.checkDisc(aDisc)) {
		if(this.book_dat.discs_list[aDisc]) {
			if(!this.book_dat.spells_list[aName])
				this.book_dat.spells_list[aName] = new SM.spellDAT(aName,aRank);
			var disc = new SM.disciplineSVC(this.book_dat.discs_list[aDisc]);
			disc.addSpell(aName);
		}
		else {
			SM.log("ERROR (SM.spellBookSVC.prototype.addSpell): Discipline '" + aDisc + "' not known\n");
		}
	}
	else {
		SM.log("ERROR (SM.spellBookSVC.prototype.addSpell): Spell or discipline does not exist\n");
	}
};

SM.spellBookSVC.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.removeSpell(" + aName + ")\n"); };
	
	// Remove spell from list, presets, and melded.
	this.spell_list.removeSpell(aName);
};

SM.spellBookSVC.prototype.castSpell = function(aName,aDisc,aCastDAT) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.castSpell(" + aName + "," + aDisc + ")\n"); };
};

SM.spellBookSVC.prototype.addDisc = function(aName,aRank) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.addDisc(" + aName + "," + aRank + ")\n"); };
	
	if(this.spells_def.checkDisc(aName)) {
		this.book_dat.discs_list[aName] = new SM.disciplineDAT(aName,aRank);
	}
	else {
		SM.log("ERROR (SM.spellBookSVC.prototype.addDisc): Discipline '" + aName + "' does not exist\n");
	}
};

SM.spellBookSVC.prototype.addSpellPreset = function(aName,aCastDAT) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.addSpellPreset(" + aName + ")\n"); };
	
	if(!this.spell_list.spellExists(aName)) {
		SM.log("ERROR (SM.spellBookSVC.prototype.addSpellPreset): Spell " + aName + " does not exist\n");
		return;
	}
	
	this.preset_list.addPreset(aName,aCastDAT);
};

SM.spellBookSVC.prototype.setActiveSpell = function(aName) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.setActiveSpell(" + aName + ")\n"); };
	
	if(!this.spell_list.spellExists(aName)) {
		SM.log("ERROR (SM.spellBookSVC.prototype.setActiveSpell): Spell '" + aName + "' does not exist\n");
		return;
	}
	
	this.active_spell = this.spell_list.getSpell(aName);
};

SM.spellBookSVC.prototype.setActiveDisc = function(aName) {
	if(SM.debug) { SM.log("SM.spellBookSVC.prototype.setActiveDisc(" + aName + ")\n"); };
	
	if(!this.disc_list.disciplineExists(aName)) {
		SM.log("ERROR (SM.spellBookSVC.prototype.setActiveDisc): Discipline '" + aName + "' does not exist\n");
		return;
	}
	
	this.active_disc = this.disc_list.getDiscipline(aName);
};