'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var nodeDomain = require('express-domain-middleware');
var routing = require('./routing');

var Server = function () {
}

Server.prototype.initialize = function (){
    var self = this;
    var app = express();
    app.use(nodeDomain);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(logRequest);
    app.get('/status', function(req, res){
        res.status(200).send('Working!');
    })
    routing.setup(app);
    app.use(logErrors)
    app.use(errorHandler);
    app.use(notFound);
    this.app = app;
}

Server.prototype.start = function() {
    if(!this.app) {
        throw new Error('App not initialized.');
    }

    var port = process.env.PORT || 3000;
    this.app.listen(port);
    console.log("Server listening on port %d in %s mode", port, this.app.settings.env);
}

function logRequest(req,res,next){
    console.log(req.url);
    next();
}

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(500).send({
        Error: err
    });
    if(err.domain) {
        //you should think about gracefully stopping & respawning your server
        //since an unhandled error might put your application into an unknown state
    }
}

function notFound(req, res, next) {
    res.status(404).send({
        Error: 'Endpoint not found.'
    });
}



module.exports = Server;
