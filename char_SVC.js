SM.characterSVC = function(aParent,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC"); };
	this.parent = aParent;
	this.dat = aDAT;
	
	this.children = {};
	this.children["spell_book"] = new SM.spellBookSVC(this);
	
	this.ui = new SM.characterINT(this,this.parent.ui);
};

SM.characterSVC.prototype.loadFromLocalStorage = function(aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.loadFromLocalStorage"); };
	
	this.dat = aDAT;
	
	for(u in this.children) {
		if(this.children[u].loadFromLocalStorage)
			this.children[u].loadFromLocalStorage(this.dat[u]);
	}
};

SM.characterSVC.prototype.getSpellList = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.getSpellList"); };
	
	return this.children["spell_book"].getSpellList();
};

SM.characterSVC.prototype.getDiscList = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.getDiscList"); };
	
	return this.children["spell_book"].getDiscList();
};

SM.characterSVC.prototype.getPresetList = function() {
	if(SM.debug) { SM.log("[CALL] Sm.characterSVC.prototype.getPresetList"); };
	
	return this.children["spell_book"].getPresetList();
}

SM.characterSVC.prototype.addActiveSpell = function(aName,aDisc,aDrain) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.addActiveSpell"); };
	
	if(!this.dat.active_spells[aDisc])
		this.dat.active_spells[aDisc] = new Array();
		
	this.dat.active_spells[aDisc].push({"name":aName,"drain":aDrain});
};

SM.characterSVC.prototype.getActiveSpells = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.getActiveSpells"); };
	
	return this.dat.active_spells;
};

SM.characterSVC.prototype.getDiscDrain = function(aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.getDiscDrain(" + aDisc + ")"); };
	
	if(!this.dat.active_spells[aDisc])
		return 0;
	else {
		var a = this.dat.active_spells[aDisc].slice();
		var d = 0;
		for(i in a) {
			d += parseInt(a[i].drain);
		}
		return d;
	}
};

SM.characterSVC.prototype.calcPool = function(aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.calcPool"); };
	
	var max_pool = this.children["spell_book"].dat.discs[aDisc];
	
	var pool = max_pool - this.getDiscDrain(aDisc);
	if(pool < 0)
		pool = 0;
	
	return pool;
};

SM.characterSVC.prototype.cast = function(aSpell,aDisc,aStam,aDrain,aNote,aMaintain,aDuration,aSurge,aSurgeDUR,aCastDAT) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.cast"); };
	
	if(aMaintain) {
		var overflow = aDrain - this.calcPool(aDisc);
		if(overflow < 0)
			overflow = 0;
		var spell = new SM.activeSpellsDAT(aSpell,aDisc,aDrain,overflow,aDuration,aSurge,aSurgeDUR,aNote);
		if(!this.dat.active_spells[aDisc])
			this.dat.active_spells[aDisc] = new Array();
		this.dat.active_spells[aDisc].push(spell);
	}
	
	this.dat.attribute_set.stats.stamina -= aStam;
	
	var entry = new SM.castLogDAT(aSpell,aDisc,aCastDAT);
	this.dat.cast_log.push(entry);
	
	
	this.ui.update();
};

SM.characterSVC.prototype.castFailure = function(aSpell,aDisc,aCastDAT) {
	if(SM.debug) {SM.log("[CALL] SM.characterSVC.prototype.castFailure"); };
	
	this.dat.attribute_set.stats.stamina -= 1;
	
	var entry = new SM.castLogDAT(aSpell,aDisc,aCastDAT);
	this.dat.cast_log.push(entry);
	
	this.ui.subui["attributes"].update();
	this.ui.subui["cast_log"].update();
};

SM.characterSVC.prototype.calcSpellPower = function(aSpell,aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.calcSpellPower"); };
	
	return this.children["spell_book"].calcSpellPower(aSpell,aDisc);
};

SM.characterSVC.prototype.cancelActiveSpell = function(aDisc,aIndex) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.cancelActiveSpell"); };
	
	this.dat.active_spells[aDisc].splice(aIndex,1);
	this.ui.update();
};

SM.characterSVC.prototype.resetActiveSpells = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.resetActiveSpells"); };
	
	for(d in this.dat.active_spells) {
		this.dat.active_spells = new Array();
	}
	
	this.ui.update();
};

SM.characterSVC.prototype.spellMaintanence = function() {
	if(SM.debug) { SM.log("[CALL]SM.characterSVC.prototype.spellMaintanence"); };
	
	var active = this.getActiveSpells();
	var maint = 0;
	for(a in active) {
		var spells = active[a];
		for(s in spells) {
			var def = this.parent.definitions.getSpell(spells[s].name);
			
			maint += parseInt(spells[s].overflow);
			
			spells[s].next_surge--;
			if(spells[s].next_surge <= 0) {
				spells[s].next_surge = spells[s].surge_dur;
				maint += parseInt(spells[s].surge);
			}
			
			if(!def.dat.special.surge_limited) {
				spells[s].duration--;
				if(spells[s].duration <= 0)
					this.cancelActiveSpell(a,s);
			}
		}
	}
	
	this.dat.attribute_set.stats.stamina -= maint;
	this.ui.subui["energy_pool"].update();
	this.ui.subui["active_spells"].update();
	this.ui.subui["attributes"].update();
};

SM.characterSVC.prototype.castFromLog = function(aIndex) {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.castFromLog"); };
	
	var entry = this.dat.cast_log[aIndex];
	var disc = entry.discipline;
	var name = entry.spell;
	var dat = entry.cast_dat;
	
	if(dat["MAINTAINED"]) {
		var overflow = dat["DRAIN"] - this.calcPool(disc);
		if(isNaN(overflow) || overflow < 0)
			overflow = 0;
		var spell = new SM.activeSpellsDAT(name,disc,dat["DRAIN"],overflow,dat["DURATION"],dat["SURGE"],dat["SURGE_DUR"],dat["NOTE"]);
		if(!this.dat.active_spells[disc])
			this.dat.active_spells[disc] = new Array();
		this.dat.active_spells[disc].push(spell);
	}
	
	this.dat.attribute_set.stats.stamina -= dat["STAMINA"];

	var new_dat = {};
	for(d in dat)
		new_dat[d] = dat[d];
	new_dat["FAILED"] = false;

	var entry = new SM.castLogDAT(name,disc,new_dat);
	this.dat.cast_log.push(entry);
	
	
	this.ui.subui["energy_pool"].update();
	this.ui.subui["active_spells"].update();
	this.ui.subui["attributes"].update();
	this.ui.subui["cast_log"].update();
};

SM.characterSVC.prototype.clearLog = function() {
	if(SM.debug) { SM.log("[CALL] SM.characterSVC.prototype.clearLog"); };
	
	this.dat.cast_log = new Array();
	this.ui.subui["cast_log"].update();
};