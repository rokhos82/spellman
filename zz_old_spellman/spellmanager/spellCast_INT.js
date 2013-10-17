SM.spellCastINT = function(aRootID,aParentUI,aSpellSVC) {
	this.id = aRootID;
	this.form_id = undefined;
	this.root = document.getElementById(this.id);
	this.parent = aParentUI;
	this.svc = aSpellSVC;
};

SM.spellCastINT.prototype.draw = function() {
	if(SM.debug) { SM.log("SM.spellCastINT.prototype.draw()\n"); };
	
	if(!this.root && !this.id) {
		SM.log("ERROR (SM.spellCastINT.prototype.draw): Not HTML element to draw to\n");
		return;
	}
	
	var id = this.id;
	var header = document.createElement("div");
	header.setAttribute("id",id + "_header");
	header.setAttribute("class",id + "_header");
	
	var body = document.createElement("div");
	body.setAttribute("id",id + "_body");
	body.setAttribute("class",id + "_body");
	
	this.root.appendChild(header);
	this.root.appendChild(body);
	
	var title = document.createElement("span");
	title.setAttribute("id",id + "_title");
	title.setAttribute("class",id + "_title");
	title.innerHTML = "Spell Casting";
	header.appendChild(title);
	
	var close_btn = document.createElement("input");
	close_btn.setAttribute("id",id + "_close_btn");
	close_btn.setAttribute("class",id + "_close_btn");
	close_btn.setAttribute("type","button");
	close_btn.setAttribute("value","Close");
	close_btn.SMUI = this;
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	header.appendChild(close_btn);
	
	var spell = document.createElement("div");
	spell.setAttribute("class",id + "_spell");
	body.appendChild(spell);
	var label = document.createElement("label");
	label.innerHTML = "Spell:";
	spell.appendChild(label);
	var span = document.createElement("span");
	span.setAttribute("id",id + "_spell");
	spell.appendChild(span);
	
	var disc = document.createElement("div");
	disc.setAttribute("class",id + "_disc");
	body.appendChild(disc);
	var label = document.createElement("label");
	label.innerHTML = "Disc:";
	disc.appendChild(label);
	var span = document.createElement("span");
	span.setAttribute("id",id + "_disc");
	disc.appendChild(span);
	
	// Setup the cast data form
	var cast_form = document.createElement("form");
	var form_id = id + "_form";
	this.form_id = form_id;
	cast_form.setAttribute("id",form_id);
	cast_form.setAttribute("class",form_id);
	body.appendChild(cast_form);
	var table = document.createElement("table");
	cast_form.appendChild(table);
	
	var row;
	var cell;
	var input;
	
	row = document.createElement("tr");
	table.appendChild(row);
	cell = document.createElement("td");
	row.appendChild(cell);
	cell.innerHTML = "EPOT(s):";
	cell = document.createElement("td");
	row.appendChild(cell);
	input = document.createElement("input");
	input.setAttribute("id",form_id + "_epot");
	input.setAttribute("type","text");
	cell.appendChild(input);
	
	row = document.createElement("tr");
	table.appendChild(row);
	cell = document.createElement("td");
	row.appendChild(cell);
	cell.innerHTML = "Target(s):";
	cell = document.createElement("td");
	row.appendChild(cell);
	input = document.createElement("input");
	input.setAttribute("id",form_id + "_targets");
	input.setAttribute("type","text");
	cell.appendChild(input);
	
	row = document.createElement("tr");
	table.appendChild(row);
	cell = document.createElement("td");
	row.appendChild(cell);
	cell.innerHTML = "AoE:";
	cell = document.createElement("td");
	row.appendChild(cell);
	input = document.createElement("input");
	input.setAttribute("id",form_id + "_aoe");
	input.setAttribute("type","text");
	cell.appendChild(input);
	
	row = document.createElement("tr");
	table.appendChild(row);
	cell = document.createElement("td");
	row.appendChild(cell);
	cell.innerHTML = "Duration:";
	cell = document.createElement("td");
	row.appendChild(cell);
	input = document.createElement("input");
	input.setAttribute("id",form_id + "_dur");
	input.setAttribute("type","text");
	cell.appendChild(input);
	
	row = document.createElement("tr");
	table.appendChild(row);
	cell = document.createElement("td");
	row.appendChild(cell);
	cell.innerHTML = "Range:";
	cell = document.createElement("td");
	row.appendChild(cell);
	input = document.createElement("input");
	input.setAttribute("id",form_id + "_rng");
	input.setAttribute("type","text");
	cell.appendChild(input);
	
	var cast_btn = document.createElement("input");
	cast_btn.setAttribute("id",id + "_cast");
	cast_btn.setAttribute("class",id + "_cast");
	cast_btn.setAttribute("type","button");
	cast_btn.value = "Cast";
	cast_btn.CPUI = this;
	cast_btn.setAttribute("onclick","this.CPUI.castSpell(); return false;");
	body.appendChild(cast_btn);
	
	this.hide();
};

SM.spellCastINT.prototype.show = function() {
	if(SM.debug) { SM.log("SM.spellCastINT.prototype.show()\n"); };

	SM.createOverlay("spell_editor");
	
	if(this.root) {
		this.root.style.display = "block";
		this.update();
	}
	else {
		SM.log("ERROR (SM.spellCastINT.prototype.show): Root element not defined\n");
		return;
	}
};

SM.spellCastINT.prototype.hide = function() {
	if(SM.debug) { SM.log("SM.spellCastINT.prototype.hide()\n"); };
	
	SM.removeOverlay("spell_editor");
	
	if(this.root) {
		this.root.style.display = "none";
	}
	else {
		SM.log("ERROR (SM.spellCastINT.prototype.hide): Root element not defined\n");
		return;
	}
};

SM.spellCastINT.prototype.update = function() {
	if(SM.debug) { SM.log("SM.spellCastINT.prototype.update()\n"); };
	
	var id = this.id;
	
	var spell = document.getElementById(id + "_spell");
	var disc = document.getElementById(id + "_disc");
	if(this.svc.active_spell) {
		spell.innerHTML = this.svc.active_spell.getName();
	}
	if(this.svc.active_disc) {
		disc.innerHTML = this.svc.active_disc.getName();
	}
};

SM.spellCastINT.prototype.castSpell = function() {
	if(SM.debug) { SM.log("SM.spellCastINT.prototype.castSpell()\n"); };
	
	var cast_dat = {};
	var name = document.getElementById(this.id + "_spell").innerHTML;
	var disc = document.getElementById(this.id + "_disc").innerHTML;
	cast_dat["EPOT"] = document.getElementById(this.form_id + "_epot").value;
	cast_dat["TARGETS"] = document.getElementById(this.form_id + "_targets").value;
	cast_dat["AOE"] = document.getElementById(this.form_id + "_aoe").value;
	cast_dat["DURATION"] = document.getElementById(this.form_id + "_dur").value;
	cast_dat["RANGE"] = document.getElementById(this.form_id + "_rng").value;
	
	this.svc.castSpell(name,disc,cast_dat);
	this.hide();
};