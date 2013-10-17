SM.charEditINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT"); };
	
	this.parent = aParent;
	this.svc = aSVC;
	this.name_space = SM.NameSpace + "_charEdit";
	this.root = undefined;
	this.content = undefined;
	this.overlay = undefined;
	
	this.buttons = {};
	this.inputs = {
		attributes:{},
		stats:{}
	};
	this.inputs_hash = {
		attributes:{"Sprit":"spirit","Willpower":"willpower"},
		stats:{"Max Stamina":"max_stam","Stamina":"stamina"}
	};
};

SM.charEditINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	var div = document.createElement("div");
	div.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(div);
	this.content = div;
	
	var header = document.createElement("div");
	var body = document.createElement("div");
	header.setAttribute("class",this.name_space + "_block");
	body.setAttribute("class",this.name_space + "_block");
	this.content.appendChild(header);
	this.content.appendChild(body);
	
	var title = document.createElement("span");
	title.innerHTML = "Character Editor";
	title.setAttribute("class",this.name_space + "_title");
	header.appendChild(title);
	
	var close_btn = document.createElement("button");
	close_btn.innerHTML = "Close";
	close_btn.SMUI = this;
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	close_btn.setAttribute("class",this.name_space + "_close_btn");
	header.appendChild(close_btn);
	
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_table");
	body.appendChild(table);
	
	for(i in this.inputs_hash.attributes) {
		var name = this.inputs_hash.attributes[i];
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML = i;
		tr.appendChild(td);
		td = document.createElement("td");
		var input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.updateAttribute(\"" + name + "\"); return false;");
		input.value = this.svc.dat.attribute_set.attributes[name];
		this.inputs.attributes[name] = input;
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	}
	
	for(i in this.inputs_hash.stats) {
		var name = this.inputs_hash.stats[i];
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML = i;
		tr.appendChild(td);
		td = document.createElement("td");
		var input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.updateStat(\"" + name + "\"); return false;");
		input.value = this.svc.dat.attribute_set.stats[name];
		this.inputs.stats[name] = input;
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);
	}
};

SM.charEditINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.update"); };
	
	if(!this.content)
		return;
	
	for(s in this.inputs_hash) {
		for(i in this.inputs_hash[s]) {
			var name = this.inputs_hash[s][i];
			this.inputs[s][name].value = this.svc.dat.attribute_set[s][name];
		}
	}
};

SM.charEditINT.prototype.show = function() {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.show"); };
	
	this.update();
	SM.doOverlay();
	this.content.style.display = "block";
};

SM.charEditINT.prototype.hide = function() {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.hide"); };
	
	this.content.style.display = "none";
	SM.removeOverlay();
	this.parent.update();
};

SM.charEditINT.prototype.updateStat = function(aStat) {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.updateStat"); };
	
	var data = this.inputs.stats[aStat].value;
	this.svc.dat.attribute_set.stats[aStat] = data;
};

SM.charEditINT.prototype.updateAttribute = function(aAttr) {
	if(SM.debug) { SM.log("[CALL] SM.charEditINT.prototype.updateAttribute"); };
	
	var data = this.inputs.attributes[aAttr].value;
	this.svc.dat.attribute_set.attributes[aAttr] = data;
};