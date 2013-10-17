SM.spellCastINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT"); };
	
	this.parent = aParent;
	this.svc = aSVC;
	this.root = undefined;
	this.content = undefined;
	this.name_space = SM.NameSpace + "_spellCast";
	
	this.lists = {};
	this.inputs = {};
	this.outputs = {};
	this.buttons = {};
	
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

SM.spellCastINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	var div = document.createElement("div");
	div.setAttribute("class",this.name_space + "_content");
	this.content = div;
	this.root.appendChild(div);
	
	var title = document.createElement("div");
	title.setAttribute("class",this.name_space + "_title");
	title.innerHTML = "Spells";
	div.appendChild(title);
	
	var spell_div = document.createElement("div");
	spell_div.setAttribute("class",this.name_space + "_div");
	div.appendChild(spell_div);
	
	var spells = document.createElement("select");
	spells.setAttribute("class",this.name_space + "_spell_list");
	spells.setAttribute("size",15);
	spells.SMUI = this;
	spells.setAttribute("onchange","this.SMUI.changeSpell(); return false;");
	this.lists["spells"] = spells;
	spell_div.appendChild(spells);
	
	var input_div = document.createElement("div");
	input_div.setAttribute("class",this.name_space + "_div");
	div.appendChild(input_div);
	
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
	div.appendChild(btn_div);
	
	var details = document.createElement("button");
	details.innerHTML = "Details...";
	btn_div.appendChild(details);
	
	var cast = document.createElement("button");
	cast.innerHTML = "Cast";
	cast.SMUI = this;
	cast.setAttribute("onclick","this.SMUI.cast(); return false;");
	btn_div.appendChild(cast);
	
	var fail = document.createElement("button");
	fail.innerHTML = "Failed";
	fail.SMUI = this;
	fail.setAttribute("onclick","this.SMUI.castFailure(); return false;");
	btn_div.appendChild(fail);
};

SM.spellCastINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.update"); };
	
	if(!this.content)
		return;
		
	while(this.lists["spells"].childNodes.length > 0)
		this.lists["spells"].removeChild(this.lists["spells"].firstChild);
	
	// Add the normal spells & disciplines
	var discs = this.svc.getDiscList();
	var spells = this.svc.getSpellList();
	var opt_grp;
	var opt;
	for(d in discs) {
		opt_grp = document.createElement("optgroup");
		opt_grp.label = d;
		for(s in spells) {
			if(this.svc.parent.definitions.isSpellInDiscipline(s,d)) {
				opt = document.createElement("option");
				opt.value = s;
				opt.innerHTML = s + " - " + (discs[d] + spells[s]);
				opt_grp.appendChild(opt);
			}
		}
		this.lists["spells"].appendChild(opt_grp);
	}
	
	// Add the presets and melded spells
	opt_grp = document.createElement("optgroup");
	opt_grp.label = "Presets";
	this.lists["spells"].appendChild(opt_grp);
	var presets = this.svc.getPresetList();
	for(p in presets) {
		opt = document.createElement("option");
		opt.preset = presets[p];
		opt.innerHTML = p + " - " + presets[p].discipline;
		opt_grp.appendChild(opt);
	}
	
	opt_grp = document.createElement("optgroup");
	opt_grp.label = "Melded";
	this.lists["spells"].appendChild(opt_grp);
	
	
	this.lists["spells"].selectedIndex = 0;
	this.changeSpell();
};

SM.spellCastINT.prototype.doSpellCalc = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.selectSpell"); };
	
	var i = this.lists["spells"].selectedIndex;
	if(i < 0)
		return;
	var spell_opt = this.lists["spells"].options[i];
	var disc = spell_opt.parentNode.label;
	var spell = spell_opt.value;
	
	var data = {};
	
	if(disc == "Presets" || disc == "Melded") {
		data = spell_opt.preset.cast_data;
		spell = spell_opt.preset.spell;
		disc = spell_opt.preset.discipline;
		
		this.inputs["epot"].value = parseInt(data["EPOT"]);
		this.inputs["targets"].value = parseInt(data["TARGETS"]);
		this.inputs["notes"].value = data["NOTE"];
		this.inputs["maintained"].checked = data["MAINTAINED"];
	}
	else {	
		var epot = parseInt(this.inputs["epot"].value);
		data["EPOT"] = (isNaN(epot)) ? 0 : epot;
		
		var targets = parseInt(this.inputs["targets"].value);
		data["TARGETS"] = (isNaN(targets)) ? 0 : targets;
	}
	
	var def = this.svc.parent.definitions.getSpell(spell);	
		
	data["POOL"] = this.svc.calcPool(disc);
	data["POWER"] = this.svc.calcSpellPower(spell,disc);
	
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

SM.spellCastINT.prototype.changeSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.changeSpell"); };
	
	for(i in this.inputs) {
		this.inputs[i].value = 1;
		if(this.inputs[i].checked)
			this.inputs[i].checked = false;
		if(i == "notes")
			this.inputs[i].value = "";
	}
		
	this.doSpellCalc();
};

SM.spellCastINT.prototype.cast = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.cast"); };
	
	var i = this.lists["spells"].selectedIndex;
	if(i < 0)
		return;
	
	var spell_opt = this.lists["spells"].options[i];
	var disc = spell_opt.parentNode.label;
	var spell = spell_opt.value;
	
	var data = {};
	if(disc == "Presets" || disc == "Melded") {
		disc = spell_opt.preset.discipline;
		spell = spell_opt.preset.spell;
		data = spell_opt.preset.cast_data;
	}
	
	var strain = parseInt(this.outputs["stamina"].value);
	var drain = parseInt(this.outputs["drain"].value);
	var note = this.inputs["notes"].value;
	var maintained = this.inputs["maintained"].checked;
	var duration = parseInt(this.outputs["duration"].value);
	var surge = parseInt(this.outputs["surge"].value);
	var surge_dur = parseInt(this.outputs["surge_dur"].value);
	
	data["EPOT"] = parseInt(this.inputs["epot"].value);
	data["TARGETS"] = parseInt(this.inputs["targets"].value);
	data["AOE"] = parseInt(this.inputs["aoe"].value);
	data["POWER"] = this.svc.calcSpellPower(spell,disc);
	data["STAMINA"] = strain;
	data["DRAIN"] = drain;
	data["DURATION"] = duration;
	data["SURGE"] = surge;
	data["SURGE_DUR"] = surge_dur;
	data["MAINTAINED"] = maintained;
	data["NOTE"] = note;
	
	if(maintained && note == "") {
		alert("Please enter a note for maintained spell.");
		return;
	}
	
	this.svc.cast(spell,disc,strain,drain,note,maintained,duration,surge,surge_dur,data);
};

SM.spellCastINT.prototype.castFailure = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.castFailure"); };
	
	var i = this.lists["spells"].selectedIndex;
	if(i < 0)
		return;
	
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
	data["POWER"] = this.svc.calcSpellPower(spell,disc);
	data["STAMINA"] = strain;
	data["DRAIN"] = drain;
	data["DURATION"] = duration;
	data["SURGE"] = surge;
	data["SURGE_DUR"] = surge_dur;
	data["MAINTAINED"] = maintained;
	data["FAILED"] = 1;
	data["NOTE"] = note;
	
	this.svc.castFailure(spell,disc,data);
};