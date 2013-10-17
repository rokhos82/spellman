SA.spellDef.epotDAT = function() {
	this.strain = {};
	this.strain.calc = new expressionParser.expression();
	this.strain.desc = ""; // +4 per EPOT
	
	this.drain = {};
	this.drain.calc = new expressionParser.expression();
	this.drain.desc = ""; // +2 per EPOT
	
	this.tav = {};
	this.tav.calc = new expressionParser.expression();
	this.tav.desc = ""; // +20 per EPOT
};