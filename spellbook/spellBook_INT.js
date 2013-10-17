SM.spellBookINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT"); };
	
	this.svc = aSVC;
	this.root = undefined;
	this.parent = undefined;
	this.name_space = SM.NameSpace + "_book";
	
	this.tc = undefined;
	this.panels = {};
	
	this.subui = {};
	this.subui["spells"] = new SM.spellListINT(this,this.svc);
	this.subui["discs"] = new SM.discListINT(this,this.svc);
	this.subui["presets"] = new SM.spellPresetINT(this,this.svc);
	
	this.hash = {};
	this.hash["spells"] = {};
	
	this.buttons = {};
};

SM.spellBookINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.initialize"); };
	this.root = aRoot;
	
	if(!this.root) {
		SM.log("[ERROR] SM.spellBookINT.prototype.initialize");
		return;
	}
	
	this.parent = this.svc.parent.ui;
	
	var div = document.createElement("div");
	this.popup = div;
	this.root.appendChild(this.popup);
	
	//var tab_ctrl = new TabbedControl("spellbook",this.name_space + "_content");
	var tab_ctrl = new TabbedControl2("spellbook",this.popup);
	this.tc = tab_ctrl;
	
	// Spells list
	var spell_tab = "Spells";
	
	var spell_panel = document.createElement("div");
	spell_panel.setAttribute("class",SM.NameSpace + "_panel");
	this.panels["spells"] = spell_panel;
	
	// Disciplines lists
	var disc_tab = "Disciplines";
	
	var disc_panel = document.createElement("div");
	disc_panel.setAttribute("class",SM.NameSpace + "_panel");
	this.panels["discs"] = disc_panel;
	
	// Melded spells
	var melded_tab = "Melded";
	
	var melded_panel = document.createElement("div");
	melded_panel.setAttribute("class",SM.NameSpace + "_panel");
	
	// Preset Spells
	var preset_tab = "Presets";
	
	var preset_panel = document.createElement("div");
	preset_panel.setAttribute("class",SM.NameSpace + "_panel");
	this.panels["presets"] = preset_panel;
	
	tab_ctrl.drawControl();
	tab_ctrl.addPanel("spells",spell_panel,this.subui["spells"],spell_tab);
	tab_ctrl.addPanel("discs",disc_panel,this.subui["discs"],disc_tab);
	tab_ctrl.addPanel("presets",preset_panel,this.subui["presets"],preset_tab);
	tab_ctrl.addPanel("melded",melded_panel,this,melded_tab);
	tab_ctrl.showControl();
	tab_ctrl.activatePanel("spells");
	
	for(s in this.subui)
		this.subui[s].initialize(this.panels[s]);

	this.update();
};

SM.spellBookINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.update"); };
	
	this.tc.updateActive();
};

SM.spellBookINT.prototype.updateCast = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.updateCast"); };
};

SM.spellBookINT.prototype.addSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.addSpell"); };
	
	var index = this.lists["add_spell"].selectedIndex;
	
	if(index < 0 )
		return;
	
	this.lists["add_spell"].selectedIndex = 0;
	var name = this.lists["add_spell"].options[index].value;
	var power = parseInt(this.inputs["spell_power"].value);
	
	if(isNaN(power)) {
		alert("Spells must have a power greater than or equal to 0.");
		return;
	}
	
	this.svc.addSpell(name,power);
	this.update();
};

SM.spellBookINT.prototype.removeSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.removeSpell"); };
	
	var index = this.lists["spells"].selectedIndex;
	if(index < 0)
		return;
		
	var name = this.lists["spells"][index].value.split("-")[1];
	
	if(confirm("Do you want to delete: " + name + "?")) {
		delete this.svc.dat.spells[name];
		this.update();
	}
};

SM.spellBookINT.prototype.addDisc = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.addDisc"); };
	
	var index = this.lists["add_disc"].selectedIndex;
	
	if(index < 0)
		return;
		
	this.lists["add_disc"].selectedIndex = 0;
	var name = this.lists["add_disc"].options[index].value;
	var power = parseInt(this.inputs["disc_power"].value);
	
	if(isNaN(power) || power == 0) {
		alert("Disciplines must have a power greater than or equal to 1.");
		return;
	}
	
	this.svc.addDisc(name,power);
	this.update();
};

SM.spellBookINT.prototype.castSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellBookINT.prototype.castSpell"); };
	
	var index = this.lists["spells"].selectedIndex
	
	if(index < 0 )
		return;
	
	var dat = this.lists["spells"].options[index].value.split("-");
	var cast = new SM.CastData();
	
	cast.spell.name = dat[1];
	cast.spell.power = this.svc.dat.spells[dat[1]] + this.svc.dat.discs[dat[0]];
	cast.disc.name = dat[0];
	cast.disc.power = this.svc.dat.discs[dat[0]];
	
	this.hide();
	this.parent.popups.cast.show(cast);
};