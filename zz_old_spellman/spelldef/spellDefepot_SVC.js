SA.spellDef.epotSVC = function(aDAT) {
	this.dat = aDAT; // This is of the type SA.spellDef.epotDAT
};

SA.spellDef.epotSVC.prototype.calculateTAV = function(aData) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.calculate()\n"); };
	return expressionParser.parse(this.dat.tav.calc,aData);
};

SA.spellDef.epotSVC.prototype.getStrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getStrainDesc()\n"); };
	
	return this.dat.strain.desc;
};

SA.spellDef.epotSVC.prototype.setStrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setStrainDesc(" + aDesc + ")\n"); };
	
	this.dat.strain.desc = aDesc;
};

SA.spellDef.epotSVC.prototype.getStrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getStrainCalc()\n"); };
	
	return JSON.stringify(this.dat.strain.calc);
};

SA.spellDef.epotSVC.prototype.setStrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setStrainCalc(" + aCalc + ")\n"); };
	
	this.dat.strain.calc = JSON.parse(aCalc);
};

SA.spellDef.epotSVC.prototype.getDrainDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getDrainDesc()\n"); };
	
	return this.dat.drain.desc;
};

SA.spellDef.epotSVC.prototype.setDrainDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setDrainDesc(" + aDesc +")\n"); };
	
	this.dat.drain.desc = aDesc;
};

SA.spellDef.epotSVC.prototype.getDrainCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getDrainCalc()\n"); };
	
	return JSON.stringify(this.dat.drain.calc);
};

SA.spellDef.epotSVC.prototype.setDrainCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setDrainCalc(" + aCalc + ")\n"); };
	
	this.dat.drain.calc = JSON.parse(aCalc);
};

SA.spellDef.epotSVC.prototype.getTAVDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getTAVDesc()\n"); };
	
	return this.dat.tav.desc;
};

SA.spellDef.epotSVC.prototype.setTAVDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setTAVDesc(" + aDesc + ")\n"); };
	
	this.dat.tav.desc = aDesc;
};

SA.spellDef.epotSVC.prototype.getTAVCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.getTAVCalc()\n"); };
	
	return JSON.stringify(this.dat.tav.calc);
};

SA.spellDef.epotSVC.prototype.setTAVCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.epotSVC.prototype.setTAVCalc(" + aCalc + ")\n"); };
	
	this.dat.tav.calc = JSON.parse(aCalc);
};