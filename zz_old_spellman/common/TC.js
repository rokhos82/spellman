TabbedControl = function(aName,aDispRoot) {
	this.name = aName;
	this.id = aDispRoot;
	this.root = document.getElementById(this.id);
	
	this.activePanel = undefined;
	
	this.tab_list = undefined;
	this.content = undefined;
	
	this.tabs = {};
	this.panels = {};
};
	
TabbedControl.Panel = function(aName,aDispRoot,aContent) {
	this.name = aName;
	this.id = aDispRoot;
	
	if(!document.getElementById(this.id)) {
		this.root = document.createElement("div");
		this.root.appendChild(aContent);
		this.root.setAttribute("id",this.id);
		this.root.setAttribute("class","TC_panel");
	}
	else {
		this.root = document.getElementById(this.id);
	}
};
	
TabbedControl.Tab = function(aName,aDispRoot,aContent,aParent) {
	this.name = aName;
	this.id = aDispRoot;
	this.parent = aParent;
	
	if(!document.getElementById(this.id)) {
		this.root = document.createElement("li");
		this.root.setAttribute("id",this.id);
		this.root.setAttribute("class","TC_tab_inactive");
		this.root.TCUI = this.parent;
		this.root.setAttribute("onclick","this.TCUI.activatePanel('" + this.name + "'); return false;");
		this.root.appendChild(aContent);
	}
	else {
		this.root = document.getElementById(this.id);
	}
};

TabbedControl.prototype.drawControl = function() {
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
	
	tabs.setAttribute("id","TC_" + this.name + "_tabs");
	tabs.setAttribute("class","TC_tab_list");
	
	control.setAttribute("id","TC_" + this.name + "_control");
	control.setAttribute("class","TC_tab_div");
	
	// Setup the content area
	var content = document.createElement("div");
	this.content = content;
	
	content.setAttribute("id","TC_" + this.name + "_content");
	content.setAttribute("class","TC_content_div");
	
	// Add the new child elements
	this.root.appendChild(control);
	this.root.appendChild(content);
	
	// Hide the control by default
	this.hideControl();
};

TabbedControl.prototype.showControl = function() {
	if(this.root.style.display == "none") {
		this.root.style.display = this.root_display;
	};
};

TabbedControl.prototype.hideControl = function() {
	if(this.root.style.display != "none") {
		this.root_display = this.root.style.display;
		this.root.style.display = "none";
	}
};

TabbedControl.prototype.activatePanel = function(aName) {
	forEach(this.panels,function(val,key) {
		if(key != aName) {
			val.root.style.display = "none";
		}
		else {
			val.root.style.display = "block";
		}
	});
	
	forEach(this.tabs,function(val,key) {
		if(key != aName) {
			val.root.setAttribute("class","TC_tab_inactive");
		}
		else {
			val.root.setAttribute("class","TC_tab_active");
		}
	});
};

TabbedControl.prototype.addPanel = function(aName,aPanelContent,aTabContent) {
	if(!this.panels[aName] && !this.tabs[aName]) {
		var pid = "TC_" + this.name + "_" + aName + "_panel";
		var tid = "TC_" + this.name + "_" + aName + "_tab";
		
		this.panels[aName] = new TabbedControl.Panel(aName,pid,aPanelContent);
		this.tabs[aName] = new TabbedControl.Tab(aName,tid,aTabContent,this);
		
		this.tab_list.appendChild(this.tabs[aName].root);
		this.content.appendChild(this.panels[aName].root);
		this.panels[aName].root.style.display = "none";
	}
};