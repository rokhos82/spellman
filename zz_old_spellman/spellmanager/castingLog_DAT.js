SM.castingLog = function() {
	if(SM.debug) { SM.log("SM.castingLog()\n"); };
	this.entries = {};
};

SM.castingLog.entry = function() {
	if(SM.debug) { SM.log("SM.castingLog.entry()\n"); };
	this.spell_name = "";
	this.disc_name = "";
	this.strain = 0;
	this.cast_data = {};
};