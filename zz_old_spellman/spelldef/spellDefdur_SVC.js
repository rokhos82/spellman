SA.spellDef.durSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.durSVC.prototype.getStrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getStrainDesc()\n"); };
	
	return this.dat.strain.desc;
};

SA.spellDef.durSVC.prototype.setStrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setStrainDesc(" + aDesc + ")\n"); };
	
	this.dat.strain.desc = aDesc;
};

SA.spellDef.durSVC.prototype.getStrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getStrainCalc()\n"); };
	
	return JSON.stringify(this.dat.strain.calc);
};

SA.spellDef.durSVC.prototype.setStrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setStrainCalc(" + aCalc + ")\n"); };
	
	this.dat.strain.calc = JSON.parse(aCalc);
};

SA.spellDef.durSVC.prototype.getDrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getDrainDesc()\n"); };
	
	return this.dat.drain.desc;
};

SA.spellDef.durSVC.prototype.setDrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setDrainDesc(" + aDesc + ")\n"); };
	
	this.dat.drain.desc = aDesc;
};

SA.spellDef.durSVC.prototype.getDrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getDrainCalc()\n"); };
	
	return JSON.stringify(this.dat.drain.calc);
};

SA.spellDef.durSVC.prototype.setDrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setDrainCalc(" + aCalc + ")\n"); };
	
	this.dat.drain.calc = JSON.parse(aCalc);
};

SA.spellDef.durSVC.prototype.getTAVDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getTAVDesc()\n"); };
	
	return this.dat.tav.desc;
};

SA.spellDef.durSVC.prototype.setTAVDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setTAVDesc()\n"); };
	
	this.dat.tav.desc = aDesc;
};

SA.spellDef.durSVC.prototype.getTAVCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.getTAVCalc()\n"); };
	
	return JSON.stringify(this.dat.tav.calc);
};

SA.spellDef.durSVC.prototype.setTAVCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.durSVC.prototype.setTAVCalc()\n"); };
	
	this.dat.tav.calc = JSON.parse(this.dat.tav.calc);
};