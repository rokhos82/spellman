ruleControl = function(aContainer,aName) {
	this.rules = {"Test":"Test Rule","Test2":"Another Test Rule"};
	this.container = aContainer;
	this.name = aName;
	ruleControl.ruleSets[aName] = this;
};

ruleControl.ruleSets = {};
ruleControl.CSSName = "RC";

ruleControl.prototype.addRule = function(aElementBefore) {
	var name = prompt();
	
	if(name) {
		this.rules[name] = name;
		
		var rule_box = document.createElement("div");
		var text = document.createElement("span");
		var add = document.createElement("button");
		var del = document.createElement("button");
		
		rule_box.setAttribute("class",ruleControl.CSSName + "_rule");
		
		rule_box.appendChild(text);
		rule_box.appendChild(add);
		rule_box.appendChild(del);
		
		add.setAttribute("onclick","ruleControl.ruleSets['" + name + "'].addRule(); return false;");
		add.innerHTML = "+";
		
		del.setAttribute("onclick","ruleControl.ruleSets['" + name + "'].delRule(); return false;");
		del.innerHTML = "-";
		
		text.setAttribute("contenteditable","true");
		text.innerHTML = name;
		
		this.container.childNodes[0].insertBefore(rule_box,document.getElementById(aElementBefore));
	}
};

ruleControl.prototype.delRule = function(aName,aElement) {
};

ruleControl.prototype.getRules = function() {
	var values = new Array();
	var i = 0;
	
	forEach(this.rules,function(val,key) {
		values[i] = val;
	});
	
	return values;
};

ruleControl.prototype.drawRules = function() {
	var box = document.createElement("div");
	box.setAttribute("class",ruleControl.CSSName + "_box");
	var name = this.name;
	
	forEach(this.rules,function(val,key) {
		var rule_box = document.createElement("div");
		var text = document.createElement("span");
		var add = document.createElement("button");
		var del = document.createElement("button");
		var id = "rule_" + name.replace(" ","_") + "_" + val.replace(" ","_");
		
		rule_box.setAttribute("class",ruleControl.CSSName + "_rule");
		rule_box.setAttribute("id",id);
		
		rule_box.appendChild(text);
		rule_box.appendChild(add);
		rule_box.appendChild(del);
		
		add.setAttribute("onclick","ruleControl.ruleSets['" + name + "'].addRule('" + id + "'); return false;");
		add.innerHTML = "+";
		
		del.setAttribute("onclick","ruleControl.ruleSets['" + name + "'].delRule(''); return false;");
		del.innerHTML = "-";
		
		text.setAttribute("contenteditable","true");
		text.innerHTML = val;
		
		box.appendChild(rule_box);
	});
	
	this.container.appendChild(box);
};