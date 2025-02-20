const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});

// Created the Connection
/*con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});*/

// Created the Database named as "gfg"
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE gfg",
        function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
});