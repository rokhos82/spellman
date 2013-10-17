// Build the main UI
var body = document.body;

var app = document.createElement("div");
var debug = document.createElement("div");

var table = document.createElement("table");
body.appendChild(table);
var row;
var cell;

row = document.createElement("tr");
table.appendChild(row);
cell = document.createElement("td");
row.appendChild(cell);
cell.appendChild(app);

row = document.createElement("tr");
table.appendChild(row);
cell = document.createElement("td");
row.appendChild(cell);
cell.appendChild(debug);

app.setAttribute("id","app");
app.setAttribute("class","app");
debug.setAttribute("id","debug");
debug.setAttribute("class","debug");

SM.debugging.root = debug;

var man_svc = new SM.spellManagerSVC(app);