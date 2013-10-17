SA.spellDef.aoeSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.aoeSVC.prototype.getStrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getStrainDesc()\n"); };
	
	return this.dat.strain.desc;
};

SA.spellDef.aoeSVC.prototype.setStrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setStrainDesc(" + aDesc + ")\n"); };
	
	this.dat.strain.desc = aDesc;
};

SA.spellDef.aoeSVC.prototype.getStrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getStrainCalc()\n"); };
	
	return JSON.stringify(this.dat.strain.calc);
};

SA.spellDef.aoeSVC.prototype.setStrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setStrainCalc()\n"); };
	
	this.dat.strian.calc = JSON.parse(aCalc);
};

SA.spellDef.aoeSVC.prototype.getDrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getDrainDesc()\n"); };
	
	return this.dat.drain.desc;
};

SA.spellDef.aoeSVC.prototype.setDrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setDrainDesc(" + aDesc + ")\n"); };
	
	this.dat.drain.desc = aDesc;
};

SA.spellDef.aoeSVC.prototype.getDrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getDrainCalc()\n"); };
	
	return JSON.stringify(this.dat.drain.calc);
};

SA.spellDef.aoeSVC.prototype.setDrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setDrainCalc(" + aCalc + ")\n"); };
	
	this.dat.drain.calc = JSON.parse(aCalc);
};

SA.spellDef.aoeSVC.prototype.getTAVDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getTAVDesc()\n"); };
	
	return this.dat.tav.desc;
};

SA.spellDef.aoeSVC.prototype.setTAVDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setTAVDesc(" + aDesc + ")\n"); };
};

SA.spellDef.aoeSVC.prototype.getTAVCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.getTAVCalc()\n"); };
	
	return JSON.stringify(this.dat.tav.calc);
};

SA.spellDef.aoeSVC.prototype.setTAVCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.aoeSVC.prototype.setTAVCalc(" + aCalc + ")\n"); };
	
	this.dat.tav.calc = JSON.parse(aCalc);
};