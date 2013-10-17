SA.disciplineDefSetSVC = function(aSetDat) {
	this.setdat = aSetDat;
};

SA.disciplineDefSetSVC.prototype.discExists = function(aName) {
	if(SA.debug) { SA.log("SA.discDefSetSVC.prototype.discExists(" + aName + ")\n"); };
	
	return (this.setdat.defs[aName]) ? true : false;
};

SA.disciplineDefSetSVC.prototype.addDisc = function(aName) {
	if(SA.debug) { SA.log("SA.discDefSetSVC.prototype.addDisc(" + aName + ")\n"); };
	if(aName || typeof aName != "string") {
		this.setdat.defs[aName] = new SA.disciplineDefDAT();
		this.setdat.defs[aName].name = aName;
	} else {
		return "ERROR (SA.discDefSetSVC.prototype.addDisc): Name is not valid.";
	}
};

SA.disciplineDefSetSVC.prototype.getDisc = function(aName) {
	if(SA.debug) { SA.log("SA.discDefSetSVC.prototype.getDisc(" + aName + ")\n"); };
	if(this.discExists(aName)) {
		return new SA.disciplineDefSVC(this.setdat.defs[aName]);
	} else {
		return "ERROR (SA.discDefSetSVC.prototype.getDisc): Disc does not exist.";
	}
};

SA.disciplineDefSetSVC.prototype.getDiscNames = function() {
	if(SA.debug) { SA.log("SA.disciplineDefSetSVC.prototype.getDiscNames()\n"); };
	
	var names = new Array();
	var i = 0;
	
	forEach(this.setdat.defs,function(val,key) {
		names[i] = val.name;
		i++;
	});
	
	return names;
};