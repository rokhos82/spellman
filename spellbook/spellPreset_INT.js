SM.spellPresetINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT"); };
	
	this.parent = aParent;
	this.svc = aSVC;
	this.root = undefined;
	this.content = undefined;
	this.name_space = SM.NameSpace + "_spellPreset";
	
	this.lists = {};
	this.inputs = {};
	this.outputs = {};
	this.buttons = {};
	this.tables = {};
	
	this.input_hash = {
		"EPOT":"epot",
		"Targets":"targets",
		"AoE":"aoe"
	};
	
	this.output_hash = {
		"Stamina":"stamina",
		"TAV":"tav",
		"Drain":"drain",
		"Surge":"surge",
		"Surge Duration":"surge_dur",
		"Range":"range",
		"Duration":"duration",
	};
};

SM.spellPresetINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	var spell_div = document.createElement("div");
	spell_div.setAttribute("class",this.name_space + "_div");
	this.root.appendChild(spell_div);
	
	var spells = document.createElement("select");
	spells.setAttribute("class",this.name_space + "_spell_list");
	spells.setAttribute("size",15);
	spells.SMUI = this;
	spells.setAttribute("onchange","this.SMUI.changeSpell(); return false;");
	this.lists["spells"] = spells;
	spell_div.appendChild(spells);
	
	var input_div = document.createElement("div");
	input_div.setAttribute("class",this.name_space + "_div");
	this.root.appendChild(input_div);
	
	var table = document.createElement("div");
	table.setAttribute("class",this.name_space + "_table");
	input_div.appendChild(table);
	for(i in this.input_hash) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.innerHTML = i;
		row.appendChild(cell);
		cell = document.createElement("td");
		var input = document.createElement("input");
		input.setAttribute("type","text");
		input.SMUI = this;
		input.setAttribute("onblur","this.SMUI.doSpellCalc(); return false;");
		this.inputs[this.input_hash[i]] = input;
		cell.appendChild(input);
		row.appendChild(cell);
		table.appendChild(row);
	}
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	cell.innerHTML = "Notes";
	row.appendChild(cell);
	cell = document.createElement("td");
	var input = document.createElement("input");
	input.setAttribute("type","text");
	this.inputs["notes"] = input;
	cell.appendChild(input);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Maintained";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.setAttribute("class",this.name_space + "_checkbox_cell");
	var input = document.createElement("input");
	input.setAttribute("type","checkbox");
	this.inputs["maintained"] = input;
	cell.appendChild(input);
	row.appendChild(cell);
	table.appendChild(row);
	
	var table = document.createElement("tr");
	table.setAttribute("class",this.name_space + "_table");
	input_div.appendChild(table);
	for(o in this.output_hash) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.innerHTML = o;
		row.appendChild(cell);
		cell = document.createElement("td");
		var output = document.createElement("input");
		output.setAttribute("type","text");
		output.setAttribute("readonly","readonly");
		this.outputs[this.output_hash[o]] = output;
		cell.appendChild(output);
		row.appendChild(cell);
		table.appendChild(row);
	}
	
	var btn_div = document.createElement("div");
	this.root.appendChild(btn_div);
	
	var save = document.createElement("button");
	save.innerHTML = "Save...";
	save.SMUI = this;
	save.setAttribute("onclick","this.SMUI.save(); return false;");
	btn_div.appendChild(save);
	
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_preset_table");
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	this.root.appendChild(table);
	this.tables["presets"] = body;
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Title";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Spell";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Discipline";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "EPOT";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Targets";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "AoE";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Notes";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Maintained?";
	row.appendChild(cell);
	cell = document.createElement("td");
	row.appendChild(cell);
	
	header.appendChild(row);
};

SM.spellPresetINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT.prototype.update"); };
	
	if(!this.root) {
		SM.log("[ERROR] SM.spellPresetINT.prototype.update: Content Not Valid");
		return;
	}
		
	while(this.lists["spells"].childNodes.length > 0)
		this.lists["spells"].removeChild(this.lists["spells"].firstChild);
	
	var discs = this.svc.getDiscList();
	var spells = this.svc.getSpellList();
	var opt_grp;
	var opt;
	for(d in discs) {
		opt_grp = document.createElement("optgroup");
		opt_grp.label = d;
		for(s in spells) {
			if(this.svc.parent.parent.definitions.isSpellInDiscipline(s,d)) {
				opt = document.createElement("option");
				opt.value = s;
				opt.innerHTML = s + " - " + (discs[d] + spells[s]);
				opt_grp.appendChild(opt);
			}
		}
		this.lists["spells"].appendChild(opt_grp);
	}
	
	this.lists["spells"].selectedIndex = 0;
	this.changeSpell();
	
	while(this.tables["presets"].childNodes.length > 0)
		this.tables["presets"].removeChild(this.tables["presets"].firstChild);
	
	var presets = this.svc.getPresetList();
	var row;
	var cell;
	for(p in presets) {
		var pre = presets[p];
		row = document.createElement("tr");
		cell = document.createElement("td");
		cell.innerHTML = p;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.spell;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.discipline;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.cast_data["EPOT"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.cast_data["TARGETS"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.cast_data["AOE"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.cast_data["NOTE"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = pre.cast_data["MAINTAINED"];
		row.appendChild(cell);
		this.tables["presets"].appendChild(row);
	}
};

SM.spellPresetINT.prototype.doSpellCalc = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT.prototype.selectSpell"); };
	
	var i = this.lists["spells"].selectedIndex;
	if(i < 0)
		return;
	var spell_opt = this.lists["spells"].options[i];
	var disc = spell_opt.parentNode.label;
	var spell = spell_opt.value;
	
	var def = this.svc.parent.parent.definitions.getSpell(spell);	
	var data = {};
	
	var epot = parseInt(this.inputs["epot"].value);
	data["EPOT"] = (isNaN(epot)) ? 0 : epot;
	
	var targets = parseInt(this.inputs["targets"].value);
	data["TARGETS"] = (isNaN(targets)) ? 0 : targets;
	
	data["POOL"] = this.svc.parent.calcPool(disc);
	data["POWER"] = this.svc.parent.calcSpellPower(spell,disc);
	
	this.outputs["tav"].value = def.calcTAV(data);
	var stam = parseInt(def.calcStamina(data));
	this.outputs["stamina"].value = stam;
	data["STAMINA"] = stam;
	this.outputs["drain"].value = def.calcDrain(data);
	this.outputs["duration"].value = def.calcDuration(data);
	this.outputs["range"].value = def.calcRange(data);
	this.outputs["surge"].value = def.calcSurge(data);
	this.outputs["surge_dur"].value = def.calcSurgeDuration(data);
};

SM.spellPresetINT.prototype.changeSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT.prototype.changeSpell"); };
	
	for(i in this.inputs) {
		this.inputs[i].value = 1;
		if(this.inputs[i].checked)
			this.inputs[i].checked = false;
		if(i == "notes")
			this.inputs[i].value = "";
	}
		
	this.doSpellCalc();
};

SM.spellPresetINT.prototype.save = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellPresetINT.prototype.save"); };
	
	var i = this.lists["spells"].selectedIndex;
	if(i < 0)
		return;
		
	if(!confirm("Save this preset?"))
		return;
		
	var name = prompt("Enter a name for this preset:");
	
	var spell_opt = this.lists["spells"].options[i];
	var disc = spell_opt.parentNode.label;
	var spell = spell_opt.value;
	
	var strain = parseInt(this.outputs["stamina"].value);
	var drain = parseInt(this.outputs["drain"].value);
	var note = this.inputs["notes"].value;
	var maintained = this.inputs["maintained"].checked;
	var duration = parseInt(this.outputs["duration"].value);
	var surge = parseInt(this.outputs["surge"].value);
	var surge_dur = parseInt(this.outputs["surge_dur"].value);
	
	var data = {};
	data["EPOT"] = parseInt(this.inputs["epot"].value);
	data["TARGETS"] = parseInt(this.inputs["targets"].value);
	data["AOE"] = parseInt(this.inputs["aoe"].value);
	data["MAINTAINED"] = maintained;
	data["NOTE"] = note;
	
	if(maintained && note == "") {
		alert("Please enter a note for maintained spell.");
		return;
	}
	
	this.svc.savePreset(name,spell,disc,data);
	this.update();
};