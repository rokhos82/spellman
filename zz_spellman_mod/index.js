var root = document.createElement("div");
var debug = document.createElement("div");
var app = document.createElement("div");

document.body.appendChild(root);

var table;
var row;
var cell;

table = document.createElement("table");
root.appendChild(table);

row = document.createElement("tr");
table.appendChild(row);
cell = document.createElement("td");
cell.appendChild(app);
row.appendChild(cell);

row = document.createElement("tr");
table.appendChild(row);
cell = document.createElement("td");
cell.appendChild(debug);
row.appendChild(cell);

SM.debugging.root = debug;

var man_svc = new SM.spellManagerSVC();