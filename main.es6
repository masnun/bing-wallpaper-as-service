import request from "request"
import {getBingWallpaper} from "./utils.es6"
import express from "express"


var app = express();

app.get("/", (req, res) => {
    getBingWallpaper()
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.error(err);
        });
});


var port = process.env.PORT || 3000;

var server = app.listen(port, () => {
    console.log('Service started on port :' + port);
});