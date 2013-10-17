SM.castLogINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.castLogINT"); };
	
	this.svc = aSVC;
	this.parent = aParent;
	this.root = undefined;
	this.content = undefined;
	this.name_space = SM.NameSpace + "_castLog";
	
	this.tables = {};
	this.buttons = {};
};

SM.castLogINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.castLogSVC.prototype.initialize"); };
	
	if(!aRoot) {
		SM.log("[ERROR] SM.castLogINT.prototype.initialize: aRoot not defined");
		return;
	}
	
	this.root = aRoot;
	
	var content = document.createElement("div");
	content.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(content);
	this.content = content;
	
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_table");
	this.content.appendChild(table);
	
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	this.tables["log"] = body;
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	header.appendChild(row);
	cell = document.createElement("td");
	cell.innerHTML = "Cast Log";
	cell.setAttribute("class",this.name_space + "_title");
	cell.setAttribute("colspan",8);
	row.appendChild(cell);
	
	row = document.createElement("tr");
	header.appendChild(row);
	cell = document.createElement("td");
	cell.innerHTML = "Spell";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Discipline";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Power";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "EPOT";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Targets";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Stamina";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Failed?";
	row.appendChild(cell);
	cell = document.createElement("td");
	var btn = document.createElement("button");
	btn.innerHTML = "Clear";
	btn.SMUI = this;
	btn.setAttribute("onclick","this.SMUI.clearLog(); return false;");
	this.buttons["clear"] = btn;
	cell.appendChild(btn);
	row.appendChild(cell);
};

SM.castLogINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.castLogINT.prototype.update"); };
	
	if(!this.content)
		return;
		
	while(this.tables["log"].childNodes.length > 0)
		this.tables["log"].removeChild(this.tables["log"].firstChild);
	
	var log = this.svc.dat.cast_log.slice();
	log.reverse();
	for(l in log) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.innerHTML = log[l].spell;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = log[l].discipline;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = log[l].cast_dat["POWER"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = log[l].cast_dat["EPOT"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = log[l].cast_dat["TARGETS"];
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = log[l].cast_dat["STAMINA"];
		row.appendChild(cell);
		cell = document.createElement("td");
		if(log[l].cast_dat["FAILED"])
			cell.innerHTML = "X";
		row.appendChild(cell);
		cell = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "Recast...";
		btn.SMUI = this;
		btn.setAttribute("onclick","this.SMUI.recast(" + (log.length - l - 1) + "); return false");
		cell.appendChild(btn);
		row.appendChild(cell);
		
		this.tables["log"].appendChild(row);
	}
};

SM.castLogINT.prototype.recast = function(aIndex) {
	if(SM.debug) { SM.log("[CALL] SM.castLogINT.prototype.recast"); };
	
	if(confirm("Are you sure you want to cast this spell?"))
		this.svc.castFromLog(aIndex);
};

SM.castLogINT.prototype.clearLog = function() {
	if(SM.debug) { SM.log("[CALL] SM.castLogINT.prototype.clearLog"); };
	
	if(confirm("Really clear the log?"))
		this.svc.clearLog();
};