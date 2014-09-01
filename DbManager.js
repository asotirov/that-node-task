var Db = require('./Db');

var DbManager = function(){
    this.dbs = {};
};

DbManager.prototype.getConnection = function(done) {
    var key = 'database';
    if(!this.dbs[key]) {
        this.dbs[key] = new Db(key);
    }
    done(null, this.dbs[key]);
};

module.exports = DbManager;