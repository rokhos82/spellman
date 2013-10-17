SM.spellManagerDAT = function() {
	if(SM.debug) { SM.log("SM.spellManagerDAT()\n"); };
	
	this.spell_book = new SM.spellBookDAT();
	this.disciplines = new SM.disciplineSetDAT();
	this.active_spells = undefined;
	this.cast_log = undefined;
	this.stats = undefined;
	this.magic_items = undefined;
};