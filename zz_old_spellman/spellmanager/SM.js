var SM = {};

SM.debug = true;
SM.debugging = {};
SM.debugging.traceBox = undefined;
SM.debugging.debugBox = undefined;
SM.debugging.trace = "";

SM.log = function(entry) {
	this.debugging.trace = entry + this.debugging.trace;
	if(this.debug) { this.printLog(); };
};

SM.printLog = function() {
	this.debugging.traceBox.innerHTML = this.debugging.trace.replace(/\n/g,"<br />");
	if(this.admin && this.admin.admSvc.activeSpell) {
		this.debugging.debugBox.innerHTML = JSON.stringify(this.admin.admSvc.activeSpell);
	}
	else {
		this.debugging.debugBox.innerHTML = "";
	}
};

SM.CSSName = "SM";
SM.manager = undefined;
SM.formname = "SMInterface";

SM.createOverlay = function(aDispId) {
	if(!document.getElementById(SM.CSSName + "_overlay") && document.getElementById(aDispId)) {
		var overlay = document.createElement("div");
		overlay.setAttribute("id",SM.CSSName + "_overlay");
		overlay.setAttribute("class",SM.CSSName + "_overlay");
		document.getElementById(aDispId).appendChild(overlay);
	}
};

SM.removeOverlay = function(aDispId) {
	if(document.getElementById(this.CSSName + "_overlay") && document.getElementById(aDispId)) {
		var overlay = document.getElementById(this.CSSName + "_overlay");
		document.getElementById(aDispId).removeChild(overlay);
	}
}