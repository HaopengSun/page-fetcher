const web = process.argv.slice(2);
const request = require('request');
var fs = require('fs');

request(web[0], (error, response, body) => {
  // Print the error if one occurred
  console.log('error:', error);
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
  // Print the HTML for the Google homepage.
  // console.log('body:', body);
  fs.appendFile(web[1], body, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});