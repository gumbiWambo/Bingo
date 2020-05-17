"use strict";
var express = require('express');
var cors = require('cors');
var PORT = 3000;
var HOST = '0.0.0.0';
var app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', cors(), function (req, res) {
    return res.json({ message: 'HOLA gerd!' });
});
app.listen(PORT, HOST, function () { return console.log('running!'); });
