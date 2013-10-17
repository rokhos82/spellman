SM.activityINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.activityINT"); };
	
	this.name_space = SM.NameSpace + "_activity";
	this.root = undefined;
	this.svc = aSVC;
};

SM.activityINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.activityINT.prototype.initialize"); };
};