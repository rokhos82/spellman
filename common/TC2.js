TabbedControl2 = function(aName,aDispRoot) {
	this.name = aName;
	this.root = aDispRoot
	
	this.activePanel = undefined;
	
	this.tab_list = undefined;
	this.content = undefined;
	
	this.tabs = {};
	this.panels = {};
};
	
TabbedControl2.Panel = function(aName,aDispRoot,aPanelUI) {
	this.name = aName;
	this.root = aDispRoot;
	this.ui = aPanelUI;
	
	this.root.setAttribute("class","TC_panel");
};
	
TabbedControl2.Tab = function(aName,aDispRoot,aParent) {
	this.name = aName;
	this.root = aDispRoot;
	this.parent = aParent;
	
	this.root.setAttribute("class","TC_tab_inactive");
	this.root.TCUI = this.parent;
	this.root.setAttribute("onclick","this.TCUI.activatePanel('" + this.name + "'); return false;");
};

TabbedControl2.prototype.drawControl = function() {
	// Remove all existing children of the display root
	var i = this.root.childNodes.length;
	while(i > 0) {
		this.root.removeChild(this.root.childNodes[i]);
		i--;
	}
	
	// Setup the structure of the tab control
	var control = document.createElement("div");
	var tabs = document.createElement("ul");
	this.tab_list = tabs;
	control.appendChild(tabs);
	
	tabs.setAttribute("class","TC_tab_list");
	
	control.setAttribute("class","TC_tab_div");
	
	// Setup the content area
	var content = document.createElement("div");
	this.content = content;
	
	content.setAttribute("class","TC_content_div");
	
	// Add the new child elements
	this.root.appendChild(control);
	this.root.appendChild(content);
	
	// Hide the control by default
	this.hideControl();
};

TabbedControl2.prototype.showControl = function() {
	if(this.root.style.display == "none") {
		this.root.style.display = this.root_display;
	};
};

TabbedControl2.prototype.hideControl = function() {
	if(this.root.style.display != "none") {
		this.root_display = this.root.style.display;
		this.root.style.display = "none";
	}
};

TabbedControl2.prototype.activatePanel = function(aName) {
	for(p in this.panels) {
		if(p != aName) {
			this.panels[p].root.style.display = "none";
		}
		else {
			this.panels[p].root.style.display = "block";
			if(this.panels[p].ui.update())
				this.panels[p].ui.update();
			this.activePanel = this.panels[p];
		}
	}
	
	for(t in this.tabs) {
		if(t != aName) {
			this.tabs[t].root.setAttribute("class","TC_tab_inactive");
		}
		else {
			this.tabs[t].root.setAttribute("class","TC_tab_active");
		}
	}
};

TabbedControl2.prototype.addPanel = function(aName,aPanelContent,aPanelUI,aTabName) {
	if(!this.panels[aName] && !this.tabs[aName]) {
		var panel = document.createElement("div");
		panel.appendChild(aPanelContent);
		var tab = document.createElement("li");
		var tabc = document.createElement("div");
		tabc.innerHTML = aTabName;
		tab.appendChild(tabc);
		
		this.panels[aName] = new TabbedControl2.Panel(aName,panel,aPanelUI);
		this.tabs[aName] = new TabbedControl2.Tab(aName,tab,this);
		
		this.tab_list.appendChild(this.tabs[aName].root);
		this.content.appendChild(this.panels[aName].root);
		this.panels[aName].root.style.display = "none";
	}
};

TabbedControl2.prototype.updateActive = function() {
	this.activePanel.ui.update();
};