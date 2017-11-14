const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const LanguageService = {
    getAllLanguages: function(callback) {

        var languagesArray = [];

        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('languages');

            collection.find({}, {_id: 0}).toArray(function (err, docs) {
                assert.equal(err, null);
                for (var lang in docs) {
                    languagesArray.push(docs[lang].language);
                }
                callback(languagesArray);
                db.close();
            });
        });
    },
    insertLanguage: function(data, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('languages');
            collection.update({language: data.language}, data, {upsert: true}, function (err, result) {
                assert.equal(err, null);
                console.log("Inserted 1 documents into the collection");
                callback(result);
            });
        });
    },
    deleteLanguage: function(lang, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('languages');

            collection.remove({language: lang}, function (err, result) {
                assert.equal(err, null);
                console.log("Deleted 1 documents into the collection");
                callback(result);
            });
        });
    }
}

module.exports = LanguageService;
