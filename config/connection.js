
var MONGODB_URI = require('MONGODB_URI');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongolab-colorful-86159";

mongoose.connect(MONGODB_URI);
// (MONGODB_URI DB Connection Information
var connection;
if (process.env.JAWSDB_URL) {
    connection = (MONGODB_URI.createConnection(process.env.JAWSDB_URL)
)}
else{
connection = (MONGODB_URI.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: null,
    database: "mongolab-colorful-86159"})//app:atb-news//mongolab-colorful-86159
)};
// Initiate (MONGODB_URI Connection.

module.exports = connection;