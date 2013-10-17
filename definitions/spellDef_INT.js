SM.spellDefINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT"); };
	
	this.svc = aSVC;
	this.parent = undefined;
	this.name_space = SM.NameSpace + "_spell_edit";
	
	this.title = undefined;
	
	this.buttons = {};
	
	this.inputs_hash = {};
	this.inputs_hash.text = {};
	this.inputs_hash.text["name"] = "Name";
	this.inputs_hash.text["prereq"] = "Prereq";
	this.inputs_hash.text["components"] = "Components"
	this.inputs_hash.text["description"] = "Description";
	this.inputs_hash.text["effect"] = "Effect";
	this.inputs_hash.text["limits"] = "Limits";
	this.inputs_hash.text["special"] = "Special";
	this.inputs_hash.text["min_cost"] = "Minimum Cost";
	this.inputs_hash.text["strain"] = "Strain";
	this.inputs_hash.text["drain"] = "Drain";
	this.inputs_hash.text["surge"] = "Surge";
	this.inputs_hash.text["tav"] = "TAV";
	this.inputs_hash.text["duration"] = "Duration";
	this.inputs_hash.text["aoe"] = "AoE";
	this.inputs_hash.text["range"] = "Range";
	this.inputs_hash.text["karma"] = "Karma";
	this.inputs_hash.text["damage"] = "Damage";
	this.inputs_hash.text["staging"] = "Staging";
	this.inputs_hash.calc = {
		"min_cost":"Min Cost",
		"tav":"TAV",
		"aoe":"AoE",
		"strain":"Strain",
		"duration":"Duration",
		"drain":"Drain",
		"surge":"Surge",
		"range":"Range",
		"surge_dur":"Surge Duration"
	};
	this.inputs_hash.units = {
		"duration":"Duration",
		"range":"Range",
		"surge":"Surge",
		"aoe":"AoE"
	};
	
	this.inputs = {};
	this.inputs.text = {};
	this.inputs.calc = {};
	this.inputs.calc_hash = {};
	this.inputs.units = {};
	this.inputs.disc = {};
	
	this.tabs = undefined;
};

SM.spellDefINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.initialize"); };
	
	this.root = aRoot;
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
	title.innerHTML = "Spell Definition Editor";
	this.title = title;
	header.appendChild(title);
	
	var close_btn = document.createElement("button");
	close_btn.innerHTML = "Close";
	close_btn.SMUI = this;
	close_btn.setAttribute("class",this.name_space + "_close_btn");
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	header.appendChild(close_btn);
	this.buttons["close"] = close_btn;
	
	// Setup the body of the popup
	this.tabs = new TabbedControl2("spell",body);
	var tab_ctrl = new TabbedControl("def_edit",this.name_space + "_body");
	
	var text_tab = "Text";
	var text_panel = document.createElement("div");
	text_panel.setAttribute("class",SM.NameSpace + "_panel");
	
	var label;
	var input;
	
	for(n in this.inputs_hash.text) {
		var div = document.createElement("div");
		label = document.createElement("label");
		label.innerHTML  = this.inputs_hash.text[n];
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.svc.dat.text[\"" + n + "\"] = this.value; return false;");
		div.appendChild(label);
		div.appendChild(input);
		text_panel.appendChild(div);
		this.inputs.text[n] = input;
	}
	
	var calc_tab = "Calculation";
	var calc_panel = document.createElement("div");
	calc_panel.setAttribute("class",SM.NameSpace + "_panel");
	
	for(n in this.inputs_hash.calc) {
		var div = document.createElement("div");
		label = document.createElement("label");
		label.innerHTML  = this.inputs_hash.calc[n];
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.validateCalc(\"" + n + "\",this.value); return false;");
		div.appendChild(label);
		div.appendChild(input);
		calc_panel.appendChild(div);
		this.inputs.calc[n] = input;
		input = document.createElement("input");
		input.setAttribute("type","checkbox");
		input.name = n;
		input.SMUI = this;
		input.setAttribute("onchange","this.SMUI.toggleCalcHash(this); return false;");
		div.appendChild(input);
		this.inputs.calc_hash[n] = input;
	}
	
	var disc_tab = "Disciplines";
	var disc_panel = document.createElement("div");
	disc_panel.setAttribute("class",SM.NameSpace + "_panel");
	
	var add_disc = document.createElement("select");
	this.inputs.disc["add_disc"] = add_disc;
	disc_panel.appendChild(add_disc);
	
	var add_disc_btn = document.createElement("button");
	add_disc_btn.innerHTML = "Add Discipline";
	add_disc_btn.SMUI = this;
	add_disc_btn.setAttribute("onclick","this.SMUI.addDisc(); return false;");
	this.buttons["add_disc"] = add_disc_btn;
	disc_panel.appendChild(add_disc_btn);
	
	var list = document.createElement("select");
	list.setAttribute("class",this.name_space + "_disc_list");
	list.setAttribute("size",20);
	this.inputs.disc["disc_list"] = list;
	disc_panel.appendChild(list);
	
	var del_disc_btn = document.createElement("button");
	del_disc_btn.innerHTML = "Delete Discipline";
	del_disc_btn.SMUI = this;
	del_disc_btn.setAttribute("onclick","return false;");
	this.buttons["del_disc"] = del_disc_btn;
	disc_panel.appendChild(del_disc_btn);
	
	var unit_tab = "Units";
	var unit_panel = document.createElement("div");
	unit_panel.setAttribute("class",SM.NameSpace + "_panel");
	
	this.tabs.drawControl();
	this.tabs.addPanel("text",text_panel,this,text_tab);
	this.tabs.addPanel("calc",calc_panel,this,calc_tab);
	this.tabs.addPanel("disc",disc_panel,this,disc_tab);
	this.tabs.addPanel("unit",unit_panel,this,unit_tab);
	this.tabs.showControl();
	this.tabs.activatePanel("text");
};

SM.spellDefINT.prototype.show = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.show"); };
	
	SM.doOverlay();
	this.update();
	this.popup.style.display = "block";
};

SM.spellDefINT.prototype.hide = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.hide"); };
	
	this.popup.style.display = "none";
	SM.removeOverlay();
};

SM.spellDefINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.update"); };
	
	if(!this.svc.dat) {
		SM.log("[ERROR] SM.spellDefINT.prototype.update: No spell def data");
		return;
	}
	
	this.title.innerHTML = "Spell Definition Editor: " + this.svc.dat.text["name"];
	
	for(n in this.svc.dat.text) {
		if(this.inputs.text[n])
			this.inputs.text[n].value = this.svc.dat.text[n];
	}
	
	for(n in this.svc.dat.calc) {
		if(this.inputs.calc[n])
			this.inputs.calc[n].value = SM.stringify(this.svc.dat.calc[n]);
	}
	
	var discs = this.svc.getDiscList();
	
	while(this.inputs.disc["disc_list"].childNodes.length > 0 )
		this.inputs.disc["disc_list"].removeChild(this.inputs.disc["disc_list"].firstChild);
	
	for(n in discs) {
		var option = document.createElement("option");
		option.value = discs[n];
		option.innerHTML = discs[n];
		this.inputs.disc["disc_list"].appendChild(option);
	}
	
	var all_discs = this.svc.parent.getDiscList();
	
	while(this.inputs.disc["add_disc"].childNodes.length > 0 )
		this.inputs.disc["add_disc"].removeChild(this.inputs.disc["add_disc"].firstChild);
		
	for(n in all_discs) {
		var option = document.createElement("option");
		option.value = all_discs[n];
		option.innerHTML = all_discs[n];
		this.inputs.disc["add_disc"].appendChild(option);
	}
	
	for(n in this.svc.dat.calc_hash) {
		this.inputs.calc_hash[n].checked = this.svc.dat.calc_hash[n];
		this.inputs.calc[n].disabled = !this.svc.dat.calc_hash[n];
	}
};

SM.spellDefINT.prototype.validateCalc = function(aName,aValue) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.validateCalc(" + aName + "," + aValue + ")"); };
	
	// Parse the strings in the calculation inputs
	var parsed = SM.parse(aValue);
	this.svc.dat.calc[aName] = parsed;
};

SM.spellDefINT.prototype.addDisc = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.addDisc"); };
	
	if(this.inputs.disc["add_disc"].selectedIndex < 0)
		return;
	
	var index = this.inputs.disc["add_disc"].selectedIndex;
	var name = this.inputs.disc["add_disc"].options[index].value;
	if(this.svc.addDisc(name)) {
		this.inputs.disc["add_disc"].selectedIndex = -1;
		this.update();
	}
	else {
		alert("Could not add discipline.  Please check that the discipline exists and is spelled correctly");
	}
};

SM.spellDefINT.prototype.toggleCalcHash = function(aCheckbox) {
	if(SM.debug) { SM.log("[CALL] SM.spellDefINT.prototype.toggleCalcHash"); };
	
	var n = aCheckbox.name;
	
	this.svc.dat.calc_hash[n] = aCheckbox.checked;
	this.inputs.calc[n].disabled = !aCheckbox.checked;
};