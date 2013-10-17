SM.spellManagerSVC = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerSVC"); };

	this.dat = new SM.spellManagerDAT();
	
	this.character = new SM.characterSVC(this,this.dat.character);
	this.definitions = new SM.definitionSetSVC(this,this.dat.definitions);
	this.activity = new SM.activitySVC(this,this.dat.activity);
	this.book = new SM.spellBookSVC(this);
	
	this.ui = new SM.spellManagerINT(this);
	this.ui.initialize(aRoot);//*/
	
	this.serializer = {};
	this.serializer.ls_name = SM.NameSpace + "_spell_man_data";
	SM.loadStandardDefinitions(this.dat.definitions);
};

SM.spellManagerSVC.prototype.saveToLocalStorage = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerSVC.prototype.saveToLocalStorage"); };
	
	if(localStorage && JSON) {
		localStorage.setItem(this.serializer.ls_name,JSON.stringify(this.dat));
		SM.log("[NOTICE] SM.spellManagerSVC.prototype.saveToLocalStorage was successful!");
	}
	else {
		SM.log("[ERROR] SM.spellManagerSVC.prototype.saveToLocalStorage: JSON or localStorage not available");
	}
};

SM.spellManagerSVC.prototype.loadFromLocalStorage = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerSVC.prototype.loadFromLocalStorage"); };
	
	if(localStorage && JSON) {
		var data = localStorage.getItem(this.serializer.ls_name);
		if(data) {
			this.dat = JSON.parse(data);
			//this.definitions.dat = this.dat.definitions;
			this.activity.dat = this.dat.activity;
			this.character.loadFromLocalStorage(this.dat.character);
			
			this.ui.update();
		}
	}
	else {
		SM.log("[ERROR] SM.spellManagerSVC.prototype.loadFromLocalStorage: JSON or localStorage not available");
	}
};