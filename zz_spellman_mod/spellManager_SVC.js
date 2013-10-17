SM.spellManagerSVC = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerSVC"); };
	
	this.dat = new SM.spellManagerDAT();
	this.ui = new SM.spellManagerINT(this);
	this.modules = {};
};

SM.spellManagerSVC.prototype.addModule = function(module) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerSVC.prototype.addModule"); };
	
	this.dat.modules[module.name] = module.dat;
	this.modules[module.name] = module;
	
	switch(module.type) {
		default:
			SM.log("[WARNING] SM.spellManagerSVC.prototype.addModule - Module type unknown");
	}
};