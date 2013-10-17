SM.energyPoolINT = function(aParent,aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.energyPoolINT"); };
	
	this.parent = aParent;
	this.name_space = SM.NameSpace + "_pool";
	this.svc = aSVC;
	
	this.content = undefined;
	this.tables = {};
};

SM.energyPoolINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.energyPoolINT.prototype.initialize"); };
	
	this.parent = this.svc.parent.ui;
	
	this.root = aRoot;
	
	var div = document.createElement("div");
	this.content = div;
	div.setAttribute("class",this.name_space + "_content");
	this.root.appendChild(div);
	
	var row;
	var cell;
	
	var table = document.createElement("table");
	table.setAttribute("class",this.name_space + "_table");
	this.content.appendChild(table);
	
	var header = document.createElement("thead");
	table.appendChild(header);
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.setAttribute("colspan","3");
	var span = document.createElement("span");
	span.setAttribute("class",this.name_space + "_title");
	span.innerHTML = "Energy Pool";
	cell.appendChild(span);
	row.appendChild(cell);
	header.appendChild(row);
	row = document.createElement("tr");
	cell = document.createElement("td");
	cell.innerHTML = "Discipline";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Rank";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Pool";
	row.appendChild(cell);
	header.appendChild(row);
	
	var body = document.createElement("tbody");
	this.tables["pool"] = body;
	table.appendChild(body);
};

SM.energyPoolINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.energyPoolINT.prototype.update"); };
	
	if(!this.content)
		return;
	
	while(this.tables["pool"].childNodes.length > 0)
		this.tables["pool"].removeChild(this.tables["pool"].firstChild);
		
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
		cell.innerHTML = this.svc.calcPool(d);
		row.appendChild(cell);
		
		this.tables["pool"].appendChild(row);
	}
};