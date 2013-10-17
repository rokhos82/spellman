SM = {};

SM.debug = true;
SM.debugging = {};
SM.debugging.root = undefined;
SM.debugging.calls = 0;

SM.log = function(aEntry) {
	this.debugging.calls++;
	this.debugging.root.innerHTML = this.debugging.calls + ": " + aEntry + "<br/>" + this.debugging.root.innerHTML;
};

SM.NameSpace = "SM";

SM.module_dat = function() {
	this.name = "";
	this.type = undefined;
};

SM.module_svc = function() {
	this.name = "";
	this.type = undefined;
};

SM.module_int = function() {
	this.name = "";
	this.type = undefined;
};