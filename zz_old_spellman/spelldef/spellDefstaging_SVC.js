SA.spellDef.stagingSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.stagingSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.getDesc()\n"); };
	
	return this.dat.desc;
};

SA.spellDef.stagingSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.setDesc(" + aDesc + ")\n"); };
	
	this.dat.desc = aDesc;
};

SA.spellDef.stagingSVC.prototype.getType = function() {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.getType()\n"); };
	
	return this.dat.type;
};

SA.spellDef.stagingSVC.prototype.setType = function(aType) {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.setType(" + aType + ")\n"); };
	
	this.dat.type = aType;
};

SA.spellDef.stagingSVC.prototype.getCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.getCalc()\n"); };
	
	return JSON.stringify(this.dat.calc);
};

SA.spellDef.stagingSVC.prototype.setCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.stagingSVC.prototype.setCalc(" + aCalc + ")\n"); };
	
	this.dat.calc = JSON.parse(aCalc);
};