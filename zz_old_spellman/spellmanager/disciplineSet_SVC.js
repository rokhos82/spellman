SM.disciplineSetSVC = function (aSetDat) {
	this.setdat = aSetDat;
};

SM.disciplineSetSVC.prototype.addDiscipline = function(aDiscName,aDiscRank) {
	if(SM.debug) { SM.log("SM.disciplineSetSVC.prototype.addDiscipline(" + aDiscName + "," + aDiscRank + ")\n"); };
	if(!this.disciplineExists(aDiscName)) {
		this.setdat[aDiscName] = new SM.disciplineDAT(aDiscName,aDiscRank);
	} else {
		return "ERROR (SM.disciplineSetSVC.prototype.addDiscipline): Discipline is already in the set.";
	}
};

SM.disciplineSetSVC.prototype.getDiscipline = function(aDiscName) {
	if(SM.debug) { SM.log("SM.disciplineSetSVC.prototype.getDiscipline(" + aDiscName + ")\n"); };
	if(this.disciplineExists(aDiscName)) {
		return new SM.disciplineSVC(this.setdat[aDiscName]);
	} else {
		return "ERROR (SM.disciplineSetSVC.prototype.getDiscipline): Discipline does not exist.";
	}
};

SM.disciplineSetSVC.prototype.disciplineExists = function(aDiscName) {
	return (this.setdat[aDiscName] ? true : false);
}