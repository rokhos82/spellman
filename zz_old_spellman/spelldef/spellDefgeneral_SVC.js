SA.spellDef.generalSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.generalSVC.prototype.getName = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getName()\n"); };
	
	return this.dat.name;
};

SA.spellDef.generalSVC.prototype.setName = function(aName) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setName(" + aName + ")\n"); };
	
	this.dat.name = aName;
};

SA.spellDef.generalSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getDesc()\n"); };
	
	return this.dat.desc;
};

SA.spellDef.generalSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setDesc(" + aDesc + ")\n"); };
	
	this.dat.desc = aDesc;
};

SA.spellDef.generalSVC.prototype.getDiscs = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getDisc()\n"); };
	
	return this.dat.disciplines.toString();
};

SA.spellDef.generalSVC.prototype.setDiscs = function(aDiscString) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setDisc(" + aDiscString + ")\n"); };
	
	var discs = aDiscString.split(",");
	var i = discs.length;
	
	while(i--) {
		discs[i] = discs[i].trim();
	}
	
	this.dat.disciplines = discs.sort();
};

SA.spellDef.generalSVC.prototype.getPrereq = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getPrereq()\n"); };
	
	return this.dat.prereq;
};

SA.spellDef.generalSVC.prototype.setPrereq = function(aPrereq) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setPrereq(" + aPrereq + ")\n"); };
	
	this.dat.prereq = aPrereq;
};

SA.spellDef.generalSVC.prototype.getComponents = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getComponents()\n"); };
	
	return this.dat.components;
};

SA.spellDef.generalSVC.prototype.setComponents = function(aComp) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setComponents(" + aComp + ")\n"); };
	
	this.dat.components = aComp;
};

SA.spellDef.generalSVC.prototype.getEffect = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getEffect()\n"); };
	
	return this.dat.effect;
};

SA.spellDef.generalSVC.prototype.setEffect = function(aEffect) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setEffect(" + aEffect + ")\n"); };
	
	this.dat.effect = aEffect;
};

SA.spellDef.generalSVC.prototype.getResist = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.getResist()\n"); };
	
	return this.dat.resist;
};

SA.spellDef.generalSVC.prototype.setResist = function(aResist) {
	if(SA.debug) { SA.log("SA.spellDef.generalSVC.prototype.setResist(" + aResist + ")\n"); };
	
	this.dat.resist = aResist;
};