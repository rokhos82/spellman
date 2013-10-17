var expressionParser = {};

expressionParser.expression = function() {
	this.operand = "add";
	this.left = 0;
	this.right = 0;
};

expressionParser.parse = function(expr,data) {
	var result = 0;
	
	var l = 0;
	var r = 0;
	
	// Evaluate the left side of the argument.
	if(typeof expr.left.operand != "undefined") {
		l = expressionParser.parse(expr.left,data);
	} else if(typeof expr.left == "number") {
		l = parseInt(expr.left);
	} else {
		l = parseInt(data[expr.left]);
	}
	
	// Evaluate the right side of the argument.
	if(typeof expr.right.operand != "undefined") {
		r = expressionParser.parse(expr.right,data);
	} else if(typeof expr.right == "number") {
		r = expr.right;
	} else {
		r = parseInt(data[expr.right]);
	}
	
	switch(expr.operand) {
		case "add":
			result = l + r;
			break;
		case "sub":
			result = l - r;
			break;
		case "mult":
			result = l * r;
			break;
		case "div":
			result = (r == 0) ? Math.NaN : l / r;
			break;
		case "divUp":
			result = (r == 0) ? Math.NaN : Math.ceil(l / r);
			break;
		case "divDown":
			result = (r == 0) ? Math.NaN : Math.floor(l / r);
			break;
		default: break;
	}
	
	return result;
};