SA.spellDef = {};

SA.spellDefDAT = function(aName) {
	this.general_dat = new SA.spellDef.generalDAT(aName); // done
	this.karma_dat = new SA.spellDef.karmaDAT();
	this.limit_dat = new SA.spellDef.limitDAT();
	this.effect_dat = new SA.spellDef.effectDAT();
	this.strain_dat = new SA.spellDef.strainDAT(); // done
	this.drain_dat = new SA.spellDef.drainDAT(); // done
	this.tav_dat = new SA.spellDef.tavDAT(); // done
	this.epot_dat = new SA.spellDef.epotDAT(); // done
	this.dur_dat = new SA.spellDef.durDAT(); // done
	this.aoe_dat = new SA.spellDef.aoeDAT(); // done
	this.target_dat = new SA.spellDef.targetDAT(); // done
	this.surge_dat = new SA.spellDef.surgeDAT(); // done
	this.stage_dat = new SA.spellDef.stagingDAT(); // done
	this.range_dat = new SA.spellDef.rangeDAT();//*/
};

/*SA.spellDefDAT = function() {
	this.name = "";
	this.disciplines = new Array();
	this.prereq = "";
	this.components = "";
	this.desc = "";
	this.effect = "";
	this.resist = "";
	
	this.limits = {}; // Don't populate yet...will test at casting time to see if different portions have limits.
	
	this.damage = {};
	this.damage.desc = "";
	this.damage.unit = "";
	this.damage.calc = new expressionParser.expression();
	
	this.karma = {};
	this.karma.desc = "";
	this.karma.min = 0;
	this.karma.base = 0;
	this.karma.effects = new Array();
	
	this.strain = {};
	this.strain.desc = "";
	this.strain.min = 0;
	this.strain.calc = new expressionParser.expression();
	
	this.drain = {};
	this.drain.desc = "";
	this.drain.min = 0;
	this.drain.calc = new expressionParser.expression();
	
	this.tav = {};
	this.tav.desc = "";
	this.tav.min = 0;
	this.tav.calc = new expressionParser.expression();
	
	this.surge = {};
	this.surge.desc = ""; // 2 + 1 per EPOT + 1 per Target per min/round or at end of duration
	this.surge.unit = "";
	this.surge.calc = new expressionParser.expression();
	
	this.staging = {};
	this.staging.desc = ""; // Power + Spirit - 10
	this.staging.unit = ""; // W or B or M
	this.staging.calc = new expressionParser.expression(); // { operand: sub, left: { operand: add, left: PWR, right: SPIR }, right: 10 }
	
	this.range = {};
	this.range.desc = ""; // Power x 1 yards
	this.range.unit = ""; // yards
	this.range.calc = new expressionParser.expression(); // { operand: mult, left: PWR, right: 1 }
	
	this.base = {};
	this.base.strain = 0;
	this.base.drain = 0;
	this.base.tav = 0;
	
	this.epot = {};
	this.epot.desc = "";
	this.epot.unit = "";
	this.epot.strain = {};
	this.epot.strain.per = "";
	this.epot.strain.calc = new expressionParser.expression();
	this.epot.tav = {};
	this.epot.tav.per = "";
	this.epot.tav.calc = new expressionParser.expression();
	this.epot.drain = {};
	this.epot.drain.per = "";
	this.epot.drain.calc = new expressionParser.expression();
	
	this.dur = {};
	this.dur.desc = "";
	this.dur.unit = "";
	this.dur.strain = {};
	this.dur.strain.per = "";
	this.dur.strain.calc = new expressionParser.expression();
	this.dur.tav = {};
	this.dur.tav.per = "";
	this.dur.tav.calc = new expressionParser.expression();
	this.dur.drain = {};
	this.dur.drain.per = "";
	this.dur.drain.calc = new expressionParser.expression();
	
	this.aoe = {};
	this.aoe.desc = "";
	this.aoe.unit = ""; // yard, feet, mile
	this.aoe.strain = {};
	this.aoe.strain.per = "";
	this.aoe.strain.calc = new expressionParser.expression();
	this.aoe.tav = {};
	this.aoe.tav.per = "";
	this.aoe.tav.calc = new expressionParser.expression();
	this.aoe.drain = {};
	this.aoe.drain.per = "";
	this.aoe.drain.calc = new expressionParser.expression();
	
	this.targets = {};
	this.targets.desc = "";
	this.targets.unit = ""; // Target, object, montser
	this.targets.strain = {};
	this.targets.strain.per = "";
	this.targets.strain.calc = new expressionParser.expression();
	this.targets.tav = {};
	this.targets.tav.per = "";
	this.targets.tav.calc = new expressionParser.expression();
	this.targets.drain = {};
	this.targets.drain.per = "";
	this.targets.drain.calc = new expressionParser.expression();
};//*/