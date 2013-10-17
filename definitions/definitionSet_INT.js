SM.definitionSetINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT"); };
	
	this.svc = aSVC;
	this.parent = undefined;
	this.name_space = SM.NameSpace + "_spell_def";
	this.content = undefined;
	
	this.popups = {};
	
	this.buttons = {};
	this.inputs = {};
	this.spell_list = undefined;
	this.disc_list = undefined;
};

SM.definitionSetINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.initialize"); };
	
	this.parent = this.svc.parent.ui;
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	this.content = document.createElement("div");
	this.content.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(this.content);
	
	this.popups["spell_edit"] = this.svc.active_spell.ui;
	this.popups["disc_edit"] = this.svc.active_disc.ui;
	
	var spell_table = document.createElement("table");
	var disc_table = document.createElement("table");
	var add_table = document.createElement("table");
	this.content.appendChild(spell_table);
	this.content.appendChild(disc_table);
	this.content.appendChild(add_table);
	
	spell_table.setAttribute("class",this.name_space + "_table");
	var spell_header = document.createElement("thead");
	var spell_footer = document.createElement("tfoot");
	var spell_body = document.createElement("tbody");
	this.spell_list = spell_body;
	spell_table.appendChild(spell_header);
	spell_table.appendChild(spell_footer);
	spell_table.appendChild(spell_body);
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Spells";
	cell.setAttribute("colspan","2");
	row.appendChild(cell);
	spell_header.appendChild(row);
	
	disc_table.setAttribute("class",this.name_space + "_table");
	var disc_header = document.createElement("thead");
	var disc_footer = document.createElement("tfoot");
	var disc_body = document.createElement("tbody");
	this.disc_list = disc_body;
	disc_table.appendChild(disc_header);
	disc_table.appendChild(disc_footer);
	disc_table.appendChild(disc_body);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Disciplines";
	cell.setAttribute("colspan","2");
	row.appendChild(cell);
	disc_header.appendChild(row);
	
	add_table.setAttribute("class",this.name_space + "_table");
	row = document.createElement("tr");
	cell = document.createElement("td");
	var input = document.createElement("input");
	input.setAttribute("type","text");
	this.inputs["add_spell"] = input;
	var btn = document.createElement("button");
	btn.SMUI = this;
	btn.innerHTML = "Add Spell";
	btn.setAttribute("onclick","this.SMUI.addSpell(); return false;");
	this.buttons["add_spell"] = btn;
	cell.appendChild(input);
	cell.appendChild(btn);
	row.appendChild(cell);
	add_table.appendChild(row);
	row = document.createElement("tr");
	cell = document.createElement("td");
	var input = document.createElement("input");
	input.setAttribute("type","text");
	this.inputs["add_disc"] = input;
	var btn = document.createElement("button");
	this.buttons["add_disc"] = btn;
	btn.SMUI = this;
	btn.innerHTML = "Add Disc";
	btn.setAttribute("onclick","this.SMUI.addDisc(); return false;");
	cell.appendChild(input);
	cell.appendChild(btn);
	row.appendChild(cell);
	add_table.appendChild(row);
	
	// Setup the child ui
	for(u in this.popups) {
		this.popups[u].initialize(this.root);
	}
};

SM.definitionSetINT.prototype.show = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.show") };
	
	this.update();
};

SM.definitionSetINT.prototype.hide = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.hide") };
	
	this.popup.style.display = "none";
};

SM.definitionSetINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.update"); };
	
	// Clean up the existing items in the list objects
	while(this.spell_list.childNodes.length > 0)
		this.spell_list.removeChild(this.spell_list.firstChild);
	
	while(this.disc_list.childNodes.length > 0)
		this.disc_list.removeChild(this.disc_list.firstChild);
		
	var spells = this.svc.getSpellList();
	for(s in spells) {
		row = document.createElement("tr");
		cell = document.createElement("td");
		cell.innerHTML = spells[s];
		row.appendChild(cell);
		cell = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "Edit...";
		btn.SMUI = this;
		btn.setAttribute("onclick","this.SMUI.editSpell(\"" + spells[s] + "\"); return false;");
		cell.appendChild(btn);
		btn = document.createElement("button");
		btn.innerHTML = "X";
		btn.setAttribute("onclick","return false;");
		cell.appendChild(btn);
		row.appendChild(cell);
		this.spell_list.appendChild(row);
	}
	
	var discs = this.svc.getDiscList();
	for(d in discs) {
		row = document.createElement("tr");
		cell = document.createElement("td");
		cell.innerHTML = discs[d];
		row.appendChild(cell);
		cell = document.createElement("td");
		var btn = document.createElement("button");
		btn.SMUI = this;
		btn.setAttribute("onclick","this.SMUI.editDisc(\"" + discs[d] + "\"); return false;");
		btn.innerHTML = "Edit...";
		cell.appendChild(btn);
		btn = document.createElement("button");
		btn.innerHTML = "X";
		btn.setAttribute("onclick","return false;");
		cell.appendChild(btn);
		row.appendChild(cell);
		this.disc_list.appendChild(row);
	}
};

SM.definitionSetINT.prototype.addSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.addSpell"); };
	
	var name = this.inputs["add_spell"].value;
	
	if(name != "") {
		this.svc.addSpell(name);
		this.update();
		this.inputs["add_spell"].value = "";
	}
};

SM.definitionSetINT.prototype.editSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.editSpell"); };
	
	this.svc.active_spell.dat = this.svc.dat.spells[aName];
	this.popups["spell_edit"].show();
};

SM.definitionSetINT.prototype.addDisc = function() {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.addDisc"); };
	
	var name = this.inputs["add_disc"].value;
	
	if(name != "") {
		this.svc.addDisc(name);
		this.update();
		this.inputs["add_disc"].value = "";
	}
};

SM.definitionSetINT.prototype.editDisc = function(aDisc) {
	if(SM.debug) { SM.log("[CALL] SM.definitionSetINT.prototype.editDisc"); };
	
	this.svc.active_disc.dat = this.svc.dat.disciplines[aDisc];
	this.popups["disc_edit"].show();
};