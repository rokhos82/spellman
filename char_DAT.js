SM.characterDAT = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterDAT"); };
	
	this.attribute_set = new SM.attributeSetDAT();
	this.spell_book = new SM.spellBookDAT();
	this.item_set = new SM.itemSetDAT;
	
	this.active_spells = {};
	this.cast_log = new Array();
};