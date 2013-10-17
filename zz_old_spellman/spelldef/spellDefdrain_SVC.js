SA.spellDef.drainSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.drainSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.getDesc()\n"); };
	
	return this.dat.desc;
};

SA.spellDef.drainSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.setDesc(" + aDesc + ")\n"); };
	
	this.dat.desc = aDesc;
};

SA.spellDef.drainSVC.prototype.getBase = function() {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.getBase()\n"); };
	
	return this.dat.base;
};

SA.spellDef.drainSVC.prototype.setBase = function(aBase) {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.setBase(" + aBase + ")\n"); };
	
	this.dat.base = aBase;
};

SA.spellDef.drainSVC.prototype.getMin = function() {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.getMin()\n"); };
	
	return this.dat.min;
};

SA.spellDef.drainSVC.prototype.setMin = function(aMin) {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.setMin(" + aMin + ")\n"); };
	
	this.dat.min = aMin;
};

SA.spellDef.drainSVC.prototype.getCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.getCalc()\n"); };
	
	return JSON.stringify(this.dat.calc);
};

SA.spellDef.drainSVC.prototype.setCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.drainSVC.prototype.setCalc(" + aCalc + ")\n"); };
	
	this.dat.calc = JSON.parse(aCalc);
};