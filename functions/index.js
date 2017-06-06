const functions = require('firebase-functions');
const rp = require('request-promise-native');

exports.zohobooks = functions.https.onRequest((request, response) => {

  const token = request.header('Zoho-authtoken')
  const options = {
    url: 'https://books.zoho.com/api/v3' + request.url,
    headers: {
      'Authorization': 'Zoho-authtoken ' + token
    },
    simple: false,
    resolveWithFullResponse: true
  };

  return rp(options).then(res => {
    response.status(res.statusCode).send(res.body)
  });
});
