SA.spellDef.stagingINT = function(aDIV) {
	this.div_id = aDIV;
};

SA.spellDef.stagingINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.stagingINT.prototype.draw()\n"); };
	
	var div = document.getElementById(this.div_id);
	
	// Setup the staging div
	var table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	var label = document.createElement("label");
	label.innerHTML = "Staging Desc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Staging description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.staging_svc.setDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Staging Type";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_type";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Staging type");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.staging_svc.setType(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Staging Calc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Staging calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.staging_svc.setCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.stagingINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.stagingINT.prototype.show()\n"); };
	
	if(!aSVC) {
		SA.log("ERROR (SA.spellDef.stagingINT.prototype.show): Service object undefined\n");
	}
	
	document.getElementById(this.div_id + "_desc").value = aSVC.getDesc();
	document.getElementById(this.div_id + "_type").value = aSVC.getType();
	document.getElementById(this.div_id + "_calc").value = aSVC.getCalc();
};