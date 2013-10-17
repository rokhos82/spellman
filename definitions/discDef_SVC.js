SM.discDefSVC = function(aParent) {
	if(SM.debug) { SM.log("[CALL] SM.discDefSVC"); };
	
	this.dat = undefined;
	this.parent = aParent;
	this.ui = new SM.discDefINT(this);
};

SM.discDefSVC.prototype.hasSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.discDefSVC.prototype.hasSpell(" + aName + ")"); };
	
	if(this.dat) {
		if(this.dat[aName])
			return true;
		else
			return false;
	}
	else {
		SM.log("[ERROR] SM.discDefSVC.prototype.hasSpell: No definition data");
	}
};

SM.discDefSVC.prototype.addSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.discDefSVC.prototype.addSpell(" + aName + ")"); };
	
	if(this.dat) {
		if(this.parent.spellExists(aName)) {
			if(!this.dat.spells[aName]) {
				this.dat.spells[aName] = 1;
			}
			else {
				SM.log("[WARNING] SM.discDefSVC.prototype.addSpell: " + aName + " already in " + this.dat.name);
			}
			
			var disc_name = this.parent.active_disc.dat.name;
			this.parent.dat.spells[aName].disciplines[disc_name] = 1;
		}
	}
	else {
		SM.log("[ERROR] SM.discDefSVC.prototype.addSpell: No definition data");
	}
};

SM.discDefSVC.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.discDefSVC.prototype.removeSpell(" + aName + ")"); };
	
	if(this.dat) {
		if(this.dat.spells[aName])
			delete this.dat.spells[aName];
		else
			SM.log("[WARNING] SM.discDefSVC.prototype.removeSpell: Spell does not exist");
	}
	else {
		SM.log("[ERROR] SM.discDefSVC.prototype.removeSpell: No definition data");
	}
};

SM.discDefSVC.prototype.getSpellList = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefSVC.prototype.getSpellList"); };
	
	if(!this.dat) {
		SM.log("[ERROR] SM.discDefSVC.prototype.getSpellList: No definition data");
		return;
	}
	
	var ar = new Array();
	
	for(s in this.dat.spells)
		ar.push(s);
	
	return ar.sort();
};