SA.spellDef.generalINT = function(aDiv) {
	this.div_id = aDiv;
	this.svc = undefined;
};

SA.spellDef.generalINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.generalINT.prototype.draw(" + this.div_id + ")\n"); };
	
	var div = document.getElementById(this.div_id);
	
	// Setup the general div
	table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Name";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_name";
	box.setAttribute("class",SA.CSSName + "_text");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Disciplines";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_discs";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Discipline list");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setDiscs(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Prereq";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_prereq";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Spell prerequisites");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setPrereq(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Components";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_components";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Spell components");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setComponents(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Description";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("textarea");
	box.id = this.div_id + "_description";
	box.setAttribute("rows","6");
	box.setAttribute("cols","85");
	box.setAttribute("placeholder","Spell description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Effect";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("textarea");
	box.id = this.div_id + "_effect";
	box.setAttribute("rows","6");
	box.setAttribute("cols","85");
	box.setAttribute("placeholder","Effect description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setEffect(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Resist";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_resist";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Resist description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.general_svc.setResist(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.generalINT.prototype.show = function(aSVC) {
	this.svc = aSVC;
	
	if(!this.svc) {
		SA.log("ERROR (SA.spellDef.generalINT.prototype.show): Service object is undefined.");
	}
	
	document.getElementById(this.div_id + "_name").value = this.svc.getName();
	document.getElementById(this.div_id + "_discs").value = this.svc.getDiscs();
	document.getElementById(this.div_id + "_prereq").value = this.svc.getPrereq();
	document.getElementById(this.div_id + "_components").value = this.svc.getComponents();
	document.getElementById(this.div_id + "_description").value = this.svc.getDesc();
	document.getElementById(this.div_id + "_effect").value = this.svc.getEffect();
	document.getElementById(this.div_id + "_resist").value = this.svc.getResist();
}