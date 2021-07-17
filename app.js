var connect = require("connect");
var serveStatic = require("serve-static");
var app = connect();

app.use(serveStatic("public"));

app.listen(1737);
console.log('Server running at http://127.0.0.1:1737/');