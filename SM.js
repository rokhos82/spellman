SM = {};

SM.debug = true;
SM.debugging = {};
SM.debugging.trace = new Array();
SM.debugging.root = undefined;
SM.debugging.calls = 0;

SM.log = function(aEntry) {
	this.debugging.calls++;
	this.debugging.root.innerHTML = this.debugging.calls + ": " + aEntry + "<br/>" + this.debugging.root.innerHTML;
	//SM.debugging.trace.push(aEntry);
};

SM.NameSpace = "SM";

SM.formulas = {};
SM.formulas["add"] = function(a,b) { return a + b; };
SM.formulas["+"] = function(a,b) { return a + b; };
SM.formulas["sub"] = function(a,b) { return a - b; };
SM.formulas["-"] = function(a,b) { return a - b; };
SM.formulas["mul"] = function(a,b) { return a * b; };
SM.formulas["*"] = function(a,b) { return a * b; };
SM.formulas["div"] = function(a,b) { return a / b; };
SM.formulas["/"] = function(a,b) { return a / b; };
SM.formulas["per"] = function(a,b) { return Math.round(a/b); };

SM.overlay = undefined;
SM.doOverlay = function() {
	SM.overlay.style.display = "block";
};

SM.removeOverlay = function() {
	SM.overlay.style.display = "none";
};

SM.CastData = function() {
	this.spell = {};
	this.spell.name = "";
	this.spell.power = 0;
	this.disc = {};
	this.disc.name = "";
	this.disc.power = 0;
	this.POOL = 0;
	this.EPOT = 0;
	this.TARGETS = 0;
	this.AOE = 0;
	this.DURATION = 0;
	this.RANGE = 0;
};

SM.expand = function(stack,wind,dat) {
	while(stack.length > 0) {
		var op = stack.pop();
		if(op.sort) {
			wind.push(SM.calculate(op,dat));
		}
		else if(typeof(op) == "string") {
			if(SM.formulas[op]) {
				wind.push(op);
			}
			else {
				wind.push(dat[op]);
			}
		}
		else if(typeof(op) == "number") {
			wind.push(op);
		}
		else {
			SM.log("[ERROR] SM.calculate: Operand not a valid type");
			return;
		}
	}
};

SM.calculate = function(stack,dat) {
	var wind = new Array();
	if(!stack) { return 0; };
	stack = stack.slice();
	SM.expand(stack,wind,dat);
	
	var res;
	while(wind.length > 0) {
		var op = wind.pop();
		if(typeof(op) == "string") {
			if(SM.formulas[op]) {
				var b = wind.pop();
				res = SM.formulas[op](res,b);
			}
			else {
				if(dat[op])
					res = dat[op];
				else
					res = 0;
			}
		}
		else if(typeof(op) == "number") {
			res = op;
		}
	}

	return res;
};

SM.parse = function(str) {
	var s = new String(str);
	
	var parts = new Array();
	
	// Capture the part of the string before the first (
	var i = s.indexOf("(");
	if(i > 0)
		parts = parts.concat(s.substring(0,i-1).split(' '));
	
	// Trim the front off
	s = s.substring(i);
	
	while(s.indexOf("(") >= 0) {
		var i = s.indexOf("("); // Get the first (
		var j = i;
		var l = 0;
		
		if(i > 0) {
			parts = parts.concat(s.substring(0,i-1).split(' '));
			s = s.substring(i);
			continue;
		}
		
		for(var x = i + 1;x < str.length;x++) {
			if(s[x] == "(")
				l++;
			else if(s[x] == ")") {
				if(l == 0) {
					j = x;
					break;
				}
				else
					l--;
			}
		}

		if(l != 0) {
			// We have an error.  Parentheses are not balanced.
			alert("Depth not 0");
			return;
		}
		
		if(i < j) {
			var sub = s.substring(i+1,j);
			s = s.substring(j+1);
			
			parts.push(SM.parse(sub));
		}
		else {
			// We have an error.  Parentheses are not balanced.
			return;
		}
	}
	
	// Is there any of the string left?
	if(s.length > 0) {
		if(parts.length > 0)
			parts.push(s.split(' '));
		else
			parts = s.split(' ');
	}//*/
	
	for(i in parts) {
		if(parts[i] == "")
			parts.splice(i,1);
	}
	
	for(i in parts) {
		if(!isNaN(parseInt(parts[i]),10) && !parts[i].sort)
			parts[i] = parseInt(parts[i],10);
	}
	
	return parts;//*/
};

SM.stringify = function(ar) {
	var str = "";

	for(i in ar) {
		if(isArray(ar[i])) {
			str += " (" + SM.stringify(ar[i]) + ")";
		}
		else if(isString(ar[i])) {
			str += " " + ar[i];
		}
		else {
			str += " " + ar[i].toString();
		}
	}
	
	return str.replace(/^\s+|\s+$/g,'');
};