
var MONGODB_URI = require('MONGODB_URI');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongolab-animate-29949";

mongoose.connect(MONGODB_URI);
// (MONGODB_URI DB Connection Information
var connection;
if (process.env.JAWSDB_URL) {
    connection = (MONGODB_URI.createConnection(process.env.JAWSDB_URL)
} else{
    connection = (MONGODB_URI.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: null,
        database: "mongolab-animate-29949" //app:ancient-castle-83531
    });
};
// Initiate (MONGODB_URI Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;


