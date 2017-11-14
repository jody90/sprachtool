const GLOBAL   = require(__base + "/globals");
const mongo    = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert   = require('assert');
const fs       = require("fs");
const client   = require('scp2');

const VersionService = {
    addVersion: function(data, keys, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('versions');

            var version = {
                title: data.title,
                description: data.description,
                environment: {
                    test: [],
                    live: [],
                },
                keys: keys,
                createdAt: new Date().getTime()
            }

            collection.insert(version, function (err, result) {
                assert.equal(err, null);
                callback(result);
                db.close();
            });

        });
    },
    getLocalizedKeys: function(keys, language, callback) {
        var languages = language.split(",");

        var localizedKeys = {};

        // for every requested language get keys
        for (let i in languages) {
            localizedKeys[languages[i]] = {};
            // for every key get translations
            for (var k in keys) {
                var translations = keys[k].translations;
                // for every translation check if value is set for requested language
                for (let t in translations) {
                    if (translations[t].language == languages[i]) {
                        localizedKeys[languages[i]][keys[k].key] = translations[t].value;
                    }
                }
            }
        }

        callback(localizedKeys);
    },
    publishVersion: function(versionId, language, destination, callback) {
        var that = this;
        that.getVersionById(versionId, function(version) {
            that.createFile(version[0].keys, language, destination, versionId, function(data) {
                if (data.publishState == "success") {
                    return callback(data);
                }
            });
        })
    },
    createFile: function(keys, language, destination, versionId, callback) {
        var that = this;
        this.getLocalizedKeys(keys, language, function(localizedKeys) {
            var filePath = "Temp/" + destination + "/";
            var counter = 0;

            for (let lang in localizedKeys) {

                var fileName = "base_" + lang + ".properties";
                var file = filePath + fileName;
                // var stream = fs.createWriteStream(file, {flags: 'w+', overwrite: true});

                var text = "";

                for (let key in localizedKeys[lang]) {
                    text += key + " = " + localizedKeys[lang][key] + "\n";
                }

                fs.writeFileSync(file, text);

                client.scp(file, {
                    host: GLOBAL.sshDestinations[destination].host,
                    username: GLOBAL.sshDestinations[destination].username,
                    privateKey: fs.readFileSync(GLOBAL.sshPrivateKeyPath),
                    path: GLOBAL.sshDestinations[destination].path
                }, function(err) {
                    if (!err) {
                        console.log("fertig");
                        that.setCurrentEnvironment(versionId, destination, lang, function(result) {
                            counter++;
                            if (counter == Object.keys(localizedKeys).length) {
                                return callback({publishState: "success"});
                            }
                        })
                    }
                    else {
                        console.log("scp error: ", err);
                    }
                })
            }
        });
    },
    getVersionById: function(versionId, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            var oId = new ObjectId(versionId);

            collection.find({_id: oId}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    getAllVersions: function(callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            collection.find({}, {keys: 0}).sort({_id: -1}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    setCurrentEnvironment: function(versionId, environment, language, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            var envObject = {};
            envObject[environment] = [];

            var oId = new ObjectId(versionId);

            var query = {};
            query["environment." + environment] = language;

            collection.update({}, {$pull: query}, {multi: true}, function (err, result) {
                assert.equal(err, null);

                collection.update({_id: oId}, {$addToSet: query}, function (err, docs) {
                    assert.equal(err, null);
                    callback(docs.result);
                    db.close();
                });
            });

        });
    }

}

module.exports = VersionService;
