SM.spellManagerINT = function(aDIV,aSVC) {
	if(SM.debug) { SM.log("SM.spellManagerINT(" + aDIV + ")\n"); };
	this.man_svc = aSVC;
	this.disp_root = aDIV;
	this.disp_box = document.getElementById(this.disp_root);
	this.content_id = undefined;
	this.initialized = undefined;
	this.book_int = undefined;
	
	SM.manager = this;
	
	//this.man_svc.loadFromLocalStorage();
	
	this.initializeForm();
	this.initializeInterface();
};

SM.spellManagerINT.prototype.initializeForm = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.initializeForm()\n"); };
	
	var f = document.getElementById(SM.formname);
	
	if(!f) {
		f = document.createElement("form");
		f.setAttribute("id",SM.formname);
		f.setAttribute("name",SM.formname);
		f.setAttribute("action","javascript: return false;");
		f.setAttribute("method","post");
		this.disp_box.appendChild(f);
	}
};

SM.spellManagerINT.prototype.initializeInterface = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.initializeInterface()\n"); };
	if (!this.initialized) {
		this.defineFormShape();
		this.defineMenus();
		this.defineContentForm();
		this.initialized = 1;
		this.show();
	}
	else {
		SM.log("ERROR: (SM.spellManagerINT.prototype.initializeInterface):  Interface alrady exists\n");
	}
};

SM.spellManagerINT.prototype.defineFormShape = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.defineFormShape()\n"); };
	
	var table = document.createElement("table");
	var row = document.createElement("tr");
	var side = document.createElement("td");
	var content = document.createElement("td");
	var ctrl = document.createElement("div");
	var menu = document.createElement("div");
	
	side.setAttribute("id",SM.CSSName + "_side");
	side.setAttribute("class",SM.CSSName + "_side");
	content.setAttribute("id",SM.CSSName + "_content");
	content.setAttribute("class",SM.CSSName + "_content");
	ctrl.setAttribute("id",SM.CSSName + "_ctrl");
	ctrl.setAttribute("class",SM.CSSName + "_ctrl");
	menu.setAttribute("id",SM.CSSName + "_menu");
	menu.setAttribute("class",SM.CSSName + "_menu");
	
	table.appendChild(row);
	row.appendChild(side);
	row.appendChild(content);
	side.appendChild(ctrl);
	side.appendChild(menu);
	
	this.disp_box.appendChild(table);
};

SM.spellManagerINT.prototype.defineMenus = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.defineMenus()\n"); };
	
	var ctrl = document.getElementById(SM.CSSName + "_ctrl");
	var menu = document.getElementById(SM.CSSName + "_menu");
	
	if(!ctrl || !menu) {
		SM.log("ERROR (SM.spellManagerINT.prototype.defineMenus): Control/side menu not defined");
		return;
	}
	
	var d;
	var a;
	
	// Setup the controls menu
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","");
	a.setAttribute("onclick","SM.manager.man_svc.saveToLocalStorage(); return false;");
	a.innerHTML = "Save";
	d.appendChild(a);
	ctrl.appendChild(d);
	
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","");
	a.innerHTML = "Load";
	d.appendChild(a);
	ctrl.appendChild(d);
	
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","editor.html");
	a.setAttribute("target","_blank");
	a.innerHTML = "Edit Definitions";
	d.appendChild(a);
	ctrl.appendChild(d);
	
	// Setup the side menu
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","");
	a.innerHTML = "Spell Book";
	a.SMUI = this;
	a.setAttribute("onclick","this.SMUI.man_svc.spell_book.book_int.show(); return false;");
	d.appendChild(a);
	menu.appendChild(d);
	
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","");
	a.innerHTML = "Magic Items (NYI)";
	d.appendChild(a);
	menu.appendChild(d);
	
	d = document.createElement("div");
	a = document.createElement("a");
	d.setAttribute("id",SM.CSSName + "_menu_item");
	d.setAttribute("class",SM.CSSName + "_menu_item");
	a.setAttribute("href","");
	a.innerHTML = "Do Turn (NYI)";
	d.appendChild(a);
	menu.appendChild(d);
};

SM.spellManagerINT.prototype.defineContentForm = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.defineCastForm()\n"); };
	
	var id = SM.CSSName + "_content";
	this.content_id = SM.CSSName + "_content";
	var content = document.getElementById(id);
	
	if(!content) {
		SM.log("ERROR (SM.spellManagerINT.prototype.defineCastForm): Content element is undefined\n");
	}
	
	var t = document.createElement("table");
	content.appendChild(t);
	
	t.setAttribute("id",id + "_struct");
	t.setAttribute("class",SM.CSSName + "_struct_table");
	
	var row;
	var cell;
	
	row = document.createElement("tr");
	t.appendChild(row);
	
	cell = document.createElement("td");
	row.appendChild(cell);
	var spells = document.createElement("table");
	cell.appendChild(spells);
	
	cell = document.createElement("td");
	row.appendChild(cell);
	var discs = document.createElement("table");
	cell.appendChild(discs);
	
	row = document.createElement("tr");
	t.appendChild(row);
	cell = document.createElement("td");
	cell.setAttribute("colspan","2");
	row.appendChild(cell);
	
	// Setup the active spells table
	spells.setAttribute("id",id + "_spells");
	spells.setAttribute("class",id + "_table");
	row = document.createElement("tr");
	row.setAttribute("class",id + "_table_header");
	spells.appendChild(row);
	cell = document.createElement("td");
	cell.innerHTML = "Spell";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Drain";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Disc";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Surge";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Duration";
	row.appendChild(cell);
	
	// Setup the disciplines table
	discs.setAttribute("id",id + "_discs");
	discs.setAttribute("class",id + "_table");
	row = document.createElement("tr");
	row.setAttribute("class",id + "_table_header");
	discs.appendChild(row);
	cell = document.createElement("td");
	cell.innerHTML = "Disc";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Rank";
	row.appendChild(cell);
	cell = document.createElement("td");
	cell.innerHTML = "Pool";
	row.appendChild(cell);
	
	// Draw the spell book
	var book = document.createElement("div");
	content.appendChild(book);
	book.setAttribute("id",SM.CSSName + "_spell_book");
	book.setAttribute("class",SM.CSSName + "_spell_book");
	this.man_svc.spell_book.book_int.draw(SM.CSSName + "_spell_book");
	this.book_int = this.man_svc.spell_book.book_int;
	
	// Draw the casting popup
	var cast = document.createElement("div");
	content.appendChild(cast);
	cast.setAttribute("id",SM.CSSName + "_cast_popup");
	cast.setAttribute("class",SM.CSSName + "_cast_popup");
	this.man_svc.spell_book.cast_int = new SM.spellCastINT(SM.CSSName + "_cast_popup",this,this.book_int.svc);
	this.man_svc.spell_book.cast_int.draw();
	
	// Draw the add spell popup
	
	this.update();
};

SM.spellManagerINT.prototype.show = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.show()\n"); };
};

SM.spellManagerINT.prototype.update = function() {
	if(SM.debug) { SM.log("SM.spellManagerINT.prototype.update()\n"); };
	
	this.book_int.update();
	
	// Update the disc table
	var row;
	var cell;
	var id = this.content_id + "_table_data";
	var disc_tbl = document.getElementById(this.content_id + "_discs");
	forEach(this.man_svc.spell_book.book_dat.discs_list,function(val) {
		row = document.createElement("tr");
		row.setAttribute("class",id);
		disc_tbl.appendChild(row);
		
		cell = document.createElement("td");
		cell["innerHTML"] = val.name;
		row.appendChild(cell);
		
		cell = document.createElement("td");
		cell["innerHTML"] = val.rank;
		row.appendChild(cell);
		
		cell = document.createElement("td");
		cell["innerHTML"] = val.pool;
		row.appendChild(cell);
	});
};