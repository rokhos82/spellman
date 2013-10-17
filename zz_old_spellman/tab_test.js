var tabbed = new TabbedControl("Test","container");
tabbed.drawControl();

var panel1 = document.createElement("div");
panel1.setAttribute("class","custom_panel");
panel1.innerHTML = "Hello World!";
var tab1 = document.createElement("div");
tab1.setAttribute("class","custom_tab");
tab1.innerHTML = "Spell Book";

var panel2 = document.createElement("div");
panel2.setAttribute("class","custom_panel");
panel2.innerHTML = "Preset spell list goes here";
var tab2 = document.createElement("div");
tab2.setAttribute("class","custom_tab");
tab2.innerHTML = "Spell Presets";

tabbed.addPanel("spellBook",panel1,tab1);
tabbed.addPanel("spellPresets",panel2,tab2);
tabbed.activatePanel("spellBook");
tabbed.showControl();