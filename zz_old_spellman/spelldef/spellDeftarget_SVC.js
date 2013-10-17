SA.spellDef.targetSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.targetSVC.prototype.getStrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getStrainDesc()\n"); };
	
	return this.dat.strain.desc;
};

SA.spellDef.targetSVC.prototype.setStrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setStrainDesc(" + aDesc + ")\n"); };
	
	this.dat.strain.desc = aDesc;
};

SA.spellDef.targetSVC.prototype.getStrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getStrainCalc()\n"); };
	
	return JSON.stringify(this.dat.strain.calc);
};

SA.spellDef.targetSVC.prototype.setStrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setStrainCalc(" + aCalc + ")\n"); };
	
	this.dat.strain.calc = JSON.parse(aCalc);
};

SA.spellDef.targetSVC.prototype.getDrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getDrainDesc()\n"); };
	
	return this.dat.drain.desc;
};

SA.spellDef.targetSVC.prototype.setDrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setDrainDesc(" + aDesc + ")\n"); };
	
	this.dat.drain.desc = aDesc;
};

SA.spellDef.targetSVC.prototype.getDrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getDrainCalc()\n"); };
	
	return JSON.stringify(this.dat.drain.calc);
};

SA.spellDef.targetSVC.prototype.setDrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setDrainCalc(" + aCalc + ")\n"); };
	
	this.dat.drain.calc = JSON.parse(aCalc);
};

SA.spellDef.targetSVC.prototype.getTAVDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getTAVDesc()\n"); };
	
	return this.dat.tav.desc;
};

SA.spellDef.targetSVC.prototype.setTAVDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setTAVDesc(" + aDesc + ")\n"); };
	
	this.dat.tav.desc = aDesc;
};

SA.spellDef.targetSVC.prototype.getTAVCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.getTAVCalc()\n"); };
	
	return JSON.stringify(this.dat.tav.calc);
};

SA.spellDef.targetSVC.prototype.setTAVCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.targetSVC.prototype.setTAVCalc(" + aCalc + ")\n"); };
	
	this.dat.tav.calc = JSON.parse(aCalc);
};