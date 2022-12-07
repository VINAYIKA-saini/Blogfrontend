//- MYSQL Module
try{
    var mysql = require('mysql');
    var Q = require('q');
}catch(err){
    console.log("Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`.");
}

var dbConfig = {
   
};
var database = function () {
    var that = this;

that.executeSelectQuery = function ( qry, op) {

    var deferred = Q.defer();
        getConnection(dbConfig, function (err, conn) {
            if (err) {
                deferred.reject(err);
            }
            else {
               
                conn.query(qry, function (err, rows) {
                    if (err) deferred.reject(err);
                    else {
                      
                        deferred.resolve(rows);
                    }
                    conn.end(function (err) { deferred.reject(err); });
                });
            }
        });
        return deferred.promise;
};


var getConnection = function (config, cb) {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "blog",
        password: '',
        port: 3306,
        multipleStatements: true
    });
    connection.connect(function (err) {
        cb(err, connection);
    });
};



};
module.exports = new database();