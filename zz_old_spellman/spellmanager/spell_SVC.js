SM.spellSVC = function (aSpellDat,aSpellDef) {
	this.spelldat = aSpellDat;
};

SM.spellSVC.prototype.cast = function(aDiscSVC,aData) {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.cast()\n"); };
	
	this.disc = aDiscSVC;
	this.updatePower();
	aData.PWR = this.power;
	this.strain = this.calcStrain(aData);
};

SM.spellSVC.prototype.getName = function () {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.getName()\n"); };
	
	return this.spelldat.name;
};

SM.spellSVC.prototype.getRank = function() {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.getRank()\n"); };
	
	return this.spelldat.rank;
};

SM.spellSVC.prototype.getStrain = function() {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.getStrain()\n"); };
	
	return this.strain;
};

SM.spellSVC.prototype.updatePower = function() {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.updatePower()\n"); };
	if(this.disc) {
		this.power = (this.spelldat.rank + this.disc.getRank());
	} else {
		return "ERROR (SM.spellSVC.prototype.updatePower): Discipline is not set.";
	}
};

SM.spellSVC.prototype.calcDrain = function() {
};

SM.spellSVC.prototype.calcStrain = function(data) {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.calcStrain(" + JSON.stringify(data) + ")\n"); };
	if(data) {
		var b = this.spelldef.base.strain;
		var e = this.calcStrainPerEPOT(data);
		var t = this.calcStrainPerTarget(data);
		var a = this.calcStrainPerAOE(data);
		
		var d = new kantiaDefs.spellCastData();
		d["base"] = b;
		d["EPOT"] = e;
		d["TARGS"] = t;
		d["AOE"] = a;
		var result = expressionParser.parse(this.spelldef.calc.strain,d);
		return result - this.disc.getRank();
	} else {
		return "ERROR (SM.spellSVC.prototype.calcStrain): Data object not valid.";
	};
};

SM.spellSVC.prototype.calcStrainPerTarget = function(data) {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.calcStrainPerTarget(" + JSON.stringify(data) + ")\n"); };
	if(data) {
		return expressionParser.parse(this.spelldef.targets.strain.calc,data) * this.spelldef.targets.strain.per;
	} else {
		return "ERROR (SM.spellSVC.prototype.calcStrainPerTarget): Data object not valid.";
	}
};

SM.spellSVC.prototype.calcStrainPerEPOT = function(data) {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.calcStrainPerEPOT(" + JSON.stringify(data) + ")\n"); };
	if(data) {
		return expressionParser.parse(this.spelldef.EPOT.strain.calc,data) * this.spelldef.EPOT.strain.per;
	} else {
		return "ERROR (SM.spellSVC.prototype.calcStrainPerEPOT): Data object not valid.";
	}
};

SM.spellSVC.prototype.calcStrainPerAOE = function(data) {
	if(SM.debug) { SM.log("SM.spellSVC.prototype.calcStrainPerAOE(" + JSON.stringify(data) + ")\n"); };
	if(data) {
		return expressionParser.parse(this.spelldef.AOE.strain.calc,data) * this.spelldef.AOE.strain.per;
	} else {
		return "ERROR (SM.spellSVC.prototype.calcStrainPerAOE): Data object not valid.";
	}
};

SM.spellSVC.prototype.calcRange = function() {
};