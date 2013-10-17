SM.activeSpellsINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT"); };
	
	this.parent = aParent;
	this.svc = aSVC;
	this.root = undefined;
	this.content = undefined;
	this.name_space = SM.NameSpace + "_activeSpells";
	
	this.tables = {};
	this.col_hash = {
		"Spell":"name",
		"Discipline":"discipline",
		"Drain":"drain",
		"Overflow":"overflow",
		"Duration":"duration",
		"Surge":"surge",
		"Next Surge":"next_surge",
		"Note":"notes"
	};
};

SM.activeSpellsINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	var div = document.createElement("div");
	div.setAttribute("class",this.name_space + "_content");
	this.content = div;
	this.root.appendChild(div);
	
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_table");
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	this.tables["active"] = body;
	this.content.appendChild(table);
	
	var row;
	var cell;
	
	var title = document.createElement("span");
	title.setAttribute("class",this.name_space + "_title");
	title.innerHTML = "Active Spells";
	cell = document.createElement("td");
	cell.appendChild(title);
	cell.setAttribute("colspan",9);
	row = document.createElement("tr");
	row.appendChild(cell);
	header.appendChild(row);
	
	row = document.createElement("tr");
	for(c in this.col_hash) {
		cell = document.createElement("td");
		cell.innerHTML = c;
		row.appendChild(cell);
	}
	
	header.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",9);
	var turn_btn = document.createElement("button");
	turn_btn.innerHTML = "Turn";
	turn_btn.SMUI = this;
	turn_btn.setAttribute("onclick","this.SMUI.turn(); return false;");
	cell.appendChild(turn_btn);
	var reset_btn = document.createElement("button");
	reset_btn.innerHTML = "Reset";
	reset_btn.SMUI = this;
	reset_btn.setAttribute("onclick","this.SMUI.reset(); return false;");
	cell.appendChild(reset_btn);
	row.appendChild(cell);
	footer.appendChild(row);
};

SM.activeSpellsINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT.prototype.update"); };
	
	if(!this.content)
		return;
		
	while(this.tables["active"].childNodes.length > 0)
		this.tables["active"].removeChild(this.tables["active"].firstChild);
		
	var discs = this.svc.getActiveSpells();
	var content = false;
	for(d in discs) {
		var spells = discs[d];
		for(s in spells) {
			content = true;
			var row = document.createElement("tr");
			for(c in this.col_hash) {
				var cell = document.createElement("td");
				cell.innerHTML = spells[s][this.col_hash[c]];
				//if(c == "Note")
				//	cell.contentEditable = true;
				row.appendChild(cell);
			}
			cell = document.createElement("td");
			var btn = document.createElement("button");
			btn.SMUI = this;
			btn.setAttribute("onclick","this.SMUI.cancel(\"" + d + "\"," + s + "); return false;");
			btn.innerHTML = "X";
			cell.appendChild(btn);
			row.appendChild(cell);
			this.tables["active"].appendChild(row);
		}
	}
	
	if(!content) {
		var row = document.createElement("tr");
		for(c in this.col_hash) {
			var cell = document.createElement("td");
			row.appendChild(cell);
		}
		this.tables["active"].appendChild(row);
	}
};

SM.activeSpellsINT.prototype.cancel = function(aDisc,aIndex) {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT.prototype.cancel"); };
	
	this.svc.cancelActiveSpell(aDisc,aIndex);
};

SM.activeSpellsINT.prototype.reset = function() {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT.prototype.reset"); };
	
	this.svc.resetActiveSpells();
};

SM.activeSpellsINT.prototype.turn = function() {
	if(SM.debug) { SM.log("[CALL] SM.activeSpellsINT.prototype.turn"); };
	
	this.svc.spellMaintanence();
};