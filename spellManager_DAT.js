SM.spellManagerDAT = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerDAT"); };
	
	this.activity = new SM.activityDAT();
	this.character = new SM.characterDAT();
	this.definitions = new SM.definitionSetDAT();
};