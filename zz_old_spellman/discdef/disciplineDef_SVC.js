SA.disciplineDefSVC = function(aDat) {
	this.dat = aDat;
};

SA.disciplineDefSVC.prototype.setName = function(aName) {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.setName(" + aName + ")\n"); };
	
	this.dat.name = aName;
};

SA.disciplineDefSVC.prototype.getName = function() {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.getName()\n"); };
	
	return this.dat.name;
};

SA.disciplineDefSVC.prototype.setLongName = function(aName) {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.setLongName(" + aName + ")\n"); };
	
	this.dat.longname = aName;
};

SA.disciplineDefSVC.prototype.getLongName = function() {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.getLongName()\n"); };
	
	return this.dat.longname;
};

SA.disciplineDefSVC.prototype.setDescription = function(aDesc) {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.setDescription(" + aDesc + ")\n"); };
	
	this.dat.description = aDesc;
};

SA.disciplineDefSVC.prototype.getDescription = function() {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.getDescription()\n"); };
	
	return this.dat.description;
};

SA.disciplineDefSVC.prototype.addSpell = function(aSpellSvc) {
	if(SA.debug) { SA.log("SA.disciplineDefSVC.prototype.addSpell()\n"); };
	
	var name = aSpellSvc.getName();
	
	if(!this.dat.spells.contains(name)) {
		var i = this.dat.spells.length;
		this.dat.spells[i] = name;
	} else {
		SA.log("ERROR (SA.disciplineDefSVC.prototype.addSpell): " + name + " already exists in this discipline.\n");
	}
};