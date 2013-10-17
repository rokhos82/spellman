SM.spellListINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellListINT"); };
	
	this.parent = aParent;
	this.name_space = SM.NameSpace + "_spellList";
	this.root = undefined;
	this.svc = aSVC;
	
	this.content = undefined;
	this.inputs = {};
	this.lists = {};
	this.buttons = {};
};

SM.spellListINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellListINT.prototype.initialize"); };
	
	this.root = aRoot;
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_table");
	this.root.appendChild(table);
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	var title = document.createElement("tr");
	var cell = document.createElement("td");
	cell.innerHTML = "Name";
	title.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Rank";
	title.appendChild(cell);
	header.appendChild(title);
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	this.content = body;
	
	var add_spell = document.createElement("select");
	this.root.appendChild(add_spell);
	this.lists["add_spell"] = add_spell;
	
	var spell_rank = document.createElement("input");
	spell_rank.setAttribute("class",this.name_space + "_rank");
	spell_rank.setAttribute("type","text");
	this.inputs["add_spell"] = spell_rank;
	this.root.appendChild(spell_rank);
	
	var add_spell_btn = document.createElement("button");
	add_spell_btn.SMUI = this;
	add_spell_btn.setAttribute("onclick","this.SMUI.addSpell(); return false;");
	add_spell_btn.innerHTML = "Add Spell";
	this.root.appendChild(add_spell_btn);
	this.buttons["add_spell"] = add_spell_btn;
};

SM.spellListINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellListINT.prototype.update"); };
	
	if(!this.content)
		return;
	
	while(this.content.childNodes.length > 0) {
		this.content.removeChild(this.content.firstChild);
	}
	
	var spells = this.svc.getSpellList();
	for(s in spells) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.innerHTML = s;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = spells[s];
		row.appendChild(cell);
		cell = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "X";
		btn.SMUI = this;
		btn.setAttribute("onclick","this.SMUI.removeSpell(\"" + s + "\"); return false;");
		cell.appendChild(btn);
		row.appendChild(cell);
		this.content.appendChild(row);
	}
	
	while(this.lists["add_spell"].childNodes.length > 0)
		this.lists["add_spell"].removeChild(this.lists["add_spell"].firstChild);
	
	var list = {};
	var discs = this.svc.getDiscList();
	for(d in discs) {
		var spells = this.svc.parent.parent.definitions.getDiscSpellList(d);
		for(s in spells) {
			list[spells[s]] = spells[s];
		}
	}
	var spells = new Array();
	for(l in list) {
		spells.push(l);
	}
	spells = spells.sort();
	
	for(s in spells) {
		var spell_opt = document.createElement("option");
		spell_opt.value = spells[s];
		spell_opt.innerHTML = spells[s];
		this.lists["add_spell"].appendChild(spell_opt);
	}//*/
};

SM.spellListINT.prototype.addSpell = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellListINT.prototype.addSpell"); };
	
	var i = this.lists["add_spell"].selectedIndex;
	var name = this.lists["add_spell"].options[i].value;
	var rank = parseInt(this.inputs["add_spell"].value);

	if(isNaN(rank))
		return;

	this.svc.addSpell(name,rank);
	this.update();
};

SM.spellListINT.prototype.removeSpell = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.spellListINT.prototype.removeSpell"); };
	
	this.svc.removeSpell(aName);
	this.update();
};