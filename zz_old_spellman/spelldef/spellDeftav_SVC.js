SA.spellDef.tavSVC = function(aDAT) {
	this.dat = aDAT;
};

SA.spellDef.tavSVC.prototype.calculate = function(aCastData,aParentSVC) {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.calculate()\n"); };
	
	data = {};
	data["epot"] = aParentSVC.epot_svc.calculateTAV(aCastData);
	data["targets"] = aParentSVC.target_svc.calculateTAV(aCastData);
	data["dur"] = aParentSVC.dur_svc.calculateTAV(aCastData);
	data["aoe"] = aParentSVC.aoe_svc.calculateTAV(aCastData);
	
	return expressionParser.parse(this.dat.calc,data);
};

SA.spellDef.tavSVC.prototype.getDesc = function() {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.getDesc()\n"); };
	return this.dat.desc;
};

SA.spellDef.tavSVC.prototype.setDesc = function(aDesc) {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.setDesc(" + aDesc + ")\n"); };
	this.dat.desc = aDesc;
};

SA.spellDef.tavSVC.prototype.getBase = function() {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.getBase()\n"); };
	return this.dat.base;
};

SA.spellDef.tavSVC.prototype.setBase = function(aBase) {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.setBase(" + aBase + ")\n"); };
	this.dat.base = aBase;
};

SA.spellDef.tavSVC.prototype.getMin = function() {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.getMin()\n"); };
	return this.dat.min;
};

SA.spellDef.tavSVC.prototype.setMin = function(aMin) {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.setMin(" + aMin + ")\n"); };
	this.dat.min = aMin;
};

SA.spellDef.tavSVC.prototype.getCalc = function() {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.getCalc()\n"); };
	return JSON.stringify(this.dat.calc);
};

SA.spellDef.tavSVC.prototype.setCalc = function(aCalc) {
	if(SA.debug) { SA.log("SA.spellDef.tavSVC.prototype.setCalc(" + aCalc + ")\n"); };
	this.dat.calc = JSON.parse(aCalc);
};