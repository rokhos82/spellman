SM.discListINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.discListINT"); };
	
	this.parent = aParent;
	this.name_space = SM.NameSpace + "_discList";
	this.root = undefined;
	this.svc = aSVC;
	
	this.content = undefined;
	this.inputs = {};
	this.lists = {};
	this.buttons = {};
};

SM.discListINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.discListINT.prototype.initialize"); };
	
	this.root = aRoot;
	
	if(!this.root)
		return;
	
	var table = document.createElement("table");
	var header = document.createElement("thead");
	var footer = document.createElement("tfoot");
	var body = document.createElement("tbody");
	
	table.setAttribute("class",this.name_space + "_table");
	table.appendChild(header);
	table.appendChild(footer);
	table.appendChild(body);
	
	this.root.appendChild(table);
	this.content = body;
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Name";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Rank";
	row.appendChild(cell);
	header.appendChild(row);
	
	var add_disc = document.createElement("select");
	this.lists["add_disc"] = add_disc;
	this.root.appendChild(add_disc);
	
	var disc_rank = document.createElement("input");
	disc_rank.setAttribute("type","text");
	disc_rank.setAttribute("class",this.name_space + "_rank");
	this.inputs["add_disc"] = disc_rank;
	this.root.appendChild(disc_rank);
	
	var add_disc_btn = document.createElement("button");
	add_disc_btn.innerHTML = "Add Disc";
	add_disc_btn.SMUI = this;
	add_disc_btn.setAttribute("onclick","this.SMUI.addDisc(); return false;");
	this.buttons["add_disc"] = add_disc_btn;
	this.root.appendChild(add_disc_btn);
};

SM.discListINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.discListINT.prototype.update"); };
	
	while(this.lists["add_disc"].childNodes.length > 0)
		this.lists["add_disc"].removeChild(this.lists["add_disc"].firstChild);
		
	var discs = this.svc.parent.parent.definitions.getDiscList();
	for(d in discs) {
		var opt = document.createElement("option");
		opt.value = discs[d];
		opt.innerHTML = discs[d];
		this.lists["add_disc"].appendChild(opt);
	}
	
	while(this.content.childNodes.length > 0)
		this.content.removeChild(this.content.firstChild);
		
	var discs = this.svc.getDiscList();
	for(d in discs) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.innerHTML = d;
		row.appendChild(cell);
		cell = document.createElement("td");
		cell.innerHTML = discs[d];
		row.appendChild(cell);
		cell = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "X";
		btn.SMUI = this;
		btn.setAttribute("onclick","this.SMUI.removeDisc(\"" + d + "\"); return false;");
		cell.appendChild(btn);
		row.appendChild(cell);
		
		this.content.appendChild(row);
	}
};

SM.discListINT.prototype.addDisc = function() {
	if(SM.debug) { SM.log("[CALL] SM.discListINT.prototype.addDisc"); };
	
	var i = this.lists["add_disc"].selectedIndex;
	var disc = this.lists["add_disc"].options[i].value;
	var rank = parseInt(this.inputs["add_disc"].value);
	
	if(rank < 1) {
		alert("Disciplines must be of rank 1 or higher");
		return;
	}
	
	this.svc.addDisc(disc,rank);
	this.update();
};

SM.discListINT.prototype.removeDisc = function(aName) {
	if(SM.debug) { SM.log("[CALL] SM.discListINT.prototype.removeDisc(" + aName + ")"); };
	
	this.svc.removeDisc(aName);
	this.update();
}