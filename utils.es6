import request from "request"

let promisedRequest = promisifyRequest(request);

function promisifyRequest(request) {

    return (url) => {
        return new Promise((resolve, reject) => {

            request(url, (err, res, body) => {
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
        .then((response) => {
            var data = JSON.parse(response);
            var image = data.images[0];

            var url = 'https://bing.com' + image.url;
            var caption = image.copyright;

            return {url: url, caption: caption};
        });
}