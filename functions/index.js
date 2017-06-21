const functions = require('firebase-functions');
const request = require('request-promise-native');
const hummusrenderer = require('hummusrenderer');

exports.zohobooks = functions.https.onRequest((request, response) => {
  const token = request.header('Zoho-authtoken');
  const options = {
    url: 'https://books.zoho.com/api/v3' + request.url,
    headers: {
      'Authorization': 'Zoho-authtoken ' + token
    },
    simple: false,
    resolveWithFullResponse: true
  };

  return request(options).then(res => {
    response.status(res.statusCode).send(res.body);
  });
});

exports.render = functions.https.onRequest((request, response) => {
  var inData = {
	"pages": [
		{
			"width": 595,
			"height": 842,
			"boxes": [
				{
					"bottom":10,
					"left":10,
					"shape" : {
						"method":"rectangle",
						"width":400,
						"height":300,
						"options": {
							"type":"fill",
							"color":"red"
						}

					}
				}
			]
		}
	]
}

  response.status(200);
  response.set('Content-Type', 'application/pdf');
  var outStream = new hummusrenderer.PDFStreamForResponse(response);

  return new Promise((resolve, reject) => {
    hummusrenderer.render(inData, outStream, {}, function() {
      response.end();
      resolve();
    });
  });
});
