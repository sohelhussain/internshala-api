// SDK initialization

var ImageKit = require("imagekit");

exports.initImageKit = e => {
  var imagekit = new ImageKit({
    publicKey : process.env.PUBLICKEY_IMAGEKIT,
    privateKey : process.env.PRIVATEKEY_IMAGEKIT,
    urlEndpoint : process.env.ENDPOINT_URL_IMAGEKIT,
});
return imagekit
}