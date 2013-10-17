SA.spellDef.drainINT = function(aDIV) {
	this.div_id = aDIV;
};

SA.spellDef.drainINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.drainINT.prototype.draw()\n"); };

	var div = document.getElementById(this.div_id);
	
	// Setup the drain div
	table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain Desc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Drain description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.drain_svc.setDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain Base";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_base";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Drain base");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.drain_svc.setBase(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain Minimum";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_min";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Minimum drain to maintain the spell");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.drain_svc.setMin(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain Calc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Equation to calculate drain");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.drain_svc.setCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.drainINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.drainINT.prototype.show()\n"); };
	
	if(!aSVC) {
		SA.log("ERROR (SA.spellDef.drainINT.prototype.show): Service object not defined\n");
	}
	
	document.getElementById(this.div_id + "_desc").value = aSVC.getDesc();
	document.getElementById(this.div_id + "_base").value = aSVC.getBase();
	document.getElementById(this.div_id + "_min").value = aSVC.getMin();
	document.getElementById(this.div_id + "_calc").value = aSVC.getCalc();
};