SM.activityDAT = function() {
	if(SM.debug) { SM.log("[CALL] SM.activityDAT"); };

	this.active_spells = {};
	this.cast_log = new SM.castLogDAT();
};