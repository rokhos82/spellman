SM.activeSpellsDAT = function(aName,aDisc,aDrain,aOverflow,aDuration,aSurge,aSurgeDUR,aNotes) {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsDAT"); };
	
	this.name = aName;
	this.discipline = aDisc;
	this.drain = aDrain;
	this.overflow = aOverflow;
	this.duration = aDuration;
	this.surge = aSurge;
	this.surge_dur = aSurgeDUR;
	this.next_surge = aSurgeDUR;
	this.notes = aNotes;
};