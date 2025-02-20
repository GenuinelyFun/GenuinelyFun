//const mariadb = require('mariadb');
const mariadb = require('mariadb/callback');

const pool = mariadb.createPool({
    host: "192.0.2.50",
    user: "db_user",
    password: "db_user_password",
    database: "test",
    connectionLimit: 100,
});

/*
connectionLimit: 5,
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
//database: process.env.DB_NAME,
});
*/
async function asyncFunction() {
    try {
        console.log("Trying");
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("Error in obtaining connection: " + err);
            } else {
                console.log("Connected. Connection id is " + conn.threadId);
                conn.query(
                    "SELECT first_name, last_name, email from test.contacts",
                    (err, res, meta) => {
                        if (err) {
                            console.error("Error querying data: ", err);
                        } else {
                            console.log(res);
                            console.log(meta);
                        }
                    }
                );
                // release connection to pool
                conn.end(err => {
                    if (err) {
                        console.error("Error releasing connection to pool   : ", err);
                    }
                });
            }
        });

    } catch (err) {

        // Manage Errors
        console.log(err);

    } finally {
        console.log("finally");

        // Return Connection to the Pool
        /*if (conn) conn.end(err => {
            if (err) {
                console.log("SQL error in closing connection: ", err);
            }
        })*/
    }
}

/*
async function asyncFunction() {
    let conn;

    try {
        conn = mariadb.createConnection({
            /* host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             rowsAsArray: true,

            host: "192.0.2.50",
            user: "db_user",
            password: "db_user_password",
            database: "test",
            connectionLimit: 100,
        });

/*
        // Use Connection
        // ...
        console.log("Connected to the database");
        const rows = await conn.query("SELECT first_name, last_name, email from test.contacts", (err, res, meta) => {
            if (err) {
                console.error("Error querying data: ", err);
            } else {
                console.log(res);
                console.log(meta);
            }
        });
        console.log("---------------------");
        conn.end(err => {
            if (err) {
                console.error("Error releasing connection to pool   : ", err);
            }
        });

    } catch (err) {
        // Manage Errors
        console.log("SQL error in establishing a connection: ", err);
    } finally {
        // Close Connection
        if (conn) conn.end(err => {
            if (err) {
                console.log("SQL error in closing a connection: ", err);
            }
        });
    }
}

/*
async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Connected to the database");
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows); //[ {val: 1}, meta: ... ]
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        console.error("Error connecting to database:", err.message);
        console.log(err)
        await pool.end();
        process.exit(1);
    } finally {
        if (conn) conn.end();
    }
}*/

asyncFunction().then(() => {
    pool.end();
});

/*
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) return console.error(err.message);

    console.log('Connected to the MySQL server.');
});
*/