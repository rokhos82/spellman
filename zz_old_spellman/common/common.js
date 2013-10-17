Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if(this[i] == obj) { return true; };
	}
	return false;
};

String.prototype.trim = function () {
    return this.replace(/^\s*/,"").replace(/\s*$/,"");
}