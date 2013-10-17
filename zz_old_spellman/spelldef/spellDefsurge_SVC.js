SA.spellDef.surgeSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.surgeSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.getDesc()\n"); };
	
	return this.dat.desc;
};

SA.spellDef.surgeSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.setDesc(" + aDesc + ")\n"); };
	
	this.dat.desc = aDesc;
};

SA.spellDef.surgeSVC.prototype.getUnit = function() {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.getUnit()\n"); };
	
	return this.dat.unit;
};

SA.spellDef.surgeSVC.prototype.setUnit = function(aUnit) {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.setUnit(" + aUnit + ")\n"); };
	
	this.dat.unit = aUnit;
};

SA.spellDef.surgeSVC.prototype.getCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.getCalc()\n"); };
	
	return JSON.stringify(this.dat.calc);
};

SA.spellDef.surgeSVC.prototype.setCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.surgeSVC.prototype.setCalc(" + aCalc + ")\n"); };
	
	this.dat.calc = JSON.parse(this.dat.calc);
};