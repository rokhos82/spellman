var SA = {};

SA.debugging = {};
SA.debugging.traceBox = undefined;
SA.debugging.debugBox = undefined;
SA.debugging.trace = "";

SA.log = function(entry) {
	this.debugging.trace = entry + this.debugging.trace;
	if(SA.debug) { this.printLog(); };
};

SA.printLog = function() {
	this.debugging.traceBox.innerHTML = this.debugging.trace.replace(/\n/g,"<br />");
	if(this.admin && this.admin.admSvc.activeSpell) {
		this.debugging.debugBox.innerHTML = JSON.stringify(this.admin.admSvc.activeSpell);
	}
	else {
		this.debugging.debugBox.innerHTML = "";
	}
};

SA.debug = false;
SA.admin = undefined;
SA.adminObj = "SA.admin";
SA.CSSName = "SA";
SA.formname = "SAInterface";
SA.spellEditPanelDefs = new Array(
	{id:"editSpellGeneral",label:"General"},
	{id:"editSpellMins",label:"Minimums"},
	{id:"editSpellCalc",label:"Calculations"},
	{id:"editSpellRange",label:"Range"},
	{id:"editSpellBase",label:"Base"},
	{id:"editSpellEPOT",label:"EPOT"},
	{id:"editSpellDPOT",label:"DPOT"},
	{id:"editSpellAOE",label:"AOE"},
	{id:"editSpellTarget",label:"Target"},
	{id:"editSpellSurge",label:"Surge"},
	{id:"editSpellStaging",label:"Staging"},
	{id:"editSpellDisc",label:"Disciplines"}
);

SA.discEditPanelDefs = new Array(
	{id:"editDiscGeneral",label:"General"},
	{id:"editDiscSpell",label:"Spells"}
);

SA.castData = function() {
	this.TARGS = 0; // Number of targets
	this.PWR = 0; // Power of the spell being cast
	this.SPIR = 0; // SPIR value of the caster
	this.WILL = 0; // WILL value of the caster
	this.EPOT = 0; // EPOT of the spell being cast
	this.DIFF = 0; // Difficulty of the weapon being conjured
	this.SIZ = 0; // SIZ ranks of the creatures being summoned
	this.AOE = 0; // AOE value of the spell
	this.KARMA = 0;
};

SA.karmaEffect = function() {
	this.unit = "";
	this.cost = new expressionParser.expression();
	this.effect = new expressionParser.expression();
};

SA.editSpell = function(aName) {
	alert(aName);
};