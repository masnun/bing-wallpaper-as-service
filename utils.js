var Promise = require('bluebird');
var request = promisifyRequest(require("request"));


function promisifyRequest(request) {

    return function (url) {
        return new Promise(function (resolve, reject) {

            request(url, function (err, res, body) {
                if (err !== null) {
                    reject(err);
                } else {
                    if (res.statusCode == 200) {
                        resolve(body)
                    } else {
                        reject("Status Code: " + res.statusCode);
                    }
                }
            });
        });

    }

}

function getBingWallpaper() {


    var BING_URL = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';

    return request(BING_URL)
        .then(function (response) {
            var data = JSON.parse(response);
            var image = data.images[0];

            var url = 'https://bing.com' + image.url;
            var caption = image.copyright;

            return {url: url, caption: caption};
        });
}


module.exports.getBingWallpaper = getBingWallpaper;