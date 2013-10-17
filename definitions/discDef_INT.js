SM.discDefINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT"); };
	
	this.svc = aSVC;
	this.parent = undefined;
	this.root = undefined;
	this.name_space = SM.NameSpace + "_disc_edit";
	
	this.tc = undefined;
	this.title = undefined;
	
	this.inputs = {};
	this.inputs_hash = {};
	this.inputs_hash["name"] = "Name";
	this.lists = {};
	
	this.buttons = {};
};

SM.discDefINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root) {
		SM.log("[ERROR] SM.discDefINT.prototype.initialize: No root set");
		return;
	}
	
	this.parent = this.svc.parent.ui;
	
	var content = document.createElement("div");
	content.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(content);
	this.popup = content;
	
	var header = document.createElement("div");
	var body = document.createElement("div");
	header.setAttribute("class",this.name_space + "_header");
	body.setAttribute("class",this.name_space + "_body");
	body.setAttribute("id",this.name_space + "_body");
	content.appendChild(header);
	content.appendChild(body);
	
	var title = document.createElement("span");
	title.innerHTML = "Discipline Definition Edit";
	this.title = title;
	header.appendChild(title);
	
	var close_btn = document.createElement("button");
	close_btn.innerHTML = "Close";
	close_btn.SMUI = this;
	close_btn.setAttribute("class",this.name_space + "_close_btn");
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	header.appendChild(close_btn);
	this.buttons["close"] = close_btn;
	
	var label;
	
	for(n in this.inputs_hash) {
		var name = this.inputs_hash[n];
		var div = document.createElement("div");
		label = document.createElement("label");
		label.innerHTML  = name;
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.svc.dat." + n + " = this.value; return false;");
		div.appendChild(label);
		div.appendChild(input);
		body.appendChild(div);
		this.inputs[n] = input;
	}
	
	var add_spell = document.createElement("select");
	this.lists["add_spell"] = add_spell;
	body.appendChild(add_spell);
	
	var add_btn = document.createElement("button");
	add_btn.innerHTML = "Add Spell";
	add_btn.SMUI = this;
	add_btn.setAttribute("onclick","this.SMUI.addSpell(); return false;");
	this.buttons["add_spell"] = add_btn;
	body.appendChild(add_btn);
	
	var list = document.createElement("select");
	this.lists["spells"] = list;
	list.setAttribute("class",this.name_space + "_spell_list");
	list.setAttribute("size",20);
	body.appendChild(list);
	
	var del_btn = document.createElement("button");
	del_btn.innerHTML = "Delete Spell";
	del_btn.SMUI = this;
	del_btn.setAttribute("onclick","this.SMUI.removeSpell(); return false;");
	this.buttons["del_spell"] = del_btn;
	body.appendChild(del_btn);
};

SM.discDefINT.prototype.show = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.show"); };
	
	SM.doOverlay();
	this.update();
	this.popup.style.display = "block";
};

SM.discDefINT.prototype.hide = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.hide"); };
	
	this.popup.style.display = "none";
	SM.removeOverlay();
};

SM.discDefINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.update"); };
	
	this.title.innerHTML = "Discipline Definition Edit: " + this.svc.dat.name;
	
	for(n in this.svc.dat) {
		if(this.inputs_hash[n])
			this.inputs[n].value = this.svc.dat[n];
	}
	
	while(this.lists["spells"].childNodes.length > 0)
		this.lists["spells"].removeChild(this.lists["spells"].firstChild);
	
	var names = this.svc.getSpellList();
	for(n in names) {
		var option = document.createElement("option");
		option.setAttribute("value",names[n]);
		option.innerHTML = names[n];
		this.lists["spells"].appendChild(option);
	}
	
	while(this.lists["add_spell"].childNodes.length > 0)
		this.lists["add_spell"].removeChild(this.lists["add_spell"].firstChild);
	
	var spells = this.svc.parent.getSpellList();
	for(s in spells) {
		var option = document.createElement("option");
		option.value = spells[s];
		option.innerHTML = spells[s];
		this.lists["add_spell"].appendChild(option);
	}
};

SM.discDefINT.prototype.addSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.addSpell"); };
	
	var i = this.lists["add_spell"].selectedIndex;
	var name = this.lists["add_spell"].options[i].value;
	
	this.svc.addSpell(name);
	this.update();
};

SM.discDefINT.prototype.removeSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.discDefINT.prototype.removeSpell"); };
	
	if(this.lists["spells"].selectedIndex >= 0) {
		var name = this.lists["spells"].options[this.lists["spells"].selectedIndex].value;
		this.svc.removeSpell(name);
		this.update();
	}
};