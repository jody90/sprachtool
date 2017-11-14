global.__base = __dirname;

const express = require("express");
const fs = require("fs");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

const routes = require("./routes/api");
const GLOBAL = require('./globals');
const keySerivce = require(__base + "/services/KeyService");
const versionSerivce = require(__base + "/services/VersionService");

const importService = require(__base + "/services/ImportService");

var filePath = "Temp/";

// Create Temp folder if it doesnt exists
if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
}
if (!fs.existsSync("Temp/test")){
    fs.mkdirSync("Temp/test");
}
if (!fs.existsSync("Temp/live")){
    fs.mkdirSync("Temp/live");
}

// importService.processInsert("clean/base_en_IE.properties", "en_IE");

// Make key unique
mongo.connect(GLOBAL.url, function (err, db) {
    assert.equal(null, err);
    var collection = db.collection('keys');
    collection.ensureIndex({key: 1}, {unique: true});
});

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
}

// setup express app
const app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", routes);

var port = process.env.port || 5000;

app.listen(port, function (req, res) {
    console.log("App runs at Port " + port);
})
