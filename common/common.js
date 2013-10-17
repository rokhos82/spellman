isArray = function(obj) {
	if(obj.constructor.toString().indexOf("Array") == -1)
		return false;
	else
		return true;
};

isString = function(obj) {
	if(obj.constructor.toString().indexOf("String") == -1)
		return false;
	else
		return true;
};

isNumber = function(obj) {
	if(obj.constructor.toString().indexOf("Number") == -1)
		return false;
	else
		return true;
};