SA.spellDef.strainSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.strainSVC.prototype.calcStrain = function(aData) {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.calcStrain()\n"); };
	
	return expressionParser.parse(this.dat.calc,aData);
};

SA.spellDef.strainSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.getDesc()\n"); };
	
	return this.dat.desc;
};

SA.spellDef.strainSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.setDesc(" + aDesc + ")\n"); };
	
	this.dat.desc = aDesc;
};

SA.spellDef.strainSVC.prototype.getBase = function() {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.getBase()\n"); };
	
	return this.dat.base;
};

SA.spellDef.strainSVC.prototype.setBase = function(aBase) {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.setBase(" + aBase + ")\n"); };
	
	this.dat.base = aBase;
};

SA.spellDef.strainSVC.prototype.getMin = function() {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.getMin()\n"); };
	
	return this.dat.min;
};

SA.spellDef.strainSVC.prototype.setMin = function(aMin) {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.setMin(" + aMin + ")\n"); };
	
	this.dat.min = aMin;
};

SA.spellDef.strainSVC.prototype.getCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.getCalc()\n"); };
	
	return JSON.stringify(this.dat.calc);
};

SA.spellDef.strainSVC.prototype.setCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.strainSVC.prototype.setCalc(" + aCalc + ")\n"); };
	
	this.dat.calc = JSON.parse(aCalc);
};