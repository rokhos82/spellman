SA.spellDef.strainINT = function(aDIV) {
	this.div_id = aDIV;
};

SA.spellDef.strainINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.strainINT.prototype.draw()\n"); };
	
	var div = document.getElementById(this.div_id);
	
	// Setup the strain div
	table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain Desc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Strain description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.strain_svc.setDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain Base";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_base";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Strain base");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.strain_svc.setBase(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Strain Minimum";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_min";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Minimum cost for casting the spell");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.strain_svc.setMin(value); SA.admin.admSvc.saveToLocalStorage(); };
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
	box.id = this.div_id + "_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Equation to calculate strain");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.strain_svc.setCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.strainINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.strainINT.prototype.show()\n"); };
	
	document.getElementById(this.div_id + "_desc").value = aSVC.getDesc();
	document.getElementById(this.div_id + "_base").value = aSVC.getBase();
	document.getElementById(this.div_id + "_min").value = aSVC.getMin();
	document.getElementById(this.div_id + "_calc").value = aSVC.getCalc();
};