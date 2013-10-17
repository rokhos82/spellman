SM.castLogSVC = function(aParent,aDAT) {
	if(SM.debug) { SM.log("[CALL] SM.castLogSVC"); };
	
	this.parent = aParent;
	this.dat = aDAT;
	this.ui = new SM.castLogINT(this,this.parent.ui);
};