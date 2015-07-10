import request from "request"

let promisedRequest = promisifyRequest(request);

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

export function getBingWallpaper() {


    var BING_URL = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';

    return promisedRequest(BING_URL)
        .then(function (response) {
            var data = JSON.parse(response);
            var image = data.images[0];

            var url = 'https://bing.com' + image.url;
            var caption = image.copyright;

            return {url: url, caption: caption};
        });
}