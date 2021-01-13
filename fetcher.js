const web = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const website = web[0];
const path = web[1]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(website, (error, response, body) => {
  // Print the error if one occurred
  console.log('error:', error);
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
 
  // check if file is existing or not
  if (response.statusCode === 200 && fs.existsSync(path)) {
    rl.question('File existed, do you want to overwrite it? (y/n)', (answer) => {
      if (answer === 'y'){
        // save downloaded file
        fs.appendFile(path, body, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
      rl.close();
    });
  }

  if (response.statusCode !== 200){
    console.log('visit restricted!')
    rl.close();
  }
});