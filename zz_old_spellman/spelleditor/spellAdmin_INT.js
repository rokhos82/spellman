SA.spellAdminINT = function(aContainerId,aAdminSvc) {
	this.admSvc = aAdminSvc;
	this.dispRoot = aContainerId;
	this.dispBox = document.getElementById(aContainerId);
	this.contentRoot = undefined;
	this.contentBox = undefined;
	this.spellDefInt = undefined;
	SA.admin = this;
	
	this.admSvc.loadFromLocalStorage();
	
	this.initializeForm();
	this.initializeInterface();
};

SA.spellAdminINT.prototype.initializeForm = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.initializeForm()\n"); };
	
	var f = document.getElementById(SA.formname);
	
	if(!f) {
		f = document.createElement("form");
		f.setAttribute("id",SA.formname);
		f.setAttribute("name",SA.formname);
		f.setAttribute("action","javascript: return false;");
		f.setAttribute("method","post");
		this.dispBox.appendChild(f);
	}
	
	this.form = f;
	return this.form;
};

SA.spellAdminINT.prototype.initializeInterface = function() {
	if (!this.initialized) {
		this.defineFormShape();
		this.drawSpellList();
		this.drawDiscList();
		this.drawSpellEdit();
	
		this.initialized = 1;
	}
	else {
		SA.log("ERROR: (SA.spellAdminINT.prototype.initializeInterface):  Interface alrady exists");
	}
}

SA.spellAdminINT.prototype.defineFormShape = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.defineFormShape()\n"); };
	
	var table = document.createElement("table");
	var row = document.createElement("tr");
	var col1 = document.createElement("td");
	var col2 = document.createElement("td");
	
	col1.setAttribute("valign","top");
	col2.setAttribute("valign","top");
	
	col1.setAttribute("id",SA.CSSName + "_sideMenu");
	col1.setAttribute("class",SA.CSSName + "_sideMenu");
	
	col2.setAttribute("id",SA.CSSName + "_content");
	col2.setAttribute("class",SA.CSSName + "_content");
	
	row.appendChild(col1);
	row.appendChild(col2);
	table.appendChild(row);
	this.form.appendChild(table);
	
	this.contentRoot = col2.id;
	this.contentBox = col2;
	
	var div;
	var head;
	
	// Define the left sidebar menu
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_DIVSpellMenu");
	div.setAttribute("class",SA.CSSName + "_sideMenu_item");
	head = document.createElement("a");
	head.innerHTML = "Spell List";
	head.setAttribute("onclick",SA.adminObj + ".showSpellList(); return false;");
	head.setAttribute("href","");
	col1.appendChild(div);
	div.appendChild(head);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_DIVDiscMenu");
	div.setAttribute("class",SA.CSSName + "_sideMenu_item");
	head = document.createElement("a");
	head.innerHTML = "Discipline List";
	head.setAttribute("onclick",SA.adminObj + ".showDiscList(); return false;");
	head.setAttribute("href","");
	col1.appendChild(div);
	div.appendChild(head);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_DIVNewSpellMenu");
	div.setAttribute("class",SA.CSSName + "_sideMenu_item");
	head = document.createElement("a");
	head.innerHTML = "New Spell";
	head.setAttribute("onclick",SA.adminObj + ".newSpell(); return false;");
	head.setAttribute("href","");
	col1.appendChild(div);
	div.appendChild(head);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_DIVNewDiscMenu");
	div.setAttribute("class",SA.CSSName + "_sideMenu_item");
	head = document.createElement("a");
	head.innerHTML = "New Discipline";
	head.setAttribute("onclick",SA.adminObj + ".newDisc('" + col2.id + "'); return false;");
	head.setAttribute("href","");
	col1.appendChild(div);
	div.appendChild(head);
	
	// Define the content areas	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_spellList");
	div.style.display = "none";
	col2.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_spellEdit");
	div.style.display = "none";
	col2.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_discList");
	div.style.display = "none";
	col2.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("id",SA.CSSName + "_discEdit");
	div.style.display = "none";
	col2.appendChild(div);
};

SA.spellAdminINT.prototype.drawSpellList = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.drawSpellList()\n"); };
	
	var id = SA.CSSName + "_spellList";
	this.clearContent(id)

	var names = this.admSvc.getSpellList().sort().reverse();
	var container = document.getElementById(id);
	var i = names.length;
	
	while(i--) {
		var a = document.createElement("a");
		var name = names[i];
		a.setAttribute("onclick",SA.adminObj + ".showSpellEdit('" + name + "'); return false;");
		a.setAttribute("href","");
		a.innerHTML = name;
		
		var div = document.createElement("div");
		div.setAttribute("class",SA.CSSName + "_anchor_list");
		
		div.appendChild(a);
		container.appendChild(div);
	}
};

SA.spellAdminINT.prototype.showSpellList = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.showSpellList()\n"); };
	
	var container = document.getElementById(SA.CSSName + "_content");
	
	var i = container.childNodes.length;
	while(i--) {
		container.childNodes[i].style.display = "none";
	}
	
	container = document.getElementById(SA.CSSName + "_spellList");
	container.style.display = "block";
};

SA.spellAdminINT.prototype.drawDiscList = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.drawDiscList()\n"); };
	
	var id = SA.CSSName + "_discList";
	this.clearContent(id);
	
	var names = this.admSvc.getDiscList().sort().reverse();
	var container = document.getElementById(id);
	var i = names.length;
	
	while(i--) {
		var a = document.createElement("a");
		var name = names[i];
		a.setAttribute("onclick",SA.adminObj + ".editDisc('" + name + "'); return false;");
		a.setAttribute("href","");
		a.innerHTML = name;
		
		var div = document.createElement("div");
		div.setAttribute("class",SA.CSSName + "_anchor_list");
		
		div.appendChild(a);
		container.appendChild(div);
	}
};

SA.spellAdminINT.prototype.showDiscList = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.showDiscList()\n"); };
	
	var container = document.getElementById(SA.CSSName + "_content");
	
	var i = container.childNodes.length;
	while(i--) {
		container.childNodes[i].style.display = "none";
	}
	
	container = document.getElementById(SA.CSSName + "_discList");
	container.style.display = "block";
};

SA.spellAdminINT.prototype.drawSpellEdit = function() {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.drawSpellEdit()\n"); };
	
	var id = SA.CSSName + "_spellEdit";
	this.clearContent(id);
	var container = document.getElementById(id);
	
	var div_general = document.createElement("div");
	var div_limits = document.createElement("div");
	var div_damage = document.createElement("div");
	var div_strain = document.createElement("div");
	var div_drain = document.createElement("div");
	var div_tav = document.createElement("div");
	var div_range = document.createElement("div");
	var div_base = document.createElement("div");
	var div_dpot = document.createElement("div");
	var div_epot = document.createElement("div");
	var div_aoe = document.createElement("div");
	var div_target = document.createElement("div");
	var div_surge = document.createElement("div");
	var div_staging = document.createElement("div");
	var div_dur = document.createElement("div");
	
	container.appendChild(div_general);
	container.appendChild(div_limits);
	container.appendChild(div_damage);
	container.appendChild(div_strain);
	container.appendChild(div_drain);
	container.appendChild(div_tav);
	container.appendChild(div_range);
	container.appendChild(div_base);
	container.appendChild(div_epot);
	container.appendChild(div_dpot);
	container.appendChild(div_target);
	container.appendChild(div_aoe);
	container.appendChild(div_dur);
	container.appendChild(div_surge);
	container.appendChild(div_staging);
	
	var divs = {};

	div_general.setAttribute("id",SA.CSSName + "_spellEdit_general");
	divs["general"] = SA.CSSName + "_spellEdit_general";
	
	div_aoe.setAttribute("id",SA.CSSName + "_spellEdit_aoe");
	divs["aoe"] = SA.CSSName + "_spellEdit_aoe";
	
	div_epot.setAttribute("id",SA.CSSName + "_spellEdit_epot");
	divs["epot"] = SA.CSSName + "_spellEdit_epot";
	
	div_target.setAttribute("id",SA.CSSName + "_spellEdit_target");
	divs["target"] = SA.CSSName + "_spellEdit_target";
	
	div_strain.setAttribute("id",SA.CSSName + "_spellEdit_strain");
	divs["strain"] = SA.CSSName + "_spellEdit_strain";
	
	divs["drain"] = SA.CSSName + "_spellEdit_drain";
	div_drain.setAttribute("id",divs["drain"]);
	
	divs["tav"] = SA.CSSName + "_spellEdit_tav";
	div_tav.setAttribute("id",divs["tav"]);
	
	divs["dur"] = SA.CSSName + "_spellEdit_dur";
	div_dur.setAttribute("id",divs["dur"]);
	
	divs["surge"] = SA.CSSName + "_spellEdit_surge";
	div_surge.setAttribute("id",divs["surge"]);
	
	divs["staging"] = SA.CSSName + "_spellEdit_staging";
	div_staging.setAttribute("id",divs["staging"]);
	
	this.spellDefInt = new SA.spellDefINT(divs);
	this.spellDefInt.draw();
};

SA.spellAdminINT.prototype.showSpellEdit = function(aName) {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.showSpellEdit(" + aName + ")\n"); };	
	
	this.admSvc.setActiveSpell(aName);
	var container = document.getElementById(SA.CSSName + "_content");
	
	var i = container.childNodes.length;
	while(i--) {
		container.childNodes[i].style.display = "none";
	}
	container = document.getElementById(SA.CSSName + "_spellEdit");
	container.style.display = "block";

	this.spellDefInt.show(this.admSvc.activeSpell);
};

SA.spellAdminINT.prototype.newSpell = function () {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.newSpell()\n"); };	
	
	var name = prompt("Spell Name: ");
	
	if(!name) {
		SA.log("ERROR (SA.spellAdminINT.prototype.newSpell): A spell name must be entered\n");
	}
	else {
		this.admSvc.createSpell(name);
		this.admSvc.saveToLocalStorage();
		this.drawSpellList();
		this.showSpellEdit(name);
	}
};

SA.spellAdminINT.prototype.newDisc = function (aContainerId) {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.newDisc(" + aContainerId + ")\n"); };	
	
	var name = prompt("Discipline Name: ");
	
	if(!name) {
		SA.log("ERROR (SA.spellAdminINT.prototype.newDisc): A spell name must be entered\n");
		this.drawDiscList(aContainerId);
	}
	else {
		this.admSvc.createDiscipline(name);
		this.admSvc.saveToLocalStorage();
		//this.editSpell(name,aContainerId);
		this.drawDiscList();
	}
};

SA.spellAdminINT.prototype.clearContent = function(aContainerId) {
	if(SA.debug) { SA.log("SA.spellAdminINT.prototype.clearContent('" + aContainerId + "')\n"); };
	
	var container = document.getElementById(aContainerId);
	
	if(container) {
		while(container.childNodes[0]) {
			container.removeChild(this.contentBox.childNodes[0]);
		}
	}
	else {
		SA.log("ERROR (SA.spellAdminINT.prototype.clearContent): Invalid DOM elements\n");
	}
};