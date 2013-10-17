SA.spellDef.durINT = function(aDIV) {
	this.div_id = aDIV;
};

SA.spellDef.durINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.durINT.prototype.draw()\n"); };
	
	var div = document.getElementById(this.div_id);
	
	// Setup the dur div
	var table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	var label = document.createElement("label");
	label.innerHTML = "Strain per Dur";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_strain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Strain per dur description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setStrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
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
	box.setAttribute("placeholder","Strain per dur calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setStrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain per Dur";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_drain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Drain per dur description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setDrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
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
	box.setAttribute("placeholder","Drain per dur calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setDrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "TAV per Dur";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_tav_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","TAV per dur description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setTAVDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
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
	box.setAttribute("placeholder","TAV per dur calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.dur_svc.setTAVCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.durINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.durINT.prototype.show()\n"); };
	
	if(!aSVC) {
		SA.log("ERROR (SA.spellDef.durINT.prototype.show): Service object undefined\n");
	}
	
	document.getElementById(this.div_id + "_strain_desc").value = aSVC.getStrainDesc();
	document.getElementById(this.div_id + "_strain_calc").value = aSVC.getStrainCalc();
	document.getElementById(this.div_id + "_drain_desc").value = aSVC.getDrainDesc();
	document.getElementById(this.div_id + "_drain_calc").value = aSVC.getDrainCalc();
	document.getElementById(this.div_id + "_tav_desc").value = aSVC.getTAVDesc();
	document.getElementById(this.div_id + "_tav_calc").value = aSVC.getTAVCalc();
};