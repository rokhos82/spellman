SM.energyPoolSVC = function(aParent,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.energyPoolSVC"); };
	
	this.parent = aParent;
	this.dat = aDAT;
	this.ui = new SM.energyPoolINT(this);
};