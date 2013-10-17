SM.characterINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.characterINT"); };
	
	this.svc = aSVC;
	this.parent = undefined;
	
	this.content = undefined;
	
	this.subui = {};
	this.subui["energy_pool"] = new SM.energyPoolINT(this,this.svc);
	this.subui["active_spells"] = new SM.activeSpellsINT(this,this.svc);
	this.subui["attributes"] = new SM.attributeSetINT(this,this.svc);
	this.subui["spell_cast"] = new SM.spellCastINT(this,this.svc);
	this.subui["cast_log"] = new SM.castLogINT(this,this.svc);
};

SM.characterINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.characterINT.prototype.initialize"); };
	
	this.parent = this.svc.parent.ui;
	
	this.root = aRoot;
	
	var div = document.createElement("div");
	this.content = div;
	div.setAttribute("class",SM.NameSpace + "_char_content");
	this.root.appendChild(div);
	
	// Initialize the child UI objects
	for(u in this.subui) {
		if(this.subui[u].initialize)
			this.subui[u].initialize(this.content);
	}
	
	this.update();
};

SM.characterINT.prototype.addPopup = function(aName,aPopup) {
	if(SM.debug) { SM.log("[CALL] SM.characterINT.prototype.addPopup"); };
	
	this.parent.addPopup(aName,aPopup);
};

SM.characterINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterINT.prototype.update"); };
	
	for(s in this.subui)
		this.subui[s].update();
};