var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    insecureAuth : true
});
conn.connect((err) =>{
    if(err){ 
        throw err;
    }
    console.log("connected!");
});