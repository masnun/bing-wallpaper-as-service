var utils = require("./utils");
var express = require('express');

var app = express();

app.get("/", function (req, res) {
    var bingPromise = utils.getBingWallpaper()
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.error(err);
        });
});


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Service started on port :' + port);
});