SM.debugging.debugBox = document.getElementById("debug_feedback");
SM.debugging.traceBox = document.getElementById("tracelog");
var container = document.getElementById("spell_editor");

/*var admin_dat = new SA.spellAdminDAT();
var spell_admin = new SA.spellAdminSVC(admin_dat,"spell_admin_test");

if(!SA.admin) {
	new SA.spellAdminINT("spell_editor",spell_admin);
}*/

var adm_dat = new SA.spellAdminDAT();
var adm_svc = new SA.spellAdminSVC(adm_dat,"spell_admin_test");
adm_svc.loadFromLocalStorage();
var man_dat = new SM.spellManagerDAT();
var man_svc = new SM.spellManagerSVC(man_dat,adm_svc,"spell_man_test","spell_editor");
man_svc.spell_book.addDisc("Fire",5);
man_svc.spell_book.addDisc("Holy",4);
man_svc.spell_book.addDisc("Shadowmancy",6);
man_svc.spell_book.addSpell("Shoal of Shadow",4,"Shadowmancy");
man_svc.spell_book.addSpell("Flame Dart",6,"Fire");
man_svc.spell_book.addSpell("Conjure Flame",1,"Fire");
man_svc.spell_book.addSpell("Mystic Weapon",2,"Holy");
man_svc.spell_book.addSpell("Mystic Weapon",2,"Shadowmancy");
man_svc.spell_book.addSpell("Mystic Shield",1,"Holy");
man_svc.spell_book.addSpell("Mystic Shield",1,"Shadowmancy");
man_svc.spell_book.addSpell("Pyretic Control",1,"Fire");
man_svc.spell_book.addSpell("Annoint the Wounded",4,"Holy");
man_svc.spell_book.addSpell("Blessed Annointment",4,"Holy");
man_svc.man_int.update();
//man_svc.spell_book.removeSpell("Mystic Weapon");