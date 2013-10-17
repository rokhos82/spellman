SA.spellDefSVC = function(aDat) {
	this.aoe_svc = new SA.spellDef.aoeSVC(aDat.aoe_dat);
	this.general_svc = new SA.spellDef.generalSVC(aDat.general_dat);
	this.epot_svc = new SA.spellDef.epotSVC(aDat.epot_dat);
	this.target_svc = new SA.spellDef.targetSVC(aDat.target_dat);
	this.strain_svc = new SA.spellDef.strainSVC(aDat.strain_dat);
	this.drain_svc = new SA.spellDef.drainSVC(aDat.drain_dat);
	this.tav_svc = new SA.spellDef.tavSVC(aDat.tav_dat);
	this.dur_svc = new SA.spellDef.durSVC(aDat.dur_dat);
	this.surge_svc = new SA.spellDef.surgeSVC(aDat.surge_dat);
	this.staging_svc = new SA.spellDef.stagingSVC(aDat.stage_dat);
};

SA.spellDefSVC.prototype.calculateStrain = function(aData) {
	if(SA.debug) { SA.log("SA.spellDefSVC.prototype.calculateStrain()\n"); };
	
	var d = {};
	d["epot"] = this.epot_svc.calculateStrain(aData);
	d["target"] = this.target_svc.calculateStrain(aData);
	
	var s = this.strain_svc.calculateStrain(d);
	
	return s;
};