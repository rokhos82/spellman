var ruleinc = 0; // an incrementer variable
var kantiaDefs = {};

kantiaDefs.attributes = {};
kantiaDefs.attributes.STR = {name: "STR"};
kantiaDefs.attributes.SIZ = {name: "SIZ"};
kantiaDefs.attributes.AGL = {name: "AGL"};
kantiaDefs.attributes.REF = {name: "REF"};
kantiaDefs.attributes.CON = {name: "CON"};
kantiaDefs.attributes.FORT = {name: "FORT"};
kantiaDefs.attributes.REA = {name: "REA"};
kantiaDefs.attributes.WILL = {name: "WILL"};
kantiaDefs.attributes.SPIR = {name: "SPIR"};
kantiaDefs.attributes.PER = {name: "PER"};



kantiaDefs.healing_rates = new Array();
ruleinc=0;
kantiaDefs.healing_rates[ruleinc++] = "16 days";
kantiaDefs.healing_rates[ruleinc++] = "8 days";
kantiaDefs.healing_rates[ruleinc++] = "4 days";
kantiaDefs.healing_rates[ruleinc++] = "2 days";
kantiaDefs.healing_rates[ruleinc++] = "1 day";
kantiaDefs.healing_rates[ruleinc++] = "16 hours";
kantiaDefs.healing_rates[ruleinc++] = "8 hours";
kantiaDefs.healing_rates[ruleinc++] = "4 hours";
kantiaDefs.healing_rates[ruleinc++] = "2 hours";
kantiaDefs.healing_rates[ruleinc++] = "1 hour";
kantiaDefs.healing_rates[ruleinc++] = "40 min.";
kantiaDefs.healing_rates[ruleinc++] = "20 min.";
kantiaDefs.healing_rates[ruleinc++] = "10 min.";
kantiaDefs.healing_rates[ruleinc++] = "5 min.";
kantiaDefs.healing_rates[ruleinc++] = "3 min.";
kantiaDefs.healing_rates[ruleinc++] = "1 min.";
kantiaDefs.healing_rates[ruleinc++] = "3 rounds";
kantiaDefs.healing_rates[ruleinc++] = "1 round";
kantiaDefs.healing_rates[ruleinc++] = "2/round";
kantiaDefs.healing_rates[ruleinc++] = "4/round";
kantiaDefs.healing_rates[ruleinc++] = "8/round";
kantiaDefs.healing_rates[ruleinc++] = "16/round";
kantiaDefs.healing_rates[ruleinc++] = "32/round";
kantiaDefs.healing_rates[ruleinc++] = "64/round";

// -------------------------------------------------------------------------------------------------
// Spell Definitions
// -------------------------------------------------------------------------------------------------
/*kantiaDefs.spellDef = function() {
	this.name = "";
	this.prereq = "";
	this.components = "";
	this.description = "";
	this.damage = "";
	this.effect = "";
	
	this.minStamina = 0;
	
	this.range = {};
	this.range.description = "";
	this.range.unit = "";
	this.range.per = 0;
	this.range.calc = new expressionParser.expression();
	
	this.base = {};
	this.base.unit = "";
	this.base.strain = 0;
	this.base.tav = 0;
	this.base.drain = 0;
	this.base.karma = 0;
	
	this.EPOT = {};
	this.EPOT.unit = "";
	this.EPOT.strain = {};
	this.EPOT.strain.per = 0;
	this.EPOT.strain.calc = new expressionParser.expression();
	this.EPOT.tav = {};
	this.EPOT.tav.per = 0;
	this.EPOT.tav.calc = new expressionParser.expression();
	this.EPOT.drain = {};
	this.EPOT.drain.per = 0;
	this.EPOT.drain.calc = new expressionParser.expression();
	
	this.AOE = {};
	this.AOE.unit = "";
	this.AOE.strain = {};
	this.AOE.strain.per = 0;
	this.AOE.strain.calc = new expressionParser.expression();
	this.AOE.tav = {};
	this.AOE.tav.per = 0;
	this.AOE.tav.calc = new expressionParser.expression();
	this.AOE.drain = {};
	this.AOE.drain.per = 0;
	this.AOE.drain.calc = new expressionParser.expression();
	
	this.targets = {};
	this.targets.unit = ""; // The text description of how target is calculated.  Minus the strain/tav/drain value.  E.g, "per 5 SIZ ranks of the animals"...may want to move this to the sub-objects.
	this.targets.strain = {};
	this.targets.strain.per = 0; // How much strain per unit of target
	this.targets.strain.calc = new expressionParser.expression();
	this.targets.tav = {};
	this.targets.tav.per = 0; // How much tav per unit of target.
	this.targets.tav.calc = new expressionParser.expression();
	this.targets.drain = {};
	this.targets.drain.per = 0; // Blah, blah, blah....
	this.targets.drain.calc = new expressionParser.expression();
	
	this.surge = {};
	this.surge.unit = "";
	
	this.staging = {};
	this.staging.description = "";
	this.staging.calc = {};
};//*/

// Spell Casting Data Structure
kantiaDefs.spellCastData = function() {
	this.TARGS = 0; // Number of targets
	this.PWR = 0; // Power of the spell being cast
	this.SPIR = 0; // SPIR value of the caster
	this.WILL = 0; // WILL value of the caster
	this.EPOT = 0; // EPOT of the spell being cast
	this.DIFF = 0; // Difficulty of the weapon being conjured
	this.SIZ = 0; // SIZ ranks of the creatures being summoned
	this.AOE = 0; // 
};