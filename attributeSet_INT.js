SM.attributeSetINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.attributeSetINT"); };
	
	this.parent = aParent;
	this.root = undefined;
	this.svc = aSVC;
	this.content = undefined;
	this.name_space = SM.NameSpace + "_attributes";
	
	this.outputs = {};
	this.tables = {};
	this.buttons = {};
	
	this.table_hash = {
		"Spirit":"spirit",
		"Willpower":"willpower",
		"Max Stamina":"max_stam",
		"Stamina":"stamina"
	};
	
	this.popups = {};
};

SM.attributeSetINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.attributeSetINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
		
	this.popups["edit"] = new SM.charEditINT(this,this.svc);
	
	var div = document.createElement("div");
	div.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(div);
	this.content = div;
	
	var table = document.createElement("table");
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	table.setAttribute("class",this.name_space + "_table");
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	this.tables["char"] = body;
	this.content.appendChild(table);
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	row.appendChild(cell);
	cell = document.createElement("td");
	row.appendChild(cell);
	body.appendChild(row);
	
	var title = document.createElement("tr");
	title.setAttribute("class",this.name_space + "_title");
	cell = document.createElement("td");
	cell.setAttribute("colspan",5);
	cell.innerHTML = "Character";
	title.appendChild(cell);
	header.appendChild(title);
	
	var edit_btn = document.createElement("button");
	edit_btn.innerHTML = "Edit...";
	edit_btn.SMUI = this.popups["edit"];
	edit_btn.setAttribute("onclick","this.SMUI.show(); return false;");
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan",5);
	cell.appendChild(edit_btn);
	row.appendChild(cell);
	footer.appendChild(row);
	
	for(p in this.popups) {
		this.popups[p].initialize(this.root);
	}
};

SM.attributeSetINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.attributeSetINT.prototype.update"); };
	
	if(!this.content)
		return;
		
	while(this.tables["char"].childNodes.length > 0)
		this.tables["char"].removeChild(this.tables["char"].firstChild);
		
	var dat = this.svc.dat.attribute_set;
	for(a in this.table_hash) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.setAttribute("class",this.name_space + "_label");
		cell.innerHTML = a;
		row.appendChild(cell);
		cell = document.createElement("td");
		if(dat.attributes[this.table_hash[a]])
			cell.innerHTML = dat.attributes[this.table_hash[a]];
		else if(dat.stats[this.table_hash[a]])
			cell.innerHTML = dat.stats[this.table_hash[a]];
		row.appendChild(cell);
		this.tables["char"].appendChild(row);
	}
		
	// REMOVE FOR PRODUCTION
	/*var a = this.svc.dat.attribute_set;
	a.attributes.spirit = 15;
	a.attributes.willpower = 15;
	a.stats.max_stam = 56;
	a.stats.stamina = 56;//*/
};