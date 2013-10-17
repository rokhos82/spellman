SM.spellDefSVC = function(aParent,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC"); };
	
	this.dat = aDAT;
	this.parent = aParent;
	
	if(this.parent)
		this.ui = new SM.spellDefINT(this);
};

SM.spellDefSVC.prototype.calcTAV = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcTAV"); };
	
	if(!this.dat) {
		SM.log("[ERROR] SM.spellDefSVC.prototype.calcTAV: Service has no data object");
		return 0;
	}
	
	return SM.calculate(this.dat.calc.tav,aDAT);
};

SM.spellDefSVC.prototype.calcStamina = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcStamina"); };
	
	if(!this.dat) {
		SM.log("[ERROR] SM.spellDefSVC.prototype.calcStamina: Service has no data object");
	}
	
	var min = this.dat.calc.min_cost;
	var stam = SM.calculate(this.dat.calc.strain,aDAT) - aDAT.POOL;
	
	if(min > stam)
		return min;
	else
		return stam;
};

SM.spellDefSVC.prototype.calcDrain = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcDrain"); };
	
	if(this.dat.calc_hash.drain)
		return SM.calculate(this.dat.calc.drain,aDAT);
	else
		return 0;
};

SM.spellDefSVC.prototype.calcDuration = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcDuration"); };
	
	if(this.dat.calc_hash.duration)
		return SM.calculate(this.dat.calc.duration,aDAT);
	else
		return 0;
};

SM.spellDefSVC.prototype.calcRange = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcRange"); };
	
	if(this.dat.calc_hash.range)
		return SM.calculate(this.dat.calc.range,aDAT);
	else
		return 0;
};

SM.spellDefSVC.prototype.calcSurge = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcSurge"); };
	
	if(this.dat.calc_hash.surge)
		return SM.calculate(this.dat.calc.surge,aDAT);
	else
		return 0;
};

SM.spellDefSVC.prototype.calcSurgeDuration = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.calcSurgeDuration"); };
	
	if(this.dat.calc_hash.surge_dur)
		return SM.calculate(this.dat.calc.surge_dur,aDAT);
	else
		return 0;
};

SM.spellDefSVC.prototype.addDisc = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.addDisc(" + aName + ")"); };
	
	if(this.dat) {
		if(this.parent.disciplineExists(aName))
		{
			if(!this.dat.disciplines[aName]) {
				this.dat.disciplines[aName] = 1;
			}
			
			var spell_name = this.dat.text.name;
			
			if(!this.parent.dat.disciplines[aName].spells[spell_name])
				this.parent.dat.disciplines[aName].spells[spell_name] = 1;
			
			return true;
		}
		else {
			SM.log("[ERROR] SM.spellDefSVC.prototype.addDisc: Discipline does not exist");
			return false
		}
	}
	else {
		SM.log("[ERROR] SM.spellDefSVC.prototype.addDisc: No definition data");
		return false;
	}
};

SM.spellDefSVC.prototype.getDiscList = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellDefSVC.prototype.getDiscList"); };
	
	var ar = new Array();
	
	for(d in this.dat.disciplines)
		ar.push(d);
		
	return ar.sort();
};