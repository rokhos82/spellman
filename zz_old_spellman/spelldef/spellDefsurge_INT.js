SA.spellDef.surgeINT = function(aDIV) {
	this.div_id = aDIV;
};

SA.spellDef.surgeINT.prototype.draw = function() {
	if(SA.debug) { SA.log("SA.spellDef.surgeINT.prototype.draw()\n"); };
	
	var div = document.getElementById(this.div_id);
	
	// Setup the surge div
	var table = document.createElement("table");
	div.appendChild(table);
	div.setAttribute("class",SA.CSSName + "_spellEdit_div");
	
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	var label = document.createElement("label");
	label.innerHTML = "Surge Desc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_desc";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Surge description");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.surge_svc.setDesc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	label = document.createElement("label");
	label.innerHTML = "Surge Unit";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_unit";
	box.setAttribute("class",SA.CSSName + "_text");
	box.setAttribute("placeholder","Surge unit");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.surge_svc.setUnit(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
	
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	var label = document.createElement("label");
	label.innerHTML = "Surge Calc";
	cell.appendChild(label);
	cell.setAttribute("class",SA.CSSName + "_cell");
	row.appendChild(cell);
	cell = document.createElement("td");
	box = document.createElement("input");
	box.id = this.div_id + "_calc";
	box.setAttribute("class",SA.CSSName + "_text_long");
	box.setAttribute("placeholder","Surge calculation");
	box.SAUI = {};
	box.SAUI.updateDef = function(value) { SA.admin.admSvc.activeSpell.surge_svc.setCalc(value); SA.admin.admSvc.saveToLocalStorage(); };
	box.setAttribute("onblur","this.SAUI.updateDef(this.value); return false;");
	cell.appendChild(box);
	row.appendChild(cell);
	table.appendChild(row);
};

SA.spellDef.surgeINT.prototype.show = function(aSVC) {
	if(SA.debug) { SA.log("SA.spellDef.surgeINT.prototype.show()\n"); };
	
	if(!aSVC) {
		SA.log("ERROR (SA.spellDef.surgeINT.prototype.show): Service object undefined\n");
	};
	
	document.getElementById(this.div_id + "_desc").value = aSVC.getDesc();
	document.getElementById(this.div_id + "_unit").value = aSVC.getUnit();
	document.getElementById(this.div_id + "_calc").value = aSVC.getCalc();
};