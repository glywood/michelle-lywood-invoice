const functions = require('firebase-functions');
const rp = require('request-promise-native');
const hummusrenderer = require('hummusrenderer');

exports.zohobooks = functions.https.onRequest((request, response) => {
  const token = request.header('Zoho-authtoken');
  const path = request.originalUrl.replace(/^\/zohobooks/, "");
  const options = {
    method: request.method,
    url: 'https://books.zoho.com/api/v3' + path,
    headers: {
      'Authorization': 'Zoho-authtoken ' + token
    },
    simple: false,
    resolveWithFullResponse: true
  };

  return rp(options).then(res => {
    response.status(res.statusCode).send(res.body);
  });
});

exports.render = functions.https.onRequest((request, response) => {
  var inData = request.body
  response.status(200);
  response.set('Content-Type', 'application/pdf');
  var outStream = new hummusrenderer.PDFStreamForResponse(response);

  return new Promise((resolve, reject) => {
    hummusrenderer.render(inData, outStream, {}, function(err) {
      response.end();
      if (err) reject(err);
      else resolve();
    });
  });
});
