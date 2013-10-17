SA.spellDefINT = function(aDivs) {
	this.svc = undefined;

	this.inter = {};
	this.inter["general"] = new SA.spellDef.generalINT(aDivs["general"]);
	this.inter["aoe"] = new SA.spellDef.aoeINT(aDivs["aoe"]);
	this.inter["epot"] = new SA.spellDef.epotINT(aDivs["epot"]);
	this.inter["target"] = new SA.spellDef.targetINT(aDivs["target"]);
	this.inter["strain"] = new SA.spellDef.strainINT(aDivs["strain"]);
	this.inter["drain"] = new SA.spellDef.drainINT(aDivs["drain"]);
	this.inter["tav"] = new SA.spellDef.tavINT(aDivs["tav"]);
	this.inter["dur"] = new SA.spellDef.durINT(aDivs["dur"]);
	this.inter["surge"] = new SA.spellDef.surgeINT(aDivs["surge"]);
	this.inter["staging"] = new SA.spellDef.stagingINT(aDivs["staging"]);
};

SA.spellDefINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDefINT.prototype.draw()\n"); };
	
	forEach(this.inter,function(value,key) {
		value.draw();
	});
};

SA.spellDefINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDefINT.prototype.show()\n"); };
	
	this.svc = aSVC;
	
	if(!this.svc) {
		SA.log("ERROR (SA.spellDefINT.prototype.show): Service object is not defined");
	}
	
	this.inter["general"].show(this.svc.general_svc);
	this.inter["aoe"].show(this.svc.aoe_svc);
	this.inter["epot"].show(this.svc.epot_svc);
	this.inter["target"].show(this.svc.target_svc);
	this.inter["strain"].show(this.svc.strain_svc);
	this.inter["drain"].show(this.svc.drain_svc);
	this.inter["tav"].show(this.svc.tav_svc);
	this.inter["dur"].show(this.svc.dur_svc);
	this.inter["surge"].show(this.svc.surge_svc);
	this.inter["staging"].show(this.svc.staging_svc);
};