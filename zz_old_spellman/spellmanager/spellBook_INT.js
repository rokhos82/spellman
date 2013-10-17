SM.spellBookINT = function(aSVC,aParent) {
	if(SM.debug) { SM.log("SM.spellBookINT()\n"); };
	
	this.svc = aSVC;
	this.id = undefined;
	this.root = undefined;
	this.parent = aParent;
	this.list = undefined;
};

SM.spellBookINT.prototype.draw = function(aId) {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.draw()\n"); };
	
	if(!aId) {
		SM.log("ERROR (SM.spellBookINT.prototype.draw): Element ID must be provided\n");
		return;
	}
	
	if(!this.disp_id) {
		this.disp_id = aId;
	}
	
	var id = this.disp_id;
	var root = document.getElementById(id);
	
	var header = document.createElement("div");
	header.setAttribute("id",id + "_header");
	header.setAttribute("class",id + "_header");
	
	var body = document.createElement("div");
	body.setAttribute("id",id + "_body");
	body.setAttribute("class",id + "_body");
	
	root.appendChild(header);
	root.appendChild(body);
	
	var title = document.createElement("span");
	title.setAttribute("id",id + "_title");
	title.setAttribute("class",id + "_title");
	title.innerHTML = "Spell Book";
	header.appendChild(title);
	
	var close_btn = document.createElement("input");
	close_btn.setAttribute("id",id + "_close_btn");
	close_btn.setAttribute("class",id + "_close_btn");
	close_btn.setAttribute("type","button");
	close_btn.setAttribute("value","Close");
	close_btn.SMUI = this;
	close_btn.setAttribute("onclick","this.SMUI.hide(); return false;");
	header.appendChild(close_btn);
	
	var tab_ctrl = new TabbedControl("spell_book",id + "_body");
	
	// Setup the spell list panel & tab
	var spell_tab = document.createElement("div");
	spell_tab.setAttribute("class",SM.CSSName + "_tab");
	spell_tab.innerHTML = "Spell List";
	
	var spell_panel = document.createElement("div");
	spell_panel.setAttribute("class",SM.CSSName + "_panel");
	
	var label = document.createElement("label");
	label.innerHTML = "Discipline:";
	spell_panel.appendChild(label);
	
	var br = document.createElement("br");
	spell_panel.appendChild(br);
	
	var list = document.createElement("select");
	list.setAttribute("id",id + "_list");
	list.setAttribute("class",id + "_list");
	list.setAttribute("size","12");
	spell_panel.appendChild(list);
	this.drawSpellList(list);
	
	var cast_btn = document.createElement("input");
	cast_btn.setAttribute("id",id + "_spell_cast");
	cast_btn.setAttribute("class",id + "_cast_btn");
	cast_btn.setAttribute("type","button");
	cast_btn.setAttribute("value","Cast Spell");
	cast_btn.SMUI = this;
	cast_btn.setAttribute("onclick","this.SMUI.castSpell(); return false;");
	spell_panel.appendChild(cast_btn);
	
	// Setup the spell presets panel & tab
	var preset_tab = document.createElement("div");
	preset_tab.setAttribute("class",SM.CSSName + "_tab");
	preset_tab.innerHTML = "Spell Presets";
	
	var preset_panel = document.createElement("div");
	preset_panel.setAttribute("class",SM.CSSName + "_panel");
	preset_panel.innerHTML = "Spell presets goes here! (NYI)";
	
	// Setup the melded panel & tab
	var melded_tab = document.createElement("div");
	melded_tab.setAttribute("class",SM.CSSName + "_tab");
	melded_tab.innerHTML = "Melded Spells";
	
	var melded_panel = document.createElement("div");
	melded_panel.setAttribute("class",SM.CSSName + "_panel");
	melded_panel.innerHTML = "Melded spell presets go here! (NYI)";
	
	// Add the panels to the tab control
	tab_ctrl.drawControl();
	tab_ctrl.addPanel("list",spell_panel,spell_tab);
	tab_ctrl.addPanel("preset",preset_panel,preset_tab);
	tab_ctrl.addPanel("melded",melded_panel,melded_tab);
	tab_ctrl.showControl();
	tab_ctrl.activatePanel("list");
};

SM.spellBookINT.prototype.drawSpellList = function(aSelectRoot) {
	var grp;
	var spell;
	var id = this.disp_id;
	var spells = this.svc.book_dat.spells_list;
	this.list = aSelectRoot;
	
	forEach(this.svc.book_dat.discs_list,function(val) {
		grp = document.createElement("optgroup");
		grp["label"] = val.name + " - Rank " + val.rank;
		grp.setAttribute("class",id + "_disc");
		aSelectRoot.appendChild(grp);
		var rank = val.rank;
		var disc = val.name;
		
		forEach(val.spells,function(val) {
			spell = document.createElement("option");
			spell["value"] = val + "," + disc;
			spell["innerHTML"] = val + " - Power " + (spells[val].rank + rank);
			spell.setAttribute("class",id + "_spell");
			spell.spell = val;
			spell.disc = disc;
			grp.appendChild(spell);
		});
	});
};

SM.spellBookINT.prototype.show = function() {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.show()\n"); };
	
	SM.createOverlay("spell_editor");
	
	var book = document.getElementById(this.disp_id);
	book.style.display = "block";
};

SM.spellBookINT.prototype.hide = function() {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.hide()\n"); };
	
	SM.removeOverlay("spell_editor");
	
	document.getElementById(this.disp_id).style.display = "none";
};

SM.spellBookINT.prototype.update = function() {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.update()\n"); };
	
	var list = document.getElementById(this.disp_id + "_list");
	this.drawSpellList(list);
};

SM.spellBookINT.prototype.addSpell = function(aName) {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.addSpell(" + aName + ")\n") };
};

SM.spellBookINT.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.removeSpell(" + aName + ")\n"); };
};

SM.spellBookINT.prototype.castSpell = function() {
	if(SM.debug) { SM.log("SM.spellBookINT.prototype.castSpell()\n"); };
	
	if(this.list.selectedIndex >= 0) {
		this.hide();
		this.svc.setActiveSpell(this.list.options[this.list.selectedIndex].spell);
		this.svc.setActiveDisc(this.list.options[this.list.selectedIndex].disc);
		this.svc.cast_int.show();
	}
	else {
		SM.log("ERROR (SM.spellBookINT.prototype.castSpell): No spell selected\n");
		alert("You must select a spell to cast.");
		return;
	}
};