SM.spellManagerINT = function(aSVC) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT"); };
	
	this.svc = aSVC;
	
	this.name_space = SM.NameSpace;
	this.root = undefined;
	this.content = undefined; // Root for all subui content
	this.popup = undefined; // Root for all popups
	
	this.subui = {};
	this.popups = {};
	
	this.buttons = {};
	this.button_hash = undefined;
	
	this.tabs = undefined;
	this.panels = {};
	this.panels_hash = {};
};

SM.spellManagerINT.prototype.initialize = function(aRoot) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT.prototype.initialize"); };
	
	this.root = aRoot
	
	if(!this.root) {
		alert("[ERROR] SM.spellManagerINT.prototype.initialize");
		return;
	}
	
	// Creat the linking to children ui objects
	this.subui.character = this.svc.character.ui;
	this.subui.spellbook = this.svc.character.children["spell_book"].ui;
	this.subui.definitions = this.svc.definitions.ui;
	
	this.panels_hash = {"character":"character","activity":"character","spellbook":"spellbook","definitions":"definitions"};
	
	// Setup the main UI
	this.menu = document.createElement("div");
	this.menu.setAttribute("class",SM.NameSpace + "_menu");
	this.content = document.createElement("div");
	this.content.setAttribute("class",SM.NameSpace + "_content");
	this.popup = document.createElement("div");
	this.popup.setAttribute("class",SM.NameSpace + "_popups");
	this.root.appendChild(this.menu);
	this.root.appendChild(this.content);
	this.root.appendChild(this.popup);
	
	this.tabs = new TabbedControl2("main",this.content);
	this.tabs.drawControl();
	
	var chr = document.createElement("div");
	chr.setAttribute("class",this.name_space + "_panel");
	this.tabs.addPanel("char",chr,this.subui.character,"Character");
	this.panels["character"] = chr;
	
	var book = document.createElement("div");
	book.setAttribute("class",this.name_space + "_panel");
	this.tabs.addPanel("book",book,this.subui.spellbook,"Spellbook");
	this.panels["spellbook"] = book;//*/
	
	var def = document.createElement("div");
	def.setAttribute("class",this.name_space + "_panel");
	this.tabs.addPanel("def",def,this.subui.definitions,"Definitions");
	this.panels["definitions"] = def;
	
	this.tabs.showControl();
	this.tabs.activatePanel("char");
	
	var div;
	var button;
	
	// Create the side menu
	var id = SM.NameSpace + "_menu";
	this.button_hash = new Array("Save","Load");
	
	this.buttons["Save"] = document.createElement("button");
	this.buttons["Save"].SMUI = this;
	this.buttons["Save"].setAttribute("class",id + "_button");
	this.buttons["Save"].setAttribute("onclick","this.SMUI.svc.saveToLocalStorage(); return false;");
	this.buttons["Save"].innerHTML = "Save";
	
	this.buttons["Load"] = document.createElement("button");
	this.buttons["Load"].SMUI = this;
	this.buttons["Load"].setAttribute("class",id + "_button");
	this.buttons["Load"].setAttribute("onclick","this.SMUI.svc.loadFromLocalStorage(); return false;");
	this.buttons["Load"].innerHTML = "Load";
	
	for(var b in this.button_hash) {
		this.menu.appendChild(this.buttons[this.button_hash[b]]);
	}
	
	// Initialize the popup child UI objects
	for(u in this.popups) {
		this.popups[u].initialize(this.popup);
	}//*/
	
	// Initialize the child UI objects
	for(u in this.subui) {
		if(this.subui[u].initialize)
			this.subui[u].initialize(this.panels[this.panels_hash[u]]);
	}
	
	// Create the popup overlay
	var div = document.createElement("div");
	div.setAttribute("class","SM_overlay");
	this.root.appendChild(div);
	SM.overlay = div;
};

SM.spellManagerINT.prototype.addPopup = function(aName,aPopup) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT.prototype.addPopup"); };
	
	if(!aPopup)
		return;
	
	this.popups[aName] = aPopup;
	this.popup.appendChild(aPopup.popup);
};

SM.spellManagerINT.prototype.addButton = function(aName,aButton) {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT.prototype.addButton"); };
};

SM.spellManagerINT.prototype.addTab = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT.prototype.addTab"); };
};

SM.spellManagerINT.prototype.update = function() {
	if(SM.debug) { SM.log("[CALL] SM.spellManagerINT.prototype.udpate"); };
	
	for(s in this.subui) {
		this.subui[s].update();
	}
}