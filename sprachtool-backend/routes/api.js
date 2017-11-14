const express = require("express");
const router = express.Router();
const keySerivce = require(__base + "/services/KeyService");
const versionSerivce = require(__base + "/services/VersionService");
const languageSerivce = require(__base + "/services/LanguageService");

router.get('/v1/keys', function(req, res) {
    console.log("getAllKeys")
    keySerivce.getAllKeys(function(data) {
        res.send(data);
    });
})

router.get('/v1/key/:id', function(req, res) {
    var id = req.params.id;

    // var startTime = new Date().getTime();

    keySerivce.getKeyById(id, function(data) {
        if (data.length > 0) {
            // console.log(new Date().getTime() - startTime);
            res.status(200).send(data);
        }
        else {
            res.status(404).send("Id " + id + " not found");
        }
    })
})


router.get('/v1/key/exist/:id', function(req, res) {
    var id = req.params.id;

    // var startTime = new Date().getTime();

    keySerivce.getKeyById(id, function(data) {
        if (data.length > 0) {
            // console.log(new Date().getTime() - startTime);
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
    })
})


router.post('/v1/key/:id', function(req, res) {
    keySerivce.insertKey(req.body, function(data) {
        if (data.result.n == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.put('/v1/key/:id', function(req, res) {
    keySerivce.updateKey(req.params.id, req.body, function(data) {
        if (data.result.nModified == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.delete('/v1/key/:id', function(req, res) {
    keySerivce.deleteKey(req.params.id, function(data) {
        if (data.result.n == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.get('/v1/versions', function(req, res) {
    console.log("getAllVersions")
    versionSerivce.getAllVersions(function(data) {
        res.send(data);
    });
})

router.post('/v1/version', function(req, res) {
    console.log("newVersion")
    keySerivce.getAllKeys(function(keys) {
        versionSerivce.addVersion(req.body, keys, function(result) {
            res.status(200).send();
        })
    })
})

router.post('/v1/version/publish', function(req, res) {
    console.log("publish Version")
    versionSerivce.publishVersion(req.body.versionId, req.body.language, req.body.destination, function(data) {
        if (data.publishState == "success") {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.get('/v1/languages', function(req, res) {
    console.log("getAllLanguages");
    languageSerivce.getAllLanguages(function(data) {
        if (data) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send();
        }
    })
})

router.post('/v1/language/:lang', function(req, res) {
    console.log("add Language")
    languageSerivce.insertLanguage({"language": req.params.lang}, function(data) {
        if (data.result.ok == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

module.exports = router;
