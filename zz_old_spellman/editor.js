SA.debugging.debugBox = document.getElementById("debug_feedback");
SA.debugging.traceBox = document.getElementById("tracelog");
var container = document.getElementById("spell_editor");

SA.debug = true;
var admin_dat = new SA.spellAdminDAT();
var spell_admin = new SA.spellAdminSVC(admin_dat,"spell_admin_test");

if(!SA.admin) {
	new SA.spellAdminINT("spell_editor",spell_admin);
}//*/