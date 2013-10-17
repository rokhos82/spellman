SA.spellDef.targetINT = function(aDiv) {
	this.div_id = aDiv;
};

SA.spellDef.targetINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.targetINT.prototype.draw(" + this.div_id + ")\n"); };
	
	div = document.getElementById(this.div_id);
	
	// Setup the target div
	table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain per target";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_strain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Strain per target description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setStrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain Calc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_strain_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Strain per target calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setStrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain per target";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_drain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Drain per target description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setDrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
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
	box.id = this.div_id + "_drain_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Drain per target calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setDrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "TAV per target";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_tav_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","TAV per target description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setTAVDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "TAV Calc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_tav_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","TAV per target calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.target_svc.setTAVCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.targetINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.targetINT.prototype.show()\n"); };
	
	if(!aSVC) {
		SA.log("ERROR (SA.spellDef.targetINT.prototype.show): Service object undefined\n");
	}
	
	document.getElementById(this.div_id + "_strain_desc").value = aSVC.getStrainDesc();
	document.getElementById(this.div_id + "_strain_calc").value = aSVC.getStrainCalc();
	document.getElementById(this.div_id + "_drain_desc").value = aSVC.getDrainDesc();
	document.getElementById(this.div_id + "_drain_calc").value = aSVC.getDrainCalc();
	document.getElementById(this.div_id + "_tav_desc").value = aSVC.getTAVDesc();
	document.getElementById(this.div_id + "_tav_calc").value = aSVC.getTAVCalc();
};