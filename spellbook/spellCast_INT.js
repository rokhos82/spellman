SM.spellCastINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT"); };

	this.svc = aSVC;
	
	this.parent = undefined;
	this.root = undefined;
	this.name_space = SM.NameSpace + "_cast";
	
	this.popup = undefined;
	this.content = undefined;
	this.title = undefined;
	
	this.cast_data = undefined;
	this.spell_def = undefined;
	
	this.inputs = {};
	this.buttons = {};
	this.labels = {};
};

SM.spellCastINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root) {
		SM.log("[ERROR] SM.spellCastINT.prototype.initialize: No root defined");
		return;
	}
	
	this.parent = this.svc.parent.ui;
	
	var popup = document.createElement("div");
	popup.setAttribute("class",this.name_space + "_popup");
	this.popup = popup;
	this.root.appendChild(popup);
	
	var header = document.createElement("div");
	var body = document.createElement("div");
	this.content = body;
	popup.appendChild(header);
	popup.appendChild(body);
	
	header.setAttribute("class",this.name_space + "_header");
	var title = document.createElement("span");
	title.innerHTML = "Spell Cast";
	header.appendChild(title);
	
	var close_btn = document.createElement("button");
	close_btn.innerHTML = "Close";
	close_btn.SMUI = this;
	close_btn.setAttribute("class",this.name_space + "_close_btn");
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	this.buttons["close"] = close_btn;
	header.appendChild(close_btn);
	
	body.setAttribute("class",this.name_space + "_body");
	
	var div = document.createElement("div");
	body.appendChild(div);
	this.labels["spell_name"] = document.createElement("span");
	div.appendChild(this.labels["spell_name"]);
	this.labels["spell_pwr"] = document.createElement("span");
	div.appendChild(this.labels["spell_pwr"]);
	
	div = document.createElement("div");
	body.appendChild(div);
	this.labels["disc_name"] = document.createElement("span");
	div.appendChild(this.labels["disc_name"]);
	this.labels["disc_pwr"] = document.createElement("span");
	div.appendChild(this.labels["disc_pwr"]);
	
	var label;
	var div;
	var input;
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("label");
	label.innerHTML = "EPOT";
	div.appendChild(label);
	input = document.createElement("input");
	input.value = 0;
	input.SMUI = this;
	input.setAttribute("type","text");
	input.setAttribute("onblur","this.SMUI.update(); return false;");
	this.inputs["epot"] = input;
	div.appendChild(input);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("label");
	label.innerHTML = "Targets";
	div.appendChild(label);
	input = document.createElement("input");
	input.value = 0;
	input.SMUI = this;
	input.setAttribute("type","text");
	input.setAttribute("onblur","this.SMUI.update(); return false;");
	this.inputs["targets"] = input;
	div.appendChild(input);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("label");
	label.innerHTML = "AoE";
	div.appendChild(label);
	input = document.createElement("input");
	input.value = 0;
	input.SMUI = this;
	input.setAttribute("type","text");
	input.setAttribute("onblur","this.SMUI.update(); return false;");
	this.inputs["aoe"] = input;
	div.appendChild(input);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("label");
	label.innerHTML = "Duration";
	div.appendChild(label);
	input = document.createElement("input");
	input.value = 0;
	input.SMUI = this;
	input.setAttribute("type","text");
	input.setAttribute("onblur","this.SMUI.update(); return false;");
	this.inputs["duration"] = input;
	div.appendChild(input);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("label");
	label.innerHTML = "Range";
	div.appendChild(label);
	input = document.createElement("input");
	input.value = 0;
	input.SMUI = this;
	input.setAttribute("type","text");
	input.setAttribute("onblur","this.SMUI.update(); return false;");
	this.inputs["range"] = input;
	div.appendChild(input);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("span");
	this.labels["stam"] = label;
	div.appendChild(label);
	
	div = document.createElement("div");
	body.appendChild(div);
	label = document.createElement("span");
	this.labels["tav"] = label;
	div.appendChild(label);
};

SM.spellCastINT.prototype.show = function(aCastData) {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.show"); };
	
	this.cast_data = aCastData;
	this.update();
	this.popup.style.display = "block";
};

SM.spellCastINT.prototype.hide = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.hide"); };
	
	this.popup.style.display = "none";
};

SM.spellCastINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellCastINT.prototype.update"); };
	
	if(!this.spell_def || !this.spell_def.dat.text.name == this.cast_data.spell.name)
		this.spell_def = this.svc.parent.definition_list.getSpell(this.cast_data.spell.name);
		
	var def = this.spell_def;
	
	this.labels["spell_name"].innerHTML = "Spell: " + this.cast_data.spell.name;
	this.labels["spell_pwr"].innerHTML = "Power: " + this.cast_data.spell.power;
	this.labels["disc_name"].innerHTML = "Disc: " + this.cast_data.disc.name;
	this.labels["disc_pwr"].innerHTML = "Power: " + this.cast_data.disc.power;
	
	var data = new SM.CastData();
	
	data.EPOT = parseInt(this.inputs["epot"].value);
	data.TARGETS = parseInt(this.inputs["targets"].value);
	data.POOL = this.cast_data.disc.power;
	
	this.labels["stam"].innerHTML = "Stamina: " + def.calcStamina(data);
	this.labels["tav"].innerHTML = "TAV: " + def.calcTAV(data);
};