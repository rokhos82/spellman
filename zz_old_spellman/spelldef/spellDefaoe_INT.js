SA.spellDef.aoeINT = function(aDiv) {
	this.div_id = aDiv;
	this.svc = undefined;
};

SA.spellDef.aoeINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.aoeINT.prototype.draw()\n"); };
	div = document.getElementById(this.div_id);
	
	table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain per AOE";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_strain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Strain per aoe description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setStrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain Calculation";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_strain_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Strain per aoe calculation description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setStrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain per AOE";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_drain_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Drain per aoe description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setDrainDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Drain Calculation";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_drain_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Drain per aoe calculation description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setDrainCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "TAV per AOE";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_tav_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","TAV per aoe description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setTAVDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "TAV Calculation";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_tav_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","TAV per aoe calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.aoe_svc.setTAVCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.aoeINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.aoeINT.prototype.show()\n"); };
	
	this.svc = aSVC;
	
	if(!this.svc) {
		SA.log("ERROR (SA.spellDef.aoeINT.prototype.show): Service object is undefined");
	}
	
	document.getElementById(this.div_id + "_strain_desc").value = this.svc.getStrainDesc();
	document.getElementById(this.div_id + "_strain_calc").value = this.svc.getStrainCalc();
	document.getElementById(this.div_id + "_drain_desc").value = this.svc.getDrainDesc();
	document.getElementById(this.div_id + "_drain_calc").value = this.svc.getDrainCalc();
	document.getElementById(this.div_id + "_tav_desc").value = this.svc.getTAVDesc();
	document.getElementById(this.div_id + "_tav_calc").value = this.svc.getTAVCalc();
};